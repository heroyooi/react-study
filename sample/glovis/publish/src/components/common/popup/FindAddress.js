import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';

const FindAddress = ({ callback }) => {
  const [isSearch, setIsSearch] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    setIsSearch(true);
  }, []);
  const handleDetail = useCallback((e) => {
    e.preventDefault();
    // setIsSearch(false);
    setIsDetail(true);
  }, []);

  const hasMobile = useSelector((state) => state.common.hasMobile);
  const handleClick = (e) => {
    if (callback) callback(e);
  }

  if (hasMobile) {
    return (
      <div className="address-wrap">
        <Input type="text" placeHolder="주소를 검색해주세요." id="input-tp3" uiType={3} />
        <ul className="bottom">
          <li onClick={handleClick}>
            <div className="float-wrap">
              <p className="num fl">12323</p>
              <ul className="fr">
                <li>영문보기</li>
                <li>지도</li>
              </ul>
            </div>
            <p className="address">
              경기 성남시 분당구 판교역로 234 (에이치스퀘어 엔동)
                <span className="num">경기 성남시 분당구 판삼평동 681</span>
            </p>
          </li>
          <li onClick={handleClick}>
            <div className="float-wrap">
              <p className="num fl">12323</p>
              <ul className="fr">
                <li>영문보기</li>
                <li>지도</li>
              </ul>
            </div>
            <p className="address">
              경기 성남시 분당구 판교역로 234 (에이치스퀘어 엔동)
                <span className="num">경기 성남시 분당구 판삼평동 681</span>
            </p>
          </li>
          <li onClick={handleClick}>
            <div className="float-wrap">
              <p className="num fl">12323</p>
              <ul className="fr">
                <li>영문보기</li>
                <li>지도</li>
              </ul>
            </div>
            <p className="address">
              경기 성남시 분당구 판교역로 234 (에이치스퀘어 엔동)
                <span className="num">경기 성남시 분당구 판삼평동 681</span>
            </p>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <div className="address-wrap">
      <div className="top">
        <div className="search-wrap">
          <div className="input-tx-wrap">
            <Input type="text" width={511} height={40} placeHolder="도로명주소, 건물명 또는 지번 입력" />
            <Button className="re-input" size="mid" color="blue80" title="재입력" />
          </div>
          <Button size="mid" background="blue80" title="검색" width={100} height={40} onClick={handleSearch} />
        </div>
        <p>검색어 예: 도로명 (반포대로 58), 건물명 (독립기념관), 지번 (삼성동 25)</p>
      </div>
      <div className="bottom">
        {(isSearch === true && isDetail === false) && (
          <>
            <p className="inquire-num">도로명 주소 검색 결과 : 6건</p>
            <ColoredScrollbars autoHeightMax={344}>
              <table summary="우편번호에 대한 정보" className="table-tp1 th-c td-c">
                <caption className="away">우편번호 검색</caption>
                <colgroup>
                  <col width="7%" />
                  <col width="*" />
                  <col width="15%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>도로명주소</th>
                    <th>우편번호</th>
                  </tr>
                </thead>
                <tbody>
                  <tr onClick={handleDetail}>
                    <td>1</td>
                    <td>
                      서울특별시 서초구 반포대로 13길 50-3 (서초동)
                    <span className="num">(지번) 서울특별시 서초구 서초동 1522-5</span>
                    </td>
                    <td>06670</td>
                  </tr>
                  <tr onClick={handleDetail}>
                    <td>2</td>
                    <td>
                      서울특별시 서초구 반포대로 13길 50-3 (서초동)
                    <span className="num">(지번) 서울특별시 서초구 서초동 1522-5</span>
                    </td>
                    <td>06670</td>
                  </tr>
                  <tr onClick={handleDetail}>
                    <td>3</td>
                    <td>
                      서울특별시 서초구 반포대로 13길 50-3 (서초동)
                    <span className="num">(지번) 서울특별시 서초구 서초동 1522-5</span>
                    </td>
                    <td>06670</td>
                  </tr>
                  <tr onClick={handleDetail}>
                    <td>4</td>
                    <td>
                      서울특별시 서초구 반포대로 13길 50-3 (서초동)
                    <span className="num">(지번) 서울특별시 서초구 서초동 1522-5</span>
                    </td>
                    <td>06670</td>
                  </tr>
                  <tr onClick={handleDetail}>
                    <td>5</td>
                    <td>
                      서울특별시 서초구 반포대로 13길 50-3 (서초동)
                    <span className="num">(지번) 서울특별시 서초구 서초동 1522-5</span>
                    </td>
                    <td>06670</td>
                  </tr>
                  <tr onClick={handleDetail}>
                    <td>6</td>
                    <td>
                      서울특별시 서초구 반포대로 13길 50-3 (서초동,황실하이츠빌라 두 줄일때는 이렇게 나옵니다)
                    <span className="num">(지번) 서울특별시 서초구 서초동 1522-5</span>
                    </td>
                    <td>06670</td>
                  </tr>
                </tbody>
              </table>
            </ColoredScrollbars>
          </>
        )}
        {isDetail === true && (
          <>
            <table summary="상세주소에 대한 정보" className="table-tp1">
              <caption>상세주소 입력</caption>
              <colgroup>
                <col width="25%" />
                <col width="*" />
              </colgroup>
              <tbody>
                <tr>
                  <th>도로명주소</th>
                  <td>서울특별시 서초구 반포대로 13길 50-3</td>
                </tr>
                <tr>
                  <th>상세주소입력</th>
                  <td>
                    <Input type="text" height={40} />
                    <span>(서초동)</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <Buttons align="center" marginTop={30} marginBottom={67}>
              <Button size="big" background="blue80" title="주소입력" width={127} height={40} />
            </Buttons>
          </>
        )}
      </div>
    </div>
  )
}

export default FindAddress;