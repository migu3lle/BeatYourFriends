import { EmailValidator } from '@angular/forms';

export class User {
    userid: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    token: string;
    test(): void {
        console.log(this.userid);
    }
}