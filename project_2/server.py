#Servercode by Antfo325&Sebka720
import sqlite3
from flask import Flask
app = Flask(__name__)

def signIn(email, password):
	#Authenticates user, returns string containing random generated token

def signUp(email, password, firstname, familyname, gender, city, country):
	#Registers user in database

def signOut(token):
	#Signs a user out

def changePassword(token, oldPass, newPass):
	#Changes a users password in the database

def getUserDataByToken(token):
	#Returns a user object containing all info

def getUserDataByEmail(token, email):
	#Returns a user object

def getUserMessagesByToken(token):
	#Returns an array containing all messages sent to user

def getUserMessagesByEmail(token, email):
	#Same as above for the email-user

def postMessage(token, message, email):
	#Post a message



