<template>
    <scroller scroll-direction="vertical"
              alwaysScrollableVertical="true"
              scrollable="true"
              style="flex: 1">
        <div :style="{height:lines.length*40+'px'}">
            <scroller scroll-direction="horizontal"
                      alwaysScrollableHorizontal="true"
                      scrollable="true"
                      show-scrollbar="false"
                      class="inner-scroller">
                <div style="flex-direction: row"
                     v-for="(line,index) in lines">
                    <div class="line-marker">
                        <text class="text-span"
                              style="color: #999999;margin-right: 40px">{{''+(index+1)}}</text>
                    </div>
                    <text :class="text.class"
                          v-for="(text) in line">{{text.text}}</text>
                </div>
            </scroller>
        </div>
    </scroller>
</template>


<script>
    import hljs from 'highlight.js'
    import {Utils} from 'weex-ui'
    import {Element, CharacterData} from '../libs/domino/impl'
    import domino from '@/libs/domino/index'
    import utils from "@/libs/utils";

    function highlightLines(language, codeText) {

        function getClassList(node) {
            let classList = ['text-span']
            for (let j = 0; j < node.classList.length; j++) {
                let c = node.classList[j]
                classList.push(c)
            }
            return classList
        }

        function appendSpan(line, node, classList) {
            if (node instanceof CharacterData && node.data.length > 0) {
                if (classList) {
                    line.push({
                        class: classList,
                        text: node.data
                    })
                } else {
                    line.push({
                        class: ['text-span'],
                        text: node.data
                    })
                }
            } else if (node instanceof Element && node.textContent.length > 0) {
                line.push({
                    class: getClassList(node),
                    text: node.textContent
                })
            }
        }

        function buildLine(env, node, classList) {
            for (let i = 0; i < node.childNodes.length; i++) {
                let item = node.childNodes[i]
                if (item instanceof CharacterData) {
                    appendSpan(env.line, item, classList)
                } else if (item instanceof Element) {
                    if (item.tagName === 'SPAN') {
                        let classList2 = getClassList(item)
                        if (classList && classList2.length === 1) {
                            for (let j = 0; j < classList.length; j++) {
                                let c = classList[i]
                                if (classList2.indexOf(c) === -1) {
                                    classList2.push(c)
                                }
                            }
                        }
                        if (item.children.length > 0) {
                            buildLine(env, item, classList2)
                        } else {
                            appendSpan(env.line, item)
                        }
                    } else if (item.tagName === 'BR') {
                        env.lines.push(env.line)
                        env.line = []
                    }
                }
            }
        }

        language = language || 'txt'
        let highlight;
        if (language && hljs.getLanguage(language)) {
            highlight = hljs.highlight(language, codeText).value
        } else {
            highlight = hljs.highlightAuto(codeText).value
        }
        highlight = highlight.replace(/\n/g, '<br>')
        let html = "<html><head><title></title></head><body>" + highlight + "<br></body></html>"
        utils.copy(html)
        let root = domino.createDocument(html).body
        let env = {
            lines: [],
            line: []
        }
        buildLine(env, root)
        return env.lines
    }

    export default {
        name: "codeView",
        props: {
            codeText: {
                type: String
            },
            language: String
        },
        computed: {
            pageHeight() {
                return Utils.env.getScreenHeight()
            },
            lines() {
                return highlightLines(this.language, this.codeText)
            }
        },
    }
</script>

<style src="highlight.js/styles/idea.css" scoped>
</style>

<style scoped>
    .text-span {
        font-size: 30px;
        lines: 1
    }

    .inner-scroller {
        flex-direction: column;
        flex: 1
    }

    .line-marker {
        border-right-width: 0.5px;
        border-right-color: #888888;
        margin-right: 10px;
        align-items: flex-end;
        background-color: #f0f0f0;
        min-width: 100px;
    }
</style>