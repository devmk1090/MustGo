import { colors } from '@/constants';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

interface EditCategoryScreenProps { }

const EditCategoryScreen = ({ }: EditCategoryScreenProps) => {
    return <SafeAreaView style={styles.container}>
        <ScrollView style={styles.contentContainer}
            scrollIndicatorInsets={{ right: 1 }}>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                    마커 색상의 카테고리를 설정해주세요.
                </Text>
                <Text style={styles.infoText}>
                    마커 필터링, 범례 표시에 사용할 수 있어요.
                </Text>
            </View>
        </ScrollView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        marginBottom: 10,
    },
    infoContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
        borderWidth: 1,
        borderRadius: 3,
        padding: 10,
        gap: 10,
    },
    infoText: {
        fontSize: 15,
        fontWeight: '600',
      },
});

export default EditCategoryScreen;