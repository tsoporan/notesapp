/* Note Detail
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeNote, updateNote } from '../../actions/notes';
import { Redirect } from 'react-router-dom';

import '../../styles/Notes.css';


const getNote = (notes, id) => {
  // Returns a specific note
  return notes.find((note) => {
    return note.id === id;
  });

};

const mapStateToProps = (state, ownProps) => {

  // Comes from router provided props
  const noteId = ownProps.match.params.id;

  return {
    note: getNote(state.notes, noteId)
  }
};

class NotesDetail extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      posted: false,
      error: '',
      text: props.note.text,
      newText: '',
    }
  }


  handleSubmit(e) {
    e.preventDefault();

    // TODO: store updated note in store update note in store
    // Update to server first

    console.log('state', this.state);

    if (!this.state.newText.length) {
      this.setState({ error: 'No text to update' });
      return;
    }

    // Only if text differs do we save
    if (this.state.newText === this.state.text) {
      this.setState({ error: 'Text hasn\'t changed!' })
      return;
    }

    // Trigger update in store
    this.props.dispatch(
      updateNote(
        this.props.match.params.id,
        this.state.newText,
      )
    )

    // Redirect when we're done
    this.setState({ posted: true, error: '' });

  }

  handleChange(e) {
    // Capture new text
    this.setState({ newText: e.target.value });
  }

  handleRemove(e) {
    e.preventDefault();

    // Triger removing from store
    this.props.dispatch(
      removeNote(
        this.props.match.params.id
      )
    )

    // Redirect when we're done
    this.setState({ posted: true })

  }

  render() {
    return (
      <div className="note-area">

        <section className="section">

          <h3 className="title is-3">Edit Note</h3>
          <hr />

          <form onSubmit={this.handleSubmit}>
              <p className="control">
                <textarea className="textarea" onChange={this.handleChange} defaultValue={this.state.text} />
                { this.state.error && this.state.error }
              </p>

              <div className="control is-grouped">
                <p className="control">
                  <button onClick={this.handleRemove} className="button">Delete</button>
                </p>
                <p className="control">
                  <input className="button is-primary" type="submit" value="Update" />
                </p>
              </div>
          </form>

        </section>

        { this.state.posted && <Redirect to="/" /> }
      </div>
    );
  }
}

NotesDetail = connect(mapStateToProps)(NotesDetail);

export default NotesDetail;
