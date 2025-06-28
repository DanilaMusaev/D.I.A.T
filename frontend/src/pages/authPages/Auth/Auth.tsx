import { useState } from 'react';
import FormInput from '../../../components/FormInput/FormInput';
import GradBtn from '../../../components/GradBtn/GradBtn';
import './auth.scss';
import { Link } from 'react-router';
import { NoAuthRoutes } from '../../../routes/consts';

function Auth() {
    // Состояние для inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="authWrapper">
            <h2 className="authTitle title-2">Welcome Back, Legend...</h2>
            <form action="#" className="authFrom">
                <div className="authFrom__title">Authorization</div>
                <FormInput
                    className="authForm__input"
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    placeholder="Email"
                    inputWidth={350}
                />
                <FormInput
                    className="authForm__input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    inputWidth={350}
                />
                <div className="authForm__itemWrapper">
                    <p className="authForm__forgot">Forgot Password?</p>
                </div>
                <GradBtn
                    className="authForm_button"
                    wide={true}
                    onClick={() => {
                        console.log('Login');
                    }}
                >
                    Login
                </GradBtn>
                <div className="authForm__itemWrapper authForm__itemWrapper--textRight">
                    <p className="logOrReg__text">
                        Don’t have any account?{' '}
                        <Link
                            to={NoAuthRoutes.REGISTRATION_ROUTE}
                            className="logOrReg__link"
                        >
                            Create It!
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Auth;
