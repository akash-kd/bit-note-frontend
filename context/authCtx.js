import {createContext} from 'react'
import { useState } from 'react'


export const authCtx = createContext({
  authenticated: false,
  user: {}
})

async function email(){
  let email = await localStorage.getItem('email')
  console.log('EMAIL FROM CTX',email)
  return email
}

export const AuthProvider = ({children}) =>{
  const [isAuth, setAuth] = useState(false)
  const [user, setUser] = useState({})

  return (
    <authCtx.Provider value={{isAuth, user, setAuth, setUser}}>
      {children}
    </authCtx.Provider>
  )
}



