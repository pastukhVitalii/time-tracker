import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isTitle = true;
  heading = 'fruits';
  messageFromChild = '';
  showChildMessage(message: string) {
    this.messageFromChild = message;
  }
constructor() {
    setInterval(() => {
      this.isTitle = !this.isTitle;
    }, 2000);
  }
  text = '';
  inputHandler(e: Event) {
    this.text = (e.currentTarget as HTMLInputElement).value;
  }

}
