import React, { useContext, useEffect, useState } from 'react'
import '../../css/common.css'
import '../../css/index.css'
import QuizAnime from './QuizAnime'
import Groups from './Groups'
import Chart from 'react-google-charts'
import { FireContext } from '../contexts/FireContext'
import { UserAuthContext } from '../contexts/UserAuthContext'
import { GroupContext } from '../contexts/GroupContext'

const Profile = () => {
  const [showAnime, setShowAnime] = useState(false)
  const { getUserInfo } = useContext(FireContext)
  const { userData, updateUserData } = useContext(UserAuthContext)
  const { groupName } = useContext(GroupContext)
  useEffect(()=>{
    getUserInfo(userData.uid, updateUserData)
  }, [userData.uid])
  return (
    <>      
        <QuizAnime animeClass={showAnime ? 'anime' : 'hide'} />
        <div className={showAnime ? 'hide' : 'proContainer container'}>
          <Groups />
          <div className='profile'>
            <div className='profileZone'>
              <div className='profile-header'>會員資料</div>
              <div className='profile-text'>會員姓名： {userData['NAME']}</div>
              <div className='profile-text'>帳號： {userData['ID']}</div>
              <div className='profile-text'>累計答對： {userData[groupName + 'rightCounter']}</div>
              <div className='profile-text'>累計答錯： {userData[groupName + 'wrongCounter']}</div>
            </div>
          </div>
          <Chart
            width={'500px'}
            height={'300px'}
            chartType='PieChart'
            loader={<div>Loading Chart</div>}
            data={[
              ['Task', 'Hours per Day'],
              ['答對',
              userData[groupName + 'rightCounter']
              ],
              ['答錯',
              userData[groupName + 'wrongCounter']
              ]
            ]}
            options={{
              title: '你的答題正確率',
              is3D: true,
              colors: ['skyblue', '#ffe65d'],
              animation: {
                duration: 1000,
                easing: 'out',
                startup: true
              },
              enableInteractivity: false
            }}
            chartEvents={[
              {
                eventName: 'animationfinish'
              }
            ]}
            rootProps={{ 'data-testid': '2' }}
          />
        </div>
      </>
  )
}

export default Profile