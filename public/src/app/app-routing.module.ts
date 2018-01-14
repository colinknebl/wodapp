import { NgModule                     } from '@angular/core';
import { RouterModule, Routes         } from '@angular/router';

// PAGES
import { AboutComponent               } from './pages/about/about.component';
import { AccountComponent             } from './pages/account/account.component';
import { ContactComponent             } from './pages/contact/contact.component';
import { FeaturesComponent            } from './pages/features/features.component';
import { IndexComponent               } from './pages/index/index.component';
import { LoginComponent               } from './pages/login/login.component';
import { RegisterComponent            } from './pages/register/register.component';
import { WorkoutGeneratorComponent    } from './pages/workout-generator/workout-generator.component';

// GUARDS
import { AuthGuard                    } from './guards/auth.guard';
// import { NotAuthGuard                 } from './guards/notAuth.guard';

// ROUTES
const appRoutes:Routes = [
  {
    path        : '', 
    component   : IndexComponent
  },
  {
    path        : 'about',
    component   : AboutComponent
  },
  {
    path        : 'account',
    component   : AccountComponent,
    canActivate : [AuthGuard]
  },
  {
    path        : 'contact',
    component   : ContactComponent
  },
  {
    path        : 'features',
    component   : FeaturesComponent
  },
  {
    path        : 'login',
    component   : LoginComponent
  },
  {
    path        : 'register',
    component   : RegisterComponent
  },
  {
    path        : 'workout-generator/:id',
    component   : WorkoutGeneratorComponent
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