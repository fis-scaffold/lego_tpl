/**
 * main
 * @require './index.scss' // 无需在页面中控制 css
 */

var tpl = require('./index.tpl');
var $ = require('jquery');
var module = require('index/test');

$('h1:first').after(tpl({
    word: 'Good job!'
}));


module();