from pymongo import MongoClient
import csv

# Connect to MongoDB
url = "mongodb+srv://theGringus:SquingyDingus@pringus.kqhfvvx.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(url)
db = client['Pringus']
collection = db['Airports']
print("Connected to MongoDB")

# Open CSV file
with open('airports.csv', 'r', encoding="utf8") as f:
    reader = csv.reader(f)
    next(reader) # Skip header row
    for row in reader:
        print("Reading row: ", row)
        # Create a dictionary for each row
        if (row[13] != ''):
            data = {
                'code': row[13],
                'name': row[3],
                'country': row[8],
                'state': row[9].split('-')[1],
                'city': row[10]
            }
        # Insert dictionary into MongoDB
            x = collection.insert_one(data)
            print("Inserted: ", x.inserted_id)
