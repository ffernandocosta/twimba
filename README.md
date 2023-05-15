# Scrimba - Twimba, Twitter's clone feed

This is a project I built during module 5 of Scrimba's JavaScript course. After I was done with the original project I decided to work on the stretch goals I had for this project and implement features like replying to a tweet, like, retweet and delete replies and rendering them dynamically.
## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Video](#video)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Add a replies to a tweet
- Like, retweet and delete a replies
- Click to see replies of tweets
- Delete tweets

### Screenshot

![Screenshot](https://github.com/ffernandocosta/twimba/assets/70672573/36bad35c-881f-469b-942a-1493e8f21747)

### Links

- [Live version](https://animated-sorbet-edc48b.netlify.app)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Grid
- Flexbox
- Mobile first workflow
- JavaScript


### What I learned

- forEach() to iterate over the 'tweetsData' array
- findIndex() to find the matching index of the clicked tweet that the user wants to delete
- data attributes to store extra information in HTML elements
- NOT operator (!) used in this project to flip a boolean to it's reverse current state
- CDNs to add icons to this project and generate UUIDs


```html
  <h1>Some HTML I am proud of</h1>
  
             <div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${reply.handle}</p>
                        <p class="tweet-text">${reply.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${replyLikeIconclass}"
                                    data-reply-like="${reply.uuid}"
                                    id="reply-like-${reply.uuid}"
                                    ></i>
                                <span id="reply-likes-count-${reply.uuid}">
                                    ${reply.likes}
                                </span>
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${replyRetweetIconClass}"
                                data-reply-retweet="${reply.uuid}"
                                id="reply-retweet-${reply.uuid}"
                                ></i>
                                <span id="reply-retweets-count-${reply.uuid}">
                                    ${reply.retweets}
                                </span>
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-regular fa-trash-can"
                                    data-delete-reply-tweet="${reply.uuid}"
                                ></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
```
```css
  .proud-of-this-css {

.tweet-input-area {
    display: flex;
    align-items: flex-start;
    gap: 10px;
}

.tweet-reply-area {
    display: grid;
    gap: 8px;
    grid-template-columns: auto 1fr;
    grid-template-areas: 
    "profile-pic tweet-reply-input"
    "profile-pic tweet-reply-btn"
}

```
```js
const proudOfThisFunc = () => {
  
  function handleDeleteTweetBtnClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    tweetsData.forEach(function(tweet, index){
        
        if(targetTweetObj === tweet){
            tweetsData.splice(index, 1)
        }

    })

    render()
}

function handleDeleteReplyTweetBtnClick(replyId) {
    let targetReplyObj = null;
    
    tweetsData.forEach(function(tweet) {
        const replyIndex = tweet.replies.findIndex((reply) => reply.uuid === replyId);
      
        if (replyIndex !== -1) {
            targetReplyObj = tweet.replies[replyIndex];
            tweet.replies.splice(replyIndex, 1);
        }
    })

    render()
}
```


## Author

<div>
  <a href="https://www.linkedin.com/in/ffernando-costa/?locale=en_US" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="My Linkedin profile"></a>
  <a href="https://twitter.com/ffernandodev" target="_blank"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="My twitter profile"</a>
</div>
