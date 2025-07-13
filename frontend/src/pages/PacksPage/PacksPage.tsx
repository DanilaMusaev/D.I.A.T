import { useEffect, type ChangeEvent, type MouseEvent } from 'react';
import { useState } from 'react';
import PacksBtn from '../../components/PacksBtn/PacksBtn';
import { usePacksStore } from '../../state/packs';
import './packsPage.scss';
import { useAuthState } from '../../state/auth';

function PacksPage() {
    // Получаем нужные поля из state, а также функции для fetch данных
    const packs = usePacksStore((state) => state.packs);
    const getPacks = usePacksStore((state) => state.getPacksQTY);
    const updatePacks = usePacksStore((state) => state.updatePacksQTY);
    // state пользователя
    const user = useAuthState(state => state.user);
    // Управляемое состояние для input с количеством паков
    const [packsInput, setPacksInput] = useState<string>('');

    // Функция-хендлер для кнопки PacksBtn
    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        // Отмена изначально ивент действия
        event.preventDefault();
        // Отправка action на обновление данных о количестве открытых паков на сервере
        updatePacks(user.id, Number(packsInput)).then(() => {
            // Очистка input по завершению
            setPacksInput('');
        });
    }

    useEffect(() => {
        // Отправка запроса на получение количества паков
        console.log(user.id);
        getPacks(user.id);
    }, []);

    return (
        <section className="packs">
            <div className="container">
                <div className="packs__inner">
                    <div className="packs__title">
                        <h2 className="title-1 title-1--small">
                            Packs counter
                        </h2>
                    </div>
                    <div className="packs__counter">
                        <div className="packs__qty">
                            <div className="packs__achievement">
                                Packs opened
                                <div className="number">{packs}</div>
                            </div>
                            <div className="packs__achievement">
                                Packs until “RELIC!? SUDA!”
                                <div className="number">{500 - packs}</div>
                            </div>
                        </div>
                        <div className="packs__progressbar">
                            <span
                                className="packs__progressbar-bar"
                                style={{
                                    width: `calc(( 1070 / 500) * ${packs}px)`,
                                }}
                            ></span>
                            <p className="packs__progressbar-text">
                                {packs}/500 ({((packs / 500) * 100).toFixed(2)}
                                %)
                            </p>
                        </div>
                    </div>
                    <form className="packs__form" action="/">
                        <label htmlFor="pi1" className="packs__input-text">
                            Packs received today:
                        </label>
                        <input
                            value={packsInput}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setPacksInput(event.target.value)
                            }
                            id="pi1"
                            type="number"
                            className="packs__input"
                            placeholder="Enter a number"
                            min={-500}
                            max={500}
                        />
                    </form>
                    <div className="packs__btn-wrapper">
                        <PacksBtn onClick={handleClick} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PacksPage;
