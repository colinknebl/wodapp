import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';

// COMPONENTS
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { DemonstrateComponent } from './components/demonstrate/demonstrate.component';
import { CtaBarComponent } from './components/cta-bar/cta-bar.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

// PAGES
import { FeaturesComponent } from './pages/features/features.component';
import { WorkoutGeneratorComponent } from './pages/workout-generator/workout-generator.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

// SERVICES
import { NavService } from './services/nav.service';
import { GetWodService } from './services/get-wod.service';
import { IndexHeaderFormService } from './services/index-header-form.service';
import { IndexDemoFormService } from './services/index-demo-form.service';
import { ContactFormService } from './services/contact-form.service';
import { RegisterUserService } from './services/register-user.service';
import { LoginService } from './services/login.service';
import { AuthService } from './services/auth.service';

// ROUTES
const appRoutes:Routes = [
  {path:'', component:IndexComponent},
  {path:'features', component:FeaturesComponent},
  {path:'about', component:AboutComponent},
  {path:'contact', component:ContactComponent},
  {path:'workout-generator/:id', component:WorkoutGeneratorComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
];

@NgModule({
  declarations: [
    // COMPONENTS
    AppComponent,
    IndexComponent,
    FeaturesComponent,
    HeaderComponent,
    FooterComponent,
    MobileNavComponent,
    DemonstrateComponent,

    // PAGES
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
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
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
