export interface Component {
    attachTo(parent: HTMLElement, position?: InsertPosition): void;
    detachFrom(parent: HTMLElement): void;
}

export abstract class BaseComponent<T extends HTMLElement>
    implements Component
{
    protected element: T;

    constructor(htmlString: string) {
        const template = document.createElement('template');
        template.innerHTML = htmlString;
        this.element = template.content.firstElementChild! as T;
    }

    attachTo(
        parent: HTMLElement,
        position: InsertPosition = 'afterbegin'
    ): void {
        parent.insertAdjacentElement(position, this.element);
    }

    detachFrom(parent: HTMLElement): void {
        if (parent !== this.element.parentElement) {
            throw new Error('Parent mismatch!!');
        }
        parent.removeChild(this.element);
    }
}
