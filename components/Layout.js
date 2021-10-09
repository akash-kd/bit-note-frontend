import react from 'react'
import Nav from './Nav'
import * as bp3 from '@blueprintjs/core'
import { authCtx } from '../context/authCtx'
import axios from 'axios'
class Layout extends react.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: 'light',
    }
  }
  static contextType = authCtx

  componentDidMount() {
    this.setState({
      theme: localStorage.getItem('theme'),
    })
  }

  changeTheme() {
    if (this.state.theme == 'dark') {
      this.setState({
        theme: 'light',
      })
      localStorage.setItem('theme', 'light')
    } else {
      this.setState({
        theme: 'dark',
      })
      localStorage.setItem('theme', 'dark')
    }
  }
  render() {
	  console.log('WHOLE RENDER',this.context.user,this.context.isAuth)
    return (
      <bp3.Callout className={'bp3-' + this.state.theme + ' h-full w-full pad-0'}>
        <Nav
          changeTheme={this.changeTheme.bind(this)}
          icon={this.state.theme == 'dark' ? 'flash' : 'moon'}
        />
        <div className='container'>{this.props.children}</div>
      </bp3.Callout>
    )
  }
}

export default Layout
