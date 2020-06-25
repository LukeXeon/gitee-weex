import hljs from 'highlight.js'
import {Element} from '@/libs/domino/impl'
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
    line: {
        flexDirection: 'column'
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
        fontSize: `${weexDefaultFontSize}px`
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
    list: {
        flexDirection: 'column',
        paddingLeft: '30px'
    },
    listHeader: {
        fontSize: `${weexDefaultFontSize}px`
    },
    listTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listItem: {
        flexDirection: 'column'
    }
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
                    return (<text style={styles.a}
                                  onClick={this.onAClick(href)}>{node.textContent}</text>)
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
                    return (<text style={styles.text}>{node.data}</text>)
                }
            }
        },
        renderListItem(node, header, level) {
            let titleNode = node.childNodes[0]
            return (<div style={styles.listItem}>
                <div style={styles.listTitle}>
                    {header}

                    {
                        titleNode instanceof Element ? this.renderEndNode(titleNode)
                            : (<text style={styles.text}>{titleNode.nodeType}</text>)
                    }
                </div>
                {node.childNodes[2] instanceof Element ? this.renderList(node.childNodes[2], level + 1) : null}
            </div>)
        },
        renderList(node, level = 0) {
            let list = []
            let isOrder = node.tagName === 'OL'
            let headerFirst;
            if (isOrder) {
                headerFirst = node.getAttribute('start') || 1
            } else {
                switch (level) {
                    case 0: {
                        headerFirst = require('@/res/md-point(2).png').default
                    }
                        break
                    case 1: {
                        headerFirst = require('@/res/md-point(1).png').default
                    }
                        break
                    default: {
                        headerFirst = require('@/res/md-point.png').default
                    }
                        break
                }
                for (let i = 0; i < node.children.length; i++) {
                    let cNode = node.children[i]
                    let header;
                    if (isOrder) {
                        header = (<text style={styles.text}>{headerFirst + i}. </text>)
                    } else {
                        header = (
                            <image src={headerFirst}
                                   style={{width: '25px', height: '25px', marginRight: '10px'}}>
                            </image>
                        )
                    }
                    let li = this.renderListItem(cNode, header, level)
                    list.push(li)
                }
            }
            return (<div style={styles.list}>{list}</div>)
        },
        renderCodeNode(node) {
            node = node.children[0]
            return (<text style={styles.code}>{node.innerHTML}</text>)
        },
        renderNode(node) {
            if (node instanceof Element) {
                if (node.children.length === 0) {
                    return this.renderEndNode(node)
                } else if (node.tagName === 'PRE') {
                    return this.renderCodeNode(node)
                } else if (node.tagName === 'UL' || node.tagName === 'OL') {
                    return this.renderList(node)
                } else {
                    let list = []
                    for (let i = 0; i < node.childNodes.length; i++) {
                        let cNode = node.childNodes[i]
                        let cElement = this.renderNode(cNode)
                        if (cElement) {
                            list.push(cElement)
                        }
                    }
                    return (<div style={styles.line}>{list}</div>)
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
            return this.renderNode(this.document.body)
        } catch (e) {
            utils.debug(e)
        }
    }
}

