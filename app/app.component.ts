import {Component} from "@angular/core";

@Component({
  selector: "my-app",
  template: `\n\
    <StackLayout>\n\

        <Image src="res://logo_login" stretch="none" horizontalAlignment="center"></Image>

        <TextField hint="Email Address" keyboardType="email"
          autocorrect="false" autocapitalizationType="none"></TextField>
        <TextField hint="Password" secure="true"></TextField>

        <Button text="Sign in" class="submit-button" (tap)="submit()"></Button>
        <Button text="Sign up for Groceries"></Button>\n\
    </StackLayout>
  `,
  styleUrls: ["pages/login/login-common.css","pages/login/login.css"]
})
export class AppComponent {
    submit(){
        console.log('hello');
    }
}