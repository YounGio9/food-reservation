import React from 'react'
import { FormControl, TextField } from '@mui/material'
import * as yup from 'yup'
import { FormikConfig, useFormik } from 'formik'
import { types } from '../../../helpers'
import BackButton from '../Buttons/BackButton'
import { IoArrowForwardOutline } from 'react-icons/io5'
import { useStepper } from '../../../contexts/StepperContext'

function Contact() {
   const [error, setError] = React.useState<boolean>(false)

   const { handleNext } = useStepper()

   const validationSchema = yup.object({
      lastname: yup.string().required('Veuillez entrz votre nom !'),
      firstname: yup.string().required('Veuillez entrez votre prénom !'),
      email: yup.string().email('Veuillez entrer un email valide !').required(),
      phoneNumber: yup.string().required(),
   })

   const initialValues: Partial<types.Reservation> = {
      lastname: '',
      firstname: '',
      email: '',
      phoneNumber: '',
   }

   const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: (vals) => {
         if (error) return

         const phoneInputField = document.getElementById('phoneNumber')

         var iti = window.intlTelInputGlobals.getInstance(phoneInputField as Element)
         const countryData = iti.getSelectedCountryData()

         vals.country = countryData.name
         vals.phoneNumber = `+${countryData.dialCode} ${vals.phoneNumber}`

         console.log(vals)

         handleNext(vals)

         /*
          *
          *  Belgique // 487512369
          * */
      },
   } as FormikConfig<types.Reservation>)

   const handleChangePhoneNumber = (e: React.ChangeEvent) => {
      formik.handleChange(e)
      const phoneInputField = document.getElementById('phoneNumber')

      var iti = window.intlTelInputGlobals.getInstance(phoneInputField as Element)

      setError(iti.isValidNumber() ? false : true)
   }

   React.useEffect(() => {
      const phoneInputField = document.getElementById('phoneNumber')

      // eslint-disable-next-line
      window.intlTelInput(phoneInputField as Element, {
         onlyCountries: ['DE', 'BE', 'ES', 'FR', 'GB', 'IT', 'LU', 'NL', 'CH'],
         localizedCountries: {
            de: 'Allemagne',
            be: 'Belgique',
            es: 'Espagne',
            it: 'Italie',
            nl: 'Pays-bas',
            gb: 'Grande-Bretagne et Irlande du Nord',
            ch: 'Suisse',
         },
         utilsScript:
            'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
      })
   }, [])

   return (
      <div className='px-6 mt-6 w-full'>
         <form
            action=''
            className='flex flex-col justify-items-center'
            onSubmit={formik.handleSubmit}
         >
            <div className='mb-4'>
               <FormControl fullWidth>
                  <TextField
                     variant='standard'
                     label='Prénom'
                     name='firstname'
                     value={formik.values.firstname}
                     error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                     helperText={formik.touched.firstname && formik.errors.firstname}
                     onChange={formik.handleChange}
                  />
               </FormControl>
            </div>

            <div className='mb-4'>
               <FormControl fullWidth>
                  <TextField
                     variant='standard'
                     label='Nom'
                     value={formik.values.lastname}
                     name='lastname'
                     error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                     helperText={formik.touched.lastname && formik.errors.lastname}
                     onChange={formik.handleChange}
                  />
               </FormControl>
            </div>

            <div className='mb-4'>
               <FormControl fullWidth>
                  <TextField
                     variant='standard'
                     label='E-mail'
                     value={formik.values.email}
                     name='email'
                     error={formik.touched.email && Boolean(formik.errors.email)}
                     helperText={formik.touched.email && formik.errors.email}
                     onChange={formik.handleChange}
                  />
               </FormControl>
            </div>

            <div className='mb-4'>
               <FormControl fullWidth>
                  <TextField
                     variant='standard'
                     id='phoneNumber'
                     label={<p className=' ml-8'>Numéro de téléphone</p>}
                     value={formik.values.phoneNumber}
                     name='phoneNumber'
                     error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                     helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                     onChange={handleChangePhoneNumber}
                  />
               </FormControl>
               {error && String(formik.values.phoneNumber).length > 0 && (
                  <p className='text-red'>{'Numéro invalide !'} </p>
               )}
            </div>

            <div className='flex justify-between w-full'>
               <BackButton noPadding label='' />

               <div className='flex justify-between py-6'>
                  <button
                     // onClick={() => handleNext(datas)}
                     type='submit'
                     className='button disabled:border-grey disabled:bg-transparent disabled:text-grey select-none transition-colors border-2 py-2 px-2 relative rounded-full font-semibold text-xs text-right border-black hover:bg-black hover:text-white text-black'
                  >
                     <span className='h-fit flex justify-center items-center'>
                        {'Test'} <IoArrowForwardOutline fontSize={20} />
                     </span>
                  </button>
               </div>
            </div>
         </form>
      </div>
   )
}

export default Contact
