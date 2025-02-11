import { Typography, Box, useTheme, Button, Modal, TextField,  Select, MenuItem, FormControl, InputLabel,  } from "@mui/material";
import { tokens } from "../theme";
import Autocomplete from '@mui/material/Autocomplete';
import ApiConnectionConfig from "../data/ApiConnectionConfig";
import Cookies from "js-cookie"
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';


const Header = ({ title, subtitle, selectedRows, setErrorMessage, data, adminOptions, refresh, setRefresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [nome, setNome] = useState("");
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
        telefone,
        email,
        DataNasc,
        nivel,
        password,
        ativo,
        idColaboradores
      } = selectedClientData;
  
      setNomeEdit(nome);
      setTelefoneEdit(telefone);
      setEmailEdit(email);
      setIdColaborador(idColaboradores)
      setDataNascEdit(DataNasc);
      setSelectedOptionEdit(nivel);
      setSelectedOptionEdit1(ativo);
      setIsLabelDisabled(false);
      setSenhaEdit(password);
    } else {
      // Reset the fields if no client is selected
      setNomeEdit('');
      setTelefoneEdit('');
      setEmailEdit('');
      setDataNascEdit('');
      setSelectedOptionEdit('');
      setIdColaborador("")
      setSelectedOptionEdit1("");
      setIsLabelDisabled(true);
      setSenhaEdit('');
    }
  };

  const options = [
    { value: "admin", label: "Admin" },
    { value: "pt", label: "PT" },
  ];
  
 
    const [selectedOption, setSelectedOption] = useState("");
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    }

    const handleOptionChangeEdit = (event) => {
      setSelectedOptionEdit(event.target.value);
    }

    const handleOptionChangeEdit1 = (event) => {
      setSelectedOptionEdit1(event.target.value);
    }

    const utilizadorInfo = JSON.parse(Cookies.get('utilizadorInfo'));

  const handleDelete = async () => {
    selectedRows.forEach(async (element) => {
      setIsButtonDisabled(true)
      console.log(utilizadorInfo)
      const rowExists = data.find(row => row.idColaboradores === element && utilizadorInfo.idColaboradores!= row.idColaboradores);

      if (rowExists) {
        const response = await ApiConnectionConfig.delete("/ApagarColaboradores?Id=" + element + "&responsavel=" + utilizadorInfo.nome + "&nivel=" + utilizadorInfo.nivel + "")

      } else {
        setErrorMessage("Não é possivel desativar a sua conta")
      }
    
    })
    setTimeout(() => {
      setRefresh(!refresh);
    }, 1000);
    
  }



  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenDelete = () => {
    if(selectedRows.length === 0) {
      setErrorMessage("Selecione um colaborador para apagar");
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
      setTelefoneEdit("")
      setEmailEdit("")
      setSenhaEdit("")
      setSelectedOptionEdit("")
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
  if (nomeEdit && telefoneEdit && emailEdit && selectedOptionEdit && dataNascEdit && !isLabelDisabled) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailEdit && !emailRegex.test(emailEdit)) {
      setErrorMessage("Digite um email válido");
      setRedbutton(true);
      return;
    }
    
    setIsButtonDisabled(true)
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
    formData.append("ativo", selectedOptionEdit1);
    formData.append("nivelResponsavel", utilizadorInfo.nivel);

    const jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }

    try {
      const response = await ApiConnectionConfig.post("/UpdateColaboradores", jsonData);

      setRedbutton(false);
      setTimeout(() => {
        setRefresh(!refresh);
      }, 1000);
    } catch (error) {
      console.error(error);
    }

  }else {
    setErrorMessage("Preencha todos os campos");
    setRedbutton(true);
  }

}




const handleAdicionar = async () => {
  if (nome && telefone && email && dataNasc &&selectedOption) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setErrorMessage("Digite um email válido");
      setRedbutton(true);
      return;
    }

    const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    if (telefone && !phoneRegExp.test(telefone)) {
      setErrorMessage("Digite um número de telefone válido");
      setRedbutton(true);
      return;
    }

    if (data.some(child => child.email === email)) {
      setErrorMessage('Já existe um utilizador com esse email');
      return;
    }

    setIsButtonDisabled(true);
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("password", generatePassword());
    formData.append("telefone", telefone);
    formData.append("email", email);
    formData.append("nivel", selectedOption);
    formData.append("dataNasc", dataNasc);
    formData.append("nivelResponsavel", utilizadorInfo.nivel);
    formData.append("responsavel", utilizadorInfo.nome);

    const jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }

    
    if(selectedOption == "pt" ){
      
      const formDataPt = new FormData();
      formDataPt.append("nome", nome);
      formDataPt.append("telefone", telefone);
      formDataPt.append("email", email);
      formDataPt.append("dataNasc", dataNasc);
  
      const jsonDataPt = {};
      for (const [key, value] of formDataPt.entries()) {
        jsonDataPt[key] = value;
      }

      try {

        const response1 = await ApiConnectionConfig.post("/AddPts", jsonDataPt);
  
        
      } catch (error) {
        console.error(error);
      }

    }


    try {
      const response = await ApiConnectionConfig.post("/AddColaboradores", jsonData);

      setRedbutton(false);
      setTimeout(() => {
        setRefresh(!refresh);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  } else {
    setErrorMessage("Preencha todos os campos");
    setRedbutton(true);
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
            <Typography variant="h5" sx={{color: colors.redAccent[600], marginTop: "3vh", mx: "2.5vh"}}>Ao apagar o colaborador ficará inativo</Typography>
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
    height: "50vh",
    transform: 'translate(-50%, -50%)',
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.primary[400],
    padding: "25px",
    borderRadius: "8px",
      '@media (max-height: 800px)': {
    height: "60vh" // set a different height for screens smaller than 768px
  }
  }}>
    
      
      <TextField
        label="Nome"
        variant="outlined"
        sx={{ mb: "16px" }}
        onChange={(e) => setNome(e.target.value)}
      />
      <TextField
        label="Telefone"
        variant="outlined"
        sx={{ mb: "16px" }}
        onChange={(e) => setTelefone(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        sx={{ mb: "16px" }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField

variant="outlined"
type="date"
sx={{ mb: "16px" }}
onChange={(e) => setDataNasc(e.target.value)}
/>
<FormControl variant="outlined" sx={{ mb: "16px" }}>
          <InputLabel id="select-label">Cargo</InputLabel>
          <Select
            labelId="select-label"
            value={selectedOption}
            onChange={handleOptionChange}
            label="Select"
            sx={{ minWidth: "120px" }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


    {/*  <Typography variant="h6" sx={{ mb: "16px" }}>
        Upload Image
      </Typography>
      <input
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
  }}
/>

      {imageUrl && (
        
      <Typography sx={{ mb: "2vh" }}>{imageUrl.name}</Typography>
      )}*/}

<Button
disabled={isButtonDisabled}
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
    height: "65vh",
    transform: 'translate(-50%, -50%)',
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.primary[400],
    padding: "25px",
    borderRadius: "8px",
    '@media (max-height: 800px)': {
      height: "75vh", // set a different height for screens smaller than 768px
    },
    '@media (max-width: 1200px)': {
      height: "85vh", // set a different height for screens smaller than 768px
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
      value={telefoneEdit}
      disabled = {isLabelDisabled}
        label="Telefone"
        variant="outlined"
        sx={{ mb: "16px" }}
        InputLabelProps={{
          shrink: telefoneEdit ? true : false
        }}
        onChange={(e) => setTelefoneEdit(e.target.value)}
      />
      <TextField
      value={emailEdit}
      disabled = {isLabelDisabled}
        label="Email"
        variant="outlined"
        sx={{ mb: "16px" }}
        InputLabelProps={{
          shrink: emailEdit ? true : false
        }}
        onChange={(e) => setEmailEdit(e.target.value)}
      />
       <TextField
value={dataNascEdit}
disabled = {isLabelDisabled}
variant="outlined"
type="date"
InputLabelProps={{
  shrink: dataNascEdit ? true : false
}}
sx={{ mb: "16px" }}
onChange={(e) => setDataNascEdit(e.target.value)}
/>

<FormControl variant="outlined" sx={{ mb: "16px" }}>
          <InputLabel  id="select-label">Cargo</InputLabel>
          <Select
            disabled = {isLabelDisabled}
            labelId="select-label"
            value={selectedOptionEdit}
            onChange={handleOptionChangeEdit}
            label="Select"
            sx={{ minWidth: "120px" }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
             <MenuItem key={0} value={0}>ativo</MenuItem>
              <MenuItem key={1} value={1}>desativo</MenuItem>
          </Select>
        </FormControl>

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



      {utilizadorInfo.nivel === "admin" && adminOptions? (
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
    ) : null}

    </Box>
  );
  
};

export default Header;