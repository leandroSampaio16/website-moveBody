import { Box, Button, TextField, Typography, useTheme, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import Cookies from "js-cookie"
import ApiConnectionConfig from "../../data/ApiConnectionConfig";
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from "@mui/material/TextareaAutosize";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showPassword, setShowPassword] = useState(false);
  const [redbutton, setRedbutton] = useState(false);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [file2, setFile2] = useState("");


  const cookie = Cookies.get('utilizadorInfo');
  const cookieData = JSON.parse(cookie);
  const initialValues = {
    firstName: cookieData.nome,
    email: cookieData.email,
    contact: cookieData.telefone,
    address1: "",
    address2: "",
    inst:cookieData.insta,
    descr:cookieData.descr
  };
  


  const handleFormSubmit = async (values) => {
    console.log(file)
    console.log(file2)
    if(file!=="" && file2!==""){
      console.log("os dois")
      try {
        const formData = new FormData();
        formData.append('image', file, file.name); // Append the selected file to the FormData object
    
        const response = await ApiConnectionConfig.post("/upload", formData);
        // Access the generated URL from the response data
        const imageUrlTeste = response.data.imageUrl;
        // Use the imageUrl as needed, such as displaying it in an image tag or saving it to a database
    
        // Set the imageUrl in your component state or handle it in any other way as needed
        setImageUrl(imageUrlTeste);


        const formData2 = new FormData();
        formData2.append('image', file2, file2.name); // Append the selected file to the FormData object
    
        const response2 = await ApiConnectionConfig.post("/upload", formData2);
        // Access the generated URL from the response data
        const imageUrlTeste2 = response2.data.imageUrl;
        // Use the imageUrl as needed, such as displaying it in an image tag or saving it to a database
    
        // Set the imageUrl in your component state or handle it in any other way as needed
        setImageUrl2(imageUrlTeste2);
  

        setRedbutton(true);
        const formDataUpdate = new FormData();
        formDataUpdate.append("nome", values.firstName);
        formDataUpdate.append("telefone", values.contact);
        formDataUpdate.append("email", values.email);
        formDataUpdate.append("nivel", cookieData.nivel);
        formDataUpdate.append("senha", values.address1);
        formDataUpdate.append("insta", values.inst);
        formDataUpdate.append("descr", values.descr);
        formDataUpdate.append("idColaboradores", cookieData.idColaboradores);
        formDataUpdate.append("responsavel", "utilizador");
        formDataUpdate.append("perfil", imageUrlTeste);
        formData.append("ativo", "0");
        formDataUpdate.append("capa", imageUrlTeste2);
        formData.append("nivelResponsavel", cookieData.nivel);
        const jsonData = {};
        for (const [key, value] of formDataUpdate.entries()) {
          jsonData[key] = value;
        }
        console.log(jsonData);
    
        await ApiConnectionConfig.post("/UpdateColaboradores", jsonData);
         Cookies.remove("utilizadorInfo")
        window.location.reload()
    
      } catch (error) {
        // Handle any errors that may occur during the request
        console.error('Error uploading image:', error);
      }
    }
    if (file !== "" && file2 === "") {
      console.log("file1");
      console.log(file);
      try {
        const formData = new FormData();
        formData.append('image', file, file.name); // Append the selected file to the FormData object
    
        try {
          const response = await ApiConnectionConfig.post("/upload", formData);
          // Handle successful response here
          console.log(response.data);
    
          // Access the generated URL from the response data
          const imageUrlTeste = response.data.imageUrl;
          // Use the imageUrl as needed, such as displaying it in an image tag or saving it to a database
    
          // Set the imageUrl in your component state or handle it in any other way as needed
          setImageUrl(imageUrlTeste);
    
          setRedbutton(true);
          const updateFormData = new FormData();
          updateFormData.append("nome", values.firstName);
          updateFormData.append("telefone", values.contact);
          updateFormData.append("email", values.email);
          updateFormData.append("nivel", cookieData.nivel);
          updateFormData.append("senha", values.address1);
          updateFormData.append("idColaboradores", cookieData.idColaboradores);
          updateFormData.append("responsavel", "utilizador");
          updateFormData.append("perfil", imageUrlTeste);
          updateFormData.append("insta", values.inst);
          updateFormData.append("descr", values.descr);
          updateFormData.append("ativo", "0");
          updateFormData.append("capa", cookieData.capa);
          updateFormData.append("nivelResponsavel", cookieData.nivel);
          const jsonData = {};
          for (const [key, value] of updateFormData.entries()) {
            jsonData[key] = value;
          }
          console.log(jsonData);
    
          const updateResponse = await ApiConnectionConfig.post("/UpdateColaboradores", jsonData);
          // Handle successful update response here
          console.log(updateResponse.data);
    
          Cookies.remove("utilizadorInfo")
          window.location.reload()
    
        } catch (uploadError) {
          // Handle error related to image upload
          console.error('Error uploading image:', uploadError);
        }
      } catch (error) {
        // Handle other types of errors that may occur during the request
        console.error('Error:', error);
      }
    }
    
    if (file2 !== ""  && file=="") {
      console.log("file2")
      try {
        const formData = new FormData();
        formData.append('image', file2, file2.name); // Append the selected file to the FormData object
    
        const response = await ApiConnectionConfig.post("/upload", formData);
        // Access the generated URL from the response data
        const imageUrlTeste = response.data.imageUrl;
        // Use the imageUrl as needed, such as displaying it in an image tag or saving it to a database
    
        // Set the imageUrl in your component state or handle it in any other way as needed
        setImageUrl(imageUrlTeste);
  

        setRedbutton(true);
        const formDataUpdate = new FormData();
        formDataUpdate.append("nome", values.firstName);
        formDataUpdate.append("telefone", values.contact);
        formDataUpdate.append("email", values.email);
        formDataUpdate.append("nivel", cookieData.nivel);
        formDataUpdate.append("senha", values.address1);
        formDataUpdate.append("idColaboradores", cookieData.idColaboradores);
        formDataUpdate.append("responsavel", "utilizador");
        formDataUpdate.append("perfil", cookieData.perfil);
        formDataUpdate.append("insta", values.inst);
        formDataUpdate.append("descr", values.descr);
        formDataUpdate.append("capa", imageUrlTeste);
        formData.append("ativo", "0");
        formData.append("nivelResponsavel", cookieData.nivel);
        const jsonData = {};
        for (const [key, value] of formDataUpdate.entries()) {
          jsonData[key] = value;
        }
        console.log(jsonData);
    
        await ApiConnectionConfig.post("/UpdateColaboradores", jsonData);
         Cookies.remove("utilizadorInfo")
        window.location.reload()
    
      } catch (error) {
        // Handle any errors that may occur during the request
        console.error('Error uploading image:', error);
      }
    }
     if(file2 === ""  && file===""){

  
    setRedbutton(true);
    const formData = new FormData();
    formData.append("nome", values.firstName);
    formData.append("telefone", values.contact);
    formData.append("email", values.email);
    formData.append("nivel", cookieData.nivel);
    formData.append("senha", values.address1);
    formData.append("idColaboradores", cookieData.idColaboradores);
    formData.append("responsavel", "utilizador");
    formData.append("insta", values.inst);
    formData.append("descr", values.descr);
    formData.append("perfil", cookieData.perfil);
    formData.append("capa", cookieData.capa);
    formData.append("ativo", "0");
    formData.append("nivelResponsavel", cookieData.nivel);

    const jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }
    console.log(jsonData)
    try {
      const response = await ApiConnectionConfig.post("/UpdateColaboradores", jsonData);

     Cookies.remove("utilizadorInfo")
     window.location.reload()
    } catch (error) {
      console.error(error);
    }
    }
    
  };




  const handleFileChange = async (event) => {

    const fileCreated = event.target.files[0];

    setFile(fileCreated)

    // Create a new FormData object
   
  };

  const handleFileChange2 = async (event) => {

    const fileCreated2 = event.target.files[0];

    setFile2(fileCreated2)

    // Create a new FormData object
   
  };

  return (
    <Box m="20px" >


<Box mb="30px" display="flex" justifyContent="space-between">
      <Box>
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
       Perfil
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
        Atualizar Informações
        </Typography>
      </Box>
      </Box>


      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                disabled = {redbutton}
                fullWidth
                variant="filled"
                type="text"
                label="Nome"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 4" }}
              />   
              <TextField
                disabled = {redbutton}
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                disabled = {redbutton}
                fullWidth
                variant="filled"
                type="text"
                label="Telefone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
             {cookieData.nivel === "pt" && ( 
              <TextField
                disabled = {redbutton}
                fullWidth
                variant="filled"
                type="text"
                label="Instagram"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.inst}
                name="inst"
                error={!!touched.inst && !!errors.inst}
                helperText={touched.inst && errors.inst}
                sx={{ gridColumn: "span 4" }}
              />

             )}
                   {cookieData.nivel === "pt" && ( 
              <TextField
                disabled = {redbutton}
                fullWidth
                variant="filled"
                type="text"
                label="Pequena descrição pessoal"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.descr}
                name="descr"
                error={!!touched.descr && !!errors.descr}
                helperText={touched.descr && errors.descr}
                sx={{ gridColumn: "span 4" }}
              />

             )}
                <Typography
              variant="h6"
              color={colors.grey[300]}      
            >
              Dados opcionais
            </Typography>
              <TextField
                disabled = {redbutton}
                fullWidth
                variant="filled"
                type={showPassword ? "text" : "password"}
                label="Senha"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                disabled = {redbutton}
                fullWidth
                variant="filled"
                type={showPassword ? "text" : "password"}
                label="Repetir Senha"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}   
              />





<Box display="flex" sx={{ gridColumn: "span 3" }} >
  <Box flex="1" mr={2}>
    <Typography variant="h6" sx={{ mb: "16px" }}>
      Imagem de perfil
    </Typography>
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      style={{
        marginBottom: "16px",
        backgroundColor: colors.primary[300],
        color: colors.text,
        border: `1px solid ${colors.primary[500]}`,
        borderRadius: "4px",
        padding: "8px",
        fontSize: "16px",
        cursor: "pointer",
        width: "100%",
      }}
    />

    {imageUrl && (
      <Typography sx={{ mb: "2vh" }}>{imageUrl.name}</Typography>
    )}

  </Box>
  {cookieData.nivel === "pt" && (
  <Box flex="1" ml={2}>
    <Typography variant="h6" sx={{ mb: "16px" }}>
    Imagem de capa
    </Typography>
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange2}
      style={{
        marginBottom: "16px",
        backgroundColor: colors.primary[300],
        color: colors.text,
        border: `1px solid ${colors.primary[500]}`,
        borderRadius: "4px",
        padding: "8px",
        fontSize: "16px",
        cursor: "pointer",
        width: "100%",
      }}
    />

    {imageUrl2 && (
      <Typography sx={{ mb: "2vh" }}>{imageUrl2.name}</Typography>
    )}
    
  </Box>
  )}
</Box>











            </Box>
            <Box display="flex" justifyContent="end" mt="20px" mx={"20px"}>
              <Button  disabled = {redbutton} type="submit" color="secondary" variant="contained">
                Atualizar Dados
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const usernameRegex = /^[a-zA-Z0-9._]{1,30}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("Campo obrigatório"),
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Número de telefone inválido")
    .required("Campo obrigatório"),
    inst:yup
    .string()
    .matches(usernameRegex, "Perfil de instagram inválido")
    .required("Campo obrigatório"),
    descr: yup.string().required("Campo obrigatório"),
  address1: yup.string(),
  address2: yup
  .string()
  .test("senha-match", "As senhas não coincidem", function (value) {
    return value === this.parent.address1;
  }),
});

export default Form;