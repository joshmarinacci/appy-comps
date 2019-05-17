/**
 * Created by josh on 7/6/17.
 */
import React, {Component} from 'react'
import HBox from "./HBox";

export default class HToggleGroup extends Component {
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
        return <HBox>{items}</HBox>
    }
}
