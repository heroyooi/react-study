export default {
    crNo : {// 차량번호
        format:'crNo',
        label:'차량번호를 입력해주세요.',
        // messages: {
        //     'string.empty': '차량 번호를 입력해주세요.',
        //     'string.pattern.base': '올바른 차량 번호를 입력해주세요(예 12가1234)'
        // }
    },
    name : {// 소유자명
        type :"string",
        pattern: '[가-힣|a-z|A-Z]',
        label: '올바른 이름을 입력해주세요.'
    },
    hashValue : {// 인증을 위해 생성된 해시밸류
        type :"string",
        // required: true,
        // messages: {
        //     'string.empty': '인증을 위한 해쉬값을 받아오고 있습니다. 잠시만 기다려주세요.'
        // }
    },
    timeStamp : {// 인증을 위해 생성된 타임스탬프
        type :"string",
        // required: true,
        // messages: {
        //     'string.empty': '인증을 위한 해쉬값을 받아오고 있습니다. 잠시만 기다려주세요.'
        // }
    },
    svcCodeArr : {// 인증을 위해 생성된 svcCodeArr
        type :"string",
        // required: true,
        // messages: {
        //     'string.empty': '인증을 위한 해쉬값을 받아오고 있습니다. 잠시만 기다려주세요.'
        // }
    }
}