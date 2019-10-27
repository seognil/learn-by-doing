// https://github.com/seognil-study/learning-by-doing/tree/master/rxjs/alphabet-game
// https://stackblitz.com/edit/rxjslc-alphabet-game

// * ================================================================================

import { fromEvent, interval, merge, Subject } from 'rxjs';
import { map, scan, share, startWith, switchMap, takeWhile, withLatestFrom } from 'rxjs/operators';

// * ------------------------------------------------ types

type CharInfo = {
  pos: number;
  char: string;
};

interface GameState {
  score: number;
  remain: CharInfo[];
  level: number;
}

// * inputkey , remain char list
type KeyRemainPair = [string, CharInfo[]];

// * ------------------------------------------------ data and helper

const gameHeight = 15;
const gameWidth = 30;

const speedOfLevel = (l) => ~~((1 / l ** 0.5) * 600);
const shouldLevelUp = (score, currLevel) => score >= currLevel * 10;

const randomTrack = () => ~~(Math.random() * gameWidth);
const randomLetter = () => String.fromCharCode(~~(Math.random() * 26) + 97);

const $container = document.querySelector('#container');

// * ------------------------------------------------ render methods

const renderGame = ({ score, level, remain }: GameState) => {
  $container.innerHTML = [
    `Score: ${score}, Level: ${level}`,
    remain.map(({ pos, char }) => '&nbsp'.repeat(pos) + char).join('<br/>'),
    '<br/>'.repeat(gameHeight - 1 - remain.length) + '-'.repeat(gameWidth),
  ].join('<br/>');
};

const renderGameOver = () => {
  $container.innerHTML += '<br/>GAME OVER!';
};

// * ------------------------------------------------ the game

const initState: GameState = { score: 0, remain: [], level: 1 };

const intervalSubject = new Subject<GameState>();

const charStream$OfLevel = ({ level, remain }: GameState) =>
  interval(speedOfLevel(level)).pipe(
    map<any, CharInfo>(() => ({ pos: randomTrack(), char: randomLetter() })),
    scan((a, e) => [e, ...a], remain),
  );

const charStreamTotal$ = intervalSubject.pipe(
  startWith(initState),
  switchMap(charStream$OfLevel),
  share(),
);

const keys$ = fromEvent(document, 'keydown').pipe(map((e: KeyboardEvent) => e.key));

const game$ = merge(
  charStreamTotal$.pipe(map<CharInfo[], KeyRemainPair>((e) => [null, e])),
  keys$.pipe(withLatestFrom(charStreamTotal$)),
).pipe(
  scan<KeyRemainPair, GameState>(({ score, level }, [key, remain]) => {
    // * hit the letter
    if (remain.length > 0 && remain[remain.length - 1].char === key) {
      score += 1;
      remain.pop();
    }

    // * level up
    if (shouldLevelUp(score, level)) {
      level += 1;
      intervalSubject.next({ score, level, remain });
    }

    return { score, level, remain };
  }, initState),
  takeWhile(({ remain }) => remain.length < gameHeight),
);

// * ------------------------------------------------ start

game$.subscribe(renderGame, null, renderGameOver);
