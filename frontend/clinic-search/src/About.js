import React from 'react';
import {Container, Typography} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const About = () => {
   return (
      <Container>
         <LocalHospitalIcon style={{fontSize: 100}} />
         <Typography variant='h2'>About Health Clinic</Typography>
         <Typography variant='body1'>
            Health Clinic is a comprehensive healthcare system providing quality
            care for all patients. We believe in the power of medicine and
            technology working together to improve patient outcomes.
         </Typography>
      </Container>
   );
};

export default About;
