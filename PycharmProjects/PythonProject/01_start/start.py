# 코드 주석 처리 [Ctrl + /]
# 콘솔창에 괄호 안 텍스트(문자열)을 출력하는 명령어
print("ㅓ")

# 변수 선언
# 변수란 값이 바뀔 수 있는 저장소를 의미
# 프로그래밍 언어에서 등호(=)는
# 등호 오른쪽의 값을 왼쪽에 저장해라는 의미
mirae = 10000

# 변수에 저장된 값을 확인
print("mirae")
print(mirae)

fusion = 5000
print(fusion)

# 텍스트(문자열)를 변수에 저장
mina = "미나"

print(mina)

# mirae를 15000 담기
mirae = 15000
print(mirae)

# navi 변수가
# print(navi)
navi = "네비"

#변수의 타입
a = 10
print(a)

# 변수의 타입 확인
# type () 괄호 안에 변수를 넣으면 해당 변수의 타입을 리턴
print(type(a))

b = 3.14
print(b)

print(type(b))

# 변수 c에 문자열 "몽키"를 담고,
# 변수 c의 타입을 콘솔창에 출력하기

c = "몽키"
# 문자열(String)
print(type(c))

# 불리언(boolean) 타입
# 참/거짓, True/false을 나타내는 값
d = False

print(type(d))

# 개발할 때 혼동하기 쉬운 변수 타입
# 주민번호 앞자리 961028
e = 961028
print(type(e))
print(e)

# 주민번호 앞자리 030320
f = "030320"
print(f)

year = "1999"

# 자동으로 나이계산을 해야하는 경우
# 문자열 타입과 숫자 타입은 연산을 할 수 없음
# 타입을 변환한 후 연산을 수행한다
# str 타입의 year를 int 타입으로 변환
age = 2024 - int(year)
print(age)

g = "문자열"

# h = int(g)
# print(h)

# 사칙연산 (+, -, *, /)
a = 10
b = 3

c = a + b
print(c)

d = a - b
print(d)

print(a * b)

# 나머지 연산자 (%)
# 10을 3으로 나누면 나머지는? 1
print(a % b)
print(b % a)


# 숫자형 문자열 -> int 변환
# int -> string 변환?

# 문자열 타입 + 문자열 타입
# 두 문자열이 합쳐진다
apple = "사과"
banana = "바나나"
sum = apple + banana
print(sum)
print(apple + " " + banana)

price = 3000
# 사과3000
v_sum = apple + ": " + str(price)

print(v_sum)

# 라인 복사 [Ctrl + Alt + 방향키 아래]
# 라인 삭제 [Ctrl + D]
# 실행 취소 [Ctrl + Z]
# 실행 취소 되돌리기 [ Ctrl + Y]

# "사과: 3000"가 되도록 연산하기

money = 13000
print("money: " + str(money))
print("money:", money)

# 변수값에 사칙연산하기
# 용돈을 받아서 money에 값 추가하기
money = money + 30000
print(money)

money = money * 2
print(money)

# 대입연산자 방법
# money에 14000을 더해라
money += 14000
print(money)

# money를 5로 나누기
money = money / 5
print(money)
money /= 5
print(money)
