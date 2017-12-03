import React, { Component } from 'react';
import {
    Modal,
    FormControl,
    ControlLabel,
    Button,
    FormGroup,
    Tabs,
    Tab,
} from 'react-bootstrap';
import faker from 'faker';

class NewCommentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            comment: '',
        }
      }
    
    componentDidMount() {
        // fetch and update user data
        this.setState({
            name: faker.name.firstName(),
            comment: '',
        })
    }

    handleChange = (e) => {
        this.setState({
            comment: e.target.value,
        });
    }

    handleSubmit = () => {
        this.props.submitComment(this.state.comment);
    }
    
    render() {
        return (
            <div>
                <Modal show={this.props.showCommentModal} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> 
                    <form>
                        <FormGroup>
                        <ControlLabel>Comment</ControlLabel>
                        <FormControl
                            value={this.state.comment}
                            onChange={this.handleChange}
                            type="text"
                            placeholder="Enter Comment..."
                        />
                        </FormGroup>
                        <Button 
                            bsStyle="primary" 
                            bsSize="large"
                            onClick={this.handleSubmit}
                        >Submit
                        </Button>
                    </form>                    
                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}


export default NewCommentComponent;