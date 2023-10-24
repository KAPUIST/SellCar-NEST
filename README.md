# SellCar-NEST
NEST.JS 프로젝트 입니다.
# 중고차 가격 API

# 구현 내용
- [ ] 유저 로그인 (이메일/비밀번호)
    1) POST /auth/signup
    2) POST /auth/login
- [ ] 유저 정보조회
    1) GET /auth/:id
    2) GET /auth?email=...
- [ ] 유저 정보 업데이트
    1) PATCH /auth/:id
        ```
          Body - {
                "email":"",
                "password:""
                 }
        ```
    2) DELETE /auth:id
    
 - [ ] 제조사 / 모델 / 연도 기준으로 차의 가격 추정. 
    1) GET /reports
 - [ ] 중고차를 판매글 작성.
    1) POST /reports
 - [ ] Admin 승인 기능. 
    1) PATCH /reports
