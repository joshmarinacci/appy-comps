/**
 * Created by josh on 11/29/16.
 */
import React, {Component} from 'react'

export class PopupManager {
    constructor() {
        this.shows = []
        this.hides = []
        this.id = "id_"+Math.floor(Math.random()*100000)
    }
    show(comp, owner) {
        this.shows.forEach(cb=>cb(comp,owner));
    }
    hide() {
        this.hides.forEach(cb=>cb());
    }
    onShow(cb) {
        this.shows.push(cb);
    }
    onHide(cb) {
        this.hides.push(cb);
    }
}


export const PopupManagerContext = React.createContext(new PopupManager())
