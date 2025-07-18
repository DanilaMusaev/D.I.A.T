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
    validator?: (value: string) => boolean;
}

function FormInput({
    placeholder,
    value,
    type,
    className,
    inputWidth,
    onChange,
    onBlur,
    validator,
}: FormInputProps) {
    // Ссылка на span placeholder'a
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
            event.target.classList.remove('notValid');
            event.target.classList.add('valid');
        } else {
            spanRef.current?.classList.remove('top');
            event.target.classList.remove('valid');
            event.target.classList.add('notValid');
        }

        if (typeof validator !== 'function') {
            if (typeof onBlur !== 'function') {
                return;
            }
            onBlur(event);
            return;
        }
        if (validator(event.target.value)) {
            event.target.classList.remove('notValid');
            event.target.classList.add('valid');
        } else {
            event.target.classList.remove('valid');
            event.target.classList.add('notValid');
        }
        if (typeof onBlur !== 'function') {
            return;
        }
        onBlur(event);
    }

    return (
        <div
            className={`formInput__wrapper${className ? ' ' + className : ''}`}
        >
            <input
                className="formInput"
                type={type}
                onChange={onChangeWrapper}
                onBlur={onBlurWrapper}
                value={value}
                style={{ width: inputWidth }}
            />
            <span ref={spanRef} className="formInput_placeholder">
                {placeholder}
            </span>
        </div>
    );
}

export default FormInput;
