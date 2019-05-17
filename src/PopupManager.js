/**
 * Created by josh on 11/29/16.
 */
module.exports = {
    shows:[],
    hides:[],
    show: function(comp, owner) {
        this.shows.forEach(cb=>cb(comp,owner));
    },
    hide: function() {
        this.hides.forEach(cb=>cb());
    },
    onShow: function(cb) {
        this.shows.push(cb);
    },
    onHide: function(cb) {
        this.hides.push(cb);
    }
};
