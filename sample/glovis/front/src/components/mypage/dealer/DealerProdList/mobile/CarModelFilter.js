import React, { useState, useEffect, useCallback } from 'react';

import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import TreeCheckCount from '@lib/share/items/TreeCheckCount';
import Button from '@lib/share/items/Button';

import { selectManufacturerList, selectModelList } from '@src/api/common/CarInfoApi';
import { getSelectCodeList } from '@src/utils/DataUtils'
import { mobDataProvider } from '@src/dummy';

//임시
import { manufactureIconClass, foreignManufactureIconClass } from '@src/dummy/mypage/dealer'

const findLi = (target) => {
  const {tagName} = target
  return tagName == 'LI' ? target : findLi(target.parentElement)
}

const title = {
  'manufactureId': '제조사',
  'modelId': '모델',
  'classId' : '등급',
}

const CarModelFilter = ({onSubmit, select, item = {}, treeMode='check', filters = ['manufactureId', 'modelId', 'classId']}) => {
  const [ manufactureList, setManufactureList] = useState([])
  const [ foreignManufactureList, setForeignManufactureList] = useState([])
  const [ modelList, setModelList] = useState([])

  const getIndex = () => Object.keys(item).reduce((index, key) => item[key] ? index+1 : index, 0)
  const [ currentIndex, setCurrentIndex] = useState(getIndex)
  
  const getDisabledIndex = () => {
    const disabledIndex = []
    for(let i=1, len=2-getIndex(); i<len; i++) {
      disabledIndex.push(i)
    }
    return disabledIndex
  }
  const [ disabled, setDisabled ] = useState(getDisabledIndex)

  const submitHandler = (e) => {
    if(onSubmit) onSubmit(e);
  }

  const clickHandler = async (e) => {
    const { dataset : { name, value } } = e.target

    if(filters.findIndex((filter) => filter == name) == (filters.length-1)){
      onSubmit({name, value})
    } else {
      if(item[name] == value){
        setCurrentIndex(currentIndex+1) //동일값 클릭시 api 미호출
      } else {
        select({name, value})
      }
    }
  } 

  const clickTab = (e) => {
    const li = findLi(e.target)
    const index = Array.from(li.parentElement.children).findIndex((child, i) => child == li)
    setCurrentIndex(index)
  }

  useEffect(() => {
    selectManufacturerList(1).then(getSelectCodeList).then(res => setManufactureList(res.slice(1)))
    selectManufacturerList(2).then(getSelectCodeList).then(res => setForeignManufactureList(res.slice(1)))
  }, []);

  useEffect(()=>{
    setCurrentIndex(getIndex)
  }, [ item ])

  useEffect(()=>{
    setDisabled(getDisabledIndex)
  }, [ currentIndex ])

  useEffect(()=>{
    const { manufactureId }= item
    if(manufactureId){
      selectModelList(manufactureId)
        .then(getSelectCodeList)
        .then(res => setModelList(res.slice(1)))
    }
  }, [ item.manufactureId ])

  return (
    <TabMenu
      type="type2"
      defaultTab={currentIndex}
      mount={false}
      fixTab={true}
      disabled={disabled}
      callBack={clickTab}
      liClicked={true}
    >
      {
        filters.map((filter, i) => 
          <TabCont tabTitle={title[filter]} id={`tab2-${i}`} index={i}>
            <div className="filter-list-wrap">
              {
                filter == 'manufactureId' &&
                <>
                  <p className="tit">국산차</p>
                  <div className="content-wrap float-wrap domestic">
                    <ul>
                      {
                        manufactureList.map((manufacture, i) =>
                          <li key={i} className={manufactureIconClass[manufacture.value]} data-name={filter} data-value={manufacture.value} onClick={clickHandler}>
                            <span className="logo" />
                            <span className="name">{manufacture.label}</span>
                            <span className="num">0</span>
                          </li>
                        )
                      }
                    </ul>
                  </div>
                  <p className="tit">수입차 인기브랜드 TOP5</p>
                  <div className="content-wrap float-wrap foreign">
                    {
                      foreignManufactureList.map((manufacture, i) =>
                        <li key={i} className={foreignManufactureIconClass[manufacture.value]} data-name={filter} data-value={manufacture.value} onClick={clickHandler}>
                          <span className="logo" />
                          <span className="name">{manufacture.label}</span>
                          <span className="num">0</span>
                        </li>
                      )
                    }
                  </div>
                </>
              }
              {
                filter == 'modelId' &&
                <>
                  <div className="filter-list-wrap">
                    <p className="tit">인기모델</p>
                    <div className="content-wrap float-wrap">

                    </div>
                    <p className="tit">이름순</p>
                    <div className="content-wrap float-wrap">
                      <ul>
                        {modelList.map((model, i) =>
                          <li key={i} className={model.className} data-name={filter} data-value={model.value} onClick={clickHandler}>
                            <span className="name">{model.label}</span>
                            <span className="num">0</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </>
              }
              {
                filter == 'classId' &&
                <>
                  {/* <TreeCheckCount dataProvider={mobDataProvider} mode={treeMode} /> */}
                  {/* <Button
                    className="fixed"
                    size="full"
                    background="blue80"
                    title="전체선택"
                    onClick={submitHandler}
                  /> */}
                </>
              }
            </div>
          </TabCont>
        )
      }
    </TabMenu>
  );
};

export default CarModelFilter;
