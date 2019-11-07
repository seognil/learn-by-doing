// https://github.com/seognil-study/learning-by-doing/tree/master/rxjs/smart-counter
// https://stackblitz.com/edit/rxjslc-smart-counter

// * ================================================================================

import { animationFrameScheduler, concat, fromEvent, of } from 'rxjs';
import { map, mapTo, repeat, startWith, switchMap, take, takeWhile, tap } from 'rxjs/operators';

// * ------------------------------------------------

const $input = document.querySelector('#range');
const $display = document.querySelector('#display');

// * a simple ease-out curve calculator
const valueCurve = (last: number, next: number, duration: number, currTime: number): number =>
  currTime >= duration ? next : (1 - (1 - currTime / duration) ** 2) ** 0.5 * (next - last) + last;

// * the much it changed, the much it spent, range is [600,1000)
const timeCurve = (gap) => 600 + 400 * (Math.atan(Math.log10(Math.abs(gap) + 1)) / (Math.PI / 2));

const updateDisplay = (val) => ($display.innerHTML = val);

// * ------------------------------------------------

const inputStream$ = fromEvent($input, 'change').pipe(
  map((e) => (e.target as HTMLInputElement).value),
  map((e) => Number(e)),
);

// * we all love raf :)
const rafInterval$ = () =>
  of(Date.now(), animationFrameScheduler).pipe(
    map((start) => Date.now() - start),
    repeat(),
  );

const singleAnime$ = ([last, next]) =>
  concat(
    rafInterval$().pipe(
      map((currTime) => valueCurve(last, next, timeCurve(next - last), currTime)),
      map((val) => Math.round(val)),
      takeWhile((val) => val !== next),
    ),

    // * tick last frame
    rafInterval$().pipe(
      take(1),
      mapTo(next),
    ),
  );

// ! I failed to avoid side effect :(
// * don't know how to achieve it use only rxjs, so just follow the original post
// * tried input.pairwise but result is not corret, while trigger before last anime complete

let lastDisplayValue = 0;

const displayStream$ = inputStream$.pipe(
  startWith(0),
  map((v) => [lastDisplayValue, v]),
  switchMap(singleAnime$),
  tap((v) => (lastDisplayValue = v)),
);

displayStream$.subscribe(updateDisplay);
