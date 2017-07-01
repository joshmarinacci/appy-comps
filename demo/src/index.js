import React, {Component} from 'react'
import {render} from 'react-dom'

import HBox from "../../src/HBox";
import VBox from "../../src/VBox";
import Dialog from "../../src/Dialog";
import PopupContainer from "../../src/PopupContainer";
import PopupManager from "../../src/PopupManager";
import Spacer from "../../src/Spacer";


class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible:false
        };

        this.hidePopup = () => PopupManager.hide();
        this.openDialog = () => this.setState({dialogVisible:true});
        this.closeDialog = () => this.setState({dialogVisible:false});
    }
    openPopup() {
        var options = <div>
            <button onClick={this.hidePopup}>option 1</button>
            <button onClick={this.hidePopup}>option 2</button></div>;
        PopupManager.show(options,this.refs.popupTrigger);
    }
    render() {
        return <div>
            <VBox fill={true}>
                <HBox grow={true}>
                    <VBox>
                        <div>header</div>
                        <VBox grow={true} className="list">
                            the contents of the list box
                        </VBox>
                    </VBox>
                    <VBox>
                        <button onClick={this.openDialog}>open a dialog</button>
                        <button ref='popupTrigger' onClick={this.openPopup.bind(this)}>open popup</button>
                    </VBox>
                </HBox>
            </VBox>

            <Dialog visible={this.state.dialogVisible}>
                <header>header</header>
                <div>contents</div>
                <footer>
                    <HBox>
                        <Spacer/>
                        <button onClick={this.closeDialog}>close</button>
                    </HBox>
                </footer>
            </Dialog>

            <PopupContainer/>
        </div>
    }
}

render(<Demo/>, document.querySelector('#demo'))
