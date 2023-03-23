export default class UserInfo {
    constructor({profileName, profileJob}) {
        this._profileName = profileName;
        this._profileJob = profileJob;
    }

    // Метод возвращает объект с данными пользователя
    getUserInfo() {
        return {
            name: this._profileName.textContent,
            job: this._profileJob.textContent
        };
    }

    // Метод добавляет на страницу новые данные пользователя
    setUserInfo({name, job}) {
        this._profileName.textContent = name;
        this._profileJob.textContent = job;
    }
}