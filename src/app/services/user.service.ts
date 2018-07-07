import { Injectable } from "@angular/core";
import { UserModel } from "../model/user-model";
import { AdreessModel } from "../model/adreess-model";

@Injectable()
export class UserService {
  private USER_STORAGE_NAME = "user";
  constructor() {}

  createUser(user: UserModel): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      if (user) {
        localStorage.setItem(this.USER_STORAGE_NAME, JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error("Dados de usuário não informados"));
      }
    });
  }

  getUser(): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      var userTxtJSON = localStorage.getItem(this.USER_STORAGE_NAME);
      if (userTxtJSON) {
        try {
          resolve(JSON.parse(userTxtJSON));
        } catch (e) {
          reject(e);
        }
      } else {
        resolve(null);
      }
    });
  }

  addAddress(address: AdreessModel): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      var userTxtJSON = localStorage.getItem(this.USER_STORAGE_NAME);
      if (userTxtJSON) {
        try {
          const userModel = JSON.parse(userTxtJSON);
          if (userModel.enderecos) {
            userModel.enderecos.push(address);
          } else {
            userModel.enderecos = [address];
          }
          localStorage.setItem(
            this.USER_STORAGE_NAME,
            JSON.stringify(userModel)
          );
          resolve(userModel);
        } catch (e) {
          reject(e);
        }
      } else {
        resolve(null);
      }
    });
  }

  removeAddress(index): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      var userTxtJSON = localStorage.getItem(this.USER_STORAGE_NAME);
      if (userTxtJSON) {
        try {
          const userModel = JSON.parse(userTxtJSON);
          if (userModel.enderecos) {
            userModel.enderecos.splice(index, 1);
          }
          localStorage.setItem(
            this.USER_STORAGE_NAME,
            JSON.stringify(userModel)
          );
          resolve(userModel);
        } catch (e) {
          reject(e);
        }
      } else {
        resolve(null);
      }
    });
  }
}
