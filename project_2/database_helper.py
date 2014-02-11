import sqlite3
from flask import g

DATABASE = 'C:/Users/Anton/Documents/GitHub/TDDD24/project_2/database.db'

def get_db():
	db = getattr(g, '_database', None)

	if db is None:
		db = g._database = connect_db()
	return db
	
def connect_db():
	conn = sqlite3.connect(DATABASE)
	conn.text_factory = str
	return conn


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
	cur.execute('SELECT * FROM user WHERE user.EMAIL = ?', [email])
	result = cur.fetchone()
	if result != None:
		return True
	else:
		return False

def addMessage(email, ):
	pass

def changePassword(token, newPass):
	pass

def getMessages():
	pass