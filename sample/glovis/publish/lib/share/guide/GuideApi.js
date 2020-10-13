import { useState } from 'react'
import classNames from "classnames/bind"
import PropTypes from "prop-types"
import SlideAnimate from '../items/SlideAnimate'

const GuideApi = ({cname, api_info}) => {
  const [apiView, setApiView] = useState(true)
  const apiToggle = () => setApiView(!apiView)
  let props_arr = [];
  api_info.map(v => props_arr.push(v.property))
  const btn_style = classNames('btn-toggle', {'active': apiView})
  const info_style = classNames('info', {'active': apiView})

  const transformDesc = (string) => {
    let stringArr = [];
    let _string = string.split('<br />')
    if(_string.length > 1) {
      _string.map((v, i) => {
        if(i < _string.length-1) {
          stringArr.push(<span key={i}>{v}<br /></span>)
        } else {
          stringArr.push(<span key={i}>{v}</span>)
        }
      })
      return stringArr
    } else {
      return string
    }
  }

  return (
    <div className="api-wrap">
      <h2 className="tit">
        <span className="api"><em>{cname}</em> API <span className={btn_style} onClick={apiToggle}>{apiView ? '-' : '+'}</span></span>
        <span className={info_style}>Props : <span className="props">{
          props_arr.map((v, i) => {
            if(v !== undefined) return <span key={i}>{v}</span>
          })
        }</span></span>
      </h2>
      
      {/* 브라우저 새로고침 시 위치가 계속 달라지는 문제 때문에 슬라이드 기능 제거 */}
      {/* <SlideAnimate toggle={apiView} mount={false}> */}
      <div className={apiView ? "detail active" : "detail"}>
        <table summary={`${cname} 가이드 정리`} className="table-tp1">
          <colgroup>
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">Property</th>
              <th scope="col">Description</th>
              <th scope="col">Type</th>
              <th scope="col">Default</th>
            </tr>
          </thead>
          <tbody>
            {api_info.map((v, i) => {
              if (v.npm === undefined) {
                return (
                  <tr key={i}>
                    <td>{v.property}</td>
                    <td>{transformDesc(v.description)}</td>
                    <td>{v.type}</td>
                    <td>{v.default}</td>
                  </tr>
                )
              } else {
                return (
                  <tr className="library" key={i}>
                    <td><span>라이브러리 명</span> {v.library}</td>
                    <td className="command"><span>NPM 명령어</span> {v.npm}</td>
                    <td colSpan="2" className="more"><a href={v.homepage} target="_blank"><span>+ More</span></a></td>
                  </tr>
                )
              }
              
            })}
          </tbody>
        </table>
      </div>
      {/* </SlideAnimate> */}
    </div>
  )
}

GuideApi.propTypes = {
  cname: PropTypes.string,
  api_info: PropTypes.array
}

export default GuideApi