import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import { validateSignup } from '../../utils';
import useForm from '../../hooks/useForm';

function SignScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const passworConfirmdRef = useRef<TextInput | null>(null);

  const signup = useForm({
    initialValue: { email: '', password: '', passwordConfirm: '' },
    validate: validateSignup,
  });

  const handleSubmit = () => {
    console.log(signup.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder='이메일'
          error={signup.errors.email}
          touched={signup.touched.email}
          inputMode='email'
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signup.getTextInputProps('email')}

        />
        <InputField
          ref={passwordRef}
          placeholder='비밀번호'
          textContentType='oneTimeCode'
          error={signup.errors.password}
          touched={signup.touched.password}
          secureTextEntry
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={() => passworConfirmdRef.current?.focus()}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passworConfirmdRef}
          placeholder='비밀번호 확인'
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          secureTextEntry
          onSubmitEditing={handleSubmit}
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" onPress={handleSubmit} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default SignScreen;