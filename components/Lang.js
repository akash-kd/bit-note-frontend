import React from 'react'
import Image from 'next/image'
import * as bp3 from '@blueprintjs/core'
import styles from '../styles/components/lang.module.css'
import { Divider } from '@blueprintjs/core'

class Lang extends React.Component{

  constructor(props){
    super(props)
    this.topic.bind(this)
    this.getAllTopic.bind(this)
  }
  getAllTopic(arr){
    let elem = []
    for(let i=0;i<arr.length;i++){
      elem.push(this.topic(arr[i],i))
    }
    return elem
  }
    
  topic(str,key){
    return <bp3.Button key={key} className={styles.btn} rightIcon="arrow-right" alignText={bp3.Alignment.LEFT}>
      <bp3.Text ellipsize>{str}</bp3.Text>
    </bp3.Button>
  }

  render(){
     
    return (
      <bp3.Card interactive className={styles.lang} >
        <div className="flex flex-row w-full">
          <h3 className={'w-full '+styles.title}>{this.props.name}</h3>
          <bp3.Button minimal icon="add" intent={bp3.Intent.PRIMARY}/>
        </div>
        <div className="mar-t"></div>
        <bp3.ButtonGroup vertical className={styles.group}>
          {this.getAllTopic(this.props.topics)}
        </bp3.ButtonGroup>
      </bp3.Card>
    )
  }
}

export default Lang