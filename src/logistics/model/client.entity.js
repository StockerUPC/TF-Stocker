export class Client {
    constructor({ id = "", name = "", number = "", email = "" }) {
        this.id = id;
        this.name = name;
        this.number = number;
        this.email = email;
    }
}