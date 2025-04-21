import { colors } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';
import axios from 'axios';
import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import WebView, { WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';

const REDIRECT_URI = `${Platform.OS === 'android'
  ? 'http://10.0.2.2:3030'
  : 'http://localhost:3030'}auth/oauth/kakao`
const INJECTED_JAVASCRIPT = "window.ReactNativeWebView.postMessage('')";

function KakaoLoginScreen() {
  const { theme } = useThemeStorage()
  const styles = styling(theme)

  const { kakaoLoginMutation } = useAuth();
  const [isChangeNavigate, setIsChangeNavigate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnMessage = (event: WebViewMessageEvent) => {
    if (event.nativeEvent.url.includes(`${REDIRECT_URI}?code=`)) {
      // 코드가 있다면 추출
      const code = event.nativeEvent.url.replace(`${REDIRECT_URI}?code=`, '');

      requestToken(code);
    }
  };

  const requestToken = async (code: string) => {
    const response = await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: Config.KAKAO_REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      },
    })

    // 토큰을 전달
    kakaoLoginMutation.mutate(response.data.access_token);
  }

  const handleNavigationStateChange = (event: WebViewNavigation) => {
    const isMatched = event.url.includes(`${REDIRECT_URI}?code=`);
    setIsLoading(isMatched); // 코드를 발급 받는중이라면
    setIsChangeNavigate(event.loading);
  };

  return (
    <SafeAreaView style={styles.container}>
      {(isChangeNavigate || isLoading) && (
        <View style={styles.kakaoLoadingContainer}>
          <ActivityIndicator size={'small'} color={colors[theme].BLACK} />
        </View>
      )}
      <WebView
        style={styles.container}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        onMessage={handleOnMessage} // 결과값 처리
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </SafeAreaView>
  )
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    kakaoLoadingContainer: {
      backgroundColor: colors[theme].WHITE,
    height: Dimensions.get('window').height,
    paddingBottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default KakaoLoginScreen;