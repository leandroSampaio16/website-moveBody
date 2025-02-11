import { Box, useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
        Dúvidas
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
        Perguntas frequentes
        </Typography>
      </Box>
      </Box>
 
      <Accordion defaultExpanded>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography color={colors.greenAccent[500]} variant="h5">
      Informações pessoais
    </Typography>
  </AccordionSummary>

  <Accordion defaultExpanded={false}>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography color={colors.greenAccent[500]} variant="h5">
    Como posso atualizar as minhas informações pessoais?
    </Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography>
     Na área perfil é possível alterar todas as informações pessoais.
    </Typography>
  </AccordionDetails>
  </Accordion>



  
</Accordion>
<Accordion defaultExpanded>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography color={colors.greenAccent[500]} variant="h5">
      Recuperação de conta
    </Typography>
  </AccordionSummary>

  <Accordion defaultExpanded={false}>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography color={colors.greenAccent[500]} variant="h5">
    Esqueci a minha senha, como posso redefini-la?
    </Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography>
      No login existe a opção "Esqueci-me da senha" onde através dela é possivel redefeni-la.
    </Typography>
  </AccordionDetails>
  </Accordion>


  <Accordion defaultExpanded={false}>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography color={colors.greenAccent[500]} variant="h5">
    O que devo fazer se a minha conta foi comprometida?
    </Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography>
      Fale com um administrador para ele poder resolver o problema.
    </Typography>
  </AccordionDetails>
  </Accordion>



</Accordion>
<Accordion defaultExpanded>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography color={colors.greenAccent[500]} variant="h5">
      Funcionalidades da aplicação
    </Typography>
  </AccordionSummary>


  <Accordion defaultExpanded={false}>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography color={colors.greenAccent[500]} variant="h5">
    Como posso adicionar um evento?
    </Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography>
      No calendário é possível gerir os eventos.
    </Typography>
  </AccordionDetails>
  </Accordion>


  <Accordion defaultExpanded={false}>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography color={colors.greenAccent[500]} variant="h5">
    Como filtrar e pesquisar dados nas tabelas?
    </Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography>
      Em cada coluna das tabelas existe uma opção "Menu", com algumas opções de filtragem.
    </Typography>
  </AccordionDetails>
  </Accordion>


</Accordion>

<Accordion defaultExpanded>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography color={colors.greenAccent[500]} variant="h5">
      Política de privacidade
    </Typography>
  </AccordionSummary>


  <Accordion defaultExpanded={false}>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography color={colors.greenAccent[500]} variant="h5">
    O que acontece com os meus dados pessoais quando os forneço?
    </Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography>
      Os seus dados são guardados na base de dados do FITARENA e apenas podem ser vistos pelos administradores.
    </Typography>
  </AccordionDetails>
  </Accordion>


  <Accordion defaultExpanded={false}>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography color={colors.greenAccent[500]} variant="h5">
    Como posso solicitar a exclusão dos meus dados da plataforma?
    </Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography>
      Fale com um administrador ou envie um email.
    </Typography>
  </AccordionDetails>
  </Accordion>



</Accordion>

    </Box>
  );
};

export default FAQ;