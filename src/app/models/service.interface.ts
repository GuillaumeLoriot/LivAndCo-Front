import Announcement from "./announcement.interface";

export default interface Service {
    readonly id: number;
    name: string;
    description: string;
    announcements?: Announcement[];
}