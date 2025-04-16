import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import { authNavigations, colors } from '@/constants';
import SignupScreen from '@/screens/auth/SignupScreen';
import KakaoLoginScreen from '@/screens/auth/KakaoLoginScreen';
import useThemeStorage from '@/hooks/useThemeStorage';

export type AuthStackParamList = {
    [authNavigations.AUTH_HOME]: undefined;
    [authNavigations.LOGIN]: undefined;
    [authNavigations.SIGNUP]: undefined;
    [authNavigations.KAKAO]: undefined;

};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
    const { theme } = useThemeStorage()

    return (
        <Stack.Navigator screenOptions={{
            cardStyle: {
                backgroundColor: colors[theme].WHITE,
            },
            headerStyle: {
                backgroundColor: colors[theme].WHITE,
                shadowColor: colors[theme].GRAY_200,
            },
            headerTitleStyle: {
                fontSize: 15,
            },
            headerTintColor: colors[theme].BLACK,
        }}>
            <Stack.Screen
                name={authNavigations.AUTH_HOME}
                component={AuthHomeScreen}
                options={{
                    headerTitle: ' ',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={authNavigations.LOGIN}
                component={LoginScreen}
                options={{
                    headerTitle: '로그인',
                }}
            />
            <Stack.Screen
                name={authNavigations.SIGNUP}
                component={SignupScreen}
                options={{
                    headerTitle: '회원가입',
                }}
            />
            <Stack.Screen
                name={authNavigations.KAKAO}
                component={KakaoLoginScreen}
                options={{
                    headerTitle: '카카오 로그인',
                }}
            />
        </Stack.Navigator>
    );
}

export default AuthStackNavigator;