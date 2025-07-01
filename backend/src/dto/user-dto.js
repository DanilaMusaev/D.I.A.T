// Этот класс нужен, чтобы выкинуть из модели ненужные поля и создать объект-payload для токена
export class UserDto {
    id;
    email;

    constructor(model) {
        this.id = model.id;
        this.email = model.email;
    }
}
