import { Component } from './base';
import { Composable, PageComponent, PageItemComponent } from './page.ts';

export default class AppImple {
    private page: Component & Composable;
    constructor(private appRoot: HTMLElement) {
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot, 'afterbegin');
    }
}
