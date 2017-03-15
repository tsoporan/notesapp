/* Note List
 * ...
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import NotesListItem from './Item';

import '../../styles/Notes.css';

const getNotes = (notes) => {
  // Sort descending by date
  return notes.sort((a, b) => {
    return b.dateCreated - a.dateCreated;
  });
};

const mapStateToProps = (state) => {
  return {
    notes: getNotes(state.notes)
  }
};

class NotesList extends Component {
  constructor(props) {
    super(props)

    console.log('props', props);
  }

  render() {

    const hasNotes = this.props.notes.length;

    return (
      <div>
        {hasNotes ? (
            <ul className="note-list">
              {this.props.notes.map((note) => 
                <NotesListItem
                  key={note.id}
                  id={note.id}
                  text={note.text}
                  dateCreated={note.dateCreated} 
                />
              )}
            </ul>
        ) : (
          <div className="container has-text-centered">
            <p style={{ margin: "1rem" }}>
              <strong>Looks like there are no notes. You should create some!</strong>
            </p>
          </div>
        )}
      </div>
    );
  }
}

NotesList = connect(mapStateToProps)(NotesList);

export default NotesList;
