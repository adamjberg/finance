import { v4 as uuidv4 } from "uuid";

type Identifiable = {
  id: string;
}

export class Service<Model extends Identifiable> {
  private entries: Model[] = [];
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

  public deleteById(id: string) {
    const index = this.entries.findIndex((entry) => entry.id === id);
    if (index >= 0) {
      this.entries.splice(index, 1);
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
