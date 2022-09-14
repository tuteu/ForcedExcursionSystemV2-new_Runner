#Flaskとrender_template（HTMLを表示させるための関数）をインポート
import re
import sys
from flask import Flask, render_template, request,jsonify
from markupsafe import escape
import sqlite3
import json

#Flaskオブジェクトの生成
app = Flask(__name__)
dbname = r'C:\Users\tuteu\Desktop\RICO\new_teu_0\ForcedExcursionSystemV2-new_Runner\api\gateChecker.sqlite3'

app.config['JSON_AS_ASCII']=False
app.config['JSON_SORT_KEYS']=False
#「/」へアクセスがあった場合に、"Hello World"の文字列を返す
@app.route("/")
def hello():
    return "Hello World"

# <>で囲むことでpathを引数として取り込める。型指定も可能
# 引数はセキュリティ上、必ずescapeされる必要がある
# methods指定でアクセスするHTTPメソッドを限定できる
# requestオブジェクトにアクセスすることで、HTTPのヘッダ要素にアクセスできる



@app.route("/gateChecker/api/events/<int:str_event_id>/runners", methods=['GET'])

def getRunners(str_event_id):
   
    
    conn = sqlite3.connect(dbname)
    cur = conn.cursor()
    #cur.execute('SELECT * FROM Event')
    
    # Exsample select
    #cur.execute('SELECT * FROM Runner where event_id = 1')
    
    cur.execute('SELECT Runner.code, person.name, person.yomi,Runner.grade,Runner.classNo,Runner.attendanceNo,Department.gender,Department.tense\
        FROM Runner\
            inner join Person on Runner.person_id=person.pid\
            inner join Department on Runner.department_id=Department.id' + ' where event_id='+ str(str_event_id))
  




    v_runners = cur.fetchall()
    result = []
    for runner in v_runners:
        p = {
            "code":runner[0],
            "name": runner[1],
            "yomi": runner[2],
            "grade": str(runner[3]),
            "classNo": str(runner[4]),
            "attendanceNo":str(runner[5]),
            "gender": str(runner[6]), 
            "tense": str(runner[7])
        }
        result.append(p)

    
  

    cur.close()
    conn.close()
   
    return jsonify(result)

#「/index」へアクセスがあった場合に、「index.html」を返す
# ファイルはtemplatesフォルダから探される
@app.route("/index/<string:name>")
def index(name):
    return render_template("index.html", name=escape(name))

#おまじない
if __name__ == "__main__":
    app.run(debug=True)


