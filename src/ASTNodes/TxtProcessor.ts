import {Token} from "../Token";
import {Compound} from "./Compound";





export class TxtProcessor extends Compound {
  constructor(
    public token: Token,
  ) {
    super();
  }
}
