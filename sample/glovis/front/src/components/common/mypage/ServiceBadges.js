import classNames from "classnames/bind"

import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';

/**
   * @module ServiceBadges
   * @desc 이용중인 서비스를 뱃지 형태로 노출하는 컴포넌트
   * @param {Object} props - props object
   * @param {Array} props.service - 4가지 서비스형태를 순서에 맞게
   *  이용중일 경우 true, 이용중이 아닐경우 false값으로 배열로 표현.
   * (api data 구조에 따라 추후 변경될 수도 있음)
*/
const ServiceBadges = ({service=[true, true, true, true]}) => {
    const serviceTypes = [
        {
            className : 'bg-sky',
            text : '홈',
            msg : '[홈서비스]서비스 이용 가능 회원입니다.',
        },
        {
            className : 'bg-green',
            text : '프',
            msg : '[프라이싱시스템] 이용 회원입니다.',
        },
        {
            className : 'bg-purple',
            text : '오',
            msg : '[스마트옥션]서비스 이용 가능 회원입니다.',
        },
        {
            className : 'bg-yellow',
            text : 'Fc',
            msg : '[프랜차이즈]서비스 이용 가능 회원입니다.'
        },
    ]

    return (
        <>
            {
                serviceTypes.map((serviceType, index) => 
                    <Tooltip placement="bottom" key={index}>
                        <TooltipItem>
                            <em
                                className={classNames('tag-tp4', {
                                    [serviceType.className] : service[index],
                                    'bg-gray' : !service[index]
                                })}
                                style={{marginLeft: '16px'}}
                            >
                                {serviceType.text}
                            </em>
                        </TooltipItem>
                        <TooltipCont>
                            <p>{serviceType.msg}</p>
                        </TooltipCont>
                    </Tooltip>
                )
            }
            
        </>
    )
}

export default ServiceBadges