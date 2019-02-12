import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import api from 'payload/api';

const mapState = state => ({
  locale: state.common.locale
})

const withEditData = PassedComponent => {

  class EditData extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data: null
      }
    }

    fetchData = () => {
      const slug = this.props.match.params.slug;
      const params = {
        lang: this.props.locale
      };

      if (slug) {
        api.requests.get(`${this.props.config.serverUrl}/${this.props.collection.slug}/${slug}`, params).then(
          res => this.setState({ data: res }),
          err => {
            console.warn(err);
            this.props.history.push('/not-found');
          }
        )
      }
    }

    componentDidMount() {
      this.fetchData();
    }

    componentDidUpdate(prevProps) {
      if (prevProps.locale !== this.props.locale) {
        this.fetchData();
      }
    }

    render() {
      return <PassedComponent {...this.props} data={this.state.data} />;
    }
  }

  return withRouter(connect(mapState)(EditData));
}

export default withEditData;