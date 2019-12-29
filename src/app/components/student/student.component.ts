import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataApiService } from 'src/app/services/data-api.service';
import { student} from 'src/app/models/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  StudentForm: FormGroup;
  submitted = false; 
  student: student = new student();
  students: student[] = new Array<student>();
  searchString: string;
  modify: boolean = false;

  constructor(private formBuilder: FormBuilder,private _DataService: DataApiService) { }

//New client
CreateStudent(){
  this.submitted = true;
  // stop here if form is invalid
  if (this.StudentForm.invalid) {return;}

  this.student = new student();
  this.student.username = this.StudentForm.controls.userName.value;
  this.student.firstname = this.StudentForm.controls.firstName.value;
  this.student.lastname = this.StudentForm.controls.lastName.value;
  this.student.age = this.StudentForm.controls.age.value;
  this.student.career = this.StudentForm.controls.career.value;
  
  this._DataService.CreateStudent(this.student)
    .subscribe(data =>{
      if (data != null){
        if(data.response){
          alert('Success!!');
        }else{
          alert('Error!!');
          console.log(data.message);
        }
        //search
        this.GetAllStudents();
        this.Clearform();
      }
    },
      error => {
      console.log(error);
      alert('Error please contact the adminstrator');
    }
    );
  }

  Clearform(){
    this.StudentForm.controls.userName.setValue("");
    this.StudentForm.controls.lastName.setValue("");
    this.StudentForm.controls.firstName.setValue("");
    this.StudentForm.controls.age.setValue("");
    this.StudentForm.controls.career.setValue("");
    this.StudentForm.controls.Id.setValue("");
    this.submitted = false;
    this.modify = false;
  }

  //Modify Student
  LoadStudent(student){
    this.StudentForm.controls.userName.setValue(student.userName);
    this.StudentForm.controls.lastName.setValue(student.lastName);
    this.StudentForm.controls.firstName.setValue(student.firstName);
    this.StudentForm.controls.age.setValue(student.age);
    this.StudentForm.controls.career.setValue(student.career);
    this.StudentForm.controls.Id.setValue(student.id);
    this.modify = true;
  }

  //Modify student
  ModifyStudent(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.StudentForm.invalid) {return;}

    this.student.username = this.StudentForm.controls.userName.value;
    this.student.firstname = this.StudentForm.controls.firstName.value;
    this.student.lastname = this.StudentForm.controls.lastName.value;
    this.student.age = this.StudentForm.controls.age.value;
    this.student.career = this.StudentForm.controls.career.value;
    this.student.id = this.StudentForm.controls.Id.value;
 
    this._DataService.ModifyStudent(this.student)
        .subscribe(data =>{
          if (data != null){
            if(data.response){
              alert('Success!!');
            }else{
              alert('Error!!');
              console.log(data.message);
            }
              //search
              this.GetAllStudents();
              this.modify = false;
              this.Clearform();
          }
        },
          error => {
          console.log(error);
          alert('Error please contact the adminstrator');
        }
        );
    }

    //Get All Students
    GetAllStudents(){
      this._DataService.GetallStudents()
      .subscribe(data =>{
        if (data != null &&data.length > 0 ){
          if(data){
            this.students = data;
          }
        }
      },
      error => {
        console.log(error);
        alert('Error please contact the adminsitrator');
      }
      );
    }

    DeleteStudent(idstudent: number){
      if(confirm("Are you sure to delete student?")) {
        this._DataService.DeleteStudent(idstudent)
        .subscribe(data =>{
          if (data != null){
            if(data.response){
              alert('Success!!');
              //search
              this.GetAllStudents();
            }else{
              alert('Error!!');
              console.log(data.message);
            }
          }
        },
          error => {
          console.log(error);
          alert('Error please contact the adminstrator');
        }
        );
      }
    }

  ngOnInit() {
    this.StudentForm = this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      career: ['', Validators.required],
      Id:['']
    });
    this.GetAllStudents();
  }

  get f() { return this.StudentForm.controls; }

}
