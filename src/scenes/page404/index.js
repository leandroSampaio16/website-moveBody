import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const handleGoBack = () => {
    // Use navigate to navigate to the home page ("/")
    navigate("/");
  }

  return (
    
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90%",
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            marginBottom:"10vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: colors.primary[400],
            padding: "32px",
            borderRadius: "16px",
          }}
        >
          <Typography variant="h3" sx={{ mb: "3vh" }}>
            404 - Page Not Found
          </Typography>
          <Typography variant="body1" sx={{ mb: "3vh", textAlign: "center" }}>
            A página que procura não existe ou não está mais diponivel.
          </Typography>
          <Button
            onClick={handleGoBack}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: "16px", background: colors.blueAccent[500] }}
          >
            Voltar
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
