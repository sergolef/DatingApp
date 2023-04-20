export interface Message {
    id: number;
    recipientId: number;
    recipientPhotoUrl: string;
    recipientName: string;
    senderId: number;
    senderPhotoUrl?: string;
    senderName: string;
    content: string;
    sentDate: Date;
    readDate?: Date;
}

