import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class pricingToPrintButton extends React.Component {
  constructor(props) {
    super(props);
    this.triggerRef = null;
    this.linkTotal = null;
    this.linksLoaded = null;
    this.linksErrored = null;
  }

  shouldComponentUpdate() {
    return false;
  }

  removeWindow = (target) => {
    setTimeout(() => {
      target.parentNode.removeChild(target);
    }, 0);
  };

  triggerPrint = (target) => {
    const { onBeforePrint, onAfterPrint } = this.props;

    if (onBeforePrint) {
      onBeforePrint();
    }

    setTimeout(() => {
      target.contentWindow.focus();

      target.contentWindow.print();

      // if ( navigator.userAgent.toLowerCase().indexOf('trident') > -1){
      //   try {
      //     const previewWeb = target.contentWindow.frames.document.getElementById('previewWeb');
      //     previewWeb.ExecWB(7, 1);
      //     previewWeb.outerHTML = "";
      //   } catch (e) {
      //     alert("- 도구 > 인터넷 옵션 > 보안 탭 > 신뢰할 수 있는 사이트 선택\n   1. 사이트 버튼 클릭 > 사이트 추가\n   2. 사용자 지정 수준 클릭 > 스크립팅하기 안전하지 않은 것으로 표시된 ActiveX 컨트롤 (사용)으로 체크\n\n※ 위 설정은 프린트 기능을 사용하기 위함임");
      //   }
      // } else {
      //   target.contentWindow.print();
      // }

      this.removeWindow(target);

      if (onAfterPrint) {
        onAfterPrint();
      }
    }, 0);
  };

  handlePrint = () => {
    const { bodyClass = '', content, copyStyles = true, pageStyle } = this.props;

    const contentEl = content();

    if (contentEl === undefined) {
      console.log(`Refs are not available for stateless components. For "react-to-print" to work only Class based components can be printed`);
      return;
    }

    const printWindow = document.createElement('iframe');
    printWindow.style.position = 'absolute';
    printWindow.style.top = '-1000px';
    printWindow.style.left = '-1000px';
    printWindow.name = 'printFrame';
    // eslint-disable-next-line react/no-find-dom-node
    const contentNodes = ReactDOM.findDOMNode(contentEl);
    const linkNodes = document.querySelectorAll("link[rel='stylesheet']");

    this.linkTotal = linkNodes.length || 0;
    this.linksLoaded = [];
    this.linksErrored = [];

    const markLoaded = (linkNode, loaded) => {
      if (loaded) {
        this.linksLoaded.push(linkNode);
      } else {
        console.log(`"react-to-print" was unable to load a link. It may be invalid. "react-to-print" will continue attempting to print the page. The link the errored was:`, linkNode);
        this.linksErrored.push(linkNode);
      }

      // We may have errors, but attempt to print anyways - maybe they are trivial and the user will
      // be ok ignoring them
      if (this.linksLoaded.length + this.linksErrored.length === this.linkTotal) {
        this.triggerPrint(printWindow);
      }
    };

    printWindow.onload = () => {
      /* IE11 support */
      if (window.navigator && window.navigator.userAgent.includes('Trident/7.0')) {
        printWindow.onload = null;
      }

      const webBrowser = '<OBJECT ID="previewWeb" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
      const domDoc = printWindow.contentDocument || printWindow.contentWindow.document;
      const srcCanvasEls = contentNodes.querySelectorAll('canvas');

      domDoc.open();
      domDoc.write(contentNodes.outerHTML);
      domDoc.body.insertAdjacentHTML('beforeEnd', webBrowser);

      domDoc.close();

      /* remove date/time from top */
      const defaultPageStyle = pageStyle === undefined ? '@page { size: auto;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }' : pageStyle;

      const styleEl = domDoc.createElement('style');
      styleEl.appendChild(domDoc.createTextNode(defaultPageStyle));
      domDoc.head.appendChild(styleEl);

      if (bodyClass.length) {
        domDoc.body.classList.add(bodyClass);
      }

      const canvasEls = domDoc.querySelectorAll('canvas');
      for (let index = 0, l = canvasEls.length; index < l; ++index) {
        const node = canvasEls[index];
        node.getContext('2d').drawImage(srcCanvasEls[index], 0, 0);
      }

      if (copyStyles !== false) {
        const headEls = document.querySelectorAll("style, link[rel='stylesheet']");

        for (let index = 0, l = headEls.length; index < l; ++index) {
          const node = headEls[index];
          if (node.tagName === 'STYLE') {
            const newHeadEl = domDoc.createElement(node.tagName);
            const sheet = node.sheet;

            if (sheet) {
              let styleCSS = '';
              for (let i = 0; i < sheet.cssRules.length; i++) {
                if (typeof sheet.cssRules[i].cssText === 'string') {
                  styleCSS += `${sheet.cssRules[i].cssText}\r\n`;
                }
              }
              newHeadEl.setAttribute('id', `react-to-print-${index}`);
              newHeadEl.appendChild(domDoc.createTextNode(styleCSS));
              domDoc.head.appendChild(newHeadEl);
            }

            const printCssEl = domDoc.createElement('STYLE');

            printCssEl.setAttribute('id', `react-to-print-999`);
            domDoc.head.appendChild(printCssEl);
          } else {
            // Many browsers will do all sorts of weird things if they encounter an empty `href`
            // tag (which is invalid HTML). Some will attempt to load the current page. Some will
            // attempt to load the page"s parent directory. These problems can cause
            // `react-to-print` to stop  without any error being thrown. To avoid such problems we
            // simply do not attempt to load these links.
            if (node.hasAttribute('href') && !!node.getAttribute('href')) {
              const newHeadEl = domDoc.createElement(node.tagName);

              // node.attributes has NamedNodeMap type that not Array and can be iterated only via direct [i] access
              for (let i = 0, l = node.attributes.length; i < l; ++i) {
                const attr = node.attributes[i];
                newHeadEl.setAttribute(attr.nodeName, attr.nodeValue);
              }

              newHeadEl.onload = markLoaded.bind(null, newHeadEl, true);
              newHeadEl.onerror = markLoaded.bind(null, newHeadEl, false);
              domDoc.head.appendChild(newHeadEl);
            } else {
              markLoaded(node, true);
            }
          }
        }
      }

      if (this.linkTotal === 0 || copyStyles === false) {
        this.triggerPrint(printWindow);
      }
    };

    document.body.appendChild(printWindow);
  };

  setRef = (ref) => {
    this.triggerRef = ref;
  };

  render() {
    return React.cloneElement(this.props.trigger(), {
      onClick: this.handlePrint,
      ref: this.setRef
    });
  }
}

pricingToPrintButton.propTypes = {
  bodyClass: PropTypes.string,
  content: PropTypes.any,
  copyStyles: PropTypes.bool,
  pageStyle: PropTypes.string,
  trigger: PropTypes.func,
  onAfterPrint: PropTypes.func,
  onBeforePrint: PropTypes.func
};

pricingToPrintButton.defaultProps = {
  copyStyles: true
};

export default pricingToPrintButton;
