interface PageComponent {
    attachTo(parent: HTMLElement, position: InsertPosition): void;
}

export default class PageComponentImple implements PageComponent {
    private _element: HTMLUListElement;

    constructor() {
        this._element = document.createElement('ul');
        this._element.setAttribute('class', 'page');
        this._element.textContent = 'this is page componenet';
    }

    get element() {
        return this._element;
    }

    attachTo(
        parent: HTMLElement,
        position: InsertPosition = 'afterbegin'
    ): void {
        parent.insertAdjacentElement(position, this._element);
    }
}
