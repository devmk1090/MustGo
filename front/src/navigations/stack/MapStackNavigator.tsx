import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { mapNavigations } from '@/constants';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import { LatLng } from 'react-native-maps';
import AddPostScreen from '@/screens/map/AddPostScreen';
import SearchLocationScreen from '@/screens/map/SearchLocationScreen';

export type MapStackParamList = {
    [mapNavigations.MAP_HOME]: undefined;
    [mapNavigations.ADD_POST]: { location: LatLng };
    [mapNavigations.SEARCH_LOCATION]: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

function MapStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            cardStyle: {
                backgroundColor: 'white',
            },
            headerStyle: {
                backgroundColor: 'white',
                shadowColor: 'gray',
            },
            headerTitleStyle: {
                fontSize: 15,
            },
            headerTintColor: 'black',
        }}>
            <Stack.Screen
                name={mapNavigations.MAP_HOME}
                component={MapHomeScreen}
                options={{
                    headerTitle: ' ',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={mapNavigations.ADD_POST}
                component={AddPostScreen}
                options={{
                    headerTitle: '장소 추가',
                }}
            />
            <Stack.Screen
                name={mapNavigations.SEARCH_LOCATION}
                component={SearchLocationScreen}
                options={{
                    presentation: 'modal',
                    headerTitle: '장소 검색',
                }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({});

export default MapStackNavigator;