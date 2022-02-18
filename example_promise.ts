class Person {
    name: string;
    greet?: Promise<string>;
    child?: Promise<Person[]>;
    constructor(name: string) {
        this.name = name;
    }
}

const PromiseGreet = <T>(val: T): Promise<string> => {
    return Promise.resolve(`Hello. I'm ${val}`);
};

//Tạo các per-child
const user = new Person('per');
const children1 = new Person('child1');
const children2 = new Person('child2');

//Thêm greet cho pp
user.greet = PromiseGreet(user.name);
children1.greet = PromiseGreet(children1.name);
children2.greet = PromiseGreet(children2.name);

//Để child1,2 là con của user
user.child = new Promise((res, rej) => {
    res([children1, children2]);
});

async function readAll(person: Person) {
    try {
        const user = await Promise.all([person.greet, person.child])
            .then((data) => {
                let [greet, child] = data;
                //Chào với person bố
                console.log(greet);
                //lặp lại với các con
                child?.forEach(e => readAll(e));
            });
    } catch (e) {
        console.error(e);
    }
}
readAll(user);
