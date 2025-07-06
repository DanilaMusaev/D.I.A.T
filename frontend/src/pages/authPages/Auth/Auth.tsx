import { useState } from 'react';
import FormInput from '../../../components/FormInput/FormInput';
import GradBtn from '../../../components/GradBtn/GradBtn';
import './auth.scss';
import { Link, useNavigate } from 'react-router';
import { AppRoutes, NoAuthRoutes } from '../../../routes/consts';
import { useAuthState } from '../../../state/auth';
import isEmail from '../../../guards/isEmail';

function Auth() {
    // Функция для логина из состояния
    const login = useAuthState((state) => state.login);
    // Ссылка для навигации
    const navigate = useNavigate();
    // Состояние для inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function clickToLogin() {
        // Проверка валидности введенного email
        if (isEmail(email)) {
            try {
                // Отправка запроса на логин
                await login(email, password);
                navigate(AppRoutes.GAMBLING_ROUTE, { replace: true });
            } catch (err) {
                console.error('Ошибка входа', err);
            }
        }
    }

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
                    onClick={clickToLogin}
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
