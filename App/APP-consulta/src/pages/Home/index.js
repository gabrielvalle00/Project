import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const Home = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            
            <View style={styles.content}>
                <Text style={styles.title}>Bem-vindo à Nossa Clínica</Text>
                <Text style={styles.description}>
                    Nossa clínica oferece os melhores serviços de saúde com uma equipe altamente qualificada e dedicada ao seu bem-estar. Venha nos visitar e confira todos os nossos serviços.
                </Text>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Paciente')}>
                    <Image
                        source={require('../../assets/v987-18a.jpg')} // Caminho para a imagem de pacientes
                        style={styles.cardImage}
                    />
                    <Text style={styles.cardTitle}>Área do Paciente</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Medico')}>
                    <Image
                        source={require('../../assets/v987-18a.jpg')} // Caminho para a imagem de médicos
                        style={styles.cardImage}
                    />
                    <Text style={styles.cardTitle}>Área do Médico</Text>
                </TouchableOpacity>
               
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Nossos Serviços</Text>
                    <Text style={styles.sectionText}>
                        - Consultas de rotina{'\n'}
                        - Exames laboratoriais{'\n'}
                        - Atendimento de emergência{'\n'}
                        - Cuidados especializados
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contatos</Text>
                    <Text style={styles.sectionText}>
                        Telefone: (11) 1234-5678{'\n'}
                        Email: contato@clinicaficticia.com{'\n'}
                        Endereço: Rua Fictícia, 123, São Paulo, SP
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#e3f2fd', // Azul claro para o fundo
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#033e7e',
    },
    content: {
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#033e7e',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
        marginBottom: 20,
    },
    card: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 3,
    },
    cardImage: {
        width: '100%',
        height: 150,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
        color: '#033e7e',
    },
    section: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#033e7e',
    },
    sectionText: {
        fontSize: 16,
        color: '#333',
    },
});

export default Home;
