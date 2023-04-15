export { Snake };

class Snake {
  private _element: HTMLElement; // 蛇的容器
  private _head: HTMLElement;
  private _body: HTMLCollection; // 蛇的身体（包括蛇头）
  isLive: boolean = true; // 蛇是否还活着

  constructor() {
    const snake = document.getElementById("snake")!;
    const snakeHead = document.querySelector("#snake > div")!;
    const body = document.getElementById("snake")!.getElementsByTagName("div");

    this._element = snake;
    this._head = snakeHead as HTMLElement;
    this._body = body;
  }

  addBody() {
    const newSnakeBody = document.createElement("div");
    this.element.appendChild(newSnakeBody);
  }

  private moveBody() {
    // 将后边的身体设置到前边身体的位置
    // 一节一节向前移
    for (let i = this.body.length - 1; i > 0; i -= 1) {
      // 获取前边身体的位置
      let prevX = (this.body[i - 1] as HTMLElement).offsetLeft;
      let prevY = (this.body[i - 1] as HTMLElement).offsetTop;

      // 将值设置到当前身体上
      (this.body[i] as HTMLElement).style.left = prevX + "px";
      (this.body[i] as HTMLElement).style.top = prevY + "px";
    }
  }

  private checkHeadAndBody() {
    // 检查蛇有没有吃到自己身体
    for (let i = 1; i < this.body.length; i += 1) {
      const curBody = this.body[i] as HTMLElement;
      if (this.X === curBody.offsetLeft && this.Y === curBody.offsetTop) {
        throw new Error("撞到自己啦!!");
      }
    }
  }

  // Getters
  get element(): HTMLElement {
    return this._element;
  }

  get head(): HTMLElement {
    return this._head;
  }

  get body(): HTMLCollection {
    return this._body;
  }

  get X() {
    // 获取蛇头水平坐标
    return this._head.offsetLeft;
  }

  get Y() {
    // 获取蛇头垂直坐标
    return this._head.offsetTop;
  }

  // Setters
  set X(v: number) {
    if (this.X === v) {
      return;
    }

    // X 的合法范围是 [0, 290] 区间
    if (v < 0 || v > 290) {
      this.isLive = false;
      throw new Error("蛇撞墙了!!");
    }

    // 更新蛇的身体和蛇头坐标
    this.moveBody();
    this._head.style.left = v + "px";
    this.checkHeadAndBody();
  }

  set Y(v: number) {
    if (this.Y === v) {
      return;
    }

    // Y 的合法范围是 [0, 290] 区间
    if (v < 0 || v > 290) {
      this.isLive = false;
      throw new Error("蛇撞墙了!!");
    }

    // 更新蛇的身体和蛇头坐标
    this.moveBody();
    this._head.style.top = v + "px";
    this.checkHeadAndBody();
  }
}
