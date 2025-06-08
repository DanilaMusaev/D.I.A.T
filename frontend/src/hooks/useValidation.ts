import { useEffect, useState } from 'react';
import type { ValidationsInput } from './types/typesHooks';

export const useValidation = (value: string, validations: ValidationsInput) => {
    // Состояния, которые хранят информацию об ошибке
    const [isEmptyError, setIsEmptyError] = useState<boolean>(true);
    const [minLengthError, setMinLengthError] = useState<boolean>(false);
    const [maxLengthError, setMaxLengthError] = useState<boolean>(false);

    useEffect(() => {
        for (const validation in validations) {
            // Достаем значение из поля валидации
            const validationValue =
                validations[validation as keyof ValidationsInput];

            switch (validation) {
                case 'minLength':
                    if (
                        validationValue !== undefined &&
                        typeof validationValue !== 'boolean'
                    ) {
                        setMinLengthError(value.length < validationValue);
                    }
                    break;
                case 'isEmpty':
                    // Для isEmpty нам не нужно значение из validations, так как это флаг
                    setIsEmptyError(!value);
                    break;
                case 'maxLength':
                    if (
                        validationValue !== undefined &&
                        typeof validationValue !== 'boolean'
                    ) {
                        setMaxLengthError(value.length > validationValue);
                    }
                    break;
            }
        }
    }, [value]);

    return {
        isEmptyError,
        minLengthError,
        maxLengthError,
    };
};
