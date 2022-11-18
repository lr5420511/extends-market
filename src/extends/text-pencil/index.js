import { PLUGIN_USAGE } from './config';

const TextPencil = function(task) {
    if(!PLUGIN_USAGE) throw new Error('Plugin usage can\'t be empty.');
    Object.assign(this, { 
        name: 'TextPencil',
        usage: PLUGIN_USAGE,
        task
    });
};

TextPencil.prototype = {
    constructor: TextPencil,
    magic: function(el, options) {
        const { path, regular, action } = Object.assign({
            path: 'innerText',
            regular: /^/,
            action: cur => cur
        }, options),
        series = (path.match(/[^\.\[\]]+/g) || []).reduce((res, prop) => {
            const last = res[res.length - 1];
            return res.push([last[0][prop], prop]) && res;
        }, [[el]]);
        if(series.length < 2) throw new Error('path is invalid.');
        const [value, prop] = series.pop();
        series[series.length - 1][0][prop] = value.replace(regular, action);
    }
};

export default (window.TextPencil = TextPencil);