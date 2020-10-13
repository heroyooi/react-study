export const ProdItemType = {
    itemTypeA : ['0010', '0020', '0030'],
    itemTypeB : ['0060', '0070', '0090'],
    itemTypeC : ['0040'],
} 

export const manufactureIconClass = {
    "5" : "brand1",
    "146" : "brand2",
    "2" : "brand3",
    "1" : "brand4",
    "3" : "brand5",
    "4" : "brand6",
    "127" : "brand7",
}

export const foreignManufactureIconClass = {
    "67" : "brand2",
    "68" : "brand1",
    "70" : "brand3",
    "71" : "brand4",
    "82" : "brand5",
}

export const ProdStatusInfo = {
    '0010' : {
        label : '정상',
        iconClass : 'normal',
    },
    '0020' : {
        label : '관리필요',
        iconClass : 'need',
    },
    '0030' : {
        label : '판단보류',
        iconClass : 'hold',
    },
}

export const DeleteReasonList = [
    {
        value : '0010',
        title : '실 차주 요청으로 인한 삭제',
    },
    {
        value : '0020',
        title : '차량 소속 변경',
    },
    {
        value : '0030',
        title : '오프라인 채널 통한 판매',
    },
    {
        value : '0040',
        title : '타 사이트를 통한 판매',
    },
    {
        value : '0050',
        title : '기타',
    },
]