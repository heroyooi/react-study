import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { transformText } from '@src/utils/CommonUtil';

const Steps = memo(({ type, contents, subContents, active, mode = 'normal', links, reverse = false, marginTop, marginBottom, onClickArr, className, statusBoxes }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  let stepsType = '';
  if (contents.length === 3) {
    stepsType = `steps-tp${type} step3`;
  } else if (contents.length === 4) {
    stepsType = `steps-tp${type} step4`;
  } else if (contents.length === 6) {
    stepsType = `steps-tp${type} step6`;
  } else {
    stepsType = `steps-tp${type}`;
  }
  if (reverse) stepsType += ' reverse';
  if (className !== undefined) stepsType += ` ${className}`;
  const createStep1 = useCallback(
    (v, i) => {
      return (
        <>
          <p>{transformText(v)}</p>
          <div className="step-ico">{hasMobile ? type === 1 ? i + 1 : `0${i + 1}` : <i className="ico-check-white" />}</div>
          {subContents !== undefined && <p className="sub-contents">{statusBoxes !== undefined && <span className="s-box">{statusBoxes[i]}</span>}{transformText(subContents[i])}</p>}
        </>
      );
    },
    [hasMobile, subContents, type]
  );
  const createStep2 = useCallback(
    (v, i) => (
      <>
        <p>{transformText(v)}</p>
        <div className="step-ico">{!hasMobile ? (type === 1 ? i + 1 : null) : type === 2 ? `0${i + 1}` : i + 1}</div>        
        {subContents !== undefined && <p className="sub-contents">{statusBoxes !== undefined && <span className="s-box">{statusBoxes[i]}</span>}{transformText(subContents[i])}</p>}
      </>
    ),
    [hasMobile, subContents, type]
  );

  const stepsStyle = {};
  if (marginTop !== undefined) stepsStyle.marginTop = marginTop + 'px';
  if (marginBottom !== undefined) stepsStyle.marginBottom = marginBottom + 'px';

  if (mode === 'stick') {
    return (
      <div className="steps-stick">
        <div className="step-line">
          <span style={{ width: `${active * (100 / contents.length)}%` }} />
        </div>
        <p>
          {contents[active - 1]} ({active}/{contents.length} 단계)
        </p>
      </div>
    );
  }

  return (
    <div className={stepsType} style={stepsStyle}>
      {contents.map((v, i) => {
        if (i <= active - 2) {
          return (
            <div className={type === 1 ? (i === active - 2 ? 'step-finish edge' : 'step-finish') : i === active - 2 ? 'step-progress edge' : 'step-progress'} key={i}>
              {mode === 'hasLink' ? (
                <Link href={links[i]}>
                  <a onClick={onClickArr ? onClickArr[i] : null}>{createStep1(v, i)}</a>
                </Link>
              ) : (
                createStep1(v, i)
              )}
            </div>
          );
        }
        return (
          <div className={i + 1 === active ? 'step-progress' : 'step-wait'} key={i}>
            {mode === 'hasLink' ? (
              <Link href={links[i]}>
                <a onClick={onClickArr ? onClickArr[i] : null}>{createStep2(v, i)}</a>
              </Link>
            ) : (
              createStep2(v, i)
            )}
          </div>
        );
      })}
    </div>
  );
});

Steps.propTypes = {
  className: PropTypes.string,
  type: PropTypes.number,
  contents: PropTypes.array,
  subContents: PropTypes.array,
  active: PropTypes.number,
  mode: PropTypes.string,
  links: PropTypes.array,
  reverse: PropTypes.bool,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  onClickArr: PropTypes.array
};

Steps.displayName = 'Steps';
export default Steps;
