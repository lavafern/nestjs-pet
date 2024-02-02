import { User } from "@prisma/client";

export type GetUsersResponse = Omit<User,'password'> & {
    profile : {
        name : string
        profilePicture: string;
    }
} 