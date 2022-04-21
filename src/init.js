// import './db';
import app from './server';

// Port
const LOCAL_PORT = 4000;
const PORT = process.env.PORT || LOCAL_PORT;

app.listen(PORT, () => {
  if (PORT === LOCAL_PORT) {
    console.log(`Server listening on port http://localhost:${PORT}`);
  }
});
