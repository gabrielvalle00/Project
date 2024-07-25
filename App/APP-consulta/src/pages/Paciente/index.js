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

const Paciente = () => {
    const [consultas, setConsultas] = useState([]);
    const [paciente, setPaciente] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPacienteData = async () => {
            try {
                const pacienteResponse = await api.get('/paciente/1'); // Altere para o ID correto
                setPaciente(pacienteResponse.data);

                const consultasResponse = await api.get('/consultas/paciente/1'); // Altere para o ID correto
                setConsultas(consultasResponse.data);
            } catch (err) {
                setError('Erro ao carregar dados');
                Alert.alert('Erro', 'Não foi possível carregar os dados do paciente e consultas.');
            } finally {
                setLoading(false);
            }
        };

        fetchPacienteData();
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
            <View style={styles.pacienteInfo}>
                <Text style={styles.title}>Informações do Paciente</Text>
                <Text style={styles.infoText}>Nome: {paciente.nome || 'Não disponível'}</Text>
                <Text style={styles.infoText}>CPF: {paciente.cpf || 'Não disponível'}</Text>
                <Text style={styles.infoText}>Email: {paciente.email || 'Não disponível'}</Text>
                <Text style={styles.infoText}>Telefone: {paciente.telefone || 'Não disponível'}</Text>
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
                                <Text style={styles.consultaText}>Médico: {item.medico}</Text>
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
    pacienteInfo: {
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

export default Paciente;
