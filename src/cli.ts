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
    --rootAttributes, -r  The attributes that will be added to the root svg tag.
    --inline, -i  If you want to embed the sprite into your HTML source, you will want to set this to true in order to prevent the creation of SVG namespace declarations and to set some other attributes for effectively hiding the library sprite.
    --iconAttributes, -a  The attributes of each icon. Current attribute values will be overwritten.
    --iconPrefix, -p  The name prefix for each icon.
    --iconSuffix, -s  The name suffix for each icon.

  Clean options
    --clean Use all strip* options without 'stripViewBox', 'stripStyles' and 'stripFill'
    --stripComment  Strip <!-- * -->
    --stripEmptyDefinition  Strip empty <defs></defs>
    --stripEmptyGroup  Strip empty <g></g>
    --stripTitle  Strip <title>*</title>
    --stripDescription  Strip <desc>*</desc>
    --stripExtraAttributes  Strip Sketch and xmlns:* attributes
    --stripViewBox  Strip viewBox attributes
    --stripStyles  'stripFill' option and strip all 'style' attributes
    --stripFill  Strip 'fill' attribute (fill="") or fill in the 'style' attribute (style="fill:*;")

  Examples
    $ svg2sprite images/svg out/sprite.svg --ignore rainbow.svg --iconPrefix=prefix
`, {
  alias: {
    d: 'ignore',
    r: 'rootAttributes',
    i: 'inline',
    a: 'iconAttributes',
    p: 'iconPrefix',
    s: 'iconSuffix'
  }
});

if (!cli.input[0] || !cli.input[1]) {
  throw new Error('You must provide a directory with the source files and the path to the future file.');
}

if (cli.flags.clean) {
  cli.flags.stripComment = true;
  cli.flags.stripEmptyDefinition = true;
  cli.flags.stripEmptyGroup = true;
  cli.flags.stripTitle = true;
  cli.flags.stripDescription = true;
  cli.flags.stripExtraAttributes = true;
}

cli.flags.clean = {
  stripComment: cli.flags.stripComment,
  stripEmptyDefinition: cli.flags.stripEmptyDefinition,
  stripEmptyGroup: cli.flags.stripEmptyGroup,
  stripTitle: cli.flags.stripTitle,
  stripDescription: cli.flags.stripDescription,
  stripExtraAttributes: cli.flags.stripExtraAttributes,
  stripViewBox: cli.flags.stripViewBox,
  stripStyles: cli.flags.stripStyles,
  stripFill: cli.flags.stripFill
};

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
