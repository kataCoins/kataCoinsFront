export class KataRunDto {
  constructor(user_address, code, kata_id) {
    this.user_address = user_address;
    this.code = code;
    this.kata_id = kata_id;
  }
}