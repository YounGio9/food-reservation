import React from 'react'
import { types } from '../../../helpers'
import BackButton from '../Buttons/BackButton'
import NextButton from '../Buttons/NextButton'

function Preferences() {
   const mealTypes: string[] = [
      'Moment détente',
      'Repas professionnel',
      'Repas rapide',
      'Anniversaire',
      'Evenement particulier',
      'Autre',
   ]

   const options: string[] = ['Chaise bébé', 'Mobilité réduite', 'Poussette']

   const [selectedMeal, setSelectedMeal] = React.useState<string>('Moment détente')

   const [selectedOptions, setSelectedOptions] = React.useState<string[]>([] as string[])

   const isRadioSelected = (value: string): boolean => value === selectedMeal

   const handleClick = (e: React.ChangeEvent<HTMLInputElement>) =>
      setSelectedMeal(e.target.value)

   const [comment, setComment] = React.useState<string>('')

   const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      if (selectedOptions.includes(value))
         return setSelectedOptions((prev) => prev.filter((option) => option !== value))

      setSelectedOptions((prev) => [...Array.from(new Set<string>([...prev, value]))])
   }

   const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setComment(e.target.value)

   React.useMemo(() => {
      console.log(selectedMeal)
      console.log(selectedOptions)
      console.log(comment)
   }, [selectedMeal, selectedOptions, comment])

   return (
      <div>
         <div className='pl-6 pt-6 w-full pr-2'>
            <h2 className='text-sm font-bold select-none'>Types de repas</h2>
            <div className='text-sm mt-4 mb-6 flex flex-col'>
               {mealTypes.map((mealType) => (
                  <label
                     key={mealType}
                     className='flex mb-4 pl-6 py-2 pr-4 rounded-full text-xs items-center justify-between flex-row-reverse'
                  >
                     <input
                        type='radio'
                        name='option'
                        value={mealType}
                        checked={isRadioSelected(mealType)}
                        onChange={handleClick}
                     />
                     <span className='select-none font-normal'> {mealType}</span>
                  </label>
               ))}
            </div>
         </div>

         <hr className='border border-barestho-light-gray min-w-full ' />

         <div className='pl-6 pt-6 w-full pr-2'>
            <h2 className='text-sm font-bold select-none'>Options</h2>
            <div className='text-sm mt-4 mb-6 flex flex-col'>
               {options.map((option) => (
                  <label
                     key={option}
                     className='flex mb-4 pl-6 py-2 pr-4 rounded-full text-xs items-center justify-between flex-row-reverse'
                  >
                     <input
                        type='checkbox'
                        name='event'
                        value={option}
                        onChange={handleCheck}
                     />
                     <span className='select-none font-normal'> {option}</span>
                  </label>
               ))}
            </div>
         </div>

         <hr className='border border-barestho-light-gray min-w-full ' />

         <div className='pl-6 pt-6 w-full pr-2 mb-6'>
            <h2 className='text-sm font-bold select-none'>Commentaire</h2>

            <div className='flex flex-col flex-nowrap'></div>

            <textarea
               name='comment'
               value={comment}
               onChange={handleComment}
               id='comment'
               className='placeholder:text-xs placeholder:text-gray p-2 text-sm border-t border-x border-b-2 border-b-red focus:outline-blue rounded-t mt-4'
               maxLength={255}
               placeholder='Quelque chose à ajouter ?'
            ></textarea>

            <span className='text-slate-300 text-xs text-right mt-1'>{} </span>
         </div>

         <div className='flex justify-between'>
            <BackButton label='' />

            {!!selectedMeal && (
               <NextButton
                  datas={
                     {
                        options: selectedOptions,
                        typeOfMeal: selectedMeal,
                        comment,
                     } as types.Reservation
                  }
                  label='Passer à la suite'
               />
            )}
         </div>
      </div>
   )
}

export default Preferences
