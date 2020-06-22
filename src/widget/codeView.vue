<template>
    <scroller scroll-direction="vertical"
              alwaysScrollableVertical="true"
              style="flex: 1">
        <div :style="{height:lines.length*40+'px'}">
            <scroller scroll-direction="horizontal"
                      alwaysScrollableVertical="true"
                      :style="{'min-height':pageHeight+'px'}"
                      show-scrollbar="false"
                      class="inner-scroller">
                <div style="flex-direction: row;height: 40px"
                     v-for="(line,index) in lines">
                    <text :class="text.class"
                          v-for="(text,index2) in line">{{text.text}}</text>
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

    export default {
        name: "codeView",
        props: {
            codeText: {
                type: String
            }
        },
        computed: {
            pageHeight: () => Utils.env.getScreenHeight(),
            lines() {
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

                let highlight = hljs.highlightAuto(this.codeText).value
                highlight = highlight.replace(/\n/g, '<br>')
                let html = "<html><head><title></title></head><body>" + highlight + "<br></body></html>"
                let root = domino.createDocument(html).body
                let env = {
                    lines: [],
                    line: []
                }
                buildLine(env, root)
                return env.lines
            }
        },
    }
</script>

<style src="highlight.js/styles/idea.css" scoped>
</style>

<style scoped>
    .text-span {
        font-size: 30px;
    }

    .inner-scroller {
        flex-direction: column;
        flex: 1
    }
</style>