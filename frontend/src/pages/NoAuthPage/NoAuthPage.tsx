import { Link } from 'react-router';
import { NoAuthRoutes } from '../../routes/consts';
import './noAuthPage.scss';

function NoAuth() {
    return (
        <div className="noAuthPage">
            <p>
                This page is only available to authorized users. Please,{' '}
                <Link className="noAuthPage_link" to={NoAuthRoutes.LOGIN_ROUTE}>
                    Log In
                </Link>
                {' '}to continue.
            </p>
        </div>
    );
}

export default NoAuth;
