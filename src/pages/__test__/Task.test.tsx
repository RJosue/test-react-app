import { render, fireEvent, screen } from '../../test-utils';

import Task from '../Task';

describe('Task component', () => {
	test('Render a modal and form component when the user click add new task button', async () => {
		render(<Task />);

		fireEvent.click(screen.getByTestId('btn-new-task'));

		expect(screen.getByTestId('modal')).toBeInTheDocument();
		expect(screen.getByTestId('form-new')).toBeInTheDocument();
	});

	test('On add a new task with VALID value', async () => {
		render(<Task />);

		expect(screen.queryByTestId('modal')).not.toBeTruthy();

		fireEvent.click(screen.getByTestId('btn-new-task'));

		expect(screen.getByTestId('modal')).toBeInTheDocument();
		expect(screen.getByTestId('form-new')).toBeInTheDocument();

		fireEvent.change(screen.getByTestId('task-input'), {
			target: {
				value: 'Task 1',
			},
		});

		expect(screen.queryByText('Task must not be empty.')).toBeNull();
		expect(screen.queryByText('Add Task')).not.toHaveAttribute('disabled');
		
		fireEvent.click(screen.getByText('Add Task'));
		
		expect(screen.getByTestId('task-input')).toHaveValue('')
		expect(screen.queryByText('Task must not be empty.')).toBeNull();
		expect(screen.queryByText('Add Task')).toHaveAttribute('disabled');

		fireEvent.click(screen.getByText('Close'));

		expect(screen.queryByTestId('modal')).toBeNull();

		expect(await screen.findAllByRole('listitem')).not.toHaveLength(0);
	});

	test('On try to add a new task with INVALID value', async () => {
		render(<Task />);

		expect(screen.queryByTestId('modal')).not.toBeTruthy();

		fireEvent.click(screen.getByTestId('btn-new-task'));

		expect(screen.getByTestId('modal')).toBeInTheDocument();
		expect(screen.getByTestId('form-new')).toBeInTheDocument();

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

		fireEvent.click(screen.getByText('Add Task'));

		expect(screen.getByTestId('modal')).toBeInTheDocument();
	});
});
