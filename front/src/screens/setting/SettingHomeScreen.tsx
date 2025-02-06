import SettingItem from '@/components/setting/SettingItem';
import { colors } from '@/constants';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

interface SettingHomeScreenProps {

}

const SettingHomeScreen = ({ }: SettingHomeScreenProps) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.space} />
                <SettingItem title="프로필 수정" />
                <SettingItem title="마커 카테고리 설정" />
                <View style={styles.space} />
                <SettingItem
                    title="로그아웃"
                    color={colors.RED_500}
                    icon={<Octicons name={'sign-out'} color={colors.RED_500} size={16} />}
                />
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    space: {
        height: 30,
    },
});

export default SettingHomeScreen;