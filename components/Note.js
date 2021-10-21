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
        <div className={styles.title + ' space-btw'}>
          <h3>How to create basic note</h3>
          <bp3.Popover 
            placement="bottom-right"
            minimal
            content={
              <bp3.Menu>
                <bp3.MenuItem icon="edit" text="Edit" />
                <bp3.MenuItem icon="delete" text="Delete" intent={bp3.Intent.DANGER}/>
                <bp3.MenuDivider title="resize"/>
                <bp3.MenuItem icon="zoom-in" text="Increase" />
                <bp3.MenuItem icon="zoom-out" text="Decrease" />
              </bp3.Menu>
            }
            target={<bp3.Button icon="more" minimal></bp3.Button>}
          >
          </bp3.Popover>
        </div>
        <bp3.Divider className={styles.divider}/>
        
        <div className={styles.desc}><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        <br/><br/><br/><br/><br/><br/><br/><br/>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p></div>
        <div className={styles.code}>    
          <Editor
            width="auto"
            theme="vs-dark"
            defaultLanguage="javascript"
            defaultValue="// let's write some broken code 😈"
            onChange={(newValue, e) => console.log(newValue, e)}
          />
        </div>
      </bp3.Card>
    )
  }

}



export default Note