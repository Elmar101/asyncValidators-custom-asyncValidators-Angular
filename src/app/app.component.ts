import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserServices } from "./services/UserServices";
import { userNameExit } from "./custom-validators/customAsyncValidators";
import {
  blackListValidator,
  whiteSpace
} from "./custom-validators/customValidations";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private userService: UserServices) {}
  ngOnInit(): void {
    this.onFormGroupInit();
  }

  onFormGroupInit() {
    this.formGroup = new FormGroup({
      name: new FormControl("", {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(7),
          blackListValidator("g"),
          whiteSpace()
        ],
        asyncValidators: [userNameExit(this.userService)],
        updateOn: "submit" //blur default change
      }),
      age: new FormControl("")
    });
  }

  formControl(formGroup: FormGroup) {
    console.log(this.formGroup);
  }
}
