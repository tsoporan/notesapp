/* Note Item
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { removeNote } from '../../actions/notes';
import '../../styles/Notes.css';

class NotesListItem extends Component {
  constructor(props) {
    super(props);

    console.log('props', props);

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(e) {
      console.log('handle remove', this.props.id);
      e.preventDefault();

      this.props.dispatch(
        removeNote(
          this.props.id
        )
      )
  }

  render() {
    return (
      <li className="note-item">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Posted { moment(this.props.dateCreated).fromNow() }</p>
          </header>

          <div className="card-content">
            <div className="content">
                {this.props.text.length > 140 ? this.props.text.substring(0, 140) + ' ...' : this.props.text  }
            </div>
          </div>

          <footer className="card-footer">
            <Link to={`notes/${this.props.id}`} className="card-footer-item">Edit</Link>
            <a onClick={this.handleRemove} className="card-footer-item">Delete</a>
          </footer>
        </div>
      </li>
    )
  }
}

NotesListItem.propTypes = {
  text: React.PropTypes.string,
  dateCreated: React.PropTypes.number
};

NotesListItem = connect()(NotesListItem);

export default NotesListItem;
