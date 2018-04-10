export class Invite {
  email: string;
  roleName: string;

  constructor(role: string) {
    this.roleName = role;
  }
}
