import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login';
import Paciente from '../pages/Paciente';
import Medico from '../pages/Medico';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Paciente" component={Paciente} />
                <Stack.Screen name="Medico" component={Medico} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
