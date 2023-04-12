import { BaseComponent } from '../../../../ts/components/base.ts';

export class TextInput extends BaseComponent<HTMLElement> {
    constructor() {
        super(`<div>
                <div class="form__container">
                    <label for="title">Title</label>
                    <input type="text" id="title" />
                </div>
                <div class="form__container">
                    <label for="body">Body</label>
                    <input type="text" id="body" />
                </div>
            </div>`);
    }

    get title() {
        const title = this.element.querySelector('#title')! as HTMLInputElement;
        return title.value;
    }
    get body() {
        const body = this.element.querySelector('#body')! as HTMLInputElement;
        return body.value;
    }
}
