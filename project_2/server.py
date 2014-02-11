#Servercode by Antfo325&Sebka720
import sqlite3
import database_helper
import string
import random
from flask import Flask, request
app = Flask(__name__)

@app.route('/')
def home():
	database_helper.get_db()
	return 'This is a front page, looking beautiful'

@app.route('/signin')
def signIn():
	#Authenticates user, returns string containing random generated token
	email = request.args.get('email')
	password = request.args.get('password')
	return email + password
	user = database_helper.getUser(email)
	if user == null:
		return 'no such user'
	elif user.password != password:
		return 'wrong password'
	else:
		token =''.join([random.choice(string.ascii_letters + string.digits) for n in xrange(32)])
		return {'success' : true, 'message' : 'you logged in', 'data':token}
@app.route('/users')
def showUsers():
	pass

@app.route('/signup')
def signUp():
	#Registers user in database
	email = request.args.get('email')
	password = request.args.get('password')
	firstname = request.args.get('firstname')
	familyname = request.args.get('familyname')
	gender = request.args.get('gender')
	city = request.args.get('city')
	country = request.args.get('country')
	answer = database_helper.existsUser(email)
	#return answer
	if answer == True:
		"""database_helper.addUser(email, password, firstname, familyname, gender, city, country)"""
		return 'you just signed up'
	else:
		return 'user already exists'
		
@app.route('/signout')
def signOut():
	token=request.args.get('token')
	return token

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
	app.run(debug=True)
