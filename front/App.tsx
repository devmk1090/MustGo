import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import RootNavigator from './src/navigations/root/RootNavigator';
import { QueryClientProvider } from '@tanstack/react-query';


function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
