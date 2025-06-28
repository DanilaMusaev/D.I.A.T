import type { MouseEvent } from 'react';
import './gradBtn.scss';

interface GradBtnProps {
    children?: React.ReactNode;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    wide?: boolean;
    className?: string;
}

function GradBtn({ children, onClick, wide, className }: GradBtnProps) {
    return (
        <button
            onClick={onClick}
            className={`${wide ? 'gradBtn gradBtn--wide' : 'gradBtn'}${
                className ? ' ' + className : ''
            }`}
        >
            {children}
        </button>
    );
}

export default GradBtn;
