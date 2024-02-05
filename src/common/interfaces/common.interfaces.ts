import {Request} from 'express';

export type errorResponse = {
    success: boolean;
    path: string;
    message: string | Array<string>;
}

export interface RequestWithUserData extends Request  {
    user: {
        id: number;
        email: string;
    };
}
