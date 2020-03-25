import { Component } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { map, skipUntil, takeUntil, repeat, sample, scan } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Cyber IT Pvt.Ltd.';
  activity:any =[];
  history:any = [];
  btnDisabled = true;
  start$ = new Subject();
  stop$ = new Subject();
  record$ = new Subject();
  btnDisabled1= true;
  startText = 'Start';
  time:any=[];
  

  send(event: any) {
        const value = event.target.value;
        this.activity=[];
        this.activity.push(value)
       this.btnDisabled = false;
        console.log(value);
   }

  timer$ = interval(100).pipe(
    skipUntil(this.start$),
    takeUntil(this.stop$),
    repeat(),
    map(time => time / 10)
  
  );

  timeList$ = this.timer$.pipe (
    sample(this.record$),
    scan<number>((list, time) => [...list, time], [])
  )
  
  start() {
    this.start$.next();
    this.btnDisabled1 = false;
  }

  stop() {
    this.stop$.next();
        this.history.push({'Activity':this.activity});
   console.log(this.history);
    console.log("The activity you choose is "+this.activity);

  }

  record() {
    this.record$.next();
    
    this.startText = 'Start';
    
    this.btnDisabled1=true;
    this.btnDisabled=true;

  }
  reset() {
    this.start$ = false;
    this.startText = 'Start';
    this.activity=[];
    this.btnDisabled1=true;
    this.btnDisabled=true;
    this.timeList$=false;
  }

}