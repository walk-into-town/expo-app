import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import Home from './src/components/Home';

const App = () => {
  return (
    <Container>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Home/>
      <StatusBar style="auto" />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default App;