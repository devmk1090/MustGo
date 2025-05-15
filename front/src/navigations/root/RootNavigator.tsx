import React, { useEffect } from 'react';
import AuthStackNavigator from "../stack/AuthStackNavigator";
import MainDrawerNavigator from "../drawer/MainDrawerNavigator";
import useAuth from '../../hooks/queries/useAuth'
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import SplashScreen from 'react-native-splash-screen';

function RootNavigator() {
    const { isLogin, isLoginLoading } = useAuth();

    useEffect(() => {
        if (!isLoginLoading) {
            SplashScreen.hide()
        }
    }, [isLoginLoading]);

    return <RetryErrorBoundary>{isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}</RetryErrorBoundary>


}

export default RootNavigator;