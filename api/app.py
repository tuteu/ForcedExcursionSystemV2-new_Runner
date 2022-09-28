import sys
from unittest import result
sys.path.append("/.api")
from flask import Flask, render_template, request, jsonify
from markupsafe import escape
import sqlite3

#Flaskオブジェクトの生成
app = Flask(__name__)

# jsonで日本語を扱うのに必要
app.config['JSON_AS_ASCII'] = False
dbname = 'gateChecker.sqlite3'
app.config["JSON_SORT_KEYS"] = False 
#「/」へアクセスがあった場合に、"Hello World"の文字列を返す
@app.route("/")
def hello():
    return "Hello World"

# <>で囲むことでpathを引数として取り込める。型指定も可能
# 引数はセキュリティ上、必ずescapeされる必要がある
# methods指定でアクセスするHTTPメソッドを限定できる
# requestオブジェクトにアクセスすることで、HTTPのヘッダ要素にアクセスできる
@app.route("/gateChecker/api/events", methods=['GET'])
def getEvent():
    conn = sqlite3.connect(dbname)
    cur = conn.cursor()
    cur.execute('SELECT * FROM Event')
    v_events = cur.fetchall()
    result = []
    for event in v_events:
        event_data = {}
        event_data['id'] = event[0]
        event_data['name'] = event[1]
        event_data['date'] = event[2].replace('-', '/')
        if event[4] != None:
            event_data['prev_id'] = event[4]
        else:
            event_data['prev_id'] = ""

        event_data['summary'] = event[3]
        result.append(event_data)
    cur.close()
    conn.close()
    return jsonify(result)

@app.route("/gateCheckter/api/events/<int:str_event_id>/runners", methods=['GET'])
def getRunners(str_event_id):
    conn = sqlite3.connect(dbname)
    cur = conn.cursor()
    Runner=('SELECT Runner.code,Person.name,Person.yomi,Runner.grade,Runner.classNo,Runner.attendanceNo, Department.gender,Department.tense\
                    FROM Runner \
                        inner join Person on Runner.person_id = Person.pid \
                        inner join Department on Runner.department_id = Department.id ')
    cur.execute(Runner+'where event_id = ' + str(str_event_id))
    result = []
    v_runners = cur.fetchall()
    for runner in v_runners:
        p={
            "code":runner[0],
            "name":runner[1],
            "yomi":runner[2],
            "grade":str(runner[3]),
            "classNo":str(runner[4]),
            "attendanceNo":str(runner[5]),
            "gender":str(runner[6]),
            "tense":str(runner[7])
        }   
        result.append(p)
    cur.close()
    conn.close()
    return jsonify(result)  

@app.route("/index/<string:name>")
def index(name):
    return render_template("index.html", name=escape(name))
#おまじない
if __name__ == "__main__":
    app.run(debug=True)
