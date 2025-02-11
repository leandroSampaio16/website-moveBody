import { useState } from "react"
import ApiConnectionConfig from "./ApiConnectionConfig"

export default()=>{

    const [eventos,setEventos]=useState({
        data:null,
        error: null,
        load:true
    })

    const EventosDataGet =async()=>{
        setEventos({
            data:null,
            error:null,
            load:true
        })  
        try{
        const response=await ApiConnectionConfig.get("/Eventos")

        const responseData=JSON.parse(JSON.stringify(response.data))
        const isEmpty = responseData.every(innerArray => innerArray.length === 0);
        if(isEmpty){
            setEventos({
                data:null,
                error:"sem data",
                load:false
            })   
        }

        else{
            setEventos({
                data:JSON.parse(JSON.stringify(response.data)),
                error:null,
                load:false
            })    
        }
    }
    catch(error){
        setEventos({
            data:null,
            error:error,
            load:false
        })
    }
      
      }
      return[eventos,EventosDataGet]
}