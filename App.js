import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';

import store from './redux/store';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import { AuthProvider } from './components/AuthAPI';

const Stack = createStackNavigator();

const ProtectedRoute = ({ children }) => {
  const { token, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return token ? children : <Login />;
};

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  </Provider>
);

export default App;
