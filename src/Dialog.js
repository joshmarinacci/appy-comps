import React, {Component} from 'react'

export default class Dialog extends Component {
    clickedScrim = (e) => {
        if(e.target !== this.scrim) return
        if(this.props.onScrimClick) this.props.onScrimClick(e)
    }
    render() {
        const scrimStyle = {
            position: 'fixed',
            top:0,
            bottom:0,
            left:0,
            right:0,
            backgroundColor: 'rgba(255,255,255,0.8)',
            zIndex: 2
        };

        const dialogStyle = {
            border: '1px solid darkgray',
            padding: '1em',
            position: 'absolute',
            left: '50%',
            top: '10em',
            transform: 'translate(-50%,0)',
            width: '40em',
            backgroundColor: 'white',
            boxShadow: '0px 4px 15px 5px rgba(0,0,0,0.23)'
        };

        if(!this.props.visible) return <div/>;
        return <div style={scrimStyle} ref={(scrim)=>this.scrim=scrim} onClick={this.clickedScrim}>
            <div style={dialogStyle}>{this.props.children}</div>
        </div>

    }
}
