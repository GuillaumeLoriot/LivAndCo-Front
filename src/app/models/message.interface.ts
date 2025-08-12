import User from "./user.interface";

export default interface Message {
    readonly id: number;
    content: string;
    createdAt: Date;
    sender: User;
    receiver: User;
}