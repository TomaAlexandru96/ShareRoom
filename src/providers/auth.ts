import {User} from '../models/user';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Platform} from 'ionic-angular';
import {Facebook} from '@ionic-native/facebook';
import {Injectable} from "@angular/core";


@Injectable()
export class Auth {

  constructor(private afAuth: AngularFireAuth,
              private fb: Facebook, private platform: Platform) {
  }

  login(user: User): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  registerEmail(user: User): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then(data => {
          this.saveBasicUserInfo(this.getCurrentUserId(), user.display_name, user.profile_picture, "", user.phoneNumber, user.email);
          resolve(data)
        })
        .catch(reject);
    });
  }

  facebookRegister(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.platform.is('cordova')) {
        this.fb.login(['email', 'public_profile']).then(res => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          firebase.auth().signInWithCredential(facebookCredential).then(res => {
            let user = res.user;
            this.saveBasicUserInfo(user.uid, user.displayName,
              res.additionalUserInfo.profile.picture.data.url,
              user.emailVerified, user.phoneNumber, user.email);
            resolve();
          }).catch(reject);
        }).catch(reject);
      } else {
        this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => {
          let user = res.user;
          this.saveBasicUserInfo(user.uid, user.displayName,
            res.additionalUserInfo.profile.picture.data.url,
            user.emailVerified, user.phoneNumber, user.email);
          resolve();
        }).catch(reject);
      }
    });
  }

  googleLogin(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      res => {
        let user = res.user;
        this.saveBasicUserInfo(user.uid, user.displayName,
          null, user.emailVerified,
          user.phoneNumber, user.email);
      }
    );
  }

  saveBasicUserInfo(uid: string, display_name: string, profile_picture: string,
                    email_verified: string, phone_number: string, email: string) {
    if (profile_picture === null) profile_picture = "https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png";
    this.saveUserInfoParam(uid, 'display_name', display_name);
    this.saveUserInfoParam(uid, 'profile_picture', profile_picture);
    this.saveUserInfoParam(uid, 'email_verified', email_verified);
    this.saveUserInfoParam(uid, 'phone_number', phone_number);
    this.saveUserInfoParam(uid, 'email', email);
  }

  private saveUserInfoParam(uid: string, param: string, value: string) {
    firebase.database().ref('users/' + uid + '/' + param).set(value);
  }

  getCurrentUserId(): string {
    if (firebase.auth().currentUser) {
      return firebase.auth().currentUser.uid;
    } else {
      return null;
    }
  };

  getUserInfoById(uid: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      firebase.database().ref('/users/' + uid).once('value',
        function (snapshot) {
          var db_user = snapshot.val();
          let user: User = {
            uid: uid,
            email: db_user.email,
            password: null,
            profile_picture: db_user.profile_picture,
            display_name: db_user.display_name,
            emailVerified: db_user.email_verified,
            phoneNumber: db_user.phone_number,
            items: db_user.items,
            reviews: db_user.reviews
          };
          resolve(user);
        }, function (errorObject) {
          reject("Error on returning: " + errorObject.code);
        });
    });
  }

  /*private getCurrentUserParam(param_name : string) : Promise<string> {
    var userId = this.getCurrentUserId();
    if (userId) {
      return new Promise<string>((resolve, reject) => {
        firebase.database().ref('/users/' + userId + '/' + param_name).once('value',
          function(snapshot) {
            resolve(snapshot.val());
          }, function (errorObject) {
            reject("The read failed: " + errorObject.code);
          });
      });
    } else {
      return new Promise<string>((resolve, reject) => {
        reject("You need to log in");
      });
    }
  }*/


}
