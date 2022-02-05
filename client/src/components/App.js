import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from  'react-router-dom';
import Header from './Header';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import UserRoute from './UserRoute';
import AdminRoute from './AdminRoute';
import NotFound from './NotFound';
import './App.css';
//REDUX
import { useDispatch } from 'react-redux';
import { getCategories } from '../redux/actions/categoryActions'; 

const App = () => {
	const dispatch = useDispatch();

	useEffect(()=> {
		dispatch(getCategories());
	}, [dispatch]);

	console.log(getCategories.categories);
	return (
		<BrowserRouter>
			<Header />
			<main className="content">
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route exact path="/signup" component={SignUp}/>
					<Route exact path="/signin" component={SignIn}/>
					<UserRoute exact path="/user/dashboard" component={UserDashboard}/>
					<AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
					<Route component={NotFound}/>
				</Switch>
			</main>
		</BrowserRouter>
	)
};
export default App;
