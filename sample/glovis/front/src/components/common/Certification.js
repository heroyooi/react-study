import React, { Component } from 'react';
import Router from 'next/router';
import { apiUrl } from '@src/utils/HttpUtils';
const globalThis = require('globalthis')();

/**
 * 설명 : 본인인증
 * @fileoverview
 * @requires {props} 팝업
 * @author D191545
 */

class Certification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show , 
      agent : globalThis?.window?.navigator?.userAgent?.toLowerCase()
    };
  }

  componentDidMount() {
    console.log('componentDidMount is called');

    window.addEventListener('message', this.certCallback);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('prevProps  >>> ', prevProps);
    console.log('prevState  >>> ', prevState);

    //alert(this.state.show);

    if (this.state.show !== prevState.show) {
      return false;
    }

    console.log('apiUrl:', apiUrl);
    // const url = '/api/certification/certRequest.do';
    const url = `${apiUrl}/api/certification/certRequest.do`;
    console.log('url:::::::::', url);
    if (this.state.agent.indexOf("chrome") != -1) {
      let iframe = document.getElementById('iframe');
      if (iframe == null) {
        iframe = document.createElement('Iframe');
        iframe.setAttribute('id', 'iframe');
        iframe.setAttribute('name', 'iframe');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '100%');
      }
      let form = document.getElementById('certificationPop');
      if (form == null) {
        form = document.createElement('form');
        form.setAttribute('id', 'certificationPop');
        let hiddenField = '';
        for (let key in this.props.data) {
          hiddenField = document.createElement('input');
          hiddenField.setAttribute('type', 'hidden');
          hiddenField.setAttribute('name', key);
          hiddenField.setAttribute('value', this.props.data[key]);
          form.appendChild(hiddenField);
        }
      }

      let certPop = document.getElementById('certPop');
      certPop.appendChild(iframe);
      certPop.appendChild(form);

      console.log(url);
      form.action = url;
      form.target = 'iframe';
      form.method = 'post';
      form.submit();


      if (this.props.show !== prevProps.show) {
        this.setState({ show: this.props.show });
      }
    } else {
      if(this.props.show) {
        let newWindow = window.open(url, "certPop", 'location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes');

        if (!newWindow) return false;

        let html = "";
        html += "<html><head></head><body><form id='formid' method='post' action='" + url + "'>";

        html += "</form><script type='text/javascript'>document.getElementById(\"formid\").submit()</script></body></html>";

        console.log(html)
        newWindow.document.write(html);
      }

    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    window.removeEventListener('message', this.certCallback);
  }

  certCallback = (e) => {
    //본인인증 callback
    console.log('callback ee >>> ', e.data);
    console.log('callback ee >>> ', typeof e.data);
    let certPop = document.getElementById('certPop');
    if (this.state.agent.indexOf("chrome") != -1) {
      this.setState({ show: false });
    } 

    if (this.props.callback) this.props.callback(e.data);
  };

  render() {
    return (
      <>
        <div id="certPop" style={{ display: this.state.show ? 'inline-block' : 'none', position: 'fixed', zIndex: 1, left: 0, top: 0, width: '100%', height: '100%', overflow: 'auto' , zIndex:'200'}}></div>
      </>
    );
  }
}

export default Certification;
