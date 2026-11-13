import React, { useMemo, useState } from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";

import { NativeStackScreenProps } from
  "@react-navigation/native-stack";

import TaskCard from "../components/TaskCard";
import SearchBar from "../components/SearchBar";
import FilterTabs, {
  FilterType,
} from "../components/FilterTabs";
import EmptyState from "../components/EmptyState";

import { useTasks } from "../context/TaskContext";

import { RootStackParamList } from "../types/Task";
import { COLORS } from "../constants/colors";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Tasks"
>;

type SortType = "Due Date" | "Priority";

const priorityOrder = {
  High: 1,
  Medium: 2,
  Low: 3,
};

const TaskListScreen = ({ navigation }: Props) => {
  const {
    tasks,
    loading,
    removeTask,
    toggleTask,
  } = useTasks();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("All");

  const [sort, setSort] = useState<SortType>("Due Date");

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (filter === "Pending") {
      result = result.filter((task) => !task.completed);
    } else if (filter === "Completed") {
      result = result.filter((task) => task.completed);
    }

    const searchText = search.trim().toLowerCase();

    if (searchText) {
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchText) ||
          task.description.toLowerCase().includes(searchText)
      );
    }

    result.sort((a, b) => {
      if (sort === "Priority") {
        return (
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
        );
      }

      return a.dueDate.localeCompare(b.dueDate);
    });

    return result;
  }, [tasks, filter, search, sort]);

  const confirmDelete = (id: number) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            removeTask(id).catch(() =>
              Alert.alert("Error", "Unable to delete task.")
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Tasks</Text>

        <Pressable
          style={styles.addButton}
          onPress={() => navigation.navigate("AddTask")}
        >
          <Text style={styles.addText}>+ Add</Text>
        </Pressable>
      </View>

      <SearchBar
        value={search}
        onChangeText={setSearch}
      />

      <FilterTabs
        selected={filter}
        onSelect={setFilter}
      />

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>

        {(["Due Date", "Priority"] as SortType[]).map(
          (item) => (
            <Pressable
              key={item}
              style={[
                styles.sortButton,
                sort === item && styles.activeSort,
              ]}
              onPress={() => setSort(item)}
            >
              <Text
                style={[
                  styles.sortText,
                  sort === item && styles.activeSortText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          )
        )}
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={styles.loader}
        />
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onPress={() =>
                navigation.navigate("TaskDetails", {
                  taskId: item.id,
                })
              }
              onToggle={() =>
                toggleTask(item.id, !item.completed).catch(
                  () => Alert.alert("Error", "Unable to update task.")
                )
              }
              onEdit={() =>
                navigation.navigate("EditTask", {
                  taskId: item.id,
                })
              }
              onDelete={() => confirmDelete(item.id)}
            />
          )}
          contentContainerStyle={
            filteredTasks.length === 0
              ? styles.emptyContainer
              : styles.listContent
          }
          ListEmptyComponent={
            <EmptyState
              message={
                search || filter !== "All"
                  ? "No matching tasks found"
                  : "No tasks added yet"
              }
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: COLORS.black,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 9,
  },
  addText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  sortLabel: {
    color: COLORS.secondary,
    fontSize: 12,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeSort: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  sortText: {
    color: COLORS.secondary,
    fontSize: 11,
  },
  activeSortText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  loader: {
    marginTop: 50,
  },
  listContent: {
    paddingBottom: 30,
  },
  emptyContainer: {
    flexGrow: 1,
  },
});

export default TaskListScreen;