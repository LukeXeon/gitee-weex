<template>
    <scroller scroll-direction="horizontal"
              show-scrollbar="false">
        <scroller scrollable="true"
                  @loadmore="onLoadMore"
                  class="list"
                  :style="{width:pageWidth+'px'}"
                  show-scrollbar="false">
            <div style="flex-direction: row"
                 :key="index"
                 v-for="(line,index) in displayLines">
                <div class="line-marker">
                    <text class="text-span2"
                          v-for="(item) in getLineText(index+1)">{{item}}</text>
                </div>
                <text :class="text.class"
                      v-for="(text) in line">{{text.text||' '}}</text>
            </div>
            <div v-if="displayLines.length>0"
                 class="line">
            </div>
        </scroller>
    </scroller>
</template>


<script>
    import hljs from 'highlight.js'
    import {Utils} from 'weex-ui'
    import {Element} from 'domino-core/src/impl'
    import domino from 'domino-core'
    import htmlUtils from "@/libs/htmlUtils";

    function getLength(i) {
        let l = 0;
        while (i >= 1) {
            i = i / 10;
            l++;
        }
        return l
    }

    export default {
        name: "codeView",
        props: {
            codeText: {
                type: String
            },
            language: String
        },
        methods: {
            getLineText(current) {
                let space = this.allLineWidth - getLength(current);
                let s = [];
                for (let i = 0; i < space; i++) {
                    s.push(null)
                }
                let text = current.toString();
                for (let i = 0; i < text.length; i++) {
                    s.push(text[i])
                }
                return s
            },
            onLoadMore() {
                ++this.page
            }
        },
        computed: {
            allLineWidth() {
                return getLength(this.allLines.lines.length)
            },
            pageWidth() {
                return Math.max(750, this.allLines.maxWidth * 30)
            },
            pageHeight() {
                return Utils.env.getScreenHeight()
            },
            allLines() {
                function build(language, source) {

                    function getClassList(node) {
                        let classList = ['text-span'];
                        for (let j = 0; j < node.classList.length; j++) {
                            let c = node.classList[j];
                            classList.push(c)
                        }
                        return classList
                    }

                    function appendSpan(env, text, classList) {
                        env.line.push({
                            class: classList,
                            text: text
                        });
                        env.width += text.length
                    }

                    function build2(env, node) {
                        let childNodes = node.childNodes;
                        let classList = getClassList(node);
                        for (let i = 0; i < childNodes.length; i++) {
                            let node = childNodes[i];
                            if (node instanceof Element) {
                                if (node.tagName === 'BR') {
                                    env.lines.push(env.line);
                                    env.maxWidth = Math.max(env.maxWidth, env.width);
                                    env.width = 0;
                                    env.line = []
                                } else {
                                    build2(env, node)
                                }
                            } else {
                                let textContent = node.textContent;
                                if (textContent.length > 0) {
                                    let textSpans = textContent.split('\n');
                                    for (let j = 0; j < textSpans.length; j++) {
                                        let span = textSpans[j];
                                        if (span.length > 0) {
                                            appendSpan(env, span, classList)
                                        }
                                        if (j < textSpans.length - 1) {
                                            env.lines.push(env.line);
                                            env.maxWidth = Math.max(env.maxWidth, env.width);
                                            env.width = 0;
                                            env.line = []
                                        }
                                    }
                                }
                            }
                        }
                    }

                    let env = {
                        lines: [],
                        line: [],
                        maxWidth: 0,
                        width: 0
                    };

                    language = language || 'txt';
                    let highlight;
                    if (language && hljs.getLanguage(language)) {
                        highlight = hljs.highlight(language, source).value
                    } else {
                        highlight = hljs.highlightAuto(source).value
                    }

                    if (!highlight.endsWith('<br>')) {
                        highlight = highlight + '<br>'
                    }

                    let root = htmlUtils.createDocument(highlight).body;

                    build2(env, root);

                    return {
                        lines: env.lines,
                        maxWidth: env.maxWidth
                    }
                }

                return build(this.language, this.codeText);
            },
            displayLines() {
                let lines = this.allLines.lines;
                return lines.slice(0, Math.min(this.page * 50, lines.length))
            }
        },
        data() {
            return {
                page: 1
            }
        }
    }
</script>

<style src="highlight.js/styles/idea.css" scoped>
</style>

<style scoped>
    .line {
        height: 0.5px;
        background-color: #888888;
    }

    .text-span {
        font-size: 30px;
        lines: 1
    }

    .text-span2 {
        font-size: 30px;
        lines: 1;
        text-align: center;
        color: #999999;
        width: 20px;
    }

    .list {
        background-color: white;
    }

    .line-marker {
        padding-left: 10px;
        margin-right: 10px;
        padding-right: 30px;
        flex-direction: row;
        border-right-width: 0.5px;
        border-right-color: #888888;
        background-color: #f0f0f0;
    }
</style>