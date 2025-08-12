import Accomodation from "./accomodation.interface";

export default interface Image {
    readonly id: number;
    path: string;
    accomodation: Accomodation;
}