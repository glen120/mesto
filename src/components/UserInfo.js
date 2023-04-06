export default class UserInfo {
    constructor({profileName, profileJob, profileAvatar}) {
        this._profileName = profileName;
        this._profileJob = profileJob;
        this._profileAvatar = profileAvatar;
    }

    // Метод сохраняет id пользователя
    save({_id}) {
        this.id = _id;
    }

    // Метод возвращает объект с данными пользователя
    getUserInfo() {
        return {
            name: this._profileName.textContent,
            about: this._profileJob.textContent,
        };
    }

    // Метод добавляет на страницу данные пользователя
    setUserInfo(info) {
        this._profileName.textContent = info.name;
        this._profileJob.textContent = info.about;
    }

    // Метод добавляет на страницу новый аватар пользователя
    setUserAvatar(data) {
        this._profileAvatar.src = data.avatar;
    }
}