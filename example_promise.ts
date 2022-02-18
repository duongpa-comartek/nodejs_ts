// class Person {
//     name: string;
//     greet?: Promise<string>;
//     child?: Promise<Person[]>;
//     constructor(name: string) {
//         this.name = name;
//     }
// }

// const getGreet = <T>(val: T): Promise<string> => {
//     return Promise.resolve(`Hello. I'm ${val}`);
// };

// //Tạo các per-child
// const user = new Person('per');
// const children1 = new Person('child1');
// const children2 = new Person('child2');

// //Thêm greet cho pp
// user.greet = getGreet(user.name);
// children1.greet = getGreet(children1.name);
// children2.greet = getGreet(children2.name);

// //Để child1,2 là con của user
// user.child = new Promise((res, rej) => {
//     res([children1, children2]);
// });

// async function readAll(person: Person) {
//     try {
//         const user = await Promise.all([person.greet, person.child])
//             .then((data) => {
//                 let [greet, child] = data;
//                 //Chào với person bố
//                 console.log(greet);
//                 //lặp lại với các con
//                 child?.forEach(e => readAll(e));
//             });
//     } catch (e) {
//         console.error(e);
//     }
// }
// readAll(user);

class Person {
    name: string;
    greeting: Promise<string>;

    constructor(_name: string) {
        this.name = _name;
        this.greeting = new Promise((rs) => {
            setTimeout(() => {
                rs(`My name is ${_name}`);
            }, 1000);
        });
    }
    children: Person[] = [];
}

const per1 = new Person("p1");
const per1_1 = new Person("p1_1");
const per1_2 = new Person("p1_2");

per1.children.push(per1_1);
per1.children.push(per1_2);

class Info {
    name: string;
    greet: string;
    child: string;
    constructor(name: string, greet: string, child: string) {
        this.name = name;
        this.greet = greet;
        this.child = child;
    }
}

const todoFunction = async (person: Person): Promise<string> => {
    const greet = await person.greeting.then(data => data);
    let child: string = '';
    const map = person.children.map(e => todoFunction(e));
    for (let i = 0; i < map.length; i++) {
        const info = await map[i];
        child = child.concat(info);
    }
    const p = new Info(person.name, greet, child);
    return Promise.resolve(JSON.stringify(p));
}

todoFunction(per1).then(result => {
    // result must be
    /**
     * {
     *      name: 'p1',
     *      greeting: 'My name is p1',
     *      children: [
     *          {
     *              name: 'p1_1',
     *              greeting: 'My name is p1_1',
     *              children: []
     *          },
     *          {
     *              name: 'p1_2',
     *              greeting: 'My name is p1_2',
     *              children: []
     *          }
     *      ]
     * }
     */
    console.log(result);
});

todoFunction(per1);
