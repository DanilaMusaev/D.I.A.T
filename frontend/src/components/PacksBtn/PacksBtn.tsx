import type { MouseEvent } from 'react';
import './packsBtn.scss';

interface PacksBtnProps {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

function PacksBtn({ onClick }: PacksBtnProps) {
    return (
        <button onClick={onClick} type="button" className="packs-btn">
            <span className="angle__trapezoid-1"></span>
            <div className="packs-btn-text">
                <div className="packs-btn-text-add">ADD</div>
                <div className="packs-btn-text-apex">
                    <p>
                        <b>Apex</b>
                    </p>
                    <p>Packs</p>
                </div>
            </div>
            <span className="angle__trapezoid-2"></span>
            <span className="angle__trapezoid-3"></span>
            <span className="angle__trapezoid-4"></span>
        </button>
    );
}

export default PacksBtn;
