from config import *
from twitter_api_credentials import *
import tweepy , sys ,time
from tweepy.streaming import Stream
import json



#INITIALIZING API_KEY , API_SECRET
api_key = API_KEY
api_secret = API_SECRET

#INTIALIZING ACCESS_TOKEN , ACCESS_TOKEN_SECRET
access_token = ACCESS_TOKEN
access_token_secret = ACCESS_TOKEN_SECRET

#CREATING AUTHENTICATING HANDLER
auth =  tweepy.OAuthHandler(api_key, api_secret)
auth.set_access_token(access_token , access_token_secret)

api = tweepy.API(auth)

class TwitterStreamListener(Stream):
    ''' Handles data received from the stream. '''
    def on_data(self, data):
        data_json = json.loads(data)
        if 'media' in data_json["entities"]:
            for image in data_json["entities"]["media"]:
                _tweet_id = image["id"]
                _media_url = image["media_url_https"]
                _created_at = data_json["created_at"]
                _uploaded_by = data_json["user"]["name"]
                _user_handle = "@"+data_json["user"]["screen_name"]

                db.tweet_data.insert_one({
                    'tweet_id': _tweet_id,
                    'media_url': _media_url,
                    'created_at': _created_at,
                    'uploaded_by':_uploaded_by,
                    'user_handle':_user_handle,

                })
        print(data_json)
        return True
    
    
    def on_status(self, status):
        print(status.id)
        print(status.user.name)
        print(status.text)
        return True

    def on_error(self, status_code):
        print('Got an error with status code: ' + str(status_code))
        return True # To continue listening

    def on_timeout(self):
        print('Timeout...')
        return True # To continue listening

def printtweetdata(n, ith_tweet):
    print()
    print(f"Tweet {n}:")
    print(f"Username:{ith_tweet[0]}")
    print(f"Description:{ith_tweet[1]}")
    print(f"Location:{ith_tweet[2]}")
    print(f"Following Count:{ith_tweet[3]}")
    print(f"Follower Count:{ith_tweet[4]}")
    print(f"Total Tweets:{ith_tweet[5]}")
    print(f"Retweet Count:{ith_tweet[6]}")
    print(f"Tweet Text:{ith_tweet[7]}")
    print(f"Hashtags Used:{ith_tweet[8]}")
    print(f"created_at : {ith_tweet[9]}")

# function to perform data extraction
def scrape(words, numtweet , api):
      
    # Creating DataFrame using pandas
    # db = pd.DataFrame(columns=['username', 'description', 'location', 'following',
                            #    'followers', 'totaltweets', 'retweetcount', 'text', 'hashtags'])
      
    # We are using .Cursor() to search through twitter for the required tweets.
    # The number of tweets can be restricted using .items(number of tweets)
    tweets = tweepy.Cursor(api.search_tweets, q=words, lang="en",
                        
                            tweet_mode='extended').items(numtweet)
     
    # .Cursor() returns an iterable object. Each item in 
    # the iterator has various attributes that you can access to 
    # get information about each tweet
    list_tweets = [tweet for tweet in tweets]
      
    # Counter to maintain Tweet Count
    i = 1  
      
    # we will iterate over each tweet in the list for extracting information about each tweet
    for tweet in list_tweets:
        username = tweet.user.screen_name
        description = tweet.user.description
        location = tweet.user.location
        following = tweet.user.friends_count
        followers = tweet.user.followers_count
        totaltweets = tweet.user.statuses_count
        retweetcount = tweet.retweet_count
        created_at = tweet.created_at
        hashtags = tweet.entities['hashtags']

          
        # Retweets can be distinguished by a retweeted_status attribute,
        # in case it is an invalid reference, except block will be executed
        try:
            text = tweet.retweeted_status.full_text
        except AttributeError:
            text = tweet.full_text
        hashtext = list()
        for j in range(0, len(hashtags)):
            hashtext.append(hashtags[j]['text'])
          
        # Here we are appending all the extracted information in the DataFrame
        ith_tweet = [username, description, location, following,
                     followers, totaltweets, retweetcount, text, hashtext,created_at]
        # db.loc[len(db)] = ith_tweet
          
        # Function call to print tweet data on screen
        printtweetdata(i, ith_tweet)
        i = i+1


    # filename = 'scraped_tweets.csv'
    # we will save our database as a CSV file.
    # db.to_csv(filename)

# function to start Tweet Listener
def tweet_listener():
    #INITIALIZE TWEET LISTENER
    print("listener started")
    listener = TwitterStreamListener(consumer_key = api_key,consumer_secret = api_secret,access_token = access_token, access_token_secret = access_token_secret,)
    listener.filter(track = ["#SattvaNFT"])
    


if __name__ =="__main__":
    tweet_listener()
    scrape("#SattvaNFT",5)



