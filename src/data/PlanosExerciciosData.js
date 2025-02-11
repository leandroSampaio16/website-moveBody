import { useState } from "react"
import ApiConnectionConfig from "./ApiConnectionConfig"

export default()=>{

    const [planosEx,setPlanosEx]=useState({
        dataEx:null,
        errorEx: null,
        loadEx:true
    })

    const planosExDataGet =async()=>{
        setPlanosEx({
            dataEx:null,
            errorEx:null,
            loadEx:true
        })  
        try{
        const response=await ApiConnectionConfig.get("/GetPlanosInfo")

        const responseData=JSON.parse(JSON.stringify(response.data))
        const isEmpty = responseData.every(innerArray => innerArray.length === 0);
        if(isEmpty){
            setPlanosEx({
                dataEx:null,
                errorEx:"sem data",
                loadEx:false
            })   
        }

        else{
            setPlanosEx({
                dataEx:JSON.parse(JSON.stringify(response.data)),
                errorEx:null,
                loadEx:false
            })    
        }
    }
    catch(error){
        setPlanosEx({
            dataEx:null,
            errorEx:error,
            loadEx:false
        })
    }
      
      }
      return[planosEx,planosExDataGet]
}