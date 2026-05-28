const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({
        message: 'Backend API Running',
        users: [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Doe' }
        ]
    });
});

app.listen(3000, () => {
    console.log('Backend running on port 3000');
});
