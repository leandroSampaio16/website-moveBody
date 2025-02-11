import { useState } from "react"
import ApiConnectionConfig from "./ApiConnectionConfig"

export default()=>{

    const [estatisticas,setEstatisticas]=useState({
        data:null,
        error: null,
        load:true
    })

    const EstatisticasDataGet =async()=>{
        setEstatisticas({
            data:null,
            error:null,
            load:true
        })  
        try{
        const response=await ApiConnectionConfig.get("/estatisticas")

        const responseData=JSON.parse(JSON.stringify(response.data))
        const { clientes, pts, admins } = response.data;
        if (!clientes && !pts && !admins) {
          setEstatisticas({
            data: null,
            error: "sem data",
            load: false
          });
        } else {
          setEstatisticas({
            data: response.data,
            error: null,
            load: false
          });
        }
        }
    catch(error){
        setEstatisticas({
            data:null,
            error:error,
            load:false
        })
    }
      
      }
      return[estatisticas,EstatisticasDataGet]
}