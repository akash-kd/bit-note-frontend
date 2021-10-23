import {useEffect, useState} from 'react'
import Head from 'next/head'
import React from 'react'
import * as bp3 from '@blueprintjs/core'
import Lang from '../components/Lang'
import AllLangs from '../components/AllLangs'
import styles from '../styles/user.module.css'
import axios from 'axios'
import {authCtx} from '../context/authCtx'
import Router from 'next/router'


class user extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      overlay: false,
      showWarn: false,
      warn: '',
    }
    this.elem.bind(this)
    this.toggleOverlay.bind(this)
    this.handleName.bind(this)
    this.addLang.bind(this)
  }
static contextType = authCtx

componentDidMount(){
  const email = localStorage.getItem('email')
  this.setState({email})
  
}

toggleOverlay = () => this.setState({overlay: !this.state.overlay})

handleName = (e) => this.setState({name: e.target.value})

addLang = async (e) =>{
  if (this.state.name){
    await axios.post(process.env.URL_KEY + '/lang/addLang',{
      name: this.state.name,
      createdBy: this.context.user
    })
      .then( res => {
        console.log('res from add',res.data)
        let langs = this.context.langs
        langs.push(res.data)
        this.context.setLangs(langs)
        this.setState({
          warn:'',
          showWarn: false,
          overlay: false,
        })
        Router.push('/user')
      })
      .catch(err => {
        console.log(err)
      })
  }
  else{
    this.setState({
      warn:'Language cannot be empty',
      showWarn: true
    })

  }

}

submitLang = (e) => {
  if(e.key === 'Enter'){
    this.addLang()
  }
}

elem(){
  {/* show all language if email is available else the shows the warning that user is not loggined */}
  if(this.state.email){
    return(
      <>
        <div className="flex flex-row w-full space-btw">
          {
            /* Top bar:
							structure: <h1 Languages /> <space> <button add language />
							Divider
							Body:
							structure: < Alllanges grid<langs /> />
							*/
          }
          <h2 className="mar-0">Laguages</h2>
          <bp3.Button className="add-btn" intent={bp3.Intent.PRIMARY} icon="plus" onClick={this.toggleOverlay}>Add Language</bp3.Button>
          { /* Overlay for add language open when add button is clicked */}
          <bp3.Dialog isOpen={this.state.overlay} canOutsideClickClose={true} canEscapeKeyClose={true} enforceFocus>
            <div className='bp3-dialog-header'>
              <h3>Enter the name of the programming language</h3>
            </div>
            <div className="bp3-dialog-body">
              <bp3.InputGroup required onKeyPress={this.submitLang.bind(this)} onChange={this.handleName} placeholder="enter the name of the language">    
              </bp3.InputGroup>
              <bp3.Collapse isOpen={this.state.showWarn}>
                <bp3.Callout intent={bp3.Intent.DANGER}>{this.state.warn}</bp3.Callout>
              </bp3.Collapse>
            </div>
            <div className='bp3-dialog-footer'>
              <div className="bp3-dialog-footer-actions">
                <bp3.Button onClick={this.toggleOverlay}  text="cancel" icon='cross'></bp3.Button>
                <bp3.Button onClick={this.addLang} text="add" intent={bp3.Intent.PRIMARY} icon='plus'></bp3.Button>
                <div className="bp3-dialog-footer-actions"></div>
              </div>
            </div>
          </bp3.Dialog>
          {/* Overlay over */}
        </div>	
        <bp3.Divider className="divider"/>

        <AllLangs user={this.context.user}/>
      </>
    )
  }
  else{
    return(
      <bp3.Callout className='mar-tb' title="User not Logged-in" about="HEll" intent={bp3.Intent.WARNING}>Create an account or sign in to add notes</bp3.Callout>
    )
  }
}

render() {
  return (
    <div className="w-full mar-0 pad-1 pad-tb">
      {this.elem()}
    </div>
  )
}
}



export default user
