import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

type Props = {
  title: string;
  count: number;
  color: string;
};

const DashboardCard = ({ title, count, color }: Props) => {
  return (
    <View style={styles.card}>
      <View style={[styles.indicator, { backgroundColor: color }]} />

      <Text style={styles.count}>{count}</Text>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 14,
    margin: 5,
    elevation: 2,
  },
  indicator: {
    width: 9,
    height: 9,
    borderRadius: 10,
    marginBottom: 10,
  },
  count: {
    fontSize: 25,
    fontWeight: "bold",
    color: COLORS.black,
  },
  title: {
    fontSize: 12,
    color: COLORS.secondary,
    marginTop: 5,
  },
});

export default DashboardCard;