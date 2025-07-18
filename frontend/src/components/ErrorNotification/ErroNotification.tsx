import { useEffect, useState } from 'react';
import './errorNotification.scss';

interface ErrorNotificationProps {
    errorMessage: string;
    clearError: () => Promise<void>;
}

function ErrorNotification({errorMessage, clearError}: ErrorNotificationProps) {
    const [hide, setHide] = useState<boolean>(false);

    function closeNotification() {
        setHide(true);
    }

    useEffect(() => {
        if (!hide) return;

        const timer = setTimeout(async () => {
            await clearError();
        }, 250);

        return () => clearTimeout(timer); // Очистка при размонтировании или изменении hide
    }, [hide, clearError]);

    return (
        <div
            className={`errorNotification${hide ? ` errorNotification__hide` : ''}`}
        >
            <div className="errorNotification__top">
                <span
                    className="errorNotification__closeButton"
                    onClick={closeNotification}
                ></span>
                <p className="errorNotification__title">Error Notification</p>
            </div>
            <div className="errorNotification__center">
                <p className="errorNotification__errorText">
                    {errorMessage}
                </p>
            </div>
            <div className="errorNotification__bottom"></div>
        </div>
    );
}

export default ErrorNotification;
