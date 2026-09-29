import express from 'express';
import { isEmail } from 'validator';
import { WindmillLibrary } from './models/WindmillLibrary';

export const app = express();
const library = new WindmillLibrary();
let nextUserId = 1;

app.use(express.json());

app.post('/user/addUser', (req, res) => {
  if (typeof req.body !== 'object' || req.body === null || Array.isArray(req.body)) {
    res.status(400).json({ error: 'A name and valid email are required.' });
    return;
  }

  const { name, email } = req.body as Record<string, unknown>;

  if (typeof name !== 'string' || !name.trim()) {
    res.status(400).json({ error: 'A name is required.' });
    return;
  }

  if (typeof email !== 'string' || !isEmail(email.trim())) {
    res.status(400).json({ error: 'A valid email is required.' });
    return;
  }

  const user = library.registerUser({
    userId: nextUserId++,
    name: name.trim(),
    email: email.trim(),
  });

  res.status(201).json(user);
});
