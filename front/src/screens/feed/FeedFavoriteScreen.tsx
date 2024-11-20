import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

import {colors} from '@/constants';

function FeedFavoriteScreen() {
    return (
      <SafeAreaView style={styles.container}>
        <FeedFavoriteScreen />
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.WHITE,
    },
  });
export default FeedFavoriteScreen;