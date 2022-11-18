const Market = function(limit = 0) {
    limit = Math.max(0, Math.floor(limit));
    Object.assign(this, { limit, plugins: [] });
};

Market.prototype = {
    constructor: Market,
    install: function(type, enable, options) {
        const { limit, plugins } = this;
        if(limit && plugins.length >= limit) throw new Error('More plugins can\'t be add into market.');
        const { initializes, requirements } = Object.assign({ initializes: [], requirements: [] }, options),
            plugin = new type(...initializes);
        enable && plugin.magic(...requirements);
        return plugins.push([plugin, enable]) && this;
    },
    display: function(enable = false) {
        const valids = this.plugins.filter(plugin => !enable || plugin[1]);
        console.log(valids.length ? valids.map(plugin => {
            const task = plugin[0].task;
            return `${plugin[1] ? '✔' : '✘'} 增量拓展插件${plugin[0].name}：用于${plugin[0].usage}${task ? `，本次任务是${task}` : ''}。`
        }).join('\n\n') : 'There are not valid plugins to display.');
        return this;
    }
};

export default Market;