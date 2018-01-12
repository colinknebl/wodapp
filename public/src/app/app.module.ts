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
import { FooterComponent              } from './components/footer/footer.component';
import { HeaderComponent              } from './components/header/header.component';
import { MobileNavComponent           } from './components/mobile-nav/mobile-nav.component';


// PAGES
import { AboutComponent               } from './pages/about/about.component';
import { ContactComponent             } from './pages/contact/contact.component';
import { FeaturesComponent            } from './pages/features/features.component';
import { IndexComponent               } from './pages/index/index.component';
import { LoginComponent               } from './pages/login/login.component';
import { RegisterComponent            } from './pages/register/register.component';
import { WorkoutGeneratorComponent    } from './pages/workout-generator/workout-generator.component';


// SERVICES
import { AuthService                  } from './services/auth/auth.service';
import { ContactFormService           } from './services/contact-form/contact-form.service';
import { GetWodService                } from './services/get-wod/get-wod.service';
import { IndexDemoFormService         } from './services/index-demo-form/index-demo-form.service';
import { IndexHeaderFormService       } from './services/index-header-form/index-header-form.service';
import { LoginService                 } from './services/login/login.service';
import { NavService                   } from './services/nav/nav.service';
import { RegisterUserService          } from './services/register-user/register-user.service';


@NgModule({
  declarations: [
    // COMPONENTS
    AppComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    MobileNavComponent,
    DemonstrateComponent,

    // PAGES
    FeaturesComponent,
    WorkoutGeneratorComponent,
    CtaBarComponent,
    AboutComponent,
    ContactComponent,
    ContactFormComponent,
    RegisterComponent,
    LoginComponent
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
    LoginService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
