import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { taskActions } from '../../store/task-slice';

import classes from './TaskList.module.css';
const TaskLisk = () => {
	const tasks = useAppSelector((state) => state.task.tasks);
	const dispatch = useAppDispatch();

	if (tasks.length === 0) {
		return <h1>No Tasks Found!</h1>;
	}

	const onDeleteHandler = (id: string) => {
		dispatch(taskActions.deleteTask(id));
	};

	return (
		<div className='centered'>
			<ul className={classes.tasks}>
				{tasks.map((task) => (
					<li
						className={classes.item}
						key={task.id}
						onClick={onDeleteHandler.bind(null, task.id)}>
						{task.text}
					</li>
				))}
			</ul>
		</div>
	);
};

export default TaskLisk;
