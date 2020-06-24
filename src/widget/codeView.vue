<template>
    <scroller scroll-direction="horizontal"
              show-scrollbar="false">
        <list scrollable="true"
              @loadmore="onLoadMore"
              class="list"
              :style="{width:Math.max(pageWidth*30,750)+'px'}"
              show-scrollbar="false">
            <cell style="flex-direction: row"
                  :key="index"
                  v-for="(line,index) in displayLines">
                <div class="line-marker">
                    <text class="text-span2"
                          v-for="(item) in getLineText(index+1,lines.length)">{{item}}</text>
                </div>
                <text :class="text.class"
                      v-for="(text) in line">{{text.text}}</text>
            </cell>
            <cell style="height: 0.5px;background-color: #888888">
            </cell>
        </list>
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
        methods: {
            getLineText(current, max) {
                function getLength(i) {
                    let l = 0;
                    while (i >= 1) {
                        i = i / 10;
                        l++;
                    }
                    return l
                }

                let space = getLength(max) - getLength(current)
                let s = []
                for (let i = 0; i < space; i++) {
                    s.push(' ')
                }
                let text = current.toString()
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
            pageWidth() {
                let max = 0
                let lines = this.lines
                for (let i = 0; i < lines.length; i++) {
                    let lineWidth = 0
                    let line = lines[i]
                    for (let j = 0; j < line.length; j++) {
                        let span = line[j]
                        lineWidth += span.text.length
                    }
                    max = Math.max(max, lineWidth)
                }
                return max
            },
            pageHeight() {
                return Utils.env.getScreenHeight()
            },
            lines() {
                return highlightLines(this.language, this.codeText)
            },
            displayLines() {
                let lines = this.lines
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