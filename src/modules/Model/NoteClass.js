export default class NoteClass {
  constructor(name, discription = '') {
    this.creationTime = new Date();
    this.children = [];
    this.state = 'todo';
    this.priority = undefined;
    this.id = uuidv4();
    this.name = name;
    this.discription = discription;
    this.deadline = null;
    this.cost = undefined;
  }
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}