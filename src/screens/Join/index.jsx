import React, { Fragment, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import _ from 'lodash'
import axios from 'axios';

import './Join.scss'
// const ENDPOINT_API = 'http://localhost:5050';
const ENDPOINT_API = 'https://teamgaming.herokuapp.com/'
const defaultState = {
    name: '',
    room: 'Sãnh chờ',
    image: '',
    isValidInfo: -2,
    errorInfo: {
        name: '',
        room: ''
    },
    levelError: 0
}

const defaultImageAvatar = 'https://images.dog.ceo/breeds/dane-great/n02109047_23483.jpg'

const Join = (props) => {
    const [name, setName] = useState(defaultState.nane)
    const [room, setRoom] = useState(defaultState.room)
    const [image, setImage] = useState(defaultState.image)
    const [isValidInfo, setIsValidInfo] = useState(defaultState.isValidInfo);
    const [errorInfo, setErrorInfo] = useState(defaultState.errorInfo);
    const [, rerender] = useState()

    useEffect(() => {
        let imageTemp

        axios.get('https://dog.ceo/api/breeds/image/random')
        .then((res) => {
            if (res && res.data && res.data.message) {
                imageTemp = res.data.message
                console.log(res);
            }
        })
        .catch((error) => {
            setImage(defaultImageAvatar)
            console.log(error);
        })

        const timeout = setInterval(() => {
            setImage(imageTemp)
        }, 1000)


        return () => {
            clearInterval(timeout)
        }
    },[])


    useEffect(() => {
        setErrorInfo(defaultState.errorInfo)
        rerender({})
    }, [name])

    const handleOnChangeUsername = event => event.target && setName(event.target.value);

    const handleOnChangeRoom = event => event.target && setRoom(event.target.value);

    const checkingValidation = async () => {
        try {
            let isValid = true, errorInformation = {};
            let userInfo = {
                name: _.toLower(_.trim(name)),
                room: _.trim(room)
            }

            // if (/\s/.test(userInfo.name)) {
            //     errorInformation = {...errorInformation, name: 'Nhập tên hông có khoảng trắng giúp mình nha'};
            // }
            
            if (name && name.length > 15) {
                errorInformation = {...errorInformation, name: 'Nhập ít hơn 15 ký tự'};
            }

            if (!userInfo.name) {
                errorInformation = {...errorInformation, name: 'Bạn gì ơi, quên nhập tên rồi'};
            }

            await axios.post(ENDPOINT_API +'/user/check-name', {
                name: name,
              })
              .then(function (response) {
                if (response && response.data && !response.data.messageCode) {
                    isValid = false;
                    errorInformation = {...errorInformation, name: 'Tên này có người lấy rồi nè'};
                }
              })
              .catch(function (error) {
                console.log(error);
              });
    
            if (!_.isEqual(errorInformation, {})) {
                isValid = false;
                setErrorInfo(errorInformation);
            }
    
            return isValid

        } catch(e) {
            alert(e)
            console.log('Login-checkingValidation: ', e);
        }
    }

    const submitLogin = async (e) => {
        const {history} = props;

        const isValid = await checkingValidation()
        console.log(isValid)
        if (isValid) {
            name && room && history && history.push(`/chat?name=${name}&room=${room}`, { imageCurrentUser: image || defaultImageAvatar });
        } else {
            e.preventDefault()
        }
    }

    return (
        <Fragment>
            <div className="joinOuterContainer">
                <div className="joinInnerContainer">
                    <h1 className="heading">Xin Chào</h1>
                    {image ? <img src={image} className="userAvatar"/> : 
                        <div class="animated-container">
                            <div id="animated-example" class="animated bounce"></div>
                        </div>
                    }
                    <div className="inputBox">
                        <input placeholder="Tên" className="joinInput" type="text" onChange={handleOnChangeUsername} />
                    </div>
                    {errorInfo.name && <strong className="text-error">{errorInfo.name}</strong>}
                    <div>
                        <input disabled placeholder={room} className="joinInput mt-20" type="text" onChange={handleOnChangeRoom} />
                    </div>
                    <button onClick={submitLogin} className={'button mt-20'} type="submit">{name ? 'Vô liền nè' : 'Tham Gia'}</button>
                </div>
            </div>
        </Fragment>
    )
}

export default Join