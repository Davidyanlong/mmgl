import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';


function glsl() {

    return {

        transform(code, id) {

            if (/\.glsl$/.test(id) === false) return;

            var transformedCode = 'export default ' + JSON.stringify(
                code
                    .replace(/[ \t]*\/\/.*\n/g, '') // remove //
                    .replace(/[ \t]*\/\*[\s\S]*?\*\//g, '') // remove /* */
                    .replace(/\n{2,}/g, '\n') // # \n+ to \n
            ) + ';';
            return {
                code: transformedCode,
                map: { mappings: '' }
            };

        }

    };

}

export default {
    entry: './src/index.js',
    indent: '\t',
    plugins: [
        glsl({
            // for tree-shaking, properties will be declared as
            // variables, using either `var` or `const`
            preferConst: true, 
        }),
        json(),
        resolve({ jsnext: true, main: true, browser: true }),
        babel({
            "presets": ["es2015-loose-rollup"],
            exclude: 'node_modules/**' // 只编译我们的源代码
        })
    ],
    // sourceMap: true,
    targets: [
        {
            format: 'umd',
            moduleName:'mmGL',
            name: 'mmGL',
            dest: 'build/umd/mmGL.js'
        },
        {
            format: 'es',
            dest: 'build/es/mmGL.js'
        },

        {
            format: 'iife',
            name: 'mmGL',
            moduleName:'mmGL',
            dest: 'build/mmGL.js'
        },
        {
            format: 'cjs',
           // moduleName: 'mmGL',
            dest: 'build/cjs/mmGL.js',
        }
    ]
};