import { Component, Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  empForm : FormGroup;
  education: string[] = [
    'Matric','Intermediate','Diploma'
  ]
  constructor(
    private _dialogRef : MatDialogRef<EmpAddEditComponent>,
    private _fb: FormBuilder,
    private _empService : EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data : any, //pass data thông qua dialog box
    ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)  
  }

  onFormSubmit(){
    if(this.empForm.valid){
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val : any) =>{
          alert("Employee added successfully");
          this._dialogRef.close(true)
        },error:(err : any) => {
          console.error(err);
        },
      })
    }
  }
}
