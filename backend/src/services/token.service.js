import jwt from 'jsonwebtoken';
const JWT_ACCESS_KEY = process.env.JWT_ACCESS_SECRET;

class TokenService {
    // Генерация токена
    generateAccessToken(payload) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_KEY, {
            expiresIn: '24h',
        });
        return { accessToken };
    }

    // Валидация токена
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, JWT_ACCESS_KEY);
            return userData;
        } catch (err) {
            return null
        }
    }
}

export default new TokenService();
