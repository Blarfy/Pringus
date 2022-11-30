import pymongo as pymongo
import json
import pprint
from flask import Flask, Response

app = Flask(__name__)


@app.route('/flights', methods=["GET"])
def getFlights():
    print("")


@app.route('/tickets', methods=["GET"])
def getTickets():
    print("")


@app.route('/users', methods=["GET"])
def getFlights():
    print("")


@app.route('/routes', methods=["GET"])
def getRoutes():
    print("")


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
