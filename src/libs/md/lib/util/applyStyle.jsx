/**
 * @param {Function} h
 * @param {Array<any>} children
 * @param {Array<number>|Object} styles
 * @param {string} type
 */
export default function applyStyle(h, children, styles, type) {
    if (!(styles instanceof Array)) {
        styles = [styles];
    }
    return children.map(child => {
        if (child.type.displayName === type) {
            return <text key={child.key} {...child.props}
                         style={[].concat(child.props.style, styles)}/>;
        }

        return child;
    });
}
