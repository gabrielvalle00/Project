// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// import api from '../../service/api';

// const Login = ({ navigation }) => {
//     const [login, setLogin] = useState('');
//     const [senha, setSenha] = useState('');

//     const handleLogin = async () => {
//         try {
//             const response = await api.post('/login', { login, senha });
//             const { perfil } = response.data;

//             if (perfil.tipo === 'paciente') {
//                 navigation.navigate('Paciente');
//             } else if (perfil.tipo === 'medico') {
//                 navigation.navigate('Medico');
//             } else {
//                 Alert.alert('Perfil desconhecido', 'Não foi possível identificar o perfil do usuário.');
//             }
//         } catch (error) {
//             Alert.alert('Erro', 'Erro ao fazer login. Verifique suas credenciais e tente novamente.');
//         }
//     };

//     return (
//         <KeyboardAvoidingView
//             style={styles.container}
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         >
//             <ScrollView
//                 contentContainerStyle={styles.scrollContainer}
//                 keyboardShouldPersistTaps="handled"
//             >
//                 <Text style={styles.title}>Login</Text>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Login"
//                     placeholderTextColor="#9e9e9e"
//                     value={login}
//                     onChangeText={setLogin}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Senha"
//                     placeholderTextColor="#9e9e9e"
//                     value={senha}
//                     onChangeText={setSenha}
//                     secureTextEntry
//                 />
//                 <TouchableOpacity style={styles.button} onPress={handleLogin}>
//                     <Text style={styles.buttonText}>Entrar</Text>
//                 </TouchableOpacity>
//             </ScrollView>
//         </KeyboardAvoidingView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#e3f2fd', // Azul claro para o fundo
//     },
//     scrollContainer: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         padding: 16,
//     },
//     title: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         marginBottom: 40,
//         textAlign: 'center',
//         color: '#0277bd', // Azul escuro para o título
//     },
//     input: {
//         height: 50,
//         borderColor: '#81d4fa', // Azul claro para a borda
//         borderWidth: 1,
//         borderRadius: 10,
//         marginBottom: 20,
//         paddingHorizontal: 16,
//         backgroundColor: '#ffffff', // Fundo branco para o campo de entrada
//     },
//     button: {
//         backgroundColor: '#0288d1', // Azul intenso para o botão
//         paddingVertical: 15,
//         borderRadius: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });

// export default Login;


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const Login = ({ navigation }) => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = () => {
        // Dados fixos para validação local
        const users = [
            { login: 'paciente', senha: '1234', tipo: 'paciente' },
            { login: 'medico', senha: '1234', tipo: 'medico' },
        ];

        const user = users.find(user => user.login === login && user.senha === senha);

        if (user) {
            if (user.tipo === 'paciente') {
                navigation.navigate('Paciente');
            } else if (user.tipo === 'medico') {
                navigation.navigate('Medico');
            }
        } else {
            Alert.alert('Erro', 'Credenciais inválidas. Verifique suas informações e tente novamente.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Login"
                    placeholderTextColor="#9e9e9e"
                    value={login}
                    onChangeText={setLogin}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#9e9e9e"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3f2fd', // Azul claro para o fundo
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
        color: '#0277bd', // Azul escuro para o título
    },
    input: {
        height: 50,
        borderColor: '#81d4fa', // Azul claro para a borda
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff', // Fundo branco para o campo de entrada
    },
    button: {
        backgroundColor: '#0288d1', // Azul intenso para o botão
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Login;


