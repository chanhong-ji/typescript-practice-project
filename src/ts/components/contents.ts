export class ImageComponent {
    private element: HTMLElement;

    constructor(title: string, url: string) {
        const template = document.createElement('template');
        template.innerHTML = `<section class="image">
            <div class="image__holder">
                <img class="image__thumbnail" />
                <p class="image__title"></p>
            </div>
        </section>`;
        this.element = template.content.firstElementChild! as HTMLElement;

        const titleElement = this.element.querySelector(
            '.image__title'
        )! as HTMLParagraphElement;
        titleElement.textContent = title;

        const imageElement = this.element.querySelector(
            '.image__thumbnail'
        )! as HTMLImageElement;
        imageElement.src = url;
    }

    attachTo(parent: HTMLElement, position: InsertPosition = 'beforeend') {
        parent.insertAdjacentElement(position, this.element);
    }
}
