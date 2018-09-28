import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Nota: (1) Importa módulos de firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Nota (2) Credenciales y configuración inicial de firebase
export const firebaseConfig = {
  apiKey: "AIzaSyAeH9jIx0n_Eo3BfKUNpvmsWLN1mgWpLAQ",
  authDomain: "chatmovil-50c59.firebaseapp.com",
  databaseURL: "https://chatmovil-50c59.firebaseio.com",
  projectId: "chatmovil-50c59",
  storageBucket: "chatmovil-50c59.appspot.com",
  messagingSenderId: "515411386440"
};

// Importa páginas (custom elements)
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserPage } from '../pages/user/user';
import { LoginPage } from '../pages/login/login';
import { RegistrarPage } from '../pages/registrar/registrar';
import { ConfPage } from '../pages/conf/conf';
import { MessagesProvider } from '../providers/messages/messages';
import { Camera } from '@ionic-native/camera';
import { PhotoLibrary } from '@ionic-native/photo-library';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserPage,
    LoginPage,
    RegistrarPage,
    ConfPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // Nota (3) Importa módulos
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UserPage,
    LoginPage,
    RegistrarPage,
    ConfPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // Nota (4) Importa provider firebase database
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MessagesProvider,
    Camera
  ]
})
export class AppModule { }
