import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

type TaskModel = {
	id: string;
	text: string;
};

const initialState: { tasks: TaskModel[] } = {
	tasks: [],
};

const addTask: CaseReducer<{ tasks: TaskModel[] }, PayloadAction<TaskModel>> = (state, action) => {
	state.tasks.push(action.payload);
};

const deleteTask: CaseReducer<{ tasks: TaskModel[] }, PayloadAction<string>> = (state, action) => {
	state.tasks = state.tasks.filter((task) => task.id !== action.payload);
};

const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		addTask,
		deleteTask,
	},
});

export const taskActions = taskSlice.actions;

export const selectTask = (state: RootState) => state.task.tasks;

export default taskSlice;
