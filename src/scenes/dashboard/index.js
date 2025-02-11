import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import StatBox from "../../components/StatBox";
import StatisticsData from "../../data/StatisticsData";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import AtividadeData from "../../data/AtividadeData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const[{atividade,errorAtividade,loadAtividade},atividadeDataGet]=AtividadeData()

  useEffect(() => {
    atividadeDataGet();
    }, []);


const[{data,error,load},EstatisticasDataGet]=StatisticsData()

useEffect(() => {
    EstatisticasDataGet();
  }, []);


  if (load || loadAtividade) return(  
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10%', justifyContent:"center" }}>
        <ReactLoading type={"bars"}   color={colors.greenAccent[300]} />
    </Box>
  )
    if(error!=null || errorAtividade!=null){
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10%', justifyContent:"center" }}>
                      <Typography variant="body1" sx={{ fontFamily: 'system-ui', fontSize: 18, color: colors.greenAccent[300] }}>
              Algo deu errado
            </Typography>
        </Box>
        )
    } 

  return (
    <Box m="20px">
  


  <Box mb="30px" display="flex" justifyContent="space-between">
      <Box>
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
         PAINEL INICIAL
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
        Bem-vindo à área administrativa do FITARENA
        </Typography>
      </Box>
      </Box>
    


     
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data.emails} 
            subtitle="Emails enviados"
            flag={false}
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data.clientes}
            subtitle="Clientes"
            flag={false}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data.pts}
            subtitle="Personal Trainers"
            progress={data.percentagePts} 
            increase={(data.percentagePts*100).toFixed(2)+"%"} 
            flag={true}
            icon={
              <GroupIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data.admins}
            subtitle="Administradores"
            progress={data.percentageAdmins}
            flag={true}
            increase={(data.percentageAdmins*100).toFixed(2)+"%"} 
            icon={
              <SupervisorAccountIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        
        
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Transações recentes
            </Typography>
          </Box>
          {!loadAtividade && atividade && atividade?.map((transaction, i) => (
            <Box
  key={`${transaction.id}-${i}`}
  display="flex"
  justifyContent="space-between"
  alignItems="center"
  borderBottom={`4px solid ${colors.primary[500]}`}
  p="15px"
>
  <Box flex="1">
    <Typography
      color={colors.greenAccent[500]}
      variant="h5"
      fontWeight="600"
    >
      {transaction.tipo}
    </Typography>
    <Typography color={colors.grey[100]}>
      {transaction.responsavel}
    </Typography>
  </Box>
  <Box flex="1" color={colors.grey[100]}>
    {transaction.data}
  </Box>
  <Box
    width={"10vh"}
    display="flex"
    justifyContent="center"
    p="5px 10px"
    borderRadius="4px"
    backgroundColor={
      transaction.nivel === "admin"
        ? colors.greenAccent[600]
        : transaction.nivel === "pt"
        ? colors.greenAccent[700]
        : colors.greenAccent[700]
    }
  >
    {transaction.nivel === "admin" && (
      <AdminPanelSettingsOutlinedIcon
        sx={{ color: colors.grey[100], fontSize: "24px" }}
      />
    )}
    {transaction.nivel === "pt" && (
      <LockOpenOutlinedIcon
        sx={{ color: colors.grey[100], fontSize: "24px" }}
      />
    )}
    <Typography color={colors.grey[100]}>{transaction.nivel}</Typography>
  </Box>
</Box>

))}


        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;