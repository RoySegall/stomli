import styles from './Keyboard.module.scss'

export interface Letter {
  letter: string,
  className?: string,
  disabled?: boolean
}

interface KeyBoardLayout {
  Numbers: Letter[],
  Middle: Letter[],
  Bottom: Letter[]
}

export const keys: KeyBoardLayout = {
  Numbers: [
    // {letter: 'delete', className: styles.deleteButton},
    {letter: 'פ'},
    {letter: 'ם'},
    {letter: 'ן'},
    {letter: 'ו'},
    {letter: 'ט'},
    {letter: 'א'},
    {letter: 'ר'},
    {letter: 'ק'},
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
