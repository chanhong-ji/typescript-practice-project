import { BaseComponent } from './base.ts';

export default class PageComponentImple extends BaseComponent<HTMLUListElement> {
    constructor() {
        super(`<ul class="page"></ul>`);
    }
}
