import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()})

describe('testing <NavigationItems/>', () => {
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems/>);
    })
    it('should render two <NavigationItem/> components if not authenticated', () => { //isAuth is considered false here since isAuth not passed
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })
    it('should render three <NavigationItem/> components if authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuth/>); //passing it(isAuth) like this will automatically pass it as true
        wrapper.setProps({isAuth:true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })
    it('should render <NavigationItem/> LOGOUT component if authenticated', () => {
        wrapper.setProps({isAuth:true})
        expect(wrapper.contains(<NavigationItem link="/logout">LogOut</NavigationItem>)).toEqual=true;
    })
})
