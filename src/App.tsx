import { AppRegistry } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { ThemeProvider } from '@rneui/themed';
import { theme } from './styles/theme';
import RootNavigator from './nav/RootNavigator';
import { AuthProvider } from './context/AuthContext';
import { client } from './ApolloClient';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NavigationContainer>
          <ThemeProvider theme={theme}>
            <RootNavigator />
          </ThemeProvider>
        </NavigationContainer>
      </AuthProvider>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('main', () => App);

/* 
To move App.tsx from ./ to ./src/
  - package.json: "main": "src/App.tsx",
  - Override node_modules\expo\AppEntry.js 
*/
registerRootComponent(App);
