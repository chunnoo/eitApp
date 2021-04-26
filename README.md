# Økovenn
App for KJ2095 Eksperter i team - Miljøpåvirkning og helse

### Installation
The app requires npm, expo and PostgraSQL installed
`npm install`

### Setting up database
The app requires a PostgreSQL database named **eit**
`cat database/initTables.sql | psql -d eit`

#### Filling tables with dummy data
`cat database/fillDummyData.sql | psql -d eit`

#### Setting user passwords
`node api/scripts/setPassword.js usernam password`

#### Setting the server IP address in config file
`echo "export default config = { address: 'SERVERS_IP_ADDRESS:8080' };" > src/config.js`

#### Deleting database
`cat database/deleteTables.sql | psql -d eit`

### Running the app

#### Running api
`npm run api`

#### Running the app
`npm start`
