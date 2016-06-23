/// <reference path="../../typings/index.d.ts" />

import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import expect from 'expect'

import App from '../../src/app/App.tsx'

describe('<App />', () => {

    it('should be defined', () => {
        const action = { type: 'ANY_TYPE' }
        expect(shallow(<App action={ action } />).contains(<div />)).toEqual(true);
    })

})