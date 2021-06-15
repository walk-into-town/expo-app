# 걸어서 동네 🌐 속으로

## 소개
동네로 모험을 떠나는 `Game` + `SNS` 앱입니다.

<br>

## 문제 정의
1. <ins>**사람들은 가던 곳만 갑니다.**</ins>   
사람들의 하루 활동반경은 평균 2-4km 입니다([출처]()).   
대학생 4학년이 되고서도 학교에 뭐하는지도 모르는 건물들이 많이 있고 자신이 사는 지역의 다양한 모습을 모르고 사는 경우가 정말 많습니다.   
2. <ins>**현대인들은 너무 바쁩니다.**</ins>   
지루한 일상에서 벗어나 여행과 모험을 떠나고싶만 시간과 여건이 늘 부족합니다.
3. <ins>**지역 홍보 플랫폼이 부족합니다.**</ins>   
 
사용자가 자신 동네 주위의 핀포인트를 지정하여 퀴즈를 작성하고 캠페인을 제작하면   
다른 사용자들이 이 캠페인을 참여하면서 몬스터 컬랙션을 수집할 수 있습니다.   
지역 마케팅, 홍보, 상권 활성화 수단으로 기대할 수 있습니다.  

<br>

## 개발스텍

### 프론트
React Native, Expo, TypeScript, Google Map API [__](https://github.com/walk-into-town/expo-app) 

React, TypeScript [__](https://github.com/walk-into-town/admin-web) 

[bepyan](https://github.com/bepyan), [minja222](https://github.com/minja222)

### 백엔드 
Express, TypeScript, AWS(EC2, S3, DynamoDB) [__](https://github.com/walk-into-town/ExpressServer) 

[purpuroeus](https://github.com/purpuroeus)

### 딥러닝 
Gan, GTP-2, CoLab [__](https://github.com/walk-into-town/MonsterGenerate)

[DJY0404](https://github.com/DJY0404)   
   
<br>

## 이용방법

1. expo 앱 다운 받기
2. https://expo.io/@bepyan/walk-into-town 링크 또는 링크의 QR코드로 앱 실행

---

## UI

### 게임

<div style="display: flex">
  <img src="https://user-images.githubusercontent.com/65283190/121500998-c307e600-ca19-11eb-9b19-6d8fff9b3549.gif" alt="퀴즈-phase1" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121501221-fe0a1980-ca19-11eb-90f1-ba6836e95d0a.gif" alt="퀴즈-phase2-객관식 시도" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121501437-37428980-ca1a-11eb-9144-992fad25fe9f.gif" alt="퀴즈-phase2-시간부족" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121501616-5b9e6600-ca1a-11eb-8db3-cdb2dcb2d973.gif" alt="퀴즈-phase2-시간초과" width="200"/>
   
   
  <img src="https://user-images.githubusercontent.com/65283190/121502961-96ed6480-ca1b-11eb-9194-2dd45b799b28.gif" alt="퀴즈-phase2-주관식 시도" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121503369-fa779200-ca1b-11eb-9072-b1ad21118cd8.gif" alt="퀴즈-phase2-주관식 시도-정답" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121501870-96080300-ca1a-11eb-99c0-5b3a938d27ad.gif" alt="퀴즈-실패" width="200"/>
   
  <img src="https://user-images.githubusercontent.com/65283190/121502366-13cc0e80-ca1b-11eb-86ed-cb2182848490.gif" alt="퀴즈-phase3" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121165259-17c92680-c88b-11eb-899d-7d4add7b1c36.gif" alt="퀴즈-쿠폰 획득" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121166433-06344e80-c88c-11eb-9091-b070b8327c3f.gif" alt="퀴즈-도전 취소" width="200"/>
</div>




### 내 쿠폰

<div>
  <img src="https://user-images.githubusercontent.com/65283190/121491679-24778700-ca11-11eb-8438-181192eb5069.gif" alt="내 쿠폰-디테일 화면" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121491699-29d4d180-ca11-11eb-85ea-c8daab2d731c.gif" alt="내 쿠폰-필터 정렬" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121491889-54268f00-ca11-11eb-828b-8c05ca3f8a3e.gif" alt="내 쿠폰-사용" width="200"/>
</div>


### 캠페인 검색

<div>
  <img src="https://user-images.githubusercontent.com/65283190/121477839-49fd9400-ca03-11eb-9ff2-3c0432253e73.gif" alt="검색-조회 결과 없음" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121167437-e5b8c400-c88c-11eb-8ef7-e0de3cccf738.gif" alt="검색-캠페인 이름" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121130453-636ad880-c869-11eb-969b-9432245ea010.gif" alt="검색-유저 조회" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121167422-e3566a00-c88c-11eb-99ad-c244c7656218.gif" alt="검색-지역 조회" width="200"/>
</div>

### 캠페인, 핀포인트, 쿠폰 상세화면

<div>
  <img src="https://user-images.githubusercontent.com/65283190/121485371-17579980-ca0b-11eb-91dd-2bd2d2e8752e.gif" alt="캠페인 상세화면" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121166447-0b919900-c88c-11eb-94de-39a527ac60d0.gif" alt="캠페인-참여-참여중인 캠페인 확인" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121163294-9f159a80-c889-11eb-97ec-1084a1486224.gif" alt="캠페인-탈퇴후 참여 3일 제한" width="200"/>
</div>
<div>
  <img src="https://user-images.githubusercontent.com/65283190/121485789-7f0de480-ca0b-11eb-830c-ee90bd5fd2d7.gif" alt="핀포인트 상세화면" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121489588-2fc9b300-ca0f-11eb-8362-ed391ace9ffa.gif" alt="핀포인트 상세화면-지도" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121487386-ff811500-ca0c-11eb-96c1-1415e03bca9a.gif" alt="쿠폰 상세화면" width="200"/>
</div>

### 리뷰, 댓글

<div> 
  <img src="https://user-images.githubusercontent.com/65283190/121486462-1ffc9f80-ca0c-11eb-9d12-efab60f1acd8.gif" alt="캠페인 리뷰" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121498748-b1254380-ca17-11eb-9276-a4c1117e9229.gif" alt="캠페인 리뷰-작성" width="200"/> 
  <img src="https://user-images.githubusercontent.com/65283190/121498879-d1550280-ca17-11eb-9437-310beefe86a5.gif" alt="캠페인 리뷰-수정" width="200"/> 
  <img src="https://user-images.githubusercontent.com/65283190/121499060-fe091a00-ca17-11eb-8b0e-dfb7a1835d2c.gif" alt="캠페인 리뷰-삭제" width="200"/> 
  
  <img src="https://user-images.githubusercontent.com/65283190/121498544-7cb18780-ca17-11eb-9ae9-b00fc9cd39be.gif" alt="핀포인트 댓글-정렬" width="200"/> 
  <img src="https://user-images.githubusercontent.com/65283190/121496947-e7fa5a00-ca15-11eb-8698-263c07b2cfe0.gif" alt="핀포인트 댓글-작성" width="200"/> 
  <img src="https://user-images.githubusercontent.com/65283190/121500081-f1d18c80-ca18-11eb-969f-c881cf5e6141.gif" alt="핀포인트 댓글-신고" width="200"/> 
</div>


### 지도

<div>
  <img src="https://user-images.githubusercontent.com/65283190/121492937-4ae9f200-ca12-11eb-918c-53b74536625f.gif" alt="지도" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121494883-1a0abc80-ca14-11eb-88aa-234f2d11c65f.gif" alt="지도-패널" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121495303-7bcb2680-ca14-11eb-8037-c92938dc8e10.gif" alt="지도-클리어 패널" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121496639-9fdb3780-ca15-11eb-8c9f-00404869a4d3.gif" alt="지도-패널-핀포인트 디테일" width="200"/>
   
  <img src="https://user-images.githubusercontent.com/65283190/121493068-694fed80-ca12-11eb-83f4-d82efd84e375.gif" alt="지도-참여중인 캠페인 표시 토글" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121494401-ab2d6380-ca13-11eb-8b55-386171fe39fa.gif" alt="지도-참여중인 캠페인 필터링" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121493614-f6934200-ca12-11eb-8273-cd99589bf22d.gif" alt="지도-참여중인 캠페인-캠페인 디테일" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121493252-9c927c80-ca12-11eb-9c43-e527d38f57fe.gif" alt="지도-추천 캠페인" width="200"/>
</div>


### 메인 화면

<div>
  <img src="https://user-images.githubusercontent.com/65283190/121503887-7245bc80-ca1c-11eb-8fde-341b0314ded1.gif" alt="home tab" width="200"/>
   <img src="https://user-images.githubusercontent.com/65283190/121478721-47e80500-ca04-11eb-9530-d7e9ba47f0ea.gif" alt="검색-정렬" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121132498-30761400-c86c-11eb-89b1-48b036affbaf.gif" alt="랭킹-내랭킹 조회" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121504079-a5884b80-ca1c-11eb-8c62-9aabc50cd065.gif" alt="마이페이지" width="200"/>
</div>

<div>
  <img src="https://user-images.githubusercontent.com/65283190/121504900-52fb5f00-ca1d-11eb-816a-f7c1b58f5fa2.gif" alt="마이페이지-나의 캠페인" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121505178-92c24680-ca1d-11eb-9745-c3c5150a6491.gif" alt="마이페이지-참여중인 유저" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121505645-f77da100-ca1d-11eb-9f10-618f06bdf1dd.gif" alt="마이페이지-참여중인 캠페인 필터링" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121505702-03696300-ca1e-11eb-8f20-4ee258d24c60.gif" alt="마이페이지-참여중인 캠페인 현황" width="200"/>
</div>


<div>
  <img src="https://user-images.githubusercontent.com/65283190/121504039-9b664d00-ca1c-11eb-933d-11dff2ee052f.gif" alt="마이페이지-설정" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121504704-2cd5bf00-ca1d-11eb-93e1-dac001067e5e.gif" alt="마이페이지-프로필 편집" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121504512-0748b580-ca1d-11eb-9860-6100a66b0254.gif" alt="마이페이지-신고 목록" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121505071-745c4b00-ca1d-11eb-84a6-9c930b922cff.gif" alt="마이페이지-제작중.. 이벤트" width="200"/>
</div>


### 캠페인 만들기

[![캠페인 등록](https://img.youtube.com/vi/OXuPGZl5Z7M/0.jpg)](https://youtu.be/OXuPGZl5Z7M)
[![핀포인트 등록](https://img.youtube.com/vi/YjfN2tCMwSY/0.jpg)](https://youtu.be/YjfN2tCMwSY)

### 로그인

<div>
  <img src="https://user-images.githubusercontent.com/65283190/121129708-4f72a700-c868-11eb-9ddd-1c8a12372525.gif" alt="로그인-성공" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121130426-5bab3400-c869-11eb-8840-07313d627752.gif" alt="로그인-삭제된 계정" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121130431-5cdc6100-c869-11eb-94e4-697cc455c9cd.gif" alt="로그인-실패" width="200"/>
</div>

<div>
  <img src="https://user-images.githubusercontent.com/65283190/121500625-72908880-ca19-11eb-94f1-fd4eb917ed4b.gif" alt="회원가입" width="200"/>
  <img src="https://user-images.githubusercontent.com/65283190/121500764-90f68400-ca19-11eb-8aaf-adb7d0638516.gif" alt="회원탈퇴" width="200"/>
</div>
  
---
  
### 관리자 페이지

<div>
  <img src="https://user-images.githubusercontent.com/65283190/121508694-d79bac80-ca20-11eb-98c9-5406e188be04.gif" alt="관리자 페이지"/>
  <img src="https://user-images.githubusercontent.com/65283190/121508671-cfdc0800-ca20-11eb-8cc3-d62b30c68a2c.gif" alt="신고접수"/>
</div>




