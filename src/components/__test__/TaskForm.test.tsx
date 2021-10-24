import { render, fireEvent, screen } from '../../test-utils';
import TaskForm from '../task/TaskForm';

describe('Task Form', () => {
	test('initial state', () => {
          render(<TaskForm />);

		expect(screen.queryByText('Task must not be empty.')).toBeNull();
		expect(screen.queryByText('Add Task')).toHaveAttribute('disabled');
	});

	test('onchage a input with correct data', () => {
		const textInput = 'Task 1';

		render(<TaskForm />);

		fireEvent.change(screen.getByTestId('task-input'), {
			target: {
				value: textInput,
			},
		});

		expect(screen.queryByText('Task must not be empty.')).toBeNull();
		expect(screen.queryByText('Add Task')).not.toHaveAttribute('disabled');
	});

	test('onchage a input with incorrect data', () => {
		render(<TaskForm />);

		fireEvent.change(screen.getByTestId('task-input'), {
			target: {
				value: 'Task 1',
			},
		});

		fireEvent.change(screen.getByTestId('task-input'), {
			target: {
				value: '',
			},
		});

		expect(screen.queryByText('Task must not be empty.')).not.toBeNull();
		expect(screen.queryByText('Add Task')).toHaveAttribute('disabled');
	});

	test('on blur invalid value', () => {
		render(<TaskForm />);

		fireEvent.blur(screen.getByTestId('task-input'), {
			target: {
				value: '',
			},
		});

		expect(screen.queryByText('Task must not be empty.')).not.toBeNull();
		expect(screen.queryByText('Add Task')).toHaveAttribute('disabled');
	});

     test('on blur with correct value', () => {
          render(<TaskForm />);

		fireEvent.change(screen.getByTestId('task-input'), {
			target: {
				value: 'Task 1',
			},
		});

		fireEvent.blur(screen.getByTestId('task-input'));

		expect(screen.queryByText('Task must not be empty.')).toBeNull();
		expect(screen.queryByText('Add Task')).not.toHaveAttribute('disabled');
     })
});
