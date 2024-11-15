import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Emulator from "./Emulator";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={darkTheme}>
    <Card>
      <Typography variant="h4">PetCube Emulator</Typography>
      <Typography variant="body">
        This is an Emulator / Test platform for PetCube
      </Typography>
      <CssBaseline enableColorScheme />
      <Card variant="outlined">
        <Emulator height={200} width={200}></Emulator>
      </Card>
      <Typography variant="h5">
        Current Functionality
      </Typography>
      <Typography variant="body">
        Pet.js and Environment.js are responsible for running physics, interactions
        and calculating positions, Render.js is responsible for rendering
        items passed to it via Pet.js & Environment.js.
      </Typography>
      <Typography variant="body">
        Pet.js and Environment.js also lay out a easy framework to add further Functionality
        each with a physics and render hook. (With Pet.js having its render function executing within Environment.js render function)
      </Typography>
      <Typography variant="body">
        Pixel art can currently be rendered with scale, but must be saved in .json format
      </Typography>
      <Typography variant="h5">
        To Do
      </Typography>
      <Typography variant="body">
        Add basic pet stats, logic & intelligence.
      </Typography>
      <Typography variant="body">
        Add objects (such as sofa & food bowl)
      </Typography>
      <Typography variant="body">
        Add animation support & pet interaction with objects
      </Typography>
      <Typography variant="body">
        Add PNG to JSON converter
      </Typography>
    </Card>
  </ThemeProvider>
);
