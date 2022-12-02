#create flights for the day using our routes and planes

from pymongo import MongoClient
import random

#connect to database
url = "mongodb+srv://theGringus:SquingyDingus@pringus.kqhfvvx.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(url)
db = client['Pringus']
collRoutes = db['Routes']
collPlanes = db['Planes']
collFlights = db['Flights']
print("Connected to MongoDB")

#choose a random route
routes = []
for route in collRoutes.find():
    routes.append(route)

flightCount = 0

randomloop = random.randint(1, 1000)
for i in range(randomloop):
    randomRoute = routes[random.randint(0, len(routes)-1)]
    airplane = collPlanes.find_one({'code': randomRoute['plane']})
    randomPrice = str(random.randint(100, 1000)) + '.' + str(random.randint(0, 99))

    try:
        try: 
            count = airplane['first']['count']
            pattern = airplane['first']['pattern']
            first = []
        except:
            first = 'none'

        seatsPerRow = 0
        for row in pattern:
            seatsPerRow += pattern[row - 1]
        rows = count / seatsPerRow
        leftover = count % seatsPerRow
        try:
            stray = airplane['first']['stray']
        except:
            stray = [0]
        try:
            strow = airplane['first']['strow']
        except: 
            strow = rows

        patternBool = []
        for entry in range(seatsPerRow):
            patternBool.append(False)

        strowBool = []
        for num in stray:
            if(num == 0):
                strowBool.append(True)
            else:
                for i in range(num):
                    strowBool.append(False)

        for row in range(int(rows)):
            if row == strow:
                first.append(strowBool)
            else:
                first.append(patternBool)
    except:
        print("oopsie poopsies! no first class for you!")

    try:
        try:
            count = airplane['business']['count']
            pattern = airplane['business']['pattern']
            business = []
        except:
            business = 'none'
        
        seatsPerRow = 0
        for row in pattern:
            seatsPerRow += row
        rows = count / seatsPerRow
        leftover = count % seatsPerRow
        try:
            stray = airplane['business']['stray']
        except:
            stray = [0]
        try:
            strow = airplane['business']['strow']
        except:
            strow = rows

        patternBool = []
        for entry in range(seatsPerRow):
            patternBool.append(False)

        strowBool = []
        for num in stray:
            if(num == 0):
                strowBool.append(True)
            else:
                for i in range(num):
                    strowBool.append(False)

        for row in range(int(rows)):
            if row == strow:
                business.append(strowBool)
            else:
                business.append(patternBool)
    except:
        print("oopsie poopsies! no business class for you!")

    try:
        try:
            count = airplane['economy']['count']
            pattern = airplane['economy']['pattern']
            economy = []
        except:
            economy = 'none'

        seatsPerRow = 0
        for row in pattern:
            seatsPerRow += row
        rows = count / seatsPerRow
        leftover = count % seatsPerRow
        try:
            stray = airplane['economy']['stray']
        except:
            stray = [0]
        try:
            strow = airplane['economy']['strow']
        except:
            strow = rows

        patternBool = []
        for entry in range(seatsPerRow):
            patternBool.append(False)

        strowBool = []
        for num in stray:
            if(num == 0):
                strowBool.append(True)
            else:
                for i in range(num):
                    strowBool.append(False)

        for row in range(int(rows)):
            if row == strow:
                economy.append(strowBool)
            else:
                economy.append(patternBool)
    except:
        print("oopsie poopsies! no economy class for you!")

    randomDeparture = str(random.randint(1, 12)) + ":" + str(random.randint(0, 59))
    randomArrival = str(random.randint(1, 12)) + ":" + str(random.randint(0, 59))

    flightCount += 1

    flight = {
        'FlightID': "PR" + str(flightCount).zfill(4),
        'Origin': randomRoute['origin'],
        'Destination': randomRoute['destination'],
        'Price': randomPrice,
        'Airline': "Pringus Air",
        "Status": "On Time",
        'FlightInfo': {
            'Departure Time': randomDeparture,
            'Arrival Time': randomArrival,
            'Airplane': randomRoute['plane'],
            'Seating': {
                'First Class': first,
                'Business Class': business,
                'Economy Class': economy
            }
        }
    }
    
    print(flight)
    x = collFlights.insert_one(flight)
    print("Inserted: ", x.inserted_id)
