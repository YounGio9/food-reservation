import React from 'react'
import { FormControl, TextField } from '@mui/material'
import * as yup from 'yup'
import { FormikConfig, useFormik } from 'formik'
import { types } from '../../../helpers'
import BackButton from '../Buttons/BackButton'

function Contact() {
   const validationSchema = yup.object({
      lastname: yup.string().required('Veuillez entrz votre nom !'),
      firstname: yup.string().required('Veuillez entrez votre prénom !'),
      email: yup.string().email('Veuillez entrer un email valide !').required(),
      phoneNumber: yup.number().required(),
   })

   const initialValues: Partial<types.Reservation> = {
      lastname: '',
      firstname: '',
      email: '',
      phoneNumber: 0,
   }

   const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: () => {},
   } as FormikConfig<types.Reservation>)

   return (
      <div className='px-6 mt-6'>
         <form action='' className='grid justify-items-center' onSubmit={formik.handleSubmit}>
            <div className='mb-4'>
               <FormControl>
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
               <FormControl>
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
               <FormControl>
                  <TextField
                     variant='standard'
                     label='Email'
                     value={formik.values.email}
                     name='email'
                     error={formik.touched.email && Boolean(formik.errors.email)}
                     helperText={formik.touched.email && formik.errors.email}
                     onChange={formik.handleChange}
                  />
               </FormControl>
            </div>

            <button type='submit'> Soumettre</button>
         </form>

         <BackButton label='' />
      </div>
   )
}

export default Contact
