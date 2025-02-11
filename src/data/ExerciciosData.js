import { useState } from "react"
import ApiConnectionConfig from "./ApiConnectionConfig"

export default()=>{

    const [exercicios,setExercicios]=useState({
        dataExercicios:null,
        error: null,
        load:true
    })

    const exerciciosDataGet =async()=>{
        setExercicios({
            dataExercicios:null,
            error:null,
            load:true
        })  
        try{
        const response=await ApiConnectionConfig.get("/GetAllExercicios")

        const responseData=JSON.parse(JSON.stringify(response.data))
        const isEmpty = responseData.every(innerArray => innerArray.length === 0);
        if(isEmpty){
            setExercicios({
                dataExercicios:null,
                error:"sem data",
                load:false
            })   
        }

        else{
            setExercicios({
                dataExercicios:JSON.parse(JSON.stringify(response.data)),
                error:null,
                load:false
            })    
        }
    }
    catch(error){
        setExercicios({
            dataExercicios:null,
            error:error,
            load:false
        })
    }
      
      }
      return[exercicios,exerciciosDataGet]
}