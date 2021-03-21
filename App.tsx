import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContextProvider } from './src/api/Auth';

import Navigator from "./src/navigation";
import GlobalStyle from './src/style/global';
import theme from './src/style/theme';

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <Navigator />
      </AuthContextProvider>
      <GlobalStyle />
    </SafeAreaProvider>
  );
}
export default App;