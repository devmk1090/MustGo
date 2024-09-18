import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet} from 'react-native';
import AuthHomeScreen from '../screens/AuthHomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { authNavigations} from '../constants';

export type AuthStackParamList = {
    [authNavigations.AUTH_HOME]: undefined;
    [authNavigations.LOGIN]: undefined;
};

function AuthStackNavigator() {
    const Stack = createStackNavigator<AuthStackParamList>();

    return (
        <Stack.Navigator>
            <Stack.Screen name={authNavigations.AUTH_HOME} component={AuthHomeScreen} />
            <Stack.Screen name={authNavigations.LOGIN} component={LoginScreen} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;