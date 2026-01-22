# DadaChat Dashboard

고객 문의를 실시간으로 확인하고 응답할 수 있는  
**관리자 전용 웹 대시보드**입니다.

외부 웹사이트에 삽입된 DadaChat 위젯으로부터 전달된 문의를  
관리자가 한 화면에서 효율적으로 관리할 수 있도록 설계되었습니다.

※ Render Free Tier 환경으로 서버가 슬립 중일 경우,  
첫 요청 시 서버가 깨어나는 데 시간이 걸릴 수 있습니다.

---

## System Overview

DadaChat은 아래 3개의 독립적인 애플리케이션으로 구성된 웹 CS 관리 서비스입니다.

- **Widget**: 외부 웹사이트에 삽입되는 고객 문의 UI
- **Dashboard**: 관리자가 문의를 확인하고 응답하는 관리자 화면
- **Backend API**: 인증, 데이터 저장, 실시간 통신을 담당하는 서버

이 레포지토리는 그 중 **Dashboard** 영역을 담당합니다.

---

## Demo

- Dashboard URL: https://chat-dashboard-azure.vercel.app
  (비로그인 시, 로그인페이지로 이동)
- Dashboard Landing URL: https://chat-dashboard-azure.vercel.app/landing
  (위젯 확인 및 위젯 채팅 가능)

### Test Account

아래 계정으로 대시보드를 자유롭게 체험할 수 있습니다.

- Email: test@dadachat.com
- Password: test1234

※ 포트폴리오 확인을 위한 테스트 계정(회사 담당자, AGENT)입니다.

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Zustand
- Socket.io Client

---

## Key Features

### 1. 실시간 채팅 관리

- 위젯에서 전송된 메시지를 실시간으로 수신
- 여러 채팅방을 동시에 관리 가능한 구조

### 2. 채팅 목록 / 채팅방 분리 UI

- 좌측: 채팅 목록
- 우측: 선택된 채팅방 상세 화면
- 추후 모바일 환경 확장을 고려하여,
  채팅 목록과 채팅방 상세 화면은
  페이지 분리가 더 적합하다고 판단

### 3. 읽음 처리 로직 분리

- 채팅방에 진입한 상태에서는
  새로운 메시지가 오면, 읽음 처리 및 채팅목록 재호출
- 채팅 목록 화면과 채팅방 화면의 상태를 구분하여 관리

### 4. 인증 기반 로그인 유저만 접근

- 관리자만 접근 가능한 대시보드 구조
- 테스트 계정은 포트폴리오 확인 용도로만 제공

---

## State Management

### 인증 상태 (Auth)

- 관리자 로그인 및 인증 정보를 전역 상태로 관리
- 로그인 여부 및 권한(Role) 따라 접근 가능한 페이지 제어
- 인증 토큰을 기반으로 API 요청 처리

### UI 지속 상태 (Lnb)

- 사이드바 열림 / 닫힘 상태를 `localStorage`에 저장
- 페이지 새로고침 이후에도 사용자 설정 유지
- 단순 UI 상태이므로 서버와는 분리하여 관리 (Zustand의 `persist`)

### 채팅 상태 (Chat)

- 채팅 관련 상태를 전역 스토어로 관리
  - 채팅방 목록
  - 현재 선택된 채팅방
  - 메시지 목록
- 컴포넌트 간 상태 공유를 단순화하고 prop drilling을 방지
