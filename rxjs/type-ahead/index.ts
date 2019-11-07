// https://github.com/seognil-study/learning-by-doing/tree/master/rxjs/type-ahead
// https://stackblitz.com/edit/rxjslc-type-ahead

// * ================================================================================

import { from, fromEvent, merge, of } from 'rxjs';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';

// * ---------------------------------------------------------------- data and trivial logic

const listDataMine = [
  'africa',
  'antarctica',
  'asia',
  'australia',
  'europe',
  'north america',
  'south america',
];

const listDataGithubUrl =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const $input = document.querySelector('#type-ahead');
const $display = document.querySelector('#output');

const renderList = (data) => {
  $display.innerHTML = Array.isArray(data) ? data.join('<br/>') : data;
};

const hightlight = (term: string, val: string) =>
  term.replace(new RegExp(val, 'gi'), (e) => `<b>${e}</b>`);

const matchRuler = (term: string, val: string) => new RegExp(val, 'gi').test(term);

const log = (...e) => console.warn(Date.now(), ...e);

// * ---------------------------------------------------------------- business code

// * -------------------------------- search action triggered by keyboard event

const searchAction$ = fromEvent($input, 'keydown').pipe(
  debounceTime(50),
  map((e) => (e.target as HTMLInputElement).value),
  startWith(''),
  distinctUntilChanged(),
  tap((e) => log('should search')),
);

// * -------------------------------- search from listDataMine

const mockSearchMine$ = (val: string) =>
  of(val).pipe(
    map<string, string[]>((val) => listDataMine.filter((term) => matchRuler(term, val))),
    delay(~~(Math.random() * 9) * 10 + 100),
  );

// * -------------------------------- search from listDataGithubUrl

const mockFetchGithub$ = from(fetch(listDataGithubUrl).then((blob) => blob.json())).pipe(
  map((data) => data.map((e) => `${e.city}, ${e.state}`)),
  tap(() => log('forging fetched data')),
  shareReplay(),
);

const mockSearchGithub$ = (val) =>
  from(mockFetchGithub$).pipe(
    map((data) => data.filter((term) => matchRuler(term, val)).slice(0, 20)),
    map((data) => data.map((term) => hightlight(term, val))),
  );

// * -------------------------------- searching

const searchResult$ = merge(
  //
  of('fetching...'),
  // searchAction$.pipe(switchMap(mockSearchMine$)),
  searchAction$.pipe(switchMap(mockSearchGithub$)),
);

// * ---------------------------------------------------------------- subscribe

searchResult$.subscribe(renderList);
