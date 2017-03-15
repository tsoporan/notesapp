/* Store
 *
 */

import { createStore } from 'redux';
import noteReducer from './reducers/notes';

// import { v4 } from 'node-uuid';

const initialState = {
  fetchedInitial: false,
  notes: [],
  //  {
  //    _id: v4(),
  //    body: "This is some sample short text :)",
  //    dateCreated: Date(),
  //  },

  //  {
  //    _id: v4(),
  //    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //    dateCreated: Date(Date.now() - 100000),
  //  },

  //  {
  //    _id: v4(),
  //    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
  //    dateCreated: Date(Date.now() - 1000000),
  //  },

  //  {
  //    _id: v4(),
  //    body: "ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, ",
  //    dateCreated: Date(Date.now() - 10000000),
  //  },

  //  {
  //    _id: v4(),
  //    body: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.",
  //    dateCreated: Date(Date.now() - 10000000),
  //  },
  //]
};

const store = createStore(
  noteReducer,
  initialState // Generally from server
);

console.log('*** initial state', store.getState());

export default store;
