import React, {Component} from 'react'
import {render} from 'react-dom'

import HBox from "../../src/HBox";
import VBox from "../../src/VBox";
import Dialog from "../../src/Dialog";
import PopupContainer from "../../src/PopupContainer";
import PopupManager from "../../src/PopupManager";
import Spacer from "../../src/Spacer";
import TagEditor from "../../src/TagEditor";

class ColorPanel extends Component {
    render() {
        return <div style={{
        backgroundColor:this.props.item,
        width:'50px'
        }}>{this.props.item}</div>
    }
}
class GridListView extends Component {
    static defaultProps = {
        width: '100px'
    }
    render() {
        var items = this.props.list.map((it,i)=>{
            var Temp = this.props.template;
            return <div key={i}><Temp item={it}/></div>
        });
        return <div style={{
        display:"flex",
        flexDirection:'row',
        flexWrap:"wrap",
        width:this.props.width
        }}>{items}</div>;
    }
}

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible:false,
            tags:['foo','bar']
        };

        this.hidePopup = () => PopupManager.hide();
        this.openDialog = () => this.setState({dialogVisible:true});
        this.closeDialog = () => this.setState({dialogVisible:false});


        var possible = [
            'foo','bar','baz','quxx','far out','bear'
        ];
        this.searchTag = (str, cb)=>{
            cb(possible.filter((t)=>t.indexOf(str)===0));
        };
        this.tagsEdited = (tags) => {
            this.setState({tags:tags})
        }

    }
    openPopup() {
        var options = <div>
            <button onClick={this.hidePopup}>option 1</button>
            <button onClick={this.hidePopup}>option 2</button></div>;
        PopupManager.show(options,this.refs.popupTrigger);
    }
    openColorPicker() {
        var colors = ["red",'green','blue'];
        var grid = <GridListView template={ColorPanel} list={colors}/>
        PopupManager.show(grid, this.refs.colorTrigger);
    }
    render() {
        return <div>
            <VBox fill={true}>
                <HBox grow={true}>
                    <VBox>
                        <div>header</div>
                        <VBox grow={true} className="list">
                            the contents of the list box foo
                        </VBox>
                    </VBox>
                    <VBox>
                        <button onClick={this.openDialog}>open a dialog</button>
                        <button ref='popupTrigger' onClick={this.openPopup.bind(this)}>open popup</button>
                        <button ref='colorTrigger' onClick={this.openColorPicker.bind(this)}>open colors</button>
                    </VBox>
                    <VBox>
                        <TagEditor
                            tags={this.state.tags}
                            search={this.searchTag}
                            onChange={this.tagsEdited}
                        />
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
