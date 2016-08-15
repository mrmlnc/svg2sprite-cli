# svg2sprite-cli

> CLI interface for [svg2sprite](https://github.com/mrmlnc/svg2sprite).

[![Travis Status](https://travis-ci.org/mrmlnc/svg2sprite-cli.svg?branch=master)](https://travis-ci.org/mrmlnc/svg2sprite-cli)

## Install

```shell
$ npm i -D svg2sprite-cli
```

## Usage

```
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
```

## Related

  * [svg2sprite](https://github.com/mrmlnc/svg2sprite)

## Changelog

See the [Releases section of our GitHub project](https://github.com/mrmlnc/svg2sprite-cli/releases) for changelogs for each release version.

## License

This software is released under the terms of the MIT license.
