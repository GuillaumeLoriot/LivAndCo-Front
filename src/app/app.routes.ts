import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { HelpComponent } from './components/pages/help/help.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AnnouncementListComponent } from './components/pages/announcement-list/announcement-list.component';
import { AnnouncementDetailComponent } from './components/pages/announcement-detail/announcement-detail.component';
import { ReservationComponent } from './components/pages/reservation/reservation.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './components/pages/terms-of-use/terms-of-use.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'announcements', component: AnnouncementListComponent },
    { path: 'announcements/:id', component: AnnouncementDetailComponent },
    { path: 'announcements/:id/reservation', component: ReservationComponent },
    { path: 'help', component: HelpComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'terms-of-use', component: TermsOfUseComponent },

];
