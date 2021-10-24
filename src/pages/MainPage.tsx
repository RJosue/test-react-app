import { useHistory } from 'react-router';
const MainPage = () => {
	const history = useHistory();

	const handlerRedirect = (to: string) => {
		history.push(to);
	};

	return (
		<>
			<h1 className='centered'>Main Page</h1>
			<div className='centered' data-testid='btn-task'>
				<button className='btn-block' onClick={handlerRedirect.bind(null, '/task')}>
					<label>Task</label>
				</button>
				<button className='btn-block' data-testid="btn-contacts" onClick={handlerRedirect.bind(null, '/contacts')}>
					<label>Contacts</label>
				</button>
			</div>
		</>
	);
};

export default MainPage;
