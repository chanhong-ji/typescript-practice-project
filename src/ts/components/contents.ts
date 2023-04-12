import { BaseComponent } from './base.ts';

export interface MediaData {
    title: string;
    url: string;
}

export interface TextData {
    title: string;
    body: string;
}

export class ImageComponent extends BaseComponent<HTMLElement> {
    constructor(title: string, url: string) {
        super(`<section class="image">
                 <div class="image__holder">
                    <img class="image__thumbnail" />
                    <p class="image__title"></p>
                 </div>
                </section>`);

        const titleElement = this.element.querySelector(
            '.image__title'
        )! as HTMLParagraphElement;
        titleElement.textContent = title;

        const imageElement = this.element.querySelector(
            '.image__thumbnail'
        )! as HTMLImageElement;
        imageElement.src = url;
        imageElement.alt = title;
    }
}

export class NoteComponent extends BaseComponent<HTMLElement> {
    constructor(title: string, detail: string) {
        super(`<section class="note">
                <h3 class="note__title"></h3>       
                <p class="note__body"></p>  
            </section>`);

        const titleElement = this.element.querySelector(
            '.note__title'
        )! as HTMLHeadingElement;
        titleElement.textContent = title;

        const detailElement = this.element.querySelector(
            '.note__body'
        )! as HTMLParagraphElement;
        detailElement.textContent = detail;
    }
}

export class TodoComponent extends BaseComponent<HTMLElement> {
    constructor(title: string, body: string) {
        super(`<section class="todo">
                <input class="todo__box" id="todo__box" type="checkbox" />
                <label class="todo__title"></label>
            </section>`);

        const labelElement = this.element.querySelector(
            '.todo__title'
        )! as HTMLLabelElement;
        labelElement.textContent = title;
    }
}

export class VideoComponent extends BaseComponent<HTMLElement> {
    constructor(title: string, url: string) {
        super(`<section class="video">
                <div class="video__player">
                    <h3 class="video__title"></h3>
                    <iframe
                        class="video__iframe"
                        width="320"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </div>
            </section>`);

        const titleElement = this.element.querySelector(
            '.video__title'
        )! as HTMLHeadingElement;
        titleElement.textContent = title;

        const iframeElement = this.element.querySelector(
            '.video__iframe'
        )! as HTMLIFrameElement;
        iframeElement.src = this.convertToEmbeddedURL(url);
    }

    private convertToEmbeddedURL(url: string): string {
        let id;
        if (url.includes('youtu.be')) {
            id = url.split('/').at(-1);
        } else if (url.includes('www.youtube.com')) {
            id = url.split(`v=`).at(-1);
        } else {
            throw new Error('Url not found');
        }
        return `https://www.youtube.com/embed/${id}`;
    }
}
