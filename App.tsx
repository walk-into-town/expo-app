import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigator from "./src/navigation";
import { useFonts } from 'expo-font';
import { fontPath } from './src/util';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { AuthContextProvider, LoadingContextProvider, useBackGroundSound } from './src/useHook';
import { BGMContextProvider } from './src/useHook/BGM';


const App = () => {
  const [loaded] = useFonts(fontPath);

  return !loaded ? null : (
    <SafeAreaProvider>
      <ActionSheetProvider>
        <LoadingContextProvider>
          <AuthContextProvider>
            <BGMContextProvider>
              <Navigator />
            </BGMContextProvider>
          </AuthContextProvider>
        </LoadingContextProvider>
      </ActionSheetProvider>
    </SafeAreaProvider>
  );
}
export default App;

