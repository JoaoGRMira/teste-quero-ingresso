import React from 'react';
import logo from '../../images/quero_ingresso_logo.png';
import { styled, createTheme, ThemeProvider, CssBaseline, Box, AppBar as MuiAppBar, Toolbar, Typography, IconButton, Container, Grid, Link } from '@mui/material';
import TableEvento from "../../components/Tables/Event/TableEvento";

const defaultTheme = createTheme();

const StyledAppBar = styled(MuiAppBar)({
  backgroundColor: 'white',
  height: 72,
  zIndex: defaultTheme.zIndex.drawer + 1,
});

const StyledContainer = styled(Container)({
  backgroundColor: 'white',
  borderRadius: 1,
  padding: defaultTheme.spacing(2),
});

export default function Eventos() {

  //const { login } = useLogin();

  //const usuario = login;
  const usuario = localStorage.getItem('login');

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <StyledAppBar position="absolute" elevation={2}>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt="Logo" style={{ height: '71px' }} />
            </Box>
            {/*<Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
              <Title>Home</Title>
            </Box>*/}
            <IconButton color="black" sx={{ marginLeft: 'auto', borderRadius: '0' }}>
              <Link
                href="#"
                sx={{
                  textDecoration: 'none',
                  '&:visited': {
                    color: 'inherit',
                  },
                }}
              >
                <Typography variant="body2" color="black" fontFamily="'Century Gothic', Futura, sans-serif">
                  {usuario}
                </Typography>
              </Link>
            </IconButton>
            <IconButton color="black" sx={{ borderRadius: '0' }}>
              <Link
                href="/"
                sx={{
                  textDecoration: 'none',
                  '&:visited': {
                    color: 'inherit',
                  },
                }}
              >
                <Typography variant="body2" color="black" fontFamily="'Century Gothic', Futura, sans-serif">
                  Sair
                </Typography>
              </Link>
            </IconButton>
          </Toolbar>
        </StyledAppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: 'var(--body-background)',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, backgroundColor: 'var(--body-background)', marginBottom: "20px" }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <StyledContainer sx={{ boxShadow: 2 }}>
                  <TableEvento />
                </StyledContainer>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}