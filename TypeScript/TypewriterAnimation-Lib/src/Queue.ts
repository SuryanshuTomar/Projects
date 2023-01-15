interface QueueInterface<T> {
	readonly front: T;
	readonly size: number;
	print: () => void;
	empty: () => void;
	push(element: T): void;
	pop(): T | null;
}

export default class Queue<T> implements QueueInterface<T> {
	#frontIndex: number = -1;
	#backIndex: number = -1;
	#allowedSize: number = 0;
	#queue: T[];
	#_size = 0;

	constructor(allowedSize: number = 100001) {
		this.#allowedSize = allowedSize;
		this.#queue = new Array(this.#allowedSize);
		this.size = 0;
	}

	private set size(size: number) {
		this.#_size = size;
	}

	public get size(): number {
		return this.#_size;
	}

	public get front() {
		return this.#queue[this.#frontIndex];
	}

	public get isFull(): boolean {
		return this.#backIndex === this.#allowedSize - 1 ? true : false;
	}

	public get isEmpty(): boolean {
		return this.#frontIndex === -1 ? true : false;
	}

	push(element: T): void {
		if (this.isFull) {
			console.log("Queue is Full");
			return;
		}
		if (this.isEmpty) {
			++this.#frontIndex;
		}

		this.#queue[++this.#backIndex] = element;
		this.size += 1;
	}

	pop(): T | null {
		if (this.isEmpty) {
			return null;
		}

		if (this.#frontIndex === this.#backIndex) {
			this.#frontIndex = -1;
			this.#backIndex = -1;
		}
		let deletedValue = this.#queue[this.#frontIndex];
		this.#frontIndex++;
		this.size -= 1;
		return deletedValue;
	}

	empty(): void {
		if (this.isEmpty) return;

		this.#frontIndex = -1;
		this.#backIndex = -1;
	}

	print(): void {
		if (this.isEmpty) {
			console.log("Queue is Empty!!!");
			return;
		}

		let outputQueue;
		outputQueue = "[Rear] ";
		for (let i = this.#backIndex; i > this.#frontIndex; i--) {
			outputQueue += `${this.#queue[i]}`;
			outputQueue += " -> ";
		}
		outputQueue += `${this.#queue[this.#frontIndex]}`;
		outputQueue += `${" [Front]"}`;
		console.log(outputQueue);
	}
}

// const q = new Queue<string>();
// q.push("10");
// q.print();
// q.push("20");
// q.push("30");
// q.print();
// q.push("40");
// q.push("50");
// q.push("60");
// q.push("70");
// q.print();
// q.empty();
// q.print();
