import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Alert,
    FlatList
} from 'react-native';
import api from '../../service/api';

const Medico = () => {
    const [consultas, setConsultas] = useState([]);
    const [medico, setMedico] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMedicoData = async () => {
            try {
                const medicoResponse = await api.get('/medico/1'); // Altere para o ID correto
                setMedico(medicoResponse.data);

                const consultasResponse = await api.get('/consultas/medico/1'); // Altere para o ID correto
                setConsultas(consultasResponse.data);
            } catch (err) {
                setError('Erro ao carregar dados');
                Alert.alert('Erro', 'Não foi possível carregar os dados do médico e consultas.');
            } finally {
                setLoading(false);
            }
        };

        fetchMedicoData();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0288d1" />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.medicoInfo}>
                <Text style={styles.title}>Informações do Médico</Text>
                <Text style={styles.infoText}>Nome: {medico.nome || 'Não disponível'}</Text>
                <Text style={styles.infoText}>CPF: {medico.cpf || 'Não disponível'}</Text>
                <Text style={styles.infoText}>Email: {medico.email || 'Não disponível'}</Text>
                <Text style={styles.infoText}>Telefone: {medico.telefone || 'Não disponível'}</Text>
                <Text style={styles.infoText}>Especialidade: {medico.especialidade || 'Não disponível'}</Text>
            </View>

            <View style={styles.consultasContainer}>
                <Text style={styles.title}>Consultas</Text>
                {consultas.length > 0 ? (
                    <FlatList
                        data={consultas}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.consulta}>
                                <Text style={styles.consultaText}>Data: {item.data}</Text>
                                <Text style={styles.consultaText}>Paciente: {item.paciente}</Text>
                            </View>
                        )}
                    />
                ) : (
                    <Text style={styles.noConsultasText}>Sem consultas agendadas</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#e3f2fd',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#0288d1',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
    },
    medicoInfo: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
        elevation: 2,
    },
    consultasContainer: {
        flex: 1,
    },
    consulta: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#81d4fa',
        borderRadius: 8,
        marginVertical: 8,
        backgroundColor: '#ffffff',
    },
    consultaText: {
        fontSize: 16,
        color: '#333',
    },
    noConsultasText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#0277bd',
    },
    infoText: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
});

export default Medico;





// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     ActivityIndicator,
//     TouchableOpacity,
//     FlatList
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const Medico = () => {
//     const [consultas, setConsultas] = useState([]);
//     const [medico, setMedico] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Simular a obtenção de dados
//         const fetchMedicoData = async () => {
//             try {
//                 // Dados simulados
//                 const simulatedMedicoData = {
//                     nome: 'Dr. João Silva',
//                     cpf: '123.456.789-00',
//                     email: 'joao.silva@clinica.com',
//                     telefone: '(11) 98765-4321',
//                     especialidade: 'Cardiologista'
//                 };
//                 const simulatedConsultasData = [
//                     { id: 1, data: '2024-08-01', paciente: 'Ana Costa' },
//                     { id: 2, data: '2024-08-05', paciente: 'Carlos Souza' }
//                 ];

//                 setMedico(simulatedMedicoData);
//                 setConsultas(simulatedConsultasData);
//             } catch (err) {
//                 setError('Erro ao carregar dados');
//                 // Alert.alert('Erro', 'Não foi possível carregar os dados do médico e consultas.'); // Descomente se necessário
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMedicoData();
//     }, []);

//     const refreshData = () => {
//         setLoading(true);
//         setError(null);
//         // Simular nova obtenção de dados
//         const fetchMedicoData = async () => {
//             try {
//                 // Dados simulados
//                 const simulatedMedicoData = {
//                     nome: 'Dr. João Silva',
//                     cpf: '123.456.789-00',
//                     email: 'joao.silva@clinica.com',
//                     telefone: '(11) 98765-4321',
//                     especialidade: 'Cardiologista'
//                 };
//                 const simulatedConsultasData = [
//                     { id: 1, data: '2024-08-01', paciente: 'Ana Costa' },
//                     { id: 2, data: '2024-08-05', paciente: 'Carlos Souza' }
//                 ];

//                 setMedico(simulatedMedicoData);
//                 setConsultas(simulatedConsultasData);
//             } catch (err) {
//                 setError('Erro ao carregar dados');
//                 // Alert.alert('Erro', 'Não foi possível carregar os dados do médico e consultas.'); // Descomente se necessário
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMedicoData();
//     };

//     if (loading) {
//         return (
//             <View style={styles.container}>
//                 <ActivityIndicator size="large" color="#0288d1" />
//                 <Text style={styles.loadingText}>Carregando...</Text>
//             </View>
//         );
//     }

//     if (error) {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.errorText}>{error}</Text>
//                 <TouchableOpacity onPress={refreshData} style={styles.refreshButton}>
//                     <Icon name="refresh" size={24} color="#fff" />
//                     <Text style={styles.refreshButtonText}>Tentar Novamente</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <View style={styles.medicoInfo}>
//                 <Text style={styles.title}>Informações do Médico</Text>
//                 <Text style={styles.infoText}>Nome: {medico.nome || 'Não disponível'}</Text>
//                 <Text style={styles.infoText}>CPF: {medico.cpf || 'Não disponível'}</Text>
//                 <Text style={styles.infoText}>Email: {medico.email || 'Não disponível'}</Text>
//                 <Text style={styles.infoText}>Telefone: {medico.telefone || 'Não disponível'}</Text>
//                 <Text style={styles.infoText}>Especialidade: {medico.especialidade || 'Não disponível'}</Text>
//             </View>

//             <View style={styles.consultasContainer}>
//                 <Text style={styles.title}>Consultas</Text>
//                 {consultas.length > 0 ? (
//                     <FlatList
//                         data={consultas}
//                         keyExtractor={(item) => item.id.toString()}
//                         renderItem={({ item }) => (
//                             <View style={styles.consulta}>
//                                 <Text style={styles.consultaText}>Data: {item.data}</Text>
//                                 <Text style={styles.consultaText}>Paciente: {item.paciente}</Text>
//                             </View>
//                         )}
//                     />
//                 ) : (
//                     <Text style={styles.noConsultasText}>Sem consultas agendadas</Text>
//                 )}
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: '#e3f2fd',
//     },
//     loadingText: {
//         marginTop: 10,
//         fontSize: 16,
//         color: '#0288d1',
//     },
//     errorText: {
//         color: 'red',
//         fontSize: 18,
//         textAlign: 'center',
//     },
//     refreshButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#0288d1',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//         marginTop: 20,
//     },
//     refreshButtonText: {
//         color: '#fff',
//         fontSize: 16,
//         marginLeft: 8,
//     },
//     medicoInfo: {
//         backgroundColor: '#ffffff',
//         padding: 16,
//         borderRadius: 8,
//         marginBottom: 20,
//         elevation: 2,
//     },
//     consultasContainer: {
//         flex: 1,
//     },
//     consulta: {
//         padding: 16,
//         borderWidth: 1,
//         borderColor: '#81d4fa',
//         borderRadius: 8,
//         marginVertical: 8,
//         backgroundColor: '#ffffff',
//     },
//     consultaText: {
//         fontSize: 16,
//         color: '#333',
//     },
//     noConsultasText: {
//         fontSize: 16,
//         color: '#666',
//         textAlign: 'center',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 16,
//         color: '#0277bd',
//     },
//     infoText: {
//         fontSize: 16,
//         marginBottom: 8,
//         color: '#333',
//     },
// });

// export default Medico;
