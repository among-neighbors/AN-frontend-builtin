import { createTheme } from '@mui/material/styles';

interface Breakpoints {
  values: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

const theme = (isHelpSideBar: boolean) => {
  let breakpoints: Breakpoints = {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  };
  if (isHelpSideBar) {
    breakpoints.values = {
      xs: 0,
      sm: 900,
      md: 1200,
      lg: 1500,
      xl: 1836,
    };
  }
  return createTheme({
    palette: {
      primary: {
        // light: '#ff9d3f',
        main: '#000',
        // dark: '#b53d00',
        contrastText: '#EC8034',
      },
      secondary: {
        main: '#000',
        contrastText: '#fff',
      },
    },
    breakpoints,
  });
};

export default theme;
