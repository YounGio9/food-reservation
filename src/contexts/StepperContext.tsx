import React from 'react'
import { types } from '../helpers'
import client from '../helpers/client'
import { getDateInFrench } from '../helpers/functions'

const StepperContext = React.createContext({} as types.Stepper)

function StepperProvider(props: { children: types.contextChildren; numberOfSteps: number }) {
   const [activeStep, setActiveStep] = React.useState<number>(0)

   const [globalData, setGlobalData] = React.useState<types.Reservation>(
      {} as types.Reservation,
   )
   const [choosenDateInString, setChoosenDateInString] = React.useState<string | null>(null)

   const [loading, setLoading] = React.useState(false)

   const addFormData = async (data: Partial<types.Reservation>) => {
      setGlobalData((prev) => ({
         ...prev,
         ...data,
      }))

      if (activeStep > props.numberOfSteps) {
         console.log('PAYLOAD \n', globalData)

         setLoading(true)

         await client
            .post('/reservations', globalData)
            .then((res) => console.log('API RESPONSE \n', res.data))
            .catch((err) => console.log(err))

         setLoading(false)
      }
   }

   React.useMemo(() => {
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
      setChoosenDateInString(getDateInFrench(date))

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
            loading,
         }}
      >
         {props.children}
      </StepperContext.Provider>
   )
}

export const useStepper = () => React.useContext(StepperContext)

export default StepperProvider
