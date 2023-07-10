import * as React from 'react';
import logo from '../images/quero_ingresso_logo.png';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { mainListItems, quaternaryListItems, quinaryListItems, secondaryListItems, tertiaryListItems } from '../components/MUI/listItems';
import Chart from '../components/MUI/Chart';
import Deposits from '../components/MUI/Deposits';
import Orders from '../components/MUI/Orders';
import Title from '../components/MUI/Title';
import DownloadButton from '../components/Buttons/DownloadButton';
import FilterButton from '../components/Buttons/FilterButton';
import EventoAtual from '../components/MUI/EventoAtual';
import EventIcon from '@mui/icons-material/Event';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PeopleIcon from '@mui/icons-material/People';
import HistoryIcon from '@mui/icons-material/History';

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

const usuario = 'Usuário'

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
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} sx={{ backgroundColor: 'white' }} elevation={0}>
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
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt="Logo" style={{ height: '9.8vh' }} />
              <IconButton
                color="inherit"
                sx={{ marginLeft: '20px', borderRadius: '0' }}
                component={Link}
                href="/"
              >
                <Typography variant="body2" color="black" fontFamily="'Century Gothic', Futura, sans-serif">
                  Home
                </Typography>
              </IconButton>
            </Box>
            <IconButton color="black" sx={{ marginLeft: 'auto', borderRadius: '0' }}>
              <Link href='/' sx={{
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
              border: 'none'
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
              backgroundColor: 'var(--blue)'
            }}
          >
            <List component="nav">
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
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Evento Atual */}
              <Grid item xs={12} md={8} lg={9}>
                <Title>Relatório Geral</Title>
                <EventoAtual nomeEvento="Nome do Evento"
                  dataEvento="01 de janeiro de 2023"
                  localEvento="Local do Evento"
                  cidadeEvento="Cidade do Evento" />
              </Grid>
              {/* Botões */}
              <Grid item xs={12} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <FilterButton />
                <DownloadButton />
              </Grid>
              {/* Divider */}
              <Grid item xs={12}>
                <Divider sx={{ my: 1, backgroundColor: 'var(--grey)' }} />
              </Grid>
              {/* Cards */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper sx={{ height: 250, position: 'relative' }}>
                  {/* Conteúdo do card */}
                  <Typography component='h2' variant="subtitle1" sx={{ backgroundColor: 'lightblue', p: 1, mb: 2 }} align='center' fontWeight="bold" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                    <EventIcon />
                    Situação do Evento
                  </Typography>
                  <Typography variant="body1" align="center" sx={{ pt: 2 }} color='var(--grey)'>
                    Vendas iniciadas em:
                  </Typography>
                  <Typography variant="body1" align="center" color='var(--grey)'>
                    01/01/2023
                  </Typography>
                  <Typography variant="body1" align="center" sx={{ pb: 2 }} fontWeight="bold" color='var(--grey)'>
                    (Iniciado há 61 dias)
                  </Typography>
                  {/* Rodapé fixo */}
                  <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                    <Typography variant="body1" sx={{ backgroundColor: 'var(--grey-shadow)', pt: 1, mt: 2 }} align='center' fontWeight="bold">
                      Dias restantes para o evento
                    </Typography>
                    <Typography variant="body1" sx={{ backgroundColor: 'var(--grey-shadow)', pb: 1 }} align='center' fontWeight="bold" color="var(--blue)">
                      Faltam 5 dias
                    </Typography>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper sx={{ height: 250, position: 'relative' }}>
                  {/* Conteúdo do card */}
                  <Typography component='h2' variant="subtitle1" sx={{ backgroundColor: 'lightblue', p: 1, mb: 2 }} align='center' fontWeight="bold" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                    <LocalActivityIcon />
                    Ingressos Emitidos
                  </Typography>
                  <Typography variant="body1" align="center" sx={{ pt: 2 }} color='var(--grey)'>
                    <div align='center'>
                      <table>
                        <thead>
                          <tr>
                            <th colSpan='1' />
                            <th>Hoje</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>Venda:</th>
                            <td align='center'>a</td>
                            <td align='center'>a</td>
                          </tr>
                          <tr>
                            <th>Cortesias:</th>
                            <td align='center'>a</td>
                            <td align='center'>a</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td align='center'>a</td>
                            <td align='center'>a</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </ Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper sx={{ height: 250, position: 'relative' }}>
                  {/* Conteúdo do card */}
                  <Typography component='h2' variant="subtitle1" sx={{ backgroundColor: 'lightblue', p: 1, mb: 2 }} align='center' fontWeight="bold" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                    <CreditCardIcon />
                    Faturamentos
                  </Typography>
                  <Typography variant="body1" align="center" sx={{ pt: 6 }} color='var(--grey)'>
                    <div align='center'>
                      <table>
                        <tbody>
                          <tr>
                            <th>Hoje:</th>
                            <td align='center'>a</td>
                          </tr>
                          <tr>
                            <th>Total:</th>
                            <td align='center'>a</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </ Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper sx={{ height: 100 }}>
                <Typography component='h2' variant="subtitle1" sx={{ backgroundColor: 'lightblue', p: 1, mb: 1 }} align='center' fontWeight="bold" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                    <PeopleIcon />
                    Ticket Médio
                  </Typography>
                  <Typography variant="body1" align="center" sx={{ p: 1 }}>
                    R$ 00,00
                  </Typography>
                </Paper>
                <Box sx={{ my: 2 }}>
                  <Paper sx={{ height: 133 }}>
                  <Typography component='h2' variant="subtitle1" sx={{ backgroundColor: 'lightblue', p: 1, mb: 1 }} align='center' fontWeight="bold" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                    <HistoryIcon />
                      Média Diária
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ pt: 1.5 }} color='var(--grey)'>
                    <div align='center'>
                      <table>
                        <tbody>
                          <tr>
                            <th>Qtde</th>
                            <td align='center'>0</td>
                          </tr>
                          <tr>
                            <th>Valor</th>
                            <td align='center'>R$00,00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </ Typography>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
