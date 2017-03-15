/* Note Actions
 *
 */

// Action types
export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';

// Action creators
export function addNote(id, text, dateCreated) {
  return { 
    type: ADD_NOTE,
    id,
    text,
    dateCreated
  }
}

export function removeNote(id) {
  return {
    type: REMOVE_NOTE,
    id
  }
}

export function updateNote(id, text) {
  return { 
    type: UPDATE_NOTE,
    id,
    text
  }
}

