import {useEffect, useState} from 'react'
import Head from 'next/head'
import React from 'react'
import * as bp3 from '@blueprintjs/core'
import Lang from '../components/Lang'
import styles from '../styles/user.module.css'
import axios from 'axios'
import Router from 'next/router'
import Add from '../components/Add'

let email = ''
class user extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      overlay: false,
      lang:''
    }

    this.toggle.bind(this)
  }

  componentDidMount(){
    const email = localStorage.getItem('email')
    console.log(email)
    this.setState({email})
  }

  toggle(){
	  this.setState({overlay:!this.state.overlay})
	  console.log('ADD Clicked')
  }


  render() {
    console.log(this.state.overlay)
	  return (

	    <div className="w-full h-full mar-0 pad-1 pad-tb">
	      
	      <div className="flex flex-row w-full">
          
		  
	        <h2 className="mar-0">Laguages</h2>
	        <div className="w-full"></div>

	       <bp3.Button onClick={(e)=>{this.toggle()}} className="add-btn" intent={bp3.Intent.PRIMARY} icon="plus">Add Language</bp3.Button>

	        

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
		  <Add openPortal={this.state.overlay}/>
	    </div>	  
	  )
  }
}



export default user
