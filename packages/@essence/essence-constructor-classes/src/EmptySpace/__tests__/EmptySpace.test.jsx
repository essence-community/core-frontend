/*
 *Import * as React from "react";
 *
 *Import { mount } from 'enzyme';
 *import { getBaseBc } from '@essence-community/constructor-components/src/utils/test';
 *import { createEmptyPageStore } from '@essence-community/constructor-components/src/stores';
 *import EmptySpace from '@essence-community/constructor-components/src/EmptySpace/EmptySpace';
 *
 *describe('EmptySpace', () => {
 *  const bc = getBaseBc('empty')
 *    const pageStore = createEmptyPageStore()
 *
 *    it('render', () => {
 *    const wrapper = mount(<EmptySpace bc={bc} pageStore={pageStore} visible />)
 *
 *        expect(wrapper.find('div').length).toBe(1)
 *
 *        wrapper.unmount()
 *    })
 *
 *    it('render hidden', () => {
 *    const wrapper = mount(<EmptySpace bc={bc} pageStore={pageStore} hidden visible />)
 *
 *        expect(wrapper.find('div').length).toBe(0)
 *
 *        wrapper.unmount()
 *    })
 *})
 */
