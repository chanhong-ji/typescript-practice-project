import { Component } from './base.ts';
import {
    ImageComponent,
    MediaData,
    NoteComponent,
    TextData,
    TodoComponent,
    VideoComponent,
} from './contents.ts';
import { InputDialog } from './dialog/dialog.ts';
import { MediaInput } from './dialog/input/mediaInput.ts';
import { TextInput } from './dialog/input/textInput.ts';
import { Composable, PageComponent, PageItemComponent } from './page.ts';

type Selector = '#new-video' | '#new-image' | '#new-note' | '#new-todo';

type inputComponentConstructor<T = (MediaData | TextData) & Component> = {
    new (): T;
};

export default class App {
    private page: Component & Composable;
    constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot, 'afterbegin');

        this.bindElementToDialog<MediaInput>(
            '#new-image',
            MediaInput,
            (MediaInput) => new ImageComponent(MediaInput.title, MediaInput.url)
        );
        this.bindElementToDialog<MediaInput>(
            '#new-video',
            MediaInput,
            (MediaInput) => new VideoComponent(MediaInput.title, MediaInput.url)
        );
        this.bindElementToDialog<TextInput>(
            '#new-note',
            TextInput,
            (TextInput) => new NoteComponent(TextInput.title, TextInput.body)
        );
        this.bindElementToDialog<TextInput>(
            '#new-todo',
            TextInput,
            (TextInput) => new TodoComponent(TextInput.title, TextInput.body)
        );
    }

    private bindElementToDialog<T extends (MediaData | TextData) & Component>(
        selector: Selector,
        inputComponent: inputComponentConstructor<T>,
        makeSection: (input: T) => Component
    ) {
        const button = document.querySelector(selector)! as HTMLButtonElement;

        button.addEventListener('click', () => {
            const dialog = new InputDialog();
            const input = new inputComponent();

            dialog.attachTo(this.dialogRoot);
            dialog.addChild(input);

            dialog.setOnSubmitListener(() => {
                const section = makeSection(input);
                this.page.addChild(section);
                dialog.detachFrom(this.dialogRoot);
            });

            dialog.setOnCloseListener(() => {
                dialog.detachFrom(this.dialogRoot);
            });
        });
    }
}
