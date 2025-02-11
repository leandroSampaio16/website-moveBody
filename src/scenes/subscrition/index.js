import { Box, Button, IconButton, Typography, useTheme, Card, CardContent, CardHeader, Grid, Divider } from "@mui/material";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import { keyframes } from "@emotion/react";

import ChatIcon from '@mui/icons-material/Chat';
import ClearIcon from '@mui/icons-material/Clear';

const Subscrition = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);




  return (
    <Box m="20px">
      <Box mx={30} my={16}>
        <Grid container spacing={5} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: '100%', borderRadius: '16px', background:colors.blueAccent[400], boxShadow: '0px 4px 30px rgba(255, 255, 255, 0.3)', }}>
           

      
        
              <CardContent>

              <center>

              <Box
      sx={{
        width: '90%',
        height: '50px',
        marginTop:"8%",
        marginBottom: '3%',
        background: colors.blueAccent[500],
        borderRadius: '25px',
        opacity:0.9,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <ChatIcon sx={{ marginRight: '8px' }} />
      <Typography variant="body1" component="span" color="textPrimary">
        Acompanhamento especializado
      </Typography>
    </Box>

    <Box
      sx={{
        width: '90%',
        height: '50px',
        marginBottom: '3%',
        background: colors.blueAccent[500],
        borderRadius: '25px',
        opacity:0.9,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <ChatIcon sx={{ marginRight: '8px' }} />
      <Typography variant="body1" component="span" color="textPrimary">
         Avaliação física 2/mês
      </Typography>
    </Box>


    <Box
      sx={{
        width: '90%',
        height: '50px',
        marginBottom: '3%',
        background: colors.blueAccent[500],
        borderRadius: '25px',
        opacity:0.9,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <ChatIcon sx={{ marginRight: '8px' }} />
      <Typography variant="body1" component="span" color="textPrimary">
        Acesso às aulas particulares
      </Typography>
    </Box>
    <Box
      sx={{
        width: '90%',
        height: '50px',
        marginBottom: '3%',
        background: colors.blueAccent[500],
        borderRadius: '25px',
        opacity:0.9,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <ChatIcon sx={{ marginRight: '8px' }} />
      <Typography variant="body1" component="span" color="textPrimary">
        Acesso às aulas de grupo
      </Typography>
    </Box>
    <Box
      sx={{
        width: '90%',
        height: '50px',
        marginBottom: '7%',
        background: colors.blueAccent[500],
        borderRadius: '25px',
        opacity:0.9,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <ChatIcon sx={{ marginRight: '8px' }} />
      <Typography variant="body1" component="span" color="textPrimary">
        Acompanhamento alimentar
      </Typography>
    </Box>



              <Box sx={{ width: '45%',height: 'auto', marginBottom:"3%" }}>
      <Box display="flex" alignItems="center">
        <Typography
          variant="h5"
        
          component="span"
          color="textPrimary"
          sx={{ textDecoration: 'line-through', marginRight: '8px', color:colors.grey[100] }}
        >
          De 39.99€
        </Typography>
        <Box sx={{marginLeft:"4%"}}>
          <Typography variant="h4" component="span" sx={{fontSize:"1.7em", fontWeight:"bold"}} color={colors.redAccent[500]}>
            €
          </Typography>
          <Typography variant="h1" component="span"  sx={{fontSize:"4em", fontWeight:"bold"}} color={colors.redAccent[500]}>
            35
          </Typography>
          <Typography variant="h4" component="span"  sx={{fontSize:"1.4em", fontWeight:"bold",  marginTop: '8px'}} color={colors.redAccent[500]}>
            /mês
          </Typography>
        </Box>
      </Box>
    </Box>

              <Divider sx={{width:"90%"}} />

              <Typography
          variant="h6"
        
      
          color="textPrimary"
          sx={{ marginTop: '8px', color:colors.grey[100] }}
        >
         Pagamento anual * Total 420
        </Typography>


              <Button
      variant="contained"
      color="primary"
      sx={{
        marginTop:"5%",
        width: '80%',
        height: '60px',
        border: `3px solid ${colors.primary[400]}`,
        borderRadius: '25px',
        backgroundColor: 'transparent',
        backdropFilter: 'blur(10px)',
        opacity:"0.6",
        color: '#fff',
        fontSize: '1.2em',
        transition: 'background-color 0.3s ease, border-color 0.3s ease, font-size 0.3s ease, opacity 0.3s ease, color 0.3s ease',
        '&:hover': {
          border: `3px solid ${colors.primary[900]}`,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          fontSize: '1.3em',
          opacity:"1",
          color: colors.greenAccent[300]
        },
      }}
    >
      Escolher
    </Button>

               </center>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>

     

          <Card sx={{ height: '100%', borderRadius: '16px', background:colors.blueAccent[600], boxShadow: '0px 4px 30px rgba(255, 255, 255, 0.3)',}}>
            
 
          <Box
        sx={{
          width: '100%',
          height: '70px',
          backgroundColor: colors.greenAccent[400],
          borderRadius: "35%",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          alignContent:"center",
          marginTop: '-25px',
        }}
      >
        <Typography
          variant="h5"
          style={{          
            color: '#ffffff',
            marginTop: '25px',
            fontWeight: 'bold',
          }}
        >
          Plano recomendado
        </Typography>
      </Box>


              <CardContent>

              <center>

              <Box
      sx={{
        width: '90%',
        height: '50px',
        marginTop:"8%",
        marginBottom: '3%',
        background: colors.blueAccent[500],
        borderRadius: '25px',
        opacity:0.9,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <ChatIcon sx={{ marginRight: '8px' }} />
      <Typography variant="body1" component="span" color="textPrimary">
        Acompanhamento especializado
      </Typography>
    </Box>

    <Box
      sx={{
        width: '90%',
        height: '50px',
        marginBottom: '3%',
        background: colors.blueAccent[500],
        borderRadius: '25px',
        opacity:0.9,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <ChatIcon sx={{ marginRight: '8px' }} />
      <Typography variant="body1" component="span" color="textPrimary">
         Avaliação física 1/mês
      </Typography>
    </Box>

    <Box
      sx={{
        width: '90%',
        height: '50px',
        marginBottom: '3%',
        background: colors.blueAccent[500],
        borderRadius: '25px',
        opacity:0.9,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <ChatIcon sx={{ marginRight: '8px' }} />
      <Typography variant="body1" component="span" color="textPrimary">
        Acesso às aulas de grupo
      </Typography>
    </Box>

    <Box
      sx={{
        width: '90%',
        height: '50px',
        marginBottom: '3%',
        background: colors.primary[400],
        borderRadius: '25px',
        opacity:0.6,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <ClearIcon sx={{ marginRight: '8px' }} />
      <Typography variant="body1" component="span" color="textPrimary">
        Acesso às aulas particulares
      </Typography>
    </Box>


    <Box
      sx={{
        width: '90%',
        height: '50px',
        marginBottom: '7%',
        background: colors.primary[400],
        borderRadius: '25px',
        opacity:0.6,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <ClearIcon sx={{ marginRight: '8px' }} />
      <Typography variant="body1" component="span" color="textPrimary">
        Acompanhamento alimentar
      </Typography>
    </Box>

              <Box sx={{ width: '45%',height: 'auto', marginBottom:"3%" }}>
      <Box display="flex" alignItems="center">
        <Typography
          variant="h5"
        
          component="span"
          color="textPrimary"
          sx={{ textDecoration: 'line-through', marginRight: '8px', color:colors.grey[100] }}
        >
          De 24.99€
        </Typography>
        <Box sx={{marginLeft:"4%"}}>
          <Typography variant="h4" component="span" sx={{fontSize:"1.7em", fontWeight:"bold"}} color={colors.redAccent[500]}>
            €
          </Typography>
          <Typography variant="h1" component="span"  sx={{fontSize:"4em", fontWeight:"bold"}} color={colors.redAccent[500]}>
            20
          </Typography>
          <Typography variant="h4" component="span"  sx={{fontSize:"1.4em", fontWeight:"bold",  marginTop: '8px'}} color={colors.redAccent[500]}>
            /mês
          </Typography>
        </Box>
      </Box>
    </Box>

              <Divider sx={{width:"95%"}} />

              <Typography
          variant="h6"
        
      
          color="textPrimary"
          sx={{ marginTop: '8px', color:colors.grey[100] }}
        >
         Pagamento anual * Total 240€
        </Typography>


              <Button
      variant="contained"
      color="primary"
      sx={{
        marginTop:"5%",
        width: '80%',
        height: '60px',
        border: `3px solid ${colors.primary[400]}`,
        borderRadius: '25px',
        backgroundColor: 'transparent',
        backdropFilter: 'blur(10px)',
        opacity:"0.6",
        color: '#fff',
        fontSize: '1.2em',
        transition: 'background-color 0.3s ease, border-color 0.3s ease, font-size 0.3s ease, opacity 0.3s ease, color 0.3s ease',
        '&:hover': {
          border: `3px solid ${colors.primary[900]}`,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          fontSize: '1.3em',
          opacity:"1",
          color: colors.greenAccent[300]
        },
      }}
    >
      Escolher
    </Button>

               </center>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%', borderRadius: '16px', background:colors.blueAccent[700], boxShadow: '0px 4px 30px rgba(255, 255, 255, 0.3)', }}>

              <CardContent>

              <center>

              <Box
      sx={{
        width: '90%',
        height: '50px',
        marginTop:"8%",
        marginBottom: '3%',
        background: colors.blueAccent[600],
        borderRadius: '25px',
        opacity:0.9,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <ChatIcon sx={{ marginRight: '8px' }} />
      <Typography variant="body1" component="span" color="textPrimary">
        Acompanhamento especializado
      </Typography>
    </Box>

    <Box
      sx={{
        width: '90%',
        height: '50px',
        marginBottom: '3%',
        background: colors.blueAccent[600],
        borderRadius: '25px',
        opacity:0.9,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <ChatIcon sx={{ marginRight: '8px' }} />
      <Typography variant="body1" component="span" color="textPrimary">
         Avaliação física inicial
      </Typography>
    </Box>


    <Box
      sx={{
        width: '90%',
        height: '50px',
        marginBottom: '3%',
        background: colors.primary[400],
        borderRadius: '25px',
        opacity:0.6,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <ClearIcon sx={{ marginRight: '8px' }} />
      <Typography variant="body1" component="span" color="textPrimary">
        Acesso às aulas particulares
      </Typography>
    </Box>
    <Box
      sx={{
        width: '90%',
        height: '50px',
        marginBottom: '3%',
        background: colors.primary[400],
        borderRadius: '25px',
        opacity:0.6,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <ClearIcon sx={{ marginRight: '8px' }} />
      <Typography variant="body1" component="span" color="textPrimary">
      Acesso às aulas de grupo
      </Typography>
    </Box>
    <Box
      sx={{
        width: '90%',
        height: '50px',
        marginBottom: '7%',
        background: colors.primary[400],
        borderRadius: '25px',
        opacity:0.6,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <ClearIcon sx={{ marginRight: '8px' }} />
      <Typography variant="body1" component="span" color="textPrimary">
        Acompanhamento alimentar
      </Typography>
    </Box>

              <Box sx={{ width: '45%',height: 'auto', marginBottom:"3%" }}>
      <Box display="flex" alignItems="center">
        <Typography
          variant="h5"
        
          component="span"
          color="textPrimary"
          sx={{ textDecoration: 'line-through', marginRight: '8px', color:colors.grey[100] }}
        >
          De 17.99€
        </Typography>
        <Box sx={{marginLeft:"4%"}}>
          <Typography variant="h4" component="span" sx={{fontSize:"1.7em", fontWeight:"bold"}} color={colors.redAccent[500]}>
            €
          </Typography>
          <Typography variant="h1" component="span"  sx={{fontSize:"4em", fontWeight:"bold"}} color={colors.redAccent[500]}>
            15
          </Typography>
          <Typography variant="h4" component="span"  sx={{fontSize:"1.4em", fontWeight:"bold",  marginTop: '8px'}} color={colors.redAccent[500]}>
            /mês
          </Typography>
        </Box>
      </Box>
    </Box>

              <Divider sx={{width:"95%"}} />

              <Typography
          variant="h6"
        
      
          color="textPrimary"
          sx={{ marginTop: '8px', color:colors.grey[100] }}
        >
         Pagamento anual * Total 180€
        </Typography>


              <Button
      variant="contained"
      color="primary"
      sx={{
        marginTop:"5%",
        width: '80%',
        height: '60px',
        border: `3px solid ${colors.primary[400]}`,
        borderRadius: '25px',
        backgroundColor: 'transparent',
        backdropFilter: 'blur(10px)',
        opacity:"0.6",
        color: '#fff',
        fontSize: '1.2em',
        transition: 'background-color 0.3s ease, border-color 0.3s ease, font-size 0.3s ease, opacity 0.3s ease, color 0.3s ease',
        '&:hover': {
          border: `3px solid ${colors.primary[900]}`,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          fontSize: '1.3em',
          opacity:"1",
          color: colors.greenAccent[300]
        },
      }}
    >
      Escolher
    </Button>

               </center>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
  
};

export default Subscrition;