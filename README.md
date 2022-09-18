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

<br/>

파일 내에서 jsx 를 사용 중이라면 파일 확장자를 .jsx 라고 해줄 필요가 없다.

또한 `import React from 'react'` 를 할 필요도 없다.