export { Snake };

class Snake {
  private _element: HTMLElement; // 蛇的容器
  private _head: HTMLElement;
  private _body: HTMLCollection; // 蛇的身体（包括蛇头）

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
  public set X(v: number) {
    this._head.style.left = v + "px";
  }

  public set Y(v: number) {
    this._head.style.top = v + "px";
  }
}
