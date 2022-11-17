const TextPencil = function(task) {
    Object.assign(this, {
        task,
        usage: '修改指定元素属性的文本'
    });
};

TextPencil.extname = 'TextPencil';

TextPencil.prototype = {
    constructor: TextPencil,
    magic: function(el, options) {
        const { prop, regular, action } = Object.assign({
            prop: 'innerText',
            regular: /^/,
            action: cur => cur
        }, options);
        const text = el[prop];
        el[prop] = text.replace(regular, action);
    }
};

export default (window.TextPencil = TextPencil);