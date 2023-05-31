import React from 'react'
import BackButton from '../Buttons/BackButton'

function Preferences() {
    const mealTypes: string[] = [
        'Moment détente',
        'Repas professionnel',
        'Repas rapide',
        'Anniversaire',
        'Evenement particulier',
        'Autre',
    ]

    const [selectedMeal, setSelectedMeal] =
        React.useState<string>('Moment détente')

    const isRadioSelected = (value: string): boolean => value === selectedMeal

    const handleClick = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSelectedMeal(e.target.value)

    React.useMemo(() => {
        console.log(selectedMeal)
    }, [selectedMeal])

    return (
        <div>
            <div className='pl-6 pt-6 w-full pr-2'>
                <h2 className='text-sm font-bold select-none'>
                    Types de repas
                </h2>
                <div className='text-sm mt-4 mb-6 flex flex-col'>
                    {mealTypes.map((mealType) => (
                        <label
                            key={mealType}
                            className='flex mb-4 pl-6 py-2 pr-4 rounded-full text-xs items-center justify-between flex-row-reverse'
                        >
                            <input
                                type='radio'
                                name='event'
                                value={mealType}
                                checked={isRadioSelected(mealType)}
                                onChange={handleClick}
                            />
                            <span className='select-none font-normal'>
                                {' '}
                                {mealType}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <BackButton label='' />
        </div>
    )
}

export default Preferences
