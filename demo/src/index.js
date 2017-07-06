import React, {Component} from 'react'
import {render} from 'react-dom'

import Dialog from "../../src/Dialog";
import PopupContainer from "../../src/PopupContainer";
import PopupManager from "../../src/PopupManager";
import Spacer from "../../src/Spacer";
import TagEditor from "../../src/TagEditor";
import {HBox, VBox, PopupMenu, VToggleGroup, ListSelect, HToggleGroup} from "../../src/index";

import "./test.css";

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

const ToggleButtonTemplate = (props) => {
    var style = {
        backgroundColor : props.selected? "white":"lightblue"
    }
    return <button style={style} onClick={props.onSelect}>{props.item.title}</button>
};

const MenuItemTemplate = (props) => {
    var cls = "menu-item " + (props.selected?"selected":"");
    return <div className={cls} onClick={props.onSelect}>{props.item.title}</div>
};

const SelectItemTemplate = (props) => {
    return <option value={props.item.name}>{props.item.title}</option>
};

const ListItemTemplate = (props) => {
    var clss = "list-item " + (props.selected?"selected":"");
    return <HBox className={clss} onClick={props.onSelect}><b>{props.item.name}</b> <i>{props.item.title}</i> yo!</HBox>
}


class SelectMenu extends Component {
    constructor(props) {
        super(props);
        this.handleChange = (event) => {
            var sel = this.props.list.find((item)=>item.name === event.target.value);
            this.props.onChange(sel);
        }
    }
    render() {
        var ItemTemplate = this.props.template;
        var selectedItem = null;
        var items = this.props.list.map((item,i) => {
            if(item === this.props.selected) selectedItem = item;
            return <ItemTemplate
                key={i}
                item={item}
                selected={item===this.props.selected}
            />
        });
        return <select onChange={this.handleChange} value={this.props.selected.name}>{items}</select>
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


        const possible = [
            'foo','bar','baz','quxx','far out','bear'
        ];
        this.searchTag = (str, cb)=>{
            cb(possible.filter((t)=>t.indexOf(str)===0));
        };
        this.tagsEdited = (tags) => {
            this.setState({tags:tags})
        };

        this.list = [
            { name:'eyedropper', title:'Eye Dropper', fun: ()=>console.log("i'm the eyedropper")},
            { name:'pencil', title:'Pencil Tool', fun: ()=>console.log("i'm the pencil")},
            { name:'eraser', title:'Erase Tool', fun: ()=>console.log("i'm the eraser")},
        ];
        this.state.selectedToggle = this.list[1];
        this.toggleChanged = (item) => {
            this.setState({selectedToggle:item});
            PopupManager.hide();
        }


        this.openMenu = () => {
            console.log("opening");
            var content = <PopupMenu list={this.list} selected={this.state.selectedToggle} template={MenuItemTemplate} onChange={this.toggleChanged}/>;
            PopupManager.show(content,this.refs.menuTrigger);
        }

    }
    renderHorizontalToggleGroup() {
        return <HToggleGroup
            list={this.list}
            selected={this.state.selectedToggle}
            template={ToggleButtonTemplate}
            onChange={this.toggleChanged}
        />
    }
    renderVerticalToggleGroup() {
        return <VToggleGroup
            list={this.list}
            selected={this.state.selectedToggle}
            template={ToggleButtonTemplate}
            onChange={this.toggleChanged}/>
    }
    renderSelectMenu() {
        return <SelectMenu
            list={this.list}
            selected={this.state.selectedToggle}
            template={SelectItemTemplate}
            onChange={this.toggleChanged}
        />
    }
    renderListSelect() {
        return <ListSelect
            list={this.list}
            selected={this.state.selectedToggle}
            template={ListItemTemplate}
            onChange={this.toggleChanged}
        />
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
            <VBox fill>
                <HBox grow>
                    <div>
                        this is a vertical toggle group {this.renderVerticalToggleGroup()}
                    </div>
                    <VBox>
                        <div>header</div>
                        <VBox grow className="list">
                            the contents of the list box foo.<br/> it should have a red background
                            {this.renderListSelect()}
                        </VBox>
                    </VBox>
                    <VBox>
                        <button onClick={this.openDialog}>open a dialog</button>
                        <button ref='popupTrigger' onClick={this.openPopup.bind(this)}>open popup</button>
                        <button ref='colorTrigger' onClick={this.openColorPicker.bind(this)}>open colors</button>
                        <button ref="menuTrigger" onClick={this.openMenu}>Open Menu</button>
                        {this.renderSelectMenu()}
                    </VBox>
                    <VBox>
                        <TagEditor
                            tags={this.state.tags}
                            search={this.searchTag}
                            onChange={this.tagsEdited}
                        />
                    </VBox>
                </HBox>
                <HBox grow style={{backgroundColor:'green'}} onClick={()=> console.log("clicked")}>
                    anotehr hbox. it should be green;
                </HBox>
                <HBox>
                    {this.renderHorizontalToggleGroup()}
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
