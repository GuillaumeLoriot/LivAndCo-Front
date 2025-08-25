import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { HelpComponent } from './components/pages/help/help.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AnnouncementListComponent } from './components/pages/announcement-list/announcement-list.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'announcements', component: AnnouncementListComponent },
    { path: 'help', component: HelpComponent },
    { path: 'login', component: LoginComponent },
];
