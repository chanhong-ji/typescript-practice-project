import App from './components/app.ts';

const app = new App(
    document.querySelector('.document')! as HTMLElement,
    document.querySelector('.app')! as HTMLBodyElement
);
