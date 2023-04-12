import { Component } from './base.ts';
import {
    ImageComponent,
    NoteComponent,
    TodoComponent,
    VideoComponent,
} from './contents.ts';
import { InputDialog } from './dialog/dialog.ts';
import { MediaInput } from './dialog/input/mediaInput.ts';
import { TextInput } from './dialog/input/textInput.ts';
import { Composable, PageComponent, PageItemComponent } from './page.ts';

export default class App {
    private page: Component & Composable;
    constructor(private appRoot: HTMLElement, dialogRoot: HTMLElement) {
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(this.appRoot, 'afterbegin');

        const imageButton = document.querySelector(
            '#new-image'
        )! as HTMLButtonElement;
        imageButton.addEventListener('click', () => {
            const dialog = new InputDialog();
            const mediaInput = new MediaInput();
            dialog.attachTo(dialogRoot);
            dialog.addChild(mediaInput);

            dialog.setOnSubmitListener(() => {
                const image = new ImageComponent(
                    mediaInput.title,
                    mediaInput.url
                );
                this.page.addChild(image);
                dialog.detachFrom(dialogRoot);
            });

            dialog.setOnCloseListener(() => {
                dialog.detachFrom(dialogRoot);
            });
        });

        const videoButton = document.querySelector(
            '#new-video'
        )! as HTMLButtonElement;
        videoButton.addEventListener('click', () => {
            const dialog = new InputDialog();
            const mediaInput = new MediaInput();
            dialog.attachTo(dialogRoot);
            dialog.addChild(mediaInput);

            dialog.setOnSubmitListener(() => {
                const video = new VideoComponent(
                    mediaInput.title,
                    mediaInput.url
                );
                this.page.addChild(video);
                dialog.detachFrom(dialogRoot);
            });

            dialog.setOnCloseListener(() => {
                dialog.detachFrom(dialogRoot);
            });
        });

        const noteButton = document.querySelector(
            '#new-note'
        )! as HTMLButtonElement;
        noteButton.addEventListener('click', () => {
            const dialog = new InputDialog();
            const textInput = new TextInput();
            dialog.attachTo(dialogRoot);
            dialog.addChild(textInput);

            dialog.setOnSubmitListener(() => {
                const note = new NoteComponent(textInput.title, textInput.body);
                this.page.addChild(note);
                dialog.detachFrom(dialogRoot);
            });

            dialog.setOnCloseListener(() => {
                dialog.detachFrom(dialogRoot);
            });
        });

        const todoButton = document.querySelector(
            '#new-todo'
        )! as HTMLButtonElement;
        todoButton.addEventListener('click', () => {
            const dialog = new InputDialog();
            const textInput = new TextInput();
            dialog.attachTo(dialogRoot);
            dialog.addChild(textInput);

            dialog.setOnSubmitListener(() => {
                const todo = new TodoComponent(textInput.title);
                this.page.addChild(todo);
                dialog.detachFrom(dialogRoot);
            });

            dialog.setOnCloseListener(() => {
                dialog.detachFrom(dialogRoot);
            });
        });
    }
}
