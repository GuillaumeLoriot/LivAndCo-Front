import Announcement from "./announcement.interface";
import Review from "./review.interface";
import User from "./user.interface";

export default interface Reservation {
    readonly id: number;
    startDate: Date;
    endDate: Date;
    status: string;
    totalPrice: string;
    createdAt: Date;
    user: User;
    announcement: Announcement;
    review?: Review;
}