/* Note List
 * ...
 */

import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import NotesListItem from './Item';
import fetch from 'isomorphic-fetch';
import { API_BASE_URL } from '../../config';
import { receiveNotes } from '../../actions/notes';

import '../../styles/Notes.css';

const getNotes = (notes) => {
  // Sort descending by date
  // TODO: allow this to be changeable
  const m = moment;
  return notes.sort((a, b) => {
    return m(b.dateCreated).unix() - m(a.dateCreated).unix();
  });
};

const mapStateToProps = (state) => {
  return {
    notes: getNotes(state.notes),
    fetchedInitial: state.fetchedInitial
  }
};

class NotesList extends Component {
  constructor(props) {
    super(props)

    console.log('notes list props', props);
  }

  componentDidMount() {
    // For now we will use the component mount to 
    // fetch the notes from the API
    const dispatch = this.props.dispatch;

    if (!this.props.fetchedInitial) {
      fetch(`${API_BASE_URL}/notes/`)
        .then(response => response.json())
        .then((json) => {

          // Set them in the store
          dispatch(
            receiveNotes(json)
          )
        })
        .catch((err) => {
          // For now just dump this to alert
          alert("Could not load notes from API:" + err);
        });
    }

  }

  render() {

    const hasNotes = this.props.notes.length;

    return (
      <div>
        {hasNotes ? (
            <ul className="note-list">
              {this.props.notes.map((note) => 
                <NotesListItem
                  key={note._id}
                  id={note._id}
                  body={note.body}
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
