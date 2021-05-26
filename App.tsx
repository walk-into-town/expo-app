import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigator from "./src/navigation";
import { useFonts } from 'expo-font';
import { fontPath } from './src/util';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { AuthContextProvider, LoadingContextProvider } from './src/useHook';


const App = () => {

  const [loaded] = useFonts(fontPath);

  return !loaded ? null : (
    <SafeAreaProvider>
      <ActionSheetProvider>
        <LoadingContextProvider>
          <AuthContextProvider>
            <Navigator />
          </AuthContextProvider>
        </LoadingContextProvider>
      </ActionSheetProvider>
    </SafeAreaProvider>
  );
}
export default App;

