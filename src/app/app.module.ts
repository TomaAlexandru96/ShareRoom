import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home'
import { LoginPage } from '../pages/login/login'
import { FIREBASE_CONFIG } from "./app.firebase.config";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Facebook } from '@ionic-native/facebook';
import * as firebase from 'firebase';
import { Database } from '../providers/database';
import { ChatPage } from "../pages/chat/chat";
import { Chat } from "../providers/chat";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    AngularFireDatabaseModule,
    Database,
    Chat,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
