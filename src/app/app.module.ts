import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { ShareRoom } from './app.component';
import { HomePage } from '../pages/home/home'
import { LoginPage } from '../pages/login/login'
import { RegisterPage } from '../pages/register/register'
import { FIREBASE_CONFIG } from "./app.firebase.config";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Facebook } from '@ionic-native/facebook';
import { Database } from '../providers/database';
import { ChatPage } from "../pages/chat/chat";
import { Chat } from "../providers/chat";
import { ProfilePage } from "../pages/profile/profile";

@NgModule({
  declarations: [
    ShareRoom,
    HomePage,
    LoginPage,
    ChatPage,
    RegisterPage,
    ProfilePage
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
    RegisterPage,
    ProfilePage
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
