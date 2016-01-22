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

var c = 'a';
var b = 'c';

module();
console.log('444444');
console.log(c);
