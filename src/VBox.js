/**
 * Created by josh on 6/29/17.
 */
import React, {Component} from 'react'
import HBox from "./HBox"

export default class VBox extends HBox {
    constructor(props) {
        super(props);
        this._direction = 'column';
    }
}
