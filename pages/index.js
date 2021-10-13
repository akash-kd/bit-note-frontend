import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Nav from '../components/Nav.js'
import * as bp3 from '@blueprintjs/core'
import style from '../styles/components/main.module.css'


class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
	  const email = localStorage.getItem('email')
	  if(email){
      Router.push('/user')
	  }
  }

  render(){
    return (
      <div className={style.main}>
        <bp3.Card interactive elevation={bp3.Elevation.TWO}>
				Hello World
        </bp3.Card>
      </div>
	  )
  }
}
export default Home
