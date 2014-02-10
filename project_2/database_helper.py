import sqlite3



def addUser():
	conn = sqlite3.connect('database.db')
	curs = conn.cursor()
	curs.execute('')
	conn.commit()

def getUser(email):
	conn = sqlite3.connect('database.db')
	curs = conn.cursor()
	command = 'SELECT * FROM USER AS U WHERE U.email = ?'
	userInfo = []
	userInfo = curs.execute(command, email)
	conn.close()
	return userInfo