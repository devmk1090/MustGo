import React from 'react';
import { Button, Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import useAuth from '@/hooks/queries/useAuth';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { colors } from '@/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function MapHomeScreen() {
    const inset = useSafeAreaInsets();
    const { logoutMutation } = useAuth();
    const navigation = useNavigation<Navigation>();

    return (
        <>
            <MapView
                style={styles.container}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                followsUserLocation
                showsMyLocationButton
            />
            <Pressable
                style={[styles.drawerButton, {top: inset.top || 20}]}
                onPress={() => navigation.openDrawer()}>
                <Text>서랍</Text>
            </Pressable>
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
});

export default MapHomeScreen;