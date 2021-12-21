from config import *
from flask import jsonify
from bson.objectid import ObjectId
from bson.json_util import dumps
import json


class Data():

    def get_all_tweet_data(self):
        tweet_data = db.tweet_data.find()
        resp = jsonify(dumps(tweet_data))
        return resp