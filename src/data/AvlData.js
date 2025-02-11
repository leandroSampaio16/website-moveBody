import { useState } from "react"
import ApiConnectionConfig from "./ApiConnectionConfig"

export default()=>{

    const [avl,setAvl]=useState({
        dataAvl:null,
        errorAvl: null,
        loadAvl:true
    })

    const avlDataGet =async(Id)=>{
  
        setAvl({
            dataAvl:null,
            errorAvl:null,
            loadAvl:true
        })  
        
        try{
        const response = await ApiConnectionConfig.get("/GetAvaliacoes?id="+Id+"");
        const responseData = JSON.parse(JSON.stringify(response.data));

        if((responseData.medidas.length === 0) &&(responseData.testeForca.length === 0)){

            setAvl({
                dataAvl: responseData,
                errorAvl: "sem data forca e medidas",
                loadAvl: false
              });
          }
       else  if (responseData.medidas.length === 0) {

            setAvl({
                dataAvl: responseData,
                errorAvl: "sem data medidas",
                loadAvl: false
            });
          }
         else if(responseData.testeForca.length === 0) {
    
            setAvl({
                dataAvl: responseData,
                errorAvl: "sem data forca",
                loadAvl: false
              });
          }
         
          else {
            setAvl({
                dataAvl: responseData,
                errorAvl: null,
              loadAvl: false
            });
          }

        
    }
    catch(error){
        setAvl({
            dataAvl:null,
            errorAvl:error,
            loadAvl:false
        })
    }
      
      }
      return[avl,avlDataGet]
}