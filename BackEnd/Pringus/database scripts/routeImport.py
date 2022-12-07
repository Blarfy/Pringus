#import flight routes from routes.dat where the plane is in our database and the source and destination are in our database
#then import the routes into our database

from pymongo import MongoClient
import csv

#connect to database
url = "mongodb+srv://theGringus:SquingyDingus@pringus.kqhfvvx.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(url)
db = client['Pringus']
collRoutes = db['Routes']
collPlanes = db['Planes']
collAirports = db['Airports']
print("Connected to MongoDB")

#find all planes in our database and add to an array
planes = []
for plane in collPlanes.find():
    planes.append(plane['code'])

#find all airports in our database and add to an array
airports = []
for airport in collAirports.find():
    airports.append(airport['code'])

count = 1

#open routes.dat
with open('routes.dat', 'r', encoding="utf8") as f:
    reader = csv.reader(f)
    next(reader) # Skip header row
    for row in reader:
        print("Reading row: ", row)
        # Create a dictionary for each row
        if (row[8] in planes and row[2] in airports and row[4] in airports):
            data = {
                'id': count,
                'origin': row[2],
                'destination': row[4],
                'plane': row[8]
            }
            count += 1
        # Insert dictionary into MongoDB
            x = collRoutes.insert_one(data)
            print("Inserted: ", x.inserted_id)