import { createContext, useEffect, useState} from 'react'
import netlifyIdentity from 'netlify-identity-widget'

export const AuthCtx = createContext(
    {
        user:null,
        login: ()=>{},
        logout: ()=>{},
        authReady: false
    }
)

export const AuthCtxProvider = ({children}) => {
    const [user,setUser] = useState(null)

    useEffect(()=>{

        netlifyIdentity.on('login',(user) =>{
            setUser(user)
            netlifyIdentity.close()
            console.log('LOGINEVENG')
        })
        netlifyIdentity.init()

    },[])


    const login = () => {
        netlifyIdentity.open()
    }
    const ctx = {
        user,login
    }
    return (<AuthCtx.Provider value={ctx}>{children}</AuthCtx.Provider>)
}