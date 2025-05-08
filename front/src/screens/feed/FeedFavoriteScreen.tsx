import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { colors } from '@/constants';
import { ThemeMode } from '@/types';
import useThemeStorage from '@/hooks/useThemeStorage';
import Loader from '@/components/common/Loader';
import { Suspense } from 'react';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
function FeedFavoriteScreen() {
  const { theme } = useThemeStorage()
  const styles = styling(theme)

  return (
    <SafeAreaView style={styles.container}>
      <RetryErrorBoundary>
        <Suspense fallback={<Loader />}>
          <FeedFavoriteScreen />
        </Suspense>
      </RetryErrorBoundary>
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