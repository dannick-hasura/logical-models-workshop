import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useQuery, gql} from '@apollo/client';
import {
   Box,
   Button,
   Container,
   Grid,
   Typography,
   TextField,
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Drawer,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   Toolbar,
   Divider,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventNoteIcon from '@mui/icons-material/EventNote';
import InfoIcon from '@mui/icons-material/Info';

const drawerWidth = 240;

const GET_PATIENT_INFO = gql`
   query MyQuery($searchText: String!) {
      patient_info_masked(args: {search_text: $searchText}) {
         patient_name
         patient_id
         patient_birth_year
         masked_contact_number
         patient_gender
         street_number
         most_recent_appointment
      }
   }
`;

const Dashboard = () => {
   const [searchText, setSearchText] = useState('');
   const [searchInput, setSearchInput] = useState('');
   const {loading, error, data} = useQuery(GET_PATIENT_INFO, {
      variables: {searchText: searchInput},
   });

   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         setSearchInput(searchText);
      }
   };

   const handleSearch = () => {
      setSearchInput(searchText);
   };

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error :(</p>;

   return (
      <Box sx={{display: 'flex'}}>
         <Drawer
            variant='permanent'
            sx={{
               width: drawerWidth,
               flexShrink: 0,
               '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
               },
            }}
         >
            <Toolbar />
            <List>
               <ListItem>
                  <ListItemIcon>
                     <LocalHospitalIcon />
                  </ListItemIcon>
                  <ListItemText
                     primaryTypographyProps={{style: {fontWeight: 'bold'}}}
                     primary='Health Clinic'
                  />
               </ListItem>
               <Divider />
               <ListItem button key='appointments' component={Link} to='/'>
                  <ListItemIcon>
                     <EventNoteIcon />
                  </ListItemIcon>
                  <ListItemText primary='Appointments' />
               </ListItem>
               <ListItem button key='patients' component={Link} to='/'>
                  <ListItemIcon>
                     <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary='Patient Search' />
               </ListItem>
            </List>
         </Drawer>
         <Box component='main' sx={{flexGrow: 1, p: 3}}>
            <Container maxWidth='lg'>
               <Grid container spacing={3}>
                  <Grid item xs={12}>
                     <Typography variant='h4'>Clinic Patient Search</Typography>
                  </Grid>
                  <Grid item xs={12}>
                     <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <TextField
                           label='Search'
                           value={searchText}
                           onChange={(e) => setSearchText(e.target.value)}
                           onKeyDown={handleKeyDown}
                           sx={{width: 'calc(50% - 80px)', mr: 2}}
                           fullWidth
                        />
                        <Button variant='contained' onClick={handleSearch}>
                           Search
                        </Button>
                     </Box>
                  </Grid>
                  <Grid item xs={12}>
                     {data?.patient_info_masked ? (
                        <TableContainer component={Paper}>
                           <Table>
                              <TableHead>
                                 <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>
                                       Patient Name
                                    </TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>
                                       Birth Year
                                    </TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>
                                       Gender
                                    </TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>
                                       Phone Number
                                    </TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>
                                       Street Number
                                    </TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>
                                       Previous Appointment
                                    </TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>
                                       Patient ID
                                    </TableCell>
                                 </TableRow>
                              </TableHead>
                              <TableBody>
                                 {data.patient_info_masked.map(
                                    (patient_info) => (
                                       <TableRow key={patient_info.patient_id}>
                                          <TableCell>
                                             {patient_info.patient_name}
                                          </TableCell>
                                          <TableCell>
                                             {patient_info.patient_birth_year}
                                          </TableCell>
                                          <TableCell>
                                             {patient_info.patient_gender}
                                          </TableCell>
                                          <TableCell>
                                             {
                                                patient_info.masked_contact_number
                                             }
                                          </TableCell>
                                          <TableCell>
                                             {patient_info.street_number}
                                          </TableCell>
                                          <TableCell>
                                             {
                                                patient_info.most_recent_appointment
                                             }
                                          </TableCell>
                                          <TableCell>
                                             {patient_info.patient_id}
                                          </TableCell>
                                       </TableRow>
                                    )
                                 )}
                              </TableBody>
                           </Table>
                        </TableContainer>
                     ) : (
                        <p>No results found.</p>
                     )}
                  </Grid>
               </Grid>
            </Container>
         </Box>
      </Box>
   );
};

export default Dashboard;
