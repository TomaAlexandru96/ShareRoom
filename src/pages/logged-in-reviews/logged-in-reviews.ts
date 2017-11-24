import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Database } from "../../providers/database";
import { Review} from "../../models/review";

/**
 * Generated class for the LoggedInReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logged-in-reviews',
  templateUrl: 'logged-in-reviews.html',
})
export class LoggedInReviewsPage {

  retrievedReviews : Review[] = [];
  average : number = 0;
  loggedInName : string = "Default User";
  imagePath : string = "../../assets/images/dark_star.png";

  constructor(public navCtrl: NavController, public navParams: NavParams, private db : Database) {
    this.loggedInName = navParams.get("loggedInName");
    this.imagePath = navParams.get("imagePath");
  }

  ionViewDidLoad() {
    this.db.getAllLoggedInReviews().then((reviews) => {
      this.retrievedReviews = reviews;
      this.average = this.computeAverage(reviews);
      this.someFunction(this.retrievedReviews);
    });
    console.log('ionViewDidLoad LoggedInReviewsPage');
  }

  someFunction = (myArray) => {
    const promises = myArray.map(async (review) => {
      this.db.getUserInfoById(review.user_id).then(
        (user) => {
          review.reviewer_name = user.display_name;
          // console.log("IN SOME FUNCTION LOGGED IN REVIEWS: " + user.display_name);
          return review;
        }
      ).catch(console.error);
    });
    return Promise.all(promises);
  };

  private computeAverage(reviews) {
    var avg = 0;
    for (var r of reviews) {
      avg += r.rating;
    }
    avg /= reviews.length;
    return Math.round(avg * 100) / 100
  }

  goToOtherUsersPage(reviewer_id) {
    // TO DO: change to users reviews page not add reviews page
    if (reviewer_id != this.db.getCurrentUserId()) {
      this.navCtrl.push("AddReviewsPage", {"userToReviewUID": reviewer_id});
    }
  }
}
