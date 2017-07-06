/**
 * Created by josh on 6/29/17.
 */
import React, {Component} from 'react'

export default class HBox extends Component {
    constructor(props) {
        super(props);
        this._direction = 'row';
    }
    render() {
        const {style, fill, grow, scroll, ...rest} = this.props;

        let style2 = {
            display:'flex',
            flexDirection:this._direction
        };
        if(grow === true)   style2.flex = '1';
        if(scroll === true) style2.overflow = 'auto';
        if(fill === true) {
            style2.position = 'absolute';
            style2.top = 0;
            style2.bottom = 0;
            style2.left = 0;
            style2.right = 0;
        }
        var fstyle = Object.assign({}, style, style2);
        return <div style={fstyle} {...rest}>{this.props.children}</div>
    }
}
