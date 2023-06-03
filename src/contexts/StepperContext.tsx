import React, { createContext, useMemo, useState } from 'react'
import { types } from '../helpers'
import client from '../helpers/client'

const StepperContext = createContext({} as types.Stepper)

function StepperProvider(props: { children: types.contextChildren; numberOfSteps: number }) {
   const [activeStep, setActiveStep] = useState<number>(0)

   const [globalData, setGlobalData] = useState<types.Reservation>({} as types.Reservation)
   const [choosenDateInString, setChoosenDateInString] = useState<string | null>(null)

   const addFormData = async (data: Partial<types.Reservation>) => {
      setGlobalData((prev) => ({
         ...prev,
         ...data,
      }))

      if (activeStep > props.numberOfSteps) {
         console.log('PAYLOAD \n', globalData)

         await client
            .post('/reservations', globalData)
            .then((res) => console.log('API RESPONSE \n', res.data))
            .catch((err) => console.log(err))
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

   const setDate = (date: Date) => {
      console.log('choosen Date', date)
      setChoosenDateInString(
         [
            types.Days[date.getDay()].toLocaleLowerCase(),
            date.getDate(),
            types.Months[date.getMonth()].toLocaleLowerCase(),
            date.getFullYear(),
         ].join(' '),
      )

      handleNext({
         reservationDate: date.toLocaleDateString('en-GB'),
      } as types.Reservation)
   }

   const setHour = (hour: types.Schedule) => {
      console.log('chossen time', hour)

      setChoosenDateInString((prev) => `${prev}  ${hour}`)

      handleNext({
         reservationTime: hour,
      } as types.Reservation)
   }

   return (
      <StepperContext.Provider
         value={{
            activeStep,
            addFormData,
            handleBack,
            handleNext,
            globalData,
            setDate,
            setHour,
            choosenDateInString,
         }}
      >
         {props.children}
      </StepperContext.Provider>
   )
}

export const useStepper = () => React.useContext(StepperContext)

export default StepperProvider
