import React from 'react'
import axios from 'axios'
import { authCtx } from '../context/authCtx'
import Lang from './Lang'
import * as bp3 from '@blueprintjs/core'
class AllLangs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.state = {
      data:{}
    }
  }
  static contextType = authCtx 
  
  render() {
    if (JSON.stringify(this.context.langs) == '[]'){
      return <bp3.Button minimal loading></bp3.Button>
    }
    else{
      let row1 = []
      let row2 = []
      let row3 = []
      let row4 = []

      // pushing all the languages into their respective rows
      this.context.langs.forEach((element,i) => {
        if(i%4 === 0){
          row1.push(<Lang key={element._id} id={element._id} name={element.name} topics={element.topics}/>)
        }
        if(i%4 === 1){
          row2.push(<Lang key={element._id} id={element._id} name={element.name} topics={element.topics}/>)
        }
        if(i%4 === 2){
          row3.push(<Lang key={element._id} id={element._id} name={element.name} topics={element.topics}/>)
        }
        if(i%4 === 3){
          row4.push(<Lang key={element._id} id={element._id} name={element.name} topics={element.topics}/>)
        }
        i++
      })

      return(
        <div className="langs">
	        <div>
            {row1}
	        </div>
	        <div>
            {row2}
	        </div>
	        <div>
            {row3}
	        </div>
	        <div>
            {row4}
	        </div>
	      </div>
      )
    }
  }
}

export default AllLangs