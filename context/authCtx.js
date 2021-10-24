import {createContext} from 'react'
import { useState } from 'react'
import axios from 'axios'


export const authCtx = createContext({
  authenticated: false,
  user: {}
})



export const AuthProvider = ({children}) =>{
  
  const [isAuth, setAuth] = useState(false)
  const [user, setUser] = useState({})
  const [langs, setLangs] = useState([])
  const [isLander, setLander] = useState(false)
  // if (isAuth === false) {
  //   getUser().then(res => {
  //     setUser(res)
  //     setAuth(true)
  //   })
  // }w
  // console.log('ctx')

  // console.log(user)


  return (
    <authCtx.Provider value={{isAuth, user, setAuth, setUser,langs,setLangs,isLander, setLander}}>
      {children}
    </authCtx.Provider>
  )
}



