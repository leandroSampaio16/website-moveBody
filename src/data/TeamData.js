import { useState } from "react"
import ApiConnectionConfig from "./ApiConnectionConfig"

export default()=>{

    const [colaboradores,setColaboradores]=useState({
        data:null,
        error: null,
        load:true
    })

    const colaboradoresDataGet =async()=>{
        setColaboradores({
            data:null,
            error:null,
            load:true
        })  
        try{
        const response=await ApiConnectionConfig.get("/Colaboradores")

        const responseData=JSON.parse(JSON.stringify(response.data))
        const isEmpty = responseData.every(innerArray => innerArray.length === 0);
        if(isEmpty){
            setColaboradores({
                data:null,
                error:"sem data",
                load:false
            })   
        }

        else{
            setColaboradores({
                data:JSON.parse(JSON.stringify(response.data)),
                error:null,
                load:false
            })    
        }
    }
    catch(error){
        setColaboradores({
            data:null,
            error:error,
            load:false
        })
    }
      
      }
      return[colaboradores,colaboradoresDataGet]
}