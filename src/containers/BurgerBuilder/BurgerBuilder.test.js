import React from 'react';

import { BurgerBuilder } from './BurgerBuilder';  //just a normal comonent, where the connection to redux has been completely stripped
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()})

describe('testing <BurgerBuilder/> ', ()=>{
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<BurgerBuilder onPurchasingInit={()=>{}} onFetchAndStoreIngredients={()=>{}}/>)
    })
    it('should render BuildControls when recieving ingredients', ()=> {
        wrapper.setProps({ingredients: {salad:0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})