/**
 * Created by josh on 7/6/17.
 */

const DialogManager = {
    shows: [],
    hides: [],
    show: function show(comp) {
        this.shows.forEach(function (cb) {
            return cb(comp);
        });
    },
    hide: function hide() {
        this.hides.forEach(function (cb) {
            return cb();
        });
    },
    onShow: function onShow(cb) {
        this.shows.push(cb);
    },
    onHide: function onHide(cb) {
        this.hides.push(cb);
    }
};


module.exports = DialogManager;