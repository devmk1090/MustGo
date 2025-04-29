import useAuth from '@/hooks/queries/useAuth';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface MapLegendProps {

}

const MapLegend = ({ }: MapLegendProps) => {
    const { getProfileQuery } = useAuth()
    const { categories } = getProfileQuery.data || {}

    console.log('categories', categories)

    return (
        <View></View>
    )
}

const styles = StyleSheet.create({});

export default MapLegend;