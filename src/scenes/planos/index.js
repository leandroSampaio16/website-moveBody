import { Typography, Box, useTheme, Button, Modal, TextField, Switch,  Select, MenuItem, FormControl, InputLabel,IconButton  } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Cookies from "js-cookie";
import HeaderPlans from "../../components/HeaderPlans";
import ReactLoading from "react-loading";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PlanosData from "../../data/PlanosData";
import PlanosExerciciosData from "../../data/PlanosExerciciosData";
import { ArrowBackIosNew as ArrowBackIosNewIcon, ArrowForwardIos as ArrowForwardIosIcon } from "@mui/icons-material";
import { CardMedia } from '@mui/material';
import ApiConnectionConfig from "../../data/ApiConnectionConfig";
import Autocomplete from '@mui/material/Autocomplete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Planos = ({ setErrorMessage }) => {

    const cookie = Cookies.get('utilizadorInfo')
    const cookieData = JSON.parse(cookie)
    const[{dataP,errorP,loadP},planosDataGet]=PlanosData()
    const [openModal, setOpenModal] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isButtonDisabled1, setIsButtonDisabled1] = useState(false);
    const[{dataEx,errorEx,loadEx},planosExDataGet]=PlanosExerciciosData()
    const [selectedRows, setselectedRows] = useState([]);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState("");
    const [selectedPlanOriginal, setSelectedPlanOriginal] = useState("");
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedId, setSelectedId] = useState("");


    const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
    const [exerciceIndex, setExerciceIndex] = useState(0);


    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        planosDataGet();
        planosExDataGet();
      }, [refresh]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);



  const handleOptionChangeEdit = (event, value) => {
    setSelectedPlan(value);
    
    const selectedRowIndex = dataEx.findIndex((row) => row.IdPlanoTreinoInfo === value);
    setSelectedRowIndex(selectedRowIndex);
  };


  const handleCloseModal = () => {
    if(!isButtonDisabled){
      setOpenModal(false)
      setIsButtonDisabled1(false)
    }
 
  };

  const handleCloseModalEdit = () => {
    if(!isButtonDisabled){
   
        setIsButtonDisabled1(false)
 
      
      setOpenModalEdit(false)
    }

  };

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
  
  const handleDelete = async () => {

    setIsButtonDisabled(true)

    const formData = new FormData();
    formData.append("id", selectedPlan);

    const jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }
    console.log(jsonData)
    try {
      const response = await ApiConnectionConfig.post("/ActivatePlanoSemanal", jsonData);
      setIsButtonDisabled(false)
      setRefresh(!refresh)
      setOpenModalEdit(false)
    } catch (error) {
      console.error(error);
    }

  }


  const handleAtualizar = async () => {

    setIsButtonDisabled(true)

    const formData = new FormData();
    formData.append("dia", selectedDay);
    formData.append("id", selectedPlan);
    formData.append("idplano", selectedId);

    const jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }
    console.log(jsonData)
    try {
      const response = await ApiConnectionConfig.post("/ChangePlanoDia", jsonData);
      setIsButtonDisabled(false)
      setRefresh(!refresh)
      setOpenModal(false)
    } catch (error) {
      console.error(error);
    }

  }

  const columns = [
    { field: "IdPlanoTreinoCliente", headerName: "ID" },
    {
      field: "nomeGrupoPlanos",
      headerName: "Nome Grupo Planos",
      flex: 1,
      renderCell: (params) => {
        const handleActivateRow = () => {
          setSelectedPlan(params.row.IdPlanoTreinoCliente)
          setOpenModalEdit(true)
          console.log("Activate row:", params.row);
        };
  
        const isRowActive = params.row.ativo === 1;
  
        return (
          <>
             <Typography sx={{ flex: '1 0 auto' }}>{params.value}</Typography>
          {isRowActive && (
            <IconButton sx={{ flex: '2', ml: 'auto', m:"15%" }} onClick={handleActivateRow}>
              <CheckCircleOutlineIcon />
            </IconButton>
          )}
         
        </>
        );
      },
    },
    {
        field: "SegundaInfo",
        headerName: "Segunda-feira",
        flex: 1,
        renderCell: ({ row: {SegundaInfo,IdPlanoInfoSegunda, IdPlanoTreinoCliente, ativo} }) => {
            const handleClick = () => {
                const value = IdPlanoInfoSegunda; // Get the value of the field in the row
                // Save the value and open the modal here
                setSelectedPlan(value)
                setSelectedPlanOriginal(value)
                setSelectedId(IdPlanoTreinoCliente)
                setSelectedDay("IdPlanoInfoSegunda")
                const selectedRowIndex = dataEx.findIndex(
                    (row) => row.IdPlanoTreinoInfo === value
                  );
                  setSelectedRowIndex(selectedRowIndex);
                  if(ativo==1){
                    setIsButtonDisabled1(true)
             
                  }
                setOpenModal(true)
           
                // Open the modal using your preferred method
              };
            let flag =false;
            if(SegundaInfo===null){
              flag = true;
            }
    
            return (
              <Button 
                onClick={handleClick}
                variant="contained"
                sx={{
                  width:"9vw",
                  backgroundColor: !flag ? colors.greenAccent[600] : colors.redAccent[600],
                  color: colors.grey[100],
                  borderRadius: "4px",
                }}
              >
                <Typography sx={{ ml: "5px" }}> {SegundaInfo ? SegundaInfo : "DIA LIVRE"}</Typography>
              </Button>
            );
          },
      },
    {
        field: "TerçaInfo",
        headerName: "Terça-feira",
        flex: 1,
        renderCell: ({ row: {TerçaInfo, IdPlanoInfoTerca, IdPlanoTreinoCliente, ativo} }) => {
            const handleClick = () => {
                const value = IdPlanoInfoTerca; // Get the value of the field in the row
                // Save the value and open the modal here
                setSelectedPlan(value)
                setSelectedPlanOriginal(value)
                setSelectedId(IdPlanoTreinoCliente)
                setSelectedDay("IdPlanoInfoTerca")
                const selectedRowIndex = dataEx.findIndex(
                    (row) => row.IdPlanoTreinoInfo === value
                  );
                  setSelectedRowIndex(selectedRowIndex);
                  if(ativo==1){
                    setIsButtonDisabled1(true)
             
                  }

                setOpenModal(true)
    
                // Open the modal using your preferred method
              };
            let flag =false;
            if(TerçaInfo===null){
              flag = true;
            }
    
            return (
              <Button 
                onClick={handleClick}
                variant="contained"
                sx={{
                  width:"9vw",
                  backgroundColor: !flag ? colors.greenAccent[600] : colors.redAccent[600],
                  color: colors.grey[100],
                  borderRadius: "4px",
                }}
              >
                <Typography sx={{ ml: "5px" }}> {TerçaInfo ? TerçaInfo : "DIA LIVRE"}</Typography>
              </Button>
            );
          },
      },
      {
        field: "QuartaInfo",
        headerName: "Quarta-feira",
        flex: 1,  
        renderCell: ({ row: {QuartaInfo, IdPlanoInfoQuarta, IdPlanoTreinoCliente, ativo} }) => {
            const handleClick = () => {
                const value = IdPlanoInfoQuarta; // Get the value of the field in the row
                // Save the value and open the modal here
                setSelectedPlan(value)
                setSelectedPlanOriginal(value)
                setSelectedId(IdPlanoTreinoCliente)
                setSelectedDay("IdPlanoInfoQuarta")
                const selectedRowIndex = dataEx.findIndex(
                    (row) => row.IdPlanoTreinoInfo === value
                  );
                  setSelectedRowIndex(selectedRowIndex);

                  if(ativo==1){
                    setIsButtonDisabled1(true)
             
                  }
                  if(ativo==1){
                    setIsButtonDisabled1(true)
             
                  }
                setOpenModal(true)
  
                // Open the modal using your preferred method
              };
            let flag =false;
            if(QuartaInfo===null){
              flag = true;
            }
       
            return (  
              <Button  
                onClick={handleClick}
                variant="contained"
                sx={{
                  width:"9vw",
                  backgroundColor: !flag ? colors.greenAccent[600] : colors.redAccent[600],
                  color: colors.grey[100],
                  borderRadius: "4px",
                }}
              >
                <Typography sx={{ ml: "5px" }}> {QuartaInfo ? QuartaInfo : "DIA LIVRE"}</Typography>
              </Button>
            );
          },
      },
      {
        field: "QuintaInfo",
        headerName: "Quinta-feira",
        flex: 1,
        renderCell: ({ row: {QuintaInfo, IdPlanoInfoQuinta, IdPlanoTreinoCliente, ativo} }) => {
            const handleClick = () => {
                const value = IdPlanoInfoQuinta; // Get the value of the field in the row
                // Save the value and open the modal here
                setSelectedPlan(value)
                setSelectedPlanOriginal(value)
                setSelectedId(IdPlanoTreinoCliente)
                setSelectedDay("IdPlanoInfoQuinta")
                const selectedRowIndex = dataEx.findIndex(
                    (row) => row.IdPlanoTreinoInfo === value
                  );
                  setSelectedRowIndex(selectedRowIndex);

                  if(ativo==1){
                    setIsButtonDisabled1(true)
             
                  }
                setOpenModal(true)
 
                // Open the modal using your preferred method
              };
            let flag =false;
            if(QuintaInfo===null){
              flag = true;
            }
    
            return (
              <Button  
                onClick={handleClick}
                variant="contained"
                sx={{
                  width:"9vw",
                  backgroundColor: !flag ? colors.greenAccent[600] : colors.redAccent[600],
                  color: colors.grey[100],
                  borderRadius: "4px",
                }}
              >
                <Typography sx={{ ml: "5px" }}> {QuintaInfo ? QuintaInfo : "DIA LIVRE"}</Typography>
              </Button>
            );
          },
      },      {
        field: "SextaInfo",
        headerName: "Sexta-feira",
        flex: 1,
        renderCell: ({ row: {SextaInfo, IdPlanoInfoSexta, IdPlanoTreinoCliente, ativo} }) => {
            const handleClick = () => {
                const value = IdPlanoInfoSexta; // Get the value of the field in the row
                // Save the value and open the modal here
                setSelectedPlan(value)
                setSelectedPlanOriginal(value)
                setSelectedId(IdPlanoTreinoCliente)
                setSelectedDay("IdPlanoInfoSexta")
                const selectedRowIndex = dataEx.findIndex(
                    (row) => row.IdPlanoTreinoInfo === value
                  );
                  setSelectedRowIndex(selectedRowIndex);

                  if(ativo==1){
                    setIsButtonDisabled1(true)
             
                  }
                setOpenModal(true)
 
                // Open the modal using your preferred method
              };
            let flag =false;
            if(SextaInfo===null){
              flag = true;
            }
    
            return (
              <Button 
                onClick={handleClick}
                variant="contained"
                sx={{
                  width:"9vw",
                  backgroundColor: !flag ? colors.greenAccent[600] : colors.redAccent[600],
                  color: colors.grey[100],
                  borderRadius: "4px",
                }}
              >
                <Typography sx={{ ml: "5px" }}> {SextaInfo ? SextaInfo : "DIA LIVRE"}</Typography>
              </Button>
            );
          },
      },
      {
        field: "SabadoInfo",
        headerName: "Sabado-feira",
        flex: 1,
            renderCell: ({ row: {SabadoInfo, IdPlanoInfoSabado, IdPlanoTreinoCliente, ativo} }) => {
            const handleClick = () => {
                const value = IdPlanoInfoSabado; // Get the value of the field in the row
                // Save the value and open the modal here
                setSelectedPlan(value)
                setSelectedPlanOriginal(value)
                setSelectedId(IdPlanoTreinoCliente)
                setSelectedDay("IdPlanoInfoSabado")
                setOpenModal(true)
                const selectedRowIndex = dataEx.findIndex(
                    (row) => row.IdPlanoTreinoInfo === value
                  );
                  setSelectedRowIndex(selectedRowIndex);
                  if(ativo==1){
                    setIsButtonDisabled1(true)
             
                  }
             
                // Open the modal using your preferred method
              };
            let flag =false;
            if(SabadoInfo===null){
              flag = true;
            }
    
            return (
              <Button  
                onClick={handleClick}
                variant="contained"
                sx={{
                  width:"9vw",
                  backgroundColor: !flag ? colors.greenAccent[600] : colors.redAccent[600],
                  color: colors.grey[100],
                  borderRadius: "4px",
                }}
              >
                <Typography sx={{ ml: "5px" }}> {SabadoInfo ? SabadoInfo : "DIA LIVRE"}</Typography>
              </Button>
            );
          },
      },
  ];


  if (loadP || loadEx) return(  
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10%', justifyContent:"center" }}>
        <ReactLoading type={"bars"}   color={colors.greenAccent[300]} />
    </Box>
  )
    if(errorP!=null || errorEx!=null){
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10%', justifyContent:"center" }}>
                      <Typography variant="body1" sx={{ fontFamily: 'system-ui', fontSize: 18, color: colors.greenAccent[300] }}>
              Algo deu errado
            </Typography>
        </Box>
        )
    } 


    const handleSelectRows = (newRowSelectionModel) => {


      const selectableRows = newRowSelectionModel.filter(
        (rowId) => dataP.find((row) => row.IdPlanoTreinoCliente === rowId)?.ativo !== 1
      );
      setselectedRows(selectableRows);



      }

      
  return (
    <Box m="20px">
      <HeaderPlans title="Planos" selectedRows={selectedRows} refresh={refresh} setRefresh={setRefresh} data={dataP} dataEx={dataEx} setErrorMessage={setErrorMessage} subtitle="Gestão dos planos FITARENA" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >

<Modal open={openModalEdit} onClose={handleCloseModalEdit}>
<Box sx={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          width : "45vh",
          height:  "30vh",
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


<center><Typography variant="h6">Desaja ativar este plano?</Typography></center>

<Button
disabled={isButtonDisabled}
  onClick={handleDelete}
  variant="contained"
  color="primary"
  fullWidth
  sx={{
    mt: "16px",
    backgroundColor: colors.blueAccent[500],
    height: "4vh",
  }}
>
  Ativar
</Button>
        </Box>
</Modal>

<Modal open={openModal} onClose={handleCloseModal}>
  <Box sx={{
    position: 'absolute',
    top: '45%',
    left: '50%',
    width : "25vw",
    height: selectedPlan === 0 ? "30vh" : "65vh",
    transform: 'translate(-50%, -50%)',
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.primary[400],
    padding: "25px",
    borderRadius: "8px",
  }}>
    
    <FormControl variant="outlined" sx={{ mb: "16px", my: "1vh" }}>

  {!loadEx && (

<Autocomplete
  disabled={isButtonDisabled || isButtonDisabled1}
  label="Procura por nome"
  noOptionsText="Nenhum resultado encontrado"
  options={[{ IdPlanoTreinoInfo: 0, NomePlanoTreino: 'Dia livre' }, ...dataEx.filter((row) => row.ativo !== 1)]}

  getOptionLabel={(option) => option.NomePlanoTreino}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Procura por nome"
      variant="outlined"
      fullWidth
      sx={{ minWidth: '120px' }}
    />
  )}
  value={dataEx.find((option) => option.IdPlanoTreinoInfo === selectedPlan) || null}
  onChange={(event, value) => {
    setSelectedPlan(value ? value.IdPlanoTreinoInfo : 0);
    const selectedRowIndex = dataEx.findIndex((row) => row.IdPlanoTreinoInfo === value?.IdPlanoTreinoInfo);
    setSelectedRowIndex(selectedRowIndex);
  }}
/>


  )}


</FormControl>
<br />

{selectedPlan !== 0 ? (
      <Box >
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
  {dataEx[selectedRowIndex]?.exercises[exerciceIndex]?.map((exercise) =>
    exercise.ativo === 1
      ? exercise.nome
      : `${exercise.nome} (exercicio inativo)`
  ).join(", ")}
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


<Button

 onClick={handleAtualizar}
  variant="contained"
  color="primary"
  fullWidth
  disabled={isButtonDisabled || selectedPlan === selectedPlanOriginal}
  sx={{
    mt: "16px",
    backgroundColor: colors.blueAccent[500],
    height: "4vh",
  }}
>
  Atualizar
</Button>

  </Box>
</Modal>

<DataGrid checkboxSelection
        onRowSelectionModelChange={(handleSelectRows)}
        getRowClassName={(params) =>
          params.row.ativo === 1 ? "gray-tone-row" : ""
        }
        getRowProps={(params) => ({
          disabled: params.row.ativo === 1,
          ...(params.row.ativo === 1 && { checkboxSelection: false })
        })}
      
  rows={dataP} columns={columns} getRowId={(row) => row.IdPlanoTreinoCliente} />



      </Box>
    </Box>
  );
};

export default Planos;