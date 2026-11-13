import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

type Props = {
  message?: string;
};

const EmptyState = ({
  message = "No tasks found",
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📋</Text>
      <Text style={styles.title}>{message}</Text>
      <Text style={styles.subtitle}>
        Your tasks will appear here.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  icon: {
    fontSize: 42,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
  },
  subtitle: {
    color: COLORS.secondary,
    marginTop: 8,
  },
});

export default EmptyState;