import { hasPrint } from "./exportInterface";

export class Invoice implements hasPrint {
    constructor(
        private name: string,
        private work: string,
        private amount: number
    ) { }

    print() {
        return `${this.name} - ${this.amount}`;
    }
}

export class Payment implements hasPrint {
    constructor(
        private name: string,
        private job: string,
        private amount: number
    ) { }

    print() {
        return `${this.name} - ${this.amount}`;
    }
}
