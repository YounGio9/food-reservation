import React from 'react'
import StepperProvider from '../../contexts/StepperContext'
import Form from './Form'

function index() {
   return (
      <StepperProvider numberOfSteps={4}>
         <Form />
      </StepperProvider>
   )
}

export default index
