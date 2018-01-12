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
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

// PAGES
import { HomeComponent } from './pages/home/home.component';
import { FeaturesComponent } from './pages/features/features.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { WorkoutGeneratorComponent } from './pages/workout-generator/workout-generator.component';
import { AboutComponent } from './pages/about/about.component';
import { CheckStatusComponent } from './pages/check-status/check-status.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GetUpdatesComponent } from './pages/get-updates/get-updates.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HelpComponent } from './pages/help/help.component';
import { DonateComponent } from './pages/donate/donate.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

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
  // {path:'', component:DashboardComponent, canActivate:[AuthGuard]},
  // {path:'register', component:RegisterComponent, canActivate:[RegisterGuard]},
  {path:'', component:IndexComponent},
  {path:'home', component:HomeComponent},
  {path:'features', component:FeaturesComponent},
  {path:'about', component:AboutComponent},
  {path:'contact', component:ContactComponent},
  {path:'donate', component:DonateComponent},
  {path:'workout-generator/:id', component:WorkoutGeneratorComponent},
  {path:'check-status', component:CheckStatusComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  // {path:'pricing', component:PricingComponent},
  // {path:'blog', component:BlogComponent},
  // {path:'get-updates', component:GetUpdatesComponent},
  // {path:'faq', component:FaqComponent},
  // {path:'help', component:HelpComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    FeaturesComponent,
    PricingComponent,
    HeaderComponent,
    FooterComponent,
    MobileNavComponent,
    DemonstrateComponent,
    WorkoutGeneratorComponent,
    CtaBarComponent,
    AboutComponent,
    CheckStatusComponent,
    BlogComponent,
    ContactComponent,
    GetUpdatesComponent,
    FaqComponent,
    HelpComponent,
    HomeComponent,
    DonateComponent,
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
