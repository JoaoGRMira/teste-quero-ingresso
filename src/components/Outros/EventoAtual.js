import * as React from 'react';
import Typography from '@mui/material/Typography';

function EventoAtual(props) {
  return (
    <div>
      <Typography component="span" variant="subtitle1" color="text.primary" fontFamily="'Century Gothic', Futura, sans-serif">
        Evento: &nbsp;
      </Typography>
      <Typography component="span" variant="subtitle1" color="text.primary" fontFamily="'Century Gothic', Futura, sans-serif" fontWeight="bold">
        {props.nomeEvento}
      </Typography>
      <br />
      <Typography component="span" variant="subtitle1" color="text.secondary" fontFamily="'Century Gothic', Futura, sans-serif">
        Data: &nbsp;
      </Typography>
      <Typography component="span" variant="subtitle1" color="text.secondary" fontFamily="'Century Gothic', Futura, sans-serif">
        {props.dataEvento}
      </Typography>
      <br />
      <Typography component="span" variant="subtitle1" color="text.secondary" fontFamily="'Century Gothic', Futura, sans-serif">
        Local: &nbsp;
      </Typography>
      <Typography component="span" variant="subtitle1" color="text.secondary" fontFamily="'Century Gothic', Futura, sans-serif">
        {props.localEvento}
      </Typography>
      <br />
      <Typography component="span" variant="subtitle1" color="text.secondary" fontFamily="'Century Gothic', Futura, sans-serif">
        Cidade: &nbsp;
      </Typography>
      <Typography component="span" variant="subtitle1" color="text.secondary" fontFamily="'Century Gothic', Futura, sans-serif">
        {props.cidadeEvento}
      </Typography>
    </div>
  );
}

export default EventoAtual;
