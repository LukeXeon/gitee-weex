import {VNode} from 'vue'

/**
 * @param {Function} h
 * @param {Array<VNode>} children
 * @param {Array<number>|Object} styles
 * @param {string} type
 */

export default function applyStyle(h, children, styles, type) {
    if (!(styles instanceof Array)) {
        styles = [styles];
    }
    return children.map(child => {
        try {
            if (child.componentOptions.tag === type) {
                return <text key={child.data.key}{...child.componentOptions.propsData}
                             style={[].concat(child.componentOptions.propsData['style'], styles)}/>;
            }
        } catch (e) {

        }
        console.log(child)
        return child;
    });
}
