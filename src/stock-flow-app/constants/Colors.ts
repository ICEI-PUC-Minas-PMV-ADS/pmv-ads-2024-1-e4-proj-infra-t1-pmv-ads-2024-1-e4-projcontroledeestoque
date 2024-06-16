/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    backgroundCard: '#787777',
    tint: tintColorLight,
    icon: '#687076',
    button: '#4f46e5',
    link: '#6860dd',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    textInput: '#fff',
    textError: '#a11111',
    buy: '#41c363',
    sell: '#dd3e3e',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    backgroundCard: '#252525',
    tint: tintColorDark,
    icon: '#9BA1A6',
    button: '#4f46e5',
    link: '#756de5',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    textInput: '#fff',
    textError: '#d82626',
    buy: '#41c363',
    sell: '#dd3e3e',
  },
};
