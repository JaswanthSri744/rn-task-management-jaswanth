import React from "react";

import { createNativeStackNavigator } from
  "@react-navigation/native-stack";

import DashboardScreen from "../screens/DashboardScreen";
import TaskListScreen from "../screens/TaskListScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import EditTaskScreen from "../screens/EditTaskScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";

import { RootStackParamList } from "../types/Task";
import { COLORS } from "../constants/colors";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: "Task Manager",
        }}
      />

      <Stack.Screen
        name="Tasks"
        component={TaskListScreen}
        options={{
          title: "My Tasks",
        }}
      />

      <Stack.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={{
          title: "Add New Task",
        }}
      />

      <Stack.Screen
        name="EditTask"
        component={EditTaskScreen}
        options={{
          title: "Edit Task",
        }}
      />

      <Stack.Screen
        name="TaskDetails"
        component={TaskDetailsScreen}
        options={{
          title: "Task Details",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;