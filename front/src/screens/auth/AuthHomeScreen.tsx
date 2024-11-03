import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import CustomButton from '@/components/common/CustomButton';
import { authNavigations } from '@/constants';

type AuthHomeScrrenProps = StackScreenProps<
    AuthStackParamList,
    typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({ navigation }: AuthHomeScrrenProps) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    resizeMode='contain'
                    style={styles.image}
                    source={require('../../assets/gradle-logo.png')}
                />

            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    label='로그인하기'
                    onPress={() => navigation.navigate(authNavigations.LOGIN)}
                />
                <CustomButton
                    label='회원가입하기'
                    variant='outlined'
                    onPress={() => navigation.navigate(authNavigations.SIGNUP)}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1.5,
        width: Dimensions.get('screen').width / 2,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        flex: 1,
        gap: 10,
    },
});

export default AuthHomeScreen;