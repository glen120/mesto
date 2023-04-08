export default class UserInfo {
    constructor({profileName, profileJob, profileAvatar}) {
        this._profileName = profileName;
        this._profileJob = profileJob;
        this._profileAvatar = profileAvatar;
    }

    // Метод возвращает объект с данными пользователя
    getUserInfo() {
        return {
            name: this._profileName.textContent,
            about: this._profileJob.textContent,
        };
    }

    //Метод получает от сервера все данные пользователя
    setUserInfo({name, about, avatar, _id}) {
        this._profileName.textContent = name;
        this._profileJob.textContent = about;
        this._profileAvatar.src = avatar;
        this.id = _id;
    }
}