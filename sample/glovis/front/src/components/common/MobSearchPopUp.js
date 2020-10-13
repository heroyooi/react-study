import React from 'react';
import PropTypes from 'prop-types';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import SearchArea from '@src/components/common/SearchArea';
import MobSearchFilter from '@src/components/common/MobSearchFilter';
import { getCarDefaultFilter } from '@src/utils/CarFilterUtil';

class MobSearchPopUp extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onSelect = this.onHandleSelect.bind(this);
  }

  onHandleSelect(e, deps) {
    if (this.props.onSelect && deps) {
      const data = Object.assign(getCarDefaultFilter(), deps);
      data.selectedModels = [
        {
          id: deps.crDtlMdlCd || deps.crMdlCd || deps.crMnfcCd || null,
          name: deps.crDtlMdlNm || deps.crMdlNm || deps.crMnfcNm || null,
          orgName: null,
          catNm: null,
          bsno: null,
          price: 0,
          nationId: null,
          manufactureId: deps.crMnfcCd || '',
          manufactureNm: deps.crMnfcNm || '',
          modelId: deps.crMdlCd || null,
          modelNm: deps.crMdlNm || null,
          detailModelId: deps.crDtlMdlCd || null,
          detailModelNm: deps.crDtlMdlNm || null,
          children: [],
          isLeaf: true,
          checked: true
        }
      ];

      this.props.onSelect(e, data);
    }
  }

  render() {
    const recommandWordsList = this.props.recommandWordsList;
    const onClickRecWord = this.props.onClickRecWord;
    if (!this.props.isKeyword) {
      return (
        <div className="service-search-wrap">
          <MobSearchFilter
            canUseCho={this.props.canUseCho}
            canUseCarType={this.props.canUseCarType}
            canUseCarModel={this.props.canUseCarModel}
            canUseYear={this.props.canUseYear}
            canUseDrvDist={this.props.canUseDrvDist}
            canUsePrice={this.props.canUsePrice}
            canUseAutoBellSvc={this.props.canUseAutoBellSvc}
            canUseLoc={this.props.canUseLoc}
            canUseOption={this.props.canUseOption}
            canUseColor={this.props.canUseColor}
            canUseFull={this.props.canUseFull}
            canUseMission={this.props.canUseMission}
            canUseDspl={this.props.canUseDspl}
            canUseRecently={this.props.canUseRecently}
            dataContext={this.props.dataContext}
            isMultiSelect={this.props.isMultiSelect}
            isReset={this.props.isReset}
            isSelectButton={true}
            reset={this.props.onReset}
            selectionMode={this.props.selectionMode}
            onClose={this.props.onClose}
            onSelect={this.props.onSelect}
            selectAll={this.props.selectAll}
          />
        </div>
      );
    }
    return (
      <div className="service-search-wrap">
        <TabMenu type="type2" defaultTab={0} mount={false}>
          <TabCont tabTitle="상세 검색" id="tab2-1" index={0}>
            <MobSearchFilter
              canUseCho={this.props.canUseCho}
              canUseCarType={this.props.canUseCarType}
              canUseCarModel={this.props.canUseCarModel}
              canUseYear={this.props.canUseYear}
              canUseDrvDist={this.props.canUseDrvDist}
              canUsePrice={this.props.canUsePrice}
              canUseAutoBellSvc={this.props.canUseAutoBellSvc}
              canUseLoc={this.props.canUseLoc}
              canUseOption={this.props.canUseOption}
              canUseColor={this.props.canUseColor}
              canUseFull={this.props.canUseFull}
              canUseMission={this.props.canUseMission}
              canUseDspl={this.props.canUseDspl}
              canUseRecently={this.props.canUseRecently}
              dataContext={this.props.dataContext}
              isMultiSelect={this.props.isMultiSelect}
              isReset={this.props.isReset}
              isSelectButton={true}
              reset={this.props.onReset}
              selectionMode={this.props.selectionMode}
              onClose={this.props.onClose}
              onSelect={this.props.onSelect}
              selectAll={this.props.selectAll}
              clearTrigger={this.props.clearTrigger}
            />
          </TabCont>
          <TabCont tabTitle="키워드 검색" id="tab2-2" index={1}>
            <div className="content-wrap">
              <SearchArea searchTerm={this.props.dataContext?.searchTerm} section="buy" wrapperClass="search-tp1" onClick={this.onSelect} />
              <p className="tit2 mb6">추천검색어</p>
              <ul className="m-list basic">
                {recommandWordsList &&
                  recommandWordsList.map((word, idx) => (
                    <li key={`recom-${idx}`} onClick={() => onClickRecWord(word.srchWord)}>
                      <a title={word.srchWord}>{word.srchWord}</a>
                    </li>
                  ))}
              </ul>
            </div>
          </TabCont>
        </TabMenu>
      </div>
    );
  }
}

MobSearchPopUp.propTypes = {
  canUseCho: PropTypes.bool,
  canUseCarType: PropTypes.bool,
  canUseCarModel: PropTypes.bool,
  canUseYear: PropTypes.bool,
  canUseDrvDist: PropTypes.bool,
  canUsePrice: PropTypes.bool,
  canUseAutoBellSvc: PropTypes.bool,
  canUseLoc: PropTypes.bool,
  canUseOption: PropTypes.bool,
  canUseColor: PropTypes.bool,
  canUseFull: PropTypes.bool,
  canUseMission: PropTypes.bool,
  canUseDspl: PropTypes.bool,
  canUseRecently: PropTypes.bool,
  dataContext: PropTypes.object,
  isMultiSelect: PropTypes.bool,
  isReset: PropTypes.bool,
  selectionMode: PropTypes.string,
  onClose: PropTypes.func,
  onReset: PropTypes.func,
  onSelect: PropTypes.func,
  isKeyword: PropTypes.bool,
  recommandWordsList: PropTypes.array,
  onClickRecWord: PropTypes.func,
  selectAll: PropTypes.bool,
  clearTrigger: PropTypes.bool
};

MobSearchPopUp.defaultProps = {
  canUseCho: true,
  canUseCarType: true,
  canUseCarModel: true,
  canUseDrvDist: true,
  canUseYear: true,
  canUsePrice: true,
  canUseAutoBellSvc: true,
  canUseLoc: true,
  canUseOption: true,
  canUseColor: true,
  canUseFull: true,
  canUseMission: true,
  canUseDspl: true,
  canUseRecently: true,
  isMultiSelect: true,
  isReset: false,
  selectionMode: '',
  isKeyword: false,
  clearTrigger: false
};

export default MobSearchPopUp;
