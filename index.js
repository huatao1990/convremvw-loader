var util = require('util');

module.exports = function (source) {
    this.cacheable();
    function getQueryString (query){
        if(!query) {
             return {};
        }
        if(typeof query !== "string" && typeof query !== 'object') {
    		util.error('query need use json type');
    		return {};
    	}
        if(typeof query === "string" && query.substr(0, 1) === "{" && query.substr(-1) === "}"){
            return JSON.parse(query);
        }else{
    		return query;
        }
    }
    var query = Object.assign({},{
        unit: 'rem'
    },getQueryString(this.query));
    var matchPXExp = /([0-9.]+px)[\s\n\r]*(\/\*\i\*\/)?([;,| |}|'|"\)\r|\n])/g;
    return source.replace(matchPXExp, function (match, m1, m2,m3) {
        if(m2) return m1+m3
        var pixels = parseFloat(m1.slice(0, m1.length - 2));
     function createPxReplace(pixels,unit) {
            var test=(pixels * (1/100)).toFixed(2) + unit;
            return test
       }
        return createPxReplace(pixels,query.unit) + m3;
    });

};
