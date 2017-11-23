import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedCreateGroupModal, { CreateGroupModal } from
  '../../components/messages/CreateGroupModal';

let props;
const setup = () => {
  props = {
    createGroup: jest.fn(),
    updateGroup: jest.fn(),
    editGroupStatus: true,
    selectedGroup: {},
    currentUserId: 1
  };
  return shallow(<CreateGroupModal {...props} />);
};

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  auth: { currentUser: { id: 2 } },
  messages: {},
  editGroupStatus: true
});

describe('Create Group Modal Component', () => {
  it('should render without crashing', () => {
    const wrapper = setup();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div').length).toBeGreaterThan(0);
  });

  it('should call the handleChange method', () => {
    const wrapper = setup();
    const handleChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleChange'
    );
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'group a'
      }
    };
    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalled();
  });

  it('should call the handleSubmit method', () => {
    const wrapper = setup();
    const handleSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleSubmit'
    );
    const event = {
      preventDefault: jest.fn()
    };
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the handleBlur method', () => {
    const wrapper = setup();
    const handleBlurSpy = jest.spyOn(
      wrapper.instance(), 'handleBlur'
    );
    wrapper.instance().handleBlur();
    expect(handleBlurSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the handleFocus method', () => {
    const wrapper = setup();
    const handleFocusSpy = jest.spyOn(
      wrapper.instance(), 'handleFocus'
    );
    wrapper.instance().handleFocus();
    expect(handleFocusSpy).toHaveBeenCalledTimes(1);
  });


  it('should call the componentWillReceiveProps method', () => {
    const wrapper = shallow(<CreateGroupModal {...props} />);
    const componentWillReceivePropsSpy = jest.spyOn(
      wrapper.instance(), 'componentWillReceiveProps'
    );
    const nextProps = {
      editGroupStatus: true,
      selectedGroup: {
        groupName: 'group b'
      }
    };
    wrapper.instance().componentWillReceiveProps(nextProps)
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should render the right elements', () => {
    const wrapper = shallow(<CreateGroupModal {...props} />);
    expect(wrapper.find('h5').length).toBe(1);
    expect(wrapper.find('h5').text()).toBe('Group Name');
    expect(wrapper.find('Button').length).toBe(1);
    expect(wrapper.find('TextInput').length).toBe(1);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedCreateGroupModal {...props} store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });
});
