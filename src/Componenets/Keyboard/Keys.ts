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
    {letter: 'delete', className: styles.deleteButton},
    {letter: '0', disabled: true,},
    {letter: '9', disabled: true,},
    {letter: '8', disabled: true,},
    {letter: '7', disabled: true,},
    {letter: '6', disabled: true,},
    {letter: '5', disabled: true,},
    {letter: '4', disabled: true,},
    {letter: '3', disabled: true,},
    {letter: '2', disabled: true,},
    {letter: '1', disabled: true,},
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
