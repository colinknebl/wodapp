import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeaturesComponent } from './components/features/features.component';
import { CtaBarComponent } from './components/cta-bar/cta-bar.component';
import { NavComponent } from './components/header/nav/nav.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';

// services
import { NavService } from './services/nav.service';
import { DemonstrateComponent } from './components/demonstrate/demonstrate.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FeaturesComponent,
    CtaBarComponent,
    NavComponent,
    MobileNavComponent,
    DemonstrateComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    NavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
