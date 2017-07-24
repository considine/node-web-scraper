/**
* @author Jack Considine <jackconsidine3@gmail.com>
* @package 
* 2017-07-24
*/


function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

module.exports = replaceAll;