import SignUp from './Signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import * as api from '../../api/index.js';
import { useState } from 'react';
import googleBtn from '../../assests/google_signin_buttons/web/vector/btn_google_light_normal_ios.svg';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { toast } from 'react-toastify';

const InitState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

function Signup({ setUser }) {
	const [sForm, setsForm] = useState(InitState);

	const handleChange = (e) =>
		setsForm({
			...sForm,
			[e.target.name]: e.target.value,
		});

	function handleOnSubmit(e) {
		e.preventDefault();
		if (
			sForm.firstName !== '' &&
			sForm.lastName !== '' &&
			sForm.password !== '' &&
			sForm.confirmPassword !== '' &&
			sForm.email !== '' &&
			sForm.password === sForm.confirmPassword &&
			sForm.password.length >= 4
		) {
			const signup = async (userData) => {
				try {
					const { data } = await api.signUp(userData);

					setUser(data);
					console.log(data);
					navigate('/');
				} catch (err) {
					console.log(err);
					toast.error(err.response.data.message);
				}
			};
			signup(sForm);
		} else {
			console.log('error');
			toast.error('Please enter valid details');
		}
	}

	const navigate = useNavigate();
	const signupGoogle = async (accessToken) => {
		try {
			// signup user
			const { data } = await api.signUpGoogle(accessToken);
			setUser(data?.data);
			navigate('/');
		} catch (err) {
			console.log(err);
			toast.error(err.response.data.message);
		}
	};

	function handleGoogleLoginSuccess(tokenResponse) {
		const accessToken = tokenResponse.access_token;
		signupGoogle(accessToken);
	}

	const signup = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
	return (
		<div className={SignUp.loginContainer}>
			<div className={SignUp.loginContainerv2}>
				<h1>Create your account</h1>

				<div className={SignUp.inputContainer}>
					<label>FRIST NAME</label>
					<input
						onChange={handleChange}
						name='firstName'
						placeholder='Enter your first name'
						type='text'
					/>
				</div>
				<div className={SignUp.inputContainer}>
					<label>LAST NAME</label>
					<input
						name='lastName'
						onChange={handleChange}
						placeholder='Enter your last name'
						type='text'
					/>
				</div>
				<div className={SignUp.inputContainer}>
					<label>EMAIL</label>
					<input
						name='email'
						onChange={handleChange}
						placeholder='Enter your email'
						type='email'
					/>
				</div>

				<div className={SignUp.inputContainer}>
					<label>PASSWORD</label>
					<input
						name='password'
						onChange={handleChange}
						placeholder='Enter your password'
						type='password'
					/>
				</div>

				<div className={SignUp.inputContainer}>
					<label>CONFIRM PASSWORD</label>
					<input
						name='confirmPassword'
						onChange={handleChange}
						placeholder='Retype your password'
						type='password'
					/>
				</div>

				<div className={SignUp.footerContainer}>
					<div>
						Already Signed Up? <Link to='/account/login'>Login</Link>
					</div>
					<div>
						<Link to='/account/forgotpassword'>Forgot Password?</Link>
					</div>
				</div>

				<button
					onClick={handleOnSubmit}
					className={SignUp.loginBTN}>
					<AiOutlineUserAdd />
					REGISTER
				</button>
				<span className={SignUp.or}>or</span>
				<button
					className={SignUp.googleBTN}
					onClick={signup}>
					<img
						src={googleBtn}
						alt='Signup with google'
					/>
					<span>Sign up with Google</span>
				</button>
			</div>
		</div>
	);
}

export default Signup;
