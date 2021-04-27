import React, { Component, Fragment } from 'react';
import MessagesHeader from './MessagesHeader';
import { Comment, Segment } from 'semantic-ui-react';
import MessageForm from './MessageForm';
import { _firebase } from '../../config/firebase';

class Messages extends Component {
  state = {
    messagesRef: _firebase.database().ref('messages'),
    channel: this.props.currentChannel,
    user: this.props.currentUser,
  };

  render() {
    const { messagesRef, channel, user } = this.state;

    return (
      <Fragment>
        <MessagesHeader />

        <Segment>
          <Comment.Group className="messages">{/* Messages */}</Comment.Group>
        </Segment>

        <MessageForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
        />
      </Fragment>
    );
  }
}

export default Messages;
