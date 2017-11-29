import $ from 'jquery';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

global.$ = $;
$.prototype.sideNav = () => { };
$.prototype.material_select = () => { };
$.prototype.modal = () => { };
