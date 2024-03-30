import { makeAutoObservable } from "mobx";
class TasksStore {
    tasks = [];

    constructor() {
        makeAutoObservable(this);
    }

    addTask(item) {
        this.tasks.push({ ...item });
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    setTags(id, tags) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.tags = tags;
        }
    }

    setLevel(id, level) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.level = level;
        }
    }

    setDescription(id, description) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.description = description;
        }
    }

    setExampleData(id, exampleData) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.exampleData = exampleData;
        }
    }

    setName(id, name) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.name = name;
        }
    }
}

export default new TasksStore();