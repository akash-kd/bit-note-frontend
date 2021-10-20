/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import styles from '../styles/components/note.module.css'
import * as bp3 from '@blueprintjs/core'
import Editor from '@monaco-editor/react'
class Note extends React.Component {
  constructor(props) {
    super(props)
  }


  render(){
    console.log(this.props)
    return(
      <bp3.Card className={styles.note}>
        <div className={styles.title}><h3>How to create basic note</h3></div>
        <bp3.Divider className={styles.divider}/>
        
        <div className={styles.desc}><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></p></div>
        <div className={styles.code}>    
          <Editor
            width="auto"
            theme="vs-dark"
            defaultLanguage="javascript"
            defaultValue="// let's write some broken code 😈"
          />
        </div>
      </bp3.Card>
    )
  }

}



export default Note