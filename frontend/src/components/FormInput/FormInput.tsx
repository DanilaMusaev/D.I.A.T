import {
    useRef,
    type ChangeEvent,
    type FocusEvent,
    type HTMLInputTypeAttribute,
} from 'react';
import './formInput.scss';

interface FormInputProps {
    value?: string;
    type: HTMLInputTypeAttribute;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    inputWidth?: number;
}

function FormInput({
    placeholder,
    value,
    type,
    className,
    inputWidth,
    onChange,
    onBlur,
}: FormInputProps) {
    const spanRef = useRef<HTMLSpanElement>(null);
    // Функция обертка события onChange для input
    function onChangeWrapper(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.value.trim() !== '') {
            spanRef.current?.classList.add('top');
        } else {
            spanRef.current?.classList.remove('top');
        }
        if (typeof onChange === 'function') {
            onChange(event);
        }
    }

    // Функция обертка события onBlur для input
    function onBlurWrapper(event: FocusEvent<HTMLInputElement>) {
        if (event.target.value.trim() !== '') {
            spanRef.current?.classList.add('top');
        } else {
            spanRef.current?.classList.remove('top');
        }
        if (typeof onBlur === 'function') {
            onBlur(event);
        }
    }

    return (
        <div
            className={`formInput__wrapper${className ? ' ' + className : ''}`}
        >
            <input
                // ref={inputRef}
                className="formInput"
                type={type}
                onChange={onChangeWrapper}
                onBlur={onBlurWrapper}
                value={value}
                style={{width: inputWidth}}
            />
            <span ref={spanRef} className="formInput_placeholder">
                {placeholder}
            </span>
        </div>
    );
}

export default FormInput;
