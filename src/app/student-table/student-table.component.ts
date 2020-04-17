import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/student';
import { StudentService } from '../services/student.service';
import { HttpResponse } from '@angular/common/http';
import { ApiResponse } from '../interfaces/Response';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {
  students:any = []; //Observable<Student[]>;
  response: ApiResponse[];
  public selectedStudent: Student;
  public ShowModal = false;
  constructor(private studentService: StudentService) { }

  ngOnInit() {

    this.studentService.refressNeeded$
      .subscribe(() => {
        this.getStudents();
      })

    this.getStudents();  
  //  this.studentService.getStudents().subscribe(data => this.response = data,
  //          error => console.error(error));
    // console.log(this.response);
  }

  private getStudents() {
    this.students = [];
    this.studentService.getStudents().subscribe((data: {}) => {
      console.log(data);
      this.students = data;
    });
  }

  newStudent() {
    this.ShowModal = true;
    console.log(this.ShowModal);
    this.selectedStudent = null;
    setTimeout(() => {
      window.location.replace('#open-modal');
    }, 0);
  }

  editStudent(student: Student) {
    this.selectedStudent = {...student};
    this.ShowModal = true;
    setTimeout(() => {
      window.location.replace('#open-modal');
    }, 0);
  }

  public deleteStudent(student: Student) {
    this.studentService.deleteStudent(student.id)
      .subscribe(student => console.log(student), error => console.error(error));;
  }  

  closeDialog() {
    this.ShowModal = false;
  }
}
