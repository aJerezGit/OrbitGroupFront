import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { StudentService } from '../services/student.service';
import { NgForm } from '@angular/forms';
import { Student } from '../interfaces/student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {
  @Input() student: Student;
  @Output() closeDialog: EventEmitter<Boolean> = new EventEmitter();

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit() {
  }

  private newStudent(studentFormValue) {
    this.studentService.createStudent(studentFormValue)
        .subscribe(student => console.log(student), error => console.error(error));
  }

  onSubmit(studentForm: NgForm) {
    let studentFormValue = {...studentForm.value};
    if(studentForm.valid) {
      studentFormValue.age = parseInt(studentFormValue.age);
      if(this.student) {
        studentFormValue = {...studentFormValue, id: this.student.id}
        this.editStudent(studentFormValue)
      }
      else {
        this.newStudent(studentFormValue);
        // this.router.navigate(['/']);
      }
      window.location.replace("student/#");
    }
  }

  private editStudent(studentFormValue) {
    this.studentService.updateStudent(studentFormValue)
      .subscribe(student => console.log(student), error => console.error(error));
  }

  onClose() {
    this.closeDialog.emit(true);
  }

}
