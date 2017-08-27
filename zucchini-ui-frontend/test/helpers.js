import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'


Enzyme.configure({ adapter: new Adapter() });

chai.use(chaiEnzyme());
