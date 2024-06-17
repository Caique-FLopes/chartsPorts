import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchDadosSimplificados } from '../services/FetchAnaliseSimplificada';

export default function AnaliseSimplificada() {
    const [carregando, setCarregando] = useState(true);
    const [dados, setDados] = useState({});

    useEffect(() => {
        fetchDadosSimplificados()
            .then((data) => setDados(data))
            .catch(() => alert('Erro ao carregar as informações'))
            .finally(() => setCarregando(false));
    }, []);

    if (carregando) {
        return (
            <View style={styles.box}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.itemName}>Cobrado: {dados.cobrado}</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.itemName}>Débito Pago: {dados.debito_pago}</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.itemName}>Débito Parcelado: {dados.debito_parcelado}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        width: '100%',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    itemValue: {
        fontSize: 16,
        textAlign: 'center'
    },
});
