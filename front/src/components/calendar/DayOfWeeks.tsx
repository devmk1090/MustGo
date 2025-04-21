import {colors} from '@/constants';
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types/common';


function DayOfWeeks() {
  const { theme } = useThemeStorage()
  const styles = styling(theme)

  return (
    <View style={styles.container}>
      {['일', '월', '화', '수', '목', '금', '토'].map((dayOfWeek, i) => {
        return (
          <View key={i} style={styles.item}>
            <Text
              style={[
                styles.text,
                dayOfWeek === '토' && styles.saturdayText,
                dayOfWeek === '일' && styles.sundayText,
              ]}>
              {dayOfWeek}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styling = (theme: ThemeMode) =>
    StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  item: {
    width: Dimensions.get('window').width / 7,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: colors[theme].BLACK,
  },
  saturdayText: {
    color: colors[theme].BLUE_500,
  },
  sundayText: {
    color: colors[theme].RED_500,
  },
});

export default DayOfWeeks;