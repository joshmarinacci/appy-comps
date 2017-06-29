/**
 * Created by josh on 6/29/17.
 */
import React, {Component} from 'react'

export default class HBox extends Component {
    render() {
        const style = {
            display:'flex',
            flexDirection:'column'
        };
        return <div style={style}>{this.props.children}</div>
    }
}
