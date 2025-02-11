import { useState } from "react"
import ApiConnectionConfig from "./ApiConnectionConfig"

export default()=>{

    const [planos,setPlanos]=useState({
        dataP:null,
        errorP: null,
        loadP:true
    })

    const planosDataGet =async()=>{
        setPlanos({
            dataP:null,
            errorP:null,
            loadP:true
        })  
        try{
        const response=await ApiConnectionConfig.get("/GetPlanosExercicios")

        const responseData=JSON.parse(JSON.stringify(response.data))
        const isEmpty = responseData.every(innerArray => innerArray.length === 0);
        if(isEmpty){
            setPlanos({
                dataP:null,
                errorP:"sem data",
                loadP:false
            })   
        }

        else{
            setPlanos({
                dataP:JSON.parse(JSON.stringify(response.data)),
                errorP:null,
                loadP:false
            })    
        }
    }
    catch(error){
        setPlanos({
            dataP:null,
            errorP:error,
            loadP:false
        })
    }
      
      }
      return[planos,planosDataGet]
}