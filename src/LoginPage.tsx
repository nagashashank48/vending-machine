import React,{useState} from 'react'
import { config } from './Config'
import {   PublicClientApplication} from '@azure/msal-browser'

const LoginPage = () => {
    const [error,setError]=useState('');
    const [isAuthenticated,setIsAuthenticated]=useState<boolean>()
   
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
            setIsAuthenticated(true);
            let key=sessionStorage.getItem("msal.account.keys")
            let id;
            if(key!==null){
            id=JSON.parse(key)[0]
            
            }
            const key3=sessionStorage.getItem(id)
            if(key3!==null){
                console.log(JSON.parse(key3).name)
            }
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
        {/* {error===''?<p></p>:<p>{error}</p>} */}
        {isAuthenticated?<p>succesfull login </p>:<p></p>}
        <button onClick={()=>login()}>login</button>
        {/* <button onClick={()=>logout()}>logout</button> */}


    </div>
   )
}

export default LoginPage