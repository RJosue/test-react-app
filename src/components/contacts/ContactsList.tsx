import classes from './ContactsList.module.css';

const ContactsList: React.FC<{ logo: string; name: string; description: string }> = (props) => {
	return (
		<div className={classes.card}>
			<div className={classes.logo}>
				<img src={props.logo} alt='logo' />
			</div>
			<div className={classes.content}>
				<div className={classes.name}>{props.name}</div>
				<div className={classes.description}>{props.description}</div>
			</div>
		</div>
	);
};

export default ContactsList;
