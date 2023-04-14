export { Food };

class Food {
  private _element: HTMLElement;

  constructor() {
    const food = document.getElementById("food");
    if (food !== null) {
      this._element = food;
    } else {
      this._element = new HTMLElement();
    }
  }

  getFoodElement(): HTMLElement | null {
    return this._element;
  }

  // 获取食物的横坐标
  get X() {
    return this._element.offsetLeft;
  }

  // 获取食物的纵坐标
  get Y() {
    return this._element.offsetTop;
  }

  // 食物被吃掉后修改坐标
  changePosition() {
    // 坐标必须是整数
    // 坐标范围是 [0, 290]
    // 坐标必须是 10 的倍数
    this._element.style.left = `${Math.round(Math.random() * 29) * 10}px`;
    this._element.style.top = `${Math.round(Math.random() * 29) * 10}px`;
  }
}
