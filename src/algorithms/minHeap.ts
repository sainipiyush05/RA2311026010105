/**
 * Min Heap implementation for Priority Queue
 */
export class MinHeap<T> {
  private heap: T[] = [];
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  public size(): number {
    return this.heap.length;
  }

  public peek(): T | undefined {
    return this.heap[0];
  }

  public push(val: T): void {
    this.heap.push(val);
    this.heapifyUp(this.heap.length - 1);
  }

  public pop(): T | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop() as T;
    this.heapifyDown(0);
    return root;
  }

  private heapifyUp(index: number): void {
    let currentIndex = index;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.comparator(this.heap[currentIndex], this.heap[parentIndex]) < 0) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  private heapifyDown(index: number): void {
    let currentIndex = index;
    const length = this.heap.length;

    while (true) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;
      let smallestIndex = currentIndex;

      if (leftChildIndex < length && this.comparator(this.heap[leftChildIndex], this.heap[smallestIndex]) < 0) {
        smallestIndex = leftChildIndex;
      }

      if (rightChildIndex < length && this.comparator(this.heap[rightChildIndex], this.heap[smallestIndex]) < 0) {
        smallestIndex = rightChildIndex;
      }

      if (smallestIndex !== currentIndex) {
        this.swap(currentIndex, smallestIndex);
        currentIndex = smallestIndex;
      } else {
        break;
      }
    }
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  public getArray(): T[] {
    return [...this.heap];
  }
}
