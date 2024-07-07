from fastapi import FastAPI, Form, File, UploadFile, HTTPException,Query
from pydantic import BaseModel
from starlette.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import pymysql
import os
from dotenv import load_dotenv
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))
from datetime import timedelta, datetime
from jose import jwt
from typing import List, Optional, Dict
from datetime import datetime


from openai import OpenAI

ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
SECRET_KEY = "4ab2fce7a6bd79e1c014396315ed322dd6edb1c5d975c6b74a2904135172c03c"
ALGORITHM = "HS256"

OpenAI_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

# CORS 설정
origins = [
    "*",  # React 개발 서버 URL, * 표시하면 모두 허용
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # cookie 포함 여부를 설정한다. 기본은 False
    allow_methods=["*"],     # 허용할 method를 설정할 수 있으며, 기본값은 'GET'이다.
    allow_headers=["*"],     # 허용할 http header 목록을 설정할 수 있으며 Content-Type, Accept, Accept-Language, Content-Language은 항상 허용된다.
)

class Item(BaseModel):
	userid: str
	userpw: str
	name: str
 
class SigninItem(BaseModel):
    userid: str
    userpw: str
 
# 운세 보기 post.body 데이터
class FortuneInterface(BaseModel):
	user_message: str
	fortune_type: str
     
def db_conn():     
    db = pymysql.connect(
        host='10.10.0.100', 
        port=3306, 
        user='team14', 
        passwd='1234', 
        db='team14', 
        charset='utf8',
		cursorclass=pymysql.cursors.DictCursor)
    cursor = db.cursor()
    return db, cursor

@app.get("/")
async def root():
    return {"message":"hello world"}

@app.post("/signup")
async def signup(item: Item):
	global dicted_item
	dicted_item = dict(item)
	# 데이터 베이스에 저장 작업
	db, cursor = db_conn()
	try:
		sql = '''
			insert into user_info set
			email = '%s',
			pw = UPPER(SHA1(UNHEX(SHA1('%s')))),
			name = '%s';
		''' % (
			dicted_item['userid'], 
			dicted_item['userpw'], 
		    dicted_item['name']
		)
		cursor.execute(sql)
		db.commit()
	finally:
		db.close()
	dicted_item['success'] = True
	return JSONResponse(dicted_item)

@app.post("/signin")
async def signin(item:SigninItem):
	item = dict(item)
	userid= item.get("userid")
	userpw= item.get("userpw")
	db, cursor = db_conn()
	try:
		sql = '''
			SELECT * FROM user_info 
			WHERE email = %s AND pw = UPPER(SHA1(UNHEX(SHA1(%s))))
		'''
		cursor.execute(sql, (
			userid,
			userpw
		))
		result = cursor.fetchone()
		print(result)
	except pymysql.MySQLError as e:
		raise HTTPException(status_code=500, detail=f"Database operation failed: {e}")
	finally:
		if result:
			# db.close()
			data = {
				"sub": userid,
				"exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
			}
			access_token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM) # 토큰 생성
			db.close()
			return {
				"user": userid,
				"token": access_token,
				"token_type": "bearer"
			}
		else:
			raise HTTPException(status_code=401, detail="Invalid credentials")
        
@app.delete("/delete/{userid}")
async def delete(userid: str):
    #세션 확인 필요(자신의 계정을 삭제 하거나 관리자인 경우만 진입하도록 해야함)
    #데이터베이스 삭제
    db, cursor = db_conn()
    try:
        sql = '''
			delete from user_info where email = '%s';
		''' % (userid)
        cursor.execute(sql)
        db.commit()
    finally:
        db.close()
    return {"success": True}

@app.put("/update/{userid}")
async def update(userid: str, name: str):
	# 데이터 베이스에 저장 작업
	db, cursor = db_conn()
	try:
		sql = '''
			update user_info set
			name = '%s'
            where email = '%s';
		''' % (name, userid)
		cursor.execute(sql)
		db.commit()
	finally:
		db.close()
	return {"success": True}

@app.get("/user/")
async def user(userid: str):
	# 데이터 베이스에 저장 작업
	db, cursor = db_conn()
	result = None
	try:
		sql = '''
			select email,name from user_info 
			where email='%s';
		''' % (userid)
		cursor.execute(sql)
		result=cursor.fetchone()
		db.commit()
	finally:
		db.close()
		print(result)	
	return result

@app.post("/fortune")
async def fortune(data:FortuneInterface):
	fortune_type = data.fortune_type
	user_message = data.user_message
	completion = OpenAI_client.chat.completions.create(
		model="gpt-3.5-turbo",
		messages=[
			{"role": "system", "content": "당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것을 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 시바점술사입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다."},
			{"role": "user", "content": f"당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것을 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 시바점술사입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. 저는 당신에게 {fortune_type}에 대해서 물어보고 싶습니다."},
			{"role": "assistant", "content": f"물론입니다! 저는 당신의 {fortune_type}에 대해 자세하게 안내해 드릴 수 있습니다. {fortune_type}을 생년월일만 말해주시면 바로 {fortune_type}에 대해서 256토큰보다 짧게 대답해드리겠습니다."},
			{"role":"user" , "content": f"{user_message}"}
		]
	)
	return {"message" : completion.choices[0].message.content}

 
class FindFortunesReq(BaseModel):
    fortune_id: int
    fortune_data: str
    fortune_date: datetime
    public: bool
    email: str
    name: str
    
@app.get("/board/fortunes/", response_model=Dict[str, List[FindFortunesReq]])
async def get_board(p: int = Query(1, ge=1), u: Optional[str] = Query(None)):
	limit = 10
	offset = (p - 1) * limit
	param = ()

	# SQL 쿼리 작성
	if u:
		query = """
			SELECT fd.fortune_id, fd.fortune_data, fd.fortune_date, fd.public, ui.email, ui.name
			FROM fortune_datas fd
			JOIN fortune_relation fr ON fd.fortune_id = fr.fortune_id
			JOIN user_info ui ON fr.email = ui.email
			WHERE fd.public = true AND ui.email = %s
			ORDER BY fd.fortune_date DESC
			LIMIT %s OFFSET %s
		"""
		params = (u, limit, offset)
	else:
		query = """
			SELECT fd.fortune_id, fd.fortune_data, fd.fortune_date, fd.public, ui.email, ui.name
			FROM fortune_datas fd
			JOIN fortune_relation fr ON fd.fortune_id = fr.fortune_id
			JOIN user_info ui ON fr.email = ui.email
			WHERE fd.public = true
			ORDER BY fd.fortune_date DESC
			LIMIT %s OFFSET %s
		"""
		params = (limit, offset)

	db, cursor = db_conn()

	try:
		with db.cursor() as cursor:
			cursor.execute(query, params)
			results = cursor.fetchall()
			return {"pageData" :results}
	except pymysql.MySQLError as e:
		print(f"Error: {e}")
		raise HTTPException(status_code=500, detail="Database query failed")
	finally:
		db.close()

class FortuneData(BaseModel):
    email: str
    fortune_data: str
    show: bool
    
# 운세 정보 삽입 엔드포인트
@app.post("/board/fortunes/")
async def create_fortune(fortune: FortuneData):
	db, cursor = db_conn()
	try:
		# 트랜잭션 시작
		db.begin()

		# fortune_datas 테이블에 데이터 삽입
		fortune_insert_query = """
			INSERT INTO fortune_datas (fortune_data, fortune_date, public)
			VALUES (%s, %s, %s)
		"""
		cursor.execute(fortune_insert_query, (fortune.fortune_data, datetime.utcnow(), fortune.show))
		fortune_id = cursor.lastrowid

		# fortune_relation 테이블에 데이터 삽입
		relation_insert_query = """
			INSERT INTO fortune_relation (email, fortune_id)
			VALUES (%s, %s)
		"""
		cursor.execute(relation_insert_query, (fortune.email, fortune_id))

		# 트랜잭션 커밋
		db.commit()

		return {"message": "Fortune and relation created successfully"}

	except pymysql.MySQLError as e:
		db.rollback()
		print(f"Error: {e}")
		raise HTTPException(status_code=500, detail="Database query failed")
	finally:
		cursor.close()
		db.close()