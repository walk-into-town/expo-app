import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContextProvider } from './src/util/Auth';

import Navigator from "./src/navigation";
import { useFonts } from 'expo-font';
import { fontPath } from './src/atoms/paths';
import { LoadingContextProvider } from './src/util/Loading';
import LoadingModal from './src/components/LoadingModal';

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