#!/usr/bin/env node
'use strict';

import * as path from 'path';
import * as fs from 'fs';

import * as chalk from 'chalk';
import * as meow from 'meow';
import * as pify from 'pify';
import * as mkdir from 'mkdirp';
import * as readdir from 'recursive-readdir';
import * as svgSprite from 'svg2sprite';

const mkdirP = pify(mkdir);
const readdirP = pify(readdir);
const readFileP = pify(fs.readFile);
const writeFileP = pify(fs.writeFile);

const cli = <any>meow(`
	Usage
		$ svg2sprite <source-directory> <dist-file> [options]

	Common options
		--ignore, -d  glob-patterns for files that will not be added to the sprite.
		--inline, -i  If you want to embed the sprite into your HTML source, you will want to set this to true in order to prevent the creation of SVG namespace declarations and to set some other attributes for effectively hiding the library sprite.
		--iconPrefix, -p  The name prefix for each icon.
		--iconSuffix, -s  The name suffix for each icon.

	Clean options
		--stripEmptyTags  Removes empty tags such as "defs" or "g".
		--stripTags  Removes tags, that are listed in this list.
		--stripAttrs  Removes attributes, that are listed in this list.
		--stripExtraAttrs  Removes "Sketch" and "xmlns:*" attributes.
		--stripStyles  Removes "style" attributes from SVG definitions, or a list of the properties that will be removed from style tag and atrribute.

	Examples
		$ svg2sprite images/svg out/sprite.svg --ignore rainbow.svg --iconPrefix prefix
`, {
	alias: {
		h: 'help',
		d: 'ignore',
		i: 'inline',
		p: 'iconPrefix',
		s: 'iconSuffix'
	}
});

if (!cli.input[0] || !cli.input[1]) {
	throw new Error('You must provide a directory with the source files and the path to the future file.');
}

cli.flags.clean = {
	stripEmptyTags: cli.flags.stripEmptyTags ? [].concat(cli.flags.stripEmptyTags) : [],
	stripTags: cli.flags.stripTags ? [].concat(cli.flags.stripTags) : [],
	stripAttrs: cli.flags.stripAttrs ? [].concat(cli.flags.stripAttrs) : [],
	stripExtraAttrs: cli.flags.stripExtraAttrs ? true : false
};

if (cli.flags.stripStyles && cli.flags.stripStyles !== true) {
	cli.flags.clean.stripStyles = [].concat(cli.flags.stripStyles);
} else if (cli.flags.stripStyles) {
	cli.flags.clean.stripStyles = true;
}

if (cli.flags.ignore) {
	cli.flags.ignore = ['!*.svg'].concat(cli.flags.ignore.split(' '));
} else {
	cli.flags.ignore = ['!*.svg'];
}

const sprite = svgSprite.collection(cli.flags);
let stats = 0;

function log(msg: string): void {
	console.log(chalk.green('>> ') + msg);
}

log('Created spriter instance');

readdirP(cli.input[0], cli.flags.ignore).then((files) => {
	log('Read directory...');

	files = files.map((filename) => {
		return readFileP(filename, 'utf-8').then((content) => {
			const name = path.basename(filename, '.svg');
			sprite.add(name, content);
			stats++;
		});
	});

	return Promise.all(files);
}).then(() => {
	log('Start compiling...');

	const dir = path.dirname(cli.input[1]);
	return mkdirP(dir).then(() => {
		return writeFileP(cli.input[1], sprite.compile());
	});
}).then(() => {
	log('Finished sprite compilation');
	log(`Created 1 SVG sprite from ${stats} SVG's.`);
});
