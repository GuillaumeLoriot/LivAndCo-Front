import Reservation from "./reservation.interface";
import User from "./user.interface";

export default interface Review {
    readonly id: number;
    rating: number;
    comment: string;
    createdAt: Date;
    reservation: Reservation;
    user: User;
}