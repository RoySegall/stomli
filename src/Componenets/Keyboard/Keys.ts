import styles from './Keyboard.module.scss'

export interface Letter {
  letter: string,
  className?: string,
  disabled?: boolean
}

interface KeyBoardLayout {
  Numbers: Letter[],
  Upper: Letter[],
  Middle: Letter[],
  Bottom: Letter[]
}

export const keys: KeyBoardLayout = {
  Numbers: [
    {
      letter: 'delete',
      className: styles.deleteButton
    },
    {letter: '0'},
    {letter: '9'},
    {letter: '8'},
    {letter: '7'},
    {letter: '6'},
    {letter: '5'},
    {letter: '4'},
    {letter: '3'},
    {letter: '2'},
    {letter: '1'},
  ],
  Middle: [
    {letter: 'ף'},
    {letter: 'ך'},
    {letter: 'ל'},
    {letter: 'ח'},
    {letter: 'י'},
    {letter: 'ע'},
    {letter: 'כ'},
    {letter: 'ג'},
    {letter: 'ד'},
    {letter: 'ש'},
  ],
  Upper: [
    {letter: 'פ'},
    {letter: 'ם'},
    {letter: 'ן'},
    {letter: 'ו'},
    {letter: 'ט'},
    {letter: 'א'},
    {letter: 'ר'},
    {letter: 'ק'},
    {letter: 'ק'}
  ],
  Bottom: [
    {letter: 'ץ'},
    {letter: 'ת'},
    {letter: 'צ'},
    {letter: 'מ'},
    {letter: 'נ'},
    {letter: 'ה'},
    {letter: 'ב'},
    {letter: 'ס'},
    {letter: 'ז'},
  ],
};
