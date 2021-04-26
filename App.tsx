import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContextProvider } from './src/util/Auth';

import Navigator from "./src/navigation";
import { useFonts } from 'expo-font';
import { fontPath } from './src/atoms/paths';

const App = () => {

  const [loaded] = useFonts(fontPath);

  return !loaded ? null : (
    <SafeAreaProvider>
      <AuthContextProvider>
        <Navigator />
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}
export default App;