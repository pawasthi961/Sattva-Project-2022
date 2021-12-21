from flask import Flask
import pymongo

app =  Flask(__name__)
app.secret_key = 'secret123'

# DATABASE

client = pymongo.MongoClient('localhost', 27017)
db = client.sattva_db


