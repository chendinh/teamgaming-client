import React, { Fragment } from 'react';

import './Message.scss';

import ReactEmoji from 'react-emoji';

const typeColorDefault = {
    0: 'backgroundOrange',
    1: 'backgroundGreen',
    2: 'backgroundOrange'
}

const Message = ({ message: { text, user, userAvatar, typeColor}, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <Fragment>
            <p className="sentText justifyEnd">{user}</p>
            <div className="messageContainer justifyEnd">
                {userAvatar && 
                    <div className='infor-user'>
                        <img src={userAvatar} className="user-avatar" />
                    </div>
                }
                <div className={`messageBox backgroundBlue ${typeColor && 'max-width'}`}>
                    <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        </Fragment>
        )
        : (
            <Fragment>
                <p className="sentText justifyStart ">{user}</p>
                <div className="messageContainer justifyStart">
                    <div className={`messageBox backgroundLight ${typeColor && 'max-width ' + typeColorDefault[typeColor] }`}>
                    <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                    </div>
                    {userAvatar && 
                        <div className='infor-user'>
                            <img src={userAvatar} className="user-avatar" />
                        </div>
                    }
                </div>
            </Fragment>
        )
  );
}

export default Message;