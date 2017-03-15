// Defines API routes and links to controller
import express from 'express';
import notesCtrl from './controllers/notes';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.send(`
    Welcome to the Notes API, nothing to see here specifically.

    Please use the API methods:
      /api/notes - GET : Retrieve a list of latest notes, optionally pass limit and order GET params
      /api/notes/create - POST: Create a note
      /api/notes/<id> - GET: Retrieve a note
      /api/notes/<id> - PUT: Update a note
      /api/notes/<id> - DELETE: Removes a note
  `);
});

apiRouter.get('/notes', notesCtrl.list);
apiRouter.post('/notes/create', notesCtrl.create);
apiRouter.get('/notes/:id', notesCtrl.read);
apiRouter.put('/notes/:id', notesCtrl.update);
apiRouter.delete('/notes/:id', notesCtrl.remove);

export default apiRouter;
