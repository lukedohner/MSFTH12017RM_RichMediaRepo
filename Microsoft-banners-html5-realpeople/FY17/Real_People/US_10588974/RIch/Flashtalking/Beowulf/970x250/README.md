# generator-craft-banner v0.3.0

> Yeoman generator used to scaffold production files for Atlas Creative banners.

## Getting Started
This plugin requires: Node `>=0.12.7`, Yo `>=1.4.7`, Ruby `>=2.0.14`, Compass `>=1.0.3`, Grunt `>=0.4.6-0`,  Grunt CLI `>=0.1.13`

Before pulling the repository, make sure [Node](https://nodejs.org) is installed. This project leverages [NPM](http://npmjs.com) to manage production dependencies. You can verify that Node and NPM are installed by using the terminal to execute:

```shell
npm -v
```

Once installed, use NPM to install the [Yo CLI](https://github.com/yeoman/yo) tool for running generators with the command:

```shell
npm install -g yo
```

Next, verify [Ruby](https://rvm.io/) and [Compass](http://compass-style.org//) are installed:

```shell
gem -v
```

```shell
compass -v
```

If Compass is not installed, its gem can be installed with the command:

```shell
gem install compass
```

Install [Grunt](http://gruntjs.com/) and [Grunt CLI](https://github.com/gruntjs/grunt-cli) globally.

```shell
npm install -g grunt
npm install -g grunt-cli
```

## Cloning and Linking to NPM

First, clone the generator a local folder using Git and download all NPM dependencies:

```shell
git clone git@github.com:CraftNY/HTML5/bannerprocess/generator-craft-banner.git
npm install
```

Now, make the package available globally to NPM:

```shell
npm link
```

## Generating a Project and Using Grunt

Create a working folder for a banner and navigate to it using terminal:

```shell
cd *folder_name* && cd $_
```

_Run the Yo CLI to use the generator._

Use Yo to generate the scaffolding:

```shell
yo craft-banner
```

publisher: `select` - banner publisher

name: `String` - the name of the banner (alphanumeric, underscore, and dash)

width: `int` - non-negative integer for the width

height: `int` - non-negative integer for the height

size(kb): `int` - non-negative integer for maximum banner size

Greensock: `boolean` - include Greensock via CDN

static IE fallback: `boolean` - deafult to static image if IE browser

IE fallback version: `select` - version to start static fallback

numClickTags: `int` - 1-3 click tags (may not be supported by all publishers)

Within your working folder, three notable folders will be created for production:

- `dist` folder for optimized build (will automatically update, not for editing)
- `src` working folder for assets, JS, and HTML 
- `sass` working folder for any Sass changes that will be compiled to CSS

### Notes

- Most commands will need admin privileges. Try `sudo` before each command if encountering errors.
- Any `script` or `link` tags loading in external files must contain `?__inline=true` in the path to be compiled inline (not to be used with CDNs).
```shell
<link rel="stylesheet" href="css/styles.css?__inline=true" />
```
- Static image should be placed at the root level of the `src` folder. Any other images are placed in the `img` folder. 

### Grunt Tasks

#### Watch
 
Use the Grunt task `watch` (or the default Grunt task) to monitor any Sass or JS changes.
- any Sass changes will be compiled into `styles.css`
- any JS changes will be linted using JSHint

```shell
grunt watch
```

```shell
grunt
```

#### Connect

`connect` creates a localhost to view the banner.

`src` folder can be accessed from `http://localhost:8000`

```shell
grunt connect
```

`dist` folder can be accessed from `http://localhost:8001`

```shell
grunt connect:dist
```

#### Build

`build` minifies and concatenates the `src` folder, generates a build for deployment in the `dist` folder, and compresses to a zip file in the main project folder.

```shell
grunt build
```

#### Sass

`sass` is called during the `watch` task but can be used to force a compilation of the Sass files.

```shell
grunt sass
```

#### Optimize

By placing high quality images into the `assets` folder, `optimize` can compress and minify graphic files to fine tune asset size. 

```shell
grunt optimize
```

Choose individual files (or the entire asset directory) along with an integer (0-100) to compress image files to the `src/img` folder.
