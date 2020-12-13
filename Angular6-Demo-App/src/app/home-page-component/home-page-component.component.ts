import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../service/rest.service';
import { Users } from '../Users';
import {  Router } from '@angular/router';



@Component({
  selector: 'app-home-page-component',
  templateUrl: './home-page-component.component.html',
  styleUrls: ['./home-page-component.component.css']
})
export class HomePageComponentComponent implements OnInit {

  
  options: Options = {
    floor: 20,
    ceil: 60
  };

  profileForm:FormGroup;
  submitted = false;
  home = false;
  company = false;
  usersCount : number;

  constructor(private formBuilder: FormBuilder,private rs: RestService,public router: Router) { }

  ngOnInit() {

  

  this.profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contactNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    age: ['20', Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required],
    addressType: ['',Validators.required],
    address1: [''],
    address2: [''],
    company1: [''],
    company2: [''],
    like: ['', Validators.required],
    profilePhoto: ['',Validators.required],
    subscribe: [false]

});

this.rs.getUsers().subscribe((res)=>{
  this.usersCount = res.length;
  
})
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.profileForm.invalid) {
        return;
    }
  

    const post : Users = {
      id : this.usersCount + 1,
      firstname : this.profileForm.value.firstName,
      lastname: this.profileForm.value.lastName,
      email: this.profileForm.value.email,
      contact: this.profileForm.value.contactNo,
      age: this.profileForm.value.age,
      state: this.profileForm.value.state,
      country: this.profileForm.value.country,
      addresstype: this.profileForm.value.addressType,
      address1: this.profileForm.value.address1,
      address2:this.profileForm.value.address2,
      company1:this.profileForm.value.company1,
      company2:this.profileForm.value.company2,
      like: this.profileForm.value.like,
      subscribe: this.profileForm.value.subscribe,
      profilePhoto: this.profileForm.value.profilePhoto


    }

   this.rs.addUser(post).subscribe((res)=>{
    console.log("Data added")

   });
   console.log(this.profileForm.value.profilePhoto);

    this.profileForm.reset();

    this.router.navigate(["/user", { 'id': this.usersCount+1 }]);



}



onSelect(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.profileForm.patchValue({profilePhoto: file});


}

onEditClick(value){
  if(value === 'Home'){

    this.profileForm.valueChanges.subscribe(val => {

      this.profileForm.controls['address1'].setValidators([Validators.required]);

      this.profileForm.controls['company1'].clearValidators();
  
});

    this.home = true;
    this.company =false;
 
  }
  if(value === 'Company'){

    this.profileForm.valueChanges.subscribe(val => {

      this.profileForm.controls['company1'].setValidators([Validators.required]);

      this.profileForm.controls['address1'].clearValidators();
});

    this.company = true;
    this.home = false;
 
  }
}



}
