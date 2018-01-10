import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { MapPage } from '../map/map';
import {Item, ItemType} from "../../models/item";
import { ItemPage } from "../item/item";
import { Database } from "../../providers/database";
import {ItemByUserPage} from "../item-by-user/item-by-user";
import { Geolocation } from '@ionic-native/geolocation';
import {Auth} from "../../providers/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})

export class HomePage {

  items: Item[] = [];
  filteredItems: Item[] = [];
  searchQuery: string = "";
  addItems: string[] = ["addItemCard"];
  user_location = [];
  isFiltering = false;
  filterOptions = {
    category: [],
    type: [],
    byDistance: false
  };
  currentUserId: string;

  fakeItem : Item = {
    id: "default0",
    name: "Add item",
    location: [],
    owner_uid: "",
    picture: "https://github.com/TomaAlexandru96/ShareRoom/blob/master/src/assets/images/add-item-dark.png?raw=true",
    description: "",
    date_posted: -123,
    type: "New",
    borrower_uid : "",
    borrow_time: -123,
    return_time: 0,
    max_borrow_duration: 0,
    category: "",
    requests: [],
    borrow_readable_time: "",
    max_borrow_duration_readable_time: "",
    percentage_time: 0,
    owner: "",
    borrower : "",
    shout: null,
    borrower_claimed_to_return: -1,
  };

  constructor(public navCtrl: NavController, public menuCtrl: MenuController,
              public app: App, private db: Database, private geolocation : Geolocation,
              private auth : Auth) {
    this.currentUserId = this.auth.getCurrentUserId();
  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.user_location = [resp.coords.latitude, resp.coords.longitude];
      this.refresh();
    });
  }

  ionViewWillEnter() {
    this.refresh();
  }

  refresh() {
    this.db.getAllItems().then((items) => {

      items = items.filter((item) => {
        return !(item.owner_uid === this.currentUserId);
      });

      this.items = items;
      this.searchQuery = "";

      // Fake item leads to Post Item page when clicked
      this.items.unshift(this.fakeItem);

      this.filteredItems = items;
    });
  }

  onSearch(event) {
    this.filteredItems = this.items.filter((item) => {
      if (item.id == "default0") return true;
      return item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }

  onCancelSearch(event) {
    this.filteredItems = this.items;
  }

  changeToMap() {
    this.navCtrl.setRoot(MapPage);
  }

  showItem(item) {
    if (item.owner_uid == this.auth.getCurrentUserId()) {
      this.navCtrl.push("ItemByUserPage", {item: item});
    } else {
      this.navCtrl.push("ItemPage", {item: item});
    }
  }

  getDistanceTill(item) {
    if (this.user_location.length > 0 && item) {
      var lat = this.user_location[0];
      var lon = this.user_location[1];
      var distance = this.db.getDistanceFromLatLonInKm(item.location[1], item.location[0], lat, lon);
      return distance.toFixed(1) + " km";
    } else {
      return "Loading...";
    }
  }

  getPostItemPage() {
    return this.navCtrl.push("PostItemPage");
  }

  // not really working for web app
  getNumberOfColumns() {
    var nrList = [];
    for (var i = 0; i < Math.floor(window.innerWidth / 150); i++) {
      nrList.push(i);
    }
    return nrList;
  }

  filter() {
    this.isFiltering = !this.isFiltering;
    this.filterOptions = {
      category: [],
      type: [],
      byDistance: false
    };
  }

  filterChanged() {
    this.onSearch(this.searchQuery);
    if (this.filterOptions.type.length > 0) {
      this.filteredItems = this.filteredItems.filter(item => {
        return this.filterOptions.type.indexOf(item.type) > -1;
      });
    }

    if (this.filterOptions.category.length > 0) {
      this.filteredItems = this.filteredItems.filter(item => {
        return this.filterOptions.category.indexOf(item.category) > -1;
      });
    }

    if (this.filterOptions.byDistance) {
      this.filteredItems.sort((a, b) => {
        if (a === this.fakeItem) {
          return -1;
        }
        if (b === this.fakeItem) {
          return 1;
        }
        let aDist = this.db.getDistanceFromLatLonInKm(this.user_location[0], this.user_location[1], a.location[1], a.location[0]);
        let bDist = this.db.getDistanceFromLatLonInKm(this.user_location[0], this.user_location[1], b.location[1], b.location[0]);

        if (aDist > bDist) {
          return 1;
        } else if (aDist < bDist) {
          return -1;
        } else {
          return 0;
        }
      });
    }
  }

}
