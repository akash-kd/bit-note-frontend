import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Nav from '../components/Nav.js'
import * as bp3 from '@blueprintjs/core'
import style from '../styles/components/main.module.css'
import {authCtx} from '../context/authCtx.js'
class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  static contextType = authCtx
  componentDidMount(){
    const email = localStorage.getItem('email')
    this.context.setLander(true)
  }

  render(){
    console.log(`[index.js] isLANDER:${this.context.isLander}`) 
    return (
      <div className={style.main +' w-full'}>
        <div className={style.topSpace}></div>
        <div className={style.mainTitle}><p>A Note taking application <br/>for Programmers</p></div>
        <div className={style.midSpace}></div>
        <div>
          <bp3.Button className={style.button} rightIcon="arrow-right">Start Now</bp3.Button>
        </div>
        {/* <div className={style.midSpace}></div> */}
        <div>
        <a href="https://imgur.com/WgXxt4C"><img width="100%" height="100%" src="https://i.imgur.com/WgXxt4C.png" title="source: imgur.com" /></a>
        </div>
      </div>
    )
  }
}
export default Home
