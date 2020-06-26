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
    document: {
        flexDirection: 'column'
    },
    line: {
        flexDirection: 'row'
    },
    h1: {
        fontWeight: 'bold',
        fontSize: `${htmlSize(32)}px`,
        marginTop: `15px`,
        marginBottom: `15px`,
    },
    h2: {
        fontWeight: 'bold',
        fontSize: `${htmlSize(24)}px`,
        marginTop: `10px`,
        marginBottom: `10px`,
    },
    h3: {
        fontWeight: 'bold',
        fontSize: `${htmlSize(18.72)}px`,
        marginTop: `5px`,
        marginBottom: `5px`,
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
        flexDirection: 'column',
        marginTop: `10px`,
        marginBottom: `10px`,
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
            marginTop: '25px',
            marginBottom: '10px',
            marginLeft: '10px'
        },
        root: {
            flexDirection: 'column',
        },
        item: {
            root: {
                marginBottom: '5px',
                marginTop: '5px',
                flexDirection: 'row',
            },
            image: {
                marginTop: '5px',
                width: '25px',
                height: '25px',
                marginRight: '20px'
            },
            order: {
                fontWeight: 'bold',
                textAlign: 'center',
                width: '20px',
                fontSize: '30px',
            },
            dot: {
                fontWeight: 'bold',
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
        renderListItemElementContent(node, level) {
            if (node.children.length > 0) {
                for (let i = 0; i < node.children.length; i++) {
                    let cNode = node.children[i]
                    switch (cNode.tagName) {
                        case "OL":
                        case "UL": {
                            return this.renderListElement(node, level + 1)
                        }
                        case "P": {
                            let style = i === 0 ? {...styles.p, ...{marginTop: '0px'}} : styles.p;
                            return ((<div style={style}>{this.renderParagraphChildren(node)}</div>))
                        }
                        default: {
                            return this.renderInlineElement(cNode)
                        }
                    }
                }
            } else {
                return (<div style={styles.text}>{node.innerHTML}</div>)
            }
        },
        renderListItemElement(header, node, level) {
            let content = this.renderListItemElementContent(node, level)
            if (header.isOrder) {
                let text = header.value.toString()
                let indexHeader = []
                for (let i = 0; i < text.length; i++) {
                    indexHeader.push((<text style={styles.list.item.order}>{text[i]}</text>))
                }
                indexHeader.push((<text style={styles.list.item.dot}>.</text>))
                return (
                    <div style={styles.list.item.root}>
                        <div style={{flexDirection: 'row', marginRight: '5px'}}>
                            {indexHeader}
                        </div>
                        {content}
                    </div>
                )
            } else {
                return (
                    <div style={styles.list.item.root}>
                        <image style={{...styles.list.item.image}} src={header.value}>
                        </image>
                        <div style={styles.list.item.content}>{content}</div>
                    </div>
                )
            }
        },
        renderListElement(node, level) {
            let isOrder = node.tagName === "OL"
            let children = node.children

            let list = []
            for (let i = 0; i < children.length; i++) {
                let cNode = children[i]
                let header = null
                if (isOrder) {
                    let start = parseInt(node.getAttribute('start')) || 1
                    header = {
                        isOrder: isOrder,
                        value: start + i
                    }
                } else {
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
                    header = {
                        isOrder: isOrder,
                        value: image
                    }
                }
                let cElement = this.renderListItemElement(header, cNode, level)
                list.push(cElement)
            }
            if (level === 0) {
                return (<div style={{...styles.list.root, ...styles.list.wrapper}}>{list}</div>)
            } else {
                return (<div style={styles.list.root}>{list}</div>)
            }
        },
        renderInlineElement(node) {
            let self = this
            switch (node.tagName) {
                case 'A': {
                    let href = node.getAttribute('href')
                    return (<text style={styles.a} onClick={() => {
                        self.onAClick(href)
                    }}>{node.textContent}</text>)
                }
                case "STRONG": {
                    return (<text style={styles.strong}>{node.textContent}</text>)
                }
                default: {
                    return (<text style={styles.text}>{node.textContent}</text>)
                }
            }
        },
        renderParagraphChildren(node) {
            let childNodes = node.childNodes

            let line = []
            let lines = []
            for (let i = 0; i < childNodes.length; i++) {
                let cNode = childNodes[i]
                if (cNode instanceof Element) {
                    if (cNode.tagName === "IMG") {
                        let src = cNode.getAttribute('src')
                        lines.push((
                            <image style={styles.img} resize={'contain'} src={src}>
                            </image>
                        ))
                    } else {
                        line.push(this.renderInlineElement(cNode))
                    }
                } else if (cNode instanceof CharacterData) {
                    let texts = cNode.data.split('\n')
                    for (let j = 0; j < texts.length; j++) {
                        let text = texts[j]
                        if (text.length > 0) {
                            line.push((<text style={styles.text}>{text}</text>))
                        }
                        if (j < texts.length - 1) {
                            lines.push((<div style={styles.line}>{line}</div>))
                            line = []
                        }
                    }
                }
            }
            if (line.length > 0) {
                lines.push((<div style={styles.line}>{line}</div>))
            }
            return lines
        },
        renderParagraphElement(node) {
            return (<div style={styles.p}>{this.renderParagraphChildren(node)}</div>)
        },
        renderHeaderElement(node) {
            for (let j = 1; j <= 6; j++) {
                if (node.tagName === `H${j}`) {
                    return (<text style={styles[`h${j}`]}>{node.textContent}</text>)
                }
            }
            return null
        },
        renderDocument(body, level = 0) {
            let children = body.children
            let list = []
            for (let i = 0; i < children.length; i++) {
                let child = children[i]
                let header = this.renderHeaderElement(child)
                if (header) {
                    list.push(header)
                } else {
                    switch (child.tagName) {
                        case 'PRE': {
                            list.push(<text style={styles.text}>code</text>)
                        }
                            break;
                        case 'P': {
                            list.push(this.renderParagraphElement(child))
                        }
                            break;
                        case 'OL':
                        case 'UL': {
                            list.push(this.renderListElement(child, level))
                        }
                            break;
                    }
                }
            }
            return (<div style={styles.document}>{list}</div>)
        },
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
            return (<div style={{width: '750px'}}>{this.renderDocument(this.document.body)}</div>)
        } catch (e) {
            utils.debug(e)
        }
    }
}

