/**
 * Created by josh on 7/7/17.
 */

import React, {Component} from "react";
import DialogManager from "./DialogManager";

export default class DialogContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comp:null,
            showing:false,
            offset:0,
        }
    }
    componentWillMount() {
        DialogManager.onShow((comp)=>{
            this.setState({comp:comp, showing:true});
        });
        DialogManager.onHide(()=>{
            this.setState({comp:null, showing:false, offset:0});
        });
    }
    render() {
        return <div>{this.state.comp}</div>
    }
}
