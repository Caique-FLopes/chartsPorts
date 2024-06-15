import React from 'react';
import { Dimensions, Text, View, StyleSheet } from "react-native";
import AnaliseSimplificada from '../components/AnaliseSimplificada';
import {
  LineChart
} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  background: "#ccc",
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false
};

export default function Index() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        strokeWidth: 2
      }
    ],
    legend: ["Rainy Days"]
  };

  return (
    <View style={styles.container}>
      <AnaliseSimplificada />
      <View>
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#031426",
  }
});
