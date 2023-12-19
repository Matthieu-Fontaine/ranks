// server.ts
import app from './app';
import { API_PORT } from './config'; // Importe seulement API_PORT depuis config.ts

const server = app.listen(API_PORT, () => {
    console.log(`Ready on http://localhost:${API_PORT}`);
});
