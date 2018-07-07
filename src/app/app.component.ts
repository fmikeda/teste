import { Component } from "@angular/core";
import { UserModel } from "./model/user-model";
import { AdreessModel } from "./model/adreess-model";
import { UserService } from "./services/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [UserService]
})
export class AppComponent {
  title = "app";
  animalName = "";
  user: UserModel;
  adreess: AdreessModel;
  newUser: UserModel;

  constructor(private userService: UserService) {
    this.setUser();
    if (!this.user) {
      this.user = new UserModel();
    }
    this.adreess = new AdreessModel();
    this.newUser = new UserModel();
  }

  showAlert() {
    alert("Fui clicado");
  }

  setRandomNumber() {
    const rand = Math.random();
  }

  updateAnimal(animalName: string) {
    this.animalName = animalName;
  }

  setDadosPessoais(nome: string, idade: number) {
    this.user.nome = nome;
    this.user.idade = idade;
  }

  setUser() {
    this.userService
      .getUser()
      .then(user => {
        console.log(user);
        this.user = user;
      })
      .catch(e => {
        console.log(e);
      });
  }

  saveUser() {
    if (this.newUser.nome != null && this.newUser.idade != null) {
      this.userService
        .createUser(this.newUser)
        .then(user => {
          console.log(user);
          this.user = user;
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      console.log("Nenhum dado informado");
    }
  }

  addEndereco() {
    let address;
    if (
      this.adreess.endereco != "" &&
      this.adreess.numero != null &&
      this.adreess.cidade != ""
    ) {
      this.userService
        .addAddress(this.adreess)
        .then(user => {
          console.log(user);
          this.user = user;
        })
        .catch(e => {
          console.log(e);
        });
      this.adreess = new AdreessModel();
      //this.user.enderecos.push();
    }
  }

  removerEndereco(deleteIndex: number) {
    this.userService
      .removeAddress(deleteIndex)
      .then(user => {
        console.log(user);
        this.user = user;
      })
      .catch(e => {
        console.log(e);
      });
  }

  resetFormulario() {
    this.user = new UserModel();
    this.newUser = new UserModel();
  }
}
