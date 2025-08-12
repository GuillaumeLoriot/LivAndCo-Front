import Announcement from "./announcement.interface";

export default interface Unavailability {
    readonly id: number;
    startDate: Date;
    endDate: Date;
    description?: string;
    announcement: Announcement;
}