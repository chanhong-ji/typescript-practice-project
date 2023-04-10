import { BaseComponent, Component } from './base.ts';

export interface Composable {
    addChild(item: Component): void;
}

type OnCloseListener = () => void;

interface SectionContainer extends Component, Composable {
    setOnCloseListner(listener: OnCloseListener): void;
}

interface SectionContainerConstructor {
    new (): SectionContainer;
}

export class PageComponent
    extends BaseComponent<HTMLUListElement>
    implements Composable
{
    constructor(private pageItemConstructor: SectionContainerConstructor) {
        super(`<ul class="page"></ul>`);
    }

    addChild(section: Component): void {
        const item = new this.pageItemConstructor();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListner(() => {
            item.detachFrom(this.element);
        });
    }
}

export class PageItemComponent
    extends BaseComponent<HTMLLIElement>
    implements SectionContainer
{
    private closeListener?: OnCloseListener;

    constructor() {
        super(`<li class="page-item">
                <section class="page-item__body"></section>
                <div class="page-item__controls">
                    <button class="close">❌</button>
                </div>
            </li>`);

        const closeButton = this.element.querySelector(
            '.close'
        )! as HTMLButtonElement;

        closeButton.onclick = () => {
            this.closeListener && this.closeListener();
        };
    }

    addChild(section: Component): void {
        const body = this.element.querySelector(
            '.page-item__body'
        )! as HTMLElement;
        section.attachTo(body);
    }

    setOnCloseListner(listener: OnCloseListener): void {
        this.closeListener = listener;
    }
}
