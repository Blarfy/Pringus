import pymongo as pymongo
import json
import pprint
from flask import Flask, Response

app = Flask(__name__)

try:
    mongo = pymongo.MongoClient(
        "mongodb+srv://theGringus:SquingyDingus@pringus.kqhfvvx.mongodb.net/?retryWrites=true&w=majority")
    db = mongo.Pringus
    mongo.server_info()
except:
    print("ERROR - Cannot connect to db")


@app.route('/planes', methods=["GET"])
def getPlanes():
    try:
        planes = []
        data = db.Planes
        for plane in data.find():
            planes.append(plane)
        return str(planes)
    except Exception as ex:
        print(ex)
        return Response(response=json.dumps({"message": "cannot read name"}), status=500, mimetype="application/json")


@app.route('/flights', methods=["GET"])
def getFlights():
    try:
        flights = []
        data = db.Flights
        for flight in data.find():
            flights.append(flight)
        return str(flights)
    except Exception as ex:
        print(ex)
        return Response(response=json.dumps({"message": "cannot read name"}), status=500, mimetype="application/json")


@app.route('/tickets', methods=["GET"])
def getTickets():
    try:
        tickets = []
        data = db.Tickets
        for ticket in data.find():
            tickets.append(ticket)
        return str(tickets)
    except Exception as ex:
        print(ex)
        return Response(response=json.dumps({"message": "cannot read name"}), status=500, mimetype="application/json")


@app.route('/users', methods=["GET"])
def getUsers():
    try:
        users = []
        data = db.Users
        for user in data.find():
            users.append(user)
        return str(users)
    except Exception as ex:
        print(ex)
        return Response(response=json.dumps({"message": "cannot read name"}), status=500, mimetype="application/json")


@app.route('/routes', methods=["GET"])
def getRoutes():
    try:
        routes = []
        data = db.Routes
        for route in data.find():
            routes.append(route)
        return str(routes)
    except Exception as ex:
        print(ex)
        return Response(response=json.dumps({"message": "cannot read name"}), status=500, mimetype="application/json")


@app.route('/flights', methods=["POST"])
def createFlight():
    print("")


@app.route('/tickets', methods=["POST"])
def createTicket():
    print("")


@app.route('/users', methods=["POST"])
def createUser():
    print("")


@app.route('/routes', methods=["POST"])
def createRoute():
    print("")


@app.route('/flights', methods=["PUT"])
def updateFlight():
    print("")


@app.route('/tickets', methods=["PUT"])
def updateTicket():
    print("")


@app.route('/users', methods=["PUT"])
def updateUser():
    print("")


@app.route('/routes', methods=["PUT"])
def updateRoute():
    print("")


@app.route('/flights', methods=["DELETE"])
def deleteFlight():
    print("")


@app.route('/tickets', methods=["DELETE"])
def deleteTicket():
    print("")


@app.route('/users', methods=["DELETE"])
def deleteUser():
    print("")


@app.route('/routes', methods=["DELETE"])
def deleteRoute():
    print("")


if __name__ == '__main__':
    app.run()
