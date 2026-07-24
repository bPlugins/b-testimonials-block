/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/client-logos/edit.js"
/*!*****************************************!*\
  !*** ./src/blocks/client-logos/edit.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! immer */ "./node_modules/immer/dist/immer.esm.mjs");
/* harmony import */ var _shared_Components_Common_BlockSwitcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/Components/Common/BlockSwitcher */ "./src/shared/Components/Common/BlockSwitcher.js");
/* harmony import */ var _edit_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./edit.scss */ "./src/blocks/client-logos/edit.scss");
/* harmony import */ var _shared_styles_logos_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/styles/logos.scss */ "./src/shared/styles/logos.scss");









const gridVars = ({
  columns,
  columnGap,
  rowGap,
  logoHeight
}) => ({
  '--cols-d': columns?.desktop || 4,
  '--cols-t': columns?.tablet || 3,
  '--cols-m': columns?.mobile || 2,
  '--col-gap': columnGap,
  '--row-gap': rowGap,
  '--logo-h': `${logoHeight}px`
});
const Edit = ({
  attributes,
  setAttributes,
  clientId
}) => {
  const {
    logos = [],
    columns,
    columnGap,
    rowGap,
    logoHeight,
    grayscale
  } = attributes;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    clientId && setAttributes({
      cId: clientId.substring(0, 10)
    });
  }, [clientId]);
  const setColumn = (device, val) => setAttributes({
    columns: {
      ...columns,
      [device]: val
    }
  });
  const updateLogo = (index, key, val) => {
    setAttributes({
      logos: (0,immer__WEBPACK_IMPORTED_MODULE_4__.produce)(logos, draft => {
        draft[index][key] = val;
      })
    });
  };
  const addLogo = () => setAttributes({
    logos: [...logos, {
      img: {
        url: ''
      },
      link: ''
    }]
  });
  const removeLogo = index => setAttributes({
    logos: logos.filter((_, i) => i !== index)
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_shared_Components_Common_BlockSwitcher__WEBPACK_IMPORTED_MODULE_5__["default"], {
    clientId: clientId
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Layout', 'b-testimonials-block')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Columns (Desktop)', 'b-testimonials-block'),
    value: columns?.desktop,
    onChange: val => setColumn('desktop', val),
    min: 1,
    max: 8
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Columns (Tablet)', 'b-testimonials-block'),
    value: columns?.tablet,
    onChange: val => setColumn('tablet', val),
    min: 1,
    max: 6
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Columns (Mobile)', 'b-testimonials-block'),
    value: columns?.mobile,
    onChange: val => setColumn('mobile', val),
    min: 1,
    max: 4
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Column gap', 'b-testimonials-block'),
    value: columnGap,
    onChange: val => setAttributes({
      columnGap: val
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Row gap', 'b-testimonials-block'),
    value: rowGap,
    onChange: val => setAttributes({
      rowGap: val
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Style', 'b-testimonials-block'),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Logo height (px)', 'b-testimonials-block'),
    value: logoHeight,
    onChange: val => setAttributes({
      logoHeight: val
    }),
    min: 20,
    max: 200
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Grayscale (color on hover)', 'b-testimonials-block'),
    checked: grayscale,
    onChange: val => setAttributes({
      grayscale: val
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Logos', 'b-testimonials-block'),
    initialOpen: false
  }, logos.map((logo, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "btb-logo-row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    allowedTypes: ['image'],
    value: logo?.img,
    onSelect: media => updateLogo(index, 'img', {
      id: media.id,
      url: media.url,
      alt: media.alt
    }),
    render: ({
      open
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      variant: "secondary",
      onClick: open,
      className: "btb-logo-pick"
    }, logo?.img?.url ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: logo.img.url,
      alt: ""
    }) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select image', 'b-testimonials-block'))
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Link (optional)', 'b-testimonials-block'),
    value: logo?.link || '',
    onChange: val => updateLogo(index, 'link', val)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isDestructive: true,
    onClick: () => removeLogo(index),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove', 'b-testimonials-block')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Dashicon, {
    icon: "trash"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "primary",
    onClick: addLogo
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Dashicon, {
    icon: "plus"
  }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add logo', 'b-testimonials-block')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
      className: 'bClientLogos'
    })
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `logos-grid ${grayscale ? 'is-grayscale' : ''}`,
    style: gridVars(attributes)
  }, logos.map((logo, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "logo-item",
    key: index
  }, logo?.img?.url && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: logo.img.url,
    alt: logo?.img?.alt || ''
  }))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ },

/***/ "./src/shared/Components/Common/BlockSwitcher.js"
/*!*******************************************************!*\
  !*** ./src/shared/Components/Common/BlockSwitcher.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _BlockSwitcherModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BlockSwitcherModal */ "./src/shared/Components/Common/BlockSwitcherModal.js");





const BlockSwitcher = ({
  clientId,
  currentBlockName
}) => {
  const [isModalOpen, setIsModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    className: "bPlPanelBody btbSidebarSwitcherPanel",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select / Switch Block', 'b-testimonials-block'),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btbSidebarSwitcherCard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btbSidebarIconWrap"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-layout"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btbSidebarTextWrap"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "btbSidebarTitle"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Change Block Layout', 'b-testimonials-block')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "btbSidebarDesc"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Click below to open the popup modal and switch to any layout.', 'b-testimonials-block'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    className: "btbSidebarChangeBtn",
    onClick: () => setIsModalOpen(true)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-update"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Change Block / Layout', 'b-testimonials-block')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_BlockSwitcherModal__WEBPACK_IMPORTED_MODULE_3__["default"], {
    isOpen: isModalOpen,
    onRequestClose: () => setIsModalOpen(false),
    clientId: clientId,
    currentBlockName: currentBlockName
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlockSwitcher);

/***/ },

/***/ "./src/shared/Components/Common/BlockSwitcherModal.js"
/*!************************************************************!*\
  !*** ./src/shared/Components/Common/BlockSwitcherModal.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ALLOWED_CHILD_BLOCKS: () => (/* binding */ ALLOWED_CHILD_BLOCKS),
/* harmony export */   CHILD_BLOCKS_LIST: () => (/* binding */ CHILD_BLOCKS_LIST),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__);





const CHILD_BLOCKS_LIST = [
// Original 12 Blocks
{
  name: 'bptmb/testimonials-slider',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Testimonials Slider', 'b-testimonials-block'),
  category: 'layouts',
  icon: 'slides',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Interactive carousel slider with navigation dots.', 'b-testimonials-block'),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Slider', 'b-testimonials-block')
}, {
  name: 'bptmb/testimonials-list',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Testimonials List', 'b-testimonials-block'),
  category: 'layouts',
  icon: 'editor-ul',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clean, vertical list representation of reviews.', 'b-testimonials-block')
}, {
  name: 'bptmb/testimonials-masonry',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Testimonials Masonry', 'b-testimonials-block'),
  category: 'layouts',
  icon: 'dashboard',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Staggered grid layout for variable height cards.', 'b-testimonials-block')
}, {
  name: 'bptmb/testimonials-single',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Single Testimonial', 'b-testimonials-block'),
  category: 'layouts',
  icon: 'format-quote',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hero/Featured single testimonial highlight.', 'b-testimonials-block')
}, {
  name: 'bptmb/testimonials-marquee',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Testimonials Marquee', 'b-testimonials-block'),
  category: 'layouts',
  icon: 'update-alt',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Smooth infinite ticker tape / scrolling reviews.', 'b-testimonials-block'),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('New', 'b-testimonials-block')
}, {
  name: 'bptmb/rating-summary',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Rating Summary', 'b-testimonials-block'),
  category: 'social',
  icon: 'star-filled',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Overall score & star rating distribution summary.', 'b-testimonials-block')
}, {
  name: 'bptmb/testimonial-stats',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Testimonial Stats', 'b-testimonials-block'),
  category: 'social',
  icon: 'chart-bar',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Key statistics, satisfaction percentages & counters.', 'b-testimonials-block')
}, {
  name: 'bptmb/trust-badges',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Trust Badges', 'b-testimonials-block'),
  category: 'social',
  icon: 'shield',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Security, guarantee, and award badges.', 'b-testimonials-block')
}, {
  name: 'bptmb/client-logos',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Client Logos', 'b-testimonials-block'),
  category: 'social',
  icon: 'groups',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Showcase brand and client logos in grid or carousel.', 'b-testimonials-block')
}, {
  name: 'bptmb/video-testimonials',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Video Testimonials', 'b-testimonials-block'),
  category: 'media',
  icon: 'video-alt3',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Video reviews with lightbox popup playback.', 'b-testimonials-block'),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Video', 'b-testimonials-block')
}, {
  name: 'bptmb/before-after',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Before & After', 'b-testimonials-block'),
  category: 'media',
  icon: 'image-flip-horizontal',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Comparison showcase for results & transformation.', 'b-testimonials-block')
}, {
  name: 'bptmb/testimonial-form',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Testimonial Form', 'b-testimonials-block'),
  category: 'interactive',
  icon: 'feedback',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Frontend form for collecting customer reviews.', 'b-testimonials-block')
},
// 20 New Blocks
{
  name: 'bptmb/testimonials-grid-2',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Centered Cards Grid', 'b-testimonials-block'),
  category: 'layouts',
  icon: 'align-center',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sleek centered profile and testimonial card grid.', 'b-testimonials-block'),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Popular', 'b-testimonials-block')
}, {
  name: 'bptmb/testimonials-grid-3',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Gradient Border Grid', 'b-testimonials-block'),
  category: 'layouts',
  icon: 'grid-view',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Modern gradient border cards with star badges.', 'b-testimonials-block')
}, {
  name: 'bptmb/testimonials-carousel-2',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Coverflow Carousel', 'b-testimonials-block'),
  category: 'layouts',
  icon: 'columns',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Center-focused 3D coverflow carousel slider.', 'b-testimonials-block'),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('3D', 'b-testimonials-block')
}, {
  name: 'bptmb/testimonials-compact',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Compact Reviews List', 'b-testimonials-block'),
  category: 'layouts',
  icon: 'excerpt-view',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Space-saving minimal customer testimonial list.', 'b-testimonials-block')
}, {
  name: 'bptmb/testimonials-avatar-list',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Avatar Reviews List', 'b-testimonials-block'),
  category: 'layouts',
  icon: 'admin-users',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Prominent avatar & customer spotlight review rows.', 'b-testimonials-block')
}, {
  name: 'bptmb/testimonials-quote-box',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Quote Box Showcase', 'b-testimonials-block'),
  category: 'layouts',
  icon: 'format-quote',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bold quote mark styling with accent backgrounds.', 'b-testimonials-block')
}, {
  name: 'bptmb/testimonials-speech-bubble',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Speech Bubble Cards', 'b-testimonials-block'),
  category: 'layouts',
  icon: 'format-chat',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Chat bubble style testimonial cards.', 'b-testimonials-block'),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Popular', 'b-testimonials-block')
}, {
  name: 'bptmb/testimonials-timeline',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Customer Journey Timeline', 'b-testimonials-block'),
  category: 'layouts',
  icon: 'list-view',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Vertical timeline of customer success stories.', 'b-testimonials-block')
}, {
  name: 'bptmb/testimonials-card-stack',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Stacked Review Cards', 'b-testimonials-block'),
  category: 'layouts',
  icon: 'index-card',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Overlapping stacked review card deck.', 'b-testimonials-block')
}, {
  name: 'bptmb/case-study-card',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Customer Case Study', 'b-testimonials-block'),
  category: 'layouts',
  icon: 'welcome-learn-more',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Detailed case study card with metrics & quote.', 'b-testimonials-block'),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pro', 'b-testimonials-block')
}, {
  name: 'bptmb/google-review-badge',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Google Reviews Badge', 'b-testimonials-block'),
  category: 'social',
  icon: 'google',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Official style Google Business score badge.', 'b-testimonials-block'),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Badge', 'b-testimonials-block')
}, {
  name: 'bptmb/trustpilot-review-badge',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Trustpilot Score Badge', 'b-testimonials-block'),
  category: 'social',
  icon: 'star-filled',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Trustpilot style rating & review summary badge.', 'b-testimonials-block'),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Badge', 'b-testimonials-block')
}, {
  name: 'bptmb/g2-review-badge',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('G2 Review Badge', 'b-testimonials-block'),
  category: 'social',
  icon: 'awards',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('G2 / Capterra software review score badge.', 'b-testimonials-block')
}, {
  name: 'bptmb/review-badge-widget',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Floating Review Badge', 'b-testimonials-block'),
  category: 'social',
  icon: 'sticky',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Corner / floating trust review badge widget.', 'b-testimonials-block')
}, {
  name: 'bptmb/star-rating-bars',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Star Rating Progress Bars', 'b-testimonials-block'),
  category: 'social',
  icon: 'chart-bar',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('5-star rating breakdown bars & percentage stats.', 'b-testimonials-block')
}, {
  name: 'bptmb/social-proof-toast',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Social Proof Toast', 'b-testimonials-block'),
  category: 'social',
  icon: 'testimonial',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Live social proof popup notification toast.', 'b-testimonials-block'),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('New', 'b-testimonials-block')
}, {
  name: 'bptmb/audio-testimonials',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Audio Testimonials', 'b-testimonials-block'),
  category: 'media',
  icon: 'controls-play',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Voice note & audio review player with wave style.', 'b-testimonials-block'),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Audio', 'b-testimonials-block')
}, {
  name: 'bptmb/user-feedback-poll',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Feedback & NPS Poll', 'b-testimonials-block'),
  category: 'interactive',
  icon: 'chart-pie',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Quick Net Promoter Score (NPS) feedback poll.', 'b-testimonials-block')
}, {
  name: 'bptmb/comparison-testimonial-table',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Comparison Review Table', 'b-testimonials-block'),
  category: 'interactive',
  icon: 'table-col-after',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Side-by-side customer comparison table.', 'b-testimonials-block')
}, {
  name: 'bptmb/faq-testimonial-accordion',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('FAQ Review Accordion', 'b-testimonials-block'),
  category: 'interactive',
  icon: 'arrow-down-alt2',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Collapsible FAQ & customer feedback accordion.', 'b-testimonials-block')
},
// 8 New Blocks (40 Total)
{
  name: 'bptmb/testimonials-hero',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hero Testimonial Spotlight', 'b-testimonials-block'),
  category: 'layouts',
  icon: 'superhero',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('High-impact hero banner with quote & CTA.', 'b-testimonials-block'),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hero', 'b-testimonials-block')
}, {
  name: 'bptmb/testimonials-grid-minimal',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Minimalist Reviews Grid', 'b-testimonials-block'),
  category: 'layouts',
  icon: 'layout',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clean monochrome review cards with subtle hover elevation.', 'b-testimonials-block')
}, {
  name: 'bptmb/testimonials-slider-3d',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('3D Flip Perspective Carousel', 'b-testimonials-block'),
  category: 'layouts',
  icon: 'update',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Interactive 3D perspective flip card carousel slider.', 'b-testimonials-block'),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('3D', 'b-testimonials-block')
}, {
  name: 'bptmb/testimonials-floating-bubble',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Floating Avatar Bubbles', 'b-testimonials-block'),
  category: 'social',
  icon: 'bubbles',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Interactive floating customer avatar bubbles with popup tooltips.', 'b-testimonials-block')
}, {
  name: 'bptmb/facebook-review-badge',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Facebook Recommendation Badge', 'b-testimonials-block'),
  category: 'social',
  icon: 'facebook',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Official style Facebook page recommendation & rating summary badge.', 'b-testimonials-block'),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Badge', 'b-testimonials-block')
}, {
  name: 'bptmb/capterra-review-badge',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Capterra Score Badge', 'b-testimonials-block'),
  category: 'social',
  icon: 'star-half',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Software review rating summary badge styled like Capterra.', 'b-testimonials-block'),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Badge', 'b-testimonials-block')
}, {
  name: 'bptmb/verified-buyer-badge',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Verified Buyer Trust Seal', 'b-testimonials-block'),
  category: 'social',
  icon: 'yes-alt',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('E-commerce verified purchase seal & satisfaction guarantee widget.', 'b-testimonials-block')
}, {
  name: 'bptmb/testimonials-popup-modal',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Popup Modal Review Trigger', 'b-testimonials-block'),
  category: 'interactive',
  icon: 'external',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clickable badge/button that opens a full review popup modal.', 'b-testimonials-block'),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('New', 'b-testimonials-block')
}];
const ALLOWED_CHILD_BLOCKS = CHILD_BLOCKS_LIST.map(b => b.name);
const BlockSwitcherModal = ({
  isOpen,
  onRequestClose,
  clientId,
  currentBlockName
}) => {
  const [activeCategory, setActiveCategory] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('all');
  const [searchQuery, setSearchQuery] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const {
    currentBlock,
    innerBlocks
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    if (!clientId) return {
      currentBlock: null,
      innerBlocks: []
    };
    const block = select('core/block-editor').getBlock(clientId);
    return {
      currentBlock: block,
      innerBlocks: block ? block.innerBlocks : []
    };
  }, [clientId]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onRequestClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onRequestClose]);
  if (!isOpen) return null;
  const handleSelectChildBlock = targetBlockName => {
    onRequestClose();
    if (!clientId) return;
    try {
      const newChildBlock = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.createBlock)(targetBlockName);
      if (currentBlock && currentBlock.name === 'bptmb/b-testimonials') {
        if (innerBlocks && innerBlocks.length > 0) {
          (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)('core/block-editor').replaceBlock(innerBlocks[0].clientId, newChildBlock);
        } else {
          (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)('core/block-editor').insertBlock(newChildBlock, 0, clientId);
        }
      } else {
        (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)('core/block-editor').replaceBlock(clientId, newChildBlock);
      }
    } catch (err) {
      console.error('Failed to insert/switch child block:', err);
    }
  };
  const filteredBlocks = CHILD_BLOCKS_LIST.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const categories = [{
    id: 'all',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('All 40 Blocks', 'b-testimonials-block')
  }, {
    id: 'layouts',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Grid & Layouts', 'b-testimonials-block')
  }, {
    id: 'social',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Trust & Badges', 'b-testimonials-block')
  }, {
    id: 'media',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Media & Audio', 'b-testimonials-block')
  }, {
    id: 'interactive',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Forms & Polls', 'b-testimonials-block')
  }];
  let activeChildName = '';
  if (currentBlock) {
    if (currentBlock.name === 'bptmb/b-testimonials') {
      activeChildName = innerBlocks?.[0]?.name || '';
    } else {
      activeChildName = currentBlock.name;
    }
  }
  if (!activeChildName && currentBlockName) {
    activeChildName = currentBlockName.startsWith('bptmb/') ? currentBlockName : `bptmb/${currentBlockName}`;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btb-custom-modal-backdrop",
    onClick: onRequestClose
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btb-custom-modal-dialog",
    onClick: e => e.stopPropagation()
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btb-custom-modal-header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btb-modal-title-wrap"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btb-modal-header-icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-grid-view"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "btb-modal-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Testimonial Block Switcher', 'b-testimonials-block')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "btb-modal-desc"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select from 40+ modern layouts & social proof widgets', 'b-testimonials-block')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "btb-modal-close-btn",
    onClick: onRequestClose,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Close modal', 'b-testimonials-block')
  }, "\xD7")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btb-custom-modal-toolbar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btb-modal-cats"
  }, categories.map(cat => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: cat.id,
    type: "button",
    className: `btb-cat-chip ${activeCategory === cat.id ? 'is-active' : ''}`,
    onClick: () => setActiveCategory(cat.id)
  }, cat.label))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btb-modal-search-box"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-search search-icon"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Search layouts…', 'b-testimonials-block'),
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value)
  }), searchQuery && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "clear-search-btn",
    onClick: () => setSearchQuery('')
  }, "\xD7"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btb-custom-modal-grid"
  }, filteredBlocks.map(item => {
    const isCurrent = item.name === activeChildName;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: item.name,
      className: `btb-modern-card ${isCurrent ? 'is-active' : ''}`,
      onClick: () => handleSelectChildBlock(item.name)
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "btb-modern-card-header"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "btb-modern-icon"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: `dashicons dashicons-${item.icon}`
    })), item.badge && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "btb-modern-badge"
    }, item.badge)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "btb-modern-card-body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
      className: "btb-modern-card-title"
    }, item.title, isCurrent && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "btb-active-pill"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Active', 'b-testimonials-block'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "btb-modern-card-desc"
    }, item.desc)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "btb-modern-card-footer"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "button",
      className: `btb-modern-select-btn ${isCurrent ? 'is-selected' : ''}`,
      onClick: e => {
        e.stopPropagation();
        handleSelectChildBlock(item.name);
      }
    }, isCurrent ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Currently Selected', 'b-testimonials-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Use This Layout', 'b-testimonials-block'))));
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlockSwitcherModal);

/***/ },

/***/ "./src/shared/utils/icons.js"
/*!***********************************!*\
  !*** ./src/shared/utils/icons.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockIcon: () => (/* binding */ blockIcon),
/* harmony export */   horizontalLineIcon: () => (/* binding */ horizontalLineIcon),
/* harmony export */   leftQuote: () => (/* binding */ leftQuote),
/* harmony export */   rightQuote: () => (/* binding */ rightQuote),
/* harmony export */   star: () => (/* binding */ star),
/* harmony export */   symbol: () => (/* binding */ symbol),
/* harmony export */   upload: () => (/* binding */ upload),
/* harmony export */   verticalLineIcon: () => (/* binding */ verticalLineIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const leftQuote = (color, size) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: color,
  width: size,
  height: size,
  viewBox: "0 0 512 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
}));
const rightQuote = (color, size) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: color,
  width: size,
  height: size,
  viewBox: "0 0 512 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z"
}));
const symbol = color => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20px",
  height: "20px",
  viewBox: "0 0 19 13",
  fill: color,
  style: {
    left: "24px"
  }
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M0.965704 0.000125914H10.3736L19 5.15272e-05C19 5.15272e-05 16.2331 5.15665 10.3736 8.99489C6.68171 11.4132 3.12703 12.3741 1.00222 12.7541C0.488597 12.8459 0.227225 12.1436 0.617463 11.7973C2.03909 10.5355 3.88298 8.3072 3.88294 5.23718C3.88287 9.44134e-05 0.965704 0.000125914 0.965704 0.000125914Z"
}));
const upload = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "#000000",
  width: "20px",
  height: "20px",
  viewBox: "0 0 512 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M232 280L64 280 64 232 232 232 232 64 280 64 280 232 448 232 448 280 280 280 280 448 232 448 232 280Z"
}));
const star = color => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: color,
  width: "15px",
  height: "15px",
  viewBox: "0 -32 576 576"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
}));
const blockIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "800px",
  height: "800px",
  viewBox: "0 0 20 20"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "0",
  fill: "none",
  width: "20",
  height: "20"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M4 3h12c.55 0 1.02.2 1.41.59S18 4.45 18 5v7c0 .55-.2 1.02-.59 1.41S16.55 14 16 14h-1l-5 5v-5H4c-.55 0-1.02-.2-1.41-.59S2 12.55 2 12V5c0-.55.2-1.02.59-1.41S3.45 3 4 3zm11 2H4v1h11V5zm1 3H4v1h12V8zm-3 3H4v1h9v-1z"
})));
const verticalLineIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 14.707 14.707"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "6.275",
  y: "0",
  width: "2.158",
  height: "14.707"
}));
const horizontalLineIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 357 357"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M357,204H0v-51h357V204z"
}));

/***/ },

/***/ "./src/blocks/client-logos/edit.scss"
/*!*******************************************!*\
  !*** ./src/blocks/client-logos/edit.scss ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/shared/styles/logos.scss"
/*!**************************************!*\
  !*** ./src/shared/styles/logos.scss ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

module.exports = window["React"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "./node_modules/immer/dist/immer.esm.mjs"
/*!***********************************************!*\
  !*** ./node_modules/immer/dist/immer.esm.mjs ***!
  \***********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Immer: () => (/* binding */ un),
/* harmony export */   applyPatches: () => (/* binding */ pn),
/* harmony export */   castDraft: () => (/* binding */ K),
/* harmony export */   castImmutable: () => (/* binding */ $),
/* harmony export */   createDraft: () => (/* binding */ ln),
/* harmony export */   current: () => (/* binding */ R),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   enableAllPlugins: () => (/* binding */ J),
/* harmony export */   enableES5: () => (/* binding */ F),
/* harmony export */   enableMapSet: () => (/* binding */ C),
/* harmony export */   enablePatches: () => (/* binding */ T),
/* harmony export */   finishDraft: () => (/* binding */ dn),
/* harmony export */   freeze: () => (/* binding */ d),
/* harmony export */   immerable: () => (/* binding */ L),
/* harmony export */   isDraft: () => (/* binding */ r),
/* harmony export */   isDraftable: () => (/* binding */ t),
/* harmony export */   nothing: () => (/* binding */ H),
/* harmony export */   original: () => (/* binding */ e),
/* harmony export */   produce: () => (/* binding */ fn),
/* harmony export */   produceWithPatches: () => (/* binding */ cn),
/* harmony export */   setAutoFreeze: () => (/* binding */ sn),
/* harmony export */   setUseProxies: () => (/* binding */ vn)
/* harmony export */ });
function n(n){for(var r=arguments.length,t=Array(r>1?r-1:0),e=1;e<r;e++)t[e-1]=arguments[e];if(true){var i=Y[n],o=i?"function"==typeof i?i.apply(null,t):i:"unknown error nr: "+n;throw Error("[Immer] "+o)}// removed by dead control flow
}function r(n){return!!n&&!!n[Q]}function t(n){var r;return!!n&&(function(n){if(!n||"object"!=typeof n)return!1;var r=Object.getPrototypeOf(n);if(null===r)return!0;var t=Object.hasOwnProperty.call(r,"constructor")&&r.constructor;return t===Object||"function"==typeof t&&Function.toString.call(t)===Z}(n)||Array.isArray(n)||!!n[L]||!!(null===(r=n.constructor)||void 0===r?void 0:r[L])||s(n)||v(n))}function e(t){return r(t)||n(23,t),t[Q].t}function i(n,r,t){void 0===t&&(t=!1),0===o(n)?(t?Object.keys:nn)(n).forEach((function(e){t&&"symbol"==typeof e||r(e,n[e],n)})):n.forEach((function(t,e){return r(e,t,n)}))}function o(n){var r=n[Q];return r?r.i>3?r.i-4:r.i:Array.isArray(n)?1:s(n)?2:v(n)?3:0}function u(n,r){return 2===o(n)?n.has(r):Object.prototype.hasOwnProperty.call(n,r)}function a(n,r){return 2===o(n)?n.get(r):n[r]}function f(n,r,t){var e=o(n);2===e?n.set(r,t):3===e?n.add(t):n[r]=t}function c(n,r){return n===r?0!==n||1/n==1/r:n!=n&&r!=r}function s(n){return X&&n instanceof Map}function v(n){return q&&n instanceof Set}function p(n){return n.o||n.t}function l(n){if(Array.isArray(n))return Array.prototype.slice.call(n);var r=rn(n);delete r[Q];for(var t=nn(r),e=0;e<t.length;e++){var i=t[e],o=r[i];!1===o.writable&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(r[i]={configurable:!0,writable:!0,enumerable:o.enumerable,value:n[i]})}return Object.create(Object.getPrototypeOf(n),r)}function d(n,e){return void 0===e&&(e=!1),y(n)||r(n)||!t(n)||(o(n)>1&&(n.set=n.add=n.clear=n.delete=h),Object.freeze(n),e&&i(n,(function(n,r){return d(r,!0)}),!0)),n}function h(){n(2)}function y(n){return null==n||"object"!=typeof n||Object.isFrozen(n)}function b(r){var t=tn[r];return t||n(18,r),t}function m(n,r){tn[n]||(tn[n]=r)}function _(){return false||U||n(0),U}function j(n,r){r&&(b("Patches"),n.u=[],n.s=[],n.v=r)}function g(n){O(n),n.p.forEach(S),n.p=null}function O(n){n===U&&(U=n.l)}function w(n){return U={p:[],l:U,h:n,m:!0,_:0}}function S(n){var r=n[Q];0===r.i||1===r.i?r.j():r.g=!0}function P(r,e){e._=e.p.length;var i=e.p[0],o=void 0!==r&&r!==i;return e.h.O||b("ES5").S(e,r,o),o?(i[Q].P&&(g(e),n(4)),t(r)&&(r=M(e,r),e.l||x(e,r)),e.u&&b("Patches").M(i[Q].t,r,e.u,e.s)):r=M(e,i,[]),g(e),e.u&&e.v(e.u,e.s),r!==H?r:void 0}function M(n,r,t){if(y(r))return r;var e=r[Q];if(!e)return i(r,(function(i,o){return A(n,e,r,i,o,t)}),!0),r;if(e.A!==n)return r;if(!e.P)return x(n,e.t,!0),e.t;if(!e.I){e.I=!0,e.A._--;var o=4===e.i||5===e.i?e.o=l(e.k):e.o,u=o,a=!1;3===e.i&&(u=new Set(o),o.clear(),a=!0),i(u,(function(r,i){return A(n,e,o,r,i,t,a)})),x(n,o,!1),t&&n.u&&b("Patches").N(e,t,n.u,n.s)}return e.o}function A(e,i,o,a,c,s,v){if( true&&c===o&&n(5),r(c)){var p=M(e,c,s&&i&&3!==i.i&&!u(i.R,a)?s.concat(a):void 0);if(f(o,a,p),!r(p))return;e.m=!1}else v&&o.add(c);if(t(c)&&!y(c)){if(!e.h.D&&e._<1)return;M(e,c),i&&i.A.l||x(e,c)}}function x(n,r,t){void 0===t&&(t=!1),!n.l&&n.h.D&&n.m&&d(r,t)}function z(n,r){var t=n[Q];return(t?p(t):n)[r]}function I(n,r){if(r in n)for(var t=Object.getPrototypeOf(n);t;){var e=Object.getOwnPropertyDescriptor(t,r);if(e)return e;t=Object.getPrototypeOf(t)}}function k(n){n.P||(n.P=!0,n.l&&k(n.l))}function E(n){n.o||(n.o=l(n.t))}function N(n,r,t){var e=s(r)?b("MapSet").F(r,t):v(r)?b("MapSet").T(r,t):n.O?function(n,r){var t=Array.isArray(n),e={i:t?1:0,A:r?r.A:_(),P:!1,I:!1,R:{},l:r,t:n,k:null,o:null,j:null,C:!1},i=e,o=en;t&&(i=[e],o=on);var u=Proxy.revocable(i,o),a=u.revoke,f=u.proxy;return e.k=f,e.j=a,f}(r,t):b("ES5").J(r,t);return(t?t.A:_()).p.push(e),e}function R(e){return r(e)||n(22,e),function n(r){if(!t(r))return r;var e,u=r[Q],c=o(r);if(u){if(!u.P&&(u.i<4||!b("ES5").K(u)))return u.t;u.I=!0,e=D(r,c),u.I=!1}else e=D(r,c);return i(e,(function(r,t){u&&a(u.t,r)===t||f(e,r,n(t))})),3===c?new Set(e):e}(e)}function D(n,r){switch(r){case 2:return new Map(n);case 3:return Array.from(n)}return l(n)}function F(){function t(n,r){var t=s[n];return t?t.enumerable=r:s[n]=t={configurable:!0,enumerable:r,get:function(){var r=this[Q];return true&&f(r),en.get(r,n)},set:function(r){var t=this[Q]; true&&f(t),en.set(t,n,r)}},t}function e(n){for(var r=n.length-1;r>=0;r--){var t=n[r][Q];if(!t.P)switch(t.i){case 5:a(t)&&k(t);break;case 4:o(t)&&k(t)}}}function o(n){for(var r=n.t,t=n.k,e=nn(t),i=e.length-1;i>=0;i--){var o=e[i];if(o!==Q){var a=r[o];if(void 0===a&&!u(r,o))return!0;var f=t[o],s=f&&f[Q];if(s?s.t!==a:!c(f,a))return!0}}var v=!!r[Q];return e.length!==nn(r).length+(v?0:1)}function a(n){var r=n.k;if(r.length!==n.t.length)return!0;var t=Object.getOwnPropertyDescriptor(r,r.length-1);if(t&&!t.get)return!0;for(var e=0;e<r.length;e++)if(!r.hasOwnProperty(e))return!0;return!1}function f(r){r.g&&n(3,JSON.stringify(p(r)))}var s={};m("ES5",{J:function(n,r){var e=Array.isArray(n),i=function(n,r){if(n){for(var e=Array(r.length),i=0;i<r.length;i++)Object.defineProperty(e,""+i,t(i,!0));return e}var o=rn(r);delete o[Q];for(var u=nn(o),a=0;a<u.length;a++){var f=u[a];o[f]=t(f,n||!!o[f].enumerable)}return Object.create(Object.getPrototypeOf(r),o)}(e,n),o={i:e?5:4,A:r?r.A:_(),P:!1,I:!1,R:{},l:r,t:n,k:i,o:null,g:!1,C:!1};return Object.defineProperty(i,Q,{value:o,writable:!0}),i},S:function(n,t,o){o?r(t)&&t[Q].A===n&&e(n.p):(n.u&&function n(r){if(r&&"object"==typeof r){var t=r[Q];if(t){var e=t.t,o=t.k,f=t.R,c=t.i;if(4===c)i(o,(function(r){r!==Q&&(void 0!==e[r]||u(e,r)?f[r]||n(o[r]):(f[r]=!0,k(t)))})),i(e,(function(n){void 0!==o[n]||u(o,n)||(f[n]=!1,k(t))}));else if(5===c){if(a(t)&&(k(t),f.length=!0),o.length<e.length)for(var s=o.length;s<e.length;s++)f[s]=!1;else for(var v=e.length;v<o.length;v++)f[v]=!0;for(var p=Math.min(o.length,e.length),l=0;l<p;l++)o.hasOwnProperty(l)||(f[l]=!0),void 0===f[l]&&n(o[l])}}}}(n.p[0]),e(n.p))},K:function(n){return 4===n.i?o(n):a(n)}})}function T(){function e(n){if(!t(n))return n;if(Array.isArray(n))return n.map(e);if(s(n))return new Map(Array.from(n.entries()).map((function(n){return[n[0],e(n[1])]})));if(v(n))return new Set(Array.from(n).map(e));var r=Object.create(Object.getPrototypeOf(n));for(var i in n)r[i]=e(n[i]);return u(n,L)&&(r[L]=n[L]),r}function f(n){return r(n)?e(n):n}var c="add";m("Patches",{$:function(r,t){return t.forEach((function(t){for(var i=t.path,u=t.op,f=r,s=0;s<i.length-1;s++){var v=o(f),p=i[s];"string"!=typeof p&&"number"!=typeof p&&(p=""+p),0!==v&&1!==v||"__proto__"!==p&&"constructor"!==p||n(24),"function"==typeof f&&"prototype"===p&&n(24),"object"!=typeof(f=a(f,p))&&n(15,i.join("/"))}var l=o(f),d=e(t.value),h=i[i.length-1];switch(u){case"replace":switch(l){case 2:return f.set(h,d);case 3:n(16);default:return f[h]=d}case c:switch(l){case 1:return"-"===h?f.push(d):f.splice(h,0,d);case 2:return f.set(h,d);case 3:return f.add(d);default:return f[h]=d}case"remove":switch(l){case 1:return f.splice(h,1);case 2:return f.delete(h);case 3:return f.delete(t.value);default:return delete f[h]}default:n(17,u)}})),r},N:function(n,r,t,e){switch(n.i){case 0:case 4:case 2:return function(n,r,t,e){var o=n.t,s=n.o;i(n.R,(function(n,i){var v=a(o,n),p=a(s,n),l=i?u(o,n)?"replace":c:"remove";if(v!==p||"replace"!==l){var d=r.concat(n);t.push("remove"===l?{op:l,path:d}:{op:l,path:d,value:p}),e.push(l===c?{op:"remove",path:d}:"remove"===l?{op:c,path:d,value:f(v)}:{op:"replace",path:d,value:f(v)})}}))}(n,r,t,e);case 5:case 1:return function(n,r,t,e){var i=n.t,o=n.R,u=n.o;if(u.length<i.length){var a=[u,i];i=a[0],u=a[1];var s=[e,t];t=s[0],e=s[1]}for(var v=0;v<i.length;v++)if(o[v]&&u[v]!==i[v]){var p=r.concat([v]);t.push({op:"replace",path:p,value:f(u[v])}),e.push({op:"replace",path:p,value:f(i[v])})}for(var l=i.length;l<u.length;l++){var d=r.concat([l]);t.push({op:c,path:d,value:f(u[l])})}i.length<u.length&&e.push({op:"replace",path:r.concat(["length"]),value:i.length})}(n,r,t,e);case 3:return function(n,r,t,e){var i=n.t,o=n.o,u=0;i.forEach((function(n){if(!o.has(n)){var i=r.concat([u]);t.push({op:"remove",path:i,value:n}),e.unshift({op:c,path:i,value:n})}u++})),u=0,o.forEach((function(n){if(!i.has(n)){var o=r.concat([u]);t.push({op:c,path:o,value:n}),e.unshift({op:"remove",path:o,value:n})}u++}))}(n,r,t,e)}},M:function(n,r,t,e){t.push({op:"replace",path:[],value:r===H?void 0:r}),e.push({op:"replace",path:[],value:n})}})}function C(){function r(n,r){function t(){this.constructor=n}a(n,r),n.prototype=(t.prototype=r.prototype,new t)}function e(n){n.o||(n.R=new Map,n.o=new Map(n.t))}function o(n){n.o||(n.o=new Set,n.t.forEach((function(r){if(t(r)){var e=N(n.A.h,r,n);n.p.set(r,e),n.o.add(e)}else n.o.add(r)})))}function u(r){r.g&&n(3,JSON.stringify(p(r)))}var a=function(n,r){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,r){n.__proto__=r}||function(n,r){for(var t in r)r.hasOwnProperty(t)&&(n[t]=r[t])})(n,r)},f=function(){function n(n,r){return this[Q]={i:2,l:r,A:r?r.A:_(),P:!1,I:!1,o:void 0,R:void 0,t:n,k:this,C:!1,g:!1},this}r(n,Map);var o=n.prototype;return Object.defineProperty(o,"size",{get:function(){return p(this[Q]).size}}),o.has=function(n){return p(this[Q]).has(n)},o.set=function(n,r){var t=this[Q];return u(t),p(t).has(n)&&p(t).get(n)===r||(e(t),k(t),t.R.set(n,!0),t.o.set(n,r),t.R.set(n,!0)),this},o.delete=function(n){if(!this.has(n))return!1;var r=this[Q];return u(r),e(r),k(r),r.t.has(n)?r.R.set(n,!1):r.R.delete(n),r.o.delete(n),!0},o.clear=function(){var n=this[Q];u(n),p(n).size&&(e(n),k(n),n.R=new Map,i(n.t,(function(r){n.R.set(r,!1)})),n.o.clear())},o.forEach=function(n,r){var t=this;p(this[Q]).forEach((function(e,i){n.call(r,t.get(i),i,t)}))},o.get=function(n){var r=this[Q];u(r);var i=p(r).get(n);if(r.I||!t(i))return i;if(i!==r.t.get(n))return i;var o=N(r.A.h,i,r);return e(r),r.o.set(n,o),o},o.keys=function(){return p(this[Q]).keys()},o.values=function(){var n,r=this,t=this.keys();return(n={})[V]=function(){return r.values()},n.next=function(){var n=t.next();return n.done?n:{done:!1,value:r.get(n.value)}},n},o.entries=function(){var n,r=this,t=this.keys();return(n={})[V]=function(){return r.entries()},n.next=function(){var n=t.next();if(n.done)return n;var e=r.get(n.value);return{done:!1,value:[n.value,e]}},n},o[V]=function(){return this.entries()},n}(),c=function(){function n(n,r){return this[Q]={i:3,l:r,A:r?r.A:_(),P:!1,I:!1,o:void 0,t:n,k:this,p:new Map,g:!1,C:!1},this}r(n,Set);var t=n.prototype;return Object.defineProperty(t,"size",{get:function(){return p(this[Q]).size}}),t.has=function(n){var r=this[Q];return u(r),r.o?!!r.o.has(n)||!(!r.p.has(n)||!r.o.has(r.p.get(n))):r.t.has(n)},t.add=function(n){var r=this[Q];return u(r),this.has(n)||(o(r),k(r),r.o.add(n)),this},t.delete=function(n){if(!this.has(n))return!1;var r=this[Q];return u(r),o(r),k(r),r.o.delete(n)||!!r.p.has(n)&&r.o.delete(r.p.get(n))},t.clear=function(){var n=this[Q];u(n),p(n).size&&(o(n),k(n),n.o.clear())},t.values=function(){var n=this[Q];return u(n),o(n),n.o.values()},t.entries=function(){var n=this[Q];return u(n),o(n),n.o.entries()},t.keys=function(){return this.values()},t[V]=function(){return this.values()},t.forEach=function(n,r){for(var t=this.values(),e=t.next();!e.done;)n.call(r,e.value,e.value,this),e=t.next()},n}();m("MapSet",{F:function(n,r){return new f(n,r)},T:function(n,r){return new c(n,r)}})}function J(){F(),C(),T()}function K(n){return n}function $(n){return n}var G,U,W="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),X="undefined"!=typeof Map,q="undefined"!=typeof Set,B="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,H=W?Symbol.for("immer-nothing"):((G={})["immer-nothing"]=!0,G),L=W?Symbol.for("immer-draftable"):"__$immer_draftable",Q=W?Symbol.for("immer-state"):"__$immer_state",V="undefined"!=typeof Symbol&&Symbol.iterator||"@@iterator",Y={0:"Illegal state",1:"Immer drafts cannot have computed properties",2:"This object has been frozen and should not be mutated",3:function(n){return"Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? "+n},4:"An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",5:"Immer forbids circular references",6:"The first or second argument to `produce` must be a function",7:"The third argument to `produce` must be a function or undefined",8:"First argument to `createDraft` must be a plain object, an array, or an immerable object",9:"First argument to `finishDraft` must be a draft returned by `createDraft`",10:"The given draft is already finalized",11:"Object.defineProperty() cannot be used on an Immer draft",12:"Object.setPrototypeOf() cannot be used on an Immer draft",13:"Immer only supports deleting array indices",14:"Immer only supports setting array indices and the 'length' property",15:function(n){return"Cannot apply patch, path doesn't resolve: "+n},16:'Sets cannot have "replace" patches.',17:function(n){return"Unsupported patch operation: "+n},18:function(n){return"The plugin for '"+n+"' has not been loaded into Immer. To enable the plugin, import and call `enable"+n+"()` when initializing your application."},20:"Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",21:function(n){return"produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '"+n+"'"},22:function(n){return"'current' expects a draft, got: "+n},23:function(n){return"'original' expects a draft, got: "+n},24:"Patching reserved attributes like __proto__, prototype and constructor is not allowed"},Z=""+Object.prototype.constructor,nn="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(n){return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n))}:Object.getOwnPropertyNames,rn=Object.getOwnPropertyDescriptors||function(n){var r={};return nn(n).forEach((function(t){r[t]=Object.getOwnPropertyDescriptor(n,t)})),r},tn={},en={get:function(n,r){if(r===Q)return n;var e=p(n);if(!u(e,r))return function(n,r,t){var e,i=I(r,t);return i?"value"in i?i.value:null===(e=i.get)||void 0===e?void 0:e.call(n.k):void 0}(n,e,r);var i=e[r];return n.I||!t(i)?i:i===z(n.t,r)?(E(n),n.o[r]=N(n.A.h,i,n)):i},has:function(n,r){return r in p(n)},ownKeys:function(n){return Reflect.ownKeys(p(n))},set:function(n,r,t){var e=I(p(n),r);if(null==e?void 0:e.set)return e.set.call(n.k,t),!0;if(!n.P){var i=z(p(n),r),o=null==i?void 0:i[Q];if(o&&o.t===t)return n.o[r]=t,n.R[r]=!1,!0;if(c(t,i)&&(void 0!==t||u(n.t,r)))return!0;E(n),k(n)}return n.o[r]===t&&(void 0!==t||r in n.o)||Number.isNaN(t)&&Number.isNaN(n.o[r])||(n.o[r]=t,n.R[r]=!0),!0},deleteProperty:function(n,r){return void 0!==z(n.t,r)||r in n.t?(n.R[r]=!1,E(n),k(n)):delete n.R[r],n.o&&delete n.o[r],!0},getOwnPropertyDescriptor:function(n,r){var t=p(n),e=Reflect.getOwnPropertyDescriptor(t,r);return e?{writable:!0,configurable:1!==n.i||"length"!==r,enumerable:e.enumerable,value:t[r]}:e},defineProperty:function(){n(11)},getPrototypeOf:function(n){return Object.getPrototypeOf(n.t)},setPrototypeOf:function(){n(12)}},on={};i(en,(function(n,r){on[n]=function(){return arguments[0]=arguments[0][0],r.apply(this,arguments)}})),on.deleteProperty=function(r,t){return true&&isNaN(parseInt(t))&&n(13),on.set.call(this,r,t,void 0)},on.set=function(r,t,e){return true&&"length"!==t&&isNaN(parseInt(t))&&n(14),en.set.call(this,r[0],t,e,r[0])};var un=function(){function e(r){var e=this;this.O=B,this.D=!0,this.produce=function(r,i,o){if("function"==typeof r&&"function"!=typeof i){var u=i;i=r;var a=e;return function(n){var r=this;void 0===n&&(n=u);for(var t=arguments.length,e=Array(t>1?t-1:0),o=1;o<t;o++)e[o-1]=arguments[o];return a.produce(n,(function(n){var t;return(t=i).call.apply(t,[r,n].concat(e))}))}}var f;if("function"!=typeof i&&n(6),void 0!==o&&"function"!=typeof o&&n(7),t(r)){var c=w(e),s=N(e,r,void 0),v=!0;try{f=i(s),v=!1}finally{v?g(c):O(c)}return"undefined"!=typeof Promise&&f instanceof Promise?f.then((function(n){return j(c,o),P(n,c)}),(function(n){throw g(c),n})):(j(c,o),P(f,c))}if(!r||"object"!=typeof r){if(void 0===(f=i(r))&&(f=r),f===H&&(f=void 0),e.D&&d(f,!0),o){var p=[],l=[];b("Patches").M(r,f,p,l),o(p,l)}return f}n(21,r)},this.produceWithPatches=function(n,r){if("function"==typeof n)return function(r){for(var t=arguments.length,i=Array(t>1?t-1:0),o=1;o<t;o++)i[o-1]=arguments[o];return e.produceWithPatches(r,(function(r){return n.apply(void 0,[r].concat(i))}))};var t,i,o=e.produce(n,r,(function(n,r){t=n,i=r}));return"undefined"!=typeof Promise&&o instanceof Promise?o.then((function(n){return[n,t,i]})):[o,t,i]},"boolean"==typeof(null==r?void 0:r.useProxies)&&this.setUseProxies(r.useProxies),"boolean"==typeof(null==r?void 0:r.autoFreeze)&&this.setAutoFreeze(r.autoFreeze)}var i=e.prototype;return i.createDraft=function(e){t(e)||n(8),r(e)&&(e=R(e));var i=w(this),o=N(this,e,void 0);return o[Q].C=!0,O(i),o},i.finishDraft=function(r,t){var e=r&&r[Q]; true&&(e&&e.C||n(9),e.I&&n(10));var i=e.A;return j(i,t),P(void 0,i)},i.setAutoFreeze=function(n){this.D=n},i.setUseProxies=function(r){r&&!B&&n(20),this.O=r},i.applyPatches=function(n,t){var e;for(e=t.length-1;e>=0;e--){var i=t[e];if(0===i.path.length&&"replace"===i.op){n=i.value;break}}e>-1&&(t=t.slice(e+1));var o=b("Patches").$;return r(n)?o(n,t):this.produce(n,(function(n){return o(n,t)}))},e}(),an=new un,fn=an.produce,cn=an.produceWithPatches.bind(an),sn=an.setAutoFreeze.bind(an),vn=an.setUseProxies.bind(an),pn=an.applyPatches.bind(an),ln=an.createDraft.bind(an),dn=an.finishDraft.bind(an);/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fn);
//# sourceMappingURL=immer.esm.js.map


/***/ },

/***/ "./src/blocks/client-logos/block.json"
/*!********************************************!*\
  !*** ./src/blocks/client-logos/block.json ***!
  \********************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"bptmb/client-logos","title":"Client Logos","description":"Show a trusted-by grid of client or partner logos.","category":"bplugins","parent":["bptmb/b-testimonials"],"keywords":["logos","clients","trusted by","brands"],"textdomain":"b-testimonials-block","attributes":{"align":{"type":"string","default":"wide"},"cId":{"type":"string","default":""},"logos":{"type":"array","default":[{"img":{"url":"data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'60\'%3E%3Crect width=\'160\' height=\'60\' rx=\'8\' fill=\'%23e5e7eb\'/%3E%3Ctext x=\'80\' y=\'36\' font-family=\'sans-serif\' font-size=\'18\' fill=\'%239ca3af\' text-anchor=\'middle\'%3ELogo%3C/text%3E%3C/svg%3E"},"link":""},{"img":{"url":"data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'60\'%3E%3Crect width=\'160\' height=\'60\' rx=\'8\' fill=\'%23e5e7eb\'/%3E%3Ctext x=\'80\' y=\'36\' font-family=\'sans-serif\' font-size=\'18\' fill=\'%239ca3af\' text-anchor=\'middle\'%3ELogo%3C/text%3E%3C/svg%3E"},"link":""},{"img":{"url":"data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'60\'%3E%3Crect width=\'160\' height=\'60\' rx=\'8\' fill=\'%23e5e7eb\'/%3E%3Ctext x=\'80\' y=\'36\' font-family=\'sans-serif\' font-size=\'18\' fill=\'%239ca3af\' text-anchor=\'middle\'%3ELogo%3C/text%3E%3C/svg%3E"},"link":""},{"img":{"url":"data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'60\'%3E%3Crect width=\'160\' height=\'60\' rx=\'8\' fill=\'%23e5e7eb\'/%3E%3Ctext x=\'80\' y=\'36\' font-family=\'sans-serif\' font-size=\'18\' fill=\'%239ca3af\' text-anchor=\'middle\'%3ELogo%3C/text%3E%3C/svg%3E"},"link":""}]},"columns":{"type":"object","default":{"desktop":4,"tablet":3,"mobile":2}},"columnGap":{"type":"string","default":"30px"},"rowGap":{"type":"string","default":"30px"},"logoHeight":{"type":"number","default":60},"grayscale":{"type":"boolean","default":true},"layout":{"type":"string","default":"client-logos"}},"supports":{"align":["wide","full"],"html":false},"editorScript":["file:./index.js"],"editorStyle":"file:./index.css","style":["file:./index.css","file:./view.css"],"viewScript":["file:./view.js"],"render":"file:./render.php"}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************************************!*\
  !*** ./src/blocks/client-logos/index.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.json */ "./src/blocks/client-logos/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/client-logos/edit.js");
/* harmony import */ var _shared_utils_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/utils/icons */ "./src/shared/utils/icons.js");




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_1__, {
  icon: _shared_utils_icons__WEBPACK_IMPORTED_MODULE_3__.blockIcon,
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map