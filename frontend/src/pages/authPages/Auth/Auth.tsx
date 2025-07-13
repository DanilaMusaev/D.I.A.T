import { useEffect, useState } from 'react';
import FormInput from '../../../components/FormInput/FormInput';
import GradBtn from '../../../components/GradBtn/GradBtn';
import { Link, useLocation, useNavigate } from 'react-router';
import { AppRoutes, NoAuthRoutes } from '../../../routes/consts';
import { useAuthState } from '../../../state/auth';
import isEmail from '../../../guards/isEmail';
import './auth.scss';

function Auth() {
    const location = useLocation();
    // Функция для логина из состояния
    const login = useAuthState((state) => state.login);
    const registration = useAuthState((state) => state.registration);
    // Ссылка для навигации
    const navigate = useNavigate();
    // Состояние для inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Проверка страницы
    const isLoginPage: boolean = location.pathname === '/login';

    async function clickToSendForm() {
        const isLoginPage: boolean = location.pathname === '/login';
        const action = isLoginPage ? login : registration;
        const errorMessage = isLoginPage
            ? 'Ошибка входа'
            : 'Ошибка при регистрации';

        if (!isEmail(email)) {
            console.error('Некорректный email');
            return;
        }

        try {
            await action(email, password);
            navigate(AppRoutes.GAMBLING_ROUTE, { replace: true });
        } catch (err) {
            console.error(errorMessage, err);
        }
    }

    return (
        <div className="authWrapper">
            <h2 className="authTitle title-2">
                {isLoginPage ? `Welcome Back, Legend...` : `Join Us, Legend`}
            </h2>
            <form action="#" className="authFrom">
                <div className="authFrom__title">
                    {isLoginPage ? `Authorization` : `Registration`}
                </div>
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
                {isLoginPage && (
                    <div className="authForm__itemWrapper">
                        <p className="authForm__forgot">Forgot Password?</p>
                    </div>
                )}
                <GradBtn
                    className="authForm_button"
                    wide={true}
                    onClick={clickToSendForm}
                >
                    {isLoginPage ? `Login` : `Register`}
                </GradBtn>
                <div className="authForm__itemWrapper authForm__itemWrapper--textRight">
                    <p className="logOrReg__text">
                        {isLoginPage
                            ? `Don’t have any account? `
                            : `Already have account? `}
                        <Link
                            to={
                                isLoginPage
                                    ? NoAuthRoutes.REGISTRATION_ROUTE
                                    : NoAuthRoutes.LOGIN_ROUTE
                            }
                            className="logOrReg__link"
                        >
                            {isLoginPage ? `Create It!` : `Log In!`}
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Auth;
