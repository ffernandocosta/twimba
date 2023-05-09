import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener('click', function(e){
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }
    else if (e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if (e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if (e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
    else if (e.target.dataset.replyButton){
        handleReplyTweetBtnClick(e.target.dataset.replyButton)
    }
    else if (e.target.dataset.deleteTweet){
        handleDeleteTweetBtnClick(e.target.dataset.deleteTweet)
    }
    else if (e.target.dataset.deleteReplyTweet){
        handleDeleteReplyTweetBtnClick(e.target.dataset.deleteReplyTweet)
    }

})  

function handleLikeClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
    document.getElementById(`tweet-reply-area-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input');
    
    if (tweetInput.value){
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `assets/images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
        render()
        tweetInput.value = ''
    }
}

function handleReplyTweetBtnClick(tweetId){
    const tweetReplyInput = document.getElementById(`tweet-reply-input-${tweetId}`);
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if(tweetReplyInput.value){
        targetTweetObj.replies.unshift({
            handle: `@Scrimba`,
            profilePic: `assets/images/scrimbalogo.png`,
            tweetText: tweetReplyInput.value,
            uuid: uuidv4()
        })
        render()
        tweetReplyInput.value = ''
    }
}

function handleDeleteTweetBtnClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    console.log(targetTweetObj)

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
    });
    console.log(targetReplyObj);
    render();
  }
  



function getHtmlFeed(){
    
    let htmlFeed = ``

    tweetsData.forEach( (tweet) =>{

        let likeIconClass = ''

        if(tweet.isLiked){
            likeIconClass = 'liked'
        }

        let retweetIconClass = ''

        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }

        let repliesHtml = ''
        if (tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml += `
                <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                                <div class="tweet-details">
                                    <span class="tweet-detail">
                                        <i class="fa-solid fa-heart ${likeIconClass}"
                                            data-reply-like="${reply.uuid}"
                                        ></i>
                                        ${reply.likes}
                                    </span>
                                    <span class="tweet-detail">
                                        <i class="fa-solid fa-retweet ${retweetIconClass}"
                                        data-reply-retweet="${reply.uuid}"
                                        ></i>
                                        ${reply.retweets}
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
                `
            })
        }
        
        htmlFeed += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots"
                            data-reply="${tweet.uuid}"
                            ></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${likeIconClass}"
                            data-like="${tweet.uuid}"
                            ></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${retweetIconClass}"
                            data-retweet="${tweet.uuid}"
                            ></i>
                            ${tweet.retweets}
                        </span>
                        <span class="tweet-detail">
                        <i class="fa-regular fa-trash-can"
                            data-delete-tweet="${tweet.uuid}"
                        ></i>
                        </span>
                    </div>   
                </div>            
            </div>
            <div class="hidden tweet-reply-area" id="tweet-reply-area-${tweet.uuid}">
                <img src="/assets/images/scrimbalogo.png" class="profile-pic">
                <textarea 
                    id="tweet-reply-input-${tweet.uuid}"
                    placeholder="Tweet your reply"
                    class="tweet-reply-input"
                ></textarea>
                <button 
                    id="tweet-reply-btn-${tweet.uuid}"
                    class="tweet-reply-btn"
                    data-reply-button="${tweet.uuid}"
                >Tweet</button>
            </div>
            <div class="hidden" id="replies-${tweet.uuid}">
                ${repliesHtml}
            </div>
        </div>
        `
    })
    
    return htmlFeed

}

function render(){
    document.getElementById('feed').innerHTML = getHtmlFeed();
}

render();