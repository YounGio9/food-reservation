import { types } from '.'

export function getDateInFrench(stringDate: Date): string {
   return [
      types.Days[stringDate.getDay()].toLocaleLowerCase(),
      stringDate.getDate(),
      types.Months[stringDate.getMonth()].toLocaleLowerCase(),
      stringDate.getFullYear(),
   ].join(' ')
}
