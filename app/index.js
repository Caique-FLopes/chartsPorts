import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View, StyleSheet } from 'react-native';
import AnaliseSimplificada from '../components/AnaliseSimplificada';
import Filtros from '../components/Filtros';
import GraficoDebitoPago from '../components/GraficoDebitoPago';

export default function Index() {
    
    return (
        <View style={styles.container}>
            <AnaliseSimplificada />
            <GraficoDebitoPago />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#031426',
    }
});
