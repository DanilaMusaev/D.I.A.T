import { useState, useRef, useEffect } from 'react';
import './select.scss';
import SvgIcon from '../SvgIcon/SvgIcon';

interface SelectValue {
    itemText: string;
    itemValue: string;
}

interface SelectProps {
    onChange: (value: string) => void;
    options: SelectValue[];
    value?: string; // Добавляем пропс для управляемого компонента
    style?: React.CSSProperties;
}

function Select({ onChange, options: values, value, style }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(
        value || values[0]?.itemValue
    );
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Синхронизируем внутреннее состояние с внешним value
    useEffect(() => {
        if (value !== undefined) {
            setSelectedValue(value);
        }
    }, [value]);

    // Закрываем dropdown при клике вне его
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (itemValue: string) => {
        setSelectedValue(itemValue);
        onChange(itemValue);
        setIsOpen(false);
    };

    const selectedItem =
        values.find((item) => item.itemValue === selectedValue) || values[0];

    return (
        <div className="form-group" style={style} ref={dropdownRef}>
            <div className="dropdown">
                <button
                    type="button"
                    className={`dropdown__button ${
                        isOpen ? 'dropdown__button--active' : ''
                    }`}
                    onClick={handleButtonClick}
                >
                    {selectedItem?.itemText}
                </button>
                <SvgIcon
                    name="select-arrow"
                    className={`dropdown__selectArrow ${
                        isOpen ? `dropdown__selectArrow--rotated` : ``
                    }`}
                />
                <ul
                    className={`dropdown__list ${
                        isOpen ? 'dropdown__list--visible' : ''
                    }`}
                >
                    {values.map(({ itemText, itemValue }) => (
                        <li
                            className="dropdown__list-item"
                            key={itemValue}
                            onClick={() => handleItemClick(itemValue)}
                        >
                            {itemText}
                        </li>
                    ))}
                </ul>
                <input
                    type="hidden"
                    name="select-category"
                    value={selectedValue}
                    className="dropdown__input-hidden"
                />
            </div>
        </div>
    );
}

export default Select;
