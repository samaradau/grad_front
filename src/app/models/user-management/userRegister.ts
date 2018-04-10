export class UserRegister {

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.inviteCode = null;
  }

  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  inviteCode: string;
}
