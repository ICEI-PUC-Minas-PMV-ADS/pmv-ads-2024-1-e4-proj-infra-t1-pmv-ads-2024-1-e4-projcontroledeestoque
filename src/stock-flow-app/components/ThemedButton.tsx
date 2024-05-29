import {Pressable, StyleSheet, TextProps} from 'react-native';

import {useThemeColor} from '@/hooks/useThemeColor';
import {ThemedText} from "@/components/ThemedText";

interface ThemedButtonProps extends TextProps {
    onPress: () => void;
    children: React.ReactNode;
    style?: object;
}

export function ThemedButton({onPress, children, style, ...otherProps}: ThemedButtonProps) {
    const backgroundColor = useThemeColor({}, 'button');

    return (
        <Pressable style={[styles.button, {backgroundColor}, style]} onPress={onPress} {...otherProps}>
            <ThemedText>{children}</ThemedText>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
