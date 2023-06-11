import { types } from '.'

export function getDateInFrench(stringDate: Date): string {
   return [
      types.Days[stringDate.getDay()].toLocaleLowerCase(),
      stringDate.getDate(),
      types.Months[stringDate.getMonth()].toLocaleLowerCase(),
      stringDate.getFullYear(),
   ].join(' ')
}

export function getDateAndTime(strDate: string, time?: string): Date {
   return new Date([...strDate.split('/').reverse(), time ?? ''].join(' '))
}

export const getTable = (index: number): number => {
   switch (index) {
      case 9:
         return 10
      case 10:
         return 12
      case 11:
         return 14
      case 12:
         return 16
      case 13:
         return 17
      case 14:
         return 18
      default:
         return index
   }
}
