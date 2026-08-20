<#
.SYNOPSIS
	Package the plugin for distribution.

.DESCRIPTION
	Produces testimonials.zip with every path inside a single
	`b-testimonials-block/` folder.

	That folder is the whole point. WordPress takes the install directory from
	the one directory it finds inside the archive; with the files sitting at the
	archive root there is none to read, so it falls back to the name of the .zip
	file. A browser download named "b-testimonials-block (4).zip" then installed
	as a *second* plugin in a folder called "b-testimonials-block (4)" rather
	than replacing the one already on the site -- no "Replace current with
	uploaded" prompt, because as far as WordPress could tell it was a different
	plugin.

	Written in PowerShell as well as in `npm run zip` because the npm script
	needs the `zip` binary, which a Windows machine does not have.

	Run `npm run build` first -- this only packages what is already on disk.

.EXAMPLE
	powershell -ExecutionPolicy Bypass -File tools\make-zip.ps1
#>

$ErrorActionPreference = 'Stop'

# The .zip file name. Cosmetic: WordPress only falls back to it when the
# archive has no folder inside, and this one always has.
$zipName = 'testimonials'

# The folder inside the archive, which is a different thing entirely and is
# NOT free to choose.
#
# WordPress identifies a plugin by its directory, not by `Plugin Name`. What
# it stores in active_plugins is the path -- b-testimonials-block/b-testimonials-block.php.
# So an archive rooted at `testimonials/` is, to WordPress, a plugin it has
# never seen: it installs to wp-content/plugins/testimonials/ alongside the
# existing copy and shows two entries on the Plugins screen, with no "Replace
# current with uploaded" prompt, because there was nothing matching to replace.
# That is what naming this `testimonials` did.
#
# It matches the working directory, the `Text Domain: b-testimonials-block`
# in the main file, the languages/b-testimonials-block-*.mo names, and every
# install already out there. Changing it again splits those installs in two,
# so it stays.
#
# (Not the same as the wordpress.org slug in src/admin/utils/data.js, which is
# b-testimonial and addresses the listing, the docs and the logo. If this ever
# ships on wordpress.org, that slug and this folder have to be made one name.)
$folderName = 'b-testimonials-block'

# The main file keeps its own name. It is what `Plugin Name: Testimonials` is
# declared in, and renaming it buys nothing while changing the path WordPress
# stores in active_plugins.
$mainFile = 'b-testimonials-block.php'

$pluginDir = Split-Path -Parent $PSScriptRoot
$zipPath   = Join-Path $pluginDir "$zipName.zip"

# Only what a site needs. Everything else -- src, node_modules, .git, the
# scratch files, this folder -- stays out.
$include = @(
	$mainFile,
	'uninstall.php',
	'readme.txt',
	'includes',
	'assets',
	'build',
	'languages'
)

$buildDir = Join-Path $pluginDir 'build'

if ( -not ( Test-Path $buildDir ) ) {
	throw "No build/ directory. Run 'npm run build' first."
}

<#
	Refuse to package a build/ that a watcher has been in.

	`npm start` writes development output into the same folder `npm run build`
	does: unminified bundles plus .map files, and -- if it was started before
	the blocks moved to one shared entry -- a 4 MB index.js per block from the
	old layout. None of it is deleted by a later production build, because
	webpack only overwrites what it emits.

	Packaging that folder is how a 4 MB zip becomes a 13 MB one, and nothing
	about the archive says so. Cheaper to stop here and say what to run.
#>
$maps = @( Get-ChildItem -Path $buildDir -Recurse -File -Filter '*.map' -ErrorAction SilentlyContinue )
if ( $maps.Count -gt 0 ) {
	throw ( "build/ holds $($maps.Count) sourcemap(s), so it is development output from 'npm start'. " +
		"Run 'npm run clean && npm run build' before packaging." )
}

# Every block's editor code is one shared build/blocks/index.js now. A
# build/blocks/<slug>/index.js is left over from the layout before that, and
# each one is around 4 MB.
$stale = @( Get-ChildItem -Path ( Join-Path $buildDir 'blocks' ) -Directory -ErrorAction SilentlyContinue |
	ForEach-Object { Join-Path $_.FullName 'index.js' } |
	Where-Object { Test-Path $_ } )
if ( $stale.Count -gt 0 ) {
	throw ( "build/ holds $($stale.Count) per-block index.js from the old layout, e.g. $($stale[0]). " +
		"Run 'npm run clean && npm run build' before packaging." )
}

# Staged into a temp folder named for the install directory, so the archive
# carries that one folder at its root. Compress-Archive has no exclude switch,
# so selecting what ships means copying it rather than filtering it.
$stage = Join-Path ( [System.IO.Path]::GetTempPath() ) ( 'bpbtb-zip-' + [System.Guid]::NewGuid().ToString('N') )
$root  = Join-Path $stage $folderName
New-Item -ItemType Directory -Path $root -Force | Out-Null

try {
	foreach ( $item in $include ) {
		$src = Join-Path $pluginDir $item
		if ( -not ( Test-Path $src ) ) {
			Write-Warning "skipped (not found): $item"
			continue
		}
		Copy-Item -Path $src -Destination $root -Recurse -Force
	}

	Get-ChildItem -Path $root -Recurse -Force -Include '.DS_Store', '*.map' |
		Remove-Item -Force -ErrorAction SilentlyContinue

	if ( Test-Path $zipPath ) { Remove-Item $zipPath -Force }

	# Each entry named by hand, with forward slashes.
	#
	# Neither shortcut writes a portable archive on Windows. Compress-Archive
	# (PowerShell 5.1) and ZipFile::CreateFromDirectory (.NET Framework) both
	# name entries with the platform separator, so every path comes out as
	# "b-testimonials-block\build\blocks\index.js" -- which the zip format reads
	# as one flat filename that happens to contain backslashes. The archive then
	# has no directories in it at all, WordPress finds no folder to take the
	# install name from, and the plugin lands as a heap of oddly named files.
	#
	# CreateEntryFromFile takes the entry name as an argument, so the separator
	# is ours to choose.
	Add-Type -AssemblyName System.IO.Compression
	Add-Type -AssemblyName System.IO.Compression.FileSystem

	$prefixLen = $stage.TrimEnd( '\' ).Length + 1
	$level     = [System.IO.Compression.CompressionLevel]::Optimal
	$zip       = [System.IO.Compression.ZipFile]::Open( $zipPath, 'Create' )
	try {
		foreach ( $file in Get-ChildItem -Path $stage -Recurse -File -Force ) {
			$entry = $file.FullName.Substring( $prefixLen ).Replace( '\', '/' )
			[System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
				$zip, $file.FullName, $entry, $level
			) | Out-Null
		}
	} finally {
		$zip.Dispose()
	}

	$size = [Math]::Round( ( Get-Item $zipPath ).Length / 1MB, 2 )
	Write-Host "$zipPath  ($size MB)"

	# Report what the archive actually starts with, since that is the thing this
	# script exists to get right.
	$zip = [System.IO.Compression.ZipFile]::OpenRead( $zipPath )
	try {
		$roots = @( $zip.Entries |
			ForEach-Object { $_.FullName.Split( '/' )[0] } |
			Sort-Object -Unique )
		$backslashes = @( $zip.Entries | Where-Object { $_.FullName -like '*\*' } ).Count
		Write-Host ( "entries:       " + $zip.Entries.Count )
		Write-Host ( "archive roots: " + $roots.Count + " -> " + ( $roots -join ', ' ) )
		Write-Host ( "backslash entries (must be 0): " + $backslashes )
		if ( 1 -ne $roots.Count -or 0 -ne $backslashes -or $folderName -ne $roots[0] ) {
			throw ( "Archive root must be exactly one folder named '$folderName' with forward slashes; " +
				"got $($roots.Count) root(s) [$($roots -join ', ')] and $backslashes backslash entry(ies). " +
				'WordPress will not replace an existing install with it.' )
		}
	} finally {
		$zip.Dispose()
	}
} finally {
	Remove-Item $stage -Recurse -Force -ErrorAction SilentlyContinue
}
