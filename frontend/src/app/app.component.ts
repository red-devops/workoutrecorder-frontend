import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Workout } from './workout';
import { WorkoutService } from './workout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public workouts!: Workout[];
  public updateWorkout!: Workout | null;
  
  constructor(private workoutService: WorkoutService){}

  ngOnInit() {
    this.getWorkouts();
  }

  public getWorkouts(): void {
    this.workoutService.getWorkouts().subscribe(
      (response: Workout[]) => {
        this.workouts = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddWorkout(addForm: NgForm): void {
    document.getElementById("add-workout-form")?.click();
    this.workoutService.addWorkout(addForm.value).subscribe(
        (respose: Workout) => { 
          this.getWorkouts();
          addForm.reset(); 
        },
        (error: HttpErrorResponse) => { 
          alert(error.message); 
          addForm.reset();
        }
      );
  }

  public onUpdateWorkout(workout: Workout): void {
    document.getElementById("update-workout-form")?.click();
    this.workoutService.updateWorkout(workout).subscribe(
        (respose: Workout) => { 
          this.getWorkouts(); 
        },
        (error: HttpErrorResponse) => { 
          alert(error.message); 
        }
      );
  }

  public onDeleteWorkout(workoutId: number): void {
    this.workoutService.deleteWorkout(workoutId).subscribe(
        (respose: void) => { 
          this.getWorkouts(); 
        },
        (error: HttpErrorResponse) => { 
          alert(error.message); 
        }
      );
  }

  public onOpenModal(workout: Workout | null, mode: string): void{
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');
    button.type = 'button'
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addWorkoutModal');
    }
    else {
      this.updateWorkout = workout;
      button.setAttribute('data-target', '#updateWorkoutModal');
    }
    container.appendChild(button);
    button.click();
  }

}
