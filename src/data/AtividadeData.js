import { useState } from "react"
import ApiConnectionConfig from "./ApiConnectionConfig"

export default()=>{

    const [atividade,setAtividade]=useState({
        atividade:null,
        errorAtividade: null,
        loadAtividade:true
    })

    const atividadeDataGet =async()=>{
        setAtividade({
            atividade:null,
            errorAtividade:null,
            loadAtividade:true
        })  
        try{
        const response=await ApiConnectionConfig.get("/Atividade")

        const responseData=JSON.parse(JSON.stringify(response.data))
        const isEmpty = responseData.every(innerArray => innerArray.length === 0);
        if(isEmpty){
            setAtividade({
                atividade:null,
                errorAtividade:"sem data",
                loadAtividade:false
            })   
        }

        else{
            setAtividade({
                atividade:JSON.parse(JSON.stringify(response.data)),
                errorAtividade:null,
                loadAtividade:false
            })    
        }
    }
    catch(error){
        setAtividade({
            atividade:null,
            errorAtividade:error,
            loadAtividade:false
        })
    }
      
      }
      return[atividade,atividadeDataGet]
}