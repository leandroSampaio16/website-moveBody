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
import ExerciciosData from "../../data/ExerciciosData";
import { ArrowBackIosNew as ArrowBackIosNewIcon, ArrowForwardIos as ArrowForwardIosIcon } from "@mui/icons-material";
import { CardMedia } from '@mui/material';
import ApiConnectionConfig from "../../data/ApiConnectionConfig";
import SearchIcon from '@mui/icons-material/Search';
import HeaderExercices from "../../components/HeaderExercices";

const Exercices = ({ setErrorMessage }) => {

    const cookie = Cookies.get('utilizadorInfo')
    const cookieData = JSON.parse(cookie)
    const[{dataExercicios,error,load},exerciciosDataGet]=ExerciciosData()
    const [openModal, setOpenModal] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [selectedRows, setselectedRows] = useState([]);
    const [source, setSource] = useState("");
    const [selectedPlan, setSelectedPlan] = useState("");
    const [selectedPlanOriginal, setSelectedPlanOriginal] = useState("");
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedId, setSelectedId] = useState("");


    const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
    const [exerciceIndex, setExerciceIndex] = useState(0);


    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
      exerciciosDataGet();
      }, [refresh]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  


  const handleCloseModal = () => {
    if(!isButtonDisabled){
      setOpenModal(false)
    }
  };

  
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

      setRefresh(!refresh)
      setOpenModal(false)
    } catch (error) {
      console.error(error);
    }

  }

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "nome",
      headerName: "Nome Grupo Planos",
      flex: 1,
      cellClassName: "name-column--cell",
    }, 
    {
        field: "source",
        headerName: "Video",
        flex: 1,
        renderCell: ({ row: { source} }) => {
          const handleClickAvl = () => {
  
  setSource(source)
  setOpenModal(true)
          };
          return (
            <IconButton 
            onClick={handleClickAvl}
            variant="contained"
            sx={{
              width:"5vw",
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
              borderRadius: "20px",
            }}
          >
            <SearchIcon />
          </IconButton>
  
          );
        }
      },
    {
        field: "rest",
        headerName: "Descanso",
        flex: 1,
       
      }

  ];


  if (load) return(  
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10%', justifyContent:"center" }}>
        <ReactLoading type={"bars"}   color={colors.greenAccent[300]} />
    </Box>
  )
    if(error!=null && error !== "sem data"){
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
        (rowId) => dataExercicios.find((row) => row.id === rowId)?.ativo !== 1
      );
      setselectedRows(selectableRows);


      }

      
  return (
    <Box m="20px">
      <HeaderExercices title="Exercícios" refresh={refresh} setRefresh={setRefresh} selectedRows={selectedRows} data={dataExercicios} setErrorMessage={setErrorMessage} subtitle="Gestão dos exercícios FITARENA" />
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


<Modal open={openModal} onClose={handleCloseModal}>
  <Box sx={{
    position: 'absolute',
    top: '45%',
    left: '50%',
    maxHeight:"50vh", 
    maxWidth:"30vw",
    transform: 'translate(-50%, -50%)',
    display: "flex",
    alignContent:"center",
    alignItems:"center",
    justifyContent:"center",
    flexDirection: "column",
    backgroundColor: colors.primary[400],
    padding: "25px",
    borderRadius: "8px",
  }}>

   <CardMedia sx={{width:"80%", borderRadius:5, maxHeight:"40vw", minHeight:"40vh"}}
  component="img"
  src={source}
  alt="Exercise Image"
/>


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
      
  rows={dataExercicios} columns={columns} getRowId={(row) => row.id} />


      </Box>
    </Box>
  );
};

export default Exercices;