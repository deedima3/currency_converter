import Base from "deta/dist/types/base";
import { Currency } from "./currency.interface";
import { Deta } from "deta";
import "dotenv/config";

const { PROJECT_KEY } = process.env;

export const deta = Deta(PROJECT_KEY);

class CurrencyService {
  static db: Base = deta.Base("currency");

  static fetchAllData = async () => {
    console.log("Fetching All Data");
    let res = await this.db.fetch();
    let allItems = res.items;

    // continue fetching until last is not seen
    while (res.last) {
      res = await this.db.fetch({}, { last: res.last });
      allItems = allItems.concat(res.items);

    }
    if (res) {
      return res;
    } else {
      return undefined;
    }
  };

  static updateCurrency = async (currency: Currency) => {
    console.log("Processing data Update");
    console.log("Currency", currency);
    try {
      let res = await this.db.put(currency, currency.to);
      if (res) {
        return res;
      } else {
        return undefined;
      }
    } catch (e) {
      console.log(e);
      return undefined;
    }
  };

  static fetchCurrencyByTo = async (to: string) => {
    try {
      console.log("Fetching Data");
      const data = await this.db.get(to);
      if (data) {
        return data;
      } else {
        return undefined;
      }
    } catch (e) {
      console.log(e);
      return undefined;
    }
  };

  static deleteDataByTo = async (to: string) => {
    try {
      console.log("Deleting Data");
      await this.db.delete(to);
      const data = await this.fetchAllData();
      if (data) {
        return data;
      } else {
        return undefined;
      }
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }
}

export default CurrencyService;
