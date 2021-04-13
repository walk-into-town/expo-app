import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContextProvider } from './src/api/Auth';

import Navigator from "./src/navigation";
import { useFonts } from 'expo-font';
import fonts from './src/atoms/fonts';

const App = () => {

  const [loaded] = useFonts(fonts);
  
  if (!loaded)
    return null;

  return !loaded ? null : (
    <SafeAreaProvider>
      <AuthContextProvider>
        <Navigator />
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}
export default App;