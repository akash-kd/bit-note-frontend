import React from 'react'
import Image from 'next/image'
import * as bp3 from '@blueprintjs/core'
import styles from '../styles/components/lang.module.css'
import { Divider } from '@blueprintjs/core'
import Link from 'next/link'

class Lang extends React.Component{

  constructor(props){
    super(props)
    this.topic.bind(this)
    this.getAllTopic.bind(this)
  }
  static defaultProps = {
    topics: []
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
      <>
        <Link href={'/langs/'+ this.props.name +'?id='+this.props.id} passHref>
          <bp3.Card interactive className={styles.lang} onClick={this.goto}>
            <div className="flex flex-row w-full">
              <h3 className={'w-full '+styles.title}>{this.props.name}</h3>
              <Link href={'/langs/'+ this.props.name +'?id='+this.props.id} passHref><bp3.Button minimal icon="chevron-right" intent={bp3.Intent.PRIMARY} onClick={this.goto}/></Link>
            </div>
            <div className="mar-t"></div>
            <bp3.ButtonGroup vertical className={styles.group}>
              {this.getAllTopic(this.props.topics)}
            </bp3.ButtonGroup>
          </bp3.Card>
        </Link>

      </>
    )
  }
}

export default Lang