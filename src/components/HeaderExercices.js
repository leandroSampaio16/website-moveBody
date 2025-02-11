import { Typography, Box, useTheme, Button, Modal, TextField,  Select, MenuItem, FormControl, InputLabel,  } from "@mui/material";
import { tokens } from "../theme";
import ApiConnectionConfig from "../data/ApiConnectionConfig";
import Cookies from "js-cookie"
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { CardMedia } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

const HeaderExercices = ({ title, subtitle, selectedRows, setErrorMessage, data, adminOptions, refresh, setRefresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [nome, setNome] = useState("");
  const [rest, setRest] = useState("");
  const [redbutton, setRedbutton] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLabelDisabled, setIsLabelDisabled] = useState(true);
  const [nomeEdit, setNomeEdit] = useState("");
  const [idColaborador, setIdColaborador] = useState("");
  const [sourceEdit, setSourceEdit] = useState("");
  const [restEdit, setRestEdit] = useState("");
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedOptionEdit1, setSelectedOptionEdit1] = useState("");

  const [selectedClient, setSelectedClient] = useState(null);
  const [clientOptions, setClientOptions] = useState([]);

  useEffect(() => {
    setClientOptions(data.map((row) => row.nome));
  }, []);

  const handleSearchChange = (event, value) => {
    const filteredOptions = data
      .filter((row) => row.nome.toLowerCase().includes(value.toLowerCase()))
      .map((row) => row.nome);

    setClientOptions(filteredOptions);
  };

  const handleClientSelect = (event, value) => {
    const selectedClientData = data.find((row) => row.nome === value);

    if (selectedClientData) {
      const {
        nome,
        source,
        rest,
        id,
        ativo
      } = selectedClientData;
  
      setNomeEdit(nome);
      setSourceEdit(source)
      setRestEdit(rest)   
      setIdColaborador(id)
      setIsLabelDisabled(false)

      if(!ativo){
        setSelectedOptionEdit1(0)
      }
      else{
        setSelectedOptionEdit1(ativo)
      }
    

    } else {
      // Reset the fields if no client is selected
      setNomeEdit("");
      setSourceEdit("")
      setRestEdit("")   
      setSelectedOptionEdit1("")
      setIdColaborador("")
      setIsLabelDisabled(true)
    }
  };

  const handleOptionChangeEdit1 = (event) => {
    setSelectedOptionEdit1(event.target.value);
  }


  useEffect(() => {
    const uploadImage = async () => {
      try {
        const formData = new FormData();
        formData.append('image', file, file.name);
  
        const response = await ApiConnectionConfig.post("/upload", formData);
        const imageUrlTeste = response.data.imageUrl;
        setSourceEdit(imageUrlTeste);

      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
  
    if (file) {
      uploadImage();
    }
  }, [file, imageUrl]);
  
  const handleFileChangeAdd = async (event) => {


    
    
        const fileCreated = event.target.files[0];
    
        setFile(fileCreated)

      };


  const handleFileChange = async (event) => {

if(idColaborador){


    const fileCreated = event.target.files[0];

    setFile(fileCreated)
}else{
  setErrorMessage("Selecione um exercício para editar")
}
   
  };


  
    const [selectedOption, setSelectedOption] = useState("");
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    }


    const utilizadorInfo = JSON.parse(Cookies.get('utilizadorInfo'));

  const handleDelete = async () => {
    selectedRows.forEach(async (element) => {
      setIsButtonDisabled(true)
      
      const response = await ApiConnectionConfig.delete("/ApagarExercicios?Id=" + element + "&responsavel=" + utilizadorInfo.nome + "&nivel=" + utilizadorInfo.nivel + "")

    })
    setTimeout(() => {
      setRefresh(!refresh);
    }, 1000);
  }



  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenDelete = () => {
    if(selectedRows?.length === 0) {
      setErrorMessage("Selecione um exercício para apagar");
    } else {
      setOpenDelete(true);
    }
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

    setOpenEdit(true);

  }

  const handleCloseEdit = () => {
    if(!isButtonDisabled){
      setOpenEdit(false);
      setNomeEdit("")
      setSourceEdit("");
      setRestEdit("")
      setIdColaborador("")
      setIsLabelDisabled(true)
      setOpenEdit(false);
      
    }
  }




  const handleCloseAdd = () => {
    if(!isButtonDisabled){
      setOpenAdd(false);
    }
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
  if (nomeEdit && sourceEdit  && !isLabelDisabled && restEdit) {
    setIsButtonDisabled(true)
   
    const formData = new FormData();
    formData.append("nome", nomeEdit);
    formData.append("source", sourceEdit);
    formData.append("rest", restEdit);
    formData.append("id", idColaborador);
    formData.append("responsavel", utilizadorInfo.nome);
    formData.append("nivelResponsavel", utilizadorInfo.nivel);
    formData.append("ativo", selectedOptionEdit1); 

    const jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }       

    try {
      const response = await ApiConnectionConfig.post("/UpdateExercicio", jsonData);

      setRedbutton(false);
      setTimeout(() => {
        setRefresh(!refresh);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  
  }else {
    setErrorMessage("Preencha todos os campos");
   
  }

}




const handleAdicionar = async () => {
 if(sourceEdit!=="" && nome && rest){
   setRedbutton(true)
   const formData = new FormData();
   formData.append("nome", nome);
   formData.append("source", sourceEdit);
   formData.append("rest", rest);
   formData.append("responsavel", utilizadorInfo.nome);
   formData.append("nivelResponsavel", utilizadorInfo.nivel);

   const jsonData = {};
   for (const [key, value] of formData.entries()) {
     jsonData[key] = value;
   }       

   try {
     const response = await ApiConnectionConfig.post("/AddExercicio", jsonData);

     setRedbutton(false);
     setTimeout(() => {
      setRefresh(!refresh);
    }, 1000);
   } catch (error) {
     console.error(error);
   }


 }else{
  setErrorMessage("Preencha os campos")
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
          height: "25vh",
          transform: 'translate(-50%, -50%)',
          display: "flex",
          flexDirection: "column",
          backgroundColor: colors.primary[400],
          padding: "25px",
          borderRadius: "8px",
          '@media (max-height: 800px)': {
            height: "30vh" // set a different height for screens smaller than 768px
          }
        }}>
          <center>
            <Typography variant="h3" sx={{color: colors.blueAccent[400], marginTop: "1vh"}}>Tem a certeza que deseja apagar?</Typography>
          </center>
            <Typography variant="h5" sx={{color: colors.redAccent[600], marginTop: "3vh", mx: "2.5vh"}}>Ao apagar o exercico ficará inativo</Typography>
            <center>
            <Button variant="contained" sx={{width: "10vh",height: "4vh", background: colors.greenAccent[600], marginTop: "5.5vh"}} onClick={() => handleDelete()}>
            Confirmar
          </Button>
          </center>
        </Box>

</Modal>




<Modal open={openAdd} onClose={handleCloseAdd}>
  <Box sx={{
    position: 'absolute',
    top: '45%',
    left: '50%',
    width : "70vh",
    height: sourceEdit=== "" ? "35vh" : "70vh",
    transform: 'translate(-50%, -50%)',
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.primary[400],
    padding: "25px",
    borderRadius: "8px",
      '@media (max-height: 800px)': {
        height: sourceEdit=== "" ? "45vh" : "75vh",
  }
  }}>
    
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
            <TextField
      value={rest}

        label="Descanso"
        variant="outlined"
        sx={{ mb: "16px" }}
        InputLabelProps={{
          shrink: rest ? true : false
        }}
        onChange={(e) => setRest(e.target.value)}
      />
      {sourceEdit!=="" ? (
        <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          my:"2vh"
        }}
      >
        <CardMedia
          sx={{ width: "70%", borderRadius: 5, maxHeight: "30vh", minHeight: "30vh" }}
          component="img"
          src={sourceEdit}
          alt="Exercise Image"
        />
      </Box>):null}
     <input

      type="file"
      accept="image/*"
      onChange={handleFileChangeAdd}
      style={{
        marginBottom: "16px",
        backgroundColor: colors.primary[300],
        color: colors.text,
        border: `1px solid ${colors.primary[500]}`,
        borderRadius: "4px",
        padding: "8px",
        fontSize: "16px",
        cursor: "pointer",
        width: "100%",
      }}
    />
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
    height: isLabelDisabled ? "50vh" : "85vh",
    transform: 'translate(-50%, -50%)',
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.primary[400],
    padding: "25px",
    borderRadius: "8px",
    '@media (max-height: 800px)': {
      top: '50%',
      height: isLabelDisabled ? "55vh" : "95vh",

    }
  }}>
    
    <Autocomplete
      label="Procura por nome"
      options={clientOptions}
      onChange={handleClientSelect}
      onInputChange={handleSearchChange}
      noOptionsText="Nenhum resultado encontrado"
      value={selectedClient ? selectedClient.nome : ''}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Procura por nome"
          variant="outlined"
          sx={{ mb: '16px' }}
        />
      )}
    />

      <TextField
        label="Nome"
        disabled = {isLabelDisabled}
        variant="outlined"
        value={nomeEdit}
        sx={{ mb: "16px" }}
        InputLabelProps={{
          shrink: nomeEdit ? true : false
        }}
        onChange={(e) => setNomeEdit(e.target.value)}
      />
            <TextField
      value={restEdit}
      disabled = {isLabelDisabled}
        label="Descanso"
        variant="outlined"
        sx={{ mb: "16px" }}
        InputLabelProps={{
          shrink: restEdit ? true : false
        }}
        onChange={(e) => setRestEdit(e.target.value)}
      />
         <FormControl variant="outlined" sx={{ mb: "16px" }}>
          <InputLabel  id="select-label">Atividade</InputLabel>
          <Select
            disabled = {isLabelDisabled}
            labelId="select-label"
            value={selectedOptionEdit1}
            onChange={handleOptionChangeEdit1}
            label="Select"
            sx={{ minWidth: "120px" }}
          >
          <MenuItem key={0 || null} value={0}>ativo</MenuItem>
              <MenuItem key={1} value={1}>desativo</MenuItem>
          </Select>
        </FormControl>
      {sourceEdit!=="" ? (
        <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          my:"2vh"
        }}
      >
        <CardMedia
          sx={{ width: "70%", borderRadius: 5, maxHeight: "30vh", minHeight: "30vh" }}
          component="img"
          src={sourceEdit}
          alt="Exercise Image"
        />
      </Box>):null}
     <input
    disabled = {isLabelDisabled}
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      style={{
        marginBottom: "16px",
        backgroundColor: colors.primary[300],
        color: colors.text,
        border: `1px solid ${colors.primary[500]}`,
        borderRadius: "4px",
        padding: "8px",
        fontSize: "16px",
        cursor: "pointer",
        width: "100%",
      }}
    />
     

<Button
disabled={isLabelDisabled}
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

export default HeaderExercices;