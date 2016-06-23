## Browser compatibility

Source: [Can I use](http://caniuse.com/)<br />
Here is a list of the dependencies used and the specificities of some browser. This list is going to change as new features will be integrated into the project.<br />
To summarize, all the recent browsers of all the vendors are easily handled. Either they already implement a functionality or a polyfill / workaround can be easily provided<br/>
Those browsers are Chrome, Firefox, IE Edge, IE 10, Safari, Opera<br />
IE 9 and IE 8 are more limited: they both don't support sockets natively (needed for pushing notifications to the clients)
IE 8 needs React 0.14 and many specific workarounds to be able to create and run the code


#### Dependencies

###### Core

Core dependencies needed by all the browser

- to run the code
> react: 0.14.8 / 0.15.1<br/>
> react-dom: 0.14.8 / 0.15.1<br/>
> react-redux: ^4.4.5<br/>
> redux: ^3.5.2<br/>
> redux-logger: ^2.6.1<br/>
> redux-thunk: ^2.1.0<br/>

- to build the code
> typescript: ^1.8.10<br/>
> typings: ^1.3.0<br/>
> webpack: ^1.13.1<br/>
> webpack-dev-server: ^1.14.1<br/>
> extract-text-webpack-plugin: ^1.0.1<br/>
> html-webpack-plugin: ^2.21.0<br/>
> source-map-loader: ^0.1.5<br/>
> ts-loader: ^0.8.2<br/>
> css-loader: ^0.23.1<br/>
> node-sass: ^3.7.0<br/>
> sass-loader: ^3.2.0<br/>

- to test the code
> mocha: ^2.5.3<br/>
> jsdom: ^9.2.1<br/>
> ts-node: ^0.9.3<br/>
> expect: ^1.20.1<br/>
> enzyme: ^2.3.0<br/>
> react-addons-test-utils: ^15.1.0<br/>
> redux-mock-store: ^1.1.1<br/>

- to speed up and simplify the development
> es6-promise: ^3.2.1<br/>
> whatwg-fetch<br/>
> immutable: ^3.8.1<br/>

IE9 specific

> no sockets, meaning no notifications (and no hot reloading in development process

IE8 specific

> react 0.14.8 (support has been dropped in 0.15.1)<br/>
> no sockets, meaning no notifications (and no hot reloading in development process)
> es5 shim / sham<br />
> fetch-ie8 instead of whatwg-fetch
> can't use catch in Promise handling
