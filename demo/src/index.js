import React, {Component} from 'react'
import {render} from 'react-dom'

import HBox from "../../src/HBox";
import VBox from "../../src/VBox";
import Dialog from "../../src/Dialog";
class Spacer extends Component {
    render() {
        return <span style={{flex:1}}></span>
    }
}
class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible:false
        }
    }
    openDialog() {
        console.log("opening a dialog");
        this.setState({dialogVisible:true});
    }
    closeDialog() {
        console.log("closing the dialog");
        this.setState({dialogVisible:false});
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
                        <button onClick={this.openDialog.bind(this)}>open a dialog</button>
                    </VBox>
                </HBox>
            </VBox>
            <Dialog visible={this.state.dialogVisible}>
                <header>header</header>
                <div>contents</div>
                <footer>
                    <HBox><Spacer/><button onClick={this.closeDialog.bind(this)}>close</button></HBox>
                </footer>
            </Dialog>
        </div>
    }
}

render(<Demo/>, document.querySelector('#demo'))
