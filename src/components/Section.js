export default class Section {
    constructor({renderItems}, containerSelector) {
        this._renderer = renderItems;
        this._container = document.querySelector(containerSelector);
    }

    // Метод принимает DOM-элемент и добавляет его в контейнер
    addItem(item) {
        this._container.prepend(item);
    }

    // Метод отрисовки всех элементов
    renderItems(cards) {
        cards.forEach(item => {
            this._renderer(item);
        });
    }
}