import Accomodation from "./accomodation.interface";
import Announcement from "./announcement.interface";

export default interface Convenience {
    readonly id: number;
    name: string;
    icon: string;
    accomodations?: Accomodation[];
    announcements?: Announcement[];
}