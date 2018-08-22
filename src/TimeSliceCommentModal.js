import React, { Component } from 'react'
import { Button, Header, Icon, Input, Modal } from 'semantic-ui-react'

export default class TimeSliceCommentModal extends Component {

  state = {
    comment: ''
  }

  handleChange = e => {
    this.setState({
      comment: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (!this.state.comment) {
      return
    }
    this.props.onCommentSubmit(this.state.comment)
  }

  render() {
    return (
      <Modal
        open={this.props.modalOpen}
        onClose={this.handleClose}
        size='small'
      >
        <Modal.Header>
          Please describe what you're about to do.
        </Modal.Header>
        <Modal.Content>
          <form onSubmit={this.handleSubmit}>
            <Input
              placeholder='What are you gonna do?'
              onChange={this.handleChange}
              value={this.state.comment} />
            <Button color='green' type="submit">Submit</Button>
          </form>
        </Modal.Content>
      </Modal>
    )
  }
}