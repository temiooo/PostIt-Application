import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../components/common/Button.jsx';

describe('Button Component', () => {
  it('renders a button', () => {
    const props = {
      className: "btn waves-effect waves-light red darken-1",
      icon: "send",
      onClick: jest.fn(),
      text: "send"
    }
    const wrapper = shallow(<Button {...props} />)
    const button = wrapper.find('button');
    expect(button.length).toBe(1)
  });
});
