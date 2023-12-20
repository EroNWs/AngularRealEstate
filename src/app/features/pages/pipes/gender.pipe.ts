
import { Pipe, PipeTransform } from '@angular/core';
import { Gender } from 'src/app/shared/enums/gender.enum';


@Pipe({ name: 'genderText' })
export class GenderPipe implements PipeTransform {
    transform(value: Gender): string {
        switch (value) {
            case Gender.Man:
                return 'Erkek';
            case Gender.Woman:
                return 'Kadın';
            default:
                return 'Bilinmiyor';
        }
    }
}
