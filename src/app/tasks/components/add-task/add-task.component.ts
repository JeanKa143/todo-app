import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() newTaskName = new EventEmitter<string>();

  newTaskForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.newTaskForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      taskName: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.newTaskForm.invalid) return;
    this.newTaskName.emit(this.newTaskForm.value.taskName);
    this.newTaskForm.reset();
  }
}
