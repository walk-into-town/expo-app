import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContextProvider } from './src/api/Auth';

import Navigator from "./src/navigation/Navigator";

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <Navigator />
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}
export default App;