import styles from './Keyboard.module.scss'

export interface Letter {
  letter: string,
  className?: string,
  disabled?: boolean
}

interface KeyBoardLayout {
  Numbers: Letter[],
  Middle: Letter[],
  Bottom: Letter[],
  Ends: Letter[]
}

export const keys: KeyBoardLayout = {
  Numbers: [
    // {letter: 'delete', className: styles.deleteButton},
    {letter: 'פ'},
    {letter: 'ו'},
    {letter: 'ט'},
    {letter: 'א'},
    {letter: 'ר'},
    {letter: 'ק'},
  ],
  Middle: [
    {letter: 'ל'},
    {letter: 'ח'},
    {letter: 'י'},
    {letter: 'ע'},
    {letter: 'כ'},
    {letter: 'ג'},
    {letter: 'ד'},
    {letter: 'ש'},
  ],
  Bottom: [
    {letter: 'ת'},
    {letter: 'צ'},
    {letter: 'מ'},
    {letter: 'נ'},
    {letter: 'ה'},
    {letter: 'ב'},
    {letter: 'ס'},
    {letter: 'ז'},
  ],
  Ends: [
    {letter: 'ם'},
    {letter: 'ן'},
    {letter: 'ף'},
    {letter: 'ך'},
    {letter: 'ץ'},
  ],
};
