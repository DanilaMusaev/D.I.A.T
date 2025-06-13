import { NavLink } from 'react-router';
import './subTab.scss';

/**
 * Интерфейс пропсов для под табов 
 */
interface SubTabTabProps {
    children: React.ReactNode;
    clipSide: 'left' | 'right' | 'between';
    onClick?: () => void;
    linkPath: string;
}

function SubTab({ children, clipSide, onClick, linkPath }: SubTabTabProps) {
    let classByClip;
    if (clipSide === 'left') {
        classByClip = 'sub-tab--clip-left';
    } else if (clipSide === 'right') {
        classByClip = 'sub-tab--clip-right';
    } else {
        classByClip = '';
    }
    return (
        <NavLink
            to={linkPath}
            onClick={onClick}
            className={`sub-tab ${classByClip}`}
        >
            {children}
        </NavLink>
    );
}

export default SubTab;
