import * as React from 'react';
import PropTypes from 'prop-types';
import {
  CellMeasurer,
  CellMeasurerCache,
  List,
  AutoSizer
} from 'react-virtualized';
import debounce from 'lodash.debounce';
import './Picky.scss';
import Placeholder from './Placeholder';
import Filter from './Filter';
import Option from './Option';
import { generateGuid, allSelected, isDataObject } from './helpers';
import {
  PickyProps,
  Value,
  SelectAllRenderProps,
  RenderProps,
  PickyState
} from './types';
//import './polyfills';

const defaultRender = (props: RenderProps): JSX.Element => (
  <Option
    style={props.style}
    key={props.key}
    item={props.item}
    isSelected={props.isSelected}
    selectValue={props.selectValue}
    labelKey={props.labelKey}
    valueKey={props.valueKey}
    multiple={props.multiple}
    tabIndex={props.tabIndex}
    parentId={props.parentId}
    index={props.index}
  />
);

class Picky extends React.Component<PickyProps, PickyState> {
  static defaultProps = {
    numberDisplayed: 3,
    options: [],
    filterDebounce: 150,
    dropdownHeight: 300,
    onChange: () => {},
    itemHeight: 35,
    tabIndex: 0,
    keepOpen: true,
    virtual: true,
    selectAllText: 'Select all'
  };

  cellMeasurerCache: CellMeasurerCache;
  node: HTMLDivElement | null = null;
  constructor(props: PickyProps) {
    super(props);
    this.state = {
      selectedValue: props.value || (props.multiple ? [] : null),
      open: props.open,
      filtered: false,
      filteredOptions: [],
      id: generateGuid(),
      allSelected: false
    } as PickyState;

    this.cellMeasurerCache = new CellMeasurerCache({
      defaultHeight: props.itemHeight || 35,
      fixedWidth: false
    });
  }

  // Lifecycle

  componentWillMount() {
    this.setState({
      allSelected: allSelected(this.state.selectedValue, this.props.options)
    });
  }

  componentWillReceiveProps(nextProps: PickyProps) {
    if (
      this.props.options !== nextProps.options ||
      this.state.selectedValue !== nextProps.value
    ) {
      this.setState({
        allSelected: allSelected(this.state.selectedValue, this.props.options)
      });
    }
  }

  // Methods
  isControlled = () => this.props.value != null;

  onChange = (value: any) => this.props.onChange && this.props.onChange(value);

  selectValue = (val: Value) => {
    const { value, multiple } = this.props;
    const { selectedValue } = this.state;

    const valueLookup: Value = this.isControlled() ? value : selectedValue;

    if (multiple && Array.isArray(valueLookup)) {
      if (valueLookup.indexOf(val) > -1) {
        const currIndex = valueLookup.indexOf(val);
        // Remove
        this.setState(
          {
            selectedValue: [
              ...valueLookup.slice(0, currIndex),
              ...valueLookup.slice(currIndex + 1)
            ]
          },
          () => {
            this.onChange(this.state.selectedValue);
          }
        );
      } else {
        const castSelectedValue = selectedValue as any[];
        this.setState(
          {
            selectedValue: castSelectedValue.concat(val)
          },
          () => {
            this.onChange(this.state.selectedValue);
          }
        );
      }
    } else {
      this.setState(
        {
          selectedValue: val
        },
        () => {
          this.onChange(this.state.selectedValue);
        }
      );
    }
  };

  /**
   * Toggles select all
   *
   * @memberof Picky
   */
  toggleSelectAll = () => {
    this.setState(
      {
        selectedValue: !this.state.allSelected ? this.props.options : [],
        allSelected: !this.state.allSelected
      },
      () => {
        // Call onChange prop with new values
        this.onChange(this.state.selectedValue);
      }
    );
  };

  isItemSelected = (item: Value): boolean => {
    let isSelected = false;

    // If controlled component determine selected state based on props.
    if (this.isControlled()) {
      isSelected =
        (Array.isArray(this.props.value) &&
          this.props.value.indexOf(item) > -1) ||
        (!Array.isArray(this.props.value) && this.props.value === item);
    } else {
      // If not a controlled component determine selected state based on state
      isSelected =
        (Array.isArray(this.state.selectedValue) &&
          this.state.selectedValue.indexOf(item) > -1) ||
        (!Array.isArray(this.state.selectedValue) &&
          this.state.selectedValue === item);
    }
    return isSelected;
  };
  // Create a key based on the options value
  keyExtractor = (item: Value): string =>
    isDataObject(item as object, this.props.labelKey, this.props.valueKey)
      ? item[this.props.valueKey]
      : item;

  renderVirtualList = (items: any[]) => {
    return (
      <AutoSizer>
        {({ width, height }) => {
          let actualWidth = width;
          // Used to reduce warning when in test env.
          if (process.env.NODE_ENV === 'test') {
            actualWidth = window.innerWidth;
          }

          return (
            <List
              defaultHeight={height}
              height={this.props.dropdownHeight || 300}
              width={actualWidth}
              rowCount={items.length}
              rowHeight={this.cellMeasurerCache.rowHeight}
              rowRenderer={({ index, parent, style }) => {
                const _parent = parent as List;
                const item = items[index] as Value;
                const isSelected: boolean = this.isItemSelected(item);
                const key = this.keyExtractor(item);
                const renderProps = {
                  key,
                  index,
                  style: {},
                  item,
                  isSelected,
                  selectValue: this.selectValue,
                  labelKey: this.props.labelKey,
                  valueKey: this.props.valueKey,
                  multiple: this.props.multiple,
                  parentId: this.state.id,
                  tabIndex: this.props.tabIndex
                } as RenderProps;
                return (
                  <CellMeasurer
                    cache={this.cellMeasurerCache}
                    columnIndex={0}
                    key={key}
                    rowIndex={index}
                    parent={parent as any}
                  >
                    {this.props.render !== undefined
                      ? this.props.render(renderProps)
                      : defaultRender(renderProps)}
                  </CellMeasurer>
                );
              }}
            />
          );
        }}
      </AutoSizer>
    );
  };

  renderPlainList = (items: any[]) => {
    return items.map((item, index) => {
      const isSelected: boolean = this.isItemSelected(item);
      const key = this.keyExtractor(item);
      const renderProps = {
        key,
        index,
        style: {},
        item,
        isSelected,
        selectValue: this.selectValue,
        labelKey: this.props.labelKey,
        valueKey: this.props.valueKey,
        multiple: this.props.multiple,
        parentId: this.state.id,
        tabIndex: this.props.tabIndex
      } as RenderProps;
      if (typeof this.props.render === 'function') {
        return this.props.render(renderProps);
      } else {
        return defaultRender(renderProps);
      }
    });
  };

  renderOptions = () => {
    const { options, virtual } = this.props;
    const { filtered, filteredOptions } = this.state;
    const items = filtered ? filteredOptions : options;

    if (virtual) {
      return this.renderVirtualList(items);
    } else {
      return this.renderPlainList(items);
    }
  };

  /**
   * Called when Filter term changes. Sets filteredOptions and filtered state.
   *
   * @param {any} term
   * @returns
   * @memberof Picky
   */
  onFilterChange = (term: string) => {
    if (!term.trim())
      return this.setState({ filtered: false, filteredOptions: [] });

    const { options, labelKey, valueKey, onFiltered } = this.props;
    const filteredOptions = options.filter(option => {
      if (isDataObject(option, labelKey || '', valueKey || '')) {
        return (
          String(option[labelKey || ''])
            .toLowerCase()
            .indexOf(term.toLowerCase()) > -1
        );
      }
      return (
        String(option)
          .toLowerCase()
          .indexOf(term.toLowerCase()) > -1
      );
    });

    this.setState(
      {
        filtered: true,
        filteredOptions
      },
      () => onFiltered && onFiltered(filteredOptions)
    );
  };

  /**
   *
   * Called by a click event listener. Used to determine any clicks that occur outside of the component.
   * @param {MouseEvent} e
   * @returns
   * @memberof Picky
   */
  handleOutsideClick = (e: MouseEvent) => {
    // If keep open then don't toggle dropdown
    // If radio and not keepOpen then auto close it on selecting a value
    const keepOpen = this.props.keepOpen || this.props.multiple;
    if (
      this.node !== null &&
      this.node.contains(e.target as Node) &&
      keepOpen
    ) {
      return;
    }
    this.toggleDropDown();
  };

  /**
   * Toggle state of dropdown
   *
   * @memberof Picky
   */
  toggleDropDown = () => {
    if (!this.state.open) {
      // Add event listener to listen for clicks to determine if click occured outside the component or not
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      // Remove
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState(
      {
        // Toggle open state
        open: !this.state.open
      },
      () => {
        const isOpen = this.state.open;
        // Prop callbacks
        if (isOpen && this.props.onOpen) {
          this.props.onOpen();
        } else if (!isOpen && this.props.onClose) {
          this.props.onClose();
        }
      }
    );
  };
  render() {
    const {
      placeholder,
      value,
      multiple,
      numberDisplayed,
      includeSelectAll,
      includeFilter,
      filterDebounce,
      valueKey,
      labelKey,
      tabIndex,
      dropdownHeight,
      renderSelectAll,
      virtual
    } = this.props;
    const { open, id } = this.state;

    let ariaOwns: string = '';

    if (open) {
      ariaOwns += id + '-list';
    }

    let dropdownStyle = {};
    if (!virtual) {
      dropdownStyle = { maxHeight: dropdownHeight, overflowY: 'scroll' };
    }

    return (
      <div
        ref={node => {
          this.node = node;
        }}
        className="picky"
        id={this.state.id}
        role="combobox"
        aria-controls={`${this.state.id}__button`}
        aria-expanded={open}
        aria-haspopup={open}
        aria-owns={ariaOwns}
        tabIndex={tabIndex}
      >
        <button
          id={`${this.state.id}__button`}
          type="button"
          className="picky__input"
          onClick={this.toggleDropDown}
        >
          <Placeholder
            allSelected={this.state.allSelected}
            placeholder={placeholder}
            manySelectedPlaceholder={this.props.manySelectedPlaceholder}
            allSelectedPlaceholder={this.props.allSelectedPlaceholder}
            value={this.isControlled() ? value : this.state.selectedValue}
            multiple={multiple}
            numberDisplayed={numberDisplayed}
            valueKey={valueKey}
            labelKey={labelKey}
          />
        </button>
        {open && (
          <div
            className="picky__dropdown"
            data-test="dropdown"
            id={this.state.id + '-list'}
            style={dropdownStyle}
          >
            {includeFilter && (
              <Filter
                onFilterChange={
                  filterDebounce && filterDebounce > 0
                    ? debounce(this.onFilterChange, filterDebounce)
                    : this.onFilterChange
                }
                tabIndex={tabIndex}
              />
            )}
            {renderSelectAll &&
              renderSelectAll({
                filtered: this.state.filtered,
                allSelected: this.state.allSelected,
                toggleSelectAll: this.toggleSelectAll,
                tabIndex,
                multiple
              } as SelectAllRenderProps)}
            {!renderSelectAll &&
              includeSelectAll &&
              multiple &&
              !this.state.filtered && (
                <div
                  tabIndex={tabIndex}
                  role="option"
                  id={this.state.id + '-option-' + 'selectall'}
                  data-selectall="true"
                  aria-selected={this.state.allSelected}
                  className={
                    this.state.allSelected ? 'option selected' : 'option'
                  }
                  onClick={this.toggleSelectAll}
                  onKeyPress={this.toggleSelectAll}
                >
                  <input
                    type="checkbox"
                    readOnly
                    onClick={this.toggleSelectAll}
                    tabIndex={-1}
                    checked={this.state.allSelected}
                    aria-label="select all"
                  />
                  <span data-test="select-all-text">
                    {this.props.selectAllText}
                  </span>
                </div>
              )}
            {this.renderOptions()}
          </div>
        )}
      </div>
    );
  }
}

export default Picky;
