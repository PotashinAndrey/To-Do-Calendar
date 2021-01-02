// const notes = {
//   deadline: false,
//   cost: false
// }

// const doings = {
//   cost: false,
//   deadline: true
// }

// const purchases = {
//   deadline: false,
//   cost: true
// }

const notes = {
  deadline: false,
  cost: false
}

const doings = {
  deadline: true
}

const purchases = {
  cost: true
}

function filtration(notes, filter) {
  let filtred = notes.slice();

  for (let key in filter) {
    filtred = filtred.filter(e => {
      // console.log(key, e[key], filter[key], !e[key] === !filter[key]);

      return !e[key] === !filter[key];
    });
  }

  // console.log(filtred);
  return filtred;
}

const filters = {
  filtration,
  notes,
  doings,
  purchases
}

export default filters;