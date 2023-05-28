import React from 'react'
import StepperProvider from '../../contexts/StepperContext'
import Form from './Form'

function index() {
    return (
        <StepperProvider>
            <Form />
        </StepperProvider>
    )
}

export default index
