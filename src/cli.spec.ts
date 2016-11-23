'use strict';

import * as assert from 'assert';
import * as fs from 'fs';
import * as cp from 'child_process';

describe('CLI', () => {

	const svg = fs.readFileSync('fixtures/sprite.svg', 'utf-8');

	it('Should work', () => {
		const stdout = cp.spawnSync('node', [
			'out/cli.js',
			'fixtures',
			'.tmp/sprite.svg',
			'--ignore=sprite.svg',
			'--inline',
			'--stripExtraAttrs',
			'--stripTags=title',
			'--stripTags=desc',
			'--stripEmptyTags=defs',
			'--stripEmptyTags=g'
		]).stdout;

		assert.ok(stdout.indexOf('Created 1 SVG sprite from 2 SVG\'s.') !== -1);

		const sprite = fs.readFileSync('.tmp/sprite.svg', 'utf-8');
		assert.equal(sprite, svg.replace(/[\r\n\t]|\s{2,}/g, ''));
	});

});
