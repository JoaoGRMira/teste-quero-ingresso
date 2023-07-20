import * as React from 'react';
import logo from '../../images/quero_ingresso_logo.png';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, quaternaryListItems, quinaryListItems, secondaryListItems, tertiaryListItems } from '../../components/NavigationSideBar/SideBar';
import Title from '../../components/Outros/Title';
import EventoAtual from '../../components/Outros/EventoAtual';
import DownloadButton from '../../components/Buttons/DownloadButton';
import FilterButton from '../../components/Buttons/FilterButton';
import SearchBar from '../../components/Outros/SearchBar';
import TablePdv from '../../components/Tables/Pdv/TablePdv';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Quero Ingresso
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const usuario = 'Usuário';

const defaultTheme = createTheme();

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(0),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(0),
        },
      }),
    },
  }),
);

export default function Pdv() {
  const [open, setOpen] = React.useState(false); // inicia o menu fechado
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} sx={{ backgroundColor: 'white', height: 72 }} elevation={0}>
          <Toolbar
            sx={{
              pr: '24px', // mantém o padding direito quando o drawer é fechado
            }}
          >
            <IconButton
              edge="start"
              color="black"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '15px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt="Logo" style={{ height: '71px' }} />
              <IconButton
                color="inherit"
                sx={{ marginLeft: '20px', borderRadius: '0' }}
              >
                <Link href='/eventos' sx={{
                textDecoration: 'none',
                '&:visited': {
                  color: 'inherit',
                },
              }}>
                    <Typography variant="body2" color="black" fontFamily="'Century Gothic', Futura, sans-serif">
                    Home
                    </Typography>
                </Link>
              </IconButton>
            </Box>
            <IconButton color="black" sx={{ marginLeft: 'auto', borderRadius: '0' }}>
              <Link href='#' sx={{
                textDecoration: 'none',
                '&:visited': {
                  color: 'inherit',
                },
              }}>
                <Typography variant="body2" color="black" fontFamily="'Century Gothic', Futura, sans-serif">
                  {usuario}
                </Typography>
              </Link>
            </IconButton>
            <IconButton color="black" sx={{ borderRadius: '0' }}>
              <Link href='/' sx={{
                textDecoration: 'none',
                '&:visited': {
                  color: 'inherit',
                },
              }}>
                <Typography variant="body2" color="black" fontFamily="'Century Gothic', Futura, sans-serif">
                  Sair
                </Typography>
              </Link>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
              backgroundColor: 'var(--blue)',
              border: 'none',
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon sx={{ color: 'white' }} />
            </IconButton>
          </Toolbar>
          <Box
            sx={{
              width: drawerWidth,
              height: '91vh',
              overflowY: 'auto',
              backgroundColor: 'var(--blue)',
              display: open ? 'block' : 'none',
            }}
          >
            <List component="nav" sx={{ display: open ? 'block' : 'none' }}> {}
              {mainListItems}
              <Divider sx={{ my: 1, backgroundColor: 'white' }} />
              {secondaryListItems}
              <Divider sx={{ my: 1, backgroundColor: 'white' }} />
              {tertiaryListItems}
              <Divider sx={{ my: 1, backgroundColor: 'white' }} />
              {quaternaryListItems}
              <Divider sx={{ my: 1, backgroundColor: 'white' }} />
              {quinaryListItems}
            </List>
          </Box>
        </Drawer>
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
          <Container maxWidth="lg" sx={{ mt: 4, backgroundColor: 'var(--body-background)' }}>
            <Grid container spacing={3}>
              {/* Evento Atual */}
              <Grid item xs={12} md={4} lg={4}>
                <Title>Relatório Pdv</Title>
                <EventoAtual nomeEvento="Nome do Evento"
                  dataEvento="01 de janeiro de 2023"
                  localEvento="Local do Evento"
                  cidadeEvento="Cidade do Evento" />
              </Grid>
              {/* Botões */}
              <Grid item xs={12} md={4} lg={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <div>
                  <Typography component="span" variant="subtitle1" color="text.secondary" fontFamily="'Century Gothic', Futura, sans-serif" fontWeight="bold">
                    Total: 0
                  </Typography>
                  <br />
                  <Typography component="span" variant="subtitle1" color="text.secondary" fontFamily="'Century Gothic', Futura, sans-serif">
                    Vendas: 0
                  </Typography>
                  <br />
                  <Typography component="span" variant="subtitle1" color="text.secondary" fontFamily="'Century Gothic', Futura, sans-serif">
                    Cortesia: 0
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={4} lg={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <div>
                  <Typography component="span" variant="subtitle1" color="var(--green)" fontFamily="'Century Gothic', Futura, sans-serif" fontWeight="bold">
                    R$ 0,00
                  </Typography>
                  <br />
                  <Typography component="span" variant="subtitle1" color="text.secondary" fontFamily="'Century Gothic', Futura, sans-serif">
                    Total Líquido
                  </Typography>
                </div>
              </Grid>
              {/* Divider */}
              <Grid item xs={12}>
                <Divider sx={{ my: 1, backgroundColor: 'var(--grey-shadow)' }} />
              </Grid>
              <Container maxWidth="lg" sx={{ m: 2, backgroundColor: 'white', borderRadius: 1 }}>
                <Grid container spacing={3} sx={{ py: 2 }}>
                  <Grid item xs={12} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <FilterButton />
                    <DownloadButton />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <SearchBar label="Buscar PDV ou POS" />
                  </Grid>
                  <Grid item xs={12}>
                    <TablePdv />
                  </Grid>
                </Grid>
              </Container>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
