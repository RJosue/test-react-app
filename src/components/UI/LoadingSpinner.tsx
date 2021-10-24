import React from 'react';
import classes from './LoadingSpinner.module.css';

const LoadingSpinner: React.FC = () => {
	return <div data-testid="spinner" className={classes.spinner}></div>;
};

export default LoadingSpinner;
