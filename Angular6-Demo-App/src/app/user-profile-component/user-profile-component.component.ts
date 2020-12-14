import { Component, OnInit } from '@angular/core';
import { RestService } from '../service/rest.service';
import { Options } from 'ng5-slider';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../Users';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-user-profile-component',
  templateUrl: './user-profile-component.component.html',
  styleUrls: ['./user-profile-component.component.css']
})
export class UserProfileComponentComponent implements OnInit {

  options: Options = {
    floor: 20,
    ceil: 60
  };

  profileForm:FormGroup;
  submitted = false;
  home = false;
  company = false;


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
  interestList: Array<string>;
  subscribe: boolean;
  profilePhoto:File;
  id: number;
  interest: string;

  constructor(private rs : RestService,private formBuilder: FormBuilder,public router: Router, public route: ActivatedRoute) { }


  ngOnInit():void {


    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      
  });



    this.rs.getUser(this.id).subscribe
    (
      (res)=>
    { 
       this.firstname = res.firstname;
       this.lastname = res.lastname;
       this.email = res.email;
       this.contact = res.contact;
       this.age = res.age;
       this.state = res.state;
       this.country = res.country;
       this.addresstype =res.addresstype;
       this.address1 = res.address1;
       this.address2 =  res.address2;
       this.company1 = res.company1;
       this.company2 = res.company2;
       this.interestList= res.interestList ;
       this.subscribe = res.subscribe;
       this.profilePhoto = res.profilePhoto;

       
    })
    
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', [Validators.required, Validators.maxLength(10)]],
      age: ['20', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      addressType:['',Validators.required],
      address1: [''],
      address2: [''],
      company1: [''],
      company2: [''],
      interestList: [this.interestList],
      profilePhoto: ['',Validators.required],
      subscribe: [false]
  
  });



  }

  onEditProfile(){
    this.profileForm.setValue({
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email,
      contactNo: this.contact,
      age: this.age,
      state: this.state,
      country: this.country,
      addressType: this.addresstype,
      address1: this.address1,
      address2: this.address2,
      company1: this.company1,
      company2: this.company2,
      interestList: this.interestList,
      profilePhoto: this.profilePhoto,
      subscribe: this.subscribe
    })


  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.profileForm.invalid) {
        return;
    }


    const repost : Users = {
      id : this.id,
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
      interestList: this.interestList,
      subscribe: this.profileForm.value.subscribe,
      profilePhoto: this.profileForm.value.profilePhoto


    }

    this.rs.updateUser(repost).subscribe((res)=>{
      console.log("Data Re-added");

    })

    this.profileForm.reset();
    window.location.reload();






}

addInterest(value){

  this.interestList.push(value);
  console.log(this.interestList);
  
  }
  removeInterest(index:number){
    if (index !== -1) {
        this.interestList.splice(index, 1);
    }  
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
