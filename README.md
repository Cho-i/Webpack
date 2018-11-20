# Webpack
왜 파일을 하나로 합칠까? -> http요청이 비효율적

`http/2`에서는 하나의 커넥션에 동시에 여러 파일들을 요청할 수 있음. 하지만 아직 보편화되어있지 않기 때문에  현재 주로 사용하는 `http/1.1`에서는 커넥션 하나를 열어 하나씩 요청을 보내야함. 하나의 요청이 끝나야 다음 요청을 보낼 수 있기 때문에 요청이 많을수록 비효율적.

그래서 요청 수를 줄인다. 이미지는 스프라이트로 만들어 한번에 받고, 걸프, 그런트같은 번들러로 js파일이나 css파일을 하나로 합치곤 함. 그러다 웹팩이 나옴.![undefined](https://cdn.filepicker.io/api/file/QIuZVivBTFWIu8LN9i3E)

웹페이지를 구성하는 수많은 요소(html, js, css 파일 외에도, 웹폰트, 이미지, json 데이터 등)를 파일 하나로 압축하여 웹페이지의 `request` 를 줄일 수 있도록 도와주는 `Gulp`, `Grunt` 와같은 **모듈 번들러**

1. 파일을 압축 및 난독화 해주고 크로스 브라우징도 대응해주어 굉장히 편리한점이 많다.
2. `Javascript` 가 클라이언트단 서버단 모두에서 대세가 된 만큼 수많은 의존관계가 생기면서 이것들을 하나의 파일로 압축 및 병합해주어 의존성 관리를 효과적으로 할수 있다.
3. 파일이 너무 많거나 용량이 클 경우, 개발자 마음대로 번들링할 파일 수를 정하여 자유롭게 설정을 할 수 있다.
4. 현재 `Webpack 4` 까지 릴리스 되었는데 `Webpack 1~3` 에서 추가 및 수정, 삭제를 보완하여 빠르게 업데이트를 해주고 있다.
5. 기본적으로 `ES6` 에서 추가된 모듈 시스템 개념(`import`, `require`, `export` 등)과 `Node.js`, `npm` 을 쓸 줄 알아야 한다.



파일명이 `webpack.config.js`여야 웹팩이 바로 인식함. 이름을 다르게 하고 싶으면 `webpack --config webpack.config.prod.js`라고 `--config` 플래그를 사용해 경로를 알려주면 됨.



- **resolve**

웹팩이 알아서 경로나 확장자를 처리할 수 있게 도와주는 옵션. `modules`에 `node_modules`를 넣어야 디렉토리의 `node_modules`를 인식할 수 있음. 그리고 `extensions`에 넣은 확장자들은 웹팩에서 알아서 처리해주기 때문에 파일에 저 확장자들을 입력할 필요가 없어짐.

- **mode**

웹팩4에서 추가됨.

`mode`가 `development`면 개발용, `production`이면 배포용. 배포용일 경우에는 알아서 최적화가 적용됨.

- **entry**

`entry` 부분이 웹팩이 파일을 읽어들이기 시작하는 부분. `app`이 객체의 키로 설정되어 있는데 이 부분 이름은 자유롭게 바꾸면 됨.

```json
{
    entry:{
        app:'파일경로',
        zero:'파일경로'
    }
}
```

위와 같이 하면 `app.js`, `zero.js` 두 개가 생성됨. 결과물로 여러 js를 만들고 싶을 때 저렇게 구분해주면 됨. 보통 멀티페이지 웹사이트에서 `entery`를 여러 개 넣어줌.

```json
{
    entry:{
        app:['a.js','b.js']
    }
}
```

위의 경우는 하나의 `entry`에 여러 파일들을 넣고 싶을 때 위처럼 배열 사용.

`a.js`랑 `b.js`가 한 파일로 엮여 `app.js`라는 결과물로 나옴. 이렇게 웹팩은 `entry`의 js 파일부터 시작해서 import, require 관계로 묶어진 다른 js까지 알아서 파악한 뒤 모두 `entry`에 기재된 키 개수만큼으로 묶어줌.

js 파일 대신 `npm` 모듈을 넣어도 됨. 보통 `@babel/polyfill`이나 `eventsource-polyfill`같은 것들을 적용할 때 다음과 같이 함.

```json
{
    entry:{
        vendor:['@babel/polyfill','eventsource-polyfill','react','react-dom'],
        app:['@babel/polyfill','eventsource-polyfill','./client.js'],
    }
}
```

`app.js`와 `vendor.js`가 결과물로 나옴. 이렇게 하면 각각의 엔트리가 polyfill들이 적용된 상태로 output으로 나옴. IE 환경에서 최신 자바스크립트를 사용해 개발하고 싶다면 저 두 폴리필을 npm에서 다운 받은 후 저렇게 모든 엔트리에 넣어주어야 함.

- **output**

```json
{
    output:{
        path:'/dist',
        filename:'[name].js',
        publicPath:'/'
    }
}
```

**path**는 output으로 나올 파일이 저장될 경로. **publicPath**는 파일들이 위치할 서버 상의 경로.

**filename**에 [name].js 이렇게 써줘야 [name]에 아까 entry의 app이나 vendor가 들어가 app.js, vendor.js로 결과물이 나옴.

- **loader**

보통 웹팩을 사용하면 babel을 주로 같이 사용함. ES2015 이상의 문법들은 IE같은 구형 브라우저랑 호환시키기 위함. 또는 jsx같은 react 문법을 컴파일하려고 하는 목적도 있음.

```json
{
    module:{
        rules:[{
            test:/\.jsx?$/,
            loader:'babel-loader',
            options:{
                presets:[
                    [
                        '@babel/preset-env',{
                            targets:{node:'current'},
                            modules:'false'
                        }
                    ],
                    '@babel/preset-react',
                    '@babel/preset-stage-0'
                ],
            },
            exclude:['/node_modules'],
        }],
    },
}
```

modules를 false로 해야 **트리 쉐이킹**이 됨(ES2015 모듈 시스템 import되지 않은 export들을 정리해주는 기능).

**test** 정규식조건에 부합하는 파일들을 **loader**에 지정한 로더가 컴파일해줌. **options**는 로더에 대한 옵션으로 설치한 **preset**들을 적용하고 있음. **exclude**는 제회할 폴더나 파일로, 바벨로 컴파일하지 않을 것들을 지정해줌. 바벨로는 컴파일하지 않지만 웹팩으로는 컴파일함. 반대로 **include**로 꼭 이 로더르르 사용해서 컴파일 할 것들을 지정해 줄 수도 있음.

- **plugin**

plugin은 부가적인 기능. 이를 사용하면 효과적으로 번들링을 할 수 있음.

```json
{
    plugins:[
        new webpack.LoaderOptionsPlugin({
            minimize:true,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify('production'),
        }),
        new webpack.EnvironmentPlugin(['NIDE_ENV']),//요즘은 위의 DefinePlugin보다 이렇게 하는 추세
    ],
}
```

- **optimization**

웹팩4에서 최적화 관련 플러그인들이 모두 이쪽으로 통합.

```json
{
    optimization:{
        minimize:true/false,
        splitChunks:{},
        concatenateModules:ture,
    }
}
```



***entry에서 시작해서 loader과 plugin의 가공 과정을 거쳐 output으로 나오는 것.***

***entry의 파일들부터 시작해서 import나 require로 엮어진 모든 js들을 하나 또는 소수의 파일로 묶음.***



import나 require로 css, image, html, font 파일도 묶을 수 있음.

- **css를 style 태그로**

```json
{
    module:{
        rules:[{
            //babel-loader
        },{
            test:/\.css$/,
            use:['style-loader','css-loader'],
        }],
    }
}
```

`css-loader`는 css파일들을 읽어주고 `style-loader`는 읽은 css파일들을 style태그로 만들어 head 태그 안에 넣어줌.

여러 개의 로더를 동시에 사용할 때는 use를 사용.

entry의 js파일 상단에서 `require('app.css');`를 하면 알아서 읽어 style 태그로 만들어줌.

- **css 파일 따로**

style 태그 대신 css파일로 만들고 싶은 경우에 **extract-text-webpack-plugin**을 사용.

```json
const ExtractTextPlugin = require('extract-text-webpack-plugin');
{
    module:{
        rules:[{
            //babel-loader
        },{
            test:/\.css$/,
            use:ExtractTextPlugin.extract({
                fallback:'style-loader',
                use:'css-loader'
            }),
        }],
    },
    plugins:[
        new ExtractTextPlugin({
            filename:'app.css',
        });
    ]
}
```

fallback은 이 플러그인이 실패했을 때 대안으로 `style-loader`가 작동함을 의미.

use는 `css-loader`를 거친 후 **extract-text-webpack-plugin**으로 파일을 추출.

webpack을 실행하면 output에서 설정한 path 경로에 app.css라는 파일이 생김. 그 파일을 기존에 css를 넣던 방식대로 link 태그로 head에 넣어주면 됨.

- **기타 파일 번들링**

**file-loader**는 특정 파일을 그대로 내보내줌.

**url-loader**는 설정한 사이즈보다 작은 이미지나 폰트 파일을 인라인화 함.

```json
{
    module:{
        rules:[{
            //babel loader css loader ...
        },{
            test:/\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader:'url-loader',
            options:{
                name:'[hash].[ext]',
                limit:10000,
            },
        }],
    }
}
```

**limit**(바이트 단위)보다 작은 파일은 base64로 인코딩해서 인라인화.

name에서는 output처럼 `[hash],[name]`등을 쓸 수 있음. `[ext]`는 현재 확장자를 그대로 하겠다는 뜻.

**limit**보다 큰 파일은 알아서 `file-loader`가 처리하여 파일로 내보내주기 때문에 결과물 이름을 적어줌.

js 파일에서  `require('./이미지경로/zero.png')`같이 하면 알아서 인라인화하거나 파일로 만들고 경로도 알아서 연결해줌.

ex) 리액트의 경우 `<img src={require('이미지경로')}>`




참고 : https://www.zerocho.com/category/Webpack/post/58aa916d745ca90018e5301d