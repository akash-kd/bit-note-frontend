import { withRouter } from 'next/router'
import React from 'react'
import * as bp3 from '@blueprintjs/core'
import Note from '../../components/Note'
import { authCtx } from '../../context/authCtx'

class Lang extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lang: props.lang,
      langs: props.langs,
    }
  }
  static contextType = authCtx
  render() {
    console.log(this.context.isAuth)
    if (this.context.isAuth){
      console.log('USER logerd in')

      return (
        <div className="w-full mar-0 pad-1 pad-tb">
          <div className="flex flex-row space-btw">
            <h2 className="mar-0">{this.props.router.query.lang}</h2>
            <div className="flex flex-row">
              <bp3.InputGroup leftIcon="search" placeholder="Search term"></bp3.InputGroup>
              <bp3.Button className="add-btn mar-lr" icon="plus">Add Note</bp3.Button>
              <bp3.Button className="add-btn" intent={bp3.Intent.PRIMARY} icon="plus" >Add Topic</bp3.Button>
            </div>
          </div>
          <bp3.Divider className="divider"/>
          <Note />
          <Note />

          <Note />
          <Note />
          <Note />
        </div>
      )
    }
    else{
      return (
        <div className="w-full mar-0 pad-1 pad-tb">
          <bp3.Callout intent={bp3.Intent.DANGER}></bp3.Callout>
        </div>
      )
    }
  }
}

export default withRouter(Lang)