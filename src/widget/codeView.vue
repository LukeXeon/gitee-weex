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
                <div style="flex: 1">
                    <div style="flex-direction: row;height: 40px"
                         v-for="(line,index) in lines">
                        <text :class="text.class"
                              v-for="(text,index2) in line">{{text.text}}</text>
                    </div>
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

                let highlight = hljs.highlightAuto(this.codeText).value
                highlight = highlight.replace(/\n/g, '<br>')
                utils.copy(highlight)
                let root = domino.createDocument(
                    "<html><head><title></title></head><body>" + highlight + "<br></body></html>"
                ).body
                let maxWidth = 0
                let width = 0
                let lines = []
                let line = []
                for (let i = 0; i < root.childNodes.length; i++) {
                    let item = root.childNodes[i]
                    if (item instanceof CharacterData) {
                        line.push({
                            class: ['text-span'],
                            text: item.data
                        })
                        width += item.data.length
                    } else if (item instanceof Element) {
                        if (item.tagName === 'BR') {
                            lines.push(line)
                            maxWidth = Math.max(width, maxWidth)
                            width = 0
                            line = []
                        } else if (item.tagName === 'SPAN') {
                            let classList = getClassList(item)
                            if (item.children.length > 0) {
                                for (let j = 0; j < item.childNodes.length; j++) {
                                    let node = item.childNodes[j]
                                    if (node instanceof CharacterData) {
                                        line.push({
                                            class: classList,
                                            text: node.data
                                        })
                                        width += node.data.length
                                    } else if (node instanceof Element) {
                                        line.push({
                                            class: getClassList(node),
                                            text: node.textContent
                                        })
                                        width += node.textContent.length
                                    }
                                }
                            } else {
                                line.push({
                                    class: classList,
                                    text: item.textContent
                                })
                                width += item.textContent.length
                            }
                        }
                    }
                }
                return lines
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