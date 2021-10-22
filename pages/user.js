import {useEffect, useState} from 'react'
import Head from 'next/head'
import React from 'react'
import * as bp3 from '@blueprintjs/core'
import Lang from '../components/Lang'
import AllLangs from '../components/AllLangs'
import styles from '../styles/user.module.css'
import axios from 'axios'
import {authCtx} from '../context/authCtx'



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

	toggleOverlay = () => {

	  this.setState({overlay: !this.state.overlay})
	}

	handleName = (e) => {
	    this.setState({name: e.target.value})
	}

	addLang = async (e) =>{
	   if (this.state.name){
	     await axios.post('http://localhost:3030/lang/addLang',{
	       name: this.state.name,
	       createdBy: this.context.user
		  }).then( res => {
		   this.setState({
	         warn:'',
	         showWarn: false
	       })
		  }).catch(err => {
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
					body:
						structure: < Alllanges grid<langs /> />
				 */
	          }
	          <h2 className="mar-0">Laguages</h2>
	          <bp3.Button className="add-btn" intent={bp3.Intent.PRIMARY} icon="plus" onClick={this.toggleOverlay}>Add Language</bp3.Button>
	          { /* Overlay for add language open when add button is clicked */}
	          <bp3.Overlay isOpen={this.state.overlay} onClose={this.toggleOverlay} canOutsideClickClose={true} canEscapeKeyClose={true} enforceFocus usePortal={false}>
	            <div className='flex center'>
	              <bp3.Card>
	                <h3 className="mar-1">Enter the name of the programming language</h3>
	                <bp3.InputGroup className="mar-1" required onKeyPress={this.submitLang.bind(this)} onChange={this.handleName}>    
	                </bp3.InputGroup>
	                <bp3.Collapse isOpen={this.state.showWarn}>
	                  <bp3.Callout intent={bp3.Intent.DANGER}>{this.state.warn}</bp3.Callout>
	                </bp3.Collapse>
						
	                <bp3.ButtonGroup className="mar-1">
	                  <bp3.Button onClick={this.toggleOverlay}  text="cancel"></bp3.Button>
	                  <bp3.Button onClick={this.addLang} text="add" intent={bp3.Intent.PRIMARY} icon='plus'></bp3.Button>
	                </bp3.ButtonGroup>
	              </bp3.Card>
	            </div>
	          </bp3.Overlay>
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
