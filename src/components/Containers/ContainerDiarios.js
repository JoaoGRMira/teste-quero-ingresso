import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const ContainerDiarios = ({ button1Content, button2Content }) => {
    const [activeButton, setActiveButton] = useState(1);

    const handleButtonClick = (buttonNumber) => {
        setActiveButton(buttonNumber);
    };

    return (
        <Grid item xs={12}>
            <Box textAlign="center">
                <Button onClick={() => handleButtonClick(1)} variant="contained" className={activeButton === 1 ? 'active' : ''} sx={{
                    backgroundColor: 'white', color: '#7e7e7e', fontWeight: 'bold', '&:hover': {
                        backgroundColor: 'white', boxShadow: "none"
                    }, boxShadow: "none", mb: 3, mt: 1
                }}>
                    Classes
                </Button>
                <Button onClick={() => handleButtonClick(2)} variant="contained" className={activeButton === 2 ? 'active' : ''} sx={{
                    backgroundColor: 'white', color: '#7e7e7e', fontWeight: 'bold', '&:hover': {
                        backgroundColor: 'white', boxShadow: "none"
                    }, boxShadow: "none", mb: 3, mt: 1
                }}>
                    PDVs
                </Button>
                <Box sx={{ backgroundColor: 'white', borderTop: '1px solid var(--grey-shadow)' }}>
                    <Typography variant="h6" component="div" mt={2} p={2}>
                        {activeButton === 1 ? (
                            <div>{button1Content}</div>
                        ) : (
                            <div>{button2Content}</div>
                        )}
                    </Typography>
                </Box>
                <style jsx>{`
                    .active {
                    background-color: #7e7e7e !important;
                    color: white
                    }
                `}</style>
            </Box>
        </Grid>
    );
};

export default ContainerDiarios;
