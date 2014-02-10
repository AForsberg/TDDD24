import sqlite3

def addUser(email, firstname, familyname, gender, city, country):
	conn = sqlite3.connect('database.db')
	curs = conn.cursor()
	command = 'INSERT INTO USER VALUES(email, firstname, familyname, gender, city, country);'
	curs.execute(command)
	conn.commit()
	conn.close()

def getUser(email):
	conn = sqlite3.connect('database.db')
	curs = conn.cursor()
	command = 'SELECT * FROM USER AS U WHERE U.email = ?'
	userInfo = []
	userInfo = curs.execute(command, email)
	conn.close()
	return userInfo