import { readFileSync, readdirSync, writeFileSync } from 'fs';

const src = readFileSync('src/shared/utils/visualControls.js', 'utf8');

const roles = {};
for (const m of src.matchAll(/^\t(\w+):\s*\{\s*cssVar:\s*'([^']+)'(.*)$/gm)) {
	roles[m[1]] = { cssVar: m[2], isWidth: m[3].includes("type: 'width'") };
}

const layoutRoles = {};
const lrBlock = src.slice(src.indexOf('export const LAYOUT_ROLES'));
for (const m of lrBlock.matchAll(/^\t'([^']+)':\s*\[([^\]]*)\],/gm)) {
	layoutRoles[m[1]] = [...m[2].matchAll(/'([^']+)'/g)].map((x) => x[1]);
}

const aliases = {};
const alBlock = src.slice(src.indexOf('export const PALETTE_ALIASES'));
for (const m of alBlock.matchAll(/^\t'([^']+)':\s*\{([^}]*)\},/gm)) {
	aliases[m[1]] = {};
	for (const p of m[2].matchAll(/(\w+):\s*'([^']+)'/g)) {
		aliases[m[1]][p[1]] = p[2];
	}
}

const layoutToBlock = {};
for (const dir of readdirSync('src/blocks')) {
	const json = JSON.parse(readFileSync(`src/blocks/${dir}/block.json`, 'utf8'));
	const layout = json.attributes?.layout?.default;
	if (layout && !layoutToBlock[layout]) layoutToBlock[layout] = json.name;
}

// Build the page content in the same pass.
let n = 0;
const plan = [];
const blocks = [];

for (const [layout, attrs] of Object.entries(layoutRoles)) {
	const probeId = 'pal' + plan.length;
	const attributes = { cId: probeId };
	const expect = [];

	for (const attr of attrs) {
		const role = roles[attr];
		if (!role) continue;
		const writeTo = aliases[layout]?.[attr] || attr;

		if (role.isWidth) {
			const px = 7 + (n % 3);
			attributes[writeTo] = px;
			expect.push({ attr, cssVar: role.cssVar, expected: `${px}px`, kind: 'width' });
		} else {
			if (n > 255) throw new Error('ran out of distinct probe colours');
			const colour = `rgb(${n}, 7, 251)`;
			attributes[writeTo] = colour;
			expect.push({ attr, cssVar: role.cssVar, expected: colour, kind: 'color' });
			n++;
		}
	}

	plan.push({ layout, blockName: layoutToBlock[layout], probeId, expect });
	blocks.push(`<!-- wp:${layoutToBlock[layout]} ${JSON.stringify(attributes)} /-->`);
}

writeFileSync('probe-roles-plan.json', JSON.stringify(plan, null, 2));
writeFileSync('probe-roles-content.txt', blocks.join('\n\n'));
console.log('layouts:', plan.length, 'assertions:', plan.reduce((a, p) => a + p.expect.length, 0));
