import App from './src/app';
import CurrencyController from './src/_currency/currency.controller';

const app = new App(
  [
    new CurrencyController(),
  ],
  5000,
);
 
app.listen();