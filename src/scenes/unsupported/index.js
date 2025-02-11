import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";
import TeamData from "../../data/TeamData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Cookies from "js-cookie";
import ReactLoading from "react-loading";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const Unsupported = () => {


  return (
    <Box m="20px">
          <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'primary.main',
        color: 'common.white',
      }}
    >
      <Typography variant="h3" component="h1">
        Este site não está disponivel para dispositivos mobile
      </Typography>
    </Box>

    </Box>
  );
};

export default Unsupported;