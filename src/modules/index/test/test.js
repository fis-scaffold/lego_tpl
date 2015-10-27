/**
 * just a module
 * @require './test.scss';
 */

var $ = require('jquery');
var tpl = require('./test.tpl');

module.exports = function() {
    $('h2').after(tpl({
        word: 'this is a index page module'
    }));   
};