import { BaseComponent, Component } from './base.ts';

export interface Composable {
    addChild(item: Component): void;
}

export class PageComponent
    extends BaseComponent<HTMLUListElement>
    implements Composable
{
    constructor() {
        super(`<ul class="page"></ul>`);
    }

    addChild(section: Component): void {
        const item = new PageItemComponent();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
    }
}

class PageItemComponent
    extends BaseComponent<HTMLLIElement>
    implements Composable
{
    constructor() {
        super(`<li class="page-item">
                <section class="page-item__body"></section>
                <div class="page-item__controls">
                    <button class="close">❌</button>
                </div>
            </li>`);
    }
    addChild(section: Component): void {
        const body = this.element.querySelector(
            '.page-item__body'
        )! as HTMLElement;
        section.attachTo(body);
    }
}
