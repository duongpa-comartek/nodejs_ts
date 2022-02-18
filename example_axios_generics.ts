import axios from "axios";

export interface Geo {
    lat: string;
    lng: string;
}

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface RootObject {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

axios.get<RootObject>("https://jsonplaceholder.typicode.com/users")
    .then(function (response) {
        console.log("Data : ", response.data);
    })
    .catch(function (error) {
        console.log(error);
    }); 