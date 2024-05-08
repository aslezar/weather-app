import NavStyles from './Nav.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { toast } from 'react-toastify';

const Nav = ({ user, setUser }) => {
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		if (user) {
			setAuthenticated(true);
		} else {
			setAuthenticated(false);
		}
	}, [user]);

	function handleLogOut(e) {
		e.preventDefault();
		setUser(null);
		toast.success('Logout successful!');
	}
	return (
		<nav className={NavStyles.mainNav}>
			<div>
				<h3>Weather App</h3>
			</div>
			<div>
				{authenticated ? (
					<div className={NavStyles.rightSideNav}>
						<i className='fa-solid fa-user'></i>
						<div>
							<span className='d-blcok'>Account</span>
							<div className={NavStyles.container2}>
								<Link
									onClick={handleLogOut}
									className={NavStyles.linkBTN}
									to='/'>
									Logout
								</Link>
							</div>
						</div>
					</div>
				) : (
					<div className={NavStyles.rightSideNav}>
						<i className='fa-solid fa-user'></i>
						<div>
							<span className='d-blcok'>Account</span>
							<div className={NavStyles.container2}>
								<AiOutlineUser />
								<Link
									className={`d-block ${NavStyles.linkBTN}`}
									to='/account/login'>
									Login
								</Link>
								<span className={NavStyles.or}>or</span>
								<Link
									className={NavStyles.linkBTN}
									to='account/signup'>
									Singup
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Nav;
