import React, { useEffect } from 'react'
import { 
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { totalAnimalMultiplied, totalAnimalsAdded } from '../redux/inputsSlice';

type IConverted = {
    [key: string]: number
}

const CalculatedForm: React.FC = () => {

    const [inputs, setInputs] = useState({
        sheep: '',
        goats: '',
        totalanimals: '',
        tentimestotal: '0',
    })

    const [submittedData, setSubmittedData] = useState({})

    const dispatch = useAppDispatch()
    useEffect(() => {}, [dispatch])

    // These are global state variables
    const totalAnimalsValue = useAppSelector(state => state.inputFields.inputField.totalanimals)
    const tenTimesValue = useAppSelector(state => state.inputFields.inputField.tentimestotal)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } =  e.target
        setInputs(prev => ({
            ...prev, 
            [name]: value
        }))  
      
        if (name === "sheep") {
            dispatch(totalAnimalsAdded(parseInt(value)))
            const multiplied = (parseInt(value) * 10) // I used 10 as my constant number
            dispatch(totalAnimalMultiplied(multiplied))
        }
        if (name === "goats") {
            const total_animals = parseInt(value) + totalAnimalsValue  
            dispatch(totalAnimalsAdded(total_animals))
            const multiplied = (total_animals * 10)   // I used 10 as my constant number
            dispatch(totalAnimalMultiplied(multiplied))
        }
      
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const { sheep, goats } = inputs
            // convert inputs to Integers
            const convertedData: IConverted = {
                number_sheep: parseInt(sheep),
                number_goats: parseInt(goats),
                totalAnimals: parseInt(totalAnimalsValue),
                tentimesTotal: parseInt(tenTimesValue),
            }
        
        // quick and dirty validation / checks if No value is or a Value is Not a number
        for (const key in convertedData) {
            if (isNaN(convertedData[key])) {
                alert('One key is invalid')
                return false
            }
            continue
        }

         setSubmittedData(prev => ({
            ...prev, 
            convertedData
         }))
    }



    const { sheep, goats, totalanimals, tentimestotal  } = inputs
    return (
     <>
      <form className='form' onSubmit={handleSubmit}>
        <Grid container direction="column" >
              <TextField
                name="sheep" 
                placeholder='Number of sheep'
                className='text-fields'
                value={sheep}
                onChange={handleChange}
              /> 
               <TextField
                name="goats" 
                placeholder='Number of Goats'
                className='text-fields'
                value={goats}
                onChange={handleChange}
              /> 
               <TextField
                name="totalanimals" 
                placeholder='Total Animals'
                className='text-fields'
                value={totalAnimalsValue ? totalAnimalsValue : totalanimals}
                onChange={handleChange}
              /> 
            <TextField
                name="tentimestotal" 
                placeholder='Ten times total animals'
                className='text-fields' 
                value={tenTimesValue ? tenTimesValue : parseInt(tentimestotal)}
                onChange={handleChange}
              /> 
        </Grid>
        <Button variant='contained' color="primary" type="submit">Submit</Button>
      </form>
        
        {Object.keys(submittedData).length > 0 ? (
            <pre>
                {JSON.stringify(submittedData, null, 4)}
            </pre>
        ): ''}

        
      </>
    )
  }
 export default CalculatedForm 