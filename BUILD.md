# slotted-element development
The sources are  used directly from [node_modules/slotted-element](node_modules/slotted-element)

`npm link slotted-element` would make it linked to locally installed repo which has to be registered by 
`npm link`

The TDD via `npm run test:watch` would allow tests and sources modification and debug in browser.

[dist/](dist) is holding generated binaries and demo referenced via CDN within main [README.md](README.md)

# npm run build
Would invoke [build.sh](build.sh) which
* execute `test.sh` to generate [coverage/](coverage) folder with results and [coverage.svg](coverage/coverage.svg)
* cleanup [dist/](dist) folder
* execute compilation by [esbuild](https://esbuild.github.io/)

Upon release in github and npmjs.org the code with working demo would be populated into CDN.
