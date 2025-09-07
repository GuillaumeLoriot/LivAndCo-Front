import Announcement from "./announcement.interface";
import Convenience from "./convenience.interface";
import Image from "./image.interface";
import User from "./user.interface";

export default interface Accomodation {
    readonly id: number;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    zipCode: string;
    country: string;
    longitude: string;
    latitude: string;
    surface: number;
    mixedGender?: boolean;
    coverPicture: string;

    images?: Image[];
    owner: User;
    announcements?: Announcement[];
    conveniences?: Convenience[];
}