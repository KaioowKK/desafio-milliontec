import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
  },
  spacing: 8,
});

export default theme;