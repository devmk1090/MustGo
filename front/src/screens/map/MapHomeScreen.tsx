import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import useAuth from '@/hooks/queries/useAuth';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

function MapHomeScreen() {
    const { logoutMutation } = useAuth();
    
    return (
        <MapView
            style={styles.container}
            provider={PROVIDER_GOOGLE}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default MapHomeScreen;