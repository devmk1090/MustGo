import React, {useEffect, useState} from 'react';
import {FlatList, Text, Pressable, StyleSheet, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, numbers} from '@/constants';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types/common';
interface YearSelectorProps {
  isVisible: boolean;
  currentYear: number;
  onChangeYear: (year: number) => void;
  hide: () => void;
}

function YearSelector({
  isVisible,
  currentYear,
  onChangeYear,
  hide,
}: YearSelectorProps) {
  const { theme } = useThemeStorage()
  const styles = styling(theme)

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {  // 현재 선택한 연도를 보여주기 위해 계산하여 스크롤
    const yearIndex = currentYear - numbers.MIN_CANLENDAR_YEAR;
    const currentRow = Math.floor(
      yearIndex / numbers.CALENDER_YEAR_SELECTOR_COLUMN,
    );

    const scrollToY = currentRow * 50;

    setScrollY(scrollToY);
  }, [isVisible, currentYear]);

  return (
    <>
      {isVisible && (
        <View style={styles.container}>
          <View style={styles.yearsContainer}>
            <FlatList
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              contentOffset={{x: 0, y: scrollY}}
              initialNumToRender={currentYear - numbers.MIN_CANLENDAR_YEAR}
              data={Array.from(
                {
                  length:
                    numbers.MAX_CANLENDAR_YEAR - numbers.MIN_CANLENDAR_YEAR + 1,
                },
                (_, index) => ({
                  id: index,
                  num: index + numbers.MIN_CANLENDAR_YEAR,
                }),
              )}
              renderItem={({item}) => (
                <Pressable
                  key={item.num}
                  onPress={() => onChangeYear(item.num)}
                  style={[
                    styles.yearButton,
                    currentYear === item.num && styles.currentYearButton,
                  ]}>
                  <Text
                    style={[
                      styles.yearText,
                      currentYear === item.num && styles.currentYearText,
                    ]}>
                    {item.num}
                  </Text>
                </Pressable>
              )}
              keyExtractor={item => String(item.num)}
              numColumns={numbers.CALENDER_YEAR_SELECTOR_COLUMN}
            />
          </View>
          <Pressable style={styles.closeButton} onPress={hide}>
            <Text style={styles.closeText}>닫기</Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={20}
              color={colors[theme].BLACK}
            />
          </Pressable>
        </View>
      )}
    </>
  );
}

const styling = (theme: ThemeMode) =>
    StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
  },
  yearsContainer: {
    alignItems: 'center',
    backgroundColor: colors[theme].WHITE,
  },
  scrollContainer: {
    maxHeight: 200,
    backgroundColor: colors[theme].WHITE,
  },
  yearButton: {
    width: 80,
    height: 40,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: colors[theme].GRAY_500,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentYearButton: {
    backgroundColor: colors[theme].PINK_700,
    borderColor: colors[theme].PINK_700,
  },
  yearText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors[theme].GRAY_700,
  },
  currentYearText: {
    color: colors[theme].WHITE,
    fontWeight: '600',
  },
  closeButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors[theme].WHITE,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors[theme].GRAY_500,
  },
  closeText: {
    color: colors[theme].BLACK,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default YearSelector;