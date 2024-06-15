// global.d.ts is a file that allows you to declare types that can be used globally in your TypeScript project.

type ConversationType = {
    id: string;
    fullname: string;
    username: string;
    profilePic: string;
}

type MessageType = {
    id: string;
    body: string;
    senderId: string;
    createdAt: Date,
    updatedAt: Date,
}