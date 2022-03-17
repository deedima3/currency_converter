import App from './app';
import CurrencyController from './_currency/currency.controller';

const app = new App(
  [
    new CurrencyController(),
  ],
  5000,
);
 
app.listen();