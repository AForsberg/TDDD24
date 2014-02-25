#Servercode by Antfo325&Sebka720
import sqlite3
import database_helper
import string
import random
import json
import base64
import uuid
import hashlib
from gevent.wsgi import WSGIServer
from flask import Flask, request
app = Flask(__name__)

loggedInUsers = {}

@app.route('/')
def home():
	database_helper.get_db()
	#return app.send_from_directory('../client', 'client.html')

@app.route('/signin', methods=["POST"])
def signIn():
	print 'something requested meeeeee'
	#Authenticates user, returns string containing random generated token
	email = request.form['email']
	password = request.form['password']
	user = database_helper.getUser(email)
	if user == None:
		return json.dumps({'success' : False, 'message' : 'no such user'})
	elif verifyPass(password, user[1]):
		token =''.join([random.choice(string.ascii_letters + string.digits) for n in xrange(32)])
		loggedInUsers[token] = email
		return json.dumps({'success' : True, 'message' : 'you logged in', 'data':token})
	else:
		return json.dumps({'success' : False, 'message' : 'wrong password'})
		

@app.route('/users')
def showUsers():
	#Logfunction, shows all users 
	users = database_helper.getUsers()
	for row in users:
		print row
	return 'done'

@app.route('/signup', methods=["POST"])
def signUp():
	#Registers user in database
	email = request.form['email']
	password = request.form['password']
	firstname = request.form['firstname']
	familyname = request.form['familyname']
	gender = request.form['gender']
	city = request.form['city']
	country = request.form['country']
	if email == None:
		return json.dumps({'success' : False, 'message' : 'you need to fill in your info'})
	exists = database_helper.existsUser(email)
	#return answer
	if exists == False:
		hashPass = hashPassword(password)
		database_helper.addUser(email, hashPass, firstname, familyname, gender, city, country)
		return json.dumps({'success' : True, 'message' : 'you just signed up'})
	else:
		return json.dumps({'success' : False, 'message' : 'user already exists'})

		
@app.route('/signout', methods=["POST"])
def signOut():
	#Signs you out!
	token=request.form['token']
	try:
		if loggedInUsers[token] != None:
			del loggedInUsers[token]
			return json.dumps({'success' : True, 'message' : 'you signed out'})
	except Exception, e:
		return json.dumps({'success' : False, 'message' : 'you are not signed in'})
		

@app.route('/changepassword', methods=["POST"])
def changePassword():
	#Changes a users password
	token = request.form['token']
	oldPass = request.form['oldpassword']
	newPass = request.form['newpassword']
	try:
		email = loggedInUsers[token]
	except Exception, e:
		return json.dumps({'success' : False, 'message' : 'you are not signed in'})
	info = database_helper.getUser(email)
	if verifyPass(oldPass, info[1]):
		hashPass = hashPassword(newPass)
		database_helper.changePassword(email, hashPass)
		return json.dumps({'success' : True, 'message' : 'password changed'})
	else:
		return json.dumps({'success' : False, 'message' : 'wrong password'})
		

@app.route('/getuserdata')
def getUserDataByToken():
	#Retrieves userdata from token
	token = request.args.get('token')
	try:
		email = loggedInUsers[token]
	except Exception, e:
		return json.dumps({'success' : False, 'message' : 'you are not signed in'})
	info = database_helper.getUser(email)
	return json.dumps({'success' : True, 'user' : info})

@app.route('/getuserdataemail')
def getUserDataByEmail():
	#Returns a user object
	token = request.args.get('token')
	email = request.args.get('email')
	try:
		loggedInUser = loggedInUsers[token]
	except Exception, e:
		return json.dumps({'success' : False, 'message' : 'you are not signed in'})
	if database_helper.existsUser(email):
		user = database_helper.getUser(email)
		return json.dumps({'success' : True, 'user' : user})
	else:
		return json.dumps({'success' : False, 'message' : 'no such user'})

@app.route('/getmessagetoken')
def getUserMessagesByToken():
	#Returns an array containing all messages sent to user
	token = request.args.get('token')
	try:
		email = loggedInUsers[token]
	except Exception, e:
		return json.dumps({'success' : False, 'message' : 'you are not signed in'})
	messages = database_helper.getMessages(email)
	return json.dumps({'success' : True , 'messages' : messages})

@app.route('/getmessageemail')
def getUserMessagesByEmail():
	#Same as above for the email-user
	token = request.args.get('token')
	email = request.args.get('email')
	try:
		loggedInUser = loggedInUsers[token]
	except Exception, e:
		return json.dumps({'success' : False, 'message' : 'you are not signed in'})
	if database_helper.existsUser(email):
		messages = database_helper.getMessages(email)
		return json.dumps({'success' : True,  'messages:' : messages})
	else:
		return json.dumps({'success' : False, 'message' : 'no such user'})

@app.route('/postmessage', methods=["POST"])
def postMessage():
	#Post a message
	token = request.form['token']
	message = request.form['message']
	email = request.form['email']
	try:
		fromEmail = loggedInUsers[token]
	except Exception, e:
		return json.dumps({'success' : False, 'message' : 'you are not signed in'})
	if email == None:
		toEmail = fromEmail
	else:
		toEmail = email
	if database_helper.existsUser(toEmail):
		database_helper.addMessage(toEmail, fromEmail, message)
		return json.dumps({'success' : True, 'message' : 'message posted'})
	else:
		return json.dumps({'success' : False, 'message' : 'no such user'})

def hashPassword(password):

	hashedPass = hashlib.sha512(password).hexdigest()
	return hashedPass

def verifyPass(password, hashedPass):
	reHashed = hashPassword(password)
	return reHashed == hashedPass

http_server = WSGIServer(('', 5000), app)
http_server.serve_forever()

if __name__=='__main__':
	app.run(debug=True)
