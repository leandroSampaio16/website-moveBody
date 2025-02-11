import { ColorModeContext, useMode } from "./theme";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CssBaseline, Fab, ThemeProvider } from "@mui/material";
import TopBar from "./scenes/global/topBar";
import Sidebar from "./scenes/global/sideBar";
import DashBoard from "./scenes/dashboard";
import Login from "./scenes/login"
import Team from "./scenes/team"
import Cookies from "js-cookie"
import Alert from "@mui/material/Alert";
import Clients from "./scenes/clients";
import TeamData from "./data/TeamData";
import NotFound from "./scenes/page404";
import Form from "./scenes/personalInfo";
import Calendar from "./scenes/calendar";
import FAQ from "./scenes/faq";
import Unsupported from "./scenes/unsupported";
import Planos from "./scenes/planos";
import Exercices from "./scenes/exercices";
import Teste from "./scenes/calendar copy"; 
import Subscrition from "./scenes/subscrition";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const[{data,error,load},colaboradoresDataGet]=TeamData()


  useEffect(() => {
    colaboradoresDataGet();
  }, []);

  

  const bcrypt = require('bcryptjs');


  useEffect(() => {
    if (Cookies.get('utilizadorInfo')) {
      setIsLogged(true);
      const cookie = Cookies.get('utilizadorInfo');
      const cookieData = JSON.parse(cookie);
  
      if (!load) {
   
          const match = data.find((colaborador) => colaborador.email === cookieData.email);
  
          if (match) {
            bcrypt.compare(match.password, cookieData.password)
              .then((passwordMatch) => {
                console.log(passwordMatch); // true or false
                if (passwordMatch) {
                  console.log("entrou");
                  const salt = bcrypt.genSaltSync(10);
                  match.password = bcrypt.hashSync(match.password, salt);
  
                  Cookies.set("utilizadorInfo", JSON.stringify(match));
                  setIsLogged(true);
                } else {
                  setIsLogged(false);
                  Cookies.remove("utilizadorInfo");
                }
              })
              .catch((error) => {
                setIsLogged(false);
                Cookies.remove("utilizadorInfo");
                console.error(error);
              });
          } else {
            Cookies.remove("utilizadorInfo");
            setIsLogged(false);
            setErrorMessage("Incorrect email or password");
          }

      }
    }
  }, []);
  

  const navigate = useNavigate();
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isPhone = /android|webos|iphone|ipod|blackberry|windows phone/.test(userAgent);
    setIsPhone(isPhone)

  }, [navigate]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />




        {isLogged ? (
          <div className="app">
            {window.location.pathname !== '/other' && <Sidebar isSidebar={isSidebar} />}
            <main className="content">
              {errorMessage && (
                <Alert sx={{ width: '100%', zIndex: 3 }} severity="error" onClose={() => setErrorMessage('')}>
                  {errorMessage}
                </Alert>
              )}
             <TopBar />
              <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="/team" element={<Team setErrorMessage={setErrorMessage} />} />
                <Route path="/clients" element={<Clients setErrorMessage={setErrorMessage} />} />
                <Route path="/planos" element={<Planos setErrorMessage={setErrorMessage} />} />
                <Route path="/personal" element={<Form />} />
                <Route path="/exercicios" element={<Exercices setErrorMessage={setErrorMessage} />} />
                <Route path="/calendar" element={<Calendar setErrorMessage={setErrorMessage} />} />
                <Route path="/teste" element={<Teste />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/other" element={<Subscrition />} />
                {/* Add the following Route to catch all non-existing routes */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        ) : (
          <Login setIsLogged={setIsLogged} />
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
  
  
}

export default App;
