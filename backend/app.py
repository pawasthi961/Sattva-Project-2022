from flask import Flask, jsonify, request, session, redirect
from flask.scaffold import _matching_loader_thinks_module_is_package
from Models.user_model import User
from Models.data_model import Data
from functools import wraps
from config import *
import asyncio

# Decorators
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            return redirect('/')

    return wrap


# Initial Route
@app.route("/", methods=["GET"])
def home():
    return jsonify("HELLO")


@app.route('/dashboard/')
@login_required
def dashboard():
    return jsonify('dashboard')


# Auth Routes
@app.route('/user/signup', methods=['POST'])
def signup():
    return User().signup()


@app.route('/user/signout')
def signout():
    return User().signout()


@app.route('/user/login', methods=['POST'])
def login():
    return User().login()

# Data Routes

@app.route('/data/tweet_data', methods = ["GET"])
def all_tweet_data():
    return Data().get_all_tweet_data()

async def run_app():
    app.run(debug = True)

async def main():
    await asyncio.gather(run_app())

if __name__ == "__main__":
    app.run(debug=True)
    # tweet_listener()
    # asyncio.run(main())
