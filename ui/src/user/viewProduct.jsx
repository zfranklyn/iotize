import {
    Grid,
    Row,
    Col,
    Image,
    Tabs,
    Tab,
    Alert,
    Button,
  } from 'react-bootstrap';
  

import React, { Component } from 'react';
import CommentComponent from './CommentComponent';
import faker from 'faker';

import SettingsComponent from './settingsComponent';
import NewCommentComponent from './NewCommentComponent';
import axios from 'axios';

class ViewProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loaded: false,
          viewState: {
            showModal: false,
            accountCreated: false,
            showCommentModal: false,
          },
          object: {},
        }
    }

    // urlRoot = 'https://cc6c85a4.ngrok.io';
    urlRoot = '';
    // urlRoot = 'http://localhost:8080'
    
    componentDidMount() {
      axios.get(`${this.urlRoot}/api/object/${this.props.match.params.productId}`)
      .then(d => d.data)
      .then(foundObject => {
        console.log(foundObject);
        this.setState({
          loaded: true,
          object: foundObject,
        });
      })
      .catch(console.log);
    }

    closeModal = () => {
      this.setState({
        viewState: {
          loaded: true,
          showModal: false,
          showCommentModal: false,
        }
      });
    }

    openModal = () => {
      const originalViewState = this.state.viewState;
      this.setState({
        viewState: Object.assign({}, originalViewState, {
          showModal: true,
        })
      });
    }

    openCommentModal = () => {
      const originalViewState = this.state.viewState;
      this.setState({
        viewState: Object.assign({}, originalViewState, {
          showCommentModal: true,
        })
      });
    }

    submitComment = (commentText) => {
      axios.post(`${this.urlRoot}/api/object/${this.props.match.params.productId}/comment`, {
        commentBody: commentText,
      })
      .then(() => {
        this.closeModal();
      })
      .catch(console.log);
      
    }

    render() {

      if (this.state.loaded && this.state.object) {

        console.log(this.state);
        let MaintenanceButton = null;
        let PurchaseButton = null;

        if (this.state.object.actions.maintenance.enabled) {
          MaintenanceButton = (
            <Button bsStyle="primary" bsSize="small" block>Report Broken</Button>
          );
        }

        if (this.state.object.actions.purchase.enabled) {
          PurchaseButton = (
            <Button bsStyle="primary" bsSize="small" block>Purchase this Item</Button>
          );
        }        

        if (this.state.loaded) {
          return (
            <div className="container">

              <div className="floating-button"
                style={FLOATING_BUTTON_STYLE}
                onClick={this.openModal}
              />

              {
                this.state.object.details.imageURLs.length ? 
                  <Image className="main-img" src={this.state.object.details.imageURLs[0]} responsive />
                  : null
              }
              

              <Grid>
                <Row>
                  <Col xs={12}>
                  <Tabs defaultActiveKey={1} id="nav-tab">
                    <Tab eventKey={1} title="Overview">
                      <h3>
                        {this.state.object.name}
                      </h3>
                      {
                        !!this.state.object.actions.maintenance.maintenanceMessage ? 
                          <Alert bsStyle="warning">
                            {this.state.object.actions.maintenance.maintenanceMessage}
                          </Alert>
                        : null
                      }
                      <p>
                        {this.state.object.details.description}
                      </p>
                      {MaintenanceButton}
                      {PurchaseButton}
                    </Tab>
                    <Tab eventKey={2} title="Comments">
                      {this.state.object.comments.map((commentObject, index) => {
                        return (
                          <CommentComponent
                            key={index}
                            name={commentObject.name}
                            comment={commentObject.comment}
                          />
                        );
                      })}

                      <div style={{position: 'fixed', bottom: 0, left: 0, width: '100%'}}>
                        <Button
                          bsStyle="primary"
                          bsSize="large"
                          block
                          onClick={this.openCommentModal}
                        >
                        Comment
                        </Button>
                      </div>
                    </Tab>
                  </Tabs>
                  </Col>
                </Row>
              </Grid>

              <SettingsComponent
                showModal={this.state.viewState.showModal}
                closeModal={this.closeModal}
                accountCreated={this.state.viewState.accountCreated}
              />
              <NewCommentComponent
                showCommentModal={this.state.viewState.showCommentModal}
                closeModal={this.closeModal}
                submitComment={this.submitComment}
              />
            </div>

          );
        } else {
          return (
            <div>Loading</div>
          );
        }

      } else {
        return (
          <div>Loading</div>
        );
    }
  }
}

const FIXEDBUTTON = {
  position: 'relative',
  margin: '0 auto',
  // texAtlign: 'center'
}

const FLOATING_BUTTON_STYLE = {
  height: '4em',
  width: '4em',
  position: 'fixed',
  top: '10px',
  right: '10px',
  border: '1px solid black',
  borderRadius: '4em',
  backgroundColor: 'gray'
}

export default ViewProduct;