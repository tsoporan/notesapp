/* New Note
 *
 */

import React, { Component } from 'react';

import { v4 } from 'node-uuid';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { addNote } from  '../../actions/notes';
import '../../styles/Notes.css';

class NotesNew extends Component {

  constructor(props) {
    super(props);

    console.log('props', props);

    // Keep track of local text changes
    this.state = {text: '', error: '', posted: false};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    // Store on server 
    if (!this.state.text) {
      this.setState({ error: 'Nothing to submit!' });
      return;
    } else {

      this.props.dispatch(
        addNote(
          v4(),
          this.state.text,
          Date.now(),
        )
      );

      this.setState({ text: '', error: '', posted: true });
    }

    console.log('adding note with:', this.state.text);
  }

  render() {
    return (
      <div className="note-area">

        <section className="section">
          <h3 className="title is-3">Create Note</h3>
          <hr />

          <form onSubmit={this.handleSubmit}>
            <p className="control">
              <textarea className="textarea" value={this.state.text} onChange={this.handleChange} />
              { this.state.error && <strong>{this.state.error}</strong> }
            </p>

            <div className="control is-grouped">
              <p className="control">
                <input className="button is-primary" type="submit" value="Save" />
              </p>
            </div>
          </form>

          { this.state.posted && <Redirect to='/' /> }
        </section>

      </div>
    );
  }
}

NotesNew = connect()(NotesNew);

export default NotesNew;
