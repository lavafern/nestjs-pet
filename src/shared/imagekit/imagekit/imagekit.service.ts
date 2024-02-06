import { Injectable } from '@nestjs/common';
import { imagekitContstants } from './imagekit.constants';
import * as path from 'path';
import { ImagekitConstants } from './imagekitConstants';
declare function require(name:string);
const ImageKit = require('imagekit');


@Injectable()
export class ImagekitService {
    private readonly _config : ImagekitConstants;
    private readonly imagekit: any;
    constructor() {
        this._config = imagekitContstants;
        this.imagekit = new ImageKit(this._config);
    }

    async uploadImage(file: Express.Multer.File) : Promise<string>{
        console.log('or',file.originalname);
        console.log(path);
        
        
        const base64File = file.buffer.toString('base64');
        const {url} = await this.imagekit.upload({
            fileName: Date.now() + path.extname(file.originalname),
            file: base64File
        });

        return url;
    }
    
}
