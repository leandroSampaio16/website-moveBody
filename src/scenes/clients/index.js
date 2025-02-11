import { Typography, Box, useTheme, Button, Modal, TextField, Switch,  Select, MenuItem, FormControl, InputLabel,IconButton  } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Cookies from "js-cookie";
import HeaderClients from "../../components/HeaderClients"
import ReactLoading from "react-loading";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ClientsData from "../../data/ClientsData";
import { ArrowBackIosNew as ArrowBackIosNewIcon, ArrowForwardIos as ArrowForwardIosIcon } from "@mui/icons-material";
import ApiConnectionConfig from "../../data/ApiConnectionConfig";
import SearchIcon from '@mui/icons-material/Search';
import AvlData from "../../data/AvlData";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import * as PDFJS from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import DeleteIcon from '@mui/icons-material/Delete'
import Autocomplete from '@mui/material/Autocomplete';
import PlanosExerciciosData from "../../data/PlanosExerciciosData";
import { CardMedia } from '@mui/material';
import PlanosData from "../../data/PlanosData";
import { Formik } from "formik";
import * as yup from "yup";

const Clients = ({ setErrorMessage }) => {


  const options = [
    { label: "Peso", name: "peso" },
    { label: "Altura", name: "altura" },
    { label: "Quadril", name: "quadril" },
    { label: "Coxa Direita", name: "coxaDire" },
    { label: "Costas", name: "costas" },
    { label: "Coxa Esquerda", name: "coxaEsq" },
    { label: "Antebraço Esquerdo", name: "antebracoEsq" },
    { label: "Braço Esquerdo", name: "bracoEsq" },
    { label: "Antebraço Direito", name: "antebracoDire" },
    { label: "Cintura", name: "cintura" },
    { label: "Braço Direito", name: "bracoDire" },
    { label: "Gêmeo Esquerdo", name: "gemeoEsq" },
    { label: "Gêmeo Direito", name: "gemeoDire" },
    { label: "Data da Avaliação", name: "dataAvaliacao" },
    { label: "Peito", name: "peito" },
    { label: "Dorsal", name: "dorsal" },
    { label: "Pescoço", name: "pescoco" },


    { label: "%H2O", name: "H20" },
    { label: "Peso Massa Ossea", name: "PesoMassaOssea" },
    { label: "Bioimpedancia", name: "Bioimpedancia" },
    { label: "Gordura Viceral", name: "GorduraViceral" },
    { label: "Peso Massa Muscular", name: "PesoMassaMuscular" },
    { label: "Taxa Metabolica Basal", name: "TaxaMetabolicaBasal" },
    { label: "Idade Metabolica", name: "IdadeMetabolica" },
  ];

  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedName, setSelectedName] = useState("");
    const handleAutocompleteChange = (event, value) => {
      if (value) {
        console.log(value)
        setSelectedLabel(value.label)
        setSelectedName(value.name)
      }
    };
  

    const cookie = Cookies.get('utilizadorInfo')
    const cookieData = JSON.parse(cookie)
    const[{data,error,load},clientsDataGet]=ClientsData()
    const [selectedRows, setselectedRows] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openModalAvl, setOpenModalAvl] = useState(false);
    const [selectedOptionEdit, setSelectedOptionEdit] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isButtonDisabled1, setIsButtonDisabled1] = useState(false);
    const [clienteIdPlano, setClienteIdPlano] = useState("");
    const [clienteEmailPlano, setClienteEmailPlano] = useState("");
    const [idClienteRow , setIdClienteRow] = useState(0);
    const [dateAvlM , setDateAvlM] = useState("");
    const [dateAvlF , setDateAvlF] = useState("");
    const [avlFm , setAvlFm] = useState(true);
    const [pdf , setPdf] = useState(true);
    const [showAll , setShowAll] = useState(true);
    const [file, setFile] = useState("");
    const[{dataEx,errorEx,loadEx},planosExDataGet]=PlanosExerciciosData()
    const[{dataAvl,errorAvl,loadAvl},AvlDataGet]=AvlData(idClienteRow)
    const[{dataP,errorP,loadP},planosDataGet]=PlanosData()

    const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

    const [refresh, setRefresh] = useState(false);


    const handleFileChange = async (event) => {

      const fileCreated = event.target.files[0];
  
      setFile(fileCreated)
  
      // Create a new FormData object
     
    };
    



    const [dataEXEditar, setDataEXEditar] = useState([]);
    const processedValues = new Set();
 const handleOptionChangeEdit1 = (event, value) => {
        setSelectedPlan(value ? value.IdPlanoTreinoInfo : '');
        setSelectedRowIndex(dataEx.findIndex((row) => row.IdPlanoTreinoInfo === value?.IdPlanoTreinoInfo));
      
        const modifiedExercises = value?.exercises.map((element, index) => {
          if (!processedValues.has(value.exercises[index])) {
            processedValues.add(value.exercises[index]);
            return element[0];
          } else {
            return element;
          }
        });
      
        console.log(modifiedExercises[0]);
      
        setDataEXEditar(modifiedExercises || []);
      };
      
 

    const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
    const [selectedPlan, setSelectedPlan] = useState(0);
   
    
    useEffect(() => {
      AvlDataGet(idClienteRow)
      planosExDataGet()
      planosDataGet()
      }, [idClienteRow, refresh]);



      useEffect(() => {
if(idClienteRow!==0 && loadAvl!==null){
    if(loadAvl===false){

      const today = new Date(); // Get the current date
    
      // Function to convert string in "dd-mm-yy" format to Date object
      const getDateFromString = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return new Date(`${year}-${month}-${day}`);
      };
      let closestMedidasDate = null;
      let closestMedidasDiff = Infinity;
      if(errorAvl!=="sem data medidas" && errorAvl!=="sem data forca e medidas"){
      // Find the closest date in medidas array
    
      dataAvl.medidas.forEach((medida) => {
        const medidaDate = getDateFromString(medida.DataAvaliacao);
        const diff = Math.abs(today - medidaDate);
        if (diff < closestMedidasDiff) {
          closestMedidasDate = medida.DataAvaliacao;
          closestMedidasDiff = diff;
        }
      });
      setDateAvlM(closestMedidasDate);

      }
      else{
        setDateAvlM("");

      }
      let closestTesteForcaDate = null;
      let closestTesteForcaDiff = Infinity;
      if(errorAvl!=="sem data forca" && errorAvl!=="sem data forca e medidas"){
      // Find the closest date in testeForca array
    
      dataAvl.testeForca.forEach((teste) => {
        const testeDate = getDateFromString(teste.DataAvaliacaoForca);
        console.log(testeDate)
        const diff = Math.abs(today - testeDate);
        if (diff < closestTesteForcaDiff) {
          closestTesteForcaDate = teste.DataAvaliacaoForca;
          closestTesteForcaDiff = diff;
        }
      });
    
      setDateAvlF(closestTesteForcaDate);
  
    }
    else{
      setDateAvlF("");

    } 

   
  }

  }
}, [idClienteRow, load]);

      const [selectedDay, setSelectedDay] = useState(0);
      const [workoutName, setWorkoutName] = useState("");

      const handlePrevClick = () => {
        setSelectedDay((prev) => (prev === 0 ? 6 : prev - 1));
        const selectedRow = data.find((row) => row.IdPlanoTreinoCliente === selectedOptionEdit);
        const a = daysOfWeek[selectedDay === 0 ? 6 : selectedDay - 1] + "Info";
        const workoutName = selectedRow && selectedRow[a] ? selectedRow[a] : "Dia de descanso";

        setWorkoutName(workoutName)
    

        const selectedRow1 = dataEx.find((row) => row.NomePlanoTreino === workoutName);
        const exerciseArray = [];
        if(selectedRow1){
          selectedRow1.exercises
          .forEach(element => {
            console.log("pppppppppppp")
            console.log(element)
            exerciseArray.push(element);
          });
        }
        setDataEXEditar(exerciseArray)
        console.log(exerciseArray);
      };
      
    
      const handleNextClick = () => {
        setSelectedDay((prev) => (prev === 6 ? 0 : prev + 1));
        const selectedRow = data.find((row) => row.IdPlanoTreinoCliente === selectedOptionEdit);
        const a = daysOfWeek[selectedDay === 6 ? 0 : selectedDay + 1] + "Info";
        const workoutName = selectedRow && selectedRow[a] ? selectedRow[a] : "Dia de descanso";

        setWorkoutName(workoutName)
      

        const selectedRow1 = dataEx.find((row) => row.NomePlanoTreino === workoutName);
        const exerciseArray = [];
        if(selectedRow1){
          selectedRow1.exercises
          .forEach(element => {
            console.log("pppppppppppp")
            console.log(element)
            exerciseArray.push(element);
          });
        }
        setDataEXEditar(exerciseArray)
        console.log(exerciseArray);
      };

      const [exerciceIndex, setExerciceIndex] = useState(0);

      const handlePrevClick1 = () => {

        if (exerciceIndex > 0) {
          if(dataEXEditar[exerciceIndex - 1]!=null){
            setExerciceIndex(exerciceIndex - 1);
          }
      
        } else {

          if(dataEXEditar[dataEXEditar.length-1] !=null){
            setExerciceIndex(dataEXEditar.length-1);
          }
        


        }
      };
      
    
      const handleNextClick1 = () => {

        if (exerciceIndex < dataEXEditar?.length - 1) {
          if(dataEXEditar[exerciceIndex + 1]!=null){
            setExerciceIndex(exerciceIndex + 1);
          }
        } else {

          if(dataEXEditar[0]!=null){
            setExerciceIndex(0);
          }
       
        }
      };
      


      const handlePrevClickAvl = () => {
        console.log(dateAvlF)
        let nextAvl = null;
        if (avlFm) {
          if(errorAvl!=="sem data forca" && errorAvl!=="sem data forca e medidas"){
          const currentIndex = dataAvl.testeForca.findIndex(medida => medida.DataAvaliacao === dateAvlF);
          if (currentIndex > 0) {
          
            // Get the next avaliacao
            nextAvl = dataAvl.testeForca[currentIndex - 1].DataAvaliacao;
          }
          else{
            console.log(dataAvl.testeForca)
            nextAvl = dataAvl.testeForca[dataAvl.testeForca.length -1].DataAvaliacao;
          }
          setDateAvlF(nextAvl)
   
        }
      }
       else {
        
          if(errorAvl!=="sem data medidas" && errorAvl!=="sem data forca e medidas"){
          const currentIndex = dataAvl.medidas.findIndex(medida => medida.DataAvaliacao === dateAvlM);
          if (currentIndex > 0) {
            console.log(dataAvl.testeForca)
            nextAvl = dataAvl.medidas[currentIndex - 1].DataAvaliacao;
          }
          else{
            console.log(dataAvl.testeForca)
            nextAvl = dataAvl.medidas[dataAvl.medidas.length-1].DataAvaliacao;
          }
          setDateAvlM(nextAvl)
        }
      }
      
      };
      
      const handleNextClickAvl = () => {
        let nextAvl = null;
        if (avlFm) {
            if(errorAvl!=="sem data forca" && errorAvl!=="sem data forca e medidas"){
          const currentIndex = dataAvl.testeForca.findIndex(medida => medida.DataAvaliacao === dateAvlF);
          if (currentIndex < dataAvl.testeForca.length - 1) {
            console.log(currentIndex)
        
            // Get the next avaliacao
            nextAvl = dataAvl.testeForca[currentIndex + 1].DataAvaliacao;
            console.log(dataAvl.testeForca)
            console.log(nextAvl)
            console.log(currentIndex + 1)
          }
          else{
            console.log("entrou")
            console.log(errorAvl)
            console.log(dataAvl.testeForca)
            nextAvl = dataAvl.testeForca[0].DataAvaliacao;
          }
          setDateAvlF(nextAvl)
        }
        } else {
   
           if(errorAvl!=="sem data medidas" && errorAvl!=="sem data forca e medidas"){
          const currentIndex = dataAvl.medidas.findIndex(medida => medida.DataAvaliacao === dateAvlM);
          if (currentIndex < dataAvl.medidas.length - 1 ) {

            nextAvl = dataAvl.medidas[currentIndex + 1].DataAvaliacao;
          }
          else{
            console.log("entrou")
            nextAvl = dataAvl.medidas[0].DataAvaliacao;
          }
          setDateAvlM(nextAvl)
        }
      }
    
        // Do something with the next avaliacao (nextAvl)
        // ...
      };
      
      
  
    const handleCloseModal = () => {
      if(!isButtonDisabled){
        setIsButtonDisabled1(false)
        setSelectedOptionEdit("")
        setDataEXEditar([])
        setOpenModal(false)
        
      }
    };

    const handleCloseModalAvl = () => {
      if(!isButtonDisabled){
        setIsButtonDisabled1(false)
        setOpenModalAvl(false)
        setSelectedLabel("")
        setSelectedName("")
        setFile("")
      }
    };

    useEffect(() => {
      clientsDataGet();
      }, [refresh]);

    
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleOptionChangeEdit = (event) => {
    setSelectedOptionEdit(event.target.value);
    const selectedRow = data.find((row) => row.IdPlanoTreinoCliente === selectedOptionEdit);
    const a = daysOfWeek[selectedDay === 6 ? 0 : selectedDay + 1] + "Info";
    const workoutName = selectedRow && selectedRow[a] ? selectedRow[a] : "Dia de descanso";

    setWorkoutName(workoutName)
  }


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
  

  const generatePDF = async (object) => {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    page.setFont(font);
    page.setFontSize(12);
  
    // Draw header
    page.drawRectangle({
      x: 50,
      y: 700,
      width: 500,
      height: 60,
      color: rgb(0.9, 0.9, 0.9),
    });
    page.drawText('FITARENA', {
      x: 60,
      y: 730,
      size: 18,
      font,
      color: rgb(0, 0, 0),
    });
  
    // Define label styles
    const labelOptions = {
      x: 60,
      font,
      size: 12,
      color: rgb(0.3, 0.3, 0.7), // Adjusted to RGB values between 0 and 1
      underline: true,
      labelSpacing: 100, // Adjust the horizontal spacing between labels
    };
  
    // Define value styles
    const valueOptions = {
      x: labelOptions.x + labelOptions.labelSpacing, // Adjust the x-coordinate position for values
      font,
      size: 12,
      color: rgb(0, 0, 0),
    };
  
    // Draw table
    let y = 600;
    
  // Add a variable to keep track of the number of rows on the current page
  let rowsOnPage = 0;
  const maxRowsPerPage = 12;
    
  Object.entries(object).forEach(([key, value], index) => {
      
  // Check if the maximum number of rows per page has been reached
  if (rowsOnPage === maxRowsPerPage) {
        // Add a new page and reset the y-coordinate and rowsOnPage counter
        page = pdfDoc.addPage();
        y = 1050;
        rowsOnPage = 0;
  }
  
  page.drawRectangle({
          x: 50,
          y: y - index * 20,
          width: 500,
          height:20,
          color:index %2 ===0 ? rgb(0.95,0.95,0.95):rgb(1,1,1),
  });
  
  // Draw label (using the column name as the label)
  page.drawText(`${key}:`,{
  ...labelOptions,
  y:y-index*20+5,
  });
  
  // Draw value
  page.drawText(`${value}`,{
  ...valueOptions,
  y:y-index*20+5,
  });
  
  y-=20;
  rowsOnPage++;
  });
  
  const pdfBytes=await pdfDoc.save();
  return pdfBytes;
  };
  
  


  const handleExerciseDelete = async () => {

    if (avlFm) {
      if(!dateAvlF){
        alert("Sem nenhuma avaliação")
      } 
      else{
        setIsButtonDisabled(true)
      const currentIndex = dataAvl.testeForca.findIndex(teste => teste.DataAvaliacao === dateAvlF);
      const { DataAvaliacaoForca, IdClienteInfo, IdPtInfo, ...pdfData } = dataAvl.testeForca[currentIndex];
      console.log(pdfData.IdTesteForcaCliente)
      console.log(pdfData)



      try {
  
        const response = await ApiConnectionConfig.delete("/ApagarAvaliacoes?Id=" + pdfData.IdTesteForcaCliente + "&responsavel=" + cookieData.nome + "&nivel=" + cookieData.nivel + "&tipo=" + avlFm + "");

        window.location.reload()
      } catch (error) {
        window.location.reload()
        console.error(error);
      }
    }

    } else {
      if(!dateAvlM){
        alert("Sem nenhuma avaliação")
      }
      else{
        setIsButtonDisabled(true)
      const currentIndex = dataAvl.medidas.findIndex(medida => medida.DataAvaliacao === dateAvlM);
      const { IdClienteInfo, IdPtInfo, ...pdfData } = dataAvl.medidas[currentIndex];
      console.log(pdfData.IdMedidasCliente)
      console.log(pdfData)

      
   

      try {
        const response = await ApiConnectionConfig.delete("/ApagarAvaliacoes?Id=" + pdfData.IdMedidasCliente + "&responsavel=" + cookieData.nome + "&nivel=" + cookieData.nivel + "&tipo=" + avlFm + "");

        window.location.reload()
      } catch (error) {
        window.location.reload()
        console.error(error);
      }
    }
    }
   
  }

  const handleCriarPDF = async () => {

    if (avlFm) {
      const currentIndex = dataAvl.testeForca.findIndex(teste => teste.DataAvaliacao === dateAvlF);
      const { IdTesteForcaCliente, DataAvaliacaoForca, IdClienteInfo, IdPtInfo, ...pdfData } = dataAvl.testeForca[currentIndex];
      const pdfBytes = await generatePDF(pdfData);  
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      saveAs(blob, 'AvaliaçõesPdf.pdf');
    } else {
      const currentIndex = dataAvl.medidas.findIndex(medida => medida.DataAvaliacao === dateAvlM);
      const { IdMedidasCliente, IdClienteInfo, IdPtInfo, ...pdfData } = dataAvl.medidas[currentIndex];
      const pdfBytes = await generatePDF(pdfData);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      saveAs(blob, 'AvaliaçõesPdf.pdf');
    }
    

  }


  const handleAtualizar = async () => {

      setIsButtonDisabled(true)

      const formData = new FormData();
      formData.append("plano", selectedOptionEdit);
      formData.append("nivelResponsavel", cookieData.nivel);
      formData.append("responsavel", cookieData.nome);
      formData.append("IdClienteInfo", clienteIdPlano);
      formData.append("Email", clienteEmailPlano);
      
      const jsonData = {};
      for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
      }

      try {
        const response = await ApiConnectionConfig.post("/UpdateClientes", jsonData);

       setRefresh(!refresh)
       setOpenModal(false)
      } catch (error) {
        console.error(error);
      }
  
    }
    
    
   
    const handleExtrairDataPdf = async () => {
      if (file !== '') {

        console.log("--------")
        console.log(avlFm)
        console.log("--------")
        const formData = new FormData();
        formData.append("pdfFile", file);
        formData.append("id", idClienteRow);
        formData.append("tipo", avlFm);
        formData.append("responsavel", cookieData.nome);
        formData.append("nivelResponsavel", cookieData.nivel);

        try {
          const response = await ApiConnectionConfig.post("/PdfData", formData);

          window.location.reload()
        } catch (error) {
          console.error(error);
          setErrorMessage("O pdf que inseriu contem valores inválidos")
          setOpenModalAvl(false)
        }
        
      }
    };



  const columns = [
    { field: "IdClienteInfo", headerName: "ID" },
    {
      field: "NomeCliente",
      headerName: "Nome",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
    field: "CodigoCliente",
    headerName: "Codigo Cliente",
    flex: 1,
    cellClassName: "name-column--cell",
  },
{
    field: "Senha",
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
    )
  },
    
    {
      field: "nome",
      headerName: "Pt Responsável",
      flex: 1,
    },
    {
      field: "EmailCliente",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "DataNascCliente",
      headerName: "Data de Nascimento",
      flex: 1,
    },
    {
      headerName: "Avaliações",
      flex: 1,
      renderCell: ({ row: { IdClienteInfo, ativo} }) => {
        const handleClickAvl = () => {
          setOpenModalAvl(true)
          setIdClienteRow(IdClienteInfo)
  
          if(ativo==1){
            setIsButtonDisabled1(true)
          }
          AvlDataGet(IdClienteInfo);


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
      field: "nomeGrupoPlanos",
      headerName: "Plano Semanal",
      flex: 1,
      renderCell: ({ row: { nomeGrupoPlanos, IdPlanoTreinoCliente,  IdClienteInfo, EmailCliente, ativo} }) => {
        const handleClick = () => {
          const selectedRow = data.find((row) => row.IdPlanoTreinoCliente === IdPlanoTreinoCliente);
          const a = daysOfWeek[selectedDay === 0 ? 6 : selectedDay - 1] + "Info";
          const workoutName = selectedRow && selectedRow[a] ? selectedRow[a] : "Dia de descanso";
  
          setWorkoutName(workoutName)
          setSelectedOptionEdit(IdPlanoTreinoCliente)
          setClienteEmailPlano(EmailCliente)
          setClienteIdPlano(IdClienteInfo)

          if(ativo == 1){
            setIsButtonDisabled1(true)
          }

          const selectedRow1 = dataEx.find((row) => row.NomePlanoTreino === workoutName);
          const exerciseArray = [];
          if(selectedRow1){
            selectedRow1.exercises
            .forEach(element => {
             console.log("pppppppppppp")
             console.log(element)
             if(element!=null){
               exerciseArray.push(element);
             }
          
            });
        

          }
          setExerciceIndex(0)
          console.log("aquiii")
          console.log(exerciceIndex)
          
          setDataEXEditar(exerciseArray)
          setOpenModal(true);
    
          // You can replace the console.log statement with any other functionality you want to perform on button click
        };
        let flag =false;
        if(IdPlanoTreinoCliente===null || IdPlanoTreinoCliente===0){
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
            <Typography sx={{ ml: "5px" }}> {IdPlanoTreinoCliente ? nomeGrupoPlanos : "Sem Plano"}</Typography>
          </Button>
        );
      },
    }
    
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
        (rowId) => data.find((row) => row.IdClienteInfo === rowId)?.ativo !== 1
      );
      setselectedRows(selectableRows);

      }

      
  return (
    <Box m="20px">
      <HeaderClients title="CLIENTES" AvlDataGet={AvlDataGet} selectedRows={selectedRows} refresh={refresh} setRefresh={setRefresh} dataClients={data} dataAvl={dataAvl} setErrorMessage={setErrorMessage} subtitle="Gestão dos clientes FITARENA" />
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
    width : "25vw",
    height: dataEXEditar.length !== 0 ? "75vh" : "35vh",
    transform: 'translate(-50%, -50%)',
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.primary[400],
    padding: "25px",
    borderRadius: "8px",
    '@media (max-height: 800px)': {
      height: dataEXEditar.length !== 0 ? "85vh" : "45vh",
    }
  }}>
    
    <FormControl variant="outlined" sx={{ mb: "16px", my:"1vh" }}>

        {!load && !loadEx && !loadP && (
         <Autocomplete
         label="Procura por nome"
         noOptionsText="Nenhum resultado encontrado"
         disabled={isButtonDisabled || isButtonDisabled1}
         options={dataP.filter(
          (row, index, self) =>
            self.findIndex(
              (r) => r.IdPlanoTreinoCliente === row.IdPlanoTreinoCliente && r.ativo !== 1
            ) === index && row.IdPlanoTreinoCliente !== null
        )}
           getOptionLabel={(option) => option.nomeGrupoPlanos || "SEM PLANO"}
         renderInput={(params) => (
           <TextField
             {...params}
             label="Procura por nome"
             
             variant="outlined"
             sx={{ minWidth: '120px' }}
           />
         )}
         value={dataP.find((row) => row.IdPlanoTreinoCliente === selectedOptionEdit) || null}
         onChange={(event, value) => {
           setSelectedOptionEdit(value ? value.IdPlanoTreinoCliente : '');
           const selectedRow = dataP.find((row) => row.IdPlanoTreinoCliente === value?.IdPlanoTreinoCliente);
           const a = daysOfWeek[selectedDay === 6 ? 0 : selectedDay + 1] + 'Info';
           const workoutName = selectedRow && selectedRow[a] ? selectedRow[a] : 'Dia de descanso';
           setWorkoutName(workoutName);

           const selectedRow1 = dataEx.find((row) => row.NomePlanoTreino === workoutName);
           const exerciseArray = [];
           if(selectedRow1){
             selectedRow1.exercises
             .forEach(element => {
              console.log("pppppppppppp")
              console.log(element)
              if(element!=null){
                exerciseArray.push(element);
              }
           
             });
         

           }
           setExerciceIndex(0)
           console.log("aquiii")
           console.log(exerciceIndex)
           
           setDataEXEditar(exerciseArray)
           
           console.log(exerciseArray);
           console.log("aquiii")
         }}
       />
        )}
      </FormControl>

      <br />
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
          {daysOfWeek[selectedDay]}
        </Typography>
        <IconButton aria-label="next day" onClick={handleNextClick}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <Typography variant="h3" sx={{ my: "3vh", textAlign: "center", color:colors.blueAccent[400] }}>
  {workoutName}
</Typography>



{dataEXEditar.length !== 0 && dataEXEditar[exerciceIndex][0] != null && (
  <Box>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton aria-label="previous day" onClick={handlePrevClick1}>
        <ArrowBackIosNewIcon />
      </IconButton>

      <Typography variant="h3" sx={{ mx: "16px" }}>
        {dataEXEditar[exerciceIndex][0]?.nome}
      </Typography>

      <IconButton aria-label="next day" onClick={handleNextClick1}>
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
      <Typography
        variant="h6"
        sx={{ marginRight: "26px", mx: "2px", color: colors.greenAccent[500] }}
      >
        {dataEXEditar[exerciceIndex][0]?.reps}
      </Typography>

      <Typography variant="h6" sx={{ color: "gray", marginLeft: "10px" }}>
        Descanso:
      </Typography>
      <Typography variant="h6" sx={{ mx: "2px", color: colors.greenAccent[500] }}>
        {dataEXEditar[exerciceIndex][0]?.rest}
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
      <CardMedia
        sx={{ width: "80%", borderRadius: 5, maxHeight: "30vh", minHeight: "30vh" }}
        component="img"
        src={dataEXEditar[exerciceIndex][0]?.source}
        alt="Exercise Image"
      />
    </Box>
  </Box>
)}




<Button

      onClick={handleAtualizar}
  variant="contained"
  color="primary"
  fullWidth
  disabled={isButtonDisabled || isButtonDisabled1}
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



<Modal open={openModalAvl} onClose={handleCloseModalAvl}>
  {loadAvl ? (
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10%', justifyContent: "center" }}>
      <ReactLoading type={"bars"} color={colors.greenAccent[300]} />
    </Box>
  ) : (
    <Box
      sx={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        width: pdf ? "25vw" : "40vw",
        height: pdf ? "50vh" : "80vh",
        transform: 'translate(-50%, -50%)',
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.primary[400],
        padding: "25px",
        borderRadius: "8px",
        '@media (max-height: 800px)': {
          height: pdf ? "55vh" : "90vh",
          top: '50%',
        }
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h3">Formulário/PDF</Typography>
        <Switch
          checked={pdf}
          onChange={() => setPdf(!pdf)}
          color="primary"
        />
        <Typography variant="h3" sx={{ color: colors.greenAccent[500] }}>{pdf ? "PDF" : "Formulário"}</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "5%" }}>
        <Typography variant="body1">Medidas/Teste Físico</Typography>
        <Switch
          checked={avlFm}
          onChange={() => setAvlFm(!avlFm)}
          color="primary"
        />
        <Typography variant="body1" sx={{ color: colors.greenAccent[500] }}>{avlFm ? "Físico" : "Medidas"}</Typography>
        <IconButton edge="end" sx={{ color: colors.redAccent[500] }} disabled={isButtonDisabled} onClick={() => handleExerciseDelete()}>
          <DeleteIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          my: "2vh",
        }}
      >
        <IconButton aria-label="previous day" onClick={handlePrevClickAvl}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h3" sx={{ mx: "16px" }}>
          {avlFm ? (dateAvlF || "sem avaliacoes deste tipo") : (dateAvlM || "sem avaliacoes deste tipo")}
        </Typography>
        <IconButton aria-label="next day" onClick={handleNextClickAvl}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      {pdf ? (
        <Box>
          <Box flex="1">
            <Typography variant="h6" sx={{ mb: "16px" }}>
              Inserir PDF
            </Typography>
            <input
              disabled={isButtonDisabled1}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              style={{
                marginBottom: "15px",
                backgroundColor: colors.primary[300],
                color: colors.text,
                border: `1px solid ${colors.primary[500]}`,
                borderRadius: "10px",
                padding: "8px",
                fontSize: "16px",
                cursor: "pointer",
                width: "100%",
              }}
            />
          </Box>

          <Button
            onClick={handleCriarPDF}
            variant="contained"
            color="primary"
            fullWidth
            disabled={avlFm ? (dateAvlF ? false : true) : (!avlFm && dateAvlM ? false : true)}
            sx={{
              mt: "16px",
              backgroundColor: colors.blueAccent[500],
              height: "4vh",
            }}
          >
            Descarregar Pdf
          </Button>

          <Button
            onClick={handleExtrairDataPdf}
            variant="contained"
            color="primary"
            fullWidth
            disabled={file === "" || isButtonDisabled1}
            sx={{
              mt: "16px",
              backgroundColor: colors.blueAccent[500],
              height: "4vh",
            }}
          >
            Criar Avaliação {avlFm ? "Física" : "de medidas"}
          </Button>
        </Box>
      ) : (
        <Box>
          {avlFm ? (
            <Formik
              validationSchema={checkoutSchema}
              initialValues={{
                supino: "",
                agachamento: "",
                terra: "",
                dataAvaliacao: ""
              }}
              onSubmit={async (values) => {
                setIsButtonDisabled1(true)
                setIsButtonDisabled(true)
                console.log("entrouu")
                try {
                  const formData = new FormData();
                  formData.append("supino", values.supino);
                  formData.append("agachamento", values.agachamento);
                  formData.append("terra", values.terra);
                  formData.append("dataAvaliacao", values.dataAvaliacao);
                  formData.append("responsavel", cookieData.nome);
                  formData.append("id", idClienteRow);
                  formData.append("pt", cookieData.idColaboradores);
                  formData.append("nivelResponsavel", cookieData.nivel);
                
                  const jsonData = {};
                  for (const [key, value] of formData.entries()) {
                    jsonData[key] = value;
                  }
                
                  console.log(jsonData);
                
                await ApiConnectionConfig.post("/AddFisico", jsonData);
              
                  window.location.reload()
                } catch (error) {
                  setIsButtonDisabled1("")
                  setIsButtonDisabled("")
                  setOpenModalAvl(false)
                  setErrorMessage("Já existe uma avaliação nessa data")
                  // Handle any errors that may occur during the request
                  console.error('Error uploading data:', error);
                }
              }}
              
            >
              {(formikProps) => (
                <form onSubmit={formikProps.handleSubmit}>
                  <Box
                    sx={{
          
                      display: "flex",
                      flexDirection: "row",
                      flex: 1,
              
                    }}
                  >
                    <Box sx={{ flexDirection: "column", flex: 1 }}>
                      <Typography sx={{ m: "5px", mx: "10px" }}>Supino/kg</Typography>
                      <TextField
                        sx={{ flex: 1}}
                        name="supino"
                        fullWidth
                        type="number"
                        label="Supino"
                        value={formikProps.values.supino}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        error={formikProps.touched.supino && formikProps.errors.supino}
                        helperText={formikProps.touched.supino && formikProps.errors.supino}
                      />
                    </Box></Box>
                    <Box
                    sx={{
                      my:"2vh",
                      display: "flex",
                      flexDirection: "row",
                      flex: 1,
         
                    }}
                  >
                    <Box sx={{ flexDirection: "column", flex: 1 }}>
                      <Typography sx={{ m: "5px", mx: "10px" }}>Levantamento Tera/kg</Typography>
                      <TextField
                        sx={{ flex: 1}}
                        name="terra"
                        fullWidth
                        type="number"
                        label="Supino"
                        value={formikProps.values.terra}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        error={formikProps.touched.terra && formikProps.errors.terra}
                        helperText={formikProps.touched.terra && formikProps.errors.terra}
                      />
                    </Box>
                    
                  </Box>
                    <Box
                    sx={{
                      marginTop:"2vh",
                      display: "flex",
                      flexDirection: "row",
                      flex: 1,
             
                    }}
                  >
                    <Box sx={{ flexDirection: "column", flex: 1 }}>
                      <Typography sx={{ m: "5px", mx: "10px" }}>Agachamento/kg</Typography>
                      <TextField
                        sx={{ flex: 1}}
                        fullWidth
                        type="number"
                        name="agachamento"
                        label="Agachamento"
                        value={formikProps.values.agachamento}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        error={formikProps.touched.agachamento && formikProps.errors.agachamento}
                        helperText={formikProps.touched.agachamento && formikProps.errors.agachamento}
                      />
                    </Box></Box>
                    <Box
                    sx={{
                      my:"2vh",
                      display: "flex",
                      flexDirection: "row",
                      flex: 1,
         
                    }}
                  >
                    <Box sx={{ flexDirection: "column", flex: 1 }}>
                      <Typography sx={{ m: "5px", mx: "10px" }}>Data da avaliação</Typography>
                      <TextField
                        sx={{ flex: 1 }}
                        type="date"
                        fullWidth
                        variant="outlined"
                        name="dataAvaliacao"
                        value={formikProps.values.dataAvaliacao}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        error={formikProps.touched.dataAvaliacao && formikProps.errors.dataAvaliacao}
                        helperText={formikProps.touched.dataAvaliacao && formikProps.errors.dataAvaliacao}
                      />
                    </Box>
                  </Box>

                  <Button
                    onClick={handleCriarPDF}
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={avlFm ? (dateAvlF ? false : true) : (!avlFm && dateAvlM ? false : true)}
                    sx={{
                      mt: "16px",
                      backgroundColor: colors.blueAccent[500],
                      height: "4vh",
                    }}
                  >
                    Descarregar Pdf
                  </Button>

                  <Button
                    disabled={isButtonDisabled1}
                    type="submit"
               
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: "16px", backgroundColor: colors.blueAccent[500], height: "4vh" }}
                  >
                    Criar Avaliação Física
                  </Button>
                </form>
              )}
            </Formik>
          ) : (
            <Formik
              validationSchema={checkoutSchema1}
              initialValues={{
                peso: "",
                altura: "",
                quadril: "",
                coxaDire: "",
                costas: "",
                coxaEsq: "",
                antebracoEsq: "",
                bracoEsq: "",
                antebracoDire: "",
                cintura: "",
                bracoDire: "",
                gemeoEsq: "",
                gemeoDire: "",
                dataAvaliacao: "",
                peito: "",
                dorsal: "",
                pescoco: ""
              }}
              onSubmit={async (values) => {
                setIsButtonDisabled1(true)
                setIsButtonDisabled(true)
                console.log("entrouu")
                try {
                  const formData = new FormData();
                  formData.append("peso", values.peso);
                  formData.append("altura", values.altura);
                  formData.append("quadril", values.quadril);
                  formData.append("coxaDire", values.coxaDire);
                  formData.append("costas", values.costas);
                  formData.append("coxaEsq", values.coxaEsq);
                  formData.append("antebracoEsq", values.antebracoEsq);
                  formData.append("bracoEsq", values.bracoEsq);
                  formData.append("antebracoDire", values.antebracoDire);
                  formData.append("cintura", values.cintura);
                  formData.append("bracoDire", values.bracoDire);
                  formData.append("gemeoEsq", values.gemeoEsq);
                  formData.append("gemeoDire", values.gemeoDire);
                  formData.append("dataAvaliacao", values.dataAvaliacao);
                  formData.append("peito", values.peito);
                  formData.append("dorsal", values.dorsal);
                  formData.append("pescoco", values.pescoco);
                  formData.append("responsavel", cookieData.nome);
                  formData.append("id", idClienteRow);
                  formData.append("pt", cookieData.idColaboradores);
                  formData.append("nivelResponsavel", cookieData.nivel);

                  formData.append("H20", values.H20);
                  formData.append("PesoMassaOssea", values.PesoMassaOssea);
                  formData.append("Bioimpedancia", values.Bioimpedancia);
                  formData.append("GorduraViceral", values.GorduraViceral);
                  formData.append("PesoMassaMuscular", values.PesoMassaMuscular);
                  formData.append("TaxaMetabolicaBasal", values.TaxaMetabolicaBasal);
                  formData.append("IdadeMetabolica", values.IdadeMetabolica);


                
                  const jsonData = {};
                  for (const [key, value] of formData.entries()) {
                    jsonData[key] = value;
                  }
                
                  console.log(jsonData);
                
                  await ApiConnectionConfig.post("/AddMedidas", jsonData);
                  window.location.reload()
                } catch (error) {
                  setIsButtonDisabled1(false)
                setIsButtonDisabled(false)
                  setOpenModalAvl(false)
                  setErrorMessage("Já existe uma avaliação nessa data")
                  // Handle any errors that may occur during the request
                  console.error('Error uploading data:', error);
                }
              }}
            >
              {(formikProps) => (
                <form onSubmit={formikProps.handleSubmit}>
                  <Box
                   
                  >

<Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", mx:"1vw" }}>
  <Typography variant="h6">Todos/Em falta</Typography>
  <Switch
    checked={showAll}
    onChange={() => { setShowAll(!showAll) }}
    color="primary"
  />
  <Typography variant="h6" sx={{ color: colors.greenAccent[500] }}>{showAll ? "Todos" : "Em falta"}</Typography>
</Box>




      <Autocomplete 
       label="Procura por nome"
       noOptionsText="Nenhum resultado encontrado"
       options={showAll ? options : options.filter((option) => !formikProps.values[option.name])}
        
        sx={{ marginTop:"2vh" }}
        getOptionLabel={(option) => option.label}
        onChange={(event, value) => {
        
            handleAutocompleteChange(event, value);
            if(value!=null){
              console.log("nao nulo")
              if (options.filter(option => !formikProps.values[option.name]).some(option => option.name === value.name)) {
                console.log(value.name)
                formikProps.setFieldValue(value.name, "");
              }
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

     
     
       {selectedName && (
<Box>
              <Typography sx={{ m: "5px", mx: "10px", marginTop:"5vh" }}>


              {
  selectedName === "dataAvaliacao"
    ? selectedLabel
    : (selectedName === "peso" ||
       selectedName === "PesoMassaOssea" ||
       selectedName === "PesoMassaMuscular")
      ? selectedLabel +"/kg"
      : selectedName === "IdadeMetabolica"
        ? selectedLabel + "/anos"
        : (selectedName === "TaxaMetabolicaBasal" ||
           selectedName === "Bioimpedancia" ||
           selectedName === "GorduraViceral" ||
           selectedName === "Escoliose" ||
           selectedName === "STR")
          ? selectedLabel
          : selectedLabel + "/cm"
}

              </Typography>
              <TextField
              type={selectedName=="dataAvaliacao" ? "date" : "number"}
                sx={{marginBottom:"5vh" }}
                name={selectedName}
                fullWidth
                label={selectedName=="dataAvaliacao" ? "" : selectedLabel }
                value={formikProps.values[selectedName]}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                error={formikProps.touched[selectedName] && formikProps.errors[selectedName]}
                helperText={formikProps.touched[selectedName] && formikProps.errors[selectedName]}
              />
              
              </Box>
              )}
       
    
  
               
                      
                     
                      
          
                  </Box>

                  <Button
                    onClick={handleCriarPDF}
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={avlFm ? (dateAvlF ? false : true) : (!avlFm && dateAvlM ? false : true)}
                    sx={{
                      mt: "16px",
                      backgroundColor: colors.blueAccent[500],
                      height: "4vh",
                    }}
                  >
                    Descarregar Pdf
                  </Button>

                  <Button
                  disabled={isButtonDisabled1}
                    type="submit"
                    variant="contained"
         
                    color="primary"
                    fullWidth
                    sx={{ mt: "16px", backgroundColor: colors.blueAccent[500], height: "4vh" }}
                  >
                    Criar Avaliação de Medidas
                  </Button>
                </form>
              )}
            </Formik>
          )}
        </Box>
      )}
    </Box>
  )}
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
      
  rows={data} columns={columns} getRowId={(row) => row.IdClienteInfo} />

    
      </Box>
    </Box>
  );
  
};

const checkoutSchema1 = yup.object().shape({



    peso: yup.string().required("Campo obrigatório"),
    altura: yup.string().required("Campo obrigatório"),
    quadril: yup.string().required("Campo obrigatório"),
    coxaDire: yup.string().required("Campo obrigatório"),
    costas: yup.string().required("Campo obrigatório"),
    coxaEsq: yup.string().required("Campo obrigatório"),
    antebracoEsq: yup.string().required("Campo obrigatório"),
    bracoEsq: yup.string().required("Campo obrigatório"),
    antebracoDire: yup.string().required("Campo obrigatório"),
    cintura: yup.string().required("Campo obrigatório"),
    bracoDire: yup.string().required("Campo obrigatório"),
    gemeoEsq: yup.string().required("Campo obrigatório"),
    gemeoDire: yup.string().required("Campo obrigatório"),
    dataAvaliacao: yup.string().required("Campo obrigatório"),
    peito: yup.string().required("Campo obrigatório"),
    dorsal: yup.string().required("Campo obrigatório"),
    pescoco: yup.string().required("Campo obrigatório"),
    H20: yup.string().required("Campo obrigatório"),
    PesoMassaOssea: yup.string().required("Campo obrigatório"),
    Bioimpedancia: yup.string().required("Campo obrigatório"),
    GorduraViceral: yup.string().required("Campo obrigatório"),
    PesoMassaMuscular: yup.string().required("Campo obrigatório"),
    TaxaMetabolicaBasal: yup.string().required("Campo obrigatório"),
    IdadeMetabolica: yup.string().required("Campo obrigatório"),


  
});


const checkoutSchema = yup.object().shape({
  supino: yup.string().required("Campo obrigatório"),

  agachamento: yup
    .string()
    .required("Campo obrigatório"),

    terra: yup.string().required("Campo obrigatório"),

    dataAvaliacao: yup.string().required("Campo obrigatório"),
  
  
});

export default Clients;