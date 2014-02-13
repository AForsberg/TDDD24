#Servercode by Antfo325&Sebka720
import sqlite3
import database_helper
import string
import random
import json
from flask import Flask, request
app = Flask(__name__)

loggedInUsers = {}

@app.route('/')
def home():
	database_helper.get_db()
	return 'This is a front page, looking beautiful'

@app.route('/signin')
def signIn():
	#Authenticates user, returns string containing random generated token
	email = request.args.get('email')
	password = request.args.get('password')
	user = database_helper.getUser(email)
	if user == None:
		return 'no such user'
	elif user[1] != password:
		return 'wrong password'
	else:
		token =''.join([random.choice(string.ascii_letters + string.digits) for n in xrange(32)])
		loggedInUsers[token] = email
		return json.dumps({'success' : True, 'message' : 'you logged in', 'data':token})

@app.route('/users')
def showUsers():
	users = database_helper.getUsers()
	for row in users:
		print row
	return 'done'

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
	if answer:
		database_helper.addUser(email, password, firstname, familyname, gender, city, country)
		return 'you just signed up'
	else:
		return 'user already exists'
		
@app.route('/signout')
def signOut():
	token=request.args.get('token')
	try:
		if loggedInUsers[token] != None:
			del loggedInUsers[token]
			return json.dumps({'success' : True, 'message' : 'you signed out'})
	except Exception, e:
		return json.dumps({'success' : False, 'message' : 'you are not signed in'})
		

@app.route('/changepassword')
def changePassword():
	token = request.args.get('token')
	oldPass = request.args.get('oldpassword')
	newPass = request.args.get('newpassword')
	try:
		email = loggedInUsers[token]
	except Exception, e:
		return json.dumps({'success' : False, 'message' : 'you are not signed in'})
	info = database_helper.getUser(email)
	if oldPass != info[1]:
		return json.dumps({'success' : False, 'message' : 'wrong password'})
	else:
		database_helper.changePassword(email, newPass)
		return json.dumps({'success' : True, 'message' : 'password changed'})
		

#@app.route('/getuserdata')
def getUserDataByToken(token):
	email = loggedInUsers[token]
	info = database_helper.getUser(email)

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
