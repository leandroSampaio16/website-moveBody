import { useState } from "react"
import ApiConnectionConfig from "./ApiConnectionConfig"

export default()=>{

    const [pt,setpt]=useState({
        data:null,
        error: null,
        load:true
    })

    const ptDataGet =async()=>{
        setpt({
            data:null,
            error:null,
            load:true
        })  
        try{
        const response=await ApiConnectionConfig.get("/PtData")

        const responseData=JSON.parse(JSON.stringify(response.data))
        const isEmpty = responseData.every(innerArray => innerArray.length === 0);
        if(isEmpty){
            setpt({
                data:null,
                error:"sem data",
                load:false
            })   
        }

        else{
            setpt({
                data:JSON.parse(JSON.stringify(response.data)),
                error:null,
                load:false
            })    
        }
    }
    catch(error){
        setpt({
            data:null,
            error:error,
            load:false
        })
    }
      
      }
      return[pt,ptDataGet]
}