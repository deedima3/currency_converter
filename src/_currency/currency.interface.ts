import { ObjectType } from "deta/dist/types/types/basic";

export interface Currency extends ObjectType{
    to : string,
    value : number,
    symbol : string
}