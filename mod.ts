type CircularListElem<TValue> = {
  value: TValue;
  next: CircularListElem<TValue> | null;
  prev: CircularListElem<TValue> | null;
};

export class CircularList<TValue> {
  private head: CircularListElem<TValue> | null = null;

  private _size = 0;
  get size(): number {
    return this._size;
  }
  private set size(value: number) {
    this._size = value;
  }

  constructor(values: readonly TValue[] = []) {
    for (const value of values) {
      this.pushEnd(value);
    }
  }

  pushStart(value: TValue): void {
    this.insertBeforeHead({ value, next: null, prev: null });
    this.head = this.head!.prev;
  }

  pushEnd(value: TValue): void {
    this.insertBeforeHead({ value, next: null, prev: null });
  }

  getNext(): TValue | undefined {
    const ret = this.head;

    if (this.head) {
      this.head = this.head.next;
    }

    return ret?.value;
  }

  popNext(): TValue | undefined {
    const ret = this.head;

    if (this.head) {
      this.remove(this.head);
    }

    return ret?.value;
  }

  /** filter elements inplace */
  filter(fn: (value: TValue) => boolean): void {
    const initialHead = this.head;

    // set head to null or closest 'elem' such as fn(elem.value) == true
    while (this.head && !fn(this.head.value)) {
      this.head = this.head.next;
      if (this.head == initialHead) {
        this.head = null;
        break;
      }
    }

    if (this.head) {
      for (
        let iter = this.head.next;
        iter && iter != this.head;
        iter = iter.next
      ) {
        if (!fn(iter.value)) {
          const elem = iter;
          iter = iter.next!;
          this.remove(elem);
        }
      }
    }
  }

  private remove(elem: CircularListElem<TValue>) {
    const next = elem.next!;
    const prev = elem.prev!;

    if (this.head == elem) {
      if (this.head.next == this.head) {
        this.head = null;
      } else {
        this.head = this.head.next;
      }
    }

    next.prev = prev;
    prev.next = next;
    elem.next = null;
    elem.prev = null;

    this.size--;
  }

  private insertBeforeHead(elem: CircularListElem<TValue>) {
    if (this.head == null) {
      elem.prev = elem;
      elem.next = elem;
      this.head = elem;
    } else {
      elem.next = this.head;
      elem.prev = this.head.prev;
      this.head.prev!.next = elem;
      this.head.prev = elem;
    }
    this.size++;
  }

  forEach(fn: (value: TValue, index: number) => void) {
    let cursor = this.head;
    for (let i = 0; i < this.size; i++) {
      if (cursor) {
        fn(cursor.value, i);
        cursor = cursor.next;
      }
    }
  }
}
