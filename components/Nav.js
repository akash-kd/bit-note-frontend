import React, { useState } from 'react'
import { useContext } from 'react'
import * as bp3 from '@blueprintjs/core'
import styles from '../styles/components/navbar.module.css'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import axios from 'axios'
import { authCtx } from '../context/authCtx'
class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.Login.bind(this)
    this.Signup.bind(this)
    this.handleName.bind(this)
    this.handleEmail.bind(this)
    this.handlePassword.bind(this)
    this.handleLogin.bind(this)
    this.handleSignup.bind(this)
    this.showWarning.bind(this)
    this.getElements.bind(this)

    this.state = {
      warn: '',
      user: {},
    }
  }
  static contextType = authCtx



	handleName = (e) => {
	  this.setState({ name: e.target.value })
	}

	handleEmail = (e) => {
	  this.setState({ email: e.target.value })
	}

	handlePassword = (e) => {
	  console.log(e.target.value)
	  this.setState({ password: e.target.value })
	}

	handleLogin = async () => {
	  console.log(this.state.email)
	  console.log(this.state.password)
	  await axios
	    .post('http://localhost:3030/user/signin', {
	      email: this.state.email,
	      password: this.state.password,
	    })
	    .then((res) => {
	      if (res.status === 201) {
	        this.setState({ warn: res.data.message })
	        localStorage.removeItem('email')
	      }
	      if (res.status === 200) {
	        localStorage.setItem('email', res.data.email)
	        this.setState({isLoggedIn:true, user:res.data, warn:''})
	        this.context.setUser(res.data)
	        this.context.setAuth(true)
	        Router.push('/user')
	      }
	    })
	    .catch((err) => {
	    })
	}

	handleSignup = async () => {
	  await axios
	    .post('http://localhost:3030/user/signup', {
	      name: this.state.name,
	      email: this.state.email,
	      password: this.state.password,
	    })
	    .then((res) => {
	      if (res.status === 200) {
	        this.setState({ warn: '' })
	        localStorage.setItem('email', res.data.email)
	        Router.push('/user')
	        this.setState({isLoggedIn:true, user:res.data, warn:''})
	        this.context.setUser(res.data)
	        this.context.setAuth(true)
	      }
	      if (res.status == 201) {
	        localStorage.removeItem('email')
	        this.setState({ warn: res.data.error })
	      }
	    })
	    .catch()
	}

	handleLogout = () => {
	  localStorage.removeItem('email')
	  this.setState({isLoggedIn:false})
	  this.setState({user:{}})
	  this.context.setUser({})
	  this.context.setAuth(false)
	  Router.push('/')
	}

	
	async loginOnEnter(e){
	  if(e.key == 'Enter'){
	    await axios
	      .post('http://localhost:3030/user/signin', {
	        email: this.state.email,
	      password: this.state.password,
	    })
	    .then((res) => {
	        if (res.status === 201) {
	        this.setState({ warn: res.data.message })
	        localStorage.removeItem('email')

	      }
	      if (res.status === 200) {
	        localStorage.setItem('email', res.data.email)
	        this.setState({isLoggedIn:true, user:res.data, warn:''})
	        this.context.setUser(res.data)
	        this.context.setAuth(true)
	        Router.push('/user')
	      }
	    })
	    .catch((err) => {
	      console.log(err)
	    })
	  }
	}

	async signupOnEnter(e){
	  if(e.key == 'Enter'){
	    await axios
	      .post('http://localhost:3030/user/signup', {
			  name: this.state.name,
			  email: this.state.email,
			  password: this.state.password,
	      })
	      .then((res) => {
			  if (res.status === 200) {
	          this.setState({ warn: '' })
	          localStorage.setItem('email', res.data.email)
	          Router.push('/user')
			  this.setState({isLoggedIn:true, user:res.data, warn:''})
	          this.context.setUser(res.data)
	          this.context.setAuth(true)
			  }
			  if (res.status == 201) {
	          localStorage.removeItem('email')
	          this.setState({ warn: res.data.error })
			  }
	      })
	      .catch()
	  }
	}
	Login() {
	  return (
	    <bp3.Callout>
	      <bp3.FormGroup labelFor='username'>
	        <bp3.InputGroup
	          id='email'
	          placeholder='email'
	          leftIcon='envelope'
	          onChange={this.handleEmail}
			  onKeyPress={this.loginOnEnter.bind(this)}
	        />
	      </bp3.FormGroup>
	      <bp3.FormGroup labelFor='password'>
	        <bp3.InputGroup
	          id='password'
	          placeholder='password'
	          leftIcon='lock'
	          type='password'
	          onChange={this.handlePassword}
			  onKeyPress={this.loginOnEnter.bind(this)}
	        />
	      </bp3.FormGroup>
	      {this.showWarning()}
	      <bp3.Button
	        intent={bp3.Intent.PRIMARY}
	        text='Login'
	        onClick={this.handleLogin}
	      />
	    </bp3.Callout>
	  )
	}

	Signup() {
	  return (
	    <bp3.Callout>
	      <bp3.FormGroup labelFor='fullname'>
	        <bp3.InputGroup
	          id='name'
	          placeholder='name'
	          leftIcon='person'
	          onChange={this.handleName}
			  onKeyPress={this.signupOnEnter.bind(this)}
	        />
	      </bp3.FormGroup>
	      <bp3.FormGroup labelFor='username'>
	        <bp3.InputGroup
	          id='email'
	          placeholder='email'
	          leftIcon='envelope'
	          onChange={this.handleEmail}
			  onKeyPress={this.signupOnEnter.bind(this)}
	        />
	      </bp3.FormGroup>
	      <bp3.FormGroup labelFor='password'>
	        <bp3.InputGroup
	          id='password'
	          placeholder='password'
	          leftIcon='lock'
	          type='password'
	          onChange={this.handlePassword}
			  onKeyPress={this.signupOnEnter.bind(this)}
	        />
	      </bp3.FormGroup>
	      {this.showWarning()}

	      <bp3.Button
	        intent={bp3.Intent.PRIMARY}
	        text='Sign up'
	        onClick={this.handleSignup}
	      />
	    </bp3.Callout>
	  )
	}

	Account(){

	  return (
		  <bp3.ButtonGroup vertical>
	      <bp3.Button text="setting" icon="cog"/>
	      <bp3.Button text="logout" onClick={this.handleLogout} intent={bp3.Intent.DANGER} icon="log-out"/>
		  </bp3.ButtonGroup>
	  )
  
	  }

	  showWarning = () => {
	    if (this.state.warn == '') {
		  return <></>
	    } else {
		  return (
	        <bp3.FormGroup>
			  <bp3.Callout intent={bp3.Intent.DANGER}>
	            {this.state.warn}
			  </bp3.Callout>
	        </bp3.FormGroup>
		  )
	    }
	  }
	  getElements() {
	  let userButton = <></>
	  // if there is no user in context, show login button
	  if(JSON.stringify(this.context.user) === '{}'){
		  userButton = <bp3.Button 	          
	      className={styles.button}
	      intent={bp3.Intent.PRIMARY}
	      loading
	    >
	    </bp3.Button>
	  }
	  // shows the name of the user if there is a user in context
	  else{
		  userButton = 
		  <bp3.Popover
		    content={this.Account()}
		    target = {		  
			  <bp3.Button 	          
		        className={styles.button}
		        intent={bp3.Intent.PRIMARY}
			  icon="user"
			  >
		        {this.context.user.name}
			  </bp3.Button>
		    }
		  >
  
		  </bp3.Popover>
  
	  }
	  // theme chaning button + login or user button
	  if (JSON.stringify(this.context.user) !== '{}') {
	    return(
	      <bp3.Navbar.Group align={bp3.Alignment.RIGHT}>
			  <bp3.Button
	          className={styles.button}
	          intent={bp3.Intent.PRIMARY}
	          icon={this.props.icon}
	          onClick={() => this.props.changeTheme()}
			  />
			  {userButton}
	      </bp3.Navbar.Group>
		  )
	  }
	  else {
	    return (
	      <bp3.Navbar.Group align={bp3.Alignment.RIGHT}>
	        <bp3.Button
	          className={styles.button}
	          intent={bp3.Intent.PRIMARY}
	          icon={this.props.icon}
	          onClick={() => this.props.changeTheme()}
	        />

	        <bp3.ButtonGroup className={styles.buttonGroup}>
	          <bp3.Popover
	            content={this.Login()}
	            target={
	              <bp3.Button
	                className={styles.noOutline}
	                intent={bp3.Intent.PRIMARY}
	                icon='log-in'
	                text='Login'
	              ></bp3.Button>
	            }
	          ></bp3.Popover>
	          <bp3.Popover
	            content={this.Signup()}
	            target={
	              <bp3.Button
	                className={styles.noOutline}
	                intent={bp3.Intent.SUCCESS}
	                icon='new-person'
	                text='Sign up'
	              ></bp3.Button>
	            }
	          ></bp3.Popover>
	        </bp3.ButtonGroup>
	      </bp3.Navbar.Group>
	    )
	  }
	  }

	  render() {
	  let str = 'Bit Note'
	  return (
	    <div>
	      <Head>
	        <title>{str}</title>
	        {/* <link rel="stylesheet" href="./style/components/navbar.module.css"></link> */}
	      </Head>

	      <bp3.Navbar className={styles.navbar}>
	        <bp3.Navbar.Group>
	          <bp3.Navbar.Heading className={styles.title}>
	            {str}
	          </bp3.Navbar.Heading>

	          <bp3.ButtonGroup>
	            <bp3.Popover
	              minimal
	              target={
	                <bp3.Button
	                  className={styles.noOutline}
	                  text='python'
	                  rightIcon='caret-right'
	                  intent={bp3.Intent.PRIMARY}
	                />
	              }
	            />
	            <bp3.Popover
	              minimal
	              target={
	                <bp3.Button
	                  className={styles.noOutline}
	                  text='django'
	                  rightIcon='caret-right'
	                  intent={bp3.Intent.PRIMARY}
	                />
	              }
	            />
	          </bp3.ButtonGroup>
	        </bp3.Navbar.Group>

	        {this.getElements()}
	      </bp3.Navbar>
	    </div>
	  )
	  }
}

export default Nav
