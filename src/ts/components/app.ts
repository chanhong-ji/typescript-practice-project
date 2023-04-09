import { ImageComponent } from './contents.ts';
import PageComponentImple from './page.ts';

export default class AppImple {
    private page: PageComponentImple;
    constructor(private appRoot: HTMLElement) {
        this.page = new PageComponentImple();
        this.page.attachTo(appRoot, 'afterbegin');
    }

    createImage(title: string, url: string) {
        const image = new ImageComponent(
            'newTItl',
            'https://picsum.photos/200/300'
        );
        image.attachTo(this.appRoot);
    }
}
