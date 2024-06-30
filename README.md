# Фильмопоиск

### Запуск проекта: npm run dev

### Детали:

Проект начинал писаться на TypeScript, но времени протипизировать нормально не хватило, поэтому типы где-то есть, а где-то нет. В критериях прописано что на TS писать желательно но не обязательно, поэтому не снижайте баллы пожалуйста, оно запускается 😭😭😭 Больше так не буду, честно

Для того чтобы при смене query params через адресную строку сохранялись оценки и авторизация был использован react-persist - в задании этого нет, но надеюсь так можно было, иначе сложно проверить что рейтинг фильма сохраняется на клиенте

### Самооценка по ТЗ

#### Базовые требования:

Проект запускается, репозиторий есть, верстка насколько возможна похожа (кое-где возможно я не разглядела отступы какие нужны)

### Функциональные требования:

Шапка: стики

Авторизация: модалка через портал, заглушки в хэдере меняются в зависимости от состояния авторизации, токен хранится в localStorage, вся работа с токенами производится через thunk'и, при выходе токен удаляется из localStorage и снимается состояние авторизованности, при инициализации проверяем по localStorage есть ли токен.

Реализована страница списка фильмов: поиск с дебаунсом на 300мс по ручке search, фильтры и query хранятся в параметрах строки и оттуда же достаются, дропдаун кастомный. Пагинации в макете не нашла, поэтому сделала свою простую.

Страница фильма: данные отрисовываются по ручке /movie:id, оценка достается оттуда же, при отправке оценки производится запрос мутации и кэш обновляется, соответственно новая оценка сразу подтягивается. Если пользователь не авторизован, блок рейтинга не показывается.

Общий функционал: лоадер реализован в виде h1 Loading, дебаунс присутствует (на 300с), ошибки кидаются в консоль лог.

Стор: запросы через rtk-query, данные разбиты на два модуля - оценки и авторизация. Оценки по айди фильмов хранятся в слайсе, подтягиваются оттуда же.

Миграция на Next: не успела ☹
