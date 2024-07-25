


import React, { useState, useContext, createContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Paciente from './src/pages/Paciente';
import Medico from './src/pages/Medico';
import Detalhes from './src/pages/Detalhes';

const AuthContext = createContext();

const Stack = createStackNavigator();

const HomeStack = ({ navigation }) => {
  const { state, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!state.isAuthenticated) {
      navigation.navigate('Login');
    }
  }, [state.isAuthenticated, navigation]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name=" "
        component={Home}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={styles.logoButton}
              onPress={() => navigation.navigate('Detalhes')} // Exemplo de ação ao clicar no logo
            >
              <Image
                source={require('../APP-consulta/src/assets/v987-18a.jpg')} // Caminho para a imagem do logo
                style={styles.logo}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                state.isAuthenticated ? logout() : navigation.navigate('Login');
              }}
            >
              <Text style={styles.loginButtonText}>
                {state.isAuthenticated ? 'Sair' : 'Login'}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const PacienteStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Paciente" component={Paciente} />
    </Stack.Navigator>
  );
};

const MedicoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Medico" component={Medico} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Paciente"
        component={PacienteStack}
        options={({ route }) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Medico"
        component={MedicoStack}
        options={({ route }) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Detalhes"
        component={Detalhes} // Adiciona a tela Detalhes ao MainStack
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [state, setState] = useState({
    isAuthenticated: false,
    role: null, // 'paciente' or 'medico'
  });

  const login = (role) => {
    setState({ isAuthenticated: true, role });
  };

  const logout = () => {
    setState({ isAuthenticated: false, role: null });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  logoButton: {
    marginLeft: 4, // Espaço à esquerda do logo
    marginRight: -40,
    marginTop: 20,
  },
  logo: {
    width: 65, // Largura do logo
    height: 65, // Altura do logo
    marginTop: -25,
    marginLeft: 5,
  },
  loginButton: {
    
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 15,
  },
  loginButtonText: {
    color: '#0475c0',
    fontSize: 20,
    fontWeight:"bold" ,
  },
});
