import {useEffect, useState} from 'react'
import Head from 'next/head'
import React from 'react'
import * as bp3 from '@blueprintjs/core'
import Lang from '../components/Lang'
import styles from '../styles/user.module.css'
import axios from 'axios'
import Router from 'next/router'

let email = ''
class user extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      overlay: false,
      lang:''
    }
    this.handleLang.bind(this)
    this.addLang.bind(this)
  }

  componentDidMount(){
    const email = localStorage.getItem('email')
    console.log(email)
    this.setState({email})
  }

  handleLang(e) {
    console.log(e.target.value)
    email = e.target.value
  }
  addLang(){
    console.log(email)
    Router.push('/')
  }


  render() {

	  return (

	    <div className="w-full mar-0 pad-1 pad-tb">
	      
	      <div className="flex flex-row w-full">
          
	        <h2 className="mar-0">Laguages</h2>
	        <div className="w-full"></div>

	        <bp3.Popover 
	          content={
	            <bp3.Card className='pad'>
	              <h3 className="mar-1">Enter the name of the programming language</h3>
	              <bp3.InputGroup onChange={this.handleLang} className="mar-1" onSubmit={this.handleLang} >
	              </bp3.InputGroup>
	              <bp3.ButtonGroup className="mar-1">
					  <bp3.Button text="cancel"></bp3.Button>
					  <bp3.Button onClick={this.addLang} text="add" intent={bp3.Intent.PRIMARY} icon='plus'></bp3.Button>
	              </bp3.ButtonGroup>
				  </bp3.Card>
	          }
	          target={<bp3.Button className="add-btn" intent={bp3.Intent.PRIMARY} icon="plus" onClick={this.toggleOverlay}>Add Language</bp3.Button>}>

			  </bp3.Popover>
	        

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
	    </div>	  
	  )
  }
}



export default user
