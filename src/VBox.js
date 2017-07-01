/**
 * Created by josh on 6/29/17.
 */
import React, {Component} from 'react'

export default class VBox extends Component {
    render() {
        const style = {
            display:'flex',
            flexDirection:'column'
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
        var id = "";
        if(this.props.id) id = this.props.id;
        return <div style={style}  id={id}>{this.props.children}</div>
    }
}
