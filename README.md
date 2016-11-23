# svg2sprite-cli

> CLI interface for [svg2sprite](https://github.com/mrmlnc/svg2sprite).

[![Travis Status](https://travis-ci.org/mrmlnc/svg2sprite-cli.svg?branch=master)](https://travis-ci.org/mrmlnc/svg2sprite-cli)

## Install

```shell
$ npm i -g svg2sprite-cli
```

## Usage

```
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
  $ svg2sprite images/svg out/sprite.svg --ignore rainbow.svg --iconPrefix=prefix
```

## Related

  * [svg2sprite](https://github.com/mrmlnc/svg2sprite)
  * [yellfy-svg-sprite](https://github.com/mrmlnc/yellfy-svg-sprite) - svg2sprite wrapper for easy integration into the development process.

## Changelog

See the [Releases section of our GitHub project](https://github.com/mrmlnc/svg2sprite-cli/releases) for changelogs for each release version.

## License

This software is released under the terms of the MIT license.
