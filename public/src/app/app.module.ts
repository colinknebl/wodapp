import { BrowserModule                } from '@angular/platform-browser';
import { NgModule                     } from '@angular/core';
import { HttpModule                   } from '@angular/http';
import { HttpClientModule             } from '@angular/common/http';
import { AngularFontAwesomeModule     } from 'angular-font-awesome';
import { ReactiveFormsModule          } from '@angular/forms';
import { AppRoutingModule             } from './app-routing.module';


// COMPONENTS
import { AppComponent                 } from './app.component';
// custom components
import { ContactFormComponent         } from './components/contact-form/contact-form.component';
import { CtaBarComponent              } from './components/cta-bar/cta-bar.component';
import { DemonstrateComponent         } from './components/demonstrate/demonstrate.component';
import { FlashMessagesComponent       } from './components/flash-messages/flash-messages.component';
import { FooterComponent              } from './components/footer/footer.component';
import { HeaderComponent              } from './components/header/header.component';
import { MobileNavComponent           } from './components/mobile-nav/mobile-nav.component';


// PAGES
import { AboutComponent               } from './pages/about/about.component';
import { AccountComponent             } from './pages/account/account.component';
import { ContactComponent             } from './pages/contact/contact.component';
import { DonateComponent              } from './pages/_page-archive/donate/donate.component';
import { FeaturesComponent            } from './pages/features/features.component';
import { IndexComponent               } from './pages/index/index.component';
import { LoginComponent               } from './pages/login/login.component';
import { RegisterComponent            } from './pages/register/register.component';
import { WorkoutGeneratorComponent    } from './pages/workout-generator/workout-generator.component';


// SERVICES
import { AuthService                  } from './services/auth/auth.service';
import { ContactFormService           } from './services/contact-form/contact-form.service';
import { FlashMessagesService         } from './services/flash-messages/flash-messages.service';
import { GetWodService                } from './services/get-wod/get-wod.service';
import { IndexDemoFormService         } from './services/index-demo-form/index-demo-form.service';
import { IndexHeaderFormService       } from './services/index-header-form/index-header-form.service';
import { NavService                   } from './services/nav/nav.service';
import { RegisterUserService          } from './services/register-user/register-user.service';
import { UpdateUserService            } from './services/update-user/update-user.service';

// GUARDS
import { AuthGuard                    } from './guards/auth.guard';
import { NotAuthGuard                 } from './guards/notAuth.guard';

// MODELS
import { UserModel                    } from './models/user';
import { UserGenModel                 } from './models/user-gen-wod';


@NgModule({
  declarations: [
    // COMPONENTS
    AppComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    MobileNavComponent,
    DemonstrateComponent,
    FlashMessagesComponent,

    // PAGES
    FeaturesComponent,
    WorkoutGeneratorComponent,
    CtaBarComponent,
    AboutComponent,
    ContactComponent,
    ContactFormComponent,
    RegisterComponent,
    LoginComponent,
    AccountComponent,
    DonateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  providers: [
    NavService,
    GetWodService,
    IndexHeaderFormService,
    IndexDemoFormService,
    ContactFormService,
    RegisterUserService,
    UpdateUserService,
    AuthService,
    AuthGuard,
    NotAuthGuard,
    FlashMessagesService,
    UserModel,
    UserGenModel
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
