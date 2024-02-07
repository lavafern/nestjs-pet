import { BadRequestException, ParseFilePipeBuilder } from "@nestjs/common";

export const imageUploadConstants = new ParseFilePipeBuilder()
.addMaxSizeValidator({
    maxSize: 10000000,
    message:'size'
})
.addFileTypeValidator({
    fileType: '\.(jpg|jpeg|png)$'
})
.build({
    exceptionFactory(error) {

        if (error!=='size') {
            throw new BadRequestException('File type must be jpg/jpeg/png');
        }
        throw new BadRequestException('Size must less than 10MB');
    },
    fileIsRequired: false
});