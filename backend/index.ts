import { server } from './server'; // no need for .js extension in TS
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT ? Number(process.env.PORT) : 5000;

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
