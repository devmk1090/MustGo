import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import CustomButton from '@/components/common/CustomButton';
import { authNavigations, colors } from '@/constants';
import { ThemeMode } from '@/types';
import useThemeStorage from '@/hooks/useThemeStorage';

type AuthHomeScrrenProps = StackScreenProps<
    AuthStackParamList,
    typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({ navigation }: AuthHomeScrrenProps) {
    const { theme } = useThemeStorage()
    const styles = styling(theme)

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
                    label="카카오 로그인하기"
                    variant="filled"
                    size="large"
                    onPress={() => navigation.navigate(authNavigations.KAKAO)}
                    style={styles.kakaoButtonContainer}
                    textStyle={styles.kakaoButtonText}
                    icon={
                        <Ionicons name={'chatbubble-sharp'} color={'#181600'} size={16} />
                    }
                />
                <CustomButton
                    label="이메일 로그인하기"
                    onPress={() => navigation.navigate(authNavigations.LOGIN)}
                />
                <Pressable onPress={() => navigation.navigate(authNavigations.SIGNUP)}>
                    <Text style={styles.emailText}>이메일로 가입하기</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styling = (theme: ThemeMode) =>
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            marginHorizontal: 30,
            marginVertical: 30,
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
            alignItems: 'center',
            gap: 10,
        },
        kakaoButtonContainer: {
            backgroundColor: '#fee503',
        },
        kakaoButtonText: {
            color: '#181600',
        },
        emailText: {
            textDecorationLine: 'underline',
            fontWeight: '500',
            padding: 10,
            color: colors[theme].BLACK,
        },
    });

export default AuthHomeScreen;