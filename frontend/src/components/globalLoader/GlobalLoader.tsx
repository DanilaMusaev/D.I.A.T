import './globalLoader.scss';

function GlobalLoader() {
    return (
        <div className="globalLoader__wrapper">
            <div className="apex-loader">
                <div className="logo-base"></div>
                <div className="logo-wing left-wing"></div>
                <div className="logo-wing right-wing"></div>
            </div>
        </div>
    );
}

export default GlobalLoader;
