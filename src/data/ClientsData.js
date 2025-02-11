import { useState } from "react"
import ApiConnectionConfig from "./ApiConnectionConfig"

export default()=>{

    const [clients,setClients]=useState({
        data:null,
        error: null,
        load:true
    })

    const clientsDataGet =async()=>{
        setClients({
            data:null,
            error:null,
            load:true
        })  
        try{
        const response=await ApiConnectionConfig.get("/Clientes")

        const responseData=JSON.parse(JSON.stringify(response.data))
        const isEmpty = responseData.every(innerArray => innerArray.length === 0);
        if(isEmpty){
            setClients({
                data:null,
                error:"sem data",
                load:false
            })   
        }

        else{
            setClients({
                data:JSON.parse(JSON.stringify(response.data)),
                error:null,
                load:false
            })    
        }
    }
    catch(error){
        setClients({
            data:null,
            error:error,
            load:false
        })
    }
      
      }
      return[clients,clientsDataGet]
}