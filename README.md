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
pageProps: (server side 를 통해) 모든 props 을 해당 컴포넌트(page)로 보냄
```

여기서 `<NavBar />` 등의 고정된 컴포넌트나 global styles 등을 설정해줄 수 있다.

또한 `globals.css` 파일은 `index.js` 로 import 할 수 없다. 에러가 발생한다.

```
// error
Global CSS cannot be imported from files other than your Custom <App>.
```

컴포넌트 내에 css 를 import 하고 싶다면 반드시 module 이어야 한다.

하지만 Custom App 컴포넌트가 있는 곳 (`_app.js`) 이라면 모든 global styles 를 import 할 수 있다.

<br />
<br />

## next.config.js - redirects & rewrites

### redirects

<strong>redirects</strong> 는 말 그대로 특정 url 을 다른 url 로 redirects 해주는 것으로 유저가 url 이 변경되는 것을 확인할 수 있다.

```jsx
// next.config.js

  async redirects() {
    return [
      {
        source: "/contact/:path*",
        destination: "/form/:path*",
        permanent: false, // 브라우저 및 검색 엔진의 정보 기억 유무
      },
    ];
  },
```

위와 같이 작성하고서 실제 url 을 입력해본다면 유저는 아래와 같이 redirects 해주는 것을 알 수 있다.

```
// 입력
http://localhost:3000/contact

// redirects
http://localhost:3000/form
```

```
// path 가 있는 경우

// 입력
http://localhost:3000/contact/123141

// redirects
http://localhost:3000/form/123141
```

</br>

### rewrites

<strong>rewrites</strong> 는 유저를 redirect 시키지만 url 은 변하지 않는다.

이런 특성으로 인해 유저에게 노출시키고 싶지 않은 API KEY 등의 중요 정보를 유저에게 보여주지 않으면서 페이지 전환이 가능하다.

```jsx
// next.config.js

  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
```

API_KEY 변수는 env 파일에 담고 .gitignore 에 추가 시켜준다.

```jsx
// 영화 데이터 fetching

useEffect(() => {
  (async () => {
    const { results } = await (await fetch(`/api/movies`)).json();
    setMovies(results);
  })();
}, []);
```

이렇게 한다면 새로고침 후 영화 데이터를 가져올 때 개발자 도구 network 탭에서도 api key 가 보이지 않아 우리의 정보를 숨길 수 있다.

</br>

+) 주소에 한글이 들어가거나 &를 사용하여 파라미터를 여러 개 붙여 요청하게 된다면

`encodeURI` 를 사용하면 된다.

```
// before
destination: `http://localhost/api/foo=bar&key=val`

// after
destination: encodeURI(`http://localhost/api/foo=bar&key=val`)
```

<br />
<br />

## Dynamic Routes

Next.js 에서는 React.js, CRA 환경과는 다르게 react-router-dom 이 필요 없다. 폴더와 파일 이름으로 routing 이 결정 된다.

예를 들어 `/moives/all` 이라는 url 을 만들어주고 싶다면 아래와 같이 생성한다.

```
pages 폴더 > movies 폴더 > all.js 파일 생성

../pages/movies/all.js
```

그런데 `movies/all` 뿐만 아니라 `/movies` 도 만들어주고 싶다면 아래와 같이 생성한다.

```
pages 폴더 > movies 폴더 > index.js 파일 생성

../pages/movies/index.js
```

정리하자면 movies 폴더 하위에 index.js 는 `/movies` 경로가 되며

all.js 는 `/movies/all` 경로가 된다.

</br>

그렇다면 url 에 변수가 필요하다는 것은 어떻게 알려주어야 할까.

아래와 같이 파일을 생성해준다.

```
pages 폴더 > movies 폴더 > [id].js 파일 생성

../pages/movies/[id].js
```

해당 [id].js 파일은 `/movies/1213` 등의 경로 페이지를 보여줄 페이지가 된다.

정리하자면 Next.js 에게 이것이 변수를 포함하는 Dynamic URL 이다는 것을 알려주는 방법은 `[id].js` 같이 대괄호로 파일 이름을 지정해주어야 한다.

</br>

### page navigation

페이지를 이동할 때에는 2가지 방법을 사용할 수 있다.

1. Link & a tag

```jsx
<h4>
  <Link href={`/movies/${movie.id}`} key={movie.id}>
    <a>{movie.original_title}</a>
  </Link>
</h4>
```

2. useRouter push method (유저가 form 등 제출 시 자동으로 navigating 해주고자 할 때)

```jsx
const router = useRouter();
const onClick = (id) => {
  router.push(`/movies/${id}`);
};

...

  <div
    onClick={() => {
      onClick(movie.id);
    }}
    className="movie"
    key={movie.id}
  >
```

그 외에도 url 에 현재 정보를 숨겨 보낼 수 있는 방법도 있다.

url 에서 url 로 state 를 넘겨주는 방법과 넘긴 정보를 유저로부터 숨기는 방법도 배워본다.

우리가 router.push 를 할 때는 url 을 string 으로 보낼 수도 있지만 객체로도 보내줄 수 있다.

```jsx
// string
const onClick = (id) => {
  router.push(`/movies/${id}`);
};

// object
const onClick = (id) => {
  router.push({
    pathname: `/movies/${id}`,
    query: {
      title: "potatos",
    },
  });
};
```

객체로 보냈을 때 브라우저 상에서는 다음과 같이 확인되는 것을 알 수 있다.

movie id 와 query 를 확인할 수 있다.

```
http://localhost:3000/movies/985939?title=potatos
```

하지만 위처럼 title 이 url 에 보이는 형태는 보기 좋지도 않고 유저에게 필요하지 않으니 숨기는 것이 좋을 듯 하다.

그 때 필요한 router.push method 의 option 이 as 이다.

as 는 브라우저 url 을 마스킹한다. (@param as — masks url for the browser)

객체 상태에서는 아래와 같이 마스킹 처리 해줄 수 있다.

```jsx
const onClick = (id, title) => {
  router.push(
    {
      pathname: `/movies/${id}`,
      query: {
        title,
      },
    },
    `/movies/${id}`
  );
};
```

그리고 2번 방법은 1번에서도 적용시켜줄 수 있다.

```jsx
<h4>
  <Link
    href={{
      pathname: `/movies/${movie.id}`,
      query: {
        title: movie.original_title,
      },
    }}
    as={`/movies/${movie.id}`}
  >
    <a>{movie.original_title}</a>
  </Link>
</h4>
```
