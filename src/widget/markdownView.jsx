import hljs from 'highlight.js'
import {Element, CharacterData, Text} from '@/libs/domino/impl'
import MarkdownIt from 'markdown-it'
import htmlUtils from "@/libs/htmlUtils";
import utils from "@/libs/utils";

const md = MarkdownIt({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (e) {

            }
        }
        return '';
    }
})

const htmlDefaultFontSize = 14

const weexDefaultFontSize = 30

function htmlSize(px) {
    return px / htmlDefaultFontSize * weexDefaultFontSize
}

const styles = {
    text: {
        fontSize: `${weexDefaultFontSize}px`,
    },
    lines: {
        flexDirection: 'column'
    },
    line: {
        flexDirection: 'row'
    },
    h1: {
        fontWeight: 'bold',
        fontSize: `${htmlSize(32)}px`,
    },
    h2: {
        fontWeight: 'bold',
        fontSize: `${htmlSize(24)}px`
    },
    h3: {
        fontWeight: 'bold',
        fontSize: `${htmlSize(18.72)}px`
    },
    h4: {
        fontWeight: 'bold',
        fontSize: `${htmlSize(16)}px`
    },
    h5: {
        fontWeight: 'bold',
        fontSize: `${htmlSize(13.28)}px`
    },
    h6: {
        fontWeight: 'bold',
        fontSize: `${htmlSize(12)}px`
    },
    p: {
        fontSize: `${weexDefaultFontSize}px`,
        marginTop: `${weexDefaultFontSize / 2}px`,
        marginBottom: `${weexDefaultFontSize / 2}px`,
    },
    a: {
        fontSize: `${weexDefaultFontSize}px`,
        color: '#00b6ff'
    },
    inlineCode: {
        borderRadius: '5px',
        fontSize: `${weexDefaultFontSize}px`,
        backgroundColor: "#d6d6d6"
    },
    img: {
        width: '750px',
        height: '750px',
    },
    code: {
        backgroundColor: "#d6d6d6"
    },
    strong: {
        fontWeight: 'bold',
        fontSize: `${weexDefaultFontSize}px`,
    },
    list: {
        wrapper: {
            marginLeft: '25px'
        },
        root: {
            flexDirection: 'column',
        },
        item: {
            root: {
                flexDirection: 'row',
            },
            image: {
                width: '25px',
                height: '25px',
                marginRight: '20px'
            },
            order: {
                textAlign: 'center',
                width: '20px',
                fontSize: '30px',
            },
            dot: {
                width: '20px',
                fontSize: '30px',
            },
            content: {
                flexDirection: 'column',
            }
        }
    },
}

export default {
    name: "markdownView",
    props: {
        source: String
    },
    methods: {
        onAClick(url) {

        },
        renderEndNode(node) {
            switch (node.tagName) {
                case 'H1': {
                    return (<text style={styles.h1}>{node.textContent}</text>)
                }
                case 'H2': {
                    return (<text style={styles.h2}>{node.textContent}</text>)
                }
                case 'H3': {
                    return (<text style={styles.h3}>{node.textContent}</text>)
                }
                case 'H4': {
                    return (<text style={styles.h4}>{node.textContent}</text>)
                }
                case 'H5': {
                    return (<text style={styles.h5}>{node.textContent}</text>)
                }
                case 'H6': {
                    return (<text style={styles.h6}>{node.textContent}</text>)
                }
                case 'P': {
                    return (<text style={styles.p}>{node.textContent}</text>)
                }
                case 'A': {
                    let href = node.getAttribute('href')
                    return (<text style={styles.a} onClick={this.onAClick(href)}>{node.textContent}</text>)
                }
                case 'code': {
                    return (<text style={styles.inlineCode}>{node.textContent}</text>)
                }
                case 'IMG': {
                    let src = node.getAttribute('src')
                    return (
                        <image style={styles.img} resize={'contain'} src={src}>
                        </image>
                    )
                }
                default: {
                    return (<text style={styles.text}>{node.textContent}</text>)
                }
            }
        },
        renderUnOrderListItem(node, image, level) {
            let list = []
            for (let i = 0; i < node.childNodes.length; i++) {
                let cNode = node.childNodes[i]
                let cElement = this.renderNode(cNode, level + 1)
                list.push(cElement)
            }
            let marginTop = 5
            if (node.children.length > 0 && node.children[0] instanceof Element && node.children[0].tagName === "P") {
                marginTop += weexDefaultFontSize / 2
            }
            return (
                <div style={styles.list.item.root}>
                    <image style={{...styles.list.item.image, ...{marginTop: `${marginTop}px`}}} src={image}>
                    </image>
                    <div style={styles.list.item.content}>{list}</div>
                </div>
            )
        },
        renderUnOrderList(node, level) {
            let image;
            switch (level) {
                case 0: {
                    image = require("@/res/md-point(2).png").default
                }
                    break
                case 1: {
                    image = require("@/res/md-point(1).png").default
                }
                    break
                default: {
                    image = require("@/res/md-point.png").default
                }
                    break
            }
            let children = node.children
            let list = []
            for (let i = 0; i < children.length; i++) {
                let cNode = children[i]
                let cElement = this.renderUnOrderListItem(cNode, image, level)
                list.push(cElement)
            }
            return (<div style={styles.list.root}>{list}</div>)
        },
        renderOrderListItem(node, index, level) {
            let list = []
            let marginTop = 0

            for (let i = 0; i < node.childNodes.length; i++) {
                let cNode = node.childNodes[i]
                let cElement = this.renderNode(cNode, level + 1)
                list.push(cElement)
            }

            if (node.children.length > 0 && node.children[0] instanceof Element && node.children[0].tagName === "P") {
                marginTop += weexDefaultFontSize / 2
            }

            let text = index.toString()
            let indexList = []
            for (let i = 0; i < text.length; i++) {
                indexList.push((<text style={styles.list.item.order}>{text[i]}</text>))
            }
            indexList.push((<text style={styles.list.item.dot}>.</text>))

            return (
                <div style={styles.list.item.root}>
                    <div style={{marginTop: `${marginTop}px`, flexDirection: 'row', marginRight: '5px'}}>
                        {indexList}
                    </div>
                    <div style={styles.list.item.content}>{list}</div>
                </div>
            )
        },
        renderOrderList(node, level) {
            let children = node.children
            let start = node.getAttribute('start') || 1
            let list = []
            for (let i = 0; i < children.length; i++) {
                let cNode = children[i]
                let cElement = this.renderOrderListItem(cNode, start + i, level)
                list.push(cElement)
            }
            return (<div style={styles.list.root}>{list}</div>)
        },
        renderList(node, level = 0) {
            let root = null
            if (node.tagName === "UL") {
                root = this.renderUnOrderList(node, level)
            } else if (node.tagName === "OL") {
                root = this.renderOrderList(node, level)
            }
            if (level === 0) {
                return (<div style={styles.list.wrapper}>{root}</div>)
            } else {
                return root
            }
        },
        renderCodeNode(node) {
            node = node.children[0]
            return (<text style={styles.code}>{node.textContent}</text>)
        },
        renderNode(node, level) {
            if (node instanceof Element) {
                if (node.children.length === 0) {
                    return this.renderEndNode(node)
                } else if (node.tagName === 'PRE') {
                    return this.renderCodeNode(node)
                } else if (node.tagName === 'UL' || node.tagName === 'OL') {
                    return this.renderList(node, level)
                } else {
                    let lines = []
                    let line = []
                    for (let i = 0; i < node.childNodes.length; i++) {
                        let cNode = node.childNodes[i]
                        let cElement = this.renderNode(cNode)
                        if (cElement) {
                            line.push(cElement)
                        }
                        if (cNode instanceof CharacterData) {
                            if (cNode.data.endsWith('\n')) {
                                lines.push((<div style={styles.line}>{line}</div>))
                                line = []
                            }
                        }
                    }
                    if (line.length > 0) {
                        lines.push((<div style={styles.line}>{line}</div>))
                    }
                    return (<div style={styles.lines}>{lines}</div>)
                }
            } else {
                if (node.data.trim().length > 0) {
                    return (<text style={styles.text}>{node.data}</text>)
                } else {
                    return null
                }
            }
        }
    },
    computed: {
        document() {
            if (this.source && this.source !== '') {
                let content = md.render(this.source)
                return htmlUtils.createDocument(content)
            } else {
                return null
            }
        }
    },
    render() {
        if (!this.document) {
            return null
        }
        try {
            return (<div style={{width: '750px'}}>{this.renderNode(this.document.body)}</div>)
        } catch (e) {
            utils.debug(e)
        }
    }
}

