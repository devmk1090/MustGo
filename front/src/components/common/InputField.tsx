import React, { ForwardedRef, forwardRef, ReactNode, useRef } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '@/constants';
import { mergeRefs } from '@/utils';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types/common';

interface InputFieldProps extends TextInputProps {
    disabled?: boolean;
    error?: string;
    touched?: boolean;
    icon?: ReactNode
}

const deviceHeight = Dimensions.get('screen').height;

const InputField = forwardRef(({
    disabled = false,
    error,
    touched,
    icon = null,
    ...props
}: InputFieldProps, ref?: ForwardedRef<TextInput>,) => {
    const { theme } = useThemeStorage()
    const styles = styling(theme)

    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
        innerRef.current?.focus()
    }
    return (
        <Pressable onPress={() => handlePressInput}>
            <View
                style={[
                    styles.container,
                    disabled && styles.disabled,
                    props.multiline && styles.multiLine,
                    touched && Boolean(error) && styles.inputError,
                ]}>
                <View style={Boolean(icon) && styles.innerContainer}>
                    {icon}
                    <TextInput
                        ref={ref ? mergeRefs(innerRef, ref) : innerRef}
                        editable={!disabled}
                        placeholderTextColor={colors[theme].GRAY_500}
                        style={styles.input}
                        autoCapitalize='none' //첫글자 대문자 off
                        spellCheck={false} //교정 off
                        autoCorrect={false} //자동완성 off
                        {...props}
                    />
                </View>
                {touched && Boolean(error) && <Text style={styles.error}>{error}</Text>}
            </View>
        </Pressable>
    );
});

const styling = (theme: ThemeMode) =>
    StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colors[theme].GRAY_200,
        padding: deviceHeight > 700 ? 15 : 10,
    },
    multiLine: {
        paddingBottom: deviceHeight > 700 ? 45 : 30,
      },
    input: {
        fontSize: 16,
        color: colors[theme].BLACK,
        padding: 0,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
      },
    disabled: {
        backgroundColor: colors[theme].GRAY_200,
        color: colors[theme].GRAY_700,
    },
    inputError: {
        borderWidth: 1,
        borderColor: colors[theme].RED_300,
    },
    error: {
        color: colors[theme].RED_500,
        fontSize: 12,
        paddingTop: 5,
    },
});

export default InputField;