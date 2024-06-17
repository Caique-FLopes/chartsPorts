import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FiltroContext } from '../context/contextoFiltro';
import { fetchAtraso } from '../services/FetchAtraso';

const FiltroBotao = () => {
    const { filtroAtraso, setFiltroAtraso } = useContext(FiltroContext);
    const [filtros, setFiltros] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const carregarFiltros = async () => {
            try {
                const dados = await fetchAtraso();
                setFiltros(dados.filtro);
            } catch (error) {
                console.error('Erro ao carregar os filtros:', error.message);
            } finally {
                setCarregando(false);
            }
        };

        carregarFiltros();
    }, []);

    if (carregando) {
        return <ActivityIndicator size="large" color="#007BFF" />;
    }

    return (
        <View style={styles.buttonContainer}>
            {filtros.map((botao) => (
                <TouchableOpacity
                    key={botao.value}
                    style={[
                        styles.button,
                        filtroAtraso === botao.value && styles.selectedButton,
                    ]}
                    onPress={() => setFiltroAtraso(botao.value)}
                >
                    <Text style={styles.buttonText}>{botao.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        backgroundColor: '#007BFF',
    },
    selectedButton: {
        backgroundColor: '#0056b3',
    },
    buttonText: {
        color: '#ffffff',
    },
});

export default FiltroBotao;
