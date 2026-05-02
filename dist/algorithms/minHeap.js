"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinHeap = void 0;
/**
 * Min Heap implementation for Priority Queue
 */
class MinHeap {
    constructor(comparator) {
        this.heap = [];
        this.comparator = comparator;
    }
    size() {
        return this.heap.length;
    }
    peek() {
        return this.heap[0];
    }
    push(val) {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }
    pop() {
        if (this.heap.length === 0)
            return undefined;
        if (this.heap.length === 1)
            return this.heap.pop();
        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return root;
    }
    heapifyUp(index) {
        let currentIndex = index;
        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            if (this.comparator(this.heap[currentIndex], this.heap[parentIndex]) < 0) {
                this.swap(currentIndex, parentIndex);
                currentIndex = parentIndex;
            }
            else {
                break;
            }
        }
    }
    heapifyDown(index) {
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
            }
            else {
                break;
            }
        }
    }
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    getArray() {
        return [...this.heap];
    }
}
exports.MinHeap = MinHeap;
