import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

export default function Detalhes() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Sobre o Aplicativo</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subTitle}>Desenvolvedor</Text>
                    <Text style={styles.description}>
                        Camilly, Denilson, Gabriel Pantalhão, Gabriel Valle, George, Henry Silva
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subTitle}>Propósito do Aplicativo</Text>
                    <Text style={styles.description}>
                        O aplicativo visa facilitar o agendamento e o gerenciamento de consultas médicas, oferecendo uma interface amigável para pacientes e médicos. Ele proporciona uma maneira eficiente de acompanhar e organizar compromissos, mantendo a qualidade no atendimento.
                    </Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>©2024 GrupSenai</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3f2fd', // Azul claro para o fundo
    },
    scrollContainer: {
        padding: 20,
    },
    header: {
        backgroundColor: '#0288d1', // Azul intenso
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    section: {
        backgroundColor: '#ffffff', // Fundo branco para as seções
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000', // Sombra para adicionar profundidade
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2, // Sombra para Android
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0277bd', // Azul um pouco mais escuro
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#424242', // Cinza escuro
    },
    footer: {
        marginTop: 20,
        paddingVertical: 15,
        backgroundColor: '#0288d1', // Azul intenso
        borderRadius: 10,
        alignItems: 'center',
    },
    footerText: {
        color: '#fff',
        fontSize: 14,
    },
});
