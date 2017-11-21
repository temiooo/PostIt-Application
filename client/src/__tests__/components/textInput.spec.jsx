import React from 'react';
import { shallow } from 'enzyme';
import TextInput from '../../components/common/TextInput';

const props = (icon, error) => {
  return {
    icon: icon,
    onChange: jest.fn(),
    text: 'send',
    type: 'email',
    name: 'email',
    value: 'email',
    error: error
  }
};

describe('Text Input Component', () => {
  it('renders a div and an input', () => {
    const wrapper = shallow(<TextInput {...props() } />)
    const wrapperDiv = wrapper.find('div');
    const input = wrapper.find('input')
    expect(wrapperDiv.length).toBeGreaterThan(0);
    expect(input.length).toBe(1);
  });

  it('renders a icon if it receives an icon prop', () => {
    const wrapper = shallow(<TextInput {...props('email') } />)
    const icon = wrapper.find('i');
    expect(icon.length).toBe(1);
  });

  it('renders a span if it receives an error prop', () => {
    const wrapper = shallow(<TextInput {...props('', 'Text too short') } />)
    const span = wrapper.find('span');
    expect(span.length).toBe(1);
  });
});
