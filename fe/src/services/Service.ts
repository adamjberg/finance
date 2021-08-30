import { v4 as uuidv4 } from "uuid";
import { Account } from "../Account";

type Identifiable = {
  id: string;
}

export class Service<Model extends Identifiable> {
  protected entries: Model[] = [];
  private key: string = "";

  constructor({
    key
  }: {
    key: string;
  }) {
    this.key = key;
    this.load();
  }

  public async create(entry: Partial<Model>) {
    const newEntry = {
      ...entry,
      id: this.getId(),
    } as Model;

    this.entries.push(newEntry);

    this.save();

    return newEntry;
  }

  public getAll() {
    return this.entries;
  }

  public getById(id: string): Model | null {
    for (const entry of this.entries) {
      if (entry.id === id) {
        return entry;
      }
    }
    return null;
  }

  public updateById(id: string, update: Partial<Account>) {
    const entry = this.getById(id);

    Object.assign(entry, update);

    this.save();

    return entry;
  }

  public deleteById(id: string) {
    const index = this.entries.findIndex((entry) => entry.id === id);
    if (index >= 0) {
      this.entries.splice(index, 1);
    }
    this.save();
  }

  public setEntries(entries: Model[]) {
    if (entries) {
      this.entries = entries;
    } else {
      this.entries = [];
    }
    this.save();
  }

  private getId() {
    return uuidv4();
  }

  private save() {
    localStorage.setItem(this.key, JSON.stringify(this.entries));
  }

  private load() {
    const entries = localStorage.getItem(this.key);
    if (entries) {
      this.entries = JSON.parse(entries);
    }
  }
}
