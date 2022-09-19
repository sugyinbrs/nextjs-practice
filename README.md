# Let's dive in Next JS !

## Pages 폴더

Next.js 에서는 pages 폴더 하위 파일 명에 따라 route 및 url의 이름이 결정된다.

파일의 함수(컴포넌트) 이름은 중요하지 않다.

중요한 것은 함수가 default 로 export 되는 것이다.

```
// index.js
localhost:3000

// about.js
localhost:3000/about

// aboutUs.js
localhost:3000/aboutUs
```

<br />

파일 내에서 jsx 를 사용 중이라면 파일 확장자를 .jsx 라고 해줄 필요가 없다.

또한 `import React from 'react'` 를 할 필요도 없다.

<br />
<br />

## Static Pre Rendering

CRA (Clinet-Side-Rendering) 를 하는 React.js 와는 다르게

미리 렌더링 하여 페이지 로딩 시 페이지를 구성하는 html 정보를 가져와서 보여준다.

<br />

CRA 는 브라우저가 html 을 가져올 때 비어있는 div 로 가져온다는 것을 의미한다.

CRA 상에서는 네트워크 환경이 느린 환경에서는 아무 것도 없는 흰 화면만 보이다가

React.js 코드가 왔을 때야 비로소 UI 를 볼 수 있다.

```jsx
// source code 상

<div id="root"></div>
```

반면 Next.js 로 만들어진 페이지에서는 네트워크 환경이 늘거나 자바스크립트가 완전히 비활성화 되어 있어도

유저는 html 을 볼 수 있다.

```jsx
// source code 상

<div id="__next">
  <div>
    <h1>Hello</h1>
  </div>
</div>
```

<br />

### hydration

index.js 에 1을 더하는 버튼을 구현한 코드를 작성한 후 소스 코드를 보면

해당 코드가 초기 상태로 미리 렌더링 되어 온 것을 알 수 있다.

```jsx
// source code 상

<div id="__next"><div><h1>Hello <!-- -->0</h1><button>+</button></div></div>
```

Next.js 는 React.js 를 백엔드에서 동작시켜서 페이지를 미리 만들게 되는데

이 때 component 를 render 하게 되고

rendering 이 끝나면 html 이 되며 Next.js 는 그 html 을 페이지 소스코드에 넣는다.

유저는 자바스크립트와 React.js 가 로딩되지 않았더라도 콘텐츠를 볼 수 있다.

그 후 React.js 가 로딩 되었을 때, 기본적으로 이미 존재하는 것들과 연결이 되어서

우리가 아는 React.js 앱이 된다.

이것을 `hydration` 이라고 한다.

<br />
<br />

## Custom App

Next.js parsing 순서는 아래와 같다.

`_app.js -> index.js`

<br />

`_app.js` 는 프레임워크 내에 설정된 고정된 파일명으로

해당 파일 내에 코드를 작성하면 Next.js 가 가장 먼저 읽는 특징이 있다.

해당 파일 내의 함수를 읽는데 `Component`, `pageProps` 라는 2개의 prop을 함께 읽는다.

```md
Component: 렌더링 하길 원하는 파일 내의 함수
pageProps: 모든 props 을 해당 컴포넌트로 보냄
```

여기서 `<NavBar />` 등의 고정된 컴포넌트나 global styles 등을 설정해줄 수 있다.

또한 `globals.css` 파일은 `index.js` 로 import 할 수 없다. 에러가 발생한다.

```
// error
Global CSS cannot be imported from files other than your Custom <App>.
```

컴포넌트 내에 css 를 import 하고 싶다면 반드시 module 이어야 한다.

하지만 Custom App 컴포넌트가 있는 곳 (`_app.js`) 이라면 모든 global styles 를 import 할 수 있다.
