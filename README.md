# lego 脚手架

* [lego](http://lego.imweb.io/)
* [fis3-lego-hook](https://github.com/imweb/fis3-hook-lego)

## 使用

### 安装脚手架

```
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
