# Daily Tasks Tracker App; Nuxt 3 Vue.

## Overview

**DailyTasks** is a task management application designed to help you organize and track your daily activities. This app uses local storage to store tasks and provides features such as task creation, assignment, and progress tracking through subtasks. 

### Features

- **Local Storage**: Tasks are stored in your browser's local storage.
- **Task Management**: Create, edit, and delete tasks.
- **Subtask Management**: Add, edit, and delete subtasks. Progress is tracked as subtasks are completed.
- **User Assignment**: Assign tasks to individuals.
- **Progress Tracking**: View the percentage completion of tasks based on completed subtasks.
- **Dashboard Charts**: Visual representation of task statuses (Done, In Progress, To-Do).

## Live Demo

Check out the live demo [here](https://daily-tasks-xi.vercel.app/).

## How to Use

1. **Creating Tasks**:
   - Click on the "+" button to open the task creation modal.
   - Fill in the task details such as name, deadline, and description.
   - Click "Add Task" to save the task.

2. **Managing Tasks**:
   - Tasks can be edited or deleted using the edit and delete icons next to each task.
   - To view task details, click on the task name.
  
3. **Assign People**
   - After creating a main task, you can assign the task to individuals if necessary.

4. **Adding Subtasks**:
   - After creating a main task, you can add subtasks by clicking on the task and navigating to the subtasks section.
   - Add subtask details and save them.
   - Completed subtasks will update the main task's progress percentage.

5. **Task Progress**:
   - The main task will display a progress percentage based on the completion of its subtasks.
   - This helps you track how much of the task has been completed.

6. **Filtering by Date**:
   - Use the date filter input to filter tasks by their deadline date (integration pending).

## Installation

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/amt-daniel-adeabah/DailyTasks.git
   ```
2. Navigate to the project directory:
   ```bash
   cd DailyTasks
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   or if you're using Yarn:
   ```bash
   yarn install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   or if you're using Yarn:
   ```bash
   yarn run dev
   ```

The application will be available at `http://localhost:3000`.

## Thank You

If you like my works kindly give me a heart ❤
