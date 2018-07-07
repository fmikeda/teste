import { AdreessModel } from "./adreess-model";

export class UserModel {
  nome: string;
  idade: number;
  enderecos: Array<AdreessModel>;

  constructor() {
    this.enderecos = new Array<AdreessModel>();
  }
}
