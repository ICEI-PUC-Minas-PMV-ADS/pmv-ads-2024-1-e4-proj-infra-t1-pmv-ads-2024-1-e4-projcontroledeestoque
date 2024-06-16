import {StyleSheet, Text, type TextProps} from 'react-native';

import {useThemeColor} from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    colorName?: 'text' | 'background' | 'textInput' | 'textError' | 'link';
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'cardTitle' | 'cardSubtitle' | 'cardDescription';
};

export function ThemedText({
                               style,
                               lightColor,
                               darkColor,
                               type = 'default',
                               colorName = 'text',
                               ...rest
                           }: ThemedTextProps) {
    const color = useThemeColor({light: lightColor, dark: darkColor}, colorName);

    return (
        <Text
            style={[
                {color},
                type === 'default' ? styles.default : undefined,
                type === 'title' ? styles.title : undefined,
                type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
                type === 'subtitle' ? styles.subtitle : undefined,
                type === 'link' ? styles.link : undefined,
                type === 'cardTitle' ? styles.cardTitle : undefined,
                type === 'cardSubtitle' ? styles.cardSubtitle : undefined,
                type === 'cardDescription' ? styles.cardDescription : undefined,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 24,
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: '#0a7ea4',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 28,
        borderBottomWidth: 1,
        borderBottomColor: '#9BA1A6',
    },
    cardSubtitle: {
        fontSize: 17,
        fontWeight: 'bold',
        lineHeight: 24,
    },
    cardDescription: {
        fontSize: 16,
        lineHeight: 24,
    },
});
