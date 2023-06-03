export interface Stepper {
   activeStep: number
   handleNext: (data: Reservation) => void
   handleBack: () => void
   addFormData: (data: Reservation) => void
   globalData: Reservation
   choosenDateInString: string | null
   setDate: (date: Date) => void
   setHour: (time: Schedule) => void
}

export type contextChildren =
   | string
   | number
   | boolean
   | React.ReactElement<any, string | React.JSXElementConstructor<any>>
   | React.ReactFragment
   | React.ReactPortal

export interface Step {
   label: string
   element: () => React.JSX.Element
}

export interface Reservation extends Client {
   adultsGuests: number
   childrenGuests: number
   reservationDate: string
   reservationTime: string
   typeOfMeal: string
   options?: string[]
   comment?: string
}

export interface Client {
   firstname: string
   lastname: string
   email: string
   phoneNumber: number | string
   country?: string
}

export type Schedule =
   | '12:00'
   | '12:30'
   | '13:00'
   | '13:30'
   | '14:00'
   | '19:00'
   | '19:30'
   | '20:00'
   | '20:30'
   | '21:00'
   | '21:30'
   | '22:00'

export enum Days {
   'Mardi' = 2,
   'Mercredi',
   'Jeudi',
   'Vendredi',
   'Samedi',
}

export enum Months {
   'Janvier' = 0,
   'Février',
   'Mars',
   'Avril',
   'Mai',
   'Juin',
   'Août',
   'Septembre',
   'Octobre',
   'Novembre',
   'Décembre',
}
