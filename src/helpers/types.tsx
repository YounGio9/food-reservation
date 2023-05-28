export interface Stepper {
    activeStep: number
    handleNext: () => void
    handleBack: () => void
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
