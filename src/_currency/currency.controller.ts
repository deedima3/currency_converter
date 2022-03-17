import express from "express";
import type { Currency } from "./currency.interface";
import CurrencyService from "./currency.services";

class CurrencyController {
  public path = "/currency";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(this.path, this.updateCurrency);
    this.router.get(`${this.path}/:to`, this.getCurrencyByTo);
    this.router.get(this.path, this.getAllData);
    this.router.delete(this.path, this.deleteDataByTo);
  }

  getAllData = async (req: express.Request, res: express.Response) => {
    const data = await CurrencyService.fetchAllData();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  }

  updateCurrency = async (
    request: express.Request,
    response: express.Response,
  ) => {
    try {
      let currency = request.body as Currency;
      let data = await CurrencyService.updateCurrency(currency);
      response.status(200).json({ message: "Data Added" })
    } catch (e) {
      console.log(e);
      response.status(404).json({ message: "Fail to add" });
    }
  };

  getCurrencyByTo = async (
    request: express.Request,
    response: express.Response,
  ) => {
    let curr = await CurrencyService.fetchCurrencyByTo(request.params.to);
    console.log(curr);
    curr?.length
      ? response.status(200).json(curr)
      : response.status(404).json({ message: "No currency found" });
  };

  deleteDataByTo = async (
    request: express.Request,
    response: express.Response,
  ) => {
    let data = await CurrencyService.deleteDataByTo(request.body.to);
    if (data) {
      response.status(200).json(data);
    } else {
      response.status(404).json({ message: "Data not found" });
    }
  }

}

export default CurrencyController;
