import React from "react";

import { NavigationContainer } from
  "@react-navigation/native";

import { SQLiteProvider } from "expo-sqlite";

import { TaskProvider } from "./src/context/TaskContext";

import { initializeDatabase } from
  "./src/database/database";

import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <SQLiteProvider
      databaseName="taskmanager.db"
      onInit={initializeDatabase}
    >
      <TaskProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </TaskProvider>
    </SQLiteProvider>
  );
}