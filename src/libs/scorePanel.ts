export { ScorePanel };

class ScorePanel {
  private _score: number;
  private _level: number;
  private _scoreEle: HTMLElement;
  private _levelEle: HTMLElement;
  private _maxLevel: number; // 限制等级
  private _upScore: number; // 每多少分升一级

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this._score = 0;
    this._level = 1;
    this._maxLevel = maxLevel;
    this._upScore = upScore;

    const score = document.getElementById("score");
    const level = document.getElementById("level");
    if (score !== null && level !== null) {
      this._levelEle = level;
      this._scoreEle = score;
    } else {
      this._levelEle = new HTMLElement();
      this._scoreEle = new HTMLElement();
    }
  }

  addScore() {
    this.score += 1;
    this.scoreEle.textContent = `${this.score}`;

    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }

  levelUp() {
    // 每升一级，蛇的速度会加快
    if (this.level < this.maxLevel) {
      this.level += 1;
      this.levelEle.textContent = `${this.level}`;
    }
  }

  /// Getters
  get score(): number {
    return this._score;
  }

  get scoreEle(): HTMLElement {
    return this._scoreEle;
  }

  get level(): number {
    return this._level;
  }

  get levelEle(): HTMLElement {
    return this._levelEle;
  }

  get maxLevel(): number {
    return this._maxLevel;
  }

  get upScore(): number {
    return this._upScore;
  }

  // Setters
  set score(v: number) {
    this._score = v;
  }
  set level(v: number) {
    this._level = v;
  }
}
