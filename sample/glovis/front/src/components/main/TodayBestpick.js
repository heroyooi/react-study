import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBestpickList } from '@src/actions/main/mainAction';

const TodayBestpick = () => {
  const bestpickList = useSelector((state) => state.main.bestpickList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBestpickList()); //Today's best pick
  }, []);
  //bestpickList[0] !== null && bestpickList[0].name !== undefined && bestpickList[0].name !== null && bestpickList[0].name
  const name0 = bestpickList[0] !== undefined ? bestpickList[0].name : '';

  return (
    <>
      <ul className="best-pick-01">
        <li>
          <img src="" alt="" />
          <div className="info">
            <p className="name">{bestpickList[0] !== undefined && bestpickList[0].name}</p>
            <p className="price-tp5">
              {bestpickList[0] !== undefined && bestpickList[0].price}
              <span className="won">만원</span>
            </p>
          </div>
        </li>
        <li className="info">
          <p className="name">{bestpickList[1] !== undefined && bestpickList[1].name}</p>
          <p className="price-tp5">
            {bestpickList[1] !== undefined && bestpickList[1].price}
            <span className="won">만원</span>
          </p>
        </li>
        <li>
          <img src="" alt="" />
        </li>
      </ul>

      <ul className="best-pick-02">
        <li className="info">
          <p className="name">{bestpickList[2] !== undefined && bestpickList[2].name}</p>
          <p className="price-tp5">
            {bestpickList[2] !== undefined && bestpickList[2].price}
            <span className="won">만원</span>
          </p>
        </li>
        <li>
          <img src="" alt="" />
        </li>
        <li>
          <img src="" alt="" />
        </li>
        <li className="info">
          <p className="name">{bestpickList[3] !== undefined && bestpickList[3].name}</p>
          <p className="price-tp5">
            {bestpickList[3] !== undefined && bestpickList[3].price}
            <span className="won">만원</span>
          </p>
        </li>
        <li className="info">
          <p className="name">{bestpickList[4] !== undefined && bestpickList[4].name}</p>
          <p className="price-tp5">
            {bestpickList[4] !== undefined && bestpickList[4].price}
            <span className="won">만원</span>
          </p>
        </li>
        <li>
          <img src="" alt="" />
        </li>
      </ul>
    </>
  );
};

export default TodayBestpick;
