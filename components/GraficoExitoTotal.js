import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { fetchDebitoPago } from '../services/FetchDebitoPago'; // Ajuste conforme necessário para o seu serviço de busca

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    formatYLabel: (y) => `${y}%`,
    style: {
        borderRadius: 16,
    },
    propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: '#ffa726',
    },
};

export default function GraficoExito() {
    const [carregando, setCarregando] = useState(true);
    const [dados, setDados] = useState([]);
    const [filtroAtraso, setFiltroAtraso] = useState('0 a 30');

    useEffect(() => {
        fetchDebitoPago()
            .then((data) => {
                setDados(data);
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

    const filtrarDadosPorAtraso = () => {
        return dados.filter(item => item.atraso === filtroAtraso);
    };

    const groupedData = {};
    filtrarDadosPorAtraso().forEach((item) => {
        const mes = new Date(item.mes).toLocaleString('default', { month: 'long' });
        if (!groupedData[mes]) {
            groupedData[mes] = [];
        }
        groupedData[mes].push(Number(item.debito_pago));
    });

    const data = {
        labels: Object.keys(groupedData),
        datasets: [
            {
                data: Object.values(groupedData).map((arr) => arr.reduce((acc, val) => acc + val, 0)),
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Ajuste a cor conforme necessário
            },
        ],
    };

    const filtroBotoes = [
        { label: '0 a 30', value: '0 a 30' },
        { label: '31 a 60', value: '31 a 60' },
        { label: '61 a 90', value: '61 a 90' },
        { label: '91 a 180', value: '91 a 180' },
        { label: '181 a 9999', value: '181 a 9999' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.tituloGrafico}>Percentual de Exito ao Longo do Tempo</Text>
            <View style={styles.buttonContainer}>
                {filtroBotoes.map((botao) => (
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

            <LineChart
                style={styles.graphStyle}
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#031426',
        marginTop: 20,
    },
    tituloGrafico:{
        color: '#fff',
        fontSize: 18,
    },
    graphStyle: {
        marginVertical: 8,
        borderRadius: 16,
    },
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
