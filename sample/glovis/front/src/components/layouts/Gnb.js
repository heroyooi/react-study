import GnbItem from './GnbItem';
import PropTypes from 'prop-types';
// import { gnbMenu } from '@src/dummy';

const Gnb = ({ isSection, menuTreeData, handleHover }) => {
  //console.log('useEffect>Gnb>[treeFromFlatData]=%o', menuTreeData);
  const gnbMenu = menuTreeData.menuTreeData;
  // console.log('useEffect>Gnb>[gnbMenu]=%o', gnbMenu);
  return (
    <div className="gnb-wrap">
      <h2 className="hide">주메뉴</h2>
      <ul id="gnb">
        {typeof gnbMenu !== 'undefined' &&
          gnbMenu.map((item, index) =>
            item.title === '내차사기' || item.title === '내차팔기' || item.title === '시세조회' ? (
              <GnbItem key={index} title={item.title} sub={item.children} link={item.tranSrc} isSection={isSection} id={item.menuId} handleHover={handleHover?handleHover:null} />
            ) : (
              ''
            )
          )}
      </ul>
    </div>
  );
};

Gnb.propTypes = {
  isSection : PropTypes.any,
  menuTreeData : PropTypes.any,
  handleHover : PropTypes.func
};

export default React.memo(Gnb);
