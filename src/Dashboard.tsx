import React from 'react'
import { useEffect,useState } from 'react'
import { Toggle } from '@fluentui/react/lib/Toggle';
import { AiOutlinePlus,AiOutlineMinus } from "react-icons/ai";

import { Dialog, DialogFooter } from '@fluentui/react/lib/Dialog';
import {  PrimaryButton } from '@fluentui/react/lib/Button';

import './Dashboard.css'
import axios from 'axios'
  interface IData{
    image:any,
    Title:string,
    id:number
    sugar:number,
    milk:number,
    coffee:number,
    tea:number,
    water:number
 } 


const Dashboard = () => {
    const[data,setData]=useState<IData[]>([]);
    const [hideDialog,setHideDialog ] = useState(true);
    const[selectedtype,setSelectedtype]=useState<IData>({Title:'',image:'',id:0,sugar:0,milk:0,coffee:0, tea:0,water:0});
    const[shotCount,setShotCount]=useState<number>(1);
    const[avaliable,setAvaliable]=useState({ TeaLeaves:0,CoffeePowder:0,Sugar:0, Milk:0,  Water:0,id:0})
    const[togglestate,setTogglestate]=useState(false)
    const[usedResources,setUSedResources]=useState({milk:0,water:0});
    useEffect(()=>{
     axios.get("http://localhost:3003/types").then(res=>{
        return setData(res.data);
    })
    axios.get("http://localhost:3003/Avaliable").then(res=>{
        return setAvaliable(res.data[0])
    })
    },[])
    const deliverdrink=()=>{
    
        setUSedResources({milk:usedResources.milk+selectedtype.milk,water:usedResources.water+selectedtype.water})
        if(usedResources.milk>200){
            selectedtype.milk=selectedtype.milk+10;
           usedResources.milk=usedResources.milk-200;
            
        }
        if(usedResources.water>500){
            selectedtype.water=selectedtype.water+25;
           usedResources.water=usedResources.water-500;
            
        }
         var totalsugar=0;
         console.log(togglestate)
        if (togglestate===true) {
         totalsugar= selectedtype.sugar    
        }
        else{  totalsugar=0}
        console.log(totalsugar)
        const remainingvolume={
            TeaLeaves:avaliable.TeaLeaves-(shotCount*selectedtype.tea),
            CoffeePowder:avaliable.CoffeePowder-(shotCount* selectedtype.coffee),
            Sugar:avaliable.Sugar-(shotCount* totalsugar ),
            Milk:avaliable.Milk-(shotCount* selectedtype.milk),
            Water:avaliable.Water-(shotCount* selectedtype.water)
            }
     axios.put(`http://localhost:3003/Avaliable/${avaliable.id}`,remainingvolume).then(res=>{
        console.log(res.status)
     })
     }
  return (
    <div className='datadiv'>
        {data.map((item)=>{
            return(
                <div >
                <div className='Title'>{item.Title }</div>
                <img src={item.image} alt={item.Title} className='displayimage'  onClick={()=>{setHideDialog(false);setSelectedtype(item)}}/>
                </div>
            )
        })}
 <Dialog hidden={hideDialog} minWidth={600}>
    <div className='popup'>

        <div>                                                                                                                                                                 
             <p className='popuptitle'>{selectedtype.Title}</p>
             <img src={selectedtype.image}  className='popupimage' alt={selectedtype.Title}/>
        </div>
        <div  style={{marginTop:'60px'}}>
             <p className='serves'>
                <span className='servecount'>No.Of Serves :</span>
             </p>
               <AiOutlineMinus className='icon' onClick={()=>{if(shotCount>1){setShotCount(shotCount-1)}}}/>
                <span className='servecount'>{shotCount}</span>
                <AiOutlinePlus className='icon' onClick={()=>{if(shotCount<8)setShotCount(shotCount+1)}}/>
                <Toggle label="sugar" className='sugartoggle' onClick={()=>setTogglestate(true)} onText="with sugar" offText="without sugar" />
        </div>
       
           
    </div>
    <DialogFooter> 
            <PrimaryButton text="Submit" onClick={()=>{setHideDialog(true);deliverdrink();setTogglestate(false);setShotCount(1)}}/>
            <PrimaryButton text="Close" onClick={()=>{setHideDialog(true);setShotCount(1)}}/> 
    </DialogFooter>
    </Dialog>

    </div>
  )
  
}

export default Dashboard