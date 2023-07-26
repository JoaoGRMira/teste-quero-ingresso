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
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { mainListItems, quaternaryListItems, quinaryListItems, secondaryListItems, tertiaryListItems } from '../../components/NavigationSideBar/SideBar';
import Chart from '../../components/Outros/Chart';
import Deposits from '../../components/Outros/Deposits';
import Orders from '../../components/Outros/Orders';
import Title from '../../components/Outros/Title';
import DownloadButton from '../../components/Buttons/DownloadButton';
import FilterButton from '../../components/Buttons/FilterButton';
import EventoAtual from '../../components/Outros/EventoAtual';
import EventIcon from '@mui/icons-material/Event';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PeopleIcon from '@mui/icons-material/People';
import HistoryIcon from '@mui/icons-material/History';
import Accordion from '../../components/Buttons/Accordion';
import ContainerCharts from '../../components/Charts/ContainerCharts';
import DonutChart from '../../components/Charts/DonutChart';
import BarChartHorizontal from '../../components/Charts/BarChartHorizontal';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import LoteChart from '../../components/Charts/LoteChart';
import VpTChart from '../../components/Charts/VpTChart';
import PeriodicChart from '../../components/Charts/PeriodicChart';
import TimeChart from '../../components/Charts/TimeChart';
import Ranking from '../../components/Tables/Charts/Ranking';
import CustomizedTables from '../../components/Tables/Charts/Table';
import SearchBar from '../../components/Outros/SearchBar';
import TableClasses from '../../components/Tables/Classes/TableClasses';
import ExpandableButton from '../../components/Buttons/Accordion';
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
      border: 0,
  },
}));

const drawerWidth = 240;

const usuario = 'Usuário';

const defaultTheme = createTheme();

const dataTabela = [
  { tipo: 'Cortesia', qtde: 10, porcentagem: 20 },
  { tipo: 'Venda', qtde: 30, porcentagem: 60 },
  { tipo: 'Total', qtde: 40, porcentagem: 80 },
];

const dataVendas = [
  { tipo: 'Vendas', quantidade: 100 },
  { tipo: 'Cortesias', quantidade: 50 },
];

const dataVpT = [
  { tipo: 'Vendas', Vendas: 50 },
  { tipo: 'Cortesias', Cortesias: 0 },
];

const dataPeriodic = [
  { periodo: '4', quantidade: 100 },
  { periodo: '3', quantidade: 50 },
  { periodo: '2', quantidade: 25 },
  { periodo: '1', quantidade: 65 },
];

const dataTime = [
  { horario: '12:00', quantidade: 100 },
  { horario: '13:00', quantidade: 50 },
  { horario: '14:00', quantidade: 25 },
  { horario: '15:00', quantidade: 65 },
];

const tipoIngressos = [
  { tipo: 'Camarote', Camarote: 100 },
  { tipo: 'Pista', Pista: 50 },
];

const lote = [
  { tipo: '1° Lote', quantidade: 100 },
];

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

export default function Numerados() {
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
              <Grid item xs={12} md={5} lg={5}>
                <Title>Relatório Numerados</Title>
                <EventoAtual nomeEvento="Nome do Evento"
                  dataEvento="01 de janeiro de 2023"
                  localEvento="Local do Evento"
                  cidadeEvento="Cidade do Evento" />
              </Grid>
              {/* Infos */}
              <Grid item xs={12} md={5} lg={5} sx={{ display: 'flex', justifyContent: 'flex-center', alignItems: 'center' }}>
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
              <Grid item xs={12} md={2} lg={2} sx={{ display: 'flex', justifyContent: 'flex-center', alignItems: 'center' }}>
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
                  <SearchBar label="Buscar classe" />

                  </Grid>
                  <Grid item xs={12}>
                    <TableClasses />
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
