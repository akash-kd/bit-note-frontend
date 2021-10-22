import { withRouter } from 'next/router'
import React from 'react'
import * as bp3 from '@blueprintjs/core'
import Note from '../../components/Note'
import { authCtx } from '../../context/authCtx'
import axios from 'axios'


class Lang extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lang: props.lang,
      langs: props.langs,
      openAddNote: false,
      openAddTopic: false
    }
    this.toggleAddNote.bind(this)
    this.addNote.bind(this)
    this.getNotes.bind(this)
  }
  static contextType = authCtx

  componentDidMount(){
    this.setState({id:this.props.router.query.id})
  }
  toggleAddNote = () => {
    this.setState({openAddNote: !this.state.openAddNote})
  }
  toggleAddTopic = () => {
    this.setState({openAddTopic: !this.state.openAddTopic})
  }

  addNote = () => {
    if (this.state.title){
      axios.post('http://localhost:3030/lang/addNotes/'+this.props.router.query.id,{note:{title:this.state.title,desc:this.state.desc},createdBy:this.context.user})
        .then(res=>{
          this.setState({openAddNote: false,notes:res.data.notes})
        })
    }
    else{
      this.setState({warn: 'Title Field cannot be empty'})
    }
  }

  getNotes = () => {
    let notes = []
    let elems = []
    this.context.langs.filter(lang=> lang._id === this.props.router.query.id).map(lang=> notes = lang.notes)
    notes.forEach(note=>{
      elems.push(<Note key={note} id={note}/>)
    })
    if (this.state.notes){
      elems = []
      this.state.notes.forEach(note=>{
        elems.push(<Note key={note} id={note}/>)
      })
    }
    return (
      <>
        {elems}
      </>
    )
  }
  render() {
    // if user exists in context, then render page
    if (this.context.isAuth){
      return (
        <div className="w-full mar-0 pad-1 pad-tb">
          { /* top bar containt title, search,add note and add topic */}
          <div className="flex flex-row space-btw">
            <h1 className="mar-0 size-1">{this.props.router.query.lang}</h1>
            <div className="flex flex-row">
              <bp3.InputGroup leftIcon="search" placeholder="Search term"></bp3.InputGroup>
              <bp3.Button className="add-btn mar-lr" icon="plus" onClick={this.toggleAddNote}>Add Note</bp3.Button>
              <bp3.Button className="add-btn" intent={bp3.Intent.PRIMARY} icon="plus"  onClick={this.toggleAddTopic}>Add Topic</bp3.Button>
            </div>
          </div>
          { /* End of flex */}
      
          <bp3.Divider className="divider"/>

          {/* All the topic of the language comes here */}

          { /* add note modal */}
          <bp3.Dialog isOpen={this.state.openAddNote} enforceFocus>
            <div className="bp3-dialog-header space-btw">
              <h3>Enter title</h3>
              <bp3.Button icon="cross" onClick={this.toggleAddNote} minimal></bp3.Button>
            </div>
            <div className="bp3-dialog-body">
              <bp3.InputGroup required onChange={(e)=> {this.setState({title:e.target.value,warn: ''})}} className="mar-tb focus" placeholder="Enter title for note" autoComplete></bp3.InputGroup>
              <bp3.TextArea onChange={(e)=> {this.setState({desc:e.target.value})}} className="w-full mar-tb" placeholder="Enter note here" fill></bp3.TextArea>
              { this.state.warn ? <bp3.Callout intent={bp3.Intent.DANGER}>{this.state.warn}</bp3.Callout> : null }
            </div>

            <div className="bp3-dialog-footer">
              <div className="bp3-dialog-footer-actions">
                <bp3.Button onClick={this.toggleAddNote} icon='cross' >Cancel</bp3.Button>
                <bp3.Button onClick={this.addNote} icon='plus' intent={bp3.Intent.PRIMARY}>Add Note</bp3.Button>
              </div>
            </div>

          </bp3.Dialog>
          { /* end note modal */}

          { /* add topic modal */}
          <bp3.Dialog isOpen={this.state.openAddTopic}>
            <div className="bp3-dialog-header space-btw">
              <h3>Enter title</h3>
              <bp3.Button icon="cross" onClick={this.toggleAddTopic} minimal></bp3.Button>
            </div>
            <div className="bp3-dialog-body">
              <bp3.InputGroup onChange={(e)=> {this.setState({title:e.target.value,warn: ''})}} className="mar-tb" placeholder="Enter name of framework" ></bp3.InputGroup>
              { this.state.warn ? <bp3.Callout intent={bp3.Intent.DANGER}>{this.state.warn}</bp3.Callout> : null }
            </div>
            <div className="bp3-dialog-footer">
              <div className="bp3-dialog-footer-actions">
                <bp3.Button onClick={this.toggleAddTopic} icon='cross' >Cancel</bp3.Button>
                <bp3.Button onClick={this.addNote}icon='plus' intent={bp3.Intent.PRIMARY}>Add Note</bp3.Button>
              </div>
            </div>

          </bp3.Dialog>
          { /* end topic modal */}

          { /* notes */}
          {this.getNotes()}
        </div>
      )
    }
    // this is when is user is not logged in
    else{
      return (
        <div className="w-full mar-0 pad-1 pad-tb">
          <bp3.Callout intent={bp3.Intent.DANGER}></bp3.Callout>
        </div>
      )
    }
  }
}

export default withRouter(Lang)