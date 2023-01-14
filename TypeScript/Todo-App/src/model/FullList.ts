import ListItem from "./ListItem";

interface List {
	list: ListItem[];
	load(): void;
	save(): void;
	clearList(): void;
	addItem(itemObj: ListItem): void;
	removeItem(id: string): void;
}

type ParsedListItemType = {
	_id: string;
	_item: string;
	_checked: boolean;
};

// Applying Singleton pattern: Meaning there will be only one instance of this class
// and that's why we are making this class constructor as private and initializing its
// instance in the class itself.
export default class FullList implements List {
	static instance: FullList = new FullList();

	private constructor(private _list: ListItem[] = []) {}

	get list(): ListItem[] {
		return this._list;
	}

	load(): void {
		const storeList: string | null = localStorage.getItem("myList");
		// check if the storeList is not empty
		if (!storeList) return;

		// parse the list from storeList
		const parsedList: ParsedListItemType[] = JSON.parse(storeList);

		// create a FullList from parsedList
		parsedList.forEach((itemObj) => {
			const newListItem = new ListItem(
				itemObj._id,
				itemObj._item,
				itemObj._checked
			);

			FullList.instance.addItem(newListItem);
		});
	}

	save(): void {
		localStorage.setItem("myList", JSON.stringify(this._list));
	}

	clearList(): void {
		this._list = [];
		this.save();
	}

	addItem(itemObj: ListItem): void {
		this._list.push(itemObj);
		this.save();
	}

	removeItem(id: string): void {
		this._list = this._list.filter((listItem) => listItem.id !== id);
		this.save();
	}
}
