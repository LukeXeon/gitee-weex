import getUniqueID from "./util/getUniqueID";

function rootRenderRule(h, children, styles) {
    return <text key={getUniqueID()} style={styles.root}>{children}</text>;
}

/**
 *
 */
export default class AstRenderer {
    /**
     * @param {Function} createElement
     * @param {Object.<string, function>} renderRules
     * @param {Object} style
     */
    constructor(createElement, renderRules, style) {
        this._createElement = createElement
        this._renderRules = renderRules;
        this._style = style;
    }

    /**
     * @param {String} type
     * @return {Function}
     */
    getRenderFunction = type => {
        const renderFunction = this._renderRules[type];

        if (!renderFunction) {
            throw new Error(
                `${type} renderRule not defined example: <Markdown rules={renderRules}>`
            );
        }
        return renderFunction;
    };

    /**
     *
     * @param node
     * @param parentNodes
     * @return {*}
     */
    renderNode = (node, parentNodes) => {
        const renderFunction = this.getRenderFunction(node.type);

        const parents = [...parentNodes];
        parents.unshift(node);

        if (node.type === "text") {
            return renderFunction(this._createElement, node, [], parentNodes, this._style);
        }

        const children = node.children.map(value => {
            return this.renderNode(value, parents);
        });

        return renderFunction(this._createElement, node, children, parentNodes, this._style);
    };

    /**
     *
     * @param nodes
     * @return {*}
     */
    render = nodes => {
        const children = nodes.map(value => this.renderNode(value, []));
        return rootRenderRule(this._createElement, children, this._style);
    };
}
