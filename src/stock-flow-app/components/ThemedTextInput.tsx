import {TextInput, TextInputProps} from 'react-native';

import {useThemeColor} from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({ style, lightColor, darkColor, ...otherProps }: ThemedTextInputProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'textInput');
  
  return <TextInput style={[{ backgroundColor }, style]} {...otherProps} />;
}
