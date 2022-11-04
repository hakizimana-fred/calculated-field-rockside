import React from 'react';
import './App.css'
import CalculatedForm from './components/Form';
import { Typography } from '@mui/material';


function App() {
  return (
    <div className='container'>      
      <Typography variant='h5' mb={2}>Calculate Field Form</Typography>
      <CalculatedForm />
    </div>
  );
}




export default App;
