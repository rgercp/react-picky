/// <reference types="react" />
import * as React from 'react';
import { CellMeasurerCache } from 'react-virtualized';
import './Picky.scss';
import { PickyProps, Value, PickyState } from './types';
declare class Picky extends React.Component<PickyProps, PickyState> {
    static defaultProps: {
        numberDisplayed: number;
        options: any[];
        filterDebounce: number;
        dropdownHeight: number;
        onChange: () => void;
        itemHeight: number;
        tabIndex: number;
        keepOpen: boolean;
        virtual: boolean;
        selectAllText: string;
    };
    cellMeasurerCache: CellMeasurerCache;
    node: HTMLDivElement | null;
    constructor(props: PickyProps);
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: PickyProps): void;
    isControlled: () => boolean;
    onChange: (value: any) => void;
    selectValue: (val: Value) => void;
    /**
     * Toggles select all
     *
     * @memberof Picky
     */
    toggleSelectAll: () => void;
    isItemSelected: (item: Value) => boolean;
    keyExtractor: (item: Value) => string;
    renderVirtualList: (items: any[]) => JSX.Element;
    renderPlainList: (items: any[]) => JSX.Element[];
    renderOptions: () => JSX.Element | JSX.Element[];
    /**
     * Called when Filter term changes. Sets filteredOptions and filtered state.
     *
     * @param {any} term
     * @returns
     * @memberof Picky
     */
    onFilterChange: (term: string) => void;
    /**
     *
     * Called by a click event listener. Used to determine any clicks that occur outside of the component.
     * @param {MouseEvent} e
     * @returns
     * @memberof Picky
     */
    handleOutsideClick: (e: MouseEvent) => void;
    /**
     * Toggle state of dropdown
     *
     * @memberof Picky
     */
    toggleDropDown: () => void;
    render(): JSX.Element;
}
export default Picky;
