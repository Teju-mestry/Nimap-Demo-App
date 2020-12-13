
export class Users
{
            id: number;
            firstname: string;
            lastname: string;
            email: string;
            contact: number;
            age: number;
            state: string;
            country: string;
            addresstype: string;
            address1: string;
            address2: string;
            company1: string;
            company2: string;
            like: string;
            subscribe: boolean;
            profilePhoto:File;

            constructor(id,firstname,lastname,email,contact,age,state,country,addresstype,address1,address2,company1,company2,like,subscribe,profilePhoto){
                this.id = id;
                this.firstname = firstname;
                this.lastname = lastname;
                this.email = email;
                this.contact = contact;
                this.age = age;
                this.state = state;
                this.country = country;
                this.addresstype = addresstype;
                this.address1 = address1;
                this.address2 = address2;
                this.company1 = company1;
                this.company2 = company2;
                this.like = like;
                this.subscribe = subscribe;
                this.profilePhoto = profilePhoto;
            }
}