import React from 'react';
import { shallow } from 'enzyme';
import TextInput from '../../src/components/common/TextInput';

let props;

const setup = (icon, error) => {
  props = {
    icon: icon,
    onChange: jest.fn(),
    text: 'send',
    type: 'email',
    name: 'email',
    value: 'email',
    error: error
  }

  return shallow(<TextInput {...props } />);
};

describe('Text Input Component', () => {
  it('should render without crashing', () => {
    const wrapper = setup();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('input').length).toBe(1);
  });

  it('should display an icon if it receives an icon prop', () => {
    const wrapper = setup('email');
    const icon = wrapper.find('i');
    expect(icon.length).toBe(1);
    expect(icon.text()).toBe('email');
  });

  it('should render a span if it receives an error prop', () => {
    const wrapper = setup('', 'Text too short');
    const span = wrapper.find('span');
    expect(span.length).toBe(1);
    expect(span.text()).toBe('Text too short');
  });
});
