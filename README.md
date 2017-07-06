# Appy Comps: React Components for Apps 

[![npm package][npm-badge]][npm]

Appy Comps is a set of reusable minimal components for application-oriented
react programs, rather than document oriented. The components are designed to be lightweight,
very composable, and with no intrinsic style.


# layout

HBox and VBox

Renders the contents in a horizontal row, by default giving each component it's desired space. 
Anything left over is empty space. HBox uses FlexBox underneath.  If you want one child to
take up the remaining space, then set the grow attribute to true.  To make the contents of the box
scroll, set scroll to true. Normally the box will be positioned in it's natural place and default
size. However, typically you want your top level box to fill the entire viewport. Set fill to 
true for this behavior.  VBox is identical except it creates a vertical row.
 
Here's an example. To have an iTunes like layout with a toolbar at the top, a scrolling list
 on the left with a width of 300px, and make middle take up the rest of the available space: do 
 this:

```
<VBox fill>
  <HBox>
     <button>prev</button>
     <button>play</button>
     <button>next</button>
     
     <Spacer/>
     
     <label>title of the current song</label>
     
     <Spacer/>
     
     <input type='search' placeholder='search for a song'>
 </HBox>
 
 <HBox grow>
   <VBox scroll style={{width:'300px'}}>
     list of playlists goes here
   </VBox>
   <VBox grow>
        this is the main content here
   </VBox>
 </HBox>
</VBox>
```

The outermost vbox uses 'fill' to fill the window.  The first HBox is the toolbar. The spacers
suck up all extra space evenly, so the song title will be centered automatically with the other
controls at the ends.  The first inner VBox has a manually set width of 300px and will scroll 
it's contents.  The second inner VBox will take up the rest of the available space.


# Spacer

The Spacer just takes up empty space. It's the equivalent of `<div grow=true></div>`



# Dialog

The Dialog will render a dialog centered in the viewport. It has a translucent scrim to hide the
content behind.  To ensure the dialog is above all other content you should place it at the end 
of your main div.  Put the dialog contents inside of the Dialog. ex:

```
<div>
    this is the main content
    
    <!-- put all dialogs down here -->
    <Dialog visible={this.state.dialogVisible}>
        <p>do you want to save the document?</p>
        <HBox>
            <button onClick={()=>this.setState({dialogVisible:false})}>cancel</button>
            <button onClick={this.doTheSaveAction}>Save</button>
        </HBox>
    </Dialog>
</div>
```


# PopupContainer and PopupManager

Popups like dropdown menus and color pickers may be called from anywhere in your document, but 
they need to always be rendered above all other content, even scrolling content. That's what the 
PopupContainer container does. Place it at end of your main content, after the Dialogs, like this:

```
<div>
    this is the main content
    
    <!-- put all dialogs down here -->
    <Dialog visible={this.state.dialogVisible}>   ... </Dialog>
    
    <PopupContainer/>
</div>
```

Note: only create one PopupContainer. It has no arguments.  

To show a popup you must call the PopupContainer.show() method in an event
handler somewhere. Pass in the contents of the popup along with the reference to the
component which triggered the popup (for placement).

```
this.clickedShareButton = () => {
    let contents = <div>
        <button>Send to Twitter</button>
        <button>Send to Facebook</button>
    </div>;
        
    PopupManager.show(contents, this.refs.shareButton);
}
```

PopupContainer creates an invisible scrim behind the popup so any clicks outside of popup 
contents will cancel the popup.  To manually hide the popup, such as when the user selects an
item in the popup, call `PopupManager.hide()`;


# Selection Groups


These are for components which let the user choose one option from a set of possible options.  
They all use the same pattern where you provide the model, state, and rendering template.

A scrolling vertical list of items

A group of mutually exclusive toggle buttons

HToggleGroup renders horizontally. use VToggleGroup for vertical 


# experimental 
TagEditor





[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

