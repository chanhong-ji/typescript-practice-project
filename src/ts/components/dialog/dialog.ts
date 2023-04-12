import { BaseComponent, Component } from '../base.ts';
import { Composable } from '../page.ts';

type onCloseListener = () => void;
type onSubmitListener = () => void;

export class InputDialog
    extends BaseComponent<HTMLElement>
    implements Composable
{
    private closeListener?: onCloseListener;
    private submitListener?: onSubmitListener;
    constructor() {
        super(`<section class="dialog">
                <button class="close">&times;</button>
                <div id="dialog__body"></div>
                <button class="dialog__submit">ADD</button>
            </section>`);

        const closeButton = this.element.querySelector(
            '.close'
        )! as HTMLButtonElement;
        closeButton.addEventListener('click', () => {
            this.closeListener && this.closeListener();
        });

        const submitButton = this.element.querySelector(
            '.dialog__submit'
        )! as HTMLButtonElement;
        submitButton.addEventListener('click', () => {
            this.submitListener && this.submitListener();
        });
    }

    setOnCloseListener(listener: onCloseListener) {
        this.closeListener = listener;
    }
    setOnSubmitListener(listener: onSubmitListener) {
        this.submitListener = listener;
    }
    addChild(item: Component): void {
        const body = this.element.querySelector(
            '#dialog__body'
        )! as HTMLDivElement;
        item.attachTo(body);
    }
}

interface BaseInput {
    getValue(): string;
}

export class TitleInput
    extends BaseComponent<HTMLInputElement>
    implements BaseInput
{
    constructor() {
        super(`<div><label for="dialog__input__title">Title</label>
            <input type="text" id="dialog__input__title"/></div>`);
    }
    getValue(): string {
        const input = this.element.querySelector(
            '#dialog__input__title'
        )! as HTMLInputElement;
        if (!input.value) throw new Error('Empty value');
        return input.value;
    }
}

export class URLInput
    extends BaseComponent<HTMLInputElement>
    implements BaseInput
{
    constructor() {
        super(`<div><label for="dialog__input_url">URL</label>
            <input type="text" id="dialog__input_url"/><div>`);
    }
    getValue(): string {
        const input = this.element.querySelector(
            '#dialog__input_url'
        )! as HTMLInputElement;
        if (!input.value) throw new Error('Empty value');
        return input.value;
    }
}

export class BodyInput
    extends BaseComponent<HTMLInputElement>
    implements BaseInput
{
    constructor() {
        super(`<div><label for="dialog__input_body">Body</label>
            <input type="text" id="dialog__input_body"/></div>`);
    }
    getValue(): string {
        const input = this.element.querySelector(
            '#dialog__input_body'
        )! as HTMLInputElement;
        if (!input.value) throw new Error('Empty value');
        return input.value;
    }
}
