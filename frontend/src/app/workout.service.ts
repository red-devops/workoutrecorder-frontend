import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout } from './workout';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
   private apiServerUrl: string | undefined;

  constructor(private http: HttpClient) {
    this.apiServerUrl = environment.apiServerUrl;
  }

  public getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(this.apiServerUrl + '/workout/all');
  }

  public addWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(this.apiServerUrl + '/workout/add', workout);
  }

  public updateWorkout(workout: Workout): Observable<Workout> {
    return this.http.put<Workout>(this.apiServerUrl + '/workout/update', workout);
  }

  public deleteWorkout(workoutId: number): Observable<void> {
    return this.http.delete<void>(this.apiServerUrl + '/workout/delete/' + workoutId);
  }
}
