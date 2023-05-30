export interface Stepper {
    activeStep: number
    handleNext: (data: Reservation) => void
    handleBack: () => void
    addFormData: (data: Reservation) => void
    globalData: Reservation
    choosenDateInString: string | null
    setDate: (date: Date) => void
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

export interface Reservation {
    adultsGuests: number
    childrenGuests: number
    reservationDate: string
    reservationTime: string
    typeOfMeal: string
    options?: string[]
    comment?: string
    firstname: string
    lastname: string
    email: string
    phoneNumber: number
    country: string
}

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
