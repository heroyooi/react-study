import { produce } from 'immer';
import { dealerProdListTypes } from '@src/actions/mypage/dealer/dealerProdListAction'

const initialState = {
  list: [],
  normalsaleprodcnt : 0,
  managementsaleprodcnt : 0,
  judgmentsaleprodcnt : 0,
  waitingsaleprodcnt : 0,
  totalsaleprodcnt : 0,
  sortValue : 'REG_DT',
  by : 'DESC',
  selectedItems : [],
  currentTotalCount : 0,
  member:{},
  adProdList:[],
  totalcnt:0,
};

export default function dealerProdListReducer(store = initialState, action) {
  switch (action.type) {
    case dealerProdListTypes.INIT_LIST_INFO:
      return produce(store, (draft) => {
        const { payload } = action
        Object.keys(payload).forEach(key => {
          draft[key] = payload[key];
        })
      });

    case dealerProdListTypes.INIT_ITEM_PROPS_BY_ID:
      return produce(store, (draft) => {
        const { key, values, name } = action.payload;
        // console.log("dealerProdListReducer -> name", name)
        const index = draft[name].findIndex((item) => {
          return item['dlrPrdId'] === key;
        });
        // console.log('index : ', index);

        if (index >= 0) {
          const keys = Object.keys(values);

          keys.forEach((key) => {
            // console.log('key : ', key);
            // console.log('values[key] : ', values[key]);
            draft[name][index][key] = values[key];
          });
        }
      });

    case dealerProdListTypes.INIT_ITEM_CAR_IMAGE :
      return produce(store, (draft) => {
        const { key, value } = action.payload;
        console.log("dealerProdListReducer -> key", key)
        console.log("dealerProdListReducer -> value", value)

        const item = draft['list'].find(item => item['dlrPrdId'] === key)

        if(item){
          item.car.photoList = value
        }
      });

    case dealerProdListTypes.INIT_STATE:
      return produce(store, (draft) => {
        const { name, value } = action.payload;

        draft[name] = value
      });

    case dealerProdListTypes.INIT_PROPS:
      return produce(store, (draft) => {
        const { name, values } = action.payload;

        Object.keys(values).forEach(key => draft[key] = values[key])
      });

    case dealerProdListTypes.ADD_ITEMS_BY_ID:
      return produce(store, (draft) => {
        const { name, value } = action.payload;

        draft[name].push(value)
      });

    case dealerProdListTypes.REMOVE_ITEMS_BY_ID:
      return produce(store, (draft) => {
        const { name, key, value } = action.payload;

        draft[name] = draft[name].filter(draftItem => draftItem[key] != value[key])
      });

    default:
      return store;
  }
}
