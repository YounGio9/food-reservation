import React, { createContext, useState } from 'react'
import { types } from '../helpers'

const StepperContext = createContext({} as types.Stepper)

function StepperProvider(props: { children: types.contextChildren }) {
  const [activeStep, setActiveStep] = useState<number>(0)

  const handleNext = (step: number) => {
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = (step: number) => {
    setActiveStep((prev) => prev - 1)
  }

  return (
    <StepperContext.Provider
      value={{ activeStep, handleBack, handleNext }}
    >
      {props.children}
    </StepperContext.Provider>
  )
}

export const useStepper = () => React.useContext(StepperContext)

export default StepperProvider
