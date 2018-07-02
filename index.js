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
        viewportUnit: 'rem',
    },getQueryString(this.query));
    var matchPXExp = /([0-9.]+px)([;,| |}|'|"\)\r|\n])/g;

    return source.replace(matchPXExp, function (match, m1, m2) {
        var pixels = parseFloat(m1.slice(0, m1.length - 2));
        if (pixels <= query.minPixelValue) {
            return match;
        }
     function createPxReplace(pixels,viewportUnit) {
            var test=(pixels * (1/100)).toFixed(2) + viewportUnit;
            return test
       }
        return createPxReplace(pixels,query.viewportUnit) + m2;
    });

};