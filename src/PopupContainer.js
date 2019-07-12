import React, {Component} from "react";
import {PopupManagerContext} from './PopupManager';

class PopupContainerImpl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comp:null,
            owner:null,
            showing:false,
            offset:0,
        }
    }

    componentWillMount() {
        const PopupManager = this.context
        PopupManager.onShow((comp, owner)=>{
            this.setState({comp:comp, showing:true, owner:owner});
            setTimeout(()=>{
                var rect = this.wrapper.getBoundingClientRect();
                var extent = rect.top + rect.height;
                var max = window.innerHeight;
                if(extent > max) {
                    console.log("too far, move it up");
                    this.setState({
                        offset: -(extent-max)
                    })
                }
            },25);
        });
        PopupManager.onHide(()=>{
            this.setState({comp:null, showing:false, owner:null, offset:0});
        });
    }

    clickScrim() {
        this.setState({
            comp:null,
            showing:false,
            offset:0,
        });
    }

    render() {
        var x = 200;
        var y = 200;
        if(this.state.owner) {
            var rect = this.state.owner.getBoundingClientRect();
            x = rect.left;
            y = rect.top + rect.height + this.state.offset;
        }
        return <div style={{
            position:'fixed',
            top:0,
            bottom:0,
            left:0,
            right:0,
            zIndex:100,
            display:this.state.showing?'block':'none'
        }}><div
            onClick={this.clickScrim.bind(this)}
            style={{
                backgroundColor:'red',
                opacity:0.0,
                position:'absolute',
                left:0, right:0, top:0, bottom:0
                }}
        >scrim</div>

            <div
                ref={(e) => this.wrapper = e}
                id='popup-wrapper'
                style={{
                    position: 'absolute',
                    left: x+'px',
                    top: y+'px',
                    border:'0px solid black',
                    backgroundColor:'white',
                    display:'inline-block'
                    }}
            >{this.state.comp!==null?this.state.comp:'nothing' }</div>
        </div>
    }
}
PopupContainerImpl.contextType = PopupManagerContext
export const PopupContainer = PopupContainerImpl