import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthStackParamList } from '../navigation/AuthStackNavigator';
import { authNavigations } from '../constants';

type AuthHomeScrrenProps = StackScreenProps<
    AuthStackParamList,
    typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({ navigation }: AuthHomeScrrenProps) {
    return (
        <SafeAreaView>
            <View>
                <Button
                    title='로그인화면으로 이동'
                    onPress={() => navigation.navigate(authNavigations.LOGIN)}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;