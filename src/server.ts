import { Config } from './config';
import app from './app';
import logger from './config/logger';

function startServer() {
    const port = Config.PORT;
    try {
        app.listen(port, () => {
            logger.error('dsjdjsjd');
            logger.info(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

startServer();
