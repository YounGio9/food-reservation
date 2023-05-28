export interface Stepper {
  activeStep: number
  handleNext: (step: number) => void
  handleBack: (step: number) => void
}

export type contextChildren =
  | string
  | number
  | boolean
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | React.ReactFragment
  | React.ReactPortal
  | null
  | undefined
