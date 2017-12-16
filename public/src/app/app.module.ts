import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// COMPONENTS
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { DemonstrateComponent } from './components/demonstrate/demonstrate.component';
import { CtaBarComponent } from './components/cta-bar/cta-bar.component';

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

// SERVICES
import { NavService } from './services/nav.service';
import { GetWodService } from './services/get-wod.service';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

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
    ContactFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFontAwesomeModule
  ],
  providers: [
    NavService,
    GetWodService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
