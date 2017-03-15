/* New Note
 *
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNote } from  '../../actions/notes';
import { API_BASE_URL } from '../../config';
import fetch from 'isomorphic-fetch';
import '../../styles/Notes.css';

class NotesNew extends Component {

  constructor(props) {
    super(props);

    console.log('props', props);

    // Keep track of local text changes
    this.state = {body: '', error: '', posted: false};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ body: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    // Store on server 
    if (!this.state.body) {
      this.setState({ error: 'Nothing to submit!' });
      return;
    } else {

      const dispatch = this.props.dispatch;

      const headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })

      fetch(`${API_BASE_URL}/notes/create/`, {
        method: 'POST',
        headers: headers,
        body: "text="+encodeURIComponent(this.state.body)
      })
        .then(response => response.json())
        .then((json) => {

          dispatch(
            addNote(
              json._id,
              json.body,
              json.dateCreated
            )
          )

          this.setState({ body: '', error: '', posted: true });
        });
    }

  }

  render() {
    return (
      <div className="note-area">

        <section className="section">
          <h3 className="title is-3">Create Note</h3>
          <hr />

          <form onSubmit={this.handleSubmit}>
            <p className="control">
              <textarea className="textarea" value={this.state.body} onChange={this.handleChange} />
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
