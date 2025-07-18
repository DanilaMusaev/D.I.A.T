import type { MouseEvent } from 'react';
import './gradBtn.scss';

interface GradBtnProps {
    children?: React.ReactNode;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    wide?: boolean;
    loading?: boolean;
    className?: string;
}

function GradBtn({
    children,
    onClick,
    wide,
    loading,
    className,
}: GradBtnProps) {
    // Класс компонента
    let componentClass = 'gradBtn ' + className;
    if (wide) {
        componentClass += ' gradBtn--wide';
    }
    if (loading) {
        componentClass += ' gradBtn--loading';
    }

    return (
        <button onClick={onClick} className={componentClass}>
            {loading && <span className='gradBtn__loader'></span>}
            {children}
        </button>
    );
}

export default GradBtn;
