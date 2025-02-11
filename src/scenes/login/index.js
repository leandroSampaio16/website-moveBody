import styled from "@emotion/styled";
import { useState, useEffect, useRef } from "react";
import { Box, Button, Container, TextField, Typography, InputAdornment, IconButton, makeStyles } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";
import TeamData from "../../data/TeamData";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from '@mui/material';
import ReCAPTCHA from "react-google-recaptcha";
import ApiConnectionConfig from "../../data/ApiConnectionConfig";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const Login = ({ setIsLogged }) => {

  const handleFormSubmit = async (values) => {


    try{
    setRedbutton(true)
    const formData = new FormData();
    formData.append("email", email);
    formData.append("senha", values.address1);

    const jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }

    const response = await ApiConnectionConfig.post("/AlterarSenha", jsonData);

    window.location.reload()

  } catch (error) {

    console.error('Request error:', error);
    // Handle any other errors that may occur during the request
  }
  }

  const initialValues = {
    address1: "",
    address2: "",
  };


  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [redbutton, setRedbutton] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [verified, setVerified] = useState(true);
  const [off, setOff] = useState(false);
  const [envied, setEnvied] = useState(false);
  const [email, setEmail] = useState("");

  const [isOTPVerified, setIsOTPVerified] = useState(false);


  const [showPasswordForm, setShowPasswordForm] = useState(false);


  const [okMessage, setOkMessage] = useState("");


  const [timerCount, setTimer] = useState(60);

  function generateOTP() {
    const characters = '0123456789';
    let otp = '';
  
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      otp += characters.charAt(randomIndex);
    }
  
    return otp;
  }

  const [OTP1, setOTP1] = useState("");

  
  const [disable, setDisable] = useState(true);

  const sendEmail = async () => {
    setOff(true);
    try {
      const otp = generateOTP();
      setOTP1(otp);
      const formData = new FormData();
      formData.append("email", email);
      formData.append("OTP", otp);
  
      const jsonData = {};
      for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
      }
  
      const response = await ApiConnectionConfig.post("/Recuperar", jsonData);
  
      setEnvied(true);
      setTimer(60);
   
  
    } catch (error) {
      setOff(false);
      console.error('Request error:', error);
      // Handle any other errors that may occur during the request
    }
  };
  

  





  const length = 4;
  


    const [otp, setOtp] = useState(Array(length).fill(""));
    const inputRefs = useRef([]);
    
  
    const handleChange = (index, value) => {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
  
      if (value && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }

      if (index === length - 1 && value) {

        if(updatedOtp.join("") == OTP1){
          setShowPasswordForm(true)
        }
        else{
          setErrorMessage("Código de recuperação incorreto")
        }
        // All inputs filled and last input changed
        // Perform the desired action here
        console.log("Finished entering OTP:", updatedOtp.join(""));
      }
     // onChange(updatedOtp.join(""));
    };
  
    const handleKeyDown = (event, index) => {
      if (event.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    };
  













    useEffect(() => {
      if(envied){
      let interval = setInterval(() => {
        setTimer((lastTimerCount) => {
          lastTimerCount <= 1 && clearInterval(interval);
          if (lastTimerCount <= 1) {
            setDisable(false);
            setOTP1("");
          }
          if (lastTimerCount <= 0) return lastTimerCount;
          return lastTimerCount - 1;
        });
      }, 1000); // each count lasts for a second
    
      // cleanup the interval on complete
      return () => {
        clearInterval(interval);
        setOTP1("");
      };
    }
    }, [disable]);












  const rotate = keyframes`
    100% {
      transform: rotate(360deg);
    }
  `;

  const [showPassword, setShowPassword] = useState(false);

  const pulse = keyframes`
    0% {
      transform: scale(1);
      opacity: 1;
      border-radius: 30% 70% 39% 61% / 60% 70% 30% 40%;
    }
    50% {
      transform: scale(0.9);
      opacity: 0.7;
      border-radius: 25% 75% 71% 29% / 60% 49% 51% 40%;
    }
    100% {
      transform: scale(1);
      opacity: 1;
      border-radius: 30% 70% 39% 61% / 60% 70% 30% 40%;
    }
  `;

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  const voltar = () => {
    setShowForm(true)
    setErrorMessage("")
    setShowForm(true)
    setVerified(true)
    setEnvied(false)
  };

  const AnimatedCircle = styled(Box)({
    backgroundColor: colors.blueAccent[800],
    background: `linear-gradient(to right, ${colors.blueAccent[800]}, ${colors.blueAccent[600]})`,
    height: "120vh",
    position: "absolute",
    right: "-10%",
    top: "-10%",
    zIndex: -2,
    width: "150vh",
    animation: `${rotate} 8s linear infinite, ${pulse} 10s ease-in-out infinite`,
    borderRadius: "30% 70% 39% 61% / 60% 70% 30% 40%",
    animationDelay: "1s",
  });

  const [{ data, error, load }, colaboradoresDataGet] = TeamData();

  useEffect(() => {
    colaboradoresDataGet();
  }, []);

  const bcrypt = require('bcryptjs');

  const LoginVerify = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    const match = data.find((colaborador) => colaborador.email === email);
    if (match) {
      // const passwordMatch = await bcrypt.compare(password, match.password);
      // if (passwordMatch) {
      if (match.password === password) {
        const salt = bcrypt.genSaltSync(10);
        match.password = bcrypt.hashSync(match.password, salt);

        // delete match.perfil;
        if (match.ativo != 1) {
          Cookies.set("utilizadorInfo", JSON.stringify(match));
          setIsLogged(true);
        } else {
          setErrorMessage("Esse utilizador está inativo");
        }
      } else {
        Cookies.remove("utilizadorInfo");
        setIsLogged(false);
        setErrorMessage("Incorrect email or password");
      }
    } else {
      Cookies.remove("utilizadorInfo");
      setIsLogged(false);
      setErrorMessage("Incorrect email or password");
    }
  };

 


  const ForgetPassword = async () => {
    const email = document.getElementById('email').value;
    if (!email) {
      setErrorMessage("O email é um campo obrigatório");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  setErrorMessage("Por favor insira um email válido");
  return;
}
    setEmail(email)
    try {
      setVerified(true)

      const otp = generateOTP();
      setOTP1(otp)
      const formData = new FormData();
      formData.append("email", email);
      formData.append("OTP", otp);

      const jsonData = {};
      for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
      }

      const response = await ApiConnectionConfig.post("/Recuperar", jsonData);

      setEnvied(true)
      setOff(false)
      if (response.status === 200) {
        // Recovery email sent successfully
        console.log('Recovery email sent successfully');
        // Handle the successful response here (e.g., show a success message)
      } else {
        // Error sending recovery email
        console.error('Error sending recovery email');
        // Handle the error response here (e.g., show an error message)
      }
    } catch (error) {
      setVerified(false)
      console.error('Request error:', error);
      // Handle any other errors that may occur during the request
    }
  };


  
  return (
    <>
      {/* render the Alert component only when there is an error message */}
      {errorMessage && (
        <Alert
          sx={{ position: "absolute", width: "100%" }}
          severity="error"
          onClose={() => setErrorMessage('')}
        >
          {errorMessage}
        </Alert>
        
      )}
   {okMessage && (
        <Alert
          sx={{ position: "absolute", width: "100%" }}
          severity="success"
          onClose={() => setOkMessage('')}
        >
          {okMessage}
        </Alert>
        
      )}
      
  
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Container maxWidth="xs">
          {showForm ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: colors.primary[400],
                padding: "32px",
                borderRadius: "16px",
              }}
            >
              <Typography variant="h3" sx={{ mb: "3vh" }}>
                Login
              </Typography>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                required
              />
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                margin="normal"
                fullWidth
                type={showPassword ? "text" : "password"}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                onClick={LoginVerify}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: "16px", background: colors.blueAccent[500] }}
              >
                Login
              </Button>
              <Link
                onClick={() => setShowForm(false)}
                href="#"
                sx={{
                  mt: "8px",
                  paddingTop: "2vh",
                  color: colors.blueAccent[500],
                  alignSelf: "flex-start",
                }}
              >
                Esqueci-me da senha
              </Link>
            </Box>
          ) : envied ? (
            showPasswordForm ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: colors.primary[400],
                  padding: "32px",
                  borderRadius: "16px",
                }}
              >
                <Typography variant="h3" sx={{ mb: "3vh" }}>
                  Alterar senha
                </Typography>





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
                "& > div": { gridColumn: isNonMobile ? undefined : "span 8" },
              }}
            >

              <TextField
                disabled = {redbutton}
                
                variant="filled"
                type={showPassword ? "text" : "password"}
                label="Senha"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 12" }}
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
                
                variant="filled"
                type={showPassword ? "text" : "password"}
                label="Repetir Senha"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 12" }}   
              />

            </Box>
            <Box display="flex" justifyContent="center" mt="20px" my={"1vh"} sx={{paddingTop:"2vh"}}>
              <Button  disabled = {redbutton} type="submit" sx={{background:colors.blueAccent[500]}} variant="contained">
                Alterar senha
              </Button>
            </Box>
          </form>
        )}
      </Formik>







              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: colors.primary[400],
                  padding: "32px",
                  borderRadius: "16px",
                }}
              >
                <Typography variant="h3" sx={{ mb: "3vh" }}>
                  Código de recuperação
                </Typography>
          
                <Box
                  sx={{
                    display: "flex",
                    my: "4vh",
                    justifyContent: "space-between",
                  }}
                >
                  {otp.map((digit, index) => (
                    <TextField
                      key={index}
                      sx={{
                        flex: 1,
                        height: "8vh",
                        '@media (max-height: 800px)': {
                          height: "9.5vh" // set a different height for screens smaller than 768px
                        },
                        width: "4vw",
                        mx: ".5vw",
                        borderRadius: "0.25rem",
                        border: `1px solid ${colors.greenAccent[400]}`,
                        textAlign: "center",
                        fontSize: "10rem",
                        fontWeight: "bold",
                      }}
                      InputLabelProps={{ style: { fontSize: 40 } }}
                      inputRef={(ref) => (inputRefs.current[index] = ref)}
                      value={digit}
                      variant="outlined"
                      type="text"
                      autoFocus={index === 0}
                      inputProps={{
                        style: { fontSize: 30, textAlign: "center" },
                        maxLength: 1,
                        inputMode: "numeric",
                      }}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  ))}
                </Box>
          
                <Link
                  disabled={off}
                  onClick={() => {
                    if (!disable) {
                      setOkMessage("Email enviado com sucesso");
                      sendEmail();
                    }
                  }}
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    paddingTop: "2vh",
                    color: colors.grey[100],
                    alignSelf: "flex-start",
                  }}
                >
                  {disable ? `Reenvio do código disponível em: ${timerCount}s` : "Reenviar Código"}
                </Link>
          
                <Link
                  onClick={() => voltar()}
                  href="#"
                  sx={{
                    mt: "8px",
                    color: colors.blueAccent[500],
                    alignSelf: "flex-start",
                  }}
                >
                  Voltar para o login
                </Link>
              </Box>
            )
            
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: colors.primary[400],
                padding: "32px",
                borderRadius: "16px",
              }}
            >
              <Typography variant="h3" sx={{ mb: "3vh" }}>
                Esqueci-me da senha
              </Typography>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                required
              />
  
              {/* Add the ReCAPTCHA component */}
              <Box
                sx={{
                  mt: "8px",
                  paddingY: "1vh",
                  color: colors.blueAccent[500],
                  alignSelf: "flex-start",
                }}
              >
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={() => setVerified(false)}
                  size="normal"
                />
              </Box>
  
              <Button
                disabled={verified}
                onClick={ForgetPassword}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: "16px", background: colors.blueAccent[500] }}
              >
                Enviar email de recuperação
              </Button>
  
              <Link
                onClick={() => voltar()}
                href="#"
                sx={{
                  mt: "8px",
                  paddingTop: "2vh",
                  color: colors.blueAccent[500],
                  alignSelf: "flex-start",
                }}
              >
                Voltar para o login
              </Link>
            </Box>
          )}
  
          <AnimatedCircle />
        </Container>
      </Box>
    </>
  );
  
};

const checkoutSchema = yup.object().shape({
  address1: yup.string().required("Este campo é obrigatório"),
  address2: yup
  .string() 
  .required("Este campo é obrigatório")
  .test("senha-match", "As senhas não coincidem", function (value) {
    return value === this.parent.address1;
  }),
});

export default Login;
