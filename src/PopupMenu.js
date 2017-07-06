/**
 * Created by josh on 7/6/17.
 */
import React, {Component} from 'react'
import VBox from "./VBox";

export default class PopupMenu extends Component {
    render() {
        var ItemTemplate = this.props.template;
        var items = this.props.list.map((item,i) => {
            return <ItemTemplate
                key={i}
                item={item}
                selected={item===this.props.selected}
                onSelect={()=>{
                    this.props.onChange(item);
                }}
            />
        });
        return <VBox>{items}</VBox>
    }
}
