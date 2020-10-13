/**
 * @author 최승희
 */
import { axiosGet, axiosPost, aixosUpFile, axiosDown } from '@src/utils/HttpUtils';
import qs from 'qs';

const BASE = '/api/mypage/dealer/';

const MEMBER_STATEMENT = BASE + 'memberStatement.do';
const INSERT_AUTO_AUCTION_DEALER = BASE + 'insertAutoAuctionDealer.do';
const INSERT_AUTO_AUCTION = BASE + 'insertAutoAuctionJoin.do';
const SELECT_DEALER_AUTO_AUCTION_POLICY = BASE + 'selectDealerAutoAuctionPolicy.do';
const SELECT_MB_INFO = BASE + 'selectMbInfo.do';
const UPDATE_AUTO_AUCTION_DEALER = BASE + 'updateAuctionDealer.do';

const SELECT_AUCTION_SUCC_BID_LIST = BASE + 'selectAuctionSuccBidList.do';
const SELECT_AUCTION_BID_INFO_LIST = BASE + 'selectAuctionBidInfoList.do';
const SELECT_AUCTION_SELL_CAR_LIST = BASE + 'selectAuctionSellCarList.do';

export const selectMyAuctionMemberState = () => axiosGet(MEMBER_STATEMENT);

export const insertAutoAuctionDealer = (params) => axiosPost(INSERT_AUTO_AUCTION_DEALER, params);

export const insertAutoAuctionJoin = (params) => axiosPost(INSERT_AUTO_AUCTION, params);

export const updateAutoAuctionDealer = (params) => aixosUpFile(UPDATE_AUTO_AUCTION_DEALER, params);

export const selectMbInfo = (mbId) => axiosGet(SELECT_MB_INFO);

export const downloadFile = (url) => axiosDown(url);

export const selectDealerAutoAuctionPolicy = () => axiosGet(SELECT_DEALER_AUTO_AUCTION_POLICY);

export const selectAuctionSuccBidList = (params) => axiosPost(SELECT_AUCTION_SUCC_BID_LIST, params);
export const selectAuctionBidInfoList = (params) => axiosPost(SELECT_AUCTION_BID_INFO_LIST, params);
export const selectAuctionSellCarList = (params) => axiosPost(SELECT_AUCTION_SELL_CAR_LIST, params);
