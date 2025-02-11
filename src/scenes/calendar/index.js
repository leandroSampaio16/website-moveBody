import { useState, useEffect } from "react";
import { formatDate } from '@fullcalendar/core';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import ReactLoading from "react-loading";
import { Typography, Box, useTheme, Button, Modal, TextField,  Select, MenuItem, FormControl, InputLabel, ListItem, List, ListItemText  } from "@mui/material";
import { tokens } from "../../theme";
import EventosData from "../../data/EventosData";
import Cookies from "js-cookie";
import ApiConnectionConfig from "../../data/ApiConnectionConfig";

const Calendar = ({setErrorMessage}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const[{data,error,load},EventosDataGet]=EventosData()
  const utilizadorInfo = JSON.parse(Cookies.get('utilizadorInfo'));
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [redbutton, setRedbutton] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [title, setTitle] = useState("");
  const [hourI, setHourI] = useState("");
  const [hourF, setHourF] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    EventosDataGet();
    }, [refresh]);

  const options = [
    { value: "1", label: "Aula de grupo" },
    { value: "2", label: "Evento" },
  ];

const handleEventDrop = async (info) => {
  const { event, oldEvent } = info;

  // Get the new date of the dropped event
  const newDate = event.start;

  // Check if the event start date is in the future
  const eventStartDate = new Date(event.startStr);
  const todayStart = new Date().setHours(0, 0, 0, 0);
  const isFutureDate = eventStartDate >= todayStart;

  if (isFutureDate) {
    // Update the event's date to the new date
    event.setProp('start', newDate);

    const formData = new FormData();
    formData.append("newDate", event.startStr);
    formData.append("eventName", event.title);
    formData.append("id", event.id);
    formData.append("nivelResponsavel", utilizadorInfo.nivel);
    formData.append("responsavel", utilizadorInfo.nome);
    
    const jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }

    try {
      const response = await ApiConnectionConfig.post("/UpdateEvents", jsonData);
      setRefresh(!refresh)
    } catch (error) {
      console.error(error);
    }


    console.log(`Event "${event.title}" was dropped to ${event.startStr}`);
  } else {
    setRefresh(!refresh)

  }
  console.log(event.startStr);
};

  const handleEventClick = async () => {

    setIsButtonDisabled(true)

    const response = await ApiConnectionConfig.delete("/ApagarEvents?Id=" + selectedEvent.event._def.publicId + "&responsavel=" + utilizadorInfo.nome + "&nivel=" + utilizadorInfo.nivel + "")
    selectedEvent.event.remove();
    setRefresh(!refresh)
    setOpenDelete(false)
    setIsButtonDisabled(false)
    
  };

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

    const handleCloseAdd = () => {
        if(!isButtonDisabled){
          setOpenAdd(false);
        }
      };

  const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    }
    const handleOpenAdd = (selected) => {
        if (utilizadorInfo.nivel === "admin"){
        setSelectedEvent(selected);
        setOpenAdd(true);
    }   else{
        setErrorMessage("Você não tem permissão para realizar essa ação")
    }
      };


      const handleDateClick = async () => {
        if (selectedOption) {
          if (selectedOption === "1") {
            if (hourF && hourI && title) {
              setIsButtonDisabled(true);
              const formData = new FormData();
              formData.append("tipo", selectedOption);
              formData.append("title", title);
              formData.append("date", selectedEvent.startStr);
              formData.append("horario", hourI + "/" + hourF);
              formData.append("nivelResponsavel", utilizadorInfo.nivel);
              formData.append("responsavel", utilizadorInfo.nome);
              
              const jsonData = {};
              for (const [key, value] of formData.entries()) {
                jsonData[key] = value;
              }
      
              try {
                const response = await ApiConnectionConfig.post("/AddEvents", jsonData);
                setRedbutton(false);
                setRefresh(!refresh)
                setOpenAdd(false)
                setIsButtonDisabled(false);
              } catch (error) {
                console.error(error);
              }
      
              const calendarApi = selectedEvent.view.calendar;
              calendarApi.unselect();
      
              calendarApi.addEvent({
                id: `${selectedEvent.dateStr}-${title}`,
                title,
                start: selectedEvent.startStr,
                end: selectedEvent.endStr,
                allDay: selectedEvent.allDay,
              });
            } else {
              setErrorMessage("Preencha os campos");
              setRedbutton(true);
            }
          } else {
            if (title) {

                setIsButtonDisabled(true);
                const formData = new FormData();
                formData.append("tipo", selectedOption);
                formData.append("title", title);
                formData.append("date", selectedEvent.startStr);
                formData.append("horario", "");
        
                const jsonData = {};
                for (const [key, value] of formData.entries()) {
                  jsonData[key] = value;
                }
        
                try {
                  const response = await ApiConnectionConfig.post("/AddEvents", jsonData);
                  setRedbutton(false);
                  setRefresh(!refresh)
                  setOpenAdd(false)
                  setIsButtonDisabled(false);
                } catch (error) {
                  console.error(error);
                }
              const calendarApi = selectedEvent.view.calendar;
              calendarApi.unselect();
      
              calendarApi.addEvent({
                id: `${selectedEvent.dateStr}-${title}`,
                title,
                start: selectedEvent.startStr,
                end: selectedEvent.endStr,
                allDay: selectedEvent.allDay,
              });
            } else {
              setErrorMessage("Preencha os campos");
              setRedbutton(true);
            }
          }
        } else {
          setErrorMessage("Preencha os campos");
          setRedbutton(true);
        }
      };
      
      const handleCloseDelete = () => {
        if(!isButtonDisabled){
        setOpenDelete(false);
        }
      };  
      
      const handleOpenDelete = (selected) => {
        if (utilizadorInfo.nivel === "admin"){
            setSelectedEvent(selected);
            setOpenDelete(true);
        }   else{
            setErrorMessage("Você não tem permissão para realizar essa ação")
        }
      
      };

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
       Calendário
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
        Calendário dos eventos FITARENA
        </Typography>
      </Box>
      </Box>


      <Modal open={openDelete} onClose={handleCloseDelete}>
  
  <Box sx={{
    position: 'absolute',
    top: '45%',
    left: '50%',
    width : "45vh",
    height: "25vh",
    transform: 'translate(-50%, -50%)',
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.primary[400],
    padding: "25px",
    borderRadius: "8px",
    '@media (max-height: 800px)': {
      height: "30vh",

    }
  }}>
    <center>
      <Typography variant="h3" sx={{color: colors.blueAccent[400], marginTop: "1vh"}}>Tem a certeza que deseja apagar?</Typography>
    </center>
      <Typography variant="h5" sx={{color: colors.redAccent[600], marginTop: "3vh", mx: "2.5vh"}}>Esta operação é irreversivel</Typography>
      <center>
      <Button variant="contained" sx={{width: "10vh",height: "4vh", background: colors.greenAccent[600], marginTop: "5.5vh"}} onClick={() => handleEventClick()}>
      Confirmar
    </Button>
    </center>

  </Box>

</Modal>
      <Modal open={openAdd} onClose={handleCloseAdd}>
  <Box sx={{
    position: 'absolute',
    top: '45%',
    left: '50%',
    width : "70vh",
    justifyContent: "center",
    height: "42vh",
    transform: 'translate(-50%, -50%)',
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.primary[400],
    padding: "25px",
    borderRadius: "8px",
    '@media (max-height: 800px)': {
      height: "50vh",

    }
  }}>
    
    <FormControl variant="outlined" sx={{ mb: "16px" }}>
          <InputLabel id="select-label">Tipo</InputLabel>
          <Select
            labelId="select-label"
            value={selectedOption}
            onChange={handleOptionChange}
            label="Select"
            sx={{ minWidth: "120px" }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedOption === "1" && (
            <>
        <TextField
          label="Das:"
          type="time"
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => setHourI(e.target.value)}
          variant="outlined"
          sx={{ mb: "16px" }}
        />
        <TextField
      InputLabelProps={{
        shrink: true
      }}
          label="Até:"
          type="time"
          onChange={(e) => setHourF(e.target.value)}
          variant="outlined"
          sx={{ mb: "16px" }}
        />
        </>
      )}
      <TextField
        label="Titulo"
        variant="outlined"
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: "16px" }}

      />

<Button
disabled={isButtonDisabled}
 onClick={handleDateClick}
  variant="contained"
  color="primary"
  fullWidth
  sx={{
    mt: "16px",
    backgroundColor: redbutton ? colors.redAccent[500] : colors.blueAccent[500],
    height: "4vh",
  }}
>
  Adicionar
</Button>

  </Box>
</Modal>
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Eventos próximos</Typography>
          <List>
          {currentEvents
  .filter((event) => {
    const eventStart = new Date(event.start);
    const todayStart = new Date().setHours(0, 0, 0, 0);
    return eventStart >= todayStart;
  })
  .map((event) => (
    <ListItem
      key={event.id}
      sx={{
        backgroundColor: colors.greenAccent[500],
        margin: "10px 0",
        borderRadius: "2px",
      }}
    >
      <ListItemText
        primary={event.title}
        secondary={
          <Typography>
            {formatDate(event.start, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Typography>
        }
      />
    </ListItem>
  ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
        <FullCalendar
            height="75vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "", // Remove the buttons for month, week, day, and list views
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            eventDrop={handleEventDrop}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleOpenAdd}
            eventClick={handleOpenDelete}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={data}
            />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;