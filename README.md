# lego 脚手架

* [lego](http://lego.imweb.io/)
* [fis3-lego-hook](https://github.com/imweb/fis3-hook-lego)

## 使用
### 需要（推荐）安装的包
* fis3
* fis3-hook-commonjs
* fis3-hook-lego
* fis3-postpackager-loader
* fis3-postprocessor-extras_uri
* fis3-packager-smart
* fis-parser-imweb-tpl
* fis-parser-imweb-tplv2（测试中）
* fis-parser-sass （兼容以前的）
* fis-parser-node-sass （推荐）
* fis-postprocessor-autoprefixer
* fis-prepackager-csswrapper

### 安装脚手架

```
    mkdir legoTest
    cd legoTest
    fis3 init lego_tpl
```

### 编译
切换至 `src` 目录下。

* 开发调试
```
lego install
fis3 release dev
fis3 server start --root ../dev
```

* 发布
```
fis3 release dist
```
生成的 `dist` 目录即为可发布版本。
