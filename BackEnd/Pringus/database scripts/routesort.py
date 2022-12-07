#connect to our database and find which airports are used in the most routes
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

#find all airports in our database and add to an array
airports = []
for airport in collAirports.find():
    airports.append(airport['code'])

#find all routes in our database and add to an array
routes = []
for route in collRoutes.find():
    routes.append(route['origin'])
    routes.append(route['destination'])

#find the most common airports in our routes
results = {}
for airport in airports:
    if airport in routes:
        results[airport] = routes.count(airport)

#sort results and display top 10
for airport in sorted(results, key=results.get, reverse=True)[:10]:
    print(airport, results[airport])

print("---------------------------------")

#sort results and display lowest 10
for airport in sorted(results, key=results.get, reverse=False)[:10]:
    print(airport, results[airport])
