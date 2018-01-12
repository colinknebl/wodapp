import { NgModule                     } from '@angular/core';
import { RouterModule, Routes         } from '@angular/router';

// PAGES
import { IndexComponent               } from './pages/index/index.component';
import { FeaturesComponent            } from './pages/features/features.component';
import { WorkoutGeneratorComponent    } from './pages/workout-generator/workout-generator.component';
import { AboutComponent               } from './pages/about/about.component';
import { ContactComponent             } from './pages/contact/contact.component';
import { RegisterComponent            } from './pages/register/register.component';
import { LoginComponent               } from './pages/login/login.component';

// ROUTES
const appRoutes:Routes = [
  {
    path      : '', 
    component : IndexComponent
  },
  {
    path      : 'features',
    component : FeaturesComponent
  },
  {
    path      : 'about',
    component : AboutComponent
  },
  {
    path      : 'contact',
    component : ContactComponent
  },
  {
    path      : 'workout-generator/:id',
    component : WorkoutGeneratorComponent
  },
  {
    path      : 'register',
    component : RegisterComponent
  },
  {
    path      : 'login',
    component : LoginComponent
  }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(appRoutes) ],
  providers: [],
  bootstrap: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }