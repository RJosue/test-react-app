import NewTaskButton from '../components/task/NewTaskButton';
import TaskForm from '../components/task/TaskForm';
import TaskLisk from '../components/task/TaskList';
import Modal from '../components/UI/Modal';
import { useAppSelector } from '../store/hooks';
const Task = () => {
	const modalIsVisile = useAppSelector((state) => state.ui.modalIsVisible);
	return (
		<>
			<NewTaskButton />
			<TaskLisk />
			{modalIsVisile && (
				<Modal>
					<TaskForm />
				</Modal>
			)}
		</>
	);
};

export default Task;
