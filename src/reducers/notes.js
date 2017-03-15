/* Note Reducers
 *
 */

function noteApp(state = [] , action) {

  switch (action.type) {
    case 'ADD_NOTE':
      // Adds a new note

      return Object.assign({}, state, { // We do not mutate state but use a copy instead
        notes : [
          ...state.notes,
          // Newest note appended
          {
            id: action.id,
            text: action.text,
            dateCreated: action.dateCreated
          }
        ]
      });

    case 'REMOVE_NOTE':
      // Removes a specific note

      if (!action.id) {
        return undefined;
      }

      // Filter only the ones we want
      const filtered = state.notes.filter((note) => {
        return note.id !== action.id;
      });

      return Object.assign({}, state, {
        notes: filtered
      });

    case 'UPDATE_NOTE':
      // Updates a specific note, that is, its text

      if (!(action.id && action.text)) {
        return undefined;
      }

      const foundNote = state.notes.find((note) => {
        return note.id === action.id;
      });

      if (!foundNote) { return undefined; }

      // Update with new text
      foundNote.text = action.text;

      const excluded = state.notes.filter((note) => {
          return note.id !== action.id;
      });

      // Return a new notes array which is the old notes + the 
      // updated note appended.
      return Object.assign({}, state, {
        notes: [
          ...excluded,
          {
            id: foundNote.id,
            text: foundNote.text,
            dateCreated: foundNote.dateCreated
          }
        ]
      });

    default:
      return state;
  }

}

export default noteApp;
