import app from './app';

global.blacklistedTokens = [];

app.listen(process.env.PORT || 3000);
