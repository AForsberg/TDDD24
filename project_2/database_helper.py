import sqlite3
from flask import g

DATABASE = 'C:/Users/Anton/Documents/GitHub/TDDD24/project_2/database.db'

def get_db():
	db = getattr(g, '_database', None)

	if db is None:
		db = g._database = connect_db()
	return db
	
def connect_db():
	return sqlite3.connect(DATABASE)


def addUser(email, firstname, familyname, gender, city, country):
	command = 'INSERT INTO USER VALUES(email, firstname, familyname, gender, city, country);'
	cur.execute(command)
	db.commit()

def getUser(email):
	command = 'SELECT * FROM USER AS U WHERE U.email = ?'
	userInfo = []
	userInfo = cur.execute(command, email)
	return userInfo

def existsUser(email):
	cur = get_db().cursor()
	command = 'SELECT * FROM USER'
	result = cur.execute(command)
	if result != None:
		return result
	else:
		return 'false'

def addMessage(email, ):
	pass

def changePassword(token, newPass):
	pass

def getMessages():
	pass