import { Typography, Box, useTheme, Button, Modal, TextField,Switch,  Select, MenuItem, FormControl, InputLabel,  List, ListItem, ListItemText, ListItemSecondaryAction   } from "@mui/material";
import { tokens } from "../theme";
import { ArrowBackIosNew as ArrowBackIosNewIcon, ArrowForwardIos as ArrowForwardIosIcon } from "@mui/icons-material";
import ApiConnectionConfig from "../data/ApiConnectionConfig";
import Cookies from "js-cookie"
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { CardMedia } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import ExerciciosData from "../data/ExerciciosData";
import AddIcon from '@mui/icons-material/Add';
import { yellow } from "@mui/material/colors";
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const HeaderPlans = ({ title, subtitle, selectedRows, setErrorMessage, data, dataEx, refresh, setRefresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [nome, setNome] = useState("");
  const [nomeAdd, setNomeAdd] = useState("");

  const [segunda, setSegunda] = useState("");
  const [terca, setTerca] = useState("");
  const [quarta, setQuarta] = useState("");
  const [quinta, setQuinta] = useState("");
  const [sexta, setSexta] = useState("");
  const [sabado, setSabado] = useState("");
  const [selectedOptionEdit1, setSelectedOptionEdit1] = useState("");

  const handleOptionChangeEdit1 = (event) => {
    setSelectedOptionEdit1(event.target.value);
  }

  const processedValues = new Set();

  const handleOptionChangeEdit = (event, value) => {
    setSelectedPlan(value ? value.IdPlanoTreinoInfo : '');
    setSelectedRowIndex(dataEx.findIndex((row) => row.IdPlanoTreinoInfo === value?.IdPlanoTreinoInfo));
  
    const modifiedExercises = value?.exercises.map((element, index) => {
      if (!processedValues.has(value.exercises[index])) {
        processedValues.add(value.exercises[index]);
        return element[0];
      } else {
        return element;
      }
    });
  console.log(value.ativo)
    console.log(modifiedExercises[0]);
    setSelectedOptionEdit1(value.ativo ? value.ativo : 0)
    setDataEXEditar(modifiedExercises || []);
  };
  

  const handleOptionChangeEditEx = (event, value) => {
    setSelectedExercice(value ? value.id : '');
  };

  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [redbutton, setRedbutton] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLabelDisabled, setIsLabelDisabled] = useState(true);
  const [nomeEdit, setNomeEdit] = useState("");
  const [idColaborador, setIdColaborador] = useState("");
  const [telefoneEdit, setTelefoneEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [senhaEdit, setSenhaEdit] = useState("");
  const [dataNascEdit, setDataNascEdit] = useState("");
  const [selectedOptionEdit, setSelectedOptionEdit] = useState("");
  const [avlFm , setAvlFm] = useState(true);
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [exerciceIndex, setExerciceIndex] = useState(0);
  const [dataEXEditar, setDataEXEditar] = useState([]);
  const[{dataExercicios,error,load},exerciciosDataGet]=ExerciciosData()  
  const [selectedExercice, setSelectedExercice] = useState(0);
  const [repss, setReps] = useState("");
  const [series, setSeries] = useState("");
  
  const options = [
    { value: "admin", label: "Admin" },
    { value: "pt", label: "PT" },
  ];
  
  useEffect(() => {
    exerciciosDataGet()
  }, []);

    const [selectedOption, setSelectedOption] = useState("");
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    }

   
   

    const handleAddExercise = (event) => {

      if(selectedExercice!==0 && repss && series) {

        let flag = true
        const datateste= [...dataEXEditar]
        let reps = repss + "x" + series
    
    
     
        console.log(dataExercicios)
        
        dataExercicios.forEach(element => {
          if (element.id === selectedExercice) {
  
            console.log(element);
  
            if (flag) {
  
              const updatedElement = { ...element, reps: reps };
  
              console.log(updatedElement);
  
              datateste?.push(updatedElement);
  
              flag = false;
  
            }
          }
        });
        
        setDataEXEditar(datateste)
  
  
      
    }
      else{
        setErrorMessage("Insira os dados")
      }
      //const selectedRow = dataEXEditar.map((option) => {option.find((op) => op.id === selectedExercice);})
      
    };



    

    const utilizadorInfo = JSON.parse(Cookies.get('utilizadorInfo'));

  const handleDelete = async () => {

      if(!avlFm){
        const response = await ApiConnectionConfig.delete("/ApagarPlanoInfo?Id=" + selectedPlan + "&responsavel=" + utilizadorInfo.nome + "&nivel=" + utilizadorInfo.nivel + "")
        setTimeout(() => {
          setRefresh(!refresh);
        }, 1000);
      }
      else{
        selectedRows.forEach(async (element) => {
          setIsButtonDisabled(true)
        const response = await ApiConnectionConfig.delete("/ApagarPlano?Id=" + element + "&responsavel=" + utilizadorInfo.nome + "&nivel=" + utilizadorInfo.nivel + "")
      })
      setTimeout(() => {
        setRefresh(!refresh);
      }, 1000);
      }
  }



  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenDelete = () => {


      setOpenDelete(true);
    
  };

  const handleCloseDelete = () => {
    if(!isButtonDisabled){
    setOpenDelete(false);
    }
  };

  
  const handleOpenAdd = () => {

    setOpenAdd(true);

  };



  const handleOpenEdit = () => {

    const arr = []
    dataEx[selectedRowIndex]?.exercises.forEach(element => {
      arr.push(element[0])
  
    });

    setDataEXEditar(arr)
    setOpenEdit(true);
  

  }

  const handleCloseEdit = () => {
    if(!isButtonDisabled){
      setOpenEdit(false);
      setNomeEdit("")
      setTelefoneEdit("")
      setEmailEdit("")
      setSenhaEdit("")
      setSelectedOptionEdit("")
      setIsLabelDisabled(true)
      setOpenEdit(false);
      setDataEXEditar([])
      
    }
  }

  const [arrayEx, setArrayEx] = useState([]);
  const [index1, setIndex1] = useState(null);

  const [element, setElement] = useState(null);


  const handleAddExercise2 = (event) => {
    
    if(selectedExercice!==0 && repss && series) {

      let flag = true
      const datateste= [...arrayEx]
      let reps = repss + "x" + series
  
  
   
      console.log(dataExercicios)
      
      dataExercicios.forEach(element => {
        if (element.id === selectedExercice) {

          console.log(element);

          if (flag) {

            const updatedElement = { ...element, reps: reps };

            console.log(updatedElement);

            datateste?.push(updatedElement);

            flag = false;

          }
        }
      });
      
      setArrayEx(datateste)


    
  }
    else{
      setErrorMessage("Insira os dados")
    }
    //const selectedRow = dataEXEditar.map((option) => {option.find((op) => op.id === selectedExercice);})

  };
 


const handleExerciseDelete2 = (element, index) => {
  // Filter out the element from the array based on index and equality
  const updatedArray = arrayEx.filter((item, idx) => !(idx === index && item === element));

  // Check if the index is valid
  console.log("-------") 
  console.log(arrayEx)  
  console.log(updatedArray) 
   console.log(index)
   console.log("-------") 
 

  // Update the state with the updated array
  setArrayEx(updatedArray);

};  


  const handleExerciseDelete = (element, index) => {
    
    const updatedArray = dataEXEditar.filter((_, idx) => idx !== index);

  // Check if the index is valid
  console.log("-------") 
  console.log(arrayEx)  
  console.log(updatedArray) 
   console.log(index)
   console.log("-------") 
 

  // Update the state with the updated array
  setDataEXEditar(updatedArray);

  };
  
  

  const handleCloseAdd = () => {
    if(!isButtonDisabled){
      setOpenAdd(false);
      setArrayEx([])
    }
  };

  
  const handleDragEnd1 = (result) => {
    if (!result.destination) {
      return;
    }
  
    const items = Array.from(arrayEx);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setArrayEx(items);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  
    const items = Array.from(dataEXEditar);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
  
    setDataEXEditar(items);
  };
  

/*const [imageUrl, setImageUrl] = useState("");

const handleFileChange = async (event) => {

};*/



const generatePassword = () => {
  const passwordChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * passwordChars.length);
    password += passwordChars[randomIndex];
  }
  return password;
};





const handleEditar = async () => {


  if (dataEXEditar.length === 0) {
    setErrorMessage("Precisa de pelo menos um exercicio");
    setRedbutton(true);
  }
  
  else{
    console.log("entrouu")
    let array = [];
    let array2 = [];
 
    dataEXEditar?.forEach((element) => {
      array.push(element.id);
      array2.push(element.reps);
    });
    console.log(array)
    console.log(array2)
    const arrayString = array.join(';');
    const arrayString2 = array2.join(';');

    setIsButtonDisabled(true)
    setIsLabelDisabled(true)
    const formData = new FormData();

    formData.append("id", selectedPlan);
    formData.append("listaExercicios", arrayString);
    formData.append("listaRepeticoes", arrayString2);
    formData.append("ativo", selectedOptionEdit1);
    formData.append("responsavel", utilizadorInfo.nome);
    formData.append("nivelResponsavel", utilizadorInfo.nivel);

    const jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }

    try {
      const response = await ApiConnectionConfig.post("/UpdatePlanoInfo", jsonData);

      setRedbutton(false);
      setTimeout(() => {
        setRefresh(!refresh);
      }, 1000);
    } catch (error) {
      console.error(error);
    }

  }
 
    
 /*   setIsButtonDisabled(true)
    setIsLabelDisabled(true)
    const formData = new FormData();
    formData.append("nome", nomeEdit);
    formData.append("telefone", telefoneEdit);
    formData.append("email", emailEdit);
    formData.append("nivel", selectedOptionEdit);
    formData.append("idColaboradores", idColaborador);
    formData.append("senha", senhaEdit);
    formData.append("responsavel", utilizadorInfo.nome);
    formData.append("dataNasc", dataNascEdit);
    formData.append("perfil", utilizadorInfo.perfil);
    formData.append("capa", utilizadorInfo.capa);
    formData.append("insta",  utilizadorInfo.inst);
    formData.append("descr", utilizadorInfo.descr);
    formData.append("nivelResponsavel", utilizadorInfo.nivel);

    const jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }

    try {
      const response = await ApiConnectionConfig.post("/UpdateColaboradores", jsonData);

      setRedbutton(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }

  }else {
    setErrorMessage("Preencha todos os campos");
    setRedbutton(true);
  }*/

}

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 0,
  marginTop: isDragging ? "-20%" : 0,
  marginLeft: isDragging ? "-70%" : 0,
  borderRadius: 5,
  background: isDragging ? colors.greenAccent[500] : "",
  ...draggableStyle,
  '@media (maxWidth: 768px)': {
    marginTop: isDragging ? "-10%" : 0, // adjust the value for smaller screens
    marginLeft: isDragging ? "-50%" : 0, // adjust the value for smaller screens
  }
});


const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "" : "",
  padding: 0,
  width: "100%", // Set the width to 100%
});

const handlePrevClick = () => {
  if (exerciceIndex > 0) {
    setExerciceIndex(exerciceIndex - 1);
  } else {
    setExerciceIndex(dataEx[selectedRowIndex]?.exercises.length-1);
  }
};

const handleNextClick = () => {
  
  if (exerciceIndex < dataEx[selectedRowIndex]?.exercises.length-1) {
    setExerciceIndex(exerciceIndex + 1);
  } else {
    setExerciceIndex(0);
  }

};

const handleAdicionar = async () => {
  if(!avlFm){


  if (nome && arrayEx.length!==0) {
 

    
    setRedbutton(true);
    const idArray = arrayEx.map((element) => element.id);

    // Create an array to store element.reps values
    const repsArray = arrayEx.map((element) => element.reps);
    
    // Convert the idArray and repsArray into strings with positions separated by ";"
    const idString = idArray.join(";");
    const repsString = repsArray.join(";");
    
    let totalDuration = 0;

    arrayEx.forEach((element) => {
      const durationParts = element.rest.split(':'); // Split the rest value by ':'
      const repsMultiplier = parseInt(element.reps.split("x")[0]); // Get the multiplier from reps
    
      if (durationParts.length === 3) {
        // If the duration has hours, minutes, and seconds (e.g., "1:30:00" or "0:01:25")
        const hours = parseInt(durationParts[0]);
        const minutes = parseInt(durationParts[1]);
        const seconds = parseInt(durationParts[2]);
    
        totalDuration += (hours * 3600 + minutes * 60 + seconds) * repsMultiplier;
      } else if (durationParts.length === 2) {
        // If the duration has only minutes and seconds (e.g., "30:00" or "01:25")
        const minutes = parseInt(durationParts[0]);
        const seconds = parseInt(durationParts[1]);
    
        totalDuration += (minutes * 60 + seconds) * repsMultiplier;
      } else if (durationParts.length === 1) {
        // If the duration has only seconds (e.g., "60" or "85")
        const seconds = parseInt(durationParts[0]);
    
        totalDuration += seconds * repsMultiplier;
      }
    });
    
    // Calculate 10% of the totalDuration and add it to the totalDuration
    const duration = totalDuration + (totalDuration * 0.5);
  
    // Convert duration to the desired format
/*    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
    
    // Format hours, minutes, and seconds with leading zeros if needed
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    
    // Remove leading zeros from the formattedHours string
    const formattedHoursWithoutZeros = formattedHours.replace(/^0+/, '');

    // Remove leading zeros from the formattedMinutes string
    const formattedMinutesWithoutZeros = formattedMinutes.replace(/^0+/, '');
    
    // Check if the duration is in hours
    if (formattedHoursWithoutZeros !== '') {
      // Create the final duration string with hours, minutes, and optional seconds
      const finalDurationString = `${formattedHoursWithoutZeros}:${formattedMinutes}:${formattedSeconds !== '00' ? formattedSeconds : ''}`;
    
      console.log(finalDurationString); // Output: final formatted duration with hours
    } else {
      // Check if the duration is in minutes
      if (formattedMinutesWithoutZeros !== '') {
        // Create the final duration string with minutes and optional seconds
        const finalDurationString = `${formattedMinutesWithoutZeros}:${formattedSeconds !== '00' ? formattedSeconds : ''}s`;
    
        console.log(finalDurationString); // Output: final formatted duration with minutes
      } else {
        // Create the final duration string with seconds
        const finalDurationString = `${formattedSeconds}s`;
    
        console.log(finalDurationString); // Output: final formatted duration with seconds
      }
    }*/
    
    setIsButtonDisabled(true);
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("listaIds", idString);
    formData.append("listaReps", repsString);
    formData.append("duracao", duration);
    formData.append("nivelResponsavel", utilizadorInfo.nivel);
    formData.append("responsavel", utilizadorInfo.nome);

    const jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }

    console.log(jsonData)

    try {
      const response = await ApiConnectionConfig.post("/AddPlanoTreinoInfo", jsonData);

      setRedbutton(false);
      setTimeout(() => {
        setRefresh(!refresh);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }
  else{
    setErrorMessage("Preencha todos os campos");
  
  }
}
  else{

  
    if (nomeAdd!=="" && segunda!=="" && terca!=="" && quarta!=="" && quinta!=="" && sexta!=="" && sabado!=="") {
    setRedbutton(true);
 
    setIsButtonDisabled(true);
    const formData = new FormData();
    formData.append("nome", nomeAdd);
    formData.append("segunda", segunda);
    formData.append("terca", terca);
    formData.append("quarta", quarta);
    formData.append("quinta", quinta);
    formData.append("sexta", sexta);
    formData.append("sabado", sabado);
    formData.append("nivelResponsavel", utilizadorInfo.nivel);
    formData.append("responsavel", utilizadorInfo.nome);

    const jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }

    console.log(jsonData)

    try {
      const response = await ApiConnectionConfig.post("/AddPlanoTreino", jsonData);

      setRedbutton(false);
      setTimeout(() => {
        setRefresh(!refresh);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }
  else{
    setErrorMessage("Preencha todos os campos");
  }
  }
  
};

  return (
    <Box mb="30px" display="flex" justifyContent="space-between">
      <Box>
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          {title}
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
          {subtitle}
        </Typography>
      </Box>
      
      <Modal open={openDelete} onClose={handleCloseDelete}>
  
        <Box sx={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          width : "45vh",
          height: !avlFm ? (selectedPlan === 0 ? "30vh" : "65vh") : "20vh",
          transform: 'translate(-50%, -50%)',
          display: "flex",
          flexDirection: "column",
          backgroundColor: colors.primary[400],
          padding: "25px",
          borderRadius: "8px",
          '@media (max-height: 800px)': {
            height: !avlFm ? (selectedPlan === 0 ? "40vh" : "75vh") : "30vh",

          }
        }}>
 <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="body1">Plano de Treino/Plano Semanal</Typography>
      <Switch
        checked={avlFm}
        onChange={() => setAvlFm(!avlFm)}
        color="primary"
      />
      <Typography variant="body1" sx={{color:colors.greenAccent[500]}}>{avlFm ? "Plano Semanal" : "Plano de Treino"}</Typography>
    </Box>
    <br />
{!avlFm ? (

<FormControl variant="outlined" sx={{ mb: "16px", my: "1vh" }}>


<Autocomplete
 label="Treino"
 noOptionsText="Nenhum resultado encontrado"
      disabled={false}
      options={dataEx.filter((row) => row.ativo !== 1)}
      getOptionLabel={(option) => option.NomePlanoTreino}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Procura por nome"
          variant="outlined"
          sx={{ minWidth: '120px' }}
        />
      )}
      value={dataEx.find((option) => option.IdPlanoTreinoInfo === selectedPlan) || null}
      onChange={handleOptionChangeEdit}
      sx={{ minWidth: '120px' }}
    />

  {selectedPlan !== 0 ? (
      <Box >
        <br />
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <IconButton aria-label="previous day" onClick={handlePrevClick}>
      <ArrowBackIosNewIcon />
    </IconButton>


    <Typography variant="h3" sx={{ mx: "16px" }}>
      {dataEx[selectedRowIndex]?.exercises[exerciceIndex]?.map((exercise) => exercise.nome).join(", ")}
    </Typography>
 



    <IconButton aria-label="next day" onClick={handleNextClick}>
      <ArrowForwardIosIcon />
    </IconButton>
  </Box>

  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "2vh",
      
    }}
  >
     <Typography variant="h6" sx={{ color: "gray" }}>
     Repetições/Séries:
   </Typography>
     <Typography variant="h6" sx={{ marginRight:"26px",mx:"2px", color: colors.greenAccent[500] }}>
     {dataEx[selectedRowIndex]?.exercises[exerciceIndex]?.map((exercise) => exercise.reps).join(", ")}
   </Typography>

   <Typography variant="h6" sx={{ color: "gray", marginLeft:"10px" }}>
     Descanso:
   </Typography>
   <Typography variant="h6" sx={{ mx:"2px", color: colors.greenAccent[500] }}>
     {dataEx[selectedRowIndex]?.exercises[exerciceIndex]?.map((exercise) => exercise.rest).join(", ")}
   </Typography>
   </Box> 

   <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "2vh",
      
    }}
  >
   <CardMedia sx={{width:"80%", borderRadius:5, maxHeight:"30vh", minHeight:"30vh"}}
  component="img"
  src={dataEx[selectedRowIndex]?.exercises[exerciceIndex]?.map((exercise) => exercise.source).join(", ")}
  alt="Exercise Image"
/>
</Box> 
   </Box>

) : (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Typography variant="h6">Dia livre, sem exercicios</Typography>
  </Box>
)}




</FormControl>



):  <center><Typography variant="h6">{selectedRows.length === 0 ? "Sem plano(s) selecionado(s) para apagar" : "Deseja apagar os dados selecionados da tabela?"}</Typography></center>}

<Button
disabled={(!avlFm && selectedPlan !== 0) || (avlFm && selectedRows.length !== 0)
  ? false
  : true
}
  onClick={handleDelete}
  variant="contained"
  color="primary"
  fullWidth
  sx={{
    mt: "16px",
    backgroundColor: redbutton ? colors.redAccent[500] : colors.blueAccent[500],
    height: "4vh",
  }}
>
  Apagar
</Button>
        </Box>


</Modal>




<Modal open={openAdd} onClose={handleCloseAdd}>
  <Box sx={{
    position: 'absolute',
    top: '45%',
    left: '50%',
    width : "70vh",
    height: !avlFm  ?"65vh": "70vh",
    transform: 'translate(-50%, -50%)',
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.primary[400],
    padding: "25px",
    borderRadius: "8px",
      '@media (max-height: 800px)': {
        height: !avlFm  ?"75vh": "80vh",

  }
  }}>
    
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="body1">Plano de Treino/Plano Semanal</Typography>
      <Switch
        checked={avlFm}
        onChange={() => setAvlFm(!avlFm)}
        color="primary"
      />
      <Typography variant="body1" sx={{color:colors.greenAccent[500]}}>{avlFm ? "Plano Semanal" : "Plano de Treino"}</Typography>
    </Box>

    {!avlFm ? (
  <FormControl variant="outlined" sx={{ mb: "16px", my: "1vh" }}>
   
   <TextField
        label="Nome"
        variant="outlined"
        value={nome}
        sx={{ mb: "16px" }}
        InputLabelProps={{
          shrink: nome ? true : false
        }}
        onChange={(e) => setNome(e.target.value)}
      />

    {!load ? (
      <FormControl variant="outlined" sx={{ mb: "16px", my: "1vh" }}>
         <Autocomplete
   label="Procura por nome"
   noOptionsText="Nenhum resultado encontrado"
   options={dataExercicios.filter((exercicio) => exercicio.ativo !== 1)}

      getOptionLabel={(option) => option.nome}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Procura por nome"
          variant="outlined"
          sx={{ minWidth: '120px' }}
        />
      )}
      value={dataExercicios.find((option) => option.id === selectedExercice) || null}
      onChange={handleOptionChangeEditEx}
      sx={{ minWidth: '120px' }}
    />

        <Box sx={{ flexDirection: "row", display: "flex" }}>
          <TextField
            label="Séries"
            type="number"
            disabled={selectedExercice === 0 ? true : false}
            variant="outlined"
            value={series}
            sx={{ marginTop: "16px", mx: "5px", flex: 1 }}
            InputLabelProps={{
              shrink: series ? true : false
            }}
            onChange={(e) => setSeries(e.target.value)}
          />

          <TextField
            label="Reps"
            type="number"
            disabled={selectedExercice === 0 ? true : false}
            variant="outlined"
            value={repss}
            sx={{ marginTop: "16px", mx: "5px", flex: 1 }}
            InputLabelProps={{
              shrink: repss ? true : false
            }}
            onChange={(e) => setReps(e.target.value)}
          />
        </Box>

        <IconButton
          sx={{ marginLeft: "auto", color: colors.blueAccent[500] }}
          aria-label="Add"
          onClick={handleAddExercise2}
        >
          <Typography sx={{ m: "5px" }}>Adicionar Exercicio </Typography>
          <AddIcon />
        </IconButton>
      </FormControl>
    ) : null}

    <Box sx={{ width: "100%", height: "1px", backgroundColor: "white" }}></Box>



    <DragDropContext onDragEnd={handleDragEnd1}>
  <List sx={{ overflowY: "auto", maxHeight: "20vh" }}>
    <Droppable droppableId="droppable-list">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            background: snapshot.isDraggingOver ? "lightblue" : "transparent",
            ...getListStyle(snapshot.isDraggingOver),
          }}
        >
          {arrayEx?.map((element, index) => (
            <Draggable key={index} draggableId={`draggable-item-${index}`} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                  <ListItem>
                    <ListItemText primary={element.nome} />
                    <ListItemText primary={element.reps} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        sx={{ color: colors.redAccent[500] }}
                        onClick={() => handleExerciseDelete2(element, index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </List>
</DragDropContext>


  </FormControl>
) : (
        

  <FormControl variant="outlined" sx={{ mb: "16px", my: "1vh" }}>


<TextField
        label="Nome"
        variant="outlined"
        value={nomeAdd}
        sx={{ mb: "16px", marginTop:"2vh" }}
        InputLabelProps={{
          shrink: nomeAdd ? true : false
        }}
        onChange={(e) => setNomeAdd(e.target.value)}
      />





    <Box sx={{
      flexDirection:"row",
      marginRight:"10px",
      display: "flex",
      my:"2vh"
      }}>


   <FormControl variant="outlined" sx={{
      flexDirection:"collum",
     flex:1 ,
  
      }}>
    <Typography sx={{ m: "5px" }}>Segunda-Feira</Typography>
    <Autocomplete
    label="Procura por nome"
    noOptionsText="Nenhum resultado encontrado"
      disabled={isButtonDisabled}
      options={[{ IdPlanoTreinoInfo: 0, NomePlanoTreino: 'Dia livre' }, ...dataEx.filter((row) => row.ativo !== 1)]}

      getOptionLabel={(option) => option.NomePlanoTreino}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Procura por nome"
          variant="outlined"
          fullWidth
          sx={{ minWidth: '120px', marginLeft: '0' }}
        />
      )}
      value={dataEx.find((option) => option.IdPlanoTreinoInfo === segunda) || null}
      onChange={(event, value)=>{ setSegunda(value ? value.IdPlanoTreinoInfo : '');}}
      sx={{ minWidth: '120px', marginLeft: '0' }}
    />
    </FormControl>



    
 
  <FormControl variant="outlined" sx={{
      flexDirection:"collum",
     flex:1 ,
  
      }}>
    <Typography sx={{ m: "5px", mx:"10px" }}>Terça-Feira</Typography>
    <Autocomplete
    label="Procura por nome"
    noOptionsText="Nenhum resultado encontrado"
      disabled={isButtonDisabled}
      options={[{ IdPlanoTreinoInfo: 0, NomePlanoTreino: 'Dia livre' }, ...dataEx.filter((row) => row.ativo !== 1)]}

      getOptionLabel={(option) => option.NomePlanoTreino}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Procura por nome"
          variant="outlined"
          fullWidth
          sx={{ minWidth: '120px', marginLeft: '10px' }}
        />
      )}
      value={dataEx.find((option) => option.IdPlanoTreinoInfo === terca) || null}
      onChange={(event, value)=>{ setTerca(value ? value.IdPlanoTreinoInfo : '');}}
      sx={{ minWidth: '120px', marginLeft: '10px' }}
    />
    </FormControl>
    </Box>


    
  <Box sx={{
      flexDirection:"row",
      display: "flex",
      my:"2vh",
      marginRight:"10px",
      }}>



  <FormControl variant="outlined" sx={{
      flexDirection:"collum",
     flex:1 ,
  
      }}>
    <Typography sx={{ m: "5px" }}>Quarta-Feira</Typography>
    <Autocomplete
    label="Procura por nome"
    noOptionsText="Nenhum resultado encontrado"
      disabled={isButtonDisabled}
      options={[{ IdPlanoTreinoInfo: 0, NomePlanoTreino: 'Dia livre' }, ...dataEx.filter((row) => row.ativo !== 1)]}

      getOptionLabel={(option) => option.NomePlanoTreino}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Procura por nome"
          variant="outlined"
          fullWidth
          sx={{ minWidth: '120px', marginLeft: '0' }}
        />
      )}
      value={dataEx.find((option) => option.IdPlanoTreinoInfo === quarta) || null}
      onChange={(event, value)=>{ setQuarta(value ? value.IdPlanoTreinoInfo : '');}}
      sx={{ minWidth: '120px', marginLeft: '0' }}
    />
    </FormControl>
   


    

  <FormControl variant="outlined" sx={{
      flexDirection:"collum",
     flex:1 ,
  
      }}>
    <Typography sx={{ m: "5px", mx:"10px"}}>Quinta-Feira</Typography>
    <Autocomplete
    label="Procura por nome"
    noOptionsText="Nenhum resultado encontrado"
      disabled={isButtonDisabled}
      options={[{ IdPlanoTreinoInfo: 0, NomePlanoTreino: 'Dia livre' }, ...dataEx.filter((row) => row.ativo !== 1)]}

      getOptionLabel={(option) => option.NomePlanoTreino}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Procura por nome"
          variant="outlined"
          fullWidth
          sx={{ minWidth: '120px', marginLeft: '10px' }}
        />
      )}
      value={dataEx.find((option) => option.IdPlanoTreinoInfo === quinta) || null}
      onChange={(event, value)=>{ setQuinta(value ? value.IdPlanoTreinoInfo : '');}}
      sx={{ minWidth: '120px', marginLeft: '10px' }}
    />
    </FormControl>
    </Box>



  
  <Box sx={{
      flexDirection:"row",
      display: "flex",
      my:"2vh",
      marginRight:"10px",
      }}>



  <FormControl variant="outlined" sx={{
      flexDirection:"collum",
     flex:1 ,
  
      }}>
    <Typography sx={{ m: "5px"}}>Sexta-Feira</Typography>
    <Autocomplete
    label="Procura por nome"
    noOptionsText="Nenhum resultado encontrado"
      disabled={isButtonDisabled}
      options={[{ IdPlanoTreinoInfo: 0, NomePlanoTreino: 'Dia livre' }, ...dataEx.filter((row) => row.ativo !== 1)]}

      getOptionLabel={(option) => option.NomePlanoTreino}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Procura por nome"
          variant="outlined"
          fullWidth
          sx={{ minWidth: '120px', marginLeft: '0' }}
        />
      )}
      value={dataEx.find((option) => option.IdPlanoTreinoInfo === sexta) || null}
      onChange={(event, value)=>{ setSexta(value ? value.IdPlanoTreinoInfo : '');}}
      sx={{ minWidth: '120px', marginLeft: '0' }}
    />
    </FormControl>
    

    
    
 <FormControl variant="outlined" sx={{
      flexDirection:"collum",
     flex:1 ,
  
      }}>
    <Typography sx={{ m: "5px", mx:"10px" }}>Sábado</Typography>
    <Autocomplete
    label="Procura por nome"
    noOptionsText="Nenhum resultado encontrado"
      disabled={isButtonDisabled}
      options={[{ IdPlanoTreinoInfo: 0, NomePlanoTreino: 'Dia livre' }, ...dataEx.filter((row) => row.ativo !== 1)]}

      getOptionLabel={(option) => option.NomePlanoTreino}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Procura por nome"
          variant="outlined"
          fullWidth
          sx={{ minWidth: '120px', marginLeft: '10px' }}
        />
      )}
      value={dataEx.find((option) => option.IdPlanoTreinoInfo === sabado) || null}
      onChange={(event, value)=>{ setSabado(value ? value.IdPlanoTreinoInfo : '');}}
      sx={{ minWidth: '120px', marginLeft: '10px' }}
    />
    </FormControl>
 

  </Box>

  
 

  {/* Repeat the above pattern for the remaining components */}


  
</FormControl>


)}



<Button
disabled={redbutton}
  onClick={handleAdicionar}
  variant="contained"
  color="primary"
  fullWidth
  sx={{
    mt: "16px",
    backgroundColor: redbutton ? colors.redAccent[500] : colors.blueAccent[500],
    height: "4vh",
  }}
>
  Adicionar
</Button>

  </Box>
</Modal>




<Modal open={openEdit} onClose={handleCloseEdit}>
  <Box sx={{
    position: 'absolute',
    top: '45%',
    left: '50%',
    width : "70vh",
    height: selectedPlan!==0 ?"70vh": "50vh",
    transform: 'translate(-50%, -50%)',
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.primary[400],
    padding: "25px",
    borderRadius: "8px",
    '@media (max-height: 800px)': {
      height: selectedPlan!==0 ?"85vh": "60vh",

    }
  }}>
    
    <FormControl variant="outlined" sx={{ mb: "16px", my: "1vh" }}>



<Autocomplete
 label="Procura por nome"
 noOptionsText="Nenhum resultado encontrado"
      disabled={false}
      options={dataEx}

      getOptionLabel={(option) => option.NomePlanoTreino}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Procura por nome"
          variant="outlined"
          sx={{ minWidth: '120px' }}
        />
      )}
      value={dataEx.find((option) => option.IdPlanoTreinoInfo === selectedPlan) || null}
      onChange={handleOptionChangeEdit}
      sx={{ minWidth: '120px' }}
    />
  <br></br>
<FormControl variant="outlined" sx={{ mb: "16px" }}>
          <InputLabel  id="select-label">Atividade</InputLabel>
          <Select
          disabled={selectedPlan === 0 ? true : false}
            labelId="select-label"
            value={selectedOptionEdit1}
            onChange={handleOptionChangeEdit1}
            label="Select"
            sx={{ minWidth: "120px" }}
          >
             <MenuItem key={0} value={0}>ativo</MenuItem>
              <MenuItem key={1} value={1}>desativo</MenuItem>
          </Select>
        </FormControl>

  <br></br>

  {!load ?(
    
     <FormControl variant="outlined" sx={{ mb: "16px" }}>






  <Autocomplete
        noOptionsText="Nenhum resultado encontrado"
   label="Procura por nome"
      disabled={selectedPlan === 0 ? true : false}
      options={dataExercicios.filter((exercicio) => exercicio.ativo !== 1)}

      getOptionLabel={(option) => option.nome}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Procura por nome"
          variant="outlined"
          sx={{ minWidth: '120px' }}
        />
      )}
      value={dataExercicios.find((option) => option.id === selectedExercice) || null}
      onChange={handleOptionChangeEditEx}
      sx={{ minWidth: '120px' }}
    />

<Box sx={{
  flexDirection:"row",
  display: "flex"
  }}>

    <TextField
      label="Séries"
      type="number"
      disabled={selectedExercice ===0 ? true : false}
      variant="outlined"
      value={series}
      sx={{ marginTop: "16px", mx:"5px", flex:1 }}
      InputLabelProps={{
        shrink: series ? true : false
      }}
      onChange={(e) => setSeries(e.target.value)}
    />

    <TextField
      label="Reps"
      type="number"
      disabled={selectedExercice===0 ? true : false}
      variant="outlined"
      value={repss}
      sx={{ marginTop: "16px", mx:"5px",flex:1 }}
      InputLabelProps={{
        shrink: repss ? true : false
      }}
      onChange={(e) => setReps(e.target.value)}
    />

  </Box>

<IconButton  sx={{ marginLeft: "auto", color:colors.blueAccent[500]}} aria-label="Add" onClick={handleAddExercise}>
  <Typography sx={{m:"5px"}}>Adicionar Exercicio </Typography>
      <AddIcon />
    </IconButton> 
</FormControl>
): null}


<Box sx={{

    width : "100%",
    height: "1px",
    backgroundColor:"white"
  }}>  </Box>



<DragDropContext onDragEnd={handleDragEnd}>
  <List sx={{ overflowY: "auto", maxHeight: "20vh" }}>
    <Droppable droppableId="droppable-list">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            background: snapshot.isDraggingOver ? "lightblue" : "transparent",
            ...getListStyle(snapshot.isDraggingOver),
          }}
        >
          {dataEXEditar?.map((element, index) => (
            <Draggable key={index} draggableId={`draggable-item-${index}`} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                  <ListItem>
                    <ListItemText primary={element.nome} />
                    <ListItemText primary={element.reps} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        sx={{ color: colors.redAccent[500] }}
                        onClick={() => handleExerciseDelete(element, index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </List>
</DragDropContext>



 
  


<Button
disabled={selectedPlan===0 ? true:false}
  onClick={handleEditar}
  variant="contained"
  color="primary"
  fullWidth
  sx={{
    mt: "16px",
    backgroundColor: redbutton ? colors.redAccent[500] : colors.blueAccent[500],
    height: "4vh",
  }}
>

  
  Editar
</Button>
</FormControl>
  </Box>
</Modal>



 
      <Box display="flex" justifyContent="space-between">
        <Box>
        <br></br>
        <IconButton onClick={() => handleOpenEdit()}>
        <EditIcon />
      </IconButton>
          
          <Button variant="contained" sx={{width: "10vh",height: "4vh", mx: "4vh", background: colors.greenAccent[600]}} onClick={() => handleOpenAdd()}>
            Adicionar
          </Button>
        </Box>
        <Box>
          <br></br>
          <Button variant="contained" sx={{width: "10vh",height: "4vh", mx: "4vh", background: colors.redAccent[500]}} onClick={() => handleOpenDelete()}>
            Apagar
          </Button>
        </Box>
      </Box>

    </Box>
  );
  
};

export default HeaderPlans;