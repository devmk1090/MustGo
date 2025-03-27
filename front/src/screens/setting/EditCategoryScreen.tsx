import InputField from '@/components/common/InputField';
import { colorHex, colors } from '@/constants';
import { MarkerColor } from '@/types';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const categoryList: MarkerColor[] = [
    'RED',
    'YELLOW',
    'GREEN',
    'BLUE',
    'PURPLE',
];

const categoryPlaceholderList = [
    'ex) 식당',
    'ex) 카페',
    'ex) 병원',
    'ex) 숙소',
    'ex) 여행',
];

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

            <View style={styles.formContainer}>
                {categoryList.map((color, i) => {
                    return (
                        <View key={i} style={[styles.categoryContainer]}>
                            <View
                                style={[styles.category, { backgroundColor: colorHex[color] }]}
                            />
                            <View style={styles.inputContainer}>
                                <InputField />
                                 
                            </View>
                        </View>
                    );
                })}
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
    formContainer: {
        gap: 15,
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    category: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors[theme].PINK_400,
    },
    inputContainer: {
        flex: 1,
    },
});

export default EditCategoryScreen;