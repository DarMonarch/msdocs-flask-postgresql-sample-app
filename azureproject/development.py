import os

DATABASE_URI = 'postgresql+psycopg2://{dbuser}:{dbpass}@{dbhost}/{dbname}'.format(
    dbuser=os.environ['myksbwyjfd'],
    dbpass=os.environ['m$9smYMoRnwfcL4y'],
    dbhost=os.environ['a1grpwebsite-server.postgres.database.azure.com'],
    dbname=os.environ['a1grpwebsite-database']
)
