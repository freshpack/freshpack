// @flow
import { observable } from 'mobx';

export class Counter {
  @observable value = 0;

  increase() {
    this.value += 1;
  }

  decrease() {
    this.value -= 1;
  }

  double() {
    this.value = this.value * 2;
  }
}
