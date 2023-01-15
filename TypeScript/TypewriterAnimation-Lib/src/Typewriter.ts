import Queue from "./Queue";

type OptionsType = {
	loop?: boolean;
	typingSpeed?: number;
	deletingSpeed?: number;
};

type TaskQueue = () => Promise<void>;

export default class Typewriter {
	// queue for storing actions/events like typeString, deleteChars, deleteAll, pauseFor
	// before calling the start method which will then execute all the tasks in the queue
	// for us
	// #queue = new Array<TaskQueue>(); // using arrays
	#queue = new Queue<TaskQueue>(); // using custom queue

	constructor(
		private _element: HTMLElement,
		private _options: OptionsType = {
			loop: false,
			typingSpeed: 50,
			deletingSpeed: 50,
		}
	) {}

	private set element(elem: HTMLElement) {
		this._element = elem;
	}

	private get element(): HTMLElement {
		return this._element;
	}

	private set options(options: OptionsType) {
		this.options = options;
	}

	private get options(): OptionsType {
		return this._options;
	}

	// typeString(stringValue) => This will type the text content on the
	//  page for single string value
	typeString(string: string) {
		// add string to the task queue which will return a promise
		// and the promise will render the typeSting to the page after its
		// gets resolved
		this.#addToQueue((resolve) => {
			// render typeString to the page
			let i = 0;
			const typeInterval = setInterval(() => {
				this.element.append(string[i]);
				i++;
				if (i >= string.length) {
					clearInterval(typeInterval);
					resolve();
				}
			}, this.options.typingSpeed);
		});
		return this;
	}

	// typeString(string array) => This will type the text content
	// on the page for array of string values
	typeStringArr(
		array: Array<string>,
		typeSpeed = this.options.typingSpeed,
		deleteSpeed = this.options.deletingSpeed,
		pauseTime = 1000
	) {
		// add string to the task queue which will return a promise
		// and the promise will render the typeSting to the page after its
		// gets resolved
		for (let stringItem of array) {
			this.#addToQueue((resolve) => {
				// render typeString to the page
				let i = 0;
				const typeInterval = setInterval(() => {
					this.element.append(stringItem[i]);
					i++;
					if (i >= stringItem.length) {
						clearInterval(typeInterval);
						resolve();
					}
				}, typeSpeed);
			});
			this.pauseFor(pauseTime);
			this.deleteAll(deleteSpeed);
		}
		return this;
	}

	// delete the passed number of character from the typeString
	deleteChars(number: number) {
		// remove the "number" of chars from the typeString animation
		this.#addToQueue((resolve) => {
			// render updated typeString to the page
			let i = 0;
			const deleteInterval = setInterval(() => {
				if (this.element.textContent) {
					this.element.textContent = this.element.innerText.slice(
						0,
						this.element.innerText.length - 1
					);
				}
				i++;
				if (i >= number) {
					clearInterval(deleteInterval);
					resolve();
				}
			}, this.options.deletingSpeed);
		});
		return this;
	}

	// delete all the typeString will deleteSpeed
	deleteAll(deleteSpeed = this.options.deletingSpeed) {
		// remove all chars from the typeString animation
		this.#addToQueue((resolve) => {
			// render updated typeString to the page
			let i = 0;
			const deleteInterval = setInterval(() => {
				if (this.element.textContent) {
					this.element.textContent = this.element.innerText.slice(
						0,
						this.element.innerText.length - 1
					);
				}
				i++;
				if (!this.element.textContent) {
					clearInterval(deleteInterval);
					resolve();
				}
			}, deleteSpeed);
		});
		return this;
	}

	// pause interval between typing and deleting of elements
	pauseFor(duration: number) {
		// this will pause the animation for the duration passed into this method
		this.#addToQueue((resolve) => setTimeout(resolve, duration));
		return this;
	}

	// start typing animation
	async start() {
		let taskCb = this.#queue.pop();
		while (taskCb) {
			await taskCb();

			// if loop is true then add the taskCb back to the queue
			if (this.options.loop) this.#queue.push(taskCb);
			taskCb = this.#queue.pop();
		}
		return this;
	}

	// this method will take a taskCallBack function for the new Promise
	// this taskCallBack takes a resolve callback which will execute
	// after the promise is completed.
	#addToQueue(taskCallBack: (resolve: () => void) => void) {
		this.#queue.push(() => new Promise(taskCallBack));
	}
}
