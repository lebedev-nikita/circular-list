import { assertEquals } from "@std/assert";
import { CircularList } from "./mod.ts";

Deno.test("pushStart", () => {
  const list = new CircularList<number>();

  list.pushStart(1);
  list.pushStart(2);
  list.pushStart(3);
  list.pushStart(4);
  list.pushStart(5);

  assertEquals(list.getNext(), 5);
  assertEquals(list.getNext(), 4);
  assertEquals(list.getNext(), 3);
  assertEquals(list.getNext(), 2);
  assertEquals(list.getNext(), 1);

  assertEquals(list.getNext(), 5);
  assertEquals(list.getNext(), 4);
  assertEquals(list.getNext(), 3);
  assertEquals(list.getNext(), 2);
  assertEquals(list.getNext(), 1);
});

Deno.test("pushStart + getNext", () => {
  const list = new CircularList<number>();

  list.pushStart(1);
  list.pushStart(2);
  list.getNext();
  list.pushStart(3);
  list.pushStart(4);
  list.pushStart(5);

  assertEquals(list.getNext(), 5);
  assertEquals(list.getNext(), 4);
  assertEquals(list.getNext(), 3);
  assertEquals(list.getNext(), 1);
  assertEquals(list.getNext(), 2);

  assertEquals(list.getNext(), 5);
  assertEquals(list.getNext(), 4);
  assertEquals(list.getNext(), 3);
  assertEquals(list.getNext(), 1);
  assertEquals(list.getNext(), 2);
});

Deno.test("pushEnd", () => {
  const list = new CircularList<number>();

  list.pushEnd(1);
  list.pushEnd(2);
  list.pushEnd(3);
  list.pushEnd(4);
  list.pushEnd(5);

  assertEquals(list.getNext(), 1);
  assertEquals(list.getNext(), 2);
  assertEquals(list.getNext(), 3);
  assertEquals(list.getNext(), 4);
  assertEquals(list.getNext(), 5);

  assertEquals(list.getNext(), 1);
  assertEquals(list.getNext(), 2);
  assertEquals(list.getNext(), 3);
  assertEquals(list.getNext(), 4);
  assertEquals(list.getNext(), 5);
});

Deno.test("filter", () => {
  const list = new CircularList([1, 2, 3, 4, 5]);

  list.filter((val) => val > 3);

  assertEquals(list.getNext(), 4);
  assertEquals(list.getNext(), 5);

  assertEquals(list.getNext(), 4);
  assertEquals(list.getNext(), 5);

  assertEquals(list.size, 2);
});

Deno.test("popNext", () => {
  const list = new CircularList<number>();

  list.pushEnd(1);
  list.pushEnd(2);
  assertEquals(list.popNext(), 1);

  list.pushEnd(3);
  list.pushEnd(4);
  list.pushEnd(5);

  assertEquals(list.getNext(), 2);
  assertEquals(list.getNext(), 3);
  assertEquals(list.popNext(), 4);
  assertEquals(list.getNext(), 5);

  assertEquals(list.getNext(), 2);
  assertEquals(list.getNext(), 3);
  assertEquals(list.getNext(), 5);
});

Deno.test("forEach", () => {
  const items = [1, 2, 3, 4, 5];
  const list = new CircularList(items);

  let count = 0;

  list.forEach((value, index) => {
    count++;
    assertEquals(value, items[index]);
  });

  assertEquals(count, items.length);
});
