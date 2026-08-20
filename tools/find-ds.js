/**
 * Delete every .DS_Store in the plugin tree.
 *
 * Was `find . -name '.DS_Store' -delete` in package.json, which is a Unix
 * command. npm runs scripts through cmd.exe on Windows, where `find` is a
 * string-search tool that has nothing to do with the Unix one -- it answered
 * "FIND: Parameter format not correct" and exited 2, killing the whole
 * `npm run zip` chain before it reached tools/make-zip.ps1.
 *
 * Node is the one interpreter every platform running this repo already has.
 */

const fs = require( 'fs' );
const path = require( 'path' );

const SKIP = new Set( [ 'node_modules', '.git', 'build', 'vendor' ] );

let removed = 0;

function walk( dir ) {
	for ( const entry of fs.readdirSync( dir, { withFileTypes: true } ) ) {
		if ( entry.isDirectory() ) {
			if ( ! SKIP.has( entry.name ) ) {
				walk( path.join( dir, entry.name ) );
			}
			continue;
		}
		if ( entry.name === '.DS_Store' ) {
			fs.rmSync( path.join( dir, entry.name ), { force: true } );
			removed++;
		}
	}
}

walk( process.cwd() );
// eslint-disable-next-line no-console
console.log( `.DS_Store removed: ${ removed }` );
