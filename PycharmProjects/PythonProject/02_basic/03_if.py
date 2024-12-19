# 조건문 (if문 사용)
# if : 만약에 ~라면

# 조건에 따라 다른 명령을 내릴때 사용

# 조건이 참(True)이면 실행, 거짓(False)이면 실행하지마

# 비교연산자
a = 10
b = 3

# a와 b가 서로 같습니까?
print(a == b)

# a와 b가 서로 다릅니까?
print(a != b)

# a와 b보다 큽니까?
a = 20
b = 10
print(a > b)

# a가 b 이상입니까? (같거나 큽니까?)
print(a >= b)

# b가 a보다 큽니까?
print(b > a)
# a가 b보다 작습니까?
print(a < b)

# a가 b 이하입니까?
print(a <= b)


# 주민번호 뒷자리의 첫번째 숫자가
# 짝수면 여자, 홀수면 남자
# 1, 2, 3, 4, 5, 6, 7, 8, 9, 0
# 1900 년도에 태어난 남자 1, 여자 2
# 2000 년도에 태어난 남자 3, 여자 4
# 1900 년도에 태어난 외국인 남자 5, 여자 6
# 2000 년도에 태어난 외국인 남자 7, 여자 8
# 1800 년도에 태어난 남자 9, 여자 0

idNum = "1234567"

# idNum 의 첫번재 숫자가 홀수면 남성 출력, 짝수면 여성 출력
print(idNum[0])

fst = idNum[0]
# fst의 타입? 문자열
print(type(fst))

# 파이썬은 배열에 곱하기를 하면 내용이 그 수만큼 늘어남
print(fst * 3)

# 홀수, 짝수 계산을 위해 fst를 int 로 변환해야함
fst = int(fst)
print(fst * 2)

# 홀수, 짝수 계산하기
# 어떤 수든 2로 나누었을 때 0이면 짝수, 1이면 홀수
print(fst % 2 == 0)

# 실행순서
# print(fst % 2 == 0)
# print(1 % 2 == 0)
# print(1 == 0)
# print(False)

print(fst % 2 == 1)


# 짝수일 때는 여성, 홀수일 때는 남성
fst = 3
# if문의 조건이 True일 때만 if문 내부 코드가 실행 됨
if fst % 2 == 0:
    print("여성") # tab이 있기에 if 내부 코드가 됨
print("성별체크")  # tab이 없기에 if문과 무관한 코드

# fst가 홀수일 때는 남성이 출력되도록 if문 작성
if fst % 2 == 1:
    print("남성")

# fst가 5~8이면 외국인
# 1 <= fst <= 4
fst = 6
print(1 <= fst <= 4)
print(5 <= fst <= 8)

# fst 에 대해 1~4면 한국인 5~8이면 외국인 출력하기
fst = 5
if 1 <= fst <= 4:
    print("한국인")
else:
    print("외국인")


# 성적이 90점대면 A등급 출력
# 성적이 80점대면 B등급 출력
# 성적이 70점대면 C등급 출력
# 그 외 나머지는 D등급 출력

score = 60

print(score >= 90)

print(80 <= score < 90)

if score >= 90:
    print("A등급")
elif 80 <= score < 90:
    print("B등급")
elif 70 <= score < 80:
    print("C등급")
else:
    print("D등급")

score = 95

if score >= 70:
    print("C등급")
elif score >= 80:
    print("B등급")
elif score >= 90:
    print("A등급")
else:
    print("D등급")