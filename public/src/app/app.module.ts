import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 

import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { FeaturesComponent } from './pages/features/features.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';

// services
import { NavService } from './services/nav.service';
import { DemonstrateComponent } from './components/demonstrate/demonstrate.component';
import { WorkoutGeneratorComponent } from './pages/workout-generator/workout-generator.component';


const appRoutes:Routes = [
  // {path:'', component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'', component:IndexComponent},
  {path:'features', component:FeaturesComponent},
  {path:'pricing', component:PricingComponent},
  {path:'workout-generator', component:WorkoutGeneratorComponent},
//   {path:'register', component:RegisterComponent, canActivate:[RegisterGuard]},
//   {path:'login', component:LoginComponent},
//   {path:'add-client', component:AddClientComponent, canActivate:[AuthGuard]},
//   {path:'client/:id', component:ClientDetailsComponent, canActivate:[AuthGuard]}, 
//   {path:'edit-client/:id', component:EditClientComponent, canActivate:[AuthGuard]},
//   {path:'settings', component:SettingsComponent, canActivate:[AuthGuard]},
//   {path:'**', component:PageNotFoundComponent},
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
    WorkoutGeneratorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    NavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
