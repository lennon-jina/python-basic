# start.py를 실행해서 메모리에 저장되었던 변수 등은
# start.py의 실행이 끝나면 모두 사라짐

# 01_string.py 를 실행하면 start.py 는 전혀 실행되지 않음

station = "정부청사역, 시청역, 탄방역"

print(station)

# 자동완성 Ctrl + space

# 문자열의 글자수 확인
# length의 약자를 써서 len() 사용
print(len(station))

# 문자열의 인덱스(넘버링)를 이용하여 특정 문자 꺼내기
print(station[4])

# 어떤 문자열이든 첫번째 문자만 꺼내겠다
stuA = "김병준"
stuB = "김상"
stuC = "남궁민궁"

print(stuA[0])
print(stuB[0])
print(stuC[0])

# 어떤 문자열이든 마지막 문자막 꺼내겟다
# stuA 의 마지막 문자의 인덱스 : 2

print(stuA[2])
print(stuB[1])
print(stuC[3])

stuX = "김하얀푸른하늘빛"
last = len(stuX) - 1
print(last)
print(stuX[last])

stuA[len(stuA)-1]

# 코드 자동 정랼(포맷팅) 단축기 [Ctrl + Shift + F]
print(stuA[len(stuA) - 1])

# 파이썬은 거꾸로도 인덱스 번호를 부여해놓음

print(station[7])
print(station[-8])


try:
    print(station.index("용")) #에러가 발생하면 실행, 에러가 안 나면 실행
except:
    print("에러 처리 구문")

print("재밌는 파이썬")


# 문자열에서 인덱스 번호를 이용해서 특정 문자를 꺼내는 것을 인덱싱이라 함
print(station[3])

# 인덱스 번호를 이용해서 여러개의 문자를 꺼내는 것을 슬라이스라 함
# 정부청사역은 인덱스 0,1,2,3,4 에 해당

print(station[0:4])
print(station[0:5])

# 슬라이스해서 시청역을 출력하기
print(station[7:18])

print(station[7:])
print(station[:10])

# 변수 이름 짓는 방식
name = "정지나"

# 마나 포인트 (mana point)
# 1. 스네이크 방식
mana_point = 50

# 2. 카멜 방식
manaPoint = 50

# 3. 요약 방식 (Datanase 컬럼명에 자주 보임)
max_mana_point = 100
mmp = 100