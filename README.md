# Event Loop

Javascript is a single threaded language. It has one callback and one memory heap. It's synchronous but sometime it behavior like asynchronous. This is because a concept called Event Loop in JavaScript.

## How does JavaScript even work?

Because of JavaScript is synchronous, that means it executes code in order and must finish executing a piece code before moving onto the next. That cause the executing problem called blocking. Blocking is known as the execution delay of the following instructions until the previous one is completed. What's a time consuming! So, my intelligent browsers provide us Event Loop concept to solve this time problem.

## What is Event Loop exactly?

Basically, we have JavaScript Runtime as V8, WebAPIs and Event Loop.
- JavaScript Runtime has 'heap' and 'stack'.
- Browser also provides us the addition called 'WebAPIs'.
- We have something called 'Event Loop' and 'Callback Queue'.

![N|Solid](https://miro.medium.com/max/720/1*iHhUyO4DliDwa6x_cO5E3A.gif)

Now we get started with Event Loop concept. First of all, let's talk about how our JavaScript code is runned on the browser. As mentioned, our code will be executed sequentially. The code will be moved from 'head' to 'stack'. So, what happens when we run the code like that:

Besides, we also have Render Queue to 
```
console.log('Hi');

setTimeout( function cb () {
    console.log('there');
}, 5000);

console.log('JSConfEU');
```

If JavaScript is synchronous, the result must be like:

> Hi

> there

> JSConfEU

But it's not like that. The exact result we are received is:

> Hi

> JSConfEU

> there

This happens because of Event Loop. We have setTimeout function in the code, when browser run this function, the code will be executed at WebAPIs part at least 5000ms. So Stack now is empty, so the following code lines are executed. The result of the code line as 'console.log('JSConfEU');' display before 'console.log('there');'. After at least 5000ms, the task as cb() function will be move to Task Queue (similar to Callback Queue) and then move to Stack to be executed.

Besides Task Queue and Callback Queue, we also have Render Queue to set priority for some tasks. This is because these tasks must be executed before. For example, we usually want to render layout of the website before its functions.
