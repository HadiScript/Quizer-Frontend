// import { Link } from 'react-router-dom';
import bannerImage from '../assets/imgs/workshero.webp'


export const Nav30DataSource = {
  wrapper: { className: 'header3 home-page-wrapper lwknaajkcx-editor_css' },
  page: { className: 'home-page lwkn8oxm13-editor_css' },
  logo: {
    className: 'header3-logo',
    children:
      'https://gw.alipayobjects.com/zos/basement_prod/b30cdc2a-d91c-4c78-be9c-7c63b308d4b3.svg',
  },
  Menu: {
    className: 'header3-menu',
    children: [
      {
        name: 'item0',
        className: 'header3-item',
        children: {
          href: '#',
          children: [{ children: 'Home', name: 'text' }],
        },

      },
      {
        name: 'item1',
        className: 'header3-item',
        children: {
          href: '#',
          children: [{ children: 'Features', name: 'text' }],
        },
      },
      {
        name: 'item2',
        className: 'header3-item',
        children: {
          href: '#',
          children: [{ children: 'Showcase', name: 'text' }],
        },
        subItem: [
          {
            name: 'sub0',
            className: 'item-sub',
            children: {
              className: 'item-sub-item',
              children: [
                {
                  name: 'image0',
                  className: 'item-image',
                  children:
                    'https://gw.alipayobjects.com/zos/rmsportal/ruHbkzzMKShUpDYMEmHM.svg',
                },
                {
                  name: 'title',
                  className: 'item-title',
                  children: 'Ant Design',
                },
                {
                  name: 'content',
                  className: 'item-content',
                  children: '企业级 UI 设计体系',
                },
              ],
            },
          },
          {
            name: 'sub1',
            className: 'item-sub',
            children: {
              className: 'item-sub-item',
              children: [
                {
                  name: 'image0',
                  className: 'item-image',
                  children:
                    'https://gw.alipayobjects.com/zos/rmsportal/ruHbkzzMKShUpDYMEmHM.svg',
                },
                {
                  name: 'title',
                  className: 'item-title',
                  children: 'Ant Design',
                },
                {
                  name: 'content',
                  className: 'item-content',
                  children: '企业级 UI 设计体系',
                },
              ],
            },
          },
        ],
      },
      {
        name: 'item3',
        className: 'header3-item',
        children: {
          href: '#',
          children: [{ children: 'Get Started', name: 'text' }],
        },
      },
    ],
  },
  mobileMenu: { className: 'header3-mobile-menu' },
};


export const Banner50DataSource = {
  wrapper: { className: 'home-page-wrapper banner5' },
  page: { className: 'home-page banner5-page' },
  childWrapper: {
    className: 'banner5-title-wrapper',
    children: [
      { name: 'title', children: 'How to create your own Quiz or Survey', className: 'banner5-title' },
      {
        name: 'explain',
        className: 'banner5-explain',
        children: 'Design, Share and Analyse Quiz or Survey with SAWAL app in minutes.',
      },
      {
        name: 'content',
        className: 'banner5-content',
        children: 'Create Now!',
      },
      {
        name: 'button',
        className: 'banner5-button-wrapper',
        children: {
          href: '/signin',
          className: 'banner5-button',
          type: 'primary',
          children: 'Get Started With Free',
        },
      },
    ],
  },
  image: {
    className: 'banner5-image',
    children:
      bannerImage,
    // 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*-wAhRYnWQscAAAAAAAAAAABkARQnAQ',
  },
};

export const Content110DataSource = {
  OverPack: {
    className: 'home-page-wrapper content11-wrapper',
    playScale: 0.3,
  },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'image',
        children:
          'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
        className: 'title-image',
      },
      { name: 'title', children: 'Start Your SAWAL Journey', className: 'title-h1' },
      {
        name: 'content',
        children:
          'Effortlessly  Craft, Customize, and Analyze Your Quizzes.',
        className: 'title-content',
      },
    ],
  },
  button: {
    className: '',
    children: { a: { className: 'button', href: '/signin', children: 'Get started for free' } },
  },
};
