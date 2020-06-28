import openUrl from './util/openUrl';
import hasParents from './util/hasParents';
import applyStyle from './util/applyStyle';

const renderRules = {
    // when unknown elements are introduced, so it wont break
    unknown: (h, node, children, parent, styles) => {
        return (
            <div key={node.key}>
                <text>{node.type}</text>
            </div>
        );
    },

    textgroup: (h, node, children, parent, styles) => {
        return (
            <div key={node.key} style={styles.text}>
                {children}
            </div>
        );
    },

    inline: (h, node, children, parent, styles) => {
        return <text key={node.key}>{children}</text>;
    },

    text: (h, node, children, parent, styles) => {
        return <text key={node.key}>{node.content}</text>;
    },
    span: (h, node, children, parent, styles) => {
        return <text key={node.key}>{children}</text>;
    },

    strong: (h, node, children, parent, styles) => {
        return (
            <text key={node.key} style={styles.strong}>
                {children}
            </text>
        );
    },

    s: (h, node, children, parent, styles) => {
        return (
            <text key={node.key} style={styles.strikethrough}>
                {children}
            </text>
        );
    },
    // a
    link: (h, node, children, parent, styles) => {
        return (
            <text key={node.key} style={styles.link}
                  onClick={() => openUrl(node.attributes.href)}>
                {children}
            </text>
        );
    },
    // a with a non text element nested inside
    blocklink: (h, node, children, parent, styles) => {
        return (
            <div
                key={node.key}
                onClick={() => openUrl(node.attributes.href)}
                style={styles.blocklink}>
                <div style={styles.image}>{children}</div>
            </div>
        );
    },
    em: (h, node, children, parent, styles) => {
        return (
            <div key={node.key} style={styles.em}>
                {children}
            </div>
        );
    },

    heading1: (h, node, children, parent, styles) => {
        return (
            <div key={node.key} style={styles.headingContainer}>
                {applyStyle(h, children, [styles.heading, styles.heading1], 'Text')}
            </div>
        );
    },

    heading2: (h, node, children, parent, styles) => {
        children = applyStyle(h, children, [styles.heading, styles.heading2], 'Text');
        return (
            <div key={node.key} style={styles.headingContainer}>
                {children}
            </div>
        );
    },
    heading3: (h, node, children, parent, styles) => (
        <div key={node.key} style={styles.headingContainer}>
            {applyStyle(h, children, [styles.heading, styles.heading3], 'Text')}
        </div>
    ),
    heading4: (h, node, children, parent, styles) => (
        <div key={node.key} style={styles.headingContainer}>
            {applyStyle(h, children, [styles.heading, styles.heading4], 'Text')}
        </div>
    ),
    heading5: (h, node, children, parent, styles) => (
        <div key={node.key} style={styles.headingContainer}>
            {applyStyle(h, children, [styles.heading, styles.heading5], 'Text')}
        </div>
    ),
    heading6: (h, node, children, parent, styles) => (
        <div key={node.key} style={styles.headingContainer}>
            {applyStyle(h, children, [styles.heading, styles.heading6], 'Text')}
        </div>
    ),

    paragraph: (h, node, children, parent, styles) => (
        <div key={node.key} style={styles.paragraph}>
            {children}
        </div>
    ),

    hardbreak: (h, node, children, parent, styles) => (
        <div key={node.key} style={styles.hardbreak}/>
    ),

    blockquote: (h, node, children, parent, styles) => (
        <div key={node.key} style={styles.blockquote}>
            {children}
        </div>
    ),
    code_inline: (h, node, children, parent, styles) => {
        return (
            <text key={node.key} style={styles.codeInline}>
                {node.content}
            </text>
        );
    },
    code_block: (h, node, children, parent, styles) => {
        return (
            <text key={node.key} style={styles.codeBlock}>
                {node.content}
            </text>
        );
    },
    fence: (h, node, children, parent, styles) => {
        return (
            <text key={node.key} style={styles.codeBlock}>
                {node.content}
            </text>
        );
    },
    pre: (h, node, children, parent, styles) => (
        <div key={node.key} style={styles.pre}>
            {children}
        </div>
    ),
    // ul
    bullet_list: (h, node, children, parent, styles) => {
        return (
            <div key={node.key} style={[styles.list, styles.listUnordered]}>
                {children}
            </div>
        );
    },
    ordered_list: (h, node, children, parent, styles) => {
        return (
            <div key={node.key} style={[styles.list, styles.listOrdered]}>
                {children}
            </div>
        );
    },
    // li
    list_item: (h, node, children, parent, styles) => {
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
    table: (h, node, children, parent, styles) => (
        <div key={node.key} style={[styles.table]}>
            {children}
        </div>
    ),
    thead: (h, node, children, parent, styles) => (
        <div key={node.key} style={[styles.tableHeader]}>
            {children}
        </div>
    ),
    tbody: (h, node, children, parent, styles) => <View key={node.key}>{children}</View>,
    th: (h, node, children, parent, styles) => {
        return (
            <div key={node.key} style={[styles.tableHeaderCell]}>
                {children}
            </div>
        );
    },
    tr: (h, node, children, parent, styles) => {
        return (
            <div key={node.key} style={[styles.tableRow]}>
                {children}
            </div>
        );
    },
    td: (h, node, children, parent, styles) => {
        return (
            <div key={node.key} style={[styles.tableRowCell]}>
                {children}
            </div>
        );
    },
    hr: (h, node, children, parent, styles) => {
        return <div key={node.key} style={[styles.hr]}/>;
    },

    // br
    softbreak: (h, node, children, parent, styles) => {
        return <text key={node.key}>{'\n'}</text>
    },
    image: (h, node, children, parent, styles) => {
        return <image key={node.key}
                      resize='contain'
                      style={styles.image}
                      src={node.attributes.src}/>;
    },
}

export default renderRules;
