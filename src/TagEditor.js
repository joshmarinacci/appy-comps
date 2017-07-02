import React, {Component} from 'react'


const tagEditorStyle = {
    border: '1px solid black',
    padding: '0.25em',
    position:'relative',
    display:'flex',
    flexDirection:'row',
    fontSize:'100%'
};
const tagStyle = {
    flex:0,
    border:'1px solid lightGreen',
    borderRadius:'0.5em',
    padding:'0.25em 0.5em',
    margin:'0.20em 0.20em',
    backgroundColor:'lightGreen'
};
const removeStyle = {
    border:'1px solid lightGreen',
    color:'gray',
    marginLeft:'0.5em',
    borderRadius:'1em',
    padding: '0.25em 0em',
    fontFamily:'sans-serif',
    fontSize:'90%'
};
const inputWrapperStyle = {
    flex:1,
    border: '1px solid gray',
    display:'flex',
    flexDirection:'row',
    position:'relative'
};
const inputStyle = {
    borderWidth:0,
    flex:1,
    fontSize:'100%'
}
const resultsStyle = {
    border:'1px solid red',
    position:'absolute',
    left:0,
    top:'3em',
    backgroundColor:'white',
    maxHeight:'100px',
    overflow:'scroll'
};

const resultsItemStyle = {
    border:'1px solid blue',
    padding: '0.25em',
    backgroundColor:'white'
};
/*
 .tag .remove:hover {
 background-color: white;
 }

 .tag-editor .results .item:hover {
 background-color: blue;
 color: white;
 }
 */
class TagView extends Component {
    constructor(props) {
        super(props);
        this.removeTag = () => this.props.removeTag(this.props.tag);
    }
    render() {
        return <span style={tagStyle}>{this.props.tag}
            <span style={removeStyle} onClick={this.removeTag}>x</span>
            </span>
    }
}

export default class TagEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTag:'',
            searchResults:[],
        };
        this.removeTag = (tag) => {
            var tags = this.props.tags;
            tags = tags.filter((t)=>t !== tag);
            this.props.onChange(tags);
        };
        this.edited = () => {
            var prefix = this.refs.input.value;
            this.setState({ newTag:prefix});
            if(this.props.search) {
                this.props.search(prefix,(res)=>{
                    this.setState({searchResults:res})
                })
            }
        };
        this.complete = (e) => {
            if(e.keyCode !== 13) return;
            this.props.onChange(this.props.tags.concat(this.state.newTag));
            this.setState({newTag:'', searchResults:[]})
        }
    }
    selectResult(res) {
        this.setState({newTag:'',searchResults:[]});
        this.props.onChange(this.props.tags.concat(res));
    }
    render() {
        return <div style={tagEditorStyle}>
            {this.props.tags.map((tag,i) => <TagView key={i} tag={tag} removeTag={this.removeTag}/>)}
            <div style={inputWrapperStyle}>
                <input ref='input' style={inputStyle} type="text"
                       placeholder="type a new tag" value={this.state.newTag}
                       onChange={this.edited}
                       onKeyDown={this.complete}
                />
                {this.renderSearchResults(this.state.searchResults)}
            </div>
        </div>
    }
    renderSearchResults(res) {
        if(res.length <= 0) return <div></div>
        return <div className="results" style={resultsStyle}>
            {res.map((r,i)=>{
                return <div key={i} className="item" style={resultsItemStyle} onClick={this.selectResult.bind(this,r)}>{r}</div>
            })}
        </div>
    }
}
