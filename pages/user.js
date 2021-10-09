import {useEffect, useState} from 'react'
import Head from 'next/head'
import React from 'react'
import * as bp3 from '@blueprintjs/core'
import Lang from '../components/Lang'
import styles from '../styles/user.module.css'
import axios from 'axios'
import Router from 'next/router'
import Add from '../components/Add'
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
    console.log(email)
    this.setState({email})
    console.log('USER PAGE CMPT MOUNT',this.context.user)
  }

	toggleOverlay = () => {
	  console.log('ON CLOSE')
	  this.setState({overlay: !this.state.overlay})
	}

	handleName = (e) => {
	    this.setState({name: e.target.value})
	}

	 addLang = async (e) =>{
	   console.log(this.context.user)
	   if (this.state.name){
	     await axios.post('http://localhost:3030/lang/addLang',{
	       name: this.state.name,
	       createdBy: this.context.user
		  }).then( res => {
	       console.log(res)
	       console.log('LANG CREATED')
		   this.setState({
	         warn:'',
	         showWarn: false
	       })
		  }).catch(err => {
	       console.log(err.message)
	       console.log('LANG NOT CREATED')
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
	  if(this.state.email){
	    return(
	      <>
	        <div className="flex flex-row w-full">
	        <h2 className="mar-0">Laguages</h2>
	        <div className="w-full" onClick={this.toggleOverlay}></div>
	        <bp3.Button className="add-btn" intent={bp3.Intent.PRIMARY} icon="plus" onClick={this.toggleOverlay}>Add Language</bp3.Button>
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
	      </div>	
	      <bp3.Divider className="divider"/>
	      <div className="langs">
	        <div>
	          <Lang name="Python" topics={['Django','Pyqt5','NLP','Comp Codin','Machin Learning']}/>
	          <Lang name="Javascript" topics={['Express','Mango','React']}/>
	          <Lang name="Flutter" topics={['Componentsassasa','Scss','Macros','NLP']}/>
	        </div>
	        <div>
	          <Lang name="C++" topics={['Templates','Macros','Comp Codin']}/>
	          <Lang name="Flutter" topics={['Components','Scss','Macros','NLP','Macros','NLP']}/>

	        </div>
	        <div>
	          <Lang name="C++" topics={['Templates','Macros','Comp Codin']}/>
	          <Lang name="Flutter" topics={['Components','Scss','Macros','NLP']}/>
	          <Lang name="Flutter" topics={['Componentsassasa','Scss','Macros','NLP']}/>
	        </div>
	        <div>
	          <Lang name="C++" topics={['Macros','Comp Codin']}/>
	          <Lang name="Flutter" topics={['Componentsassasa','Scss']}/>
	        </div>
	      </div>
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
