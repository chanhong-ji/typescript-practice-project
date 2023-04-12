import { BaseComponent, Component } from './base.ts';
import { Composable } from './page.ts';

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
