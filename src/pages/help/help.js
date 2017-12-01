/**
 * Created by zengtao on 2017/5/19.
 */
import React from 'react';
import {Button, Input, Alert} from 'antd';
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as index_act from "../../actions/index";
import {mapstate} from "../../reducers/shuju"
import Head from '../../components/public/head'

class Help extends React.Component {
  constructor(arg) {
    super(arg);

  }

  componentWillMount = () => {}

  render() {
    return (
      <div className="zhuye">
        Help
      </div>
    )
  }
}

function bindact(dispatch) {
  return bindActionCreators(index_act, dispatch)
}

export default connect(mapstate, bindact)(Help);