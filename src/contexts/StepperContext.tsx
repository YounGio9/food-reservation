import React, { createContext, useEffect, useMemo, useState } from 'react'
import { types } from '../helpers'

const StepperContext = createContext({} as types.Stepper)

function StepperProvider(props: {
    children: types.contextChildren
    numberOfSteps: number
}) {
    const [activeStep, setActiveStep] = useState<number>(0)

    const [globalData, setGlobalData] = useState<types.Reservation>(
        {} as types.Reservation,
    )

    const addFormData = (data: Partial<types.Reservation>) => {
        if (activeStep < props.numberOfSteps) {
            setGlobalData((prev) => ({
                ...prev,
                ...data,
            }))
        }
    }

    useMemo(() => {
        console.log(globalData)
    }, [globalData])

    const handleNext = (data: types.Reservation) => {
        console.log('submit')
        addFormData(data)
        setActiveStep((prev) => prev + 1)
    }

    const handleBack = () => {
        setActiveStep((prev) => (prev > 0 ? prev - 1 : prev))
    }

    return (
        <StepperContext.Provider
            value={{ activeStep, addFormData, handleBack, handleNext }}
        >
            {props.children}
        </StepperContext.Provider>
    )
}

export const useStepper = () => React.useContext(StepperContext)

export default StepperProvider
