import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  text,
  boolean,
  number,
  array,
  object
} from '@storybook/addon-knobs/react';

import { action } from '@storybook/addon-actions';
import Button from './index';
const stories = storiesOf('Placeholder', module);

stories.addDecorator(withKnobs);

stories
  .add('default', () => <Button id="id" />)
  .add('custom placeholder', () => (
    <Button
      id="id"
      placeholder={text('Placeholder', 'No items selected')}
      onClick={action('Clicked placeholder, toggles dropdown drawer')}
    />
  ))
  .add('simple value', () => (
    <Button
      id="id"
      placeholder={text('Placeholder', 'No items selected')}
      value={text('Value', 'Item 1')}
      onClick={action('Clicked placeholder, toggles dropdown drawer')}
    />
  ))
  .add('simple multi-value', () => (
    <Button
      id="id"
      placeholder={text('Placeholder', 'No items selected')}
      multiple={boolean('Multiple', true)}
      value={array('Value', ['Item 1', 'Item 2', 'Item 3'])}
      onClick={action('Clicked placeholder, toggles dropdown drawer')}
    />
  ))
  .add('complex single value', () => (
    <Button
      id="id"
      placeholder={text('Placeholder', 'No items selected')}
      multiple={boolean('Multiple', true)}
      value={object('Value', { id: 1, label: 'Item 1' })}
      labelKey={text('Label Key', 'label')}
      valueKey={text('Value Key', 'id')}
      onClick={action('Clicked placeholder, toggles dropdown drawer')}
    />
  ))
  .add('complex multi-value', () => (
    <Button
      id="id"
      placeholder={text('Placeholder', 'Change me')}
      multiple={boolean('Multiple', true)}
      value={object('Value', [
        { id: 1, label: 'Item 1' },
        { id: 2, label: 'Item 2' }
      ])}
      labelKey={text('Label Key', 'label')}
      valueKey={text('Value Key', 'id')}
      onClick={action('Clicked placeholder, toggles dropdown drawer')}
    />
  ))
  .add('numberDisplayed', () => (
    <Button
      id="id"
      placeholder={text('Placeholder', 'No items selected')}
      multiple={boolean('Multiple', true)}
      numberDisplayed={number('Number Displayed', 4)}
      value={object('Value', [
        { id: 1, label: 'Item 1' },
        { id: 2, label: 'Item 2' },
        { id: 3, label: 'Item 3' },
        { id: 4, label: 'Item 4' },
        { id: 5, label: 'Item 5' },
        { id: 6, label: 'Item 6' }
      ])}
      labelKey={text('Label Key', 'label')}
      valueKey={text('Value Key', 'id')}
      onClick={action('Clicked placeholder, toggles dropdown drawer')}
    />
  ));
