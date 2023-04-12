import { BaseComponent } from '../../../../ts/components/base.ts';

export class MediaInput extends BaseComponent<HTMLElement> {
    constructor() {
        super(`<div>
                <div class="form__container">
                    <label for="title">Title</label>
                    <input type="text" id="title" />
                </div>
                <div class="form__container">
                    <label for="url">URL</label>
                    <input type="text" id="url" />
                </div>
            </div>`);
    }

    get title() {
        const title = this.element.querySelector('#title')! as HTMLInputElement;
        return title.value;
    }
    get url() {
        const url = this.element.querySelector('#url')! as HTMLInputElement;
        return url.value;
    }
}
