// var name = 'fis3';

fis.project.setProjectRoot('src');
fis.processCWD = fis.project.getProjectPath();
fis.set('project.md5Connector', '.');
fis.hook('commonjs');
fis.hook('lego');

fis.match('**/_*.scss', {
        release: false
    })
    .match('**.md', {
        release: false
    })
    .match('package.json', {
        release: false
    })
    .match('MIT-LICENSE', {
        release: false
    })

    // .match('lego_modules/**/*.html', {
    //     release: false
    // })
    .match('lego_modules/**.min.js', {
        release: false
    })

    // .match('lego_modules/**src/*.js', {
    //     release: false
    // })

    .match(/\/(.+)\.tpl$/, {    // js 模版一律用 .tpl
        isMod: true,
        rExt: 'js',
        id: '$1.tpl',
        moduleId: '$1.tpl',
        release: '$0.tpl', // 发布的后的文件名，避免和同目录下的 js 冲突
        parser: fis.plugin('imweb-tpl')
    })

    // 简化 modules 引用
    // modules/index/tupu/index.js -> require('index/tupu/index');
    .match(/^\/modules\/(.+)\.js$/, {
        isMod: true,
        id: '$1'
    })

    // 简化 modules 同名引用
    // modules/index/tupu/tupu.js -> require('index/tupu');
    .match(/^\/modules\/((?:[^\/]+\/)*)([^\/]+)\/\2\.(js)$/i, {
        id: '$1$2'
    })
    .match(/^\/lego_modules\/(.+)\.js$/i, {
        isMod: true,
        id: '$1'
    })
    .match('partials/**.js', {
        isMod: false
    })
    .match(/\/(mod|badjs|bj-report)\.js$/, { // 非模块
        isMod: false
    })
    .match('pages/**.js', {
        isMod: true
    })

    // .match('*.{html,js}', { // 同名依赖
    //     useSameNameRequire: true
    // })
    .match('**{partial,inline}.js', { // inline | partial 结尾的不是模块
        isMod: false
    })
    .match('**.{scss,sass}', {
        parser: fis.plugin('node-sass', {
            include_paths: [ 'modules/common/sass' ]
        }),
        rExt: '.css'
    })
    .match(/\/(.+\.async)\.(scss|css)$/, {    // 异步 css 包裹
        isMod: true,
        rExt: 'js',
        isCssLike: true,
        id: '$1',
        release: '$1.css',  // @todo 这里 $1.$2 竟然有 bug ，应该和上面的 tpl 性质一样
        extras: {
            wrapcss: true
        }
    })
    .match('**.{js,tpl}', {

        // domain: 'http://7.url.cn/edu/activity/' + name
    })
    .match('**.{css,scss,sass}', {
        postprocessor: fis.plugin('autoprefixer')

        // domain: 'http://7.url.cn/efidu/activity/' + name
    })
    .match('::image', {

        // domain: 'http://7.url.cn/edu/activity/' + name
    })
    .match('::package', {
        prepackager: fis.plugin('csswrapper'),
        packager: [ fis.plugin('smart') ]
    });

/**
 * 开发
 */
fis.media('dev')
    .match('*', {
        deploy: fis.plugin('local-deliver', {
            to: '../dev'
        })
    });

/**
 * 发布
 *  压缩、合并、文件指纹
 */
fis.media('dist')
    .match('**.{js,tpl}', {
        optimizer: fis.plugin('uglify-js'),
        useHash: true
    })
    .match('**.{css,scss,sass}', {
        optimizer: fis.plugin('clean-css'),
        useHash: true
    })
    .match('**.png', {
        optimizer: fis.plugin('png-compressor')
    })
    .match('::image', {
        useHash: true
    })
    .match('::package', {
        packager: [ fis.plugin('smart', {
            autoPack: true
        }) ]
    })
    .match('*', {
        deploy: [
            fis.plugin('local-deliver', {
                to: '../dist'
            })/*,
            fis.plugin('local-deliver', { // 这两行是支持捷豹的
                to: '../public/cdn'
            }),
            fis.plugin('local-deliver', {
                to: '../public/webserver'
            })*/
        ]
    });
