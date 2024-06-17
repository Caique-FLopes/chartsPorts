import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import AnaliseSimplificada from '../components/AnaliseSimplificada';
import { FiltroProvider } from '../context/contextoFiltro';
import FiltroBotao from '../components/Filtros';
import GraficoDebitoPago from '../components/GraficoDebitoPago';
import GraficoExito from '../components/GraficoExitoTotal';

export default function Index() {
    return (
        <FiltroProvider>
            <ScrollView style={styles.container}>
                <AnaliseSimplificada />
                <GraficoDebitoPago />
                <GraficoExito />
            </ScrollView>
        </FiltroProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#031426',
    }
});
