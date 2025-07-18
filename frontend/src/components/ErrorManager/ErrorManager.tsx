import { useAuthState } from '../../state/auth';
import { usePacksStore } from '../../state/packs';
import { useRatingStore } from '../../state/rating';
import ErrorNotification from '../ErrorNotification/ErroNotification';
import './ErrorManager.scss';

function ErrorManager() {
    // Состояния с ошибками
    const authError = useAuthState((state) => state.error);
    const clearAuthError = useAuthState((state) => state.clearError);
    const packError = usePacksStore((state) => state.error);
    const clearPackError = usePacksStore((state) => state.clearError);
    const ratingError = useRatingStore((state) => state.error);
    const clearRatingError = useRatingStore((state) => state.clearError);

    return <div className="errorManager">
        {authError && <ErrorNotification errorMessage={authError} clearError={clearAuthError} />}
        {packError && <ErrorNotification errorMessage={packError} clearError={clearPackError} />}
        {ratingError && <ErrorNotification errorMessage={ratingError} clearError={clearRatingError} />}
    </div>;
}

export default ErrorManager;
