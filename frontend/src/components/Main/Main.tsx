import AppRouter from "../AppRouter/AppRouter";

/**
 * Основной элемент/контейнер приложения, в нем будут отрисовываться остальные компоненты, в нем же и роутинг приложения
 */
const Main = () => {
    return (
        <main className="mainPage">
            <AppRouter />
        </main>
    );
};

export default Main;
