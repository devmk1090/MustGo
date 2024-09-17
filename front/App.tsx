import React from 'react';
import type { PropsWithChildren } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';


function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} />
        <Text>텍스트</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
  },
  inputContainer: {
  }
});

export default App;
