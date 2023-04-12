import { Component } from './base.ts';
import { InputDialog } from './dialog.ts';
import { Composable, PageComponent, PageItemComponent } from './page.ts';

export default class App {
    private page: Component & Composable;
    private noteButton: HTMLElement;
    constructor(private appRoot: HTMLElement) {
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(this.appRoot, 'afterbegin');

        this.noteButton = document.querySelector(
            '#new-note'
        )! as HTMLButtonElement;

        this.noteButton.addEventListener('click', () => {
            const dialog = new InputDialog();

            dialog.attachTo(this.appRoot);

            dialog.setOnCloseListener(() => {
                dialog.detachFrom(this.appRoot);
            });
            dialog.setOnSubmitListener(() => {
                dialog.detachFrom(this.appRoot);
            });
        });
    }
}
