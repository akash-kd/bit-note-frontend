import { withRouter } from 'next/router'
import React from 'react'
import * as bp3 from '@blueprintjs/core'


class Lang extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lang: props.lang,
      langs: props.langs,
    }
  }

  render() {

    return (
      <div className="w-full mar-0 pad-1 pad-tb">
        <div className="flex flex-row space-btw">
          <h2 className="mar-0">{this.props.router.query.lang}</h2>
          <bp3.Button className="add-btn" intent={bp3.Intent.PRIMARY} icon="plus" onClick={this.toggleOverlay}>Add Topic</bp3.Button>
        </div>
        <bp3.Divider className="divider"/>
      </div>
    )
  }
}

export default withRouter(Lang)