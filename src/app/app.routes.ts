// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from '../app/home/home.component';
import { ProfileComponent } from '../app/profile/profile.component';
import { MissionsComponent } from '../app/missions/missions.component';
import { StatsComponent } from '../app/stats/stats.component';
import { SettingsComponent } from '../app/settings/settings.component'; // Asegúrate de importar el componente
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AuthGuard } from '../app/guards/ auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'missions', component: MissionsComponent },
      { path: 'stats', component: StatsComponent },
      { path: 'settings', component: SettingsComponent }, // Añadir ruta para Settings
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/login' }
];