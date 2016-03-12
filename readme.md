# windows-bin

**Find Windows core executables like `cscript`, preferring the native 64-bit version regardless of Node.js bitness. Because by default, when running 32-bit Node.js, Windows would redirect to 32-bit [WoW64](https://en.wikipedia.org/wiki/WoW64) executables.**

[![npm status](http://img.shields.io/npm/v/windows-bin.svg?style=flat-square)](https://www.npmjs.org/package/windows-bin) [![AppVeyor build status](https://img.shields.io/appveyor/ci/vweevers/windows-bin.svg?style=flat-square&label=appveyor)](https://ci.appveyor.com/project/vweevers/windows-bin) [![Dependency status](https://img.shields.io/david/vweevers/windows-bin.svg?style=flat-square)](https://david-dm.org/vweevers/windows-bin)

## usage

```js
const bin = require('windows-bin')

// C:\Windows\Sysnative\cscript.exe
bin('cscript', function(err, path) {
  console.log(path)
})

// C:\Windows\system32\cscript.exe
bin('cscript', { native: false }, function(err, path) {
  console.log(path)
})
```

## install

With [npm](https://npmjs.org) do:

```
npm install windows-bin
```

## license

[MIT](http://opensource.org/licenses/MIT) © Vincent Weevers
