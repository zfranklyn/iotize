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

class ViewProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
          itemName: '',
          itemDescription: '',
          comments: [],
        }
      }
    
      componentDidMount() {
        this.setState({
          itemName: 'Bench Press',
          itemDescription: `Transform any space into a personal free weight fitness center
          Adjusts to six different positions, 17-degree decline to 90-degree incline
          Comes with a removable leg hold-down brace for added decline position support
          Corrects posture and stabilizes positioning for a safe, muscle-building free-weight workout
          30-Year warranty on frame, one-year warranty on upholstery`,
          comments: [{name: 'Alfred', comment: 'Yo'}, {name: 'Franklyn', comment: 'yo'}, {name: 'Francis', comment: 'yo my girlfriend is calling'}]
        });
      }
    
      render() {
        return (
          <div className="container">
            <Image className="main-img" src="/bench.jpeg" responsive />
            <Grid>
              <Row>
                <Col xs={12}>
                <Tabs defaultActiveKey={1} id="nav-tab">
                  <Tab eventKey={1} title="Overview">
                    <h3>
                      {this.state.itemName}
                    </h3>
                    <p>
                      {this.state.itemDescription}
                    </p>
                  </Tab>
                  <Tab eventKey={2} title="Actions">
                    <Button bsStyle="primary" bsSize="small" block>Report Broken</Button>
                  </Tab>
                  <Tab eventKey={3} title="Comments">
                    {this.state.comments.map((commentObject) => {
                      return (
                        <CommentComponent
                          name={commentObject.name}
                          comment={commentObject.comment}
                        />
                      );
                    })}
    
                    <Button bsStyle="primary" bsSize="small" block>Comment</Button>
                  </Tab>
                </Tabs>
                </Col>
              </Row>
            </Grid>
          </div>
        );
      }
}

export default ViewProduct;