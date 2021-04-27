import React, { Component, Fragment } from 'react';
import { Button, Form, Icon, Input, Menu, Modal } from 'semantic-ui-react';
import { _firebase } from '../../config/firebase';
import { setCurrentChannel } from '../../actions/channelActions';
import { connect } from 'react-redux';

class Channels extends Component {
  state = {
    activeChannelId: '',
    user: this.props.currentUser,
    channels: [],
    channelName: '',
    channelDetails: '',
    channelsRef: _firebase.database().ref('channels'),
    modal: false,
    firstLoad: true,
  };

  componentDidMount() {
    this.addListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    let loadedChannels = [];
    this.state.channelsRef.on('child_added', (snap) => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels }, this.setFirstChannel);
    });
  };

  removeListeners = () => {
    console.log('componentWillUnmount called');
    this.state.channelsRef.off();
  };

  setFirstChannel = () => {
    // const firstChannel = this.state.channels[0];
    const { firstLoad, channels } = this.state;
    if (firstLoad && channels.length > 0) {
      const firstChannel = channels[0];
      this.props.setCurrentChannel(firstChannel);
      this.setActiveChannel(firstChannel);
    }
    this.setState({ firstLoad: false });
  };

  setActiveChannel(channel) {
    this.setState({ activeChannelId: channel.id });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;

  addChannel = async () => {
    const { channelsRef, channelName, channelDetails, user } = this.state;

    const key = channelsRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL,
      },
    };

    try {
      await channelsRef.child(key).update(newChannel);
      this.setState({ channelName: '', channelDetails: '' });
    } catch (err) {
      console.error(err);
    } finally {
      this.closeModal();
    }
  };

  changeChannel = (channel) => {
    this.props.setCurrentChannel(channel);
    this.setActiveChannel(channel);
  };

  displayChannels = (channels) =>
    channels.length > 0 &&
    channels.map((channel) => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === this.state.activeChannelId}
      >
        # {channel.name}
      </Menu.Item>
    ));

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      await this.addChannel();
    }
  };

  render() {
    const { channels, modal } = this.state;

    return (
      <Fragment>
        <Menu.Menu style={{ paddingBottom: '2em' }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{' '}
            ({channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {this.displayChannels(channels)}
        </Menu.Menu>

        {/* Add Channel Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Fragment>
    );
  }
}

export default connect(null, { setCurrentChannel })(Channels);
