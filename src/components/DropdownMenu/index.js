import React, { Component } from 'react';
import cx from 'classnames';
import ClickOutside from 'react-click-outside';

import styles from './styles.styl';

export default class DropdownMenu extends Component {
  state = {
    visible: false
  };

  toggleDropdown = ev => {
    this.setState({ visible: !this.state.visible });
  };

  clickedOutside = () => {
    this.state.visible && this.setState({ visible: false });
  };

  getRef = ref => {
    this.contentRef = ref;
  };

  onContentClick = ev => {
    if (this.props.stayOpen) {
      ev.stopPropagation();
    }
  };

  render() {
    const {
      inline,
      children,
      className,
      contentClassName,
      renderContent
    } = this.props;

    const { visible } = this.state;

    return (
      <ClickOutside
        className={cx(
          styles.root,
          visible && styles.isOpen,
          inline && styles.inline,
          className
        )}
        onClick={this.toggleDropdown}
        onClickOutside={this.clickedOutside}
      >
        {children}

        {visible && (
          <div
            onClick={this.onContentClick}
            className={cx(styles.content, contentClassName)}
          >
            {renderContent()}
          </div>
        )}
      </ClickOutside>
    );
  }
}
