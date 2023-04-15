export { GameControler };

import { Snake } from "./snake";
import { Food } from "./food";
import { ScorePanel } from "./scorePanel";

enum Direction {
  NONE,
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

class GameControler {
  private _snake: Snake;
  private _food: Food;
  private _scorePanel: ScorePanel;
  private _direction: Direction; // 存储用户的按键
  isLive: boolean = true; // 蛇是否还活着

  constructor() {
    this._food = new Food();
    this._snake = new Snake();
    this._scorePanel = new ScorePanel();
    this._direction = Direction.RIGHT;

    this.gameInit();
  }

  gameInit() {
    // 绑定键盘事件，注意 JS 特性要额外绑定 this 指针
    // 否则 keydownHandler 里的 this 语义指代的是 document 对象
    document.addEventListener("keydown", this.keydownHandler.bind(this));

    this.move();
  }

  private keydownHandler(e: KeyboardEvent) {
    const d = this.toDirection(e.key);
    if (d !== Direction.NONE) {
      this.direction = d;
      console.log(e.key);
    }
  }

  private move() {
    // 根据方向来改变蛇的位置
    let x = this.snake.X;
    let y = this.snake.Y;

    switch (this.direction) {
      case Direction.DOWN:
        y += 10;
        break;
      case Direction.UP:
        y -= 10;
        break;
      case Direction.LEFT:
        x -= 10;
        break;
      case Direction.RIGHT:
        x += 10;
        break;

      default:
        break;
    }

    this.snake.X = x;
    this.snake.Y = y;

    //this.isLive && setTimeout(this.move.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

  private toDirection(v: string): Direction {
    switch (v) {
      case "w":
      case "ArrowUp":
        return Direction.UP;

      case "s":
      case "ArrowDown":
        return Direction.DOWN;

      case "a":
      case "ArrowLeft":
        return Direction.LEFT;

      case "d":
      case "ArrowRight":
        return Direction.RIGHT;

      default:
        console.log("invalid key!");
        return Direction.NONE;
    }
  }

  // Getters
  get snake(): Snake {
    return this._snake;
  }

  get food(): Food {
    return this._food;
  }

  get scorePanel(): ScorePanel {
    return this._scorePanel;
  }

  get direction(): Direction {
    return this._direction;
  }

  // Setters
  set direction(v: Direction) {
    this._direction = v;
  }
}
