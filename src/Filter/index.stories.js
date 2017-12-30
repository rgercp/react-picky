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
import Filter from './index';
const stories = storiesOf('Filter', module);

stories.addDecorator(withKnobs);

stories
  .add('default', () => <Filter />)
  .add('onFilterChange', () => (
    <Filter onFilterChange={action('onFilterChange')} />
  ));
