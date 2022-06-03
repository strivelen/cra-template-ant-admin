const { isUseServerMenu } = require('config');

export default class ActionConfig {
  constructor(actionConfig) {
    this.actions = actionConfig || [];
  }

  bindAuth(actionTypes = []) {
    const actions = this.actions;
    // 不使用服务端菜单数据渲染时不需要进行action认证
    if (!isUseServerMenu) {
      return this;
    }
    if (actions.length === 0) {
      return this;
    }
    this.actions = actions.filter(action => {
      const condition1 = action.auth === false; // 当auth等于false时表示此按钮不认证，要返回。
      const condition2 = actionTypes.find(typeItem => typeItem.Action === action.auth); // 当前按钮认证类型在可认证类型中能检索到，要返回。
      return condition1 || condition2;
    });
    return this;
  }

  generatePositionActions() {
    const positionActions = {};
    this.actions.forEach(actionItem => {
      if (!positionActions[actionItem.position]) {
        positionActions[actionItem.position] = [actionItem];
      } else {
        positionActions[actionItem.position].push(actionItem);
      }
    });
    return positionActions;
  }
}

export class HandleAction extends ActionConfig {
  constructor(actions, info) {
    super(actions);
    this.actions = actions;
    this.injectData(info);
  }

  injectData(data) {
    this.actions = this.actions.map(action => {
      const actionKeys = Object.keys(action);
      const afterAction = {};
      actionKeys.forEach(key => {
        if (typeof action[key] === 'function') {
          afterAction[key] = action[key](data);
        } else {
          afterAction[key] = action[key];
        }
      });
      return afterAction;
    });
  }

  isVisible() {
    this.actions = this.actions.filter(action => {
      if (typeof action.visible === 'undefined') {
        return true;
      }
      return action.visible;
    });
    return this;
  }
}
