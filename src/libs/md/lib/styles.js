/**
 *
 */
export const styles = {
    root: {},
    view: {},
    codeBlock: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 4,
    },
    codeInline: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 4,
    },
    del: {
        backgroundColor: '#000000',
    },
    em: {
        fontStyle: 'italic',
    },
    headingContainer: {
        maxWidth: 750,
        flexDirection: 'row',
    },
    heading: {},
    heading1: {
        fontSize: 32,
    },
    heading2: {
        fontSize: 24,
    },
    heading3: {
        fontSize: 18,
    },
    heading4: {
        fontSize: 16,
    },
    heading5: {
        fontSize: 13,
    },
    heading6: {
        fontSize: 11,
    },
    hr: {
        backgroundColor: '#000000',
        height: 1,
    },
    blockquote: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        margin: 20,
        backgroundColor: '#CCCCCC',
    },
    inlineCode: {
        borderRadius: 3,
        borderWidth: 1,
        fontWeight: 'bold',
    },
    list: {
        maxWidth: 750,
    },
    listItem: {
        flex: 1,
        flexWrap: 'wrap',
        // backgroundColor: 'green',
    },
    listUnordered: {
        maxWidth: 750,
    },

    listUnorderedItem: {
        maxWidth: 750,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    listUnorderedItemIcon: {
        marginLeft: 10,
        marginRight: 10,
        //
        ...(weex.config.env.platform === 'iOS' ? {lineHeight: 36} : {lineHeight: 30,})
    },
    listUnorderedItemText: {
        fontSize: 20,
        lineHeight: 20,
    },

    listOrdered: {},
    listOrderedItem: {
        maxWidth: 750,
        flexDirection: 'row',
    },
    listOrderedItemIcon: {
        marginLeft: 10,
        marginRight: 10,
        //
        ...(weex.config.env.platform === 'iOS' ? {lineHeight: 36} : {lineHeight: 30})
    },
    listOrderedItemText: {
        fontWeight: 'bold',
        lineHeight: 20,
    },
    paragraph: {
        marginTop: 10,
        marginBottom: 10,
        flexWrap: 'wrap',
        flexDirection: 'row',
        maxWidth: 750,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    hardbreak: {
        width: '100%',
        height: 1,
    },
    strong: {
        fontWeight: 'bold',
    },
    table: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 3,
    },
    tableHeader: {},
    tableHeaderCell: {
        flex: 1,
        // color: '#000000',
        padding: 5,
        // backgroundColor: 'green',
    },
    tableRow: {
        borderBottomWidth: 1,
        borderColor: '#000000',
        flexDirection: 'row',
        maxWidth: 750,
    },
    tableRowCell: {
        flex: 1,
        padding: 5,
    },
    text: {},
    strikethrough: {
        textDecorationLine: 'line-through',
    },
    link: {
        textDecorationLine: 'underline',
    },
    blocklink: {
        flex: 1,
        borderColor: '#000000',
        borderBottomWidth: 1,

    },
    u: {
        borderColor: '#000000',
        borderBottomWidth: 1,
    },
    image: {
        flex: 1,
        width: 750,
        height: 750
    },
};
