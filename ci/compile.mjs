import esbuild from 'esbuild';
import htmlPlugin from '@chialab/esbuild-plugin-html';

await esbuild.build({
    entryPoints: ['dist/esm/demo/index.html'],
    outdir: 'dist/esm/bundle',
    assetNames: 'assets/[name]-[hash]',
    chunkNames: '[ext]/[name]-[hash]',
    plugins: [
        htmlPlugin({
            // scriptsTarget: 'es6',
            // modulesTarget: 'es2020',
        }),
    ],
});
