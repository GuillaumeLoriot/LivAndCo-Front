import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { HelpComponent } from './components/help/help.component';
import { LoginComponent } from './components/login/login.component';
import { AnnouncementListComponent } from './components/announcement-list/announcement-list.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'announcements', component: AnnouncementListComponent },
    { path: 'help', component: HelpComponent },
    { path: 'login', component: LoginComponent },
];
