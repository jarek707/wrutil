module.exports = {
    objMap: function (lev, obj, fn) {
        if (lev--) obj.map(fn);
        else 
            for (var k in obj) 
                objMap(lev, obj[k], fn)
    },
    objKeys: function(o) {
        var keys = [];
        for (var i in o) keys.push(i);
        return keys;
    },
    objCount: function(o) { 
        var cnt=0; 
        for (var i in o) cnt++; 
        return cnt; 
    },
    objEmpty: function(obj) {
        for (var i in obj) return false;
        return true;
    },
    getDur: function(trc, latestTime) {
        var diff = -1;
        var dur  = -1;
        if (typeof trc[1] == 'undefined') {
            diff    = parseInt((new Date(latestTime.tr).getTime() - new Date(trc[0]).getTime())/1000);// - minDiff;
            if (diff > thresh)
                trc[1]  = (new Date((new Date(trc[0]).getTime()) + 1000*diff)).toISOString();
            else 
                diff = -1;
            dur = diff;
         } else {
            if (trc[1]>latestTime.tr) 
                latestTime={tr: trc[1], loc: new Date().toISOString() };;

            dur  = parseInt((new Date(trc[1]).getTime() - new Date(trc[0]).getTime())/1000);
            diff = parseInt((new Date(latestTime.tr).getTime() - new Date(trc[1]).getTime())/1000);
         }
         if (diff<0) diff=0;
         return {dur: dur, inactive: diff};
    }
}
