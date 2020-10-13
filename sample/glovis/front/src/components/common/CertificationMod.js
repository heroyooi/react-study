import React, { Component } from 'react';
import { apiUrl } from '@src/utils/HttpUtils';

/**
 * 설명 : 본인인증(모바일용 본인인증)
 * @fileoverview 
 * @requires {props} 팝업
 * @author 김지현 
 */

class CertificationMod extends Component {
  constructor(props) {
    super(props);
    this.state = {show : this.props.show, mode : this.props.mode} 
  }

  componentDidMount() {
    window.addEventListener('message', this.certCallback);
  }

  componentDidUpdate(prevProps, prevState) {
    // popup show   
    if(this.state.show !== prevState.show) {
      //this.setState({show : false});
      return false;
    }

    //const url = '/api/certification/certModRequest.do';
    const url = `${apiUrl}/api/certification/certModRequest.do`;
    //console.log(url);

    let iframe = document.getElementById("iframe");
    if(iframe == null) {
      iframe = document.createElement("Iframe");
      iframe.setAttribute("id", "iframe");
      iframe.setAttribute("name", "iframe");
      iframe.setAttribute("width", "100%");
      iframe.setAttribute("height", "100%");
    }
    let form = document.getElementById("certificationPop");
    if(form == null) {
      form = document.createElement('form');
      form.setAttribute("id", "certificationPop")
      let hiddenField = '';
      for(let key in this.props.data) {
        hiddenField = document.createElement('input');
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", this.props.data[key]);
        form.appendChild(hiddenField);
      }
    }

    let certPop = document.getElementById("certModPop");
    certPop.appendChild(iframe);
    certPop.appendChild(form);

    form.action = url;
    form.target = 'iframe';
    form.method = 'post';
    form.submit(); 

    //if (this.props.show && this.props.mode == 1) {
    if (this.props.show !== prevProps.show) {
      this.setState({ show: this.props.show });
    }
}

componentWillUnmount() {
  window.removeEventListener('message', this.certCallback);
}

certCallback = (e) => { //본인인증 callback
  console.log("callback ee >>> ", e.data);
  console.log("callback ee >>> ", typeof e.data);
  let certPop = document.getElementById("certModPop");
  this.setState({show : false});

  if(this.props.callback) this.props.callback(e.data);
};

render() {
    return (
      <>
        <div id="certModPop" style={{display:this.state.show? 'inline-block':'none',position:'fixed',zIndex:1,left:0,top:0,width:'100%',height:'100%',overflow:'auto'}}></div>
      </>
    );
  }
}

export default CertificationMod