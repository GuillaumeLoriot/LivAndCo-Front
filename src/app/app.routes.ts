import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { HelpComponent } from './components/help/help.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'announcements', component: AnnouncementsComponent },
    { path: 'help', component: HelpComponent },
    { path: 'login', component: LoginComponent },
];
