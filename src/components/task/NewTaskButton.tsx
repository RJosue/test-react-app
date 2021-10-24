import classes from './NewTaskButton.module.css';
import { useAppDispatch } from '../../store/hooks';
import { uiActions } from '../../store/ui-slice';
const NewTaskButton = () => {
	const dispatch = useAppDispatch();
	const onClickOpenModalHandler = () => {
		dispatch(uiActions.toggle());
	};

	return (
		<div className={classes.addTask}>
			<button data-testid='btn-new-task' onClick={onClickOpenModalHandler}>New Task</button>
		</div>
	);
};

export default NewTaskButton;
