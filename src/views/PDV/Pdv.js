import React, { useEffect, useState } from 'react';
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
import { mainListItems, quaternaryListItems, secondaryListItems } from '../../components/NavigationSideBar/SideBar';
import Title from '../../components/Outros/Title';
import EventoAtual from '../../components/Outros/EventoAtual';
import TablePdv from '../../components/Tables/Pdv/TablePdv';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { CircularProgress } from '@mui/material';
import Connection from '../../model';

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
  // const [pdv, setPdv] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // Estado para controlar se os dados foram carregados
  const usuario = localStorage.getItem('login'); // Define o usuário pelo dado salvo no localStorage
  const [open, setOpen] = React.useState(false); // inicia o menu fechado
  const [evento, setevento] = useState(0);
  const [data, setdata] = useState(0);
  const [local, setlocal] = useState(0);
  const [cidade, setcidade] = useState(0);
  const [total, settotal] = useState(0);
  const [vendas, setvendas] = useState(0);
  const [cortesias, setcortesias] = useState(0);
  const [valor, setvalor] = useState(0);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Recupera o objeto do evento selecionado do localStorage
  const selectedEventCodeJSON = localStorage.getItem("selectedEvent");
  const selectedEventCode = JSON.parse(selectedEventCodeJSON); // Converte a string JSON em um objeto

  const fetchPdv = async () => {
    if (selectedEventCode && !dataLoaded) {
      const conn = Connection();
  
      try {
        const response = await conn.get(
          `eventos/cabecalho?evento=${selectedEventCode.eve_cod}`,
          {
            headers: {
              'token': localStorage.getItem('token')
            }
          }
        );
  
        // Atualizar as variáveis de estado com os dados da resposta
        setevento(response.data.evento);
        setdata(response.data.data);
        setlocal(response.data.local);
        setcidade(response.data.cidade);
        settotal(response.data.total);
        setvendas(response.data.vendas);
        setcortesias(response.data.cortesias);
        setvalor(response.data.valor);
  
        // Atualizar o estado indicando que os dados foram carregados
        setDataLoaded(true);
      } catch (error) {
        console.error('Erro na solicitação GET (Tipo Ingresso):', error);
      }
    }
  };
  
  useEffect(() => {
    fetchPdv();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEventCode, dataLoaded]);  

  //console.log(selectedEventCode);
  //console.log(selectedEventCode.eve_cod);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} sx={{ backgroundColor: 'white', height: 72 }} elevation={2}>
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
            {/*<Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
              <Title>Relatório Pdv</Title>
            </Box>*/}
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
            <List component="nav" sx={{ display: open ? 'block' : 'none' }}> { }
              {mainListItems}
              <Divider sx={{ my: 1, backgroundColor: 'white' }} />
              {secondaryListItems}
              {/*<Divider sx={{ my: 1, backgroundColor: 'white' }} />
              {tertiaryListItems}*/}
              <Divider sx={{ my: 1, backgroundColor: 'white' }} />
              {quaternaryListItems}
              {/*<Divider sx={{ my: 1, backgroundColor: 'white' }} />
              {quinaryListItems}*/}
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
          {dataLoaded ? (
          <Container maxWidth="lg" sx={{ mt: 4, backgroundColor: 'var(--body-background)' }}>
            <Grid container spacing={3}>
              {/* Evento Atual */}
              <Grid item xs={12} md={5} lg={5}>
                <Title>Relatório Pdv</Title>
                <EventoAtual nomeEvento={evento}
                  dataEvento={data}
                  localEvento={local}
                  cidadeEvento={cidade} />
              </Grid>
              {/* Infos */}
              <Grid item xs={12} md={5} lg={5} sx={{ display: 'flex', justifyContent: 'flex-center', alignItems: 'center' }}>
                <div>
                  <Typography component="span" variant="subtitle1" color="text.secondary" fontFamily="'Century Gothic', Futura, sans-serif" fontWeight="bold" fontSize='14px'>
                  Total: {total}
                  </Typography>
                  <br />
                  <Typography component="span" variant="subtitle1" color="text.secondary" fontFamily="'Century Gothic', Futura, sans-serif" fontSize='14px'>
                    Vendas: {vendas}
                  </Typography>
                  <br />
                  <Typography component="span" variant="subtitle1" color="text.secondary" fontFamily="'Century Gothic', Futura, sans-serif" fontSize='14px'>
                    Cortesia: {cortesias}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={2} lg={2} sx={{ display: 'flex', justifyContent: 'flex-center', alignItems: 'center' }}>
                <div>
                  <Typography component="span" variant="subtitle1" color="var(--green)" fontFamily="'Century Gothic', Futura, sans-serif" fontWeight="bold">
                    {valor}
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
              <Container maxWidth="lg" sx={{ m: 2, backgroundColor: 'white', borderRadius: 1, boxShadow: 2 }}>
                <Grid container spacing={3} sx={{ py: 2 }}>
                  <Grid item xs={12}>
                    <TablePdv />
                  </Grid>
                </Grid>
              </Container>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
          ) : (
            // Renderizar um indicador de carregamento enquanto os dados são buscados
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <CircularProgress />
            </div>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}