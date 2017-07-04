/**
 * Created by josh on 6/29/17.
 */
import React, {Component} from 'react'
import HBox from "./HBox"

export default class VBox extends HBox {
    render() {
        var fstyle = this.generateStyle();
        var cls = "";
        if(this.props.className)  cls = this.props.className;
        var id = "";
        if(this.props.id) id = this.props.id;
        return <div style={fstyle}  id={id} className={cls}>{this.props.children}</div>
    }
}
