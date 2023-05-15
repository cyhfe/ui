# Tooltip

![state chart](./tooltip.png)

## basic

<code src="./demo.tsx">basic</code>

#### 状态机

写了一个简单状态机,rollup 打包发布到 npm
[https://github.com/cyhfe/state-machine](https://github.com/cyhfe/state-machine)

首先得有个状态机图(js 对象),包含以下几部分

- 初始状态
- 所有可能状态
  - actions: 进入和退出当前状态的副作用(callback)
  - transition: 根据对应事件切换到下一个状态,也可以有副作用

```ts
interface MachineDedinition<
  MachineStates extends string,
  MachineEvents extends string,
> {
  initialState: MachineStates;

  states: {
    [MachineState in MachineStates]?: {
      actions?: {
        onEnter?: () => void;
        onExit?: () => void;
      };
      transitions?: {
        [MachineEvent in MachineEvents]?: {
          target?: MachineStates;
          action?: () => void;
        };
      };
    };
  };
}
```

除此之外,还需要一个函数执行 transition

```ts
// 对应事件,返回下一个状态,执行副作用
    transition(event: MachineEvents) {
      const currentState = this.state;
      const nextState =
        machineDedinition.states[currentState]?.transitions?.[event]?.target;

      if (!nextState) {
        return {
          state: currentState,
          change: false,
        };
      }

      machineDedinition.states[currentState]?.actions?.onExit?.();
      this.state = nextState;
      machineDedinition.states[currentState]?.transitions?.[event]?.action?.();
      machineDedinition.states[nextState]?.actions?.onEnter?.();
      return {
        state: this.state,
        change: true,
      };
    },
```

其他可选的比如发布订阅,状态改变通知 callback

#### 看图写代码

这是我最喜欢状态机的部分.在适用的场景下,能够简化复杂的 UI 状态并且代码易于组织维护.

```ts
const chart = {
  initialState: TooltipStates.Idle,
  states: {
    [TooltipStates.Idle]: {
      actions: {},
      transitions: {
        [TooltipEvents.MouseEnter]: {
          target: TooltipStates.Focused,
        },
        [TooltipEvents.Focus]: {
          target: TooltipStates.Visible,
        },
      },
    },
    [TooltipStates.Focused]: {
      actions: {
        onEnter: startRestTimer,
        onExit: clearRestTimer,
      },
      transitions: {
        [TooltipEvents.MouseMove]: {
          target: TooltipStates.Focused,
        },
        [TooltipEvents.MouseLeave]: {
          target: TooltipStates.Idle,
        },
        [TooltipEvents.MouseDown]: {
          target: TooltipStates.Dismissed,
        },
        [TooltipEvents.Blur]: {
          target: TooltipStates.Idle,
        },
        [TooltipEvents.Rest]: {
          target: TooltipStates.Visible,
        },
      },
    },
    [TooltipStates.Visible]: {
      transitions: {
        [TooltipEvents.Focus]: {
          target: TooltipStates.Focused,
        },
        [TooltipEvents.MouseEnter]: {
          target: TooltipStates.Focused,
        },
        [TooltipEvents.MouseLeave]: {
          target: TooltipStates.LeavingVisible,
        },
        [TooltipEvents.Blur]: {
          target: TooltipStates.LeavingVisible,
        },
        [TooltipEvents.MouseDown]: {
          target: TooltipStates.Dismissed,
        },
      },
    },
    [TooltipStates.LeavingVisible]: {
      actions: {
        onEnter: startLeavingVisibleTimer,
        onExit: () => {
          clearLeavingVisibleTimer();
        },
      },
      transitions: {
        [TooltipEvents.MouseEnter]: {
          target: TooltipStates.Visible,
        },
        [TooltipEvents.Focus]: {
          target: TooltipStates.Visible,
        },
        [TooltipEvents.TimeComplete]: {
          target: TooltipStates.Idle,
        },
      },
    },
    [TooltipStates.Dismissed]: {
      actions: {
        onEnter: startLeavingVisibleTimer,
      },
      transitions: {
        [TooltipEvents.MouseLeave]: {
          target: TooltipStates.Idle,
        },
        [TooltipEvents.Blur]: {
          target: TooltipStates.Idle,
        },
      },
    },
  },
};
```

#### 通过 DOM 事件改变状态

```ts
const onMouseLeave = () => {
  send(TooltipEvents.MouseLeave);
};
```

#### useRect

因为要实现 tooltip 特性:

- 全局同时只能存在一个
- 渲染在 Portal 外

全局一个状态机,根据 TooltipId 确定显示对应组件
因为渲染在外部 DOM,无法直接定位 tooltip 的位置,需要获取 target 的 `getBoundingRect`
并且在 scroll,resize 等 target 位置信息变化时更新位置.

具体实现参考[useRect](use-rect)
