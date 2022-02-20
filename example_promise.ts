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

const per1_1_1 = new Person("p1_1_1");
const per1_1_2 = new Person("p1_1_2");

const per1_2_1 = new Person("p1_2_1");


const per1_1_1_1 = new Person("p1_1_1_1");

per1.children.push(per1_1);
per1.children.push(per1_2);

per1_1.children.push(per1_1_1);
per1_1.children.push(per1_1_2);
per1_2.children.push(per1_2_1);

per1_1_1.children.push(per1_1_1_1);

class Per {
    name: string;
    greet: string;
    children: Per[];
    constructor(name: string, greet: string, children: Per[]) {
        this.name = name;
        this.greet = greet;
        this.children = children;
    }
}

const todoFunction = async (person: Person): Promise<string> => {
    const greet = await person.greeting.then(data => data);
    const listPromise = person.children.map(e => {
        return todoFunction(e)
    });
    const info = await Promise.all(listPromise);
    let child: Per[] = [];
    info.forEach(e => child.push(JSON.parse(e)));
    const result = {
        name: person.name,
        greet: greet,
        children: child
    }
    return JSON.stringify(result, null, 2);
}

interface P {
    name: string,
    greet: string
}

function format<T extends P & { children: T[] }>(data: T): T {
    if (!data.children.length) {
        return {
            ...data,
            children: []
        }
    }
    return {
        ...data,
        children: data.children.map(e => format(e as T))
    }
}

todoFunction(per1).then(result => {
    console.log(format(JSON.parse(result)));
    console.log(JSON.parse(result));
});



todoFunction(per1);

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