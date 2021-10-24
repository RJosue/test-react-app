import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

import classes from './Modal.module.css';
const Backdrop: React.FC = () => {
	const dispatch = useDispatch();

	const onClose = () => {
		dispatch(uiActions.toggle());
	};
	return <div data-testid="modal" className={classes.backdrop} onClick={onClose}></div>;
};

const ModalOverlay: React.FC = (props) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
};

const Modal: React.FC = (props) => {
	return (
		<>
			<Backdrop />
			<ModalOverlay>{props.children}</ModalOverlay>
		</>
	);
};

export default Modal;
