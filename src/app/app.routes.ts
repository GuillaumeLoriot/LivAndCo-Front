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
import { ProfileShellComponent } from './components/pages/profile/profile-shell/profile-shell.component';
import { ProfilePanelComponent } from './components/layout/profile/panels/profile-panel/profile-panel.component';
import { ReservationsPanelComponent } from './components/layout/profile/panels/reservations-panel/reservations-panel.component';
import { MessagesPanelComponent } from './components/layout/profile/panels/messages-panel/messages-panel.component';
import { OverviewComponent } from './components/pages/profile/general/overview/overview.component';
import { OwnerDashboardPanelComponent } from './components/layout/profile/panels/owner-dashboard-panel/owner-dashboard.component';
import { EditProfileComponent } from './components/pages/profile/general/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/pages/profile/general/change-password/change-password.component';
import { UpcomingReservationsComponent } from './components/pages/profile/reservations/upcoming-reservations/upcoming-reservations.component';
import { OngoingReservationsComponent } from './components/pages/profile/reservations/ongoing-reservations/ongoing-reservations.component';
import { PastReservationsComponent } from './components/pages/profile/reservations/past-reservations/past-reservations.component';
import { AccomodationsComponent } from './components/pages/profile/owner-dashboard/accomodations/accomodations.component';
import { AnnouncementsComponent } from './components/pages/profile/owner-dashboard/announcements/announcements.component';
import { RentalRequestsComponent } from './components/pages/profile/owner-dashboard/rental-requests/rental-requests.component';
import { RentalScheduleComponent } from './components/pages/profile/owner-dashboard/rental-schedule/rental-schedule.component';
import { AddAccommodationComponent } from './components/pages/profile/owner-dashboard/add-accommodation/add-accommodation.component';
import { AddAnnouncementComponent } from './components/pages/profile/owner-dashboard/add-announcement/add-announcement.component';
import { ReviewsComponent } from './components/pages/profile/owner-dashboard/reviews/reviews.component';


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
    {
        // La page profil contien une nagigation secondaire avec toute les vue liées au profil de l'utilisateur connecté
        path: 'profile', component: ProfileShellComponent, children:
            [
                // Contenu principal par défaut du profil
                { path: '', redirectTo: 'overview', pathMatch: 'full' },
                
                // Panneaux latéral suplémenaire nommé "panel"
                { path: 'profile-menu', outlet: 'panel', component: ProfilePanelComponent },
                { path: 'reservations-menu', outlet: 'panel', component: ReservationsPanelComponent },
                { path: 'messages-menu', outlet: 'panel', component: MessagesPanelComponent },
                { path: 'owner-menu', outlet: 'panel', component: OwnerDashboardPanelComponent },

                // Vues principales dans le profil

                // Informations utilisateur
                { path: 'overview', component: OverviewComponent },
                { path: 'edit', component: EditProfileComponent },
                { path: 'change-password', component: ChangePasswordComponent },

                // Réservations utilisateur
                { path: 'upcoming-reservations', component: UpcomingReservationsComponent },
                { path: 'ongoing-reservations', component: OngoingReservationsComponent },
                { path: 'past-reservations', component: PastReservationsComponent },

                // Dashboard propriétaire
                { path: 'accomodations', component: AccomodationsComponent },
                { path: 'announcements', component: AnnouncementsComponent },
                { path: 'rental-requests', component: RentalRequestsComponent },
                { path: 'rental-schedule', component: RentalScheduleComponent },
                { path: 'add-accomodation', component: AddAccommodationComponent },
                { path: 'add-announcement', component: AddAnnouncementComponent },
                { path: 'reviews', component: ReviewsComponent }

                // Messagerie Utilisateur

            ],
    },
];

