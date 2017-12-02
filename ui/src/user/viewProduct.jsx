import {
    Grid,
    Row,
    Col,
    Image,
    Tabs,
    Tab,
    Button,
  } from 'react-bootstrap';
  

import React, { Component } from 'react';
import CommentComponent from './CommentComponent';
import faker from 'faker';

import SettingsComponent from './settingsComponent';
import NewCommentComponent from './NewCommentComponent';

class ViewProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
          viewState: {
            loaded: false,
            userId: '',
            accountCreated: false,
            showModal: true,
            showCommentModal: true,
          },
          id: '',
          name: '',
          details: {
            imageUrls: [],
            description: '',
            customAlerts: []
          },
          actions: {
            maintenance: {
              enabled: false,
              statusBroken: false,
              maintenanceMessage: '',
            },
            purchase: {
              enabled: true,
            },
            custom: [],
          },
          comments: [],
        }
    }
    
    componentWillMount() {
      this.setState({
        viewState: {
          loaded: true,
          userId: 2,
          accountCreated: false,
          showModal: false,
          showCommentModal: false,
        },
        
        id: 1,
        name: 'Bench Press',
        details: {
          imageUrls: ['/bench.jpeg'],
          description: faker.lorem.paragraphs(2),
          customAlerts: []
        },
        actions: {
          maintenance: {
            enabled: true,
            statusBroken: false,
            maintenanceMessage: '',
          },
          purchase: {
            enabled: true,
          },
          custom: [],
        },
        comments: [
          {name: faker.name.firstName(), comment: faker.lorem.sentences(3)},
          {name: faker.name.firstName(), comment: faker.lorem.sentences(3)},
          {name: faker.name.firstName(), comment: faker.lorem.sentences(3)},
        ]
      });
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
      console.log(commentText);
      // post
      this.closeModal();
    }

    render() {

      let MaintenanceButton = null;
      let PurchaseButton = null;

      if (this.state.actions.maintenance.enabled) {
        MaintenanceButton = (
          <Button bsStyle="primary" bsSize="small" block>Report Broken</Button>
        );
      }

      if (this.state.actions.purchase.enabled) {
        PurchaseButton = (
          <Button bsStyle="primary" bsSize="small" block>Purchase this Item</Button>
        );
      }        

      if (this.state.viewState.loaded) {
        return (
          <div className="container">

            <div className="floating-button"
              style={FLOATING_BUTTON_STYLE}
              onClick={this.openModal}
            />

            <Image className="main-img" src={this.state.details.imageUrls[0]} responsive />

            <Grid>
              <Row>
                <Col xs={12}>
                <Tabs defaultActiveKey={1} id="nav-tab">
                  <Tab eventKey={1} title="Overview">
                    <h3>
                      {this.state.name}
                    </h3>
                    <p>
                      {this.state.details.description}
                    </p>
                    {MaintenanceButton}
                    {PurchaseButton}
                  </Tab>
                  <Tab eventKey={2} title="Comments">
                    {this.state.comments.map((commentObject, index) => {
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
              //closeModal={this.closeModal}
              submitComment={this.submitComment}
            />
          </div>

        );
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