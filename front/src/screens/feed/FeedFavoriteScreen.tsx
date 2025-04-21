import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

import {colors} from '@/constants';
import { ThemeMode } from '@/types';
import useThemeStorage from '@/hooks/useThemeStorage';

function FeedFavoriteScreen() {
  const { theme } = useThemeStorage()
  const styles = styling(theme)

    return (
      <SafeAreaView style={styles.container}>
        <FeedFavoriteScreen />
      </SafeAreaView>
    );
  }
  
  const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
  });
export default FeedFavoriteScreen;