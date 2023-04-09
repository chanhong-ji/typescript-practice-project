import AppImple from './components/app.ts';

const App = new AppImple(document.querySelector('.document')! as HTMLElement);

App.createImage('new title for first image', 'example url');
