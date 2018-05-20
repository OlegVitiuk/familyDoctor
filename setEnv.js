const env = process.env.NODE_ENV;
if (env === 'production') {
    console.log(`REACT_APP_API_URL=https://enigmatic-journey-33069.herokuapp.com`);
    console.log(`NODE_PATH=src`);
} else {
    console.log(`REACT_APP_API_URL=http://localhost:8080`);
    console.log(`NODE_PATH=src`);
}