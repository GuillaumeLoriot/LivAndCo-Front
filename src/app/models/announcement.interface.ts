import Accomodation from "./accomodation.interface";
import Convenience from "./convenience.interface";
import Reservation from "./reservation.interface";
import Service from "./service.interface";
import Unavailability from "./unavailability.interface";
import User from "./user.interface";

export default interface Announcement {
    readonly id: number;
    title: string;
    description: string;
    dailyPrice: number;
    nbPlace: number;
    coverPicture: string;

    owner: User;
    accomodation: Accomodation;
    reservations?: Reservation[];
    unavailabilities?: Unavailability[];
    conveniences?: Convenience[];
    services?: Service[];
}