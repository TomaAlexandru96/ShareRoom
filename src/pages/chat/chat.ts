import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { Message } from "../../models/message";
import { Database } from "../../providers/database";
import { Chat } from "../../providers/chat";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  input: string = "";
  friendId: string = "PhMUkbbHHRXFy9XqmeYxHN3GYx13";
  messages: Message[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: Database, public chat: Chat, public db: Database) {
    database.login({email: "hello@google.com", password: "password"} as User).then((data) => {
      this.refresh();
    }).catch((err) => {
      console.error(err);
    });
  }

  public refresh() {
    this.chat.getFriendMessages(100, this.friendId)
      .then(messages => {
        console.log(messages);
        messages.map(m => this.messages.push(m));
      })
      .catch(console.error);
  }

  public sendMessage() {
    if (this.input == "") {
      return
    }

    this.chat.sendMessage(this.input, this.friendId).then(msg => {
      this.messages.push(msg);
    }).catch(console.error);

    this.input = ""
  }

  public getBubbleClass(message: Message): string {
    return message.from == this.db.getCurrentUserId() ? "chat-bubble" +
      " chat-bubble-me" : "chat-bubble chat-bubble-other";
  }

}
