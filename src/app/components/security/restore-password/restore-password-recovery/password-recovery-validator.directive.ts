import { Directive, forwardRef, Attribute, NgModule } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[appValidateEqual][appReverse]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => PasswordEqualValidator), multi: true }
    ]
})
export class PasswordEqualValidator implements Validator {
    constructor(@Attribute('appValidateEqual') public validateEqual: string,
    @Attribute('appReverse') public reverse: string) {
    }

    private get isReverse() {
        if (!this.reverse) {
            return false;
        }
        return this.reverse === 'true' ? true : false;
    }

    validate(c: AbstractControl): { [key: string]: any } {
        // self value
        const v = c.value;

        // control vlaue
        const e = c.root.get(this.validateEqual);

        // value not equal
        if (e && v !== e.value && !this.isReverse) {
            return {
                validateEqual: false
            };
        }

        // value equal and reverse
        if (e && v === e.value && this.isReverse) {
            delete e.errors['validateEqual'];
            if (!Object.keys(e.errors).length) {
                e.setErrors(null);
            }
        }

        // value not equal and reverse
        if (e && v !== e.value && this.isReverse) {
            e.setErrors({ validateEqual: false });
        }

        return null;
    }
}
