import React, { useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import useAuth from '@/hooks/queries/useAuth';
import MapView, { LatLng, PROVIDER_GOOGLE } from 'react-native-maps';
import { colors } from '@/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import useUserLocation from '@/hooks/useUserLocation';

type Navigation = CompositeNavigationProp<
    StackNavigationProp<MapStackParamList>,
    DrawerNavigationProp<MainDrawerParamList>
>;

function MapHomeScreen() {
    const inset = useSafeAreaInsets();
    const { logoutMutation } = useAuth();
    const navigation = useNavigation<Navigation>();
    const mapRef = useRef<MapView | null>(null);
    const {userLocation, isUserLocationError} = useUserLocation();

    const handleLogout = () => {
        logoutMutation.mutate(null);
    };

    const handlePressUserLocation = () => {
        if (isUserLocationError) {
            // 에러메세지
            return;
        }
        mapRef.current?.animateToRegion({ // 내 위치로 이동하기 위한 함수
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922, //확대 스케일
            longitudeDelta: 0.0421,
        });
    };

    return (
        <>
            <MapView
                ref={mapRef}
                style={styles.container}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                followsUserLocation
                showsMyLocationButton
            />
            <Pressable
                style={[styles.drawerButton, { top: inset.top || 20 }]}
                onPress={() => navigation.openDrawer()}>
                <Text>서랍</Text>
            </Pressable>
            <View style={styles.buttonList}>
                <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
                    <Text>내위치</Text>
                </Pressable>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerButton: {
        position: 'absolute',
        left: 0,
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: colors.PINK_700,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        shadowColor: colors.BLACK,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        elevation: 4,
    },
    buttonList: {
        position: 'absolute',
        bottom: 30,
        right: 15,
    },
    mapButton: {
        backgroundColor: colors.PINK_700,
        marginVertical: 5,
        height: 48,
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        shadowColor: colors.BLACK,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
    },
});


export default MapHomeScreen;