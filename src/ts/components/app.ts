import { Component } from './base';
import { Composable, PageComponent } from './page.ts';

export default class AppImple {
    private page: Component & Composable;
    constructor(private appRoot: HTMLElement) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot, 'afterbegin');
    }
}
