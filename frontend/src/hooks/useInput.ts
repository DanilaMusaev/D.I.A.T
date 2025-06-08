import { useState, type ChangeEvent } from 'react';
import { useValidation } from './useValidation';
import type { ValidationsInput } from './types/typesHooks';

export const useInput = (
    initialValue: string,
    validations: ValidationsInput
) => {
    // Состояние для значения инпута
    const [value, setValue] = useState<typeof initialValue>(initialValue);
    // Состояние, которое показывает, вышли мы из инпута, или еще нет, необходимо для включения валидации
    const [isDirty, setDirty] = useState<boolean>(false);
    // Использование кастомного хука для валидации
    const valid = useValidation(value, validations);

    // Хендлер для изменения значения внутри инпута
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    // Хендрел, срабатывающий при выходе из инпута
    const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
        setDirty(true);
    };

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    };
};
