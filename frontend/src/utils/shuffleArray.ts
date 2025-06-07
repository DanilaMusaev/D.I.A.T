export function shuffleArray(count: 1 | 2 | 3 = 1): number | number[] {
    // Функция для перемешивания массива
    function shuffle(array: number[]) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Перемешиваемый массив количества персонажей
    const arr: number[] = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25,
    ];
    // Перемешиваем массив
    shuffle(arr);

    // Возврат необходимого количества персонажей в зависимости от переданного числа(от 1 до 3)
    switch (count) {
        case 1:
            return arr[0];
        case 2:
            return [arr[0], arr[1]];
        case 3:
            return [arr[0], arr[1], arr[2]];
        default:
            return [arr[0], arr[1], arr[2]];
    }
}
