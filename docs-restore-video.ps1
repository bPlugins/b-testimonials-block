# Put the video placeholders back where strip-video.ps1 took them from.
# Each goes straight after the image figure whose src it was recorded against.

$doc  = "c:\Users\himur\Studio\free-block-plugin\wp-content\plugins\b-testimonials-block\DOCUMENTATION.html"
$mani = "c:\Users\himur\Studio\free-block-plugin\wp-content\plugins\b-testimonials-block\docs-video-slots.json"

if (-not (Test-Path $mani)) { "no manifest at $mani"; exit 1 }

$slots = Get-Content $mani -Raw | ConvertFrom-Json
$html  = [System.IO.File]::ReadAllText($doc)
$done = 0

foreach ($s in $slots) {
  if ($html.Contains($s.html)) { "already present: $($s.after)"; continue }

  $rx = [regex]"<figure class=`"media-slot`" data-media=`"image`" data-src=`"$([regex]::Escape($s.after))`"[^>]*></figure>"
  $m = $rx.Match($html)
  if (-not $m.Success) { "NO ANCHOR: $($s.after)"; continue }

  $html = $html.Insert($m.Index + $m.Length, $s.gap + $s.html)
  $done++
}

[System.IO.File]::WriteAllText($doc, $html)
"restored: $done of $(@($slots).Count)"
"video figures now: " + ([regex]'data-media="video"').Matches([System.IO.File]::ReadAllText($doc)).Count
