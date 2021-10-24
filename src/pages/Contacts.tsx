import { useEffect } from 'react';
import ContactsList from '../components/contacts/ContactsList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getAllContacts } from '../lib/api';

const Contacts = () => {
	const { sendRequest, status, data: loadedContacts, error } = useHttp(getAllContacts);

	useEffect(() => {
		sendRequest();
	}, [sendRequest]);

	if (status === 'PENDING') {
		return (
			<div className='centered' >
				<LoadingSpinner />
			</div>
		);
	}

	if (status === 'COMPLETED' && error) {
		return (
			<div className='centered' data-testid="error-message">
				<h1>{error}</h1>
			</div>
		);
	}
	return (
		<div className='centered'>
			<ul className='no-style'>
				{loadedContacts?.map(
					(contact: {
						id: string;
						avatar: string;
						name: string;
						createdAt: string;
					}) => (
						<li key={contact.id}>
							<ContactsList
								logo={contact.avatar}
								name={contact.name}
								description={contact.createdAt}
							/>
						</li>
					),
				)}
			</ul>
		</div>
	);
};

export default Contacts;
