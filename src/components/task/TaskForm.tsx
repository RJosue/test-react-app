import React from 'react';
import useInput from '../../hooks/use-input';
import { useAppDispatch } from '../../store/hooks';
import { taskActions } from '../../store/task-slice';
import { uiActions } from '../../store/ui-slice';

import classes from './TaskForm.module.css';

const TaskForm = () => {
	const dispatch = useAppDispatch();
	const {
		value: inputTaskValue,
		hasError: inputTaskError,
		isValid: inputTaskValid,
		valueChangeHandler,
		inputBlurHandler,
		reset,
	} = useInput<string>((value) => value.trim() !== '');

	const onCancelhandler = (event: React.FormEvent) => {
		event.preventDefault();
		dispatch(uiActions.toggle());
		reset();
	};

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		valueChangeHandler(event.target.value);
	};

	const onSubmitHandler = (event: React.FormEvent) => {
		event.preventDefault();

		if (!inputTaskValid) return;

		dispatch(
			taskActions.addTask({
				id: (Math.random() + 1).toString(36).substring(7).toString(),
				text: inputTaskValue,
			}),
		);

		reset();
	};

	const taskInputClasses = !inputTaskError
		? classes.control
		: `${classes.control} ${classes.invalid}`;

	const btnTaskClass = !inputTaskValid ? 'btn-disabled' : 'btn';

	return (
		<form className={classes.form} onSubmit={onSubmitHandler} data-testid='form-new'>
			<h2 className='center'>Add a New Task</h2>
			<div className={taskInputClasses}>
				<label htmlFor='task'>Task *</label>
				<input
					type='text'
					id='task'
					data-testid='task-input'
					value={inputTaskValue}
					onChange={onChangeInput}
					onBlur={inputBlurHandler}
				/>
				{inputTaskError && <p className='error-text'>Task must not be empty.</p>}
			</div>
			<div className={classes.actions}>
				<button onClick={onCancelhandler} className='btn cancel'>
					Close
				</button>
				<button className={btnTaskClass} disabled={!inputTaskValid}>
					Add Task
				</button>
			</div>
		</form>
	);
};

export default TaskForm;
