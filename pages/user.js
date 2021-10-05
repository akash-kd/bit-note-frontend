import {useEffect, useState} from 'react'
import Head from 'next/head'
import React from 'react'
import * as bp3 from '@blueprintjs/core'
import Lang from '../components/Lang'
import styles from '../styles/user.module.css'
import axios from 'axios'
import Router from 'next/router'
import Add from '../components/Add'

class user extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      overlay: false
    }
    this.toggleOverlay.bind(this)
    this.handleName.bind(this)
    this.addLang.bind(this)
  }

  componentDidMount(){
    const email = localStorage.getItem('email')
    console.log(email)
    this.setState({email})
  }

	toggleOverlay = () => {
	  console.log('ON CLOSE')
	  this.setState({overlay: !this.state.overlay})
	}

	handleName = (e) => {
	    console.log('Language name',e.target.value)
	}

	addLang = (e) =>{
	    console.log('ENTER')
	}

	submitLang = (e) => {
	    if(e.key === 'Enter'){
	        console.log('ENTER')
	    }
	}

	render() {
	  return (
	    <div className="w-full mar-0 pad-1 pad-tb">

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
	    </div>	  )
	}
}



export default user
