import React from 'react'
import * as bp3 from '@blueprintjs/core'

class Add extends React.Component{
  constructor(props){
    console.log('ADD CONST')
    super(props)
    this.toggle.bind(this)
    this.state = {isOpen:!this.props.openPortal}
    this.toggle.bind(this)
  }


  toggle(){
    this.setState({isOpen:!this.state.isOpen})
    console.log('DIV CLICKED',this.state.isOpen)
  }

  render(){
    console.log('ADD RENCER',this.state.isOpen,this.props.openPortal)
    if(this.props.openPortal && !this.state.isOpen ){
      return (
        <bp3.Callout className="container flex pad-tb add flex center" onClick={(e)=>{this.toggle()}}>
          <bp3.Card className='pad'>
            <h3 className="mar-1">Enter the name of the programming language</h3>
            <bp3.InputGroup className="mar-1">    
            </bp3.InputGroup>
            <bp3.ButtonGroup className="mar-1">
              <bp3.Button text="cancel"></bp3.Button>
              <bp3.Button text="add" intent={bp3.Intent.PRIMARY} icon='plus'></bp3.Button>
            </bp3.ButtonGroup>
          </bp3.Card>
        </bp3.Callout>
      )
    }
    else{
      return <div>HELLO</div>
    }

  }
}

export default Add

