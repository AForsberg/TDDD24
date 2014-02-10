#Servercode by Antfo325&Sebka720
import sqlite3
import database_helper
from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
	return 'This is a front page, looking beautiful'

@app.route('/signin')
def signIn(email, password):
	#Authenticates user, returns string containing random generated token

	if success:
		return 


@app.route('/signup')
def signUp(email, password, firstname, familyname, gender, city, country):
	#Registers user in database
	if database_helper.getUser(email) == "":
		database_helper.addUser(email, firstname, familyname, gender, city, country)
		return 'success'
	else:
		return 'user already exists'
	return 'you just signed up'
	
@app.route('/signout')
def signOut(token):
	#Signs a user out
	pass

@app.route('/changepassword')
def changePassword(token, oldPass, newPass):
	#Changes a users password in the database
	pass

@app.route('/getuserdata')
def getUserDataByToken(token):
	#Returns a user object containing all info
	pass

@app.route('/getuserdataemail')
def getUserDataByEmail(token, email):
	#Returns a user object
	pass

@app.route('/getmessagetoken')
def getUserMessagesByToken(token):
	#Returns an array containing all messages sent to user
	pass

@app.route('/getmessageemail')
def getUserMessagesByEmail(token, email):
	#Same as above for the email-user
	pass

@app.route('/postmessage')
def postMessage(token, message, email):
	#Post a message
	pass

if __name__=='__main__':
	app.run()
