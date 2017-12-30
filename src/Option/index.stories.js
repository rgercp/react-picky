import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs/react';

import { action } from '@storybook/addon-actions';
import Option from './index';
const stories = storiesOf('Option', module);

stories.addDecorator(withKnobs);

stories
  .add('default', () => (
    <div className="picky__dropdown">
      <Option
        id="option"
        item={text('Item', 'Item 1')}
        selectValue={action('selectValue')}
        multiple={boolean('Multiple', false)}
      />
    </div>
  ))
  .add('object item', () => (
    <div className="picky__dropdown">
      <Option
        id="option"
        item={object('Item', { id: 1, label: 'Complex Item 1' })}
        labelKey={text('Label Key', 'label')}
        valueKey={text('Value Key', 'id')}
        selectValue={action('selectValue')}
        multiple={boolean('Multiple', true)}
      />
    </div>
  ));
