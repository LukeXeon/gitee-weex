/**
 *  @param {Function} h
 **/
export default function getApplyStyle(h) {
    /**
     * @param {Array<any>} children
     * @param {Array<number>} styles
     * @param {string} type
     */
    function applyStyle(children, styles, type) {
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

    return applyStyle
}
