import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';

function ExpandableButton(props) {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion expanded={expanded} onChange={handleExpand} sx={{backgroundColor:"transparent"}} elevation={0}> 
      <AccordionSummary aria-controls="content" id="header">
        <Button variant="contained" sx={{backgroundColor:'green'}}>
          <AddIcon />
        </Button>
        <Typography component='h2' variant="subtitle1" sx={{ p: 1 }} align='center' fontWeight="bold" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
          Informações Gerais Bar
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
        {props.children}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

Accordion.propTypes = {
    children: PropTypes.node,
  };

export default ExpandableButton;
