import './index.css';
import { PLUGIN_USAGE } from './config';

const ToWhere = function(task, tag = 'div') {
    if(!PLUGIN_USAGE) throw new Error('Plugin usage can\'t be empty.');
    Object.assign(this, {
        name: 'ToWhere',
        usage: PLUGIN_USAGE,
        task,
        wrapper: document.createElement(tag)
    });
};

ToWhere.prototype = {
    constructor: ToWhere,
    magic: function(root, options) {
        const { index, style, path, text } = Object.assign({
            index: 0,
            style: '',
            path: '/',
            text: 'To Home!'
        }, options);
        if(!(path && text)) throw new Error('path or text is invalid.');
        const [el, len, temp] = [this.wrapper, root.children.length, Math.max(0, Math.floor(index))];
        style.replace(/([^\:\; ]+)\:([^\:\; ]+(?: +[^\:\; ]+)*)(?:\;|$)/g, (cur, key, value) => {
            key = key.toLowerCase().replace(/\-([^\-])([^\-]*)/g, (_, fir, sec) =>
                `${fir.toUpperCase()}${sec}`
            );
            return (el.style[key] = value) && cur;
        });
        el.innerHTML = `<a class="to-where" href="${path}">${text}</a>`;
        const prefix = temp < len;
        (len ? el.insertAdjacentElement : el.appendChild).call(len ? root.children[prefix ? temp : len - 1] : root,
            ...(len ? [prefix ? 'beforeBegin' : 'afterEnd', el] : [el])
        );
    }
};

export default (window.ToWhere = ToWhere);

