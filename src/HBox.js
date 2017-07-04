/**
 * Created by josh on 6/29/17.
 */
import React, {Component} from 'react'

export default class HBox extends Component {
    generateStyle() {
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
        var fstyle = {};
        if(this.props.style) {
            fstyle = Object.assign(fstyle, this.props.style, style);
        } else {
            fstyle = Object.assign(fstyle, style);
        }
        return fstyle;
    }
    render() {
        var fstyle = this.generateStyle();
        var cls = "";
        if(this.props.className)  cls = this.props.className;
        var id = "";
        if(this.props.id) id = this.props.id;
        return <div style={fstyle}  id={id} className={cls}>{this.props.children}</div>
    }
}
