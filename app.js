import express from 'express';
import { createReservation, getReservation } from './database.js';

const app = express();
app.use(express.json());

app.post('/reserve', (req, res) => {
    createReservation(req.body, (error, result) => {
        if (error) {
            return res.status(500).json({ message: error });
        }
        res.status(201).json({
            message: 'Reservation successful',
            data: result,
        });
    });
});

app.get('/reservation/:id', (req, res) => {
    getReservation(req.params.id)
        .then((result) =>
            res.status(200).json({ message: 'Reservation found', data: result })
        )
        .catch((error) => res.status(500).json({ message: error }));
});

app.get('/reservation/:id', async (req, res) => {
    try {
        const result = await getReservation(req.params.id);
        res.status(200).json({ message: 'Reservation found', data: result });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

app.use((error, req, res, next) => {
    console.error('Error:', error.message || error);
    if (error.message.includes('Database')) {
        res.status(500).json({
            message: 'There was an issue with the database!',
        });
    } else {
        res.status(500).json({
            message: 'Something went wrong on the server!',
        });
    }
});

app.get('/broken-route', (req, res, next) => {
    const error = new Error('This route is broken on purpose!');
    next(error);
});

app.listen(3000, () => console.log('Server running on port 3000'));
