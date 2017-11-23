import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../components/common/Button.jsx';

describe('Button Component', () => {
  it('should render without crashing', () => {
    const props = {
      className: "btn waves-effect waves-light red darken-1",
      icon: "send",
      onClick: jest.fn(),
      text: "send"
    };
    const wrapper = shallow(<Button {...props} />);
    expect(wrapper.getElement().type).toBe('button');
    expect(wrapper.find('button').length).toBe(1);
  });
});
