# Lift the video placeholders out of the documentation, recording enough to put
# them back later. Every one of them sits directly after an image figure, so the
# src of that image is the anchor the restore script needs.

$doc  = "c:\Users\himur\Studio\free-block-plugin\wp-content\plugins\b-testimonials-block\DOCUMENTATION.html"
$mani = "c:\Users\himur\Studio\free-block-plugin\wp-content\plugins\b-testimonials-block\docs-video-slots.json"

$html = [System.IO.File]::ReadAllText($doc)

# image figure, whitespace, then the video figure -- captured as one match so the
# anchor and the placeholder cannot drift apart
$rx = [regex]'(?s)<figure class="media-slot" data-media="image" data-src="(?<src>[^"]*)"[^>]*></figure>(?<gap>\s*)(?<vid><figure class="media-slot" data-media="video"[^>]*></figure>)'
$matches = @($rx.Matches($html))

# A video figure not preceded by an image would be missed above, so refuse to
# strip anything until the two counts agree.
$total = ([regex]'data-media="video"').Matches($html).Count
if ($matches.Count -ne $total) {
  "ABORT: matched $($matches.Count) of $total video figures - some are not after an image"
  exit 1
}

$slots = foreach ($m in $matches) {
  [ordered]@{
    after = $m.Groups['src'].Value
    gap   = $m.Groups['gap'].Value
    html  = $m.Groups['vid'].Value
  }
}

# Cut from the back, so earlier offsets stay valid.
for ($i = $matches.Count - 1; $i -ge 0; $i--) {
  $g = $matches[$i].Groups['gap']
  $v = $matches[$i].Groups['vid']
  $html = $html.Remove($g.Index, $g.Length + $v.Length)
}

[System.IO.File]::WriteAllText($doc, $html)
[System.IO.File]::WriteAllText($mani, (@($slots) | ConvertTo-Json -Depth 4))

"removed: $($matches.Count) video placeholders"
"manifest: $mani"
"video figures left: " + ([regex]'data-media="video"').Matches([System.IO.File]::ReadAllText($doc)).Count
