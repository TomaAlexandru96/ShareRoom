import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Item} from "../../models/item";
import {User} from "../../models/user";
import {Database} from "../../providers/database";
import {ChatPage} from "../chat/chat";
import {AddReviewsPage} from "../add-reviews/add-reviews";
import {Auth} from "../../providers/auth";

/**
 * Generated class for the ItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  item: Item = {} as Item;
  user: User = {} as User;

  today: string;
  fromDate: string;
  toDate: string;
  maxSelectableDate: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private database: Database,
              private auth : Auth) {
    this.item = navParams.get("item");

    let today = new Date();
    Database.standardizeDate(today);
    this.today = today.toISOString();

    let fromDate = new Date();
    fromDate = Database.standardizeDate(fromDate);
    this.fromDate = fromDate.toISOString();

    let toDate = new Date();
    Database.standardizeDate(toDate);
    this.toDate = toDate.toISOString();

    this.maxSelectableDate = new Date(2018,11,30).toISOString();

    this.auth.getUserInfoById(this.item.owner_uid)
      .then((user) => {
        this.user = user;
      })
      .catch(console.error);
  }

  getPicture() {
    return this.item.picture ? this.item.picture : "http://myarenaonline.com/screen/demos/demo_item.png";
  }

  requestItem() {
    this.database.requestItem(this.item.id, this.item.owner_uid, Date.parse(this.fromDate), Date.parse(this.toDate));
    this.navCtrl.push("BorrowedItemsPage");
  }

  startChat() {
    this.navCtrl.push("ChatPage", {"friendId": this.item.owner_uid});
  }

  goToOtherUsersPage(userId) {
    if (userId != this.auth.getCurrentUserId()) {
      this.navCtrl.push("UserProfilePage", {"userId": userId});
    }
  }

  reviewOwner() {
    this.navCtrl.push("AddReviewsPage");
  }
}
