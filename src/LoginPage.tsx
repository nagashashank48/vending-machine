import React,{useState} from 'react'
import { config } from './Config'
import {  PublicClientApplication } from '@azure/msal-browser'
import { Navigate } from 'react-router-dom'
const LoginPage = () => {
    const [error,setError]=useState<string>('');
    const [isAuthenticated,setIsAuthenticated]=useState<boolean>(false)
    const[user,setUser]=useState();
   
    const publicClientApplication:any = new PublicClientApplication({ 
        auth:{
            clientId:config.appId,
            redirectUri:config.redirectUri,
            authority:config.authority
        },
        cache:{
            cacheLocation:"sessionStorage",
            storeAuthStateInCookie:true
        }
    })
     const login=async()=>{
        try{
            await publicClientApplication.loginPopup({
                scopes:config.scopes,
                prompt:"select_account"
            });
            setIsAuthenticated(true)
        }
        catch(err:any){
            setIsAuthenticated(false);
            setError(err)
        }
    }
    const logout=()=>{
        publicClientApplication.logout();
    }
  return (
    <div>
        {error===''?<p></p>:<p>{error}</p>}
        {isAuthenticated?<p>succesfull login </p>:<p>failed login</p>}
        <button onClick={()=>login()}>login</button>
    </div>
   )
}

export default LoginPage