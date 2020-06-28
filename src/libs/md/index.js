import parser from './lib/parser';
import renderRules from './lib/renderRules.jsx';
import AstRenderer from './lib/AstRenderer.jsx';
import MarkdownIt from 'markdown-it';
import {styles} from './lib/styles';
import utils from "@/libs/utils";

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
        if (!this.content || this.content === '') {
            return null;
        }

        return parser(this.content, this.renderer.render, this.markdownIt);
    }
}