import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener('click', function(e){
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }
    else if (e.target.dataset.replyLike){
        handleReplyLikeClick(e.target.dataset.replyLike)
    }
    else if (e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if (e.target.dataset.replyRetweet){
        handleReplyRetweetClick(e.target.dataset.replyRetweet)
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
    
    document.getElementById(`tweet-like-${tweetId}`).classList.toggle("liked")
    document.getElementById(`tweet-likes-count-${tweetId}`).textContent = targetTweetObj.likes
    
}

function handleReplyLikeClick(replyId){
    let targetReplyObj = null;
    tweetsData.forEach(function(tweet){
        const replyIndex = tweet.replies.findIndex(function(reply){
            return reply.uuid === replyId
        })

        if (replyIndex !== -1){
            targetReplyObj = tweet.replies[replyIndex];
        
            if(targetReplyObj.isLiked){
                targetReplyObj.likes--
            }
            else {
                targetReplyObj.likes++
            }
            targetReplyObj.isLiked = !targetReplyObj.isLiked
        }
    })

    document.getElementById(`reply-like-${replyId}`).classList.toggle("liked")
    document.getElementById(`reply-likes-count-${replyId}`).textContent = targetReplyObj.likes

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
    
    document.getElementById(`tweet-retweet-${tweetId}`).classList.toggle("retweeted")
    document.getElementById(`tweet-retweets-count-${tweetId}`).textContent = targetTweetObj.retweets
}

function handleReplyRetweetClick(replyId){
    let targetReplyObj = null;
    
    tweetsData.forEach(function(tweet){
      const replyIndex = tweet.replies.findIndex(function(reply){
        return reply.uuid === replyId
      })

      if (replyIndex !== -1) {
        targetReplyObj = tweet.replies[replyIndex];
        if(targetReplyObj.isRetweeted){
            targetReplyObj.retweets--
        }
        else {
            targetReplyObj.retweets++
        }
        targetReplyObj.isRetweeted = !targetReplyObj.isRetweeted
      }
    })

    document.getElementById(`reply-retweet-${replyId}`).classList.toggle('retweeted')
    document.getElementById(`reply-retweets-count-${replyId}`).textContent = targetReplyObj.retweets


}

function handleReplyClick(replyId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === replyId
    })[0]

    document.getElementById(`replies-${replyId}`).innerHTML = getHtmlReplies(targetTweetObj);
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
            likes: 0,
            retweets: 0,
            tweetText: tweetReplyInput.value,
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })

        tweetReplyInput.value = ''

        document.getElementById(`replies-${tweetId}`).innerHTML = getHtmlReplies(targetTweetObj);
        document.getElementById(`tweet-replies-count-${tweetId}`).textContent = targetTweetObj.replies.length
    }
}

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
                            <span id="tweet-replies-count-${tweet.uuid}">
                            ${tweet.replies.length}
                            </span>
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${likeIconClass}"
                            data-like="${tweet.uuid}"
                            id="tweet-like-${tweet.uuid}"
                            ></i>
                            <span id="tweet-likes-count-${tweet.uuid}">
                            ${tweet.likes}
                            </span>
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${retweetIconClass}"
                            data-retweet="${tweet.uuid}"
                            id="tweet-retweet-${tweet.uuid}"
                            ></i>
                            <span id="tweet-retweets-count-${tweet.uuid}">
                            ${tweet.retweets}
                            </span>
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
            </div>
        </div>
        `
    })
    
    return htmlFeed
}

function getHtmlReplies(tweetId){
        
    let repliesHtml = ''
    
    if (tweetId.replies.length > 0){
    
        tweetId.replies.forEach(function(reply){

            let replyLikeIconclass = ''
            
            if (reply.isLiked){
                replyLikeIconclass = 'liked'
            }

            let replyRetweetIconClass = ''

            if (reply.isRetweeted){
                replyRetweetIconClass = 'retweeted'
            }

            repliesHtml += `
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
            `
        }
    )}

    return repliesHtml
}

function render(){
    document.getElementById('feed').innerHTML = getHtmlFeed();
}

render()