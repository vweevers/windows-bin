var test = require('tape')
  , env  = require('windows-env')
  , path = require('path')
  , root = env.SYSTEMROOT
  , proxyquire = require('proxyquire')
  , existent = require('existent')

var calls = []

var bin = proxyquire('./', {
  existent: function spy() {
    var args = [].slice.call(arguments)
    calls.push(args[0])
    return existent.apply(null, args)
  }
})

test('find native cscript', function (t) {
  t.plan(4)
  bin.reset()

  bin('cscript', { cache: false }, function (err, result) {
    t.ifError(err, 'no error')

    if (env.X64) {
      t.is(result, path.join(root, 'Sysnative', 'cscript.exe'), 'found native bin')
    } else {
      t.is(result, path.join(root, 'system32', 'cscript.exe'), 'found x86 bin')
    }
  })

  bin('cscript.exe', { cache: false }, function (err, result) {
    t.ifError(err, 'no error')

    if (env.X64) {
      t.is(result, path.join(root, 'Sysnative', 'cscript.exe'), 'found native bin')
    } else {
      t.is(result, path.join(root, 'system32', 'cscript.exe'), 'found x86 bin')
    }
  })
})

test('find native wscript', function (t) {
  t.plan(4)
  bin.reset()

  bin('wscript', { cache: false }, function (err, result) {
    t.ifError(err, 'no error')

    if (env.X64) {
      t.is(result, path.join(root, 'Sysnative', 'wscript.exe'), 'found native bin')
    } else {
      t.is(result, path.join(root, 'system32', 'wscript.exe'), 'found x86 bin')
    }
  })

  bin('wscript.exe', { cache: false }, function (err, result) {
    t.ifError(err, 'no error')

    if (env.X64) {
      t.is(result, path.join(root, 'Sysnative', 'wscript.exe'), 'found native bin')
    } else {
      t.is(result, path.join(root, 'system32', 'wscript.exe'), 'found x86 bin')
    }
  })
})

test('find x86 cscript', function (t) {
  t.plan(4)
  bin.reset()

  bin('cscript', { cache: false, native: false }, function (err, result) {
    t.ifError(err, 'no error')
    t.is(result, path.join(root, 'system32', 'cscript.exe'), 'found x86 bin')
  })

  bin('cscript.exe', { cache: false, native: false }, function (err, result) {
    t.ifError(err, 'no error')
    t.is(result, path.join(root, 'system32', 'cscript.exe'), 'found x86 bin')
  })
})

test('searches once', function (t) {
  t.plan(8 * 3)
  bin.reset()
  calls.splice(0, calls.length)

  bin('cscript', { native: false }, function(err, result) {
    t.ifError(err, 'no error')
    t.is(result, path.join(root, 'system32', 'cscript.exe'), 'found x86 bin')
    t.is(calls.length, 2, 'called twice')
  })

  bin('cscript', { native: false }, function(err, result) {
    t.ifError(err, 'no error')
    t.is(result, path.join(root, 'system32', 'cscript.exe'), 'found x86 bin')
    t.is(calls.length, 2, 'called twice')

    bin('cscript', { native: false }, function(err, result) {
      t.ifError(err, 'no error')
      t.is(result, path.join(root, 'system32', 'cscript.exe'), 'found x86 bin')
      t.is(calls.length, 2, 'called twice')
    })

    bin('cscript.exe', { native: false }, function(err, result) {
      t.ifError(err, 'no error')
      t.is(result, path.join(root, 'system32', 'cscript.exe'), 'found x86 bin')
      t.is(calls.length, 2, 'called twice')
    })
  })

  // native
  bin('cscript', { native: true }, function(err, result) {
    t.ifError(err, 'no error')
    t.is(result, path.join(root, 'Sysnative', 'cscript.exe'), 'found native bin')
    t.is(calls.length, 2, 'called twice')
  })

  bin('cscript', { native: true }, function(err, result) {
    t.ifError(err, 'no error')
    t.is(result, path.join(root, 'Sysnative', 'cscript.exe'), 'found native bin')
    t.is(calls.length, 2, 'called twice')

    bin('cscript', { native: true }, function(err, result) {
      t.ifError(err, 'no error')
      t.is(result, path.join(root, 'Sysnative', 'cscript.exe'), 'found native bin')
      t.is(calls.length, 2, 'called twice')
    })

    bin('cscript.exe', { native: true }, function(err, result) {
      t.ifError(err, 'no error')
      t.is(result, path.join(root, 'Sysnative', 'cscript.exe'), 'found native bin')
      t.is(calls.length, 2, 'called twice')
    })
  })
})
