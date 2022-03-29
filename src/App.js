import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import ViewInArTwoToneIcon from '@mui/icons-material/ViewInArTwoTone';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Verify } from "./Verify";

function Copyright() {
  return (
    <Typography variant="body2" color="primary.contrastText" align="center">
      {'Copyright © '}
      <Link color="primary.contrastText" href="https://www.linkedin.com/in/mollyjn/">
        swfLAB - KilliMilli
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
palette: {
  type: 'light',
  primary: {
    main: '#faf6cf',
  },
  secondary: {
    main: '#f50057',
  },
},
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <IconButton sx={{ mr: 2 }} href="https://github.com/mollyy0514" aria-label="home">
            <HomeIcon />
          </IconButton>
          <ViewInArTwoToneIcon sx={{ mr: 3 }} />
          <Typography variant="h5" color="inherit" noWrap>
            NFT Verify System
          </Typography>
        </Toolbar>
      </AppBar>

    <div className='Verify'>
      <Verify />
    </div>
      {/* Footer */}
      <div className='footer'>
        <Box sx={{ bgcolor: 'primary.main', p: 2 }} component="footer">
          <Typography
            variant="subtitle1"
            align="center"
            color="primary.contrastText"
            component="p"
          >
            Powered by Opensea-js!
          </Typography>
          <Copyright />
        </Box>
      </div>
      {/* End footer */}
    </ThemeProvider>
    </div>
  );
}

export default App;
