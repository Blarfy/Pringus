#create flights for the day using our routes and planes

from pymongo import MongoClient
import random
import datetime

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
            #Figure out if first class
            count = airplane['first']['count']
            pattern = airplane['first']['pattern']
            first = []
        except:
            first = 'none'

    #You have a first class, start generation
        seatsPerRow = 0
        #Counts seating per row
        for row in pattern:
            seatsPerRow += pattern[row - 1]

        #getting number of rows
        rows = count / seatsPerRow
        #Getting stray stuff
        leftover = count % seatsPerRow
        try:
            stray = airplane['first']['stray']
        except:
            stray = [0]
        try:
            strow = airplane['first']['strow']
        except: 
            strow = rows

        #Makes empty seats
        patternBool = []
        for entry in range(seatsPerRow):
            patternBool.append(False)

        #Makes empty seats for the stray row
        strowBool = []
        for num in stray:
            if(num == 0):
                strowBool.append(True)
            else:
                for i in range(num):
                    strowBool.append(False)

        for row in range(int(rows)):
            #Is this a stray row?
            if row == strow:
                #appends the stray row to the end
                first.append(strowBool)
            else:
                #Not a stray row, generate normal row
                tempBool = patternBool.copy()
                for i in range(seatsPerRow):
                    if random.randint(0, 2) == 1:
                        tempBool[i] = True
                first.append(tempBool)
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
                tempBool = patternBool.copy()
                for i in range(seatsPerRow):
                    if random.randint(0, 2) == 1:
                        tempBool[i] = True
                business.append(tempBool)
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
                tempBool = patternBool.copy()
                for i in range(seatsPerRow):
                    if random.randint(0, 2) == 1:
                        tempBool[i] = True
                economy.append(tempBool)
    except:
        print("oopsie poopsies! no economy class for you!")

    dayOffset = datetime.timedelta(days=random.randint(0, 30))
    randomDeparture = datetime.datetime.now().replace(hour=random.randint(0, 14), minute=random.randint(0, 29)) + dayOffset
    randomArrival = datetime.datetime.now().replace(hour=randomDeparture.hour + random.randint(1, 9), minute=randomDeparture.minute + random.randint(0, 29)) + dayOffset

    flightCount += 1

    flight = {
        'flightID': "PR" + str(flightCount).zfill(4),
        'origin': randomRoute['origin'],
        'destination': randomRoute['destination'],
        'price': randomPrice,
        'airline': "Pringus Air",
        "status": "On Time",
        'flightInfo': {
            'departureTime': randomDeparture,
            'arrivalTime': randomArrival,
            'airplane': {
                "$ref": "Planes",
                "$id": airplane['_id'],
            },
            'seating': {
                'firstClass': first,
                'businessClass': business,
                'economyClass': economy
            }
        }
    }
    
    print(flight)
    x = collFlights.insert_one(flight)
    print("Inserted: ", x.inserted_id)
