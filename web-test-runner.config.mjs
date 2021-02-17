// import { playwrightLauncher } from '@web/test-runner-playwright';
import { chromeLauncher } from '@web/test-runner-chrome';

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  files: 'test/**/*.test.js',
  nodeResolve: true,

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto',

  /** Confgure bare import resolve plugin */
  // nodeResolve: {
  //   exportConditions: ['browser', 'development']
  // },

  /** Amount of browsers to run concurrently */
  // concurrentBrowsers: 2,
  concurrentBrowsers: 1,

  /** Amount of test files per browser to test concurrently */
  concurrency: 1,

  /** Browsers to run tests on */
  // browsers: [
  //   playwrightLauncher({ product: 'chromium' }),
  //   playwrightLauncher({ product: 'firefox' }),
  //   playwrightLauncher({ product: 'webkit' }),
  // ],

  browsers: [
          // https://modern-web.dev/docs/test-runner/browser-launchers/chrome/
      chromeLauncher({
                         launchOptions: {
                             // executablePath: '/path/to/executable',
                             // headless: false,
                             // devtools: true,
                             // args: ['--start-maximized']
                         },
                     }),
  ],
  // See documentation for all available options
});
