import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

const MainPage = React.lazy(() => import('./pages/MainPage'));
const Task = React.lazy(() => import('./pages/Task'));
const Contacts = React.lazy(() => import('./pages/Contacts'));


function App() {
	return (
		<Layout>
			<Suspense
				fallback={
					<div className='centered'>
						{' '}
						<LoadingSpinner />{' '}
					</div>
				}>
				<Switch>
					<Route path='/' exact>
						<MainPage />
					</Route>
					<Route path='/task'>
						<Task />
					</Route>
					<Route path='/contacts'>
						<Contacts />
					</Route>
				</Switch>
			</Suspense>
		</Layout>
	);
}

export default App;
