// https://github.com/seognil-study/learning-by-doing/tree/master/rxjs/memory-game
// https://stackblitz.com/edit/rxjslc-memory-game

// * ================================================================================

import { empty, fromEvent, interval, of, Subject } from 'rxjs';
import { concatMap, debounceTime, delay, map, take, tap, toArray } from 'rxjs/operators';

// * ---------------------------------------------------------------- data and helper

const $info = document.querySelector('#info');
const $cells = Array.from(document.querySelectorAll('.child')) as HTMLElement[];

const setInfo = (text) => ($info.innerHTML = text);

const setColor = ($cell, color) => {
  $cell.style.background = color;
};

const genQuizCell = () => ~~(Math.random() * 9);

const checkEqual = (quiz, answer) =>
  quiz.length === answer.length && quiz.every((e, i) => e === answer[i]);

// * ---------------------------------------------------------------- cell color animation

// ? why this? because it allows fast click
// * the transitionend event way doesn't, and it may cause cell always light on

const cellEffectGroup$ = $cells.map(($cell) =>
  new Subject().pipe(
    tap((color) => setColor($cell, color)),
    debounceTime(300),
    tap(() => setColor($cell, 'white')),
  ),
) as Subject<any>[];

const cellLightOn = (n) => {
  cellEffectGroup$[n].next('lightgray');
};

const cellRefreshAll = () => {
  cellEffectGroup$.forEach((e$) => e$.next('gray'));
};

// * ---------------------------------------------------------------- game progress

// * -------------------------------- round-end scene

const roundEndScene$ = (correct, level) =>
  of(correct).pipe(
    delay(500),
    tap((correct) => setInfo(correct ? `Good! Next Level: ${level + 1}` : `Game Over.`)),
    tap(cellRefreshAll),
    delay(500),
  );

// * -------------------------------- player play

const playerInput$ = (quiz, quizLen, level) =>
  fromEvent($cells, 'click').pipe(
    take(quizLen),

    map((e) => [].indexOf.call($cells, e.target)),
    tap(cellLightOn),
    toArray(),

    map((answer) => checkEqual(quiz, answer)),
    concatMap((correct) => roundEndScene$(correct, level)),
    concatMap((correct) => (correct ? roundOfLevel$(level + 1) : empty())),
  );

// * -------------------------------- perform quiz animation

const roundOfLevel$ = (level, quizLen = level) =>
  interval(1000).pipe(
    take(quizLen),

    tap((i) => setInfo(`${i + 1}/${quizLen} elements`)),
    map(genQuizCell),
    tap(cellLightOn),
    toArray(),

    delay(700),
    tap(cellRefreshAll),
    delay(300),
    tap(() => setInfo('Your Turn')),

    concatMap((quiz) => playerInput$(quiz, quizLen, level)),
  );

// * ---------------------------------------------------------------- game start

// ! I don't know how to bundle all these into one Observerale in rxjs way yet, so ...

const startGame = () => {
  const newGame = roundOfLevel$(1).subscribe();
  const effects = cellEffectGroup$.map((e) => e.subscribe());

  // return {
  //   end() {
  //     newGame.unsubscribe();
  //     effects.forEach((e) => e.unsubscribe());
  //   },
  // };
};

startGame();
