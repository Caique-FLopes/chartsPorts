import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { fetchAtraso } from '../services/FetchAtraso';

export default function Filtros() {
    const [carregando, setCarregando] = useState(true);
    const [dados, setDados] = useState([]);

    useEffect(() => {
        fetchAtraso()
            .then((data) => {
                console.log("Dados recebidos:", data);
                setDados(data.filtro);
            })
            .catch(() => alert('Erro ao carregar as informações'))
            .finally(() => setCarregando(false));
    }, []);

    if (carregando) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                items={dados.map(item => ({ label: item.label, value: item.value }))}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
});
