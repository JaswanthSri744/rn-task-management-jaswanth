# Task Management & To-Do App

## Overview

A Task Management Mobile Application built using
React Native, Expo, TypeScript and Expo SQLite.

The application allows users to create, manage,
update, search and delete tasks.

All task information is stored locally using SQLite.
The application works without an internet connection.

## Features

- Dashboard with task statistics
- Add new tasks
- Edit existing tasks
- Delete tasks
- Task title and description
- High, Medium and Low priority
- Due date selection
- Mark tasks as completed or pending
- Search tasks
- Filter All, Pending and Completed tasks
- Sort tasks by priority and due date
- Local SQLite database
- Offline functionality
- Persistent data storage

## Technologies

- React Native
- Expo
- TypeScript
- Expo SQLite
- React Navigation
- Context API
- React Hooks
- FlatList

## Project Structure

src/
  components/
  screens/
  database/
  context/
  navigation/
  types/
  constants/

App.tsx

## Installation

Clone the repository:

git clone YOUR_GITHUB_REPOSITORY_URL

Navigate into the project:

cd Task14TodoApp

Install dependencies:

npm install

Start the Expo development server:

npx expo start

## Running the Application

- Scan the QR code using Expo Go on your phone.
- Or run on an Android emulator.

## Database

The application uses Expo SQLite.

Database name:

taskmanager.db

Table name:

tasks

Task information is stored locally on the device
and remains available after restarting the application.

## Offline Support

No external API is required.

All task CRUD operations are performed
using the local SQLite database.

## Author

Your Name