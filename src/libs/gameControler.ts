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

  constructor() {
    this._food = new Food();
    this._snake = new Snake();
    this._scorePanel = new ScorePanel(10, 2);
    this._direction = Direction.RIGHT;

    this.gameInit();
  }

  gameInit() {
    // 绑定键盘事件，注意 JS 特性要额外绑定 this 指针
    // 否则 keydownHandler 里的 this 语义指代的是 document 对象
    document.addEventListener("keydown", this.keydownHandler.bind(this));

    this.run();
  }

  private keydownHandler(e: KeyboardEvent) {
    const d = this.toDirection(e.key);
    if (d !== Direction.NONE) {
      if (
        // 禁止掉头
        this.snake.body.length > 1 &&
        ((d === Direction.LEFT && this.direction === Direction.RIGHT) ||
          (d === Direction.RIGHT && this.direction === Direction.LEFT) ||
          (d === Direction.UP && this.direction === Direction.DOWN) ||
          (d === Direction.DOWN && this.direction === Direction.UP))
      ) {
        return;
      }
      this.direction = d;
    }
  }

  private run() {
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

    // 检查蛇是否吃到食物
    this.eatFood(x, y);

    // 移动蛇头位置并检查蛇是否撞墙
    try {
      this.snake.X = x;
      this.snake.Y = y;
    } catch (error) {
      this.snake.isLive = false;
      alert((error as Error).message);
    }

    this.snake.isLive &&
      setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
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

  private eatFood(x: number, y: number) {
    if (x === this.food.X && y === this.food.Y) {
      console.log("吃到食物啦！！");
      this.scorePanel.addScore();
      this.snake.addBody();
      this.food.changePosition();
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
