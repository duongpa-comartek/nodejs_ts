//npx tsc --init: chặt chẽ hơn, để bắt lỗi nhiều hơn

import { Invoice, Payment } from "./exportClass";
import { hasPrint } from "./exportInterface";

//Basic
const tempNumber: number = 1;
const tempString: string = 'person';
// tempNumber = 'duong' error
console.log(tempNumber, tempString);

let myColor: 'black' | 'white';
myColor = 'black';
// myColor = 'yellow'; lỗi

let temp2: any;//Có thể là bất kì kiểu gì
temp2 = 'duong';
temp2 = 1012;
temp2 = true;

//Function
//c? : đối số c có thể không cần nhập
// number | string : biến c có thể có kiểu number hoặc string
// c: number| string = 10 là c là
const add: Function = (a: number, b: number, c?: number | string) => {
    console.log(a + b);
    //Phải xac định c có được truyền vào không
    if (c !== undefined) {
        console.log(c);
    }
    //Xác định kiểu của c để tiếp tục
    if (typeof c === 'string') {
        console.log(c.toLocaleUpperCase());
    }
}
//add(11,'arr', 1) error
add(11, 9, 'arr');

// () : string : bắt buộc trả về string
const sayHi: Function = (a: string): string => `Hello ${a}`;

//Khai báo các type của đối số và type trả về
let calculated: (a: number, b: number, c: string) => number;
calculated = (numOne: number, numTwo: number, action: string) => {
    return action === '+' ? numOne + numTwo : numOne - numTwo;
}
console.log(calculated(1, 9, '+'));

type c = {
    counter: 0
}
// let person4 : c = {
//     counter : 1
// }; //không thể gán với một giá trị khác 0 vì nó đã được xác định

//Array - Object:
//arrNumber là number[] không thể thêm vào string, boolean
const arrNumber: number[] = [1, 2, 3];
//arrTemp là một mảng gồm string, boolean, number không thể thêm oj hay khác
const arrTemp: (string | number | boolean)[] = ['duong', 25, true];

//Tuple: xác định kiểu của từng vị trí
const arrTuple: [string, number, boolean] = ['duong', 25, true];

//person có thể chỉnh sửa như name là string thì chỉ có thể thay vào 1 string khác và tương tự
let person = {
    name: 'Duong',
    age: 25,
    male: true
}

//Không thể thêm những thuộc tính khác và person = { phải có tất cả các thuộc tính cũ}
person = {
    name: 'person',
    age: 23,
    male: false
}

let person2: object;
person2 = { name: 'person2', age: 12 };
person2 = [];

let person3: {
    name: string,
    age: number,
    male: boolean
}
person3 = { name: 'person3', age: 34, male: true };

//any : có thẻ là bất kỳ kiểu dữ liệu nào
let tempAny: any;
tempAny = { name: 'tempAny', age: 1 }
tempAny = 1;
tempAny = 'tempAny';

//Tạo một type mới từ các kiểu cũ, thực hiện như một kiểu dữ liệu
type StringOrNumber = string | number;
type Student = { name: string; id: StringOrNumber };

const studentDetails = (id: StringOrNumber, name: string): void => {
    console.log(`Student ${name} has id ${id}`);
}
studentDetails('UET2123', 'duong');

const greetStd = (std: Student): void => {
    console.log(`Student ${std.name} has id ${std.id}`);
}
greetStd({ name: 'Duong', id: 'UET124' });

// b! hứa rằng nhất định sẽ nhập b
const addNonNull = (a: number, b?: number) => a + b!
console.log(addNonNull(1)); // NaN vì không nhập b: 1 + undefined = NaN

/** 
 * Interface
*/
//Interface có thể thêm còn type thì không
type Per = {
    name: string,
}
// type Per = {
//     age: number,
// } không thể thêm vào type cùng tên

interface Person {
    name: string;
    speak(lang: string): void;
    sayHi(friend: string): void
}
interface Person {
    age: number
}

const ps: Person = {
    name: 'Duong',
    age: 30,
    speak(l: string): void { // Không thể l: 'Vietnam' vì đây không phải gọi hàm
        console.log(`I speak ${l}`);
    },
    sayHi(f: string): void {
        console.log(`Hi ${f}. I'm ${this.name}`);
    }
}

const helloPerson = (onePerson: Person) => {
    console.log(onePerson.name);
}
helloPerson(ps);

// import module interface, class
const personA: hasPrint = new Invoice('duong', 'it', 12342);
const personB: hasPrint = new Payment('person', 'doctor', 12342);

const allPerson: hasPrint[] = [];
allPerson.push(personA);
allPerson.push(personB);
console.log(allPerson);

//VD
interface UserInfo {
    (words: string): string;
    name: string;
}

const userInfo: UserInfo = Object.assign(
    function (words: string) {
        return words;
    }, {
    name: 'duong'
});

function anything(user: UserInfo) {
    console.log(`${user.name} ... said ${user('hello')}`);
}
anything(userInfo);

/**
 * Class
 * readonly: có thể truy cập đến nhưng không thể chỉnh sửa (lai giữa public và private)
 */
class Employee {
    public name: string;
    private age: number;
    readonly male: boolean;

    constructor(n: string, a: number, m: boolean) {
        this.name = n;
        this.age = a;
        this.male = m;
    }
}

class Employee2 {
    constructor(
        public name: string,
        private age: number,
        readonly male: boolean
    ) { }
}

/** 
 * Generics: khai báo dạng của biến trước
 */

type strArr = Array<string>;
type numArr = Array<number>;

const lengthArr = (arr: Array<number>) => arr.length;
const l1 = lengthArr([1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log(l1);

// Một array không biết trước là kiểu gì
const lengthT = <T>(arr: Array<T>) => arr.length;
const l2 = lengthT([1, 2, 3]);
const l3 = lengthT(['a', 'n', 's', 'd', 'e']);
console.log(l2, l3);
console.log(lengthT<string>(['a', 'g', 'h']));

const makeArrT = <T>(x: T) => [x]; // có thể là 1 mảng string, number...
const makeArrXY = <X, Y>(x: X, y: Y) => [x, y]; //X,Y có thể là string, number...
const m1 = makeArrXY('duong', 20);
const m2 = makeArrXY(1, 20);
const m3 = makeArrXY('a', 'b');

const makeTuple = <X, Y>(x: X, y: Y): [X, Y] => [x, y];
const m4 = makeTuple<string | null, number>('person', 1);

//tuple với giá trị default
const makeTupleDefault = <X, Y = number>(x: X, y: Y): [X, Y] => [x, y];
const m5 = makeTupleDefault<string | null>('duong', 1);

//Generics Extend
// const makeFullName = obj => ({ //Lỗi obj không khai báo
//     ...obj,
//     fullname: `${obj.firstName} ${obj.lastName}`
// });

const makeFullName = (obj: {
    firstName: string,
    lastName: string
}) => ({ // trả về một obj có thểm fullname
    ...obj,
    fullname: `${obj.firstName} ${obj.lastName}`
});
const n1 = makeFullName({ firstName: 'duong', lastName: 'phan' });
// const n1 = makeFullName({ firstName: 'duong', lastName: 'phan' , age: 30}); lỗi không thể thêm age
console.log(n1);

//Với generics
const makeFullNameWithGenerics = <
    T extends { firstName: string, lastName: string }
>(obj: T) => ({
    ...obj,
    fullname: `${obj.firstName} ${obj.lastName}`
});
const n2 = makeFullNameWithGenerics({ firstName: 'duong', lastName: 'phan', age: 30 });

//VD tiếp: thêm user
const addUser = (user: object) => {
    const id = Math.floor(Math.random() * 1000);
    return {
        ...user,
        id
    }
}
const user1 = addUser({ name: 'duong', age: 20 });
console.log(user1, user1.id);
// console.log(user1.name); không thể vì chỉ hiểu user là obj mà không biết chứa gì

const addUserT = <T extends object>(user: T) => {
    const id = Math.floor(Math.random() * 1000);
    return {
        ...user,
        id
    }
}
const user2 = addUserT({ name: '_T_', age: 20 });
console.log(user2.name);

/**
 * Generics Interface
*/
//Vì ta chưa biết data là gì nên thêm <T>
//data:T data là bất cứ thứ gì
interface Resource<T> {
    id: number,
    name: string,
    data: T
    info(): T
}

const rs1: Resource<string> = {
    id: 12,
    name: 'duong',
    data: 'ts-node', //data bắt buộc phải là string
    info: function () {
        return `dkyjgvbad`
    }
}

const rs2: Resource<object> = {
    id: 12,
    name: 'duong',
    data: {
        name: 'ts-node'
    },
    info: function () {
        return ({
            uid: this.id,
            name: this.name
        })
    }
}

const rs3: Resource<string[]> = {
    id: 12,
    name: 'duong',
    data: ['css', 'html'],
    info: () => ['a', 'b']

}

//Hoặc tạo một type mới từ interface
type numberResource = Resource<number[]>;
const rs4: numberResource = {
    id: 12,
    name: 'duong',
    data: [1, 2, 37],
    info: () => [1, 2]
}

/**
 * Generics Class: Lớp chung là một cách để nói rằng một kiểu cụ thể phụ thuộc vào kiểu khác. 
*/
class GenericNumber<T extends number> {
    zeroValue: T;
    constructor(z: T) {
        this.zeroValue = z;
    };
    get value() {
        return this.zeroValue;
    };
    set value(value: T) {
        this.zeroValue = value;
    };
    add = <T>(x: T, y: T): T => {
        return x;
    };
}

let myGenericNumber = new GenericNumber<number>(0);
console.log(myGenericNumber.add(1, 2));

//VD  
type ObjectArrName = Array<{ name: string }>;
interface ListPerson<T extends ObjectArrName> {
    listPer: T[];
    add: (items: T) => void;
    get: () => T
}

// const lp: ListPerson<ObjectArrName & { age: number }[]> = {
//     listPer: [],
//     add: function (items: ObjectArrName & { age: number }[]): void {
//         console.log(items);
//         this.listPer = items;
//     },
//     get: () => this.listPer
// }
// lp.add([
//     { name: 'duong', age: 12 },
//     { name: 'huong', age: 15 }
// ]);
// console.log(lp.get())

/**
 * Ví dụ, đây là một ngăn kéo có thể chứa bất kỳ loại đối tượng nào, nhưng chỉ có một loại
 * 1 ngăn tủ có 1 loại quần áo, có thể thêm và lấy đi.
 */
class Drawer<ClothingType> {
    contents: ClothingType[] = [];
    add(object: ClothingType) {
        this.contents.push(object);
    }
    remove() {
        return this.contents.pop();
    }
}

interface Sock {
    color: string;
}

interface TShirt {
    size: "s" | "m" | "l";
}

const sockDrawer = new Drawer<Sock>();
sockDrawer.add({ color: "white" });
const mySock = sockDrawer.remove();

const tshirtDrawer = new Drawer<TShirt>();
tshirtDrawer.add({ size: "m" });

const mixedDrawer = new Drawer<Sock | TShirt>();

/**
 * Generic Literals: ([key:string] : number)
 * Với key động, có thể thay đổi mà number giữ nguyên
*/
interface Std {
    class: string;
    school: string;
}
function StudentInfo(std: Std) {
    return {
        [std.class]: '12A1',
        [std.school]: 'YenLac2'
    }
}

console.log(StudentInfo({ class: 'LopHoc', school: 'TruongHoc' }));

//vd
// const foo = {
//     "hello": 'duong'
// };
// function translate(input: keyof typeof foo): string {
//     return foo[input];
// }
// console.log(translate('hello'));

/**
 * promise, async await
 * Promise<T> T là kiểu dữ liệu trả về của Promise
 */
function test(arg: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
        if (arg === "a") {
            resolve(1);
        } else {
            reject("1");
        }
    });
}


