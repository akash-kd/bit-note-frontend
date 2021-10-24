import React from 'react'
import * as bp3 from '@blueprintjs/core'
import styles from '../styles/components/landerNav.module.css'
import { Button } from '@blueprintjs/core'
class LanderNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: localStorage.getItem('theme')
    }
  }
  componentDidMount(){
    let theme = localStorage.getItem('theme')
    console.log('[landernav] theme: ', theme)
    this.setState({theme: theme})
  }
  render(){
    let theme = (this.state.theme == 'dark') ? styles.navDark : styles.navLight
    console.log('[landernav]'+theme)
    return (
      <bp3.Navbar className={theme}>
        <bp3.NavbarGroup >
          <img height="24px" className={styles.img} alt="LOGO" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png" ></img>
          <bp3.NavbarHeading>Bit-Note</bp3.NavbarHeading>
        </bp3.NavbarGroup>

        <bp3.NavbarGroup >
          <a className={styles.link}>Home</a>
          <a className={styles.link}>About</a>
          <a className={styles.link}>Features</a>
        </bp3.NavbarGroup>

        <bp3.NavbarGroup >
          <a className={styles.link}>Login</a>
          <bp3.Button text="Sign up" intent={bp3.Intent.PRIMARY} className={styles.priBtn} rightIcon="caret-right"/>
        </bp3.NavbarGroup>
            
      </bp3.Navbar>
    )
  }
}

export default LanderNav