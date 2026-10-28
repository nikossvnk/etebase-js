<h1 align="center">Etebase - your end-to-end encrypted backend</h1>

> [!NOTE]
> **This is an independent fork** of [etebase-js](https://github.com/etesync/etebase-js), the original
> project of the EteSync authors. This fork is not affiliated with, endorsed by or supported by EteSync or
> Etebase in any way. The history of the original project is kept as it is, with its authors, and the
> changes of this fork follow it. Like the original, it's licensed under the [BSD-3-Clause](./LICENSE)
> license (and `react-native-etebase/` under the LGPL-3.0).

The Etebase TypeScript client library for the web, node and react-native!

# What is it?

Etebase is an end-to-end encrypted backend. Think Firebase, but encrypted in a way that only your users
can access their data.

Etebase makes it easy to build end-to-end encrypted applications by taking care of the encryption and
its related challenges. It is fully open-source (clients and server) so anyone can review, audit or
contribute to its development!

# Using Etebase in your project

This repository is the JavaScript/TypeScript library for communication with an
[Etebase server](https://github.com/nikossvnk/etesync-server), which you run yourself.

It isn't published to npm; install it from a [release](https://github.com/nikossvnk/etebase-js/releases)
instead, which has the library already built (`etebase-<version>.tgz`, with its SHA-256 checksum next to it):

```shell
npm install https://github.com/nikossvnk/etebase-js/releases/download/v0.44.1/etebase-0.44.1.tgz
```

For React Native, also `react-native-etebase` from the same release, which gives etebase React
Native's sodium and random numbers (import it once, before etebase):

```shell
npm install https://github.com/nikossvnk/etebase-js/releases/download/v0.44.1/react-native-etebase-0.44.1.tgz
```

The packages' names are `etebase` and `react-native-etebase`, so they're imported the same way as the
original ones. A release is made by pushing a version tag (e.g. `v0.44.1`) that matches the version in
`package.json` and in `react-native-etebase/package.json`.

The following is a minimal example of how to change the Etebase password. There is no default server,
so the server's URL has to be passed to `login` and `signup`.

```typescript
import * as Etebase from "etebase";
const etebase = await Etebase.Account.login("username", "password", "https://etebase.example.com");
await etebase.changePassword("new password");
await etebase.logout();
```

There is a longer example in [`example.ts`](./example.ts).

## Known issues

If you get build errors complaining about `export = URI;` from urijs then you need to set
`compilerOptions.allowSyntheticDefaultImports` to true in `tsconfig.json`.

# Projects that use Etebase

* [EteSync Notes](https://github.com/nikossvnk/etesync-notes) - end-to-end encrypted notes and
  bookmarks for Android.
* [EteSync Web](https://github.com/nikossvnk/etesync-web) - an end-to-end encrypted web client for
  contacts, calendars and tasks.
* [EteSync all-in-one](https://github.com/nikossvnk/etesync-aio) - notes, calendar, tasks and contacts
  in one app.

# Building Etebase

```shell
git clone https://github.com/nikossvnk/etebase-js
cd etebase-js
npm install
npm run build
npm run lint
```

The build puts an ES module build in `dist/lib`, a CommonJS one in `dist/lib-cjs` and a UMD bundle in
`dist/umd`.

## Tests

`src/Crypto.test.ts` and `src/Helpers.test.ts` run on their own. `src/Etebase.test.ts` needs an Etebase
test server (one with `debug = true`, which has the endpoint the tests reset their users with). It
defaults to `http://localhost:8033`, and can be changed with the environment variable
`ETEBASE_TEST_API_URL`. The test server image of the [server](https://github.com/nikossvnk/etesync-server)
is the easiest way to get one:

```shell
docker build -t etebase-test-server -f docker/test-server/Dockerfile --build-arg ETESYNC_VERSION=master \
  https://github.com/nikossvnk/etesync-server.git#master
docker run -d --rm --name etebase-test -p 127.0.0.1:8033:3735 etebase-test-server

npm test                                       # all of the tests
npx jest src/Helpers.test.ts                   # one file
npx jest src/Etebase.test.ts -t "Item revisions"  # one test
```
