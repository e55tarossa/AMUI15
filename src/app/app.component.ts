import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogRef } from '@angular/cdk/dialog';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularMUCRUD';
  constructor(private _dialog: MatDialog, 
    private _empService : EmployeeService,
    private _coreService : CoreService
    ) {}
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getEmployeeList()
  }
  
  openAddEditEmpForm(){
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }


  //Already have 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }


  deleteEmployee(id :any){
    this._empService.deleteEmployee(id).subscribe({
      next : () => {
      this._coreService.openSnackBar('Employee deleted',"")
      this.getEmployeeList()},
      error : (error) => { console.log(error);}
    })
  }

  getEmployeeList(){
    this._empService.getEmployeeList().subscribe({
      next : (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      },
      error : (err) => {
        console.log(err)
      }
    })
  }
}
