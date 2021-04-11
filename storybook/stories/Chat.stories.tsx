import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import Chat, {
  Bubble,
  MessageProps,
  ChatProps,
  useMessages,
  QuickReplyItemProps,
  useQuickReplies,
} from '../../src';
import '../../src/styles/index.less';

export default {
  title: 'Chat',
  component: Chat,
  argTypes: {
    wideBreakpoint: {
      control: {
        type: 'inline-radio',
        options: ['300px', '500px', '600px', ''],
      },
    },
    locale: {
      control: {
        type: 'inline-radio',
        options: ['zh-CN', 'en-US'],
      },
    },
  },
} as Meta;

const initialMessages = [
  {
    type: 'text',
    content: { text: 'Hi~ Welcome to Senior Guradian!' },
    user: { },
    // user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
  },
  {
    type: 'text',
    content: { text: 'Our aim is to help the ager people find the best insurance cover at the best price' },
    user: { },
    // user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
  },
  {
    type: 'text',
    content: { text: 'I\'m Tim' },
    user: { },
  },
  // {
  //   type: 'image',
  //   content: {
  //     picUrl: '//img.alicdn.com/tfs/TB1p_nirYr1gK0jSZR0XXbP8XXa-300-300.png',
  //   },
  // },
];

// 默认快捷短语，可选
const defaultQuickReplies = [
  {
    icon: 'message',
    name: '联系人工服务',
    code: 'q1',
    isNew: true,
    isHighlight: true,
  },
  {
    name: '短语1',
    code: 'q2',
    isNew: true,
  },
  {
    name: '短语2',
    code: 'q3',
    isHighlight: true,
  },
  {
    name: '短语3',
    code: 'q4',
  },
];

export const Default = (args: ChatProps) => {
  // 消息列表
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);
  const { quickReplies, replace } = useQuickReplies(defaultQuickReplies);

  // 发送回调
  function handleSend(type: string, val: string) {
    if (type === 'text' && val.trim()) {
      // TODO: 发送请求
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      setTyping(true);

      // 模拟回复消息
      setTimeout(() => {
        appendMsg({
          type: 'text',
          content: { text: 'Please enter your full name to get started!' },
        });
      }, 1000);
    }
  }

  // 快捷短语回调，可根据 item 数据做出不同的操作，这里以发送文本消息为例
  function handleQuickReplyClick(item: QuickReplyItemProps) {
    handleSend('text', item.name);

    if (item.code === 'q1') {
      replace([
        {
          name: '短语a',
          code: 'qa',
          isHighlight: true,
        },
        {
          name: '短语b',
          code: 'qb',
        },
      ]);
    }
  }

  function renderMessageContent(msg: MessageProps) {
    const { type, content } = msg;

    // 根据消息类型来渲染
    switch (type) {
      case 'text':
        return <Bubble content={content.text} />;
      case 'image':
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }

  return (
    <Chat
      {...args}
      navbar={{ title: 'SENIOR GUARDIAN' }}
      toolbar={[
        {
          type: 'photo',
          title: 'Photo',
          icon: 'image',
        },
      ]}
      messages={messages}
      renderMessageContent={renderMessageContent}
      quickReplies={quickReplies}
      onQuickReplyClick={handleQuickReplyClick}
      onSend={handleSend}
    />
  );
};

Default.args = {
  recorder: {
    canRecord: true,
  },
  rightAction: {
    icon: 'apps',
  },
};
