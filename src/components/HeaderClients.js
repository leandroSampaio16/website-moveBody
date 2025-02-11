import { Typography, Box, useTheme, Button, Modal, TextField,  Select, MenuItem, FormControl, InputLabel, Switch  } from "@mui/material";
import { tokens } from "../theme";
import ApiConnectionConfig from "../data/ApiConnectionConfig";
import Cookies from "js-cookie"
import { useState, useEffect } from "react";
import PtData from "../data/PtData";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Autocomplete from '@mui/material/Autocomplete';
import CompareIcon from '@mui/icons-material/Compare';
import ChartComponent from "./ChartComponent";

const Header = ({ title, subtitle, selectedRows, setErrorMessage, dataClients, refresh, setRefresh, AvlDataGet, dataAvl }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [avlFm , setAvlFm] = useState(true);
  const [nome, setNome] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [email, setEmail] = useState("");
  const [redbutton, setRedbutton] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLabelDisabled, setIsLabelDisabled] = useState(true);
  const [nomeEdit, setNomeEdit] = useState("");
  const [senhaEdit, setSenhaEdit] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [selectedOptionEdit, setSelectedOptionEdit] = useState("");
  const [selectedOptionEdit1, setSelectedOptionEdit1] = useState("");
  const[{data,error,load},ptDataGet]=PtData()
  const [idClienteRow1 , setIdClienteRow1] = useState(0);
  const [selectedPart, setSelectedPart] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientOptions, setClientOptions] = useState([]);


  const options = [
    { label: "Peso", name: "Peso" },
    { label: "Altura", name: "Altura" },
    { label: "Quadril", name: "Quadril" },
    { label: "Coxa Direita", name: "CoxaDire" },
    { label: "Costas", name: "Costas" },
    { label: "Coxa Esquerda", name: "CoxaEsq" },
    { label: "Antebraço Esquerdo", name: "AntebracoEsq" },
    { label: "Braço Esquerdo", name: "BracoEsq" },
    { label: "Antebraço Direito", name: "AntebracoDire" },
    { label: "Cintura", name: "Cintura" },
    { label: "Braço Direito", name: "BracoDire" },
    { label: "Gêmeo Esquerdo", name: "GemeoEsq" },
    { label: "Gêmeo Direito", name: "GemeoDire" },
    { label: "Peito", name: "Peito" },
    { label: "Dorsal", name: "Dorsal" },
    { label: "Pescoço", name: "Pescoco" },

    { label: "%H2O", name: "H20" },
    { label: "Peso Massa Ossea", name: "PesoMassaOssea" },
    { label: "Bioimpedancia", name: "Bioimpedancia" },
    { label: "Gordura Viceral", name: "GorduraViceral" },
    { label: "PesoMassa Muscular", name: "PesoMassa Muscular" },
    { label: "Taxa Metabolica Basal", name: "TaxaMetabolicaBasal" },
    { label: "Idade Metabolica", name: "IdadeMetabolica" },

  ];

  const options1 = [
    { label: "Supino", name: "Supino" },
    { label: "Agachamento", name: "Agachamento" },
    { label: "Levantamento Terra", name: "Terra" },
  ];


  useEffect(() => {

    AvlDataGet(idClienteRow1)
console.log(dataAvl)
    }, [idClienteRow1]);

  useEffect(() => {

      setClientOptions(dataClients?.map((row) => row.NomeCliente));
   
    
  }, []);

  const handleCompareAvaliacoes = () => {
  setOpenCompare(true)
  };


  const handleSearchChange = (event, value) => {
    const filteredOptions = dataClients
      .filter((row) => row.NomeCliente.toLowerCase().includes(value.toLowerCase()))
      .map((row) => row.NomeCliente);

    setClientOptions(filteredOptions);
  };

  const handleClientSelect = (event, value) => {
    const selectedClientData = dataClients.find((row) => row.NomeCliente === value);

    if (selectedClientData) {
      const {
        NomeCliente,
        EmailCliente,
        Senha,
        idPtInfo,
        ativo,
        IdClienteInfo,
      } = selectedClientData;
  
      setNomeEdit(NomeCliente);
      setEmailEdit(EmailCliente)
      setSenhaEdit(Senha)
      setIdCliente(IdClienteInfo)
      setSelectedOptionEdit(idPtInfo)
      setSelectedOptionEdit1(ativo)
      setIsLabelDisabled(false)

    } else {
      // Reset the fields if no client is selected
      setNomeEdit('');

      setEmailEdit('');
      setIdCliente("")
      setSelectedOptionEdit('');
      setIsLabelDisabled(true);
      setSenhaEdit('');
      setSelectedOptionEdit1("")
    }
  };

  useEffect(() => {
    ptDataGet();
    }, []);
  
    const [selectedOption, setSelectedOption] = useState("");
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    }
  

    const utilizadorInfo = JSON.parse(Cookies.get('utilizadorInfo'));
  const handleDelete = async () => {
    selectedRows.forEach(async (element) => {
      setIsButtonDisabled(true)
      const response = await ApiConnectionConfig.delete("/ApagarClients?Id=" + element + "&responsavel=" + utilizadorInfo.nome + "&nivel=" + utilizadorInfo.nivel + "")
      setTimeout(() => {
        setRefresh(!refresh);
      }, 1000);
    })
  }

 
  const [openCompare, setOpenCompare] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);


  const handleOpenEdit = () => {

    setOpenEdit(true);

  }

  const handleCloseEdit = () => {
    if(!isButtonDisabled){
      setOpenEdit(false);
      setNomeEdit("")
      setSenhaEdit("")
      setEmailEdit("")
      setSelectedOptionEdit("")
      setIsLabelDisabled(true)
      setOpenEdit(false);
    }
  }
  const handleOptionChangeEdit = (event) => {
    setSelectedOptionEdit(event.target.value);
  }

  const handleOptionChangeEdit1 = (event) => {
    setSelectedOptionEdit1(event.target.value);
  }

  const handleOpenDelete = () => {
    if(selectedRows.length === 0) {
      setErrorMessage("Selecione um colaborador para apagar");
    } else {
      setOpenDelete(true);
    }
  };
  
  const handleCloseCompare = () => {
    setIdClienteRow1(0)
    setOpenCompare(false);
  
  };

  const handleCloseDelete = () => {
    if(!isButtonDisabled){
    setOpenDelete(false);
    }
  };


  const handleOpenAdd = () => {

    setOpenAdd(true);

  };

  const handleCloseAdd = () => {
    if(!isButtonDisabled){
    setOpenAdd(false);
    }
  };


  const handleEditar = async () => {
    if (nomeEdit && senhaEdit && emailEdit && selectedOptionEdit && !isLabelDisabled) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailEdit && !emailRegex.test(emailEdit)) {
        setErrorMessage("Digite um email válido");
        setRedbutton(true);
        return;
      }

      setIsButtonDisabled(true)
      setIsLabelDisabled(true)
      const formData = new FormData();
      formData.append("Nome", nomeEdit);
      formData.append("Senha", senhaEdit);
      formData.append("Email", emailEdit);
      formData.append("IdPtInfo", selectedOptionEdit);
      formData.append("IdClienteInfo", idCliente);
      formData.append("nivelResponsavel", utilizadorInfo.nivel);
      formData.append("responsavel", utilizadorInfo.nome);
      formData.append("ativo", selectedOptionEdit1);                            
      //formData.append("responsavel", utilizadorInfo.nome);
  
      const jsonData = {};
      for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
      }
  
      try {
        const response = await ApiConnectionConfig.post("/UpdateClientesApp", jsonData);
        console.log(jsonData)
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
  if (nome && dataNasc && email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setErrorMessage("Digite um email válido");
      setRedbutton(true);
      return;
    }

    if (dataClients.some(child => child.EmailCliente === email)) {
      setErrorMessage('Já existe um cliente com esse email');
      return;
    }


    setIsButtonDisabled(true)
    const formData = new FormData();
    formData.append("NomeCliente", nome);
    formData.append("EmailCliente", email);
    formData.append("DataNascCliente", dataNasc);
    formData.append("idPtInfo", selectedOption);
    formData.append("nivelResponsavel", utilizadorInfo.nivel);
    formData.append("responsavel", utilizadorInfo.nome);
    
    const jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }

    try {
      const response = await ApiConnectionConfig.post("/AddClients", jsonData);
      console.log(jsonData)
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

     

      <Modal open={openCompare} onClose={handleCloseCompare}>
  
        <Box sx={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          width : "35vw",
          height: "75vh",
          transform: 'translate(-50%, -50%)',
          display: "flex",
          flexDirection: "column",
          backgroundColor: colors.primary[400],
          padding: "25px",
          borderRadius: "8px",
        }}>


<Autocomplete 
  label="Procura por nome"
  noOptionsText="Nenhum resultado encontrado"
  options={dataClients}
  sx={{ marginTop:"2vh" }}
  getOptionLabel={(option) => option.NomeCliente}
  onChange={(event, value) => {
    if (value) {
      const selectedClientId = value.IdClienteInfo;
      setIdClienteRow1(selectedClientId)
      console.log(selectedClientId);
    }
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      fullWidth
      label="Procura por nome"
      variant="outlined"
    />
  )}
/>

<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "5%" }}>
        <Typography variant="body1">Medidas/Teste Físico</Typography>
        <Switch
          checked={avlFm}
          onChange={() => setAvlFm(!avlFm)}
          color="primary"
        />
        <Typography variant="body1" sx={{ color: colors.greenAccent[500] }}>{avlFm ? "Físico" : "Medidas"}</Typography>
      </Box>

      {idClienteRow1 !== 0 && (
        
  <Autocomplete
    label="Procura por nome"
    noOptionsText="Nenhum resultado encontrado"
    options={avlFm ? options1 : options}
    onChange={(event, value) => {
      if (value) {
        const selectedClientId = value.name;
        setSelectedPart(selectedClientId);
        console.log(selectedClientId);
      }
    }}
    getOptionLabel={(option) => option.label}
    renderInput={(params) => <TextField {...params} label="Procura por nome" />}
  />
  )}
{dataAvl && idClienteRow1 !== 0 &&(
  <center>
  <Box sx={{ width:"30vw", height:"45vh", marginTop:"3vh"}}>
  <ChartComponent data={dataAvl} avlFm={avlFm} selectedPart={selectedPart}/>
  </Box>
  </center>
)}




  </Box>
</Modal>


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
            <Typography variant="h5" sx={{color: colors.redAccent[600], marginTop: "3vh", mx: "2.5vh"}}>Ao apagar o cliente ficará inativo</Typography>
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
    height: "45vh",
    transform: 'translate(-50%, -50%)',
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.primary[400],
    padding: "25px",
    borderRadius: "8px",
    '@media (max-height: 800px)': {
      height: "50vh" // set a different height for screens smaller than 768px
    }
  }}>
    
      
      <TextField
        label="Nome"
        variant="outlined"
        sx={{ mb: "16px" }}
        onChange={(e) => setNome(e.target.value)}
      />
      <TextField

        variant="outlined"
        type="date"
        sx={{ mb: "16px" }}
        onChange={(e) => setDataNasc(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        sx={{ mb: "16px" }}
        onChange={(e) => setEmail(e.target.value)}
      />

{!load && (
  <FormControl variant="outlined" sx={{ mb: "16px" }}>
    <InputLabel id="select-label">PT</InputLabel>
    <Select 
      labelId="select-label"
      value={selectedOption}
      onChange={handleOptionChange}
      label="Select"
      sx={{ minWidth: "120px" }}
    >
      {data.map((option) => (
        <MenuItem key={option.idColaboradores} value={option.idColaboradores}>
          {option.nome}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)}


<Button
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
    height: "55vh",
    transform: 'translate(-50%, -50%)',
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.primary[400],
    padding: "25px",
    borderRadius: "8px",
    '@media (max-height: 800px)': {
      height: "65vh" // set a different height for screens smaller than 768px
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
       label="Senha"
        disabled = {isLabelDisabled}
        type="password"
        InputLabelProps={{
          shrink: senhaEdit ? true : false
        }}
        variant="outlined"
        value={senhaEdit}
        sx={{ mb: "16px" }}
        onChange={(e) => setSenhaEdit(e.target.value)}
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

{!load && (
  <FormControl variant="outlined" sx={{ mb: "16px" }}>
    <InputLabel id="select-label">PT</InputLabel>
    <Select 
    disabled = {isLabelDisabled}
      labelId="select-label"
      value={selectedOptionEdit}
      onChange={handleOptionChangeEdit}
      label="Select"
      sx={{ minWidth: "120px" }}
    >
      {data.map((option) => (
        <MenuItem key={option.idColaboradores} value={option.idColaboradores}>
          {option.nome}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)}
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



      {utilizadorInfo.nivel === "admin" ? (
        <Box display="flex" justifyContent="space-between">
  <Box>
    <br></br>
    <IconButton onClick={() => handleCompareAvaliacoes()} sx={{marginRight:"1vw"}}>
  <CompareIcon  sx={{ fontSize: 25}}/>
</IconButton>
    <IconButton onClick={() => handleOpenEdit()}>
      <EditIcon />
    </IconButton>
    <Button variant="contained" sx={{ width: "10vh", height: "4vh", mx: "4vh", background: colors.greenAccent[600] }} onClick={() => handleOpenAdd()}>
      Adicionar
    </Button>
  </Box>
  <Box>
    <br></br>
    <Button variant="contained" sx={{ width: "10vh", height: "4vh", mx: "4vh", background: colors.redAccent[500] }} onClick={() => handleOpenDelete()}>
      Apagar
    </Button>
  </Box>
</Box>
    ) : null}

    </Box>
  );
  
};

export default Header;