import { Time } from "@angular/common";

export interface Workout {
    id: number;
    date: Date;
    time: Time;
    distance: number;
    calories: number;
    comments: String;
}