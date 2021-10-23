/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import styles from '../styles/components/note.module.css'
import * as bp3 from '@blueprintjs/core'
import Editor from '@monaco-editor/react'
import axios from 'axios'
import { Editor as RichEditor, EditorState, RichUtils, convertFromRaw, convertToRaw , } from 'draft-js'
import 'draft-js/dist/Draft.css'

const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
  'COLOR-RED':{
    color: 'crimson',
  },
  'COLOR-ORANGE':{
    color: 'tomato',
  },
  'COLOR-YELLOW':{
    color: 'gold',
  },
  'COLOR-GREEN':{
    color: 'greenyellow',
  },
  'COLOR-TEAL':{
    color: 'turquoise',
  },
  'COLOR-BLUE':{
    color: 'dodgerblue',
  },
  'COLOR-VOILET':{
    color: 'blueviolet',
  },
  'COLOR-WHITE':{
    color: 'white',
  },
  'COLOR-BLACK':{
    color: 'black',
  },

  // ! BACKGROUND COLORS
  'BG-RED':{
    backgroundColor: 'rgb(255,41,41,0.7)',
  },
  'BG-ORANGE':{
    backgroundColor: 'rgba(255,122,41,0.7)',
  },
  'BG-YELLOW':{
    backgroundColor: 'rgba(250,208,46,0.7)',
  },
  'BG-GREEN':{
    backgroundColor: 'rgba(145,250,73,0.7)',
  },
  'BG-TEAL':{
    backgroundColor: 'rgba(54,216,183,0.7)',
  },
  'BG-BLUE':{
    backgroundColor: 'rgba(59,138,255,0.7)',
  },
  'BG-VOILET':{
    backgroundColor: 'rgba(153,30,249,0.7)',
  },
  'BG-NONE':{
    backgroundColor: 'transparent',
  },
}
const appHotkeys = [
  {
    combo: 'ctrl + b',
    global: true,
    label: 'Open',
    onKeyDown: () => console.info('open'),
  },
]
class Note extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      desc: '',
      code:'',
      content: '',
      newTitle:'',
      newDesc:'',
      newCode:'',
      warn:'',
      edit:false,
      editTitle:false,
      toolbar: false,
      editorState: EditorState.createEmpty()
    }
    this.onChange = this.onChange.bind(this)
    this.toggleColor = this.toggleColor.bind(this)
    this._onBoldClick = this._onBoldClick.bind(this)
    this._onItalicClick = this._onItalicClick.bind(this)
    this._onUnderlineClick = this._onUnderlineClick.bind(this)
    this._onStrikeThroughClick = this._onStrikeThroughClick.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onCancle = this.onCancle.bind(this)
  }

  async componentDidMount() {
    console.log('Note mounted')
    await axios.post(process.env.URL_KEY + '/note/getNote',{id:this.props.id})
      .then(res => {
        console.log('DATA FROM SERVER',res.data)

        if (res.data.desc == undefined || res.data.desc.blocks[0].text === '' ) {
          this.setState({
            title: res.data.title,
            editorState: EditorState.createEmpty(),  
            code: res.data.code,
          })
        }
        else {
          res.data.desc.entityMap = {}
          this.setState({
            title: res.data.title,
            editorState: EditorState.createWithContent(convertFromRaw(res.data.desc)),
            code: res.data.code,
          })
        }

      })
      .catch(err => {
        console.log(err.message)
        this.setState({warn: 'Error loading note'})
      })
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('Note updated')
  }



  onSave() {
    console.log('tit:',this.state.newTitle)
    console.log('desc:',this.state.editorState.getCurrentContent())
    console.log('code:',this.state.code)
    let title
    if (this.state.newTitle) {
      title = this.state.newTitle
    } else {
      title = this.state.title
    }

    axios.post(process.env.URL_KEY + '/note/updateNote',
      {
        id:this.props.id,
        title:title,
        desc:convertToRaw( this.state.editorState.getCurrentContent() ),
        code:this.state.code
      }
    )
    this.setState({edit:false,editTitle:false,toolbar:false})
  }

  onCancle(){
    this.setState({
      editTitle:false,
      edit:false,
      toolbar:false,
      newTitle:'',
      newDesc:'',
      newCode:'',
    })
  }

  onChange(editorState) {
    this.setState({
      editorState,
      edit:true,
    })
  }



  toggleColor(color) {
    switch (color) {
    case 'red':
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'COLOR-RED'))
      break
    case 'orange':
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'COLOR-ORANGE'))  
      break  
    case 'yellow':
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'COLOR-YELLOW'))
      break    
    case 'green':
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'COLOR-GREEN')) 
      break   
    case 'teal':
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'COLOR-TEAL'))
      break
    case 'blue':
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'COLOR-BLUE'))
      break
    case 'voilet':
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'COLOR-VOILET'))
      break
    case 'white':
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'COLOR-WHITE'))
      break
    case 'black':
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'COLOR-BLACK'))
      break
    }
    
  }

  toggleBackgroundColor(color) {
    switch (color) {
    case 'red':
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BG-RED'))
      break
    case 'orange':
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BG-ORANGE'))
      break
    case 'yellow':
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BG-YELLOW'))
      break
    case 'green':
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BG-GREEN'))
      break
    case 'teal':
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BG-TEAL'))
      break
    case 'blue':
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BG-BLUE'))
      break
    case 'voilet':
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BG-VOILET'))
      break
    case 'none':
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BG-NONE'))
      break

    }
  }
  _onBoldClick() {
    console.log('bold')
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }
  _onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
  }
  _onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'))
  }
  _onStrikeThroughClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'STRIKETHROUGH'))
  }


  render(){
    console.log('render',this.state.title,this.state.editorState,this.state.code)
    return(
      <bp3.Card className={styles.note}>

        <div className={styles.title + ' space-btw'}>
          {
            this.state.editTitle ?
              <bp3.InputGroup placeholder="Edit title" onChange={ (e)=>this.setState({newTitle:e.target.value}) }/>
              :
              <h2>{this.state.title}</h2>
          }

          {
            this.state.warn ?
              <bp3.Icon icon="warning-sign" intent={bp3.Intent.DANGER}/>
              :
              <></>
          }
          

          <bp3.Popover 
            placement="bottom-right"
            minimal
            content={
              <bp3.Menu>
                <bp3.MenuItem icon="font" text="Edit title" onClick={()=>this.setState({editTitle:!this.state.editTitle,edit:true})}/>
                <bp3.MenuItem icon="edit" text="Edit" onClick={()=>{this.setState({toolbar:!this.state.toolbar,edit:true})}} />
                <bp3.MenuItem icon="delete" text="Delete" intent={bp3.Intent.DANGER}/>
                <bp3.MenuDivider title="Language"/>
                <bp3.MenuItem icon="code" text="language">
                  <bp3.MenuItem icon="code" text="javascript" />
                  <bp3.MenuItem icon="code" text="python" />
                  <bp3.MenuItem icon="code" text="c++" />
                </bp3.MenuItem>
                <bp3.MenuItem icon="code" text="theme">
                  <bp3.MenuItem icon="code" text="dark" />
                  <bp3.MenuItem icon="code" text="light" />
                  <bp3.MenuItem icon="code" text="c++" />
                </bp3.MenuItem>
                <bp3.MenuDivider title="Resize"/>
                <bp3.MenuItem icon="plus" text="Increase size" />
                <bp3.MenuItem icon="minus" text="Decrease size" />
              </bp3.Menu>
            }
            target={<bp3.Button icon="more" minimal></bp3.Button>}
          >
          </bp3.Popover>
        </div>
        <bp3.Divider className={styles.divider}/>
          
        
        <div className={styles.desc}>
          { 
            this.state.toolbar ?
              <div className={styles.toolbar}>
                <bp3.ButtonGroup>
                  <bp3.Button icon="bold" onClick={this._onBoldClick}/>
                  <bp3.Button icon="italic" onClick={this._onItalicClick}/>
                  <bp3.Button icon="underline" onClick={this._onUnderlineClick}/>
                  <bp3.Button icon="strikethrough" onClick={this._onStrikeThroughClick}/>
            
                  <bp3.Divider/>
                  <bp3.Popover
                    minimal
                    content={
                      <bp3.Menu>
                        <bp3.MenuDivider title="Color"/>
                        <bp3.MenuItem icon={<bp3.Icon icon="full-circle" className={styles.red}/>}    text="red" onClick={()=>this.toggleColor('red')}/>
                        <bp3.MenuItem icon={<bp3.Icon icon="full-circle" className={styles.orange}/>} text="orange" onClick={()=>this.toggleColor('orange')}/>
                        <bp3.MenuItem icon={<bp3.Icon icon="full-circle" className={styles.yellow}/>} text="yellow" onClick={()=>this.toggleColor('yellow')}/>
                        <bp3.MenuItem icon={<bp3.Icon icon="full-circle" className={styles.green}/>}  text="green" onClick={()=>this.toggleColor('green')}/>
                        <bp3.MenuItem icon={<bp3.Icon icon="full-circle" className={styles.teal}/>}   text="teal" onClick={()=>this.toggleColor('teal')}/>
                        <bp3.MenuItem icon={<bp3.Icon icon="full-circle" className={styles.teal}/>}  text="blue" onClick={()=>this.toggleColor('blue')}/>
                        <bp3.MenuItem icon={<bp3.Icon icon="full-circle" className={styles.teal}/>} text="voilet" onClick={()=>this.toggleColor('voilet')}/>
                        <bp3.MenuItem icon={<bp3.Icon icon="full-circle" className={styles.white}/>}  text="white" onClick={()=>this.toggleColor('white')}/>
                        <bp3.MenuItem icon={<bp3.Icon icon="full-circle" className={styles.black}/>}  text="black" onClick={()=>this.toggleColor('black')}/>
                      </bp3.Menu>
                    }
                    target = {<bp3.Button icon="tint"/>}
                  />
                  <bp3.Popover
                    minimal
                    content={
                      <bp3.Menu>
                        <bp3.MenuDivider title="Background color"/>
                        <bp3.MenuItem icon={<bp3.Icon icon="full-circle" className={styles.red}/>}  text="red" onClick={()=>this.toggleBackgroundColor('red')}/>
                        <bp3.MenuItem icon={<bp3.Icon icon="full-circle" className={styles.orange}/>} text="orange" onClick={()=>this.toggleBackgroundColor('orange')}/>
                        <bp3.MenuItem icon={<bp3.Icon icon="full-circle" className={styles.yellow}/>} text="yellow" onClick={()=>this.toggleBackgroundColor('yellow')}/>
                        <bp3.MenuItem icon={<bp3.Icon icon="full-circle" className={styles.green}/>} text="green" onClick={()=>this.toggleBackgroundColor('green')}/>
                        <bp3.MenuItem icon={<bp3.Icon icon="full-circle" className={styles.teal}/>} text="teal" onClick={()=>this.toggleBackgroundColor('teal')}/>
                        <bp3.MenuItem icon={<bp3.Icon icon="full-circle" className={styles.blue}/>} text="blue" onClick={()=>this.toggleBackgroundColor('blue')}/>
                        <bp3.MenuItem icon={<bp3.Icon icon="full-circle" className={styles.teal}/>} text="voilet" onClick={()=>this.toggleBackgroundColor('voilet')}/>
                        <bp3.MenuItem icon="disable" text="none" onClick={()=>this.toggleBackgroundColor('none')}/>
                      </bp3.Menu>
                    }
                    target = {<bp3.Button icon="highlight"></bp3.Button>}
                  />
                  
                </bp3.ButtonGroup>
              </div> : <></>
          } 
          <bp3.HotkeysTarget2 hotkeys={appHotkeys}>
            <RichEditor 
              customStyleMap={styleMap}
              editorState={this.state.editorState} 
              onChange={this.onChange}
              placeholder="Write your note here"
            />
          </bp3.HotkeysTarget2>
        </div>
        <div className={styles.code}> 
          <Editor
            width="auto"
            theme="vs-dark"
            defaultLanguage="javascript"
            defaultValue={this.state.code}
            value={this.state.code}
            onChange={(newval) => {
              this.setState({code:newval,edit:true})
            }
            }
          />
        </div>
        <bp3.Collapse isOpen={this.state.edit} className={styles.bottom}>
          <bp3.Button onClick={this.onCancle} icon="cross" intent={bp3.Intent.NONE} className={styles.bottomBtn}>Cancel</bp3.Button>
          <bp3.Button onClick={this.onSave} icon="tick" intent={bp3.Intent.PRIMARY} className={styles.bottomBtn} >Save changes</bp3.Button>
        </bp3.Collapse>
      </bp3.Card>
    )
  }

}



export default Note