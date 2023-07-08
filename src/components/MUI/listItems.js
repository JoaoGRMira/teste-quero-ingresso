import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset sx={{ fontSize: '1.2rem', position: 'relative', backgroundColor: 'var(--blue)', color: 'white' }}>
    Mais utilizados
    </ListSubheader>
    <ListItemButton sx={{color: 'white'}}>
      <ListItemIcon>
        <DashboardIcon sx={{color: 'white'}}/>
      </ListItemIcon>
      <ListItemText primary="Geral" />
    </ListItemButton>
    <ListItemButton sx={{color: 'white'}}>
      <ListItemIcon>
        <ShoppingCartIcon sx={{color: 'white'}}/>
      </ListItemIcon>
      <ListItemText primary="Classes" />
    </ListItemButton>
    <ListItemButton sx={{color: 'white'}}>
      <ListItemIcon>
        <PeopleIcon sx={{color: 'white'}}/>
      </ListItemIcon>
      <ListItemText primary="PDVs" />
    </ListItemButton>
    <ListItemButton sx={{color: 'white'}}>
      <ListItemIcon>
        <BarChartIcon sx={{color: 'white'}}/>
      </ListItemIcon>
      <ListItemText primary="Diários" />
    </ListItemButton>
    <ListItemButton sx={{color: 'white'}}>
      <ListItemIcon>
        <LayersIcon sx={{color: 'white'}}/>
      </ListItemIcon>
      <ListItemText primary="Numerados" />
    </ListItemButton>
    <ListItemButton sx={{color: 'white'}}>
      <ListItemIcon>
        <LayersIcon sx={{color: 'white'}}/>
      </ListItemIcon>
      <ListItemText primary="Cancelados" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset sx={{ fontSize: '1.2rem', position: 'relative', backgroundColor: 'var(--blue)', color: 'white' }}>
    Rel. Analíticos
    </ListSubheader>
    <ListItemButton sx={{color: 'white'}}>
      <ListItemIcon>
        <AssignmentIcon sx={{color: 'white'}}/>
      </ListItemIcon>
      <ListItemText primary="Comissários" />
    </ListItemButton>
    <ListItemButton sx={{color: 'white'}}>
      <ListItemIcon>
        <AssignmentIcon sx={{color: 'white'}}/>
      </ListItemIcon>
      <ListItemText primary="Site Detalhados" />
    </ListItemButton>
    <ListItemButton sx={{color: 'white'}}>
      <ListItemIcon>
        <AssignmentIcon sx={{color: 'white'}}/>
      </ListItemIcon>
      <ListItemText primary="Detalhados" />
    </ListItemButton>
  </React.Fragment>
);

export const tertiaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset sx={{ fontSize: '1.2rem', position: 'relative', backgroundColor: 'var(--blue)', color: 'white' }}>
    Rel. Analíticos
    </ListSubheader>
    <ListItemButton sx={{color: 'white'}}>
      <ListItemIcon>
        <AssignmentIcon sx={{color: 'white'}}/>
      </ListItemIcon>
      <ListItemText primary="Comissários" />
    </ListItemButton>
    <ListItemButton sx={{color: 'white'}}>
      <ListItemIcon>
        <AssignmentIcon sx={{color: 'white'}}/>
      </ListItemIcon>
      <ListItemText primary="Site Detalhados" />
    </ListItemButton>
    <ListItemButton sx={{color: 'white'}}>
      <ListItemIcon>
        <AssignmentIcon sx={{color: 'white'}}/>
      </ListItemIcon>
      <ListItemText primary="Detalhados" />
    </ListItemButton>
  </React.Fragment>
);