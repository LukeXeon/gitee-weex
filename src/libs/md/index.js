import parser from './lib/parser';
import renderRules from './lib/renderRules.jsx';
import AstRenderer from './lib/AstRenderer.jsx';
import MarkdownIt from 'markdown-it';
import {styles} from './lib/styles';

export default {
    name: 'markdown',
    props: {
        content: String,
    },
    created() {
        this.renderer = new AstRenderer(this.$createElement, renderRules, styles);
        this.markdownIt = MarkdownIt({
            typographer: true,
        });
    },
    render() {
        if (this.source || this.source === '') {
            return null;
        }
        return parser(this.source, this.renderer.render, this.markdownIt);
    }
}