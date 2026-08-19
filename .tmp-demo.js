const fs=require("fs");
const p="tools/make-demo-page.php";
let s=fs.readFileSync(p,"utf8");

// -- Headings gain anchors, and paragraph/list helpers join them. -----------
const oldHeading = `$bpbtb_heading = function ( $text, $level ) {
	$tag  = 'h' . (int) $level;
	$html = "\n" . '<' . $tag . ' class="wp-block-heading">' . esc_html( $text ) . '</' . $tag . '>' . "\n";

	return serialize_block(
		[
			'blockName'    => 'core/heading',
			// h2 is core/heading's default level, so it carries no attribute.
			'attrs'        => 2 === (int) $level ? [] : [ 'level' => (int) $level ],
			'innerBlocks'  => [],
			'innerHTML'    => $html,
			'innerContent' => [ $html ],
		]
	);
};`;
if(!s.includes(oldHeading)) throw new Error("heading helper");

const newHelpers = `$bpbtb_heading = function ( $text, $level, $anchor = '' ) {
	$tag = 'h' . (int) $level;
	$id  = $anchor ? ' id="' . esc_attr( $anchor ) . '"' : '';

	$html = "\n" . '<' . $tag . ' class="wp-block-heading"' . $id . '>' . esc_html( $text ) . '</' . $tag . '>' . "\n";

	// h2 is core/heading's default level, so it carries no attribute.
	$attrs = 2 === (int) $level ? [] : [ 'level' => (int) $level ];

	if ( $anchor ) {
		$attrs['anchor'] = $anchor;
	}

	return serialize_block(
		[
			'blockName'    => 'core/heading',
			'attrs'        => $attrs,
			'innerBlocks'  => [],
			'innerHTML'    => $html,
			'innerContent' => [ $html ],
		]
	);
};

/**
 * One core/paragraph block.
 *
 * \`$html\` is markup, not text: the intro links to the group headings, so it is
 * escaped by the caller where it needs to be rather than here.
 */
$bpbtb_paragraph = function ( $html, $class = '' ) {
	$attrs    = $class ? [ 'className' => $class ] : [];
	$css      = $class ? ' class="' . esc_attr( $class ) . '"' : '';
	$markup   = "\n" . '<p' . $css . '>' . $html . '</p>' . "\n";

	return serialize_block(
		[
			'blockName'    => 'core/paragraph',
			'attrs'        => $attrs,
			'innerBlocks'  => [],
			'innerHTML'    => $markup,
			'innerContent' => [ $markup ],
		]
	);
};

/**
 * One core/list of links, for the contents at the top.
 *
 * Built as a real list of core/list-item blocks rather than one paragraph of
 * links, so the whole thing is a single block to select and delete on a site
 * that wants the demos without the index.
 *
 * @param array<string, string> $links anchor => label.
 */
$bpbtb_list = function ( $links ) {
	$items = [];

	foreach ( $links as $bpbtb_anchor => $bpbtb_label ) {
		$html = '<li><a href="#' . esc_attr( $bpbtb_anchor ) . '">' . esc_html( $bpbtb_label ) . '</a></li>';

		$items[] = [
			'blockName'    => 'core/list-item',
			'attrs'        => [],
			'innerBlocks'  => [],
			'innerHTML'    => $html,
			'innerContent' => [ $html ],
		];
	}

	return serialize_block(
		[
			'blockName'    => 'core/list',
			'attrs'        => [],
			'innerBlocks'  => $items,
			'innerHTML'    => '<ul class="wp-block-list"></ul>',
			// null marks where an inner block goes, which is how core's own
			// serialiser interleaves them with the wrapper's markup.
			'innerContent' => array_merge(
				[ "\n" . '<ul class="wp-block-list">' ],
				array_fill( 0, count( $items ), null ),
				[ '</ul>' . "\n" ]
			),
		]
	);
};`;
s=s.replace(oldHeading,newHelpers);
fs.writeFileSync(p,s);
console.log("helpers ok");
