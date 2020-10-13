import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Mac } from '@src/utils/CommonUtil';
/**
 * 200328 김상진 컴포넌트 통합 완료 Button.js
 * name, disabled, iconReverse, shadow, fontWeight 등 기능통합
 */
const Button = ({
  size,
  color,
  background,
  line,
  radius = false,
  shadow = false,
  title,
  sub,
  width,
  height,
  lineHeight,
  circle = false,
  iconType,
  iconReverse = false,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  nextLink = false,
  href = '',
  target = '_self',
  className,
  onClick,
  buttonMarkup = false,
  fontSize,
  fontWeight,
  measure = 'px',
  mgMeasure = 'px',
  disabled = false,
  dataContext,
  name,
  value
}) => {
  let btn_style = 'btn-base';
  if (color !== undefined) btn_style += ' tx-' + color;
  if (background !== undefined) btn_style += ' bg-' + background;
  if (line !== undefined) btn_style += ' line-' + line;
  if (size) btn_style += ' ' + size;
  if (radius) btn_style += ' radius';
  if (shadow) btn_style += ' shadow';
  if (circle) btn_style += ' circle';
  if (sub !== undefined) btn_style += ' ws';
  if (disabled) btn_style += ' disabled';
  if (className !== undefined) btn_style += ' ' + className;

  // const [btnClass, setBtnClass] = useState(btn_style);
  useEffect(() => {
    // if (Mac) setBtnClass(btn_style + ' mac')
    if (Mac) btn_style += ' mac';
  }, []);

  const marginStyle = {};
  if (marginLeft !== undefined) marginStyle.marginLeft = mgMeasure === 'px' ? `${marginLeft}px` : `${marginLeft}%`;
  if (marginTop !== undefined) marginStyle.marginTop = mgMeasure === 'px' ? `${marginTop}px` : `${marginTop}%`;
  if (marginRight !== undefined) marginStyle.marginRight = mgMeasure === 'px' ? `${marginRight}px` : `${marginRight}%`;
  if (marginBottom !== undefined) marginStyle.marginBottom = mgMeasure === 'px' ? `${marginBottom}px` : `${marginBottom}%`;

  const createTitle = () => {
    const titleArr = [];
    const _title = title.split('<br />');
    if (_title.length > 1) {
      _title.map((v, i) => {
        if (i < _title.length - 1) {
          titleArr.push(
            <span key={i}>
              {v}
              <br />
            </span>
          );
        } else {
          titleArr.push(<span key={i}>{v}</span>);
        }
      });
      return titleArr;
    }
    return title;
  };

  const customStyle = {};
  if (width !== undefined) customStyle.width = measure === 'px' ? `${width}px` : `${width}%`;
  if (height !== undefined) {
    customStyle.height = height + 'px';
    if (lineHeight !== undefined) {
      customStyle.lineHeight = lineHeight + 'px';
    } else {
      if (sub !== undefined) {
        customStyle.lineHeight = 1;
      } else {
        customStyle.lineHeight = line !== undefined ? height - 2 + 'px' : height + 'px';
      }
    }
  }
  if (fontSize !== undefined) {
    customStyle.fontSize = fontSize + 'px';
  }
  if (fontWeight !== undefined) {
    customStyle.fontWeight = fontWeight;
  }

  const combineStyle = Object.assign(marginStyle, customStyle);

  const handleClick = useCallback(
    (e) => {
      if (disabled){
        e.preventDefault();
        return;
      }
      if (onClick) {         
        onClick(e, dataContext);
      }
    },
    [dataContext, onClick, disabled]
  );

  return (
    <span className={btn_style} style={combineStyle} onClick={handleClick}>
      {nextLink ? (
        iconReverse ? (
          <Link href={href}>
            <a>
              {iconType !== undefined && <i className={`ico-${iconType}`} />}
              {createTitle()}
              {sub !== undefined && <em>{sub}</em>}
            </a>
          </Link>
        ) : (
          <Link href={href}>
            <a>
              {createTitle()}
              {iconType !== undefined && <i className={`ico-${iconType}`} />}
              {sub !== undefined && <em>{sub}</em>}
            </a>
          </Link>
        )
      ) : buttonMarkup ? (
        iconReverse ? (
          <button type="button" disabled={disabled} name={name} >
            {iconType !== undefined && <i className={`ico-${iconType}`} />}
            {createTitle()}
            {sub !== undefined && <em>{sub}</em>}
          </button>
        ) : (
          <button type="button" disabled={disabled} name={name} value={value} >
            {createTitle()}
            {iconType !== undefined && <i className={`ico-${iconType}`} />}
            {sub !== undefined && <em>{sub}</em>}
          </button>
        )
      ) : iconReverse ? (
        <a href={href} target={target}>
          {iconType !== undefined && <i className={`ico-${iconType}`} />}
          {createTitle()}
          {sub !== undefined && <em>{sub}</em>}
        </a>
      ) : (
        <a href={href} target={target}>
          {createTitle()}
          {iconType !== undefined && <i className={`ico-${iconType}`} />}
          {sub !== undefined && <em>{sub}</em>}
        </a>
      )}
    </span>
  );
};

Button.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  background: PropTypes.string,
  radius: PropTypes.bool,
  shadow: PropTypes.bool,
  title: PropTypes.string,
  sub: PropTypes.string,
  width: PropTypes.node,
  height: PropTypes.node,
  lineHeight: PropTypes.number,
  circle: PropTypes.bool,
  iconType: PropTypes.string,
  iconReverse: PropTypes.bool,
  marginLeft: PropTypes.number,
  marginTop: PropTypes.number,
  marginRight: PropTypes.number,
  marginBottom: PropTypes.number,
  nextLink: PropTypes.bool,
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
  buttonMarkup: PropTypes.bool,
  fontSize: PropTypes.node,
  fontWeight: PropTypes.node
};

export default React.memo(Button);
