import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";
import TeamData from "../../data/TeamData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Cookies from "js-cookie";
import Header from "../../components/Header";
import ReactLoading from "react-loading";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const Team = ({ setErrorMessage }) => {

    const cookie = Cookies.get('utilizadorInfo')
    const cookieData = JSON.parse(cookie)
    const[{data,error,load},colaboradoresDataGet]=TeamData()
    const [selectedRows, setselectedRows] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        colaboradoresDataGet();
      }, [refresh]);



  const theme = useTheme();
  const colors = tokens(theme.palette.mode);




  const [showPassword, setShowPassword] = useState(false);

  const handleShowPasswordClick = () => {
    if (cookieData.nivel === "admin") {
      setShowPassword(!showPassword);
    } else {
      setErrorMessage("Não tem permissão para realizar essa ação")
    }
  };
  
  const PasswordCell = ({ value: password }) => {
    return (
      <Box display="flex" alignItems="center">
        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
          {showPassword ? password : "•••••••••••••••••"}
        </Typography>
      </Box>
    )
  };


  const columns = [
    { field: "idColaboradores", headerName: "ID", cellClassName: "name-column--cell",},
    {
      field: "nome",
      headerName: "Nome",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "password",
      headerName: "Senha",
      headerAlign: "left",

      align: "left",
      sortable: false,
      flex: 1,
      renderCell: (params) => <PasswordCell {...params} />,
      renderHeader: () => (
        <Box display="flex" alignItems="center">
          <Typography color={colors.grey[100]} variant="h7" sx={{ mr: "5px" }}>
            Senha
          </Typography>
          {showPassword ? (
            <VisibilityOffIcon sx={{ cursor: "pointer", mx: "1vh" }} onClick={handleShowPasswordClick} />
          ) : (
            <VisibilityIcon sx={{ cursor: "pointer", mx: "1vh" }} onClick={handleShowPasswordClick} />
          )}
        </Box>
      ),
    },
    {
      field: "telefone",
      headerName: "Telefone",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "DataNasc",
      headerName: "Data de Nascimento",
      flex: 1,
    },
    {
      field: "nivel",
      headerName: "Nível de Acesso",
      flex: 1,
      renderCell: ({ row: { nivel } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              nivel === "admin"
                ? colors.greenAccent[600]
                : nivel === "pt"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
            ml="0px"
          >
            {nivel === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {nivel === "pt" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {nivel}
            </Typography>
          </Box>
        );
      },
    },
  ];


  if (load) return(  
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10%', justifyContent:"center" }}>
        <ReactLoading type={"bars"}   color={colors.greenAccent[300]} />
    </Box>
  )
    if(error!=null){
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
        (rowId) => data.find((row) => row.idColaboradores === rowId)?.ativo !== 1
      );
      setselectedRows(selectableRows);
      console.log("Selected Rows: ", selectableRows);
      }

      
  return (
    <Box m="20px">
      <Header title="EQUIPA" adminOptions={true} selectedRows={selectedRows} data={data} setRefresh={setRefresh} refresh={refresh} setErrorMessage={setErrorMessage} subtitle="Gestão da equipa FITARENA" />
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
        <DataGrid checkboxSelection
        onRowSelectionModelChange={(handleSelectRows)}
        getRowClassName={(params) =>
          params.row.ativo === 1 ? "gray-tone-row" : ""
        }
        getRowProps={(params) => ({
          disabled: params.row.ativo === 1,
          ...(params.row.ativo === 1 && { checkboxSelection: false })
        })}
      
  rows={data} columns={columns} getRowId={(row) => row.idColaboradores} />
      </Box>
    </Box>
  );
};

export default Team;