import { readFileSync } from 'fs';
import { chromium } from 'playwright';

const plan = JSON.parse(readFileSync('probe-roles-plan.json', 'utf8'));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1200 } });
page.on('pageerror', (e) => console.log('PAGEERROR:', e.message));
await page.goto('http://localhost:8884/btb-roles-probe/', { waitUntil: 'networkidle' });
await page.waitForTimeout(8000);

const results = await page.evaluate((plan) => {
	const COLOR_PROPS = [
		'color', 'backgroundColor', 'backgroundImage', 'borderTopColor',
		'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'outlineColor',
		'fill', 'stroke', 'caretColor', 'textDecorationColor', 'columnRuleColor',
		'boxShadow', 'textShadow', 'borderImageSource', 'accentColor',
	];
	const WIDTH_PROPS = [
		'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
		'outlineWidth', 'columnRuleWidth', 'height', 'width', 'flexBasis',
	];

	return plan.map((entry) => {
		const root = document.getElementById('btbTestimonialsDir-' + entry.probeId);
		if (!root) return { ...entry, rendered: false, checks: [] };

		const nodes = [root, ...root.querySelectorAll('*')];
		const all = [
			...nodes.map((el) => getComputedStyle(el)),
			...nodes.flatMap((el) => [getComputedStyle(el, '::before'), getComputedStyle(el, '::after')]),
		];

		const checks = entry.expect.map((e) => {
			const props = 'width' === e.kind ? WIDTH_PROPS : COLOR_PROPS;
			return {
				attr: e.attr,
				used: all.some((cs) => props.some((p) => (cs[p] || '').includes(e.expected))),
			};
		});
		return { ...entry, rendered: true, checks };
	});
}, plan);

let ok = 0;
let dead = 0;
const deadByLayout = {};
for (const r of results) {
	if (!r.rendered) {
		console.log(`!! ${r.layout}: did not render`);
		continue;
	}
	for (const c of r.checks) {
		if (c.used) ok++;
		else {
			dead++;
			(deadByLayout[r.layout] ||= []).push(c.attr);
		}
	}
}

console.log(`\nworking: ${ok}   dead: ${dead}   total: ${ok + dead}\n`);
console.log('=== STILL PAINTING NOTHING ===');
for (const [layout, attrs] of Object.entries(deadByLayout)) {
	console.log(`  ${layout}: ${attrs.join(', ')}`);
}

await browser.close();
