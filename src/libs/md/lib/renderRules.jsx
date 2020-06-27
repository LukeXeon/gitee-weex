import openUrl from './util/openUrl';
import hasParents from './util/hasParents';
import applyStyle from './util/applyStyle';

/**
 * @param {Function} h
 **/
export default function getRenderRules(h) {
    return {
        // when unknown elements are introduced, so it wont break
        unknown: (node, children, parent, styles) => {
            return (
                <div key={node.key}>
                    <text>{node.type}</text>
                </div>
            );
        },

        textgroup: (node, children, parent, styles) => {
            return (
                <div key={node.key} style={styles.text}>
                    {children}
                </div>
            );
        },

        inline: (node, children, parent, styles) => {
            return <text key={node.key}>{children}</text>;
        },

        text: (node, children, parent, styles) => {
            return <text key={node.key}>{node.content}</text>;
        },
        span: (node, children, parent, styles) => {
            return <text key={node.key}>{children}</text>;
        },

        strong: (node, children, parent, styles) => {
            return (
                <text key={node.key} style={styles.strong}>
                    {children}
                </text>
            );
        },

        s: (node, children, parent, styles) => {
            return (
                <text key={node.key} style={styles.strikethrough}>
                    {children}
                </text>
            );
        },
        // a
        link: (node, children, parent, styles) => {
            return (
                <text key={node.key} style={styles.link}
                      onClick={() => openUrl(node.attributes.href)}>
                    {children}
                </text>
            );
        },
        // a with a non text element nested inside
        blocklink: (node, children, parent, styles) => {
            return (
                <div
                    key={node.key}
                    onClick={() => openUrl(node.attributes.href)}
                    style={styles.blocklink}>
                    <div style={styles.image}>{children}</div>
                </div>
            );
        },
        em: (node, children, parent, styles) => {
            return (
                <div key={node.key} style={styles.em}>
                    {children}
                </div>
            );
        },

        heading1: (node, children, parent, styles) => {
            return (
                <div key={node.key} style={styles.headingContainer}>
                    {applyStyle(children, [styles.heading, styles.heading1], 'Text')}
                </div>
            );
        },

        heading2: (node, children, parent, styles) => {
            children = applyStyle(children, [styles.heading, styles.heading2], 'Text');
            return (
                <div key={node.key} style={styles.headingContainer}>
                    {children}
                </div>
            );
        },
        heading3: (node, children, parent, styles) => (
            <div key={node.key} style={styles.headingContainer}>
                {applyStyle(children, [styles.heading, styles.heading3], 'Text')}
            </div>
        ),
        heading4: (node, children, parent, styles) => (
            <div key={node.key} style={styles.headingContainer}>
                {applyStyle(children, [styles.heading, styles.heading4], 'Text')}
            </div>
        ),
        heading5: (node, children, parent, styles) => (
            <div key={node.key} style={styles.headingContainer}>
                {applyStyle(children, [styles.heading, styles.heading5], 'Text')}
            </div>
        ),
        heading6: (node, children, parent, styles) => (
            <div key={node.key} style={styles.headingContainer}>
                {applyStyle(children, [styles.heading, styles.heading6], 'Text')}
            </div>
        ),

        paragraph: (node, children, parent, styles) => (
            <div key={node.key} style={styles.paragraph}>
                {children}
            </div>
        ),

        hardbreak: (node, children, parent, styles) => <div key={node.key} style={styles.hardbreak}/>,

        blockquote: (node, children, parent, styles) => (
            <div key={node.key} style={styles.blockquote}>
                {children}
            </div>
        ),
        code_inline: (node, children, parent, styles) => {
            return (
                <text key={node.key} style={styles.codeInline}>
                    {node.content}
                </text>
            );
        },
        code_block: (node, children, parent, styles) => {
            return (
                <text key={node.key} style={styles.codeBlock}>
                    {node.content}
                </text>
            );
        },
        fence: (node, children, parent, styles) => {
            return (
                <text key={node.key} style={styles.codeBlock}>
                    {node.content}
                </text>
            );
        },
        pre: (node, children, parent, styles) => (
            <div key={node.key} style={styles.pre}>
                {children}
            </div>
        ),
        // ul
        bullet_list: (node, children, parent, styles) => {
            return (
                <div key={node.key} style={[styles.list, styles.listUnordered]}>
                    {children}
                </div>
            );
        },
        ordered_list: (node, children, parent, styles) => {
            return (
                <div key={node.key} style={[styles.list, styles.listOrdered]}>
                    {children}
                </div>
            );
        },
        // li
        list_item: (node, children, parent, styles) => {
            if (hasParents(parent, 'bullet_list')) {
                return (
                    <div key={node.key} style={styles.listUnorderedItem}><text
                        style={styles.listUnorderedItemIcon}>{'\u00B7'}</text>
                        <div style={[styles.listItem]}>{children}</div>
                    </div>
                );
            }

            if (hasParents(parent, 'ordered_list')) {
                return (
                    <div key={node.key} style={styles.listOrderedItem}>
                        <text style={styles.listOrderedItemIcon}>{node.index + 1}{node.markup}</text>
                        <div style={[styles.listItem]}>{children}</div>
                    </div>
                );
            }

            return (
                <div key={node.key} style={[styles.listItem]}>
                    {children}
                </div>
            );
        },
        table: (node, children, parent, styles) => (
            <div key={node.key} style={[styles.table]}>
                {children}
            </div>
        ),
        thead: (node, children, parent, styles) => (
            <div key={node.key} style={[styles.tableHeader]}>
                {children}
            </div>
        ),
        tbody: (node, children, parent, styles) => <View key={node.key}>{children}</View>,
        th: (node, children, parent, styles) => {
            return (
                <div key={node.key} style={[styles.tableHeaderCell]}>
                    {children}
                </div>
            );
        },
        tr: (node, children, parent, styles) => {
            return (
                <div key={node.key} style={[styles.tableRow]}>
                    {children}
                </div>
            );
        },
        td: (node, children, parent, styles) => {
            return (
                <div key={node.key} style={[styles.tableRowCell]}>
                    {children}
                </div>
            );
        },
        hr: (node, children, parent, styles) => {
            return <div key={node.key} style={[styles.hr]}/>;
        },

        // br
        softbreak: (node, children, parent, styles) => {
            return <text key={node.key}>{'\n'}</text>
        },
        image: (node, children, parent, styles) => {
            return <image key={node.key}
                          resize='contain'
                          style={{...styles.image, ...{width: 750, height: 750}}}
                          src={node.attributes.src}/>;
        },
    }
};
