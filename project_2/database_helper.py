import sqlite3
from flask import g

DATABASE = 'C:/Users/Anton/Documents/GitHub/TDDD24/project_2/database.db'

def get_db():
	db = getattr(g, 'db', None)
	if db is None:
		db = g.db = connect_db()
	return db
	
def connect_db():
	conn = sqlite3.connect(DATABASE)
	conn.text_factory = str
	return conn
def getUsers():
	cur = get_db().cursor()
	query = 'SELECT * FROM user'
	cur.execute(query)
	result = cur.fetchall()
	return result

def addUser(email, password, firstname, familyname, gender, city, country):
	cur = get_db().cursor()
	query = 'INSERT INTO USER (email, password, firstname, familyname, gender, city, country) VALUES(?, ?, ?, ?, ?, ?, ?);'
	cur.execute(query, [email, password, firstname, familyname, gender, city, country])
	get_db().commit()

def getUser(email):
	cur = get_db().cursor()
	query = 'SELECT * FROM USER AS U WHERE U.email = ?'
	cur.execute(query, [email])
	userInfo = cur.fetchone()
	return userInfo

def existsUser(email):
	cur = get_db().cursor()
	cur.execute('SELECT * FROM user WHERE user.EMAIL = ?', [email])
	result = cur.fetchone()
	print result
	return (result == None)

def addMessage(email, ):
	pass

def changePassword(token, newPass):
	pass

def getMessages():
	pass