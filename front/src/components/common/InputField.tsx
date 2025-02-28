import React, { ForwardedRef, forwardRef, ReactNode, useRef } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '@/constants';
import { mergeRefs } from '@/utils';

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
                        placeholderTextColor={colors.GRAY_500}
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

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colors.GRAY_200,
        padding: deviceHeight > 700 ? 15 : 10,
    },
    multiLine: {
        paddingBottom: deviceHeight > 700 ? 45 : 30,
      },
    input: {
        fontSize: 16,
        color: colors.BLACK,
        padding: 0,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
      },
    disabled: {
        backgroundColor: colors.GRAY_200,
        color: colors.GRAY_700,
    },
    inputError: {
        borderWidth: 1,
        borderColor: colors.RED_300,
    },
    error: {
        color: colors.RED_500,
        fontSize: 12,
        paddingTop: 5,
    },
});

export default InputField;