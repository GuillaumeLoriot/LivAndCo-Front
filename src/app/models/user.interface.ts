import Accomodation from "./accomodation.interface";
import Announcement from "./announcement.interface";
import Message from "./message.interface";
import Reservation from "./reservation.interface";
import Review from "./review.interface";

export default interface User {
    readonly id: number;
    email: string;
    roles: string[];
    password?: string;
    firstName: string;
    lastName: string;
    birthDate?: Date;
    gender?: string;
    billingAddress?: string;
    isVerified: boolean;
    profilePicture: string;
    phoneNumber?: string;
    occupation?: string;
    createdAt: Date;

    sentMessages?: Message[];
    receivedMessages?: Message[];
    accomodations?: Accomodation[];
    announcements?: Announcement[];
    reservations?: Reservation[];
    reviews?: Review[];

}