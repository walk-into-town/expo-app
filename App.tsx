import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigator from "./src/navigation";
import { useFonts } from 'expo-font';
import { fontPath } from './src/atoms/paths';
import { AuthContextProvider } from './src/useHook/Auth';
import { LoadingContextProvider } from './src/useHook/Loading';


const App = () => {

  const [loaded] = useFonts(fontPath);

  return !loaded ? null : (
    <SafeAreaProvider>
      <LoadingContextProvider>
        <AuthContextProvider>
          <Navigator />
        </AuthContextProvider>
      </LoadingContextProvider>
    </SafeAreaProvider>
  );
}
export default App;