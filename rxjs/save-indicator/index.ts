// https://github.com/seognil-study/learning-by-doing/tree/master/rxjs/save-indicator
// https://stackblitz.com/edit/rxjslc-save-indicator

// * ================================================================================

import { format } from 'date-fns';
import { concat, from, fromEvent, of } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, exhaustMap, map } from 'rxjs/operators';

// * ---------------------------------------------------------------- data and helper

const $input = document.getElementById('note-input');
const $saveIndicator = document.querySelector('.save-indicator');

const setInfo = (status) => {
  $saveIndicator.innerHTML = status;
};

const getStamp = () => format(Date.now(), 'yyyy/MM/dd hh:mm');

const mockSave = (val) =>
  new Promise((res, rej) => {
    console.warn('called, should save: ', val);
    // mockLocalStorageSave(val);
    setTimeout(() => {
      res('200');
    }, ~~(Math.random() * 1000) + 1000);
  });

// * ---------------------------------------------------------------- event logic

// * -------------------------------- input

const inputStream$ = fromEvent($input, 'input').pipe(
  debounceTime(200),
  map((e) => (e.target as HTMLInputElement).value),
  distinctUntilChanged(),
);

// * -------------------------------- save action

const indecator$ = inputStream$.pipe(
  exhaustMap((val) =>
    concat(
      of('Saving'),
      from(mockSave(val)).pipe(map((code) => (code === '200' ? 'Saved' : 'Error'))),
      of('Last Saved: ' + getStamp()).pipe(delay(1000)),
    ),
  ),
);

// * -------------------------------- subscribe

indecator$.subscribe(setInfo);
