import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, LoadingController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { ShareRoom } from './app.component';
import { HomePage } from '../pages/home/home'
import { LoginPage } from '../pages/login/login'
import { FIREBASE_CONFIG } from "./app.firebase.config";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Facebook } from '@ionic-native/facebook';
import { Database } from '../providers/database';
import { ChatPage } from "../pages/chat/chat";
import { Chat } from "../providers/chat";
import { Geolocation } from '@ionic-native/geolocation';
import {MapPage} from "../pages/map/map";
import {PostItemPage} from "../pages/post-item/post-item";
import {TabsPage} from "../pages/tabs/tabs";
import {ItemPage} from "../pages/item/item";
import {ProfilePage} from "../pages/profile/profile";
import {ItemByUserPage} from "../pages/item-by-user/item-by-user";
import {EditItemPage} from "../pages/edit-item/edit-item";

@NgModule({
  declarations: [
    ShareRoom,
    HomePage,
    LoginPage,
    ChatPage,
    MapPage,
    PostItemPage,
    TabsPage,
    ItemPage,
    ProfilePage,
    ItemByUserPage,
    EditItemPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(ShareRoom),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ShareRoom,
    HomePage,
    LoginPage,
    ChatPage,
    MapPage,
    PostItemPage,
    TabsPage,
    ItemPage,
    ProfilePage,
    ItemByUserPage,
    EditItemPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    AngularFireDatabaseModule,
    Database,
    Chat,
    Geolocation,
    File,
    Camera,
    Transfer,
    FilePath,
    LoadingController,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
