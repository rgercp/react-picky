/// <reference types="react" />
export declare type Value = string | number | object | any[] | undefined;
export interface PlaceholderProps {
    placeholder?: string;
    value?: Value;
    numberDisplayed?: number;
    multiple?: boolean;
    valueKey?: string;
    labelKey?: string;
    manySelectedPlaceholder?: string;
    allSelectedPlaceholder?: string;
    allSelected: boolean;
}
export interface PickyProps extends PlaceholderProps {
    value?: Value;
    multiple?: boolean;
    options: any[];
    open?: boolean;
    includeSelectAll?: boolean;
    includeFilter?: boolean;
    filterDebounce?: number;
    dropdownHeight?: number;
    valueKey?: string;
    labelKey?: string;
    itemHeight?: number;
    tabIndex?: number;
    keepOpen?: boolean;
    virtual?: boolean;
    selectAllText?: string;
    onChange?(value: Value): void;
    onFiltered?(values: Value): void;
    onOpen?(): void;
    onClose?(): void;
    render?(props: RenderProps): JSX.Element;
    renderSelectAll?(props: SelectAllRenderProps): void;
}
export interface SelectAllRenderProps {
    filtered: boolean;
    allSelected: boolean;
    toggleSelectAll(): void;
    tabIndex: number | undefined;
    multiple: boolean;
}
export interface FilterProps {
    onFilterChange(term: string): void;
    tabIndex: number | undefined;
}
export interface RenderProps {
    index: number;
    style: object;
    item: any;
    isSelected: boolean;
    selectValue(value: Value): void;
    labelKey: string | undefined;
    valueKey: string | undefined;
    multiple: boolean;
    tabIndex: number | undefined;
    parentId: string;
    key: any;
}
export interface OptionProps {
    isSelected: boolean;
    valueKey: string | undefined;
    labelKey: string | undefined;
    item: Value;
    style: object;
    selectValue(value: Value): void;
    multiple: boolean;
    tabIndex: number | undefined;
}
export interface PickyState {
    selectedValue: Value;
    open: boolean;
    filtered: boolean;
    filteredOptions: any[];
    id: string;
    allSelected: boolean;
}
