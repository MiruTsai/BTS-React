import React from 'react'

const GetTicketGuide = (props) => {
    return (
        <div className={props.guideClass}>
            <div className='guideBoard'>
                <div className='tips'>模擬搶票說明</div>
                <div className='row'>
                    <div className='noteText'>進入頁面後會先見到11:59，因為一般搶票時間都訂在中午12:00。<br />
                        請耐心等待片刻，12:00搶票頁面即會開啟。</div>
                    <img className='preGuidePic' src='../../img/guide/countdown.jpg' />
                </div>
                <div className='row'>
                    <div className='noteText'>時間到，答題頁出現，請抓準時間答題。</div>
                    <img className='preGuidePic' src='../../img/guide/quizs.jpg' />
                </div>
                <div className='row'>
                    <div className='noteText'>送出後請耐心等候，<br />讓系統根據答案及回答時間判斷有沒有搶到票券。</div>
                    <div className='loadingGif'>
                    <img src='../../img/loading.gif' />
                    </div>
                </div>
                <div className='noteFinish'>說明到此結束，準備好了嗎？
                <button className='preGuideButton' onClick={props.closeGuide}>準備好了</button>
                </div>
            </div>
        </div> 
    )
}

export default GetTicketGuide