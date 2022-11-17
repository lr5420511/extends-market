const Market = function(limit = 0) {
    limit = Math.max(0, Math.floor(limit));
    Object.assign(this, { limit, entries: [] });
};

Market.prototype = {
    constructor: Market,
    install: function(type, enable, options) {
        const { limit, entries } = this;
        if(limit && entries.length >= limit) throw new Error('Can\'t install more extends.');
        const { initializes, requirements } = Object.assign({ initializes: [], requirements: [] }, options),
            extend = new type(...initializes);
        enable && extend.magic(...requirements);
        return entries.push([type, extend, enable]) && this;
    },
    display: function(enable = false) {
        const temps = this.entries.filter(cur => !enable || cur[2]);
        console.log(temps.length ? temps.map(([type, extend, enable]) =>
            `${enable ? '✔' : '✘'}  增量拓展插件${type.extname}：用于${extend.usage}，本次任务是${extend.task}。`
        ).join('\n\n') : 'There are not valid extends.');
        return this;
    }
};

export default Market;