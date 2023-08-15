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
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, quaternaryListItems, quinaryListItems, secondaryListItems, tertiaryListItems } from '../../components/NavigationSideBar/SideBar';
import Title from '../../components/Outros/Title';
import DownloadButton from '../../components/Buttons/DownloadButton';
import FilterButton from '../../components/Buttons/FilterButton';
import EventoAtual from '../../components/Outros/EventoAtual';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentIcon from '@mui/icons-material/Payment';
import PixIcon from '@mui/icons-material/Pix';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PeopleIcon from '@mui/icons-material/People';
import HistoryIcon from '@mui/icons-material/History';
import ExpandableButton from '../../components/Buttons/Accordion';
import ContainerCharts from '../../components/Charts/ContainerCharts';
import DonutChart from '../../components/Charts/DonutChart';
import BarChartHorizontal from '../../components/Charts/BarChartHorizontal';
import LoteChart from '../../components/Charts/LoteChart';
import VpTChart from '../../components/Charts/VpTChart';
import FaturamentoChart from '../../components/Charts/FaturamentoChart';
import PeriodicChart from '../../components/Charts/PeriodicChart';
import TimeChart from '../../components/Charts/TimeChart';
import Ranking from '../../components/Tables/Charts/Ranking';
import CustomizedTables from '../../components/Tables/Charts/Table';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useLogin } from '../../model/loginContext';
import './home.css'

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

const dataVendas = [
  { tipo: 'Vendas', quantidade: 100 },
  { tipo: 'Cortesias', quantidade: 50 },
];

const dataVpT = [
  { tipo: 'Vendas', Vendas: 50 },
  { tipo: 'Cortesias', Cortesias: 0 },
];

const dataPeriodic = [
  { periodo: '1', Venda: 100, Cortesia: 50, Total: 150, Acumulado: 65 },
  { periodo: '2', Venda: 200, Cortesia: 100, Total: 300, Acumulado: 165 },
  { periodo: '3', Venda: 150, Cortesia: 75, Total: 225, Acumulado: 240 },
  { periodo: '4', Venda: 300, Cortesia: 150, Total: 450, Acumulado: 390 },
];

const dataTime = [
  { horario: '12:00', PDV: 0, WEB: 80},
  { horario: '13:00', PDV: 2, WEB: 160 },
  { horario: '14:00', PDV: 6, WEB: 150 },
  { horario: '15:00', PDV: 15, WEB: 155 },
];

const tipoIngressos = [
  { tipo: 'Camarote', Camarote: 100 },
  { tipo: 'Pista', Pista: 50 },
];

const faturamento = [
  { tipo: 'Dinheiro', Dinheiro: 90 },
  { tipo: 'Crédito', Crédito: 50 },
  { tipo: 'Débito', Débito: 70 },
  { tipo: 'Pix', Pix: 50 },
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

export default function Home() {
  const { login } = useLogin();
  const usuario = login;
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
              <Grid item xs={12} md={8} lg={9}>
                <Title>Relatório Geral</Title>
                <EventoAtual nomeEvento="Nome do Evento"
                  dataEvento="01 de janeiro de 2023"
                  localEvento="Local do Evento"
                  cidadeEvento="Cidade do Evento" />
              </Grid>
              {/* Botões */}
              <Grid item xs={12} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'flex-center', alignItems: 'center' }}>
                <FilterButton />
                <DownloadButton />
              </Grid>
              {/* Divider */}
              <Grid item xs={12}>
                <Divider sx={{ my: 1, backgroundColor: 'var(--grey)' }} />
              </Grid>
              {/* Cards */}
              <Grid item xs={12} md={4} lg={3}>
                {/* Card 1 */}
                <Paper sx={{ height: 260, position: 'relative' }}>
                  <Typography component='h2' variant="subtitle1" sx={{ backgroundColor: 'lightblue', p: 1, mb: 2 }} align='center' fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                    <EventIcon sx={{ marginRight: 2, marginBottom: 0.5 }}/>
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
                  {/* Rodapé */}
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
                {/* Card 2 */}
                <Paper sx={{ height: 260, position: 'relative' }}>
                  {/* Conteúdo do card */}
                  <Typography component='h2' variant="subtitle1" sx={{ backgroundColor: 'lightblue', p: 1, mb: 2 }} align='center' fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                    <LocalActivityIcon sx={{ marginRight: 2, marginBottom: 0.5 }} />
                    Ingressos Emitidos
                  </Typography>
                  <Typography variant="body1" align="center" sx={{ pt: 2 }} color='var(--grey)'>
                    <div align='center'>
                      <table style={{ borderCollapse: 'collapse' }}>
                        <thead>
                          <tr>
                            <th colSpan="1" />
                            <th style={{ padding: '8px', textAlign: 'center' }}>Hoje</th>
                            <th style={{ padding: '8px', textAlign: 'center' }}>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th style={{ padding: '8px', textAlign: 'center' }}>Venda:</th>
                            <td align="center" style={{ padding: '8px', textAlign: 'center' }}>15</td>
                            <td align="center" style={{ padding: '8px', textAlign: 'center' }}>654</td>
                          </tr>
                          <tr>
                            <th style={{ padding: '8px', borderTop: '1px solid var(--grey-shadow)', textAlign: 'center' }}>Cortesias:</th>
                            <td align="center" style={{ padding: '8px', borderTop: '1px solid var(--grey-shadow)', textAlign: 'center' }}>0</td>
                            <td align="center" style={{ padding: '8px', borderTop: '1px solid var(--grey-shadow)', textAlign: 'center' }}>0</td>
                          </tr>
                          <tr>
                            <th style={{ padding: '8px', borderTop: '1px solid var(--grey-shadow)', color: 'var(--blue)', textAlign: 'center' }}>Total:</th>
                            <td align="center" style={{ padding: '8px', borderTop: '1px solid var(--grey-shadow)', color: 'var(--blue)', textAlign: 'center' }}>15</td>
                            <td align="center" style={{ padding: '8px', borderTop: '1px solid var(--grey-shadow)', color: 'var(--blue)', textAlign: 'center' }}>654</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </ Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={5} lg={4}>
                {/* Card 3 */}
                <Paper sx={{ height: 260, position: 'relative', overflow: 'auto' }}>
                  <Typography component='h2' variant="subtitle1" sx={{ backgroundColor: 'lightblue', p: 1, mb: 2, width: '100%' }} align='center' fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                    <CreditCardIcon sx={{ marginRight: 2, marginBottom: 0.5 }} />
                    Faturamentos
                  </Typography>
                  <Typography variant="body1" align="center" sx={{ p: 0  }} color='var(--grey)'>
                    <div align='center'>
                      <table style={{ borderCollapse: 'collapse' }}>
                        <thead>
                          <tr>
                            <th colSpan="1" />
                            <th style={{ padding: '4px', textAlign: 'center' }}>WEB</th>
                            <th style={{ padding: '4px', textAlign: 'center' }}>PDV</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th style={{ padding: '4px', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
                              <AttachMoneyIcon sx={{ marginRight: 1, color: 'green'}}/>
                              Dinheiro:
                            </th>
                            <td align="center" style={{ padding: '4px', textAlign: 'center' }}>1.000.000,00</td>
                            <td align="center" style={{ padding: '4px', textAlign: 'center' }}>1.000.000,00</td>
                          </tr>
                          <tr>
                            <th style={{ padding: '4px', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
                              <CreditCardIcon sx={{ marginRight: 1, color: 'var(--blue)'}}/>
                              Crédito:
                            </th>
                            <td align="center" style={{ padding: '4px', textAlign: 'center' }}>1.000.000,00</td>
                            <td align="center" style={{ padding: '4px', textAlign: 'center' }}>1.000.000,00</td>
                          </tr>
                          <tr>
                            <th style={{ padding: '4px', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
                              <CreditCardIcon sx={{ marginRight: 1, color: 'var(--blue)'}}/>
                              Débito:
                            </th>
                            <td align="center" style={{ padding: '4px', textAlign: 'center' }}>1.000.000,00</td>
                            <td align="center" style={{ padding: '4px', textAlign: 'center' }}>1.000.000,00</td>
                          </tr>
                          <tr>
                            <th style={{ padding: '4px', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
                              <PixIcon sx={{ marginRight: 1, color: 'LightSeaGreen' }} />
                              Pix:
                            </th>
                            <td align="center" style={{ padding: '4px', textAlign: 'center' }}>1.000.000,00</td>
                            <td align="center" style={{ padding: '4px', textAlign: 'center' }}>1.000.000,00</td>
                          </tr>
                          <tr>
                            <th style={{ padding: '4px', borderTop: '1px solid var(--grey-shadow)', color: 'var(--blue)', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
                              <MonetizationOnIcon sx={{ marginRight: 1, color: 'DarkOrange' }} />
                              Total:
                            </th>
                            <td align="center" style={{ padding: '4px', borderTop: '1px solid var(--grey-shadow)', color: 'var(--blue)', textAlign: 'center' }}>1.000.000,00</td>
                            <td align="center" style={{ padding: '4px', borderTop: '1px solid var(--grey-shadow)', color: 'var(--blue)', textAlign: 'center' }}>1.000.000,00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </ Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={2}>
                {/* Card 4 */}
                <Paper sx={{ height: 105 }}>
                  <Typography component='h2' variant="subtitle1" sx={{ backgroundColor: 'lightblue', p: 1, mb: 1 }} align='center' fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                    <PeopleIcon sx={{ marginRight: 2, marginBottom: 0.5 }} />
                    Ticket Médio
                  </Typography>
                  <Typography variant="body1" align="center" sx={{ p: 1 }}>
                    R$ 30,00
                  </Typography>
                </Paper>
                <Box sx={{ my: 2 }}>
                  {/* Card 5 */}
                  <Paper sx={{ height: 138 }}>
                    <Typography component='h2' variant="subtitle1" sx={{ backgroundColor: 'lightblue', p: 1, mb: 1 }} align='center' fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                      <HistoryIcon sx={{ marginRight: 2, marginBottom: 0.5 }} />
                      Média Diária
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ pb: 1.5 }} color='var(--grey)'>
                      <div align='center'>
                      <table>
                        <tbody>
                          <tr>
                            <th style={{ padding: '8px', textAlign: 'center' }}>Qtde:</th>
                            <td align='center' style={{ padding: '8px', textAlign: 'center' }}>7</td>
                          </tr>
                          <tr>
                            <th style={{ padding: '8px', borderTop: '1px solid var(--grey-shadow)', color: 'var(--blue)', textAlign: 'center' }}>Valor:</th>
                            <td align='center' style={{ padding: '8px', borderTop: '1px solid var(--grey-shadow)', color: 'var(--blue)', textAlign: 'center' }}>R$ 157,00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    </ Typography>
                  </Paper>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <ExpandableButton title="Informações Gerais Bar">
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={3}>
                      <Paper sx={{ height: 133 }}>
                        <Typography component='h2' variant="subtitle1" sx={{ backgroundColor: 'lightblue', p: 1, mb: 2 }} align='center' fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                          Qtde de Caixas
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ pt: 1.5 }} color='var(--grey)' fontWeight="bold">
                          0 caixas
                        </ Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                      <Paper sx={{ height: 133 }}>
                        <Typography component='h2' variant="subtitle1" sx={{ backgroundColor: 'lightblue', p: 1, mb: 2 }} align='center' fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                          Itens Vendidos
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ pt: 1.5 }} color='var(--blue)' fontWeight="bold">
                          0
                        </ Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                      <Paper sx={{ height: 133 }}>
                        <Typography component='h2' variant="subtitle1" sx={{ backgroundColor: 'lightblue', p: 1, mb: 2 }} align='center' fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                          Faturamento Bar
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ p: 1 }} color='green' fontWeight="bold">
                          R$ 0,00
                        </Typography>
                      </Paper>
                      <Box sx={{ my: 2 }}>
                        <Paper sx={{ height: 133 }}>
                          <Typography component='h2' variant="subtitle1" sx={{ backgroundColor: 'green', color: 'white', p: 1, mb: 2 }} align='center' fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                            Faturamento (Ing. + Bar)
                          </Typography>
                          <Typography variant="body1" align="center" sx={{ pt: 1.5 }} color='green' fontWeight="bold">
                            R$ 0,00
                          </ Typography>
                        </Paper>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                      <Paper sx={{ height: 133 }}>
                        <Typography component='h2' variant="subtitle1" sx={{ backgroundColor: 'lightblue', p: 1, mb: 2 }} align='center' fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                          Ticket Médio Bar
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ p: 1 }} fontWeight="bold">
                          R$ 0,00
                        </Typography>
                      </Paper>
                      <Box sx={{ my: 2 }}>
                        <Paper sx={{ height: 133 }}>
                          <Typography component='h2' variant="subtitle1" sx={{ backgroundColor: '#FCA503', p: 1, mb: 2 }} align='center' fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                            Ticket Médio (Ing. + Bar)
                          </Typography>
                          <Typography variant="body1" align="center" sx={{ pt: 1.5 }} color='#FCA503' fontWeight="bold">
                            R$ 0,00
                          </ Typography>
                        </Paper>
                      </Box>
                    </Grid>
                  </Grid>
                </ExpandableButton>
              </Grid>
              <ContainerCharts
                button1Content={
                  <Grid container spacing={3}>
                    {/* Chart 1 */}
                    <Grid item xs={12} md={6} lg={6}>
                      <DonutChart data={dataVendas} />
                      <CustomizedTables />
                    </Grid>
                    {/* Chart 2 */}
                    <Grid item xs={12} md={6} lg={6}>
                      <BarChartHorizontal data={tipoIngressos} />
                      <CustomizedTables />
                    </Grid>
                    {/* Chart 3 */}
                    <Grid item xs={12} md={12} lg={12}>
                      <LoteChart data={lote} />
                      <CustomizedTables />
                    </Grid>
                    {/* Chart 4 */}
                    <Grid item xs={12} md={12} lg={12}>
                      <VpTChart data={dataVpT} />
                      <CustomizedTables />
                    </Grid>
                    <Grid xs={12}>
                      <Ranking />
                    </Grid>
                    {/* Chart 5*/}
                    <Grid item xs={12} md={12} lg={12}>
                      <FaturamentoChart data={faturamento} />
                      <CustomizedTables />
                    </Grid>
                    {/* Chart 6 */}
                    <Grid xs={12}>
                      <PeriodicChart data={dataPeriodic} />
                    </Grid>
                    {/* Chart 7 */}
                    <Grid xs={12}>
                      <TimeChart data={dataTime} />
                    </Grid>
                  </Grid>
                }
                button2Content={
                  <div>
                    <h1>Título</h1>
                    <p>Conteúdo</p>
                  </div>
                }
              />
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
