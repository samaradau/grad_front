import { Component,  ElementRef, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})

export class TimerComponent implements OnInit, OnDestroy {
    @Input('totalSeconds')
    totalSeconds: number;
    @Output('timerOutEvent')
    timerOutEvent = new EventEmitter();

    public days;
    public hours;
    public minutes;
    public seconds;

    private counter: Observable<number>;
    private subscription: Subscription;

    constructor() {}

    ngOnInit() {
        this.setTimer(this.totalSeconds);
        this.startTimer();
    }

    timerOut() {
        this.timerOutEvent.emit();
    }

    startTimer(): void {
        this.subscription = interval(1000).subscribe(t => {
            if (!this.updateTimer()) {
                this.subscription.unsubscribe();
                this.timerOut();
            }
        });
    }

    updateTimer(): boolean {
        this.seconds--;
        if (this.seconds < 0) {
            this.seconds += 60;
            this.minutes --;
        }
        if (this.minutes < 0) {
            this.minutes += 60;
            this.hours --;
        }
        if (this.hours < 0) {
            this.hours += 24;
            this.days--;
        }
        if (this.days < 0) {
            this.setTimer(0);
            return false;
        }

        return true;
    }

    setTimer(totalSeconds): void {
        this.days = Math.floor(totalSeconds / 86400);
        totalSeconds -= this.days * 86400;
        this.hours = Math.floor(totalSeconds / 3600) % 24;
        totalSeconds -= this.hours * 3600;
        this.minutes = Math.floor(totalSeconds / 60) % 60;
        totalSeconds -= this.minutes * 60;
        this.seconds = totalSeconds % 60;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
