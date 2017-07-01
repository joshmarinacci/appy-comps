/**
 * Created by josh on 6/29/17.
 */
import React, {Component} from 'react'

export default class HBox extends Component {
    render() {
        const style = {
            display:'flex',
            flexDirection:'row'
        };
        if(this.props.fill === true) {
            style.position = 'absolute';
            style.top = 0;
            style.bottom = 0;
            style.left = 0;
            style.right = 0;
        }
        if(this.props.grow === true) {
            style.flex = '1';
        }
        if(this.props.scroll === true) {
            style.overflow = 'auto';
        }
        return <div style={style}>{this.props.children}</div>
    }
}
