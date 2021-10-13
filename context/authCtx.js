import {createContext} from 'react'
import { useState } from 'react'
import axios from 'axios'


export const authCtx = createContext({
  authenticated: false,
  user: {}
})

async function email(){
  let email = await localStorage.getItem('email')
  return email
}

async function getUser(){
  const e = await email()
  let data = {}
  if (e) {
    await axios.post('http://localhost:3030/user/getuser',{email:e})
      .then(res => {
        data = res.data
      })
  }

  return data
}

export const AuthProvider = ({children}) =>{
  const [isAuth, setAuth] = useState(false)
  const [user, setUser] = useState({})
  const [langs, setLangs] = useState([])

  // if (isAuth === false) {
  //   getUser().then(res => {
  //     setUser(res)
  //     setAuth(true)
  //   })
  // }
  // console.log('ctx')

  // console.log(user)


  return (
    <authCtx.Provider value={{isAuth, user, setAuth, setUser,langs,setLangs}}>
      {children}
    </authCtx.Provider>
  )
}



