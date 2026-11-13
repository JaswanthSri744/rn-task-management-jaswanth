import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";

import { NativeStackScreenProps } from
  "@react-navigation/native-stack";

import DashboardCard from "../components/DashboardCard";

import { useTasks } from "../context/TaskContext";

import { RootStackParamList } from "../types/Task";
import { COLORS } from "../constants/colors";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Dashboard"
>;

const DashboardScreen = ({ navigation }: Props) => {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Dashboard</Text>
        <Text style={styles.subtitle}>
          Manage your daily activities
        </Text>
      </View>

      <View style={styles.stats}>
        <DashboardCard
          title="Total Tasks"
          count={totalTasks}
          color={COLORS.primary}
        />

        <DashboardCard
          title="Pending"
          count={pendingTasks}
          color={COLORS.warning}
        />

        <DashboardCard
          title="Completed"
          count={completedTasks}
          color={COLORS.success}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Quick Actions
        </Text>

        <Pressable
          style={styles.addButton}
          onPress={() => navigation.navigate("AddTask")}
        >
          <Text style={styles.buttonText}>
            + Add New Task
          </Text>
        </Pressable>

        <Pressable
          style={styles.viewButton}
          onPress={() => navigation.navigate("Tasks")}
        >
          <Text style={styles.viewButtonText}>
            View All Tasks →
          </Text>
        </Pressable>
      </View>

      <View style={styles.summary}>
        <Text style={styles.sectionTitle}>
          Task Progress
        </Text>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progress,
              {
                width:
                  totalTasks === 0
                    ? "0%"
                    : `${(completedTasks / totalTasks) * 100}%`,
              },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          {totalTasks === 0
            ? "No tasks available"
            : `${Math.round(
                (completedTasks / totalTasks) * 100
              )}% completed`}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  header: {
    marginVertical: 18,
  },
  heading: {
    fontSize: 27,
    fontWeight: "bold",
    color: COLORS.black,
  },
  subtitle: {
    color: COLORS.secondary,
    marginTop: 6,
  },
  stats: {
    flexDirection: "row",
    marginHorizontal: -5,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 15,
  },
  viewButton: {
    padding: 16,
    alignItems: "center",
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  viewButtonText: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  summary: {
    marginTop: 30,
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 14,
  },
  progressBackground: {
    height: 10,
    backgroundColor: COLORS.border,
    borderRadius: 10,
    overflow: "hidden",
  },
  progress: {
    height: 10,
    backgroundColor: COLORS.success,
    borderRadius: 10,
  },
  progressText: {
    marginTop: 12,
    color: COLORS.secondary,
  },
});

export default DashboardScreen;