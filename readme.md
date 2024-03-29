# windows-bin

**Find Windows core executables like `cscript`, preferring the native 64-bit version regardless of Node.js bitness. Because by default, when running 32-bit Node.js, Windows would redirect to 32-bit [WoW64](https://en.wikipedia.org/wiki/WoW64) executables.**

[![npm status](http://img.shields.io/npm/v/windows-bin.svg)](https://www.npmjs.org/package/windows-bin)
[![AppVeyor build status](https://img.shields.io/appveyor/ci/vweevers/windows-bin.svg)](https://ci.appveyor.com/project/vweevers/windows-bin)
[![Standard](https://img.shields.io/badge/standard-informational?logo=javascript&logoColor=fff)](https://standardjs.com)

## Usage

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

## Install

With [npm](https://npmjs.org) do:

```
npm install windows-bin
```

## License

[MIT](LICENSE)
