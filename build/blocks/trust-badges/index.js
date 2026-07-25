/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/trust-badges/edit.js"
/*!*****************************************!*\
  !*** ./src/blocks/trust-badges/edit.js ***!
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
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! immer */ "../../../../../../../Development/dev/node_modules/immer/dist/immer.mjs");
/* harmony import */ var _shared_Components_Common_BlockSwitcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/Components/Common/BlockSwitcher */ "./src/shared/Components/Common/BlockSwitcher.js");
/* harmony import */ var _edit_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./edit.scss */ "./src/blocks/trust-badges/edit.scss");
/* harmony import */ var _shared_styles_trust_badges_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/styles/trust-badges.scss */ "./src/shared/styles/trust-badges.scss");









const gridVars = ({
  columns,
  columnGap,
  rowGap
}) => ({
  '--cols-d': columns?.desktop || 3,
  '--cols-t': columns?.tablet || 3,
  '--cols-m': columns?.mobile || 1,
  '--col-gap': columnGap,
  '--row-gap': rowGap
});
const Edit = ({
  attributes,
  setAttributes,
  clientId
}) => {
  const {
    items = [],
    columns,
    columnGap,
    rowGap
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
  const updateItem = (i, key, val) => setAttributes({
    items: (0,immer__WEBPACK_IMPORTED_MODULE_4__.produce)(items, d => {
      d[i][key] = val;
    })
  });
  const addItem = () => setAttributes({
    items: [...items, {
      img: {
        url: ''
      },
      title: '',
      subtitle: ''
    }]
  });
  const removeItem = i => setAttributes({
    items: items.filter((_, idx) => idx !== i)
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_shared_Components_Common_BlockSwitcher__WEBPACK_IMPORTED_MODULE_5__["default"], {
    clientId: clientId
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Layout', 'b-testimonials-block')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Columns (Desktop)', 'b-testimonials-block'),
    value: columns?.desktop,
    onChange: v => setColumn('desktop', v),
    min: 1,
    max: 6
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Columns (Tablet)', 'b-testimonials-block'),
    value: columns?.tablet,
    onChange: v => setColumn('tablet', v),
    min: 1,
    max: 4
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Columns (Mobile)', 'b-testimonials-block'),
    value: columns?.mobile,
    onChange: v => setColumn('mobile', v),
    min: 1,
    max: 2
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Column gap', 'b-testimonials-block'),
    value: columnGap,
    onChange: v => setAttributes({
      columnGap: v
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Row gap', 'b-testimonials-block'),
    value: rowGap,
    onChange: v => setAttributes({
      rowGap: v
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Badges', 'b-testimonials-block'),
    initialOpen: false
  }, items.map((item, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: i,
    className: "btb-badge-row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    allowedTypes: ['image'],
    value: item?.img,
    onSelect: m => updateItem(i, 'img', {
      id: m.id,
      url: m.url,
      alt: m.alt
    }),
    render: ({
      open
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      variant: "secondary",
      onClick: open,
      className: "btb-badge-pick"
    }, item?.img?.url ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.img.url,
      alt: ""
    }) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select icon', 'b-testimonials-block'))
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title', 'b-testimonials-block'),
    value: item?.title || '',
    onChange: v => updateItem(i, 'title', v)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Subtitle', 'b-testimonials-block'),
    value: item?.subtitle || '',
    onChange: v => updateItem(i, 'subtitle', v)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isDestructive: true,
    onClick: () => removeItem(i)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Dashicon, {
    icon: "trash"
  }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove', 'b-testimonials-block')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "primary",
    onClick: addItem
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Dashicon, {
    icon: "plus"
  }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add badge', 'b-testimonials-block')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
      className: 'bTrustBadges'
    })
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "badges-grid",
    style: gridVars(attributes)
  }, items.map((item, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "badge-item",
    key: i
  }, item?.img?.url && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "badge-icon",
    src: item.img.url,
    alt: item?.img?.alt || ''
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "badge-text"
  }, item?.title && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "badge-title"
  }, item.title), item?.subtitle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "badge-subtitle"
  }, item.subtitle)))))));
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

/***/ "./src/blocks/trust-badges/edit.scss"
/*!*******************************************!*\
  !*** ./src/blocks/trust-badges/edit.scss ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/shared/styles/trust-badges.scss"
/*!*********************************************!*\
  !*** ./src/shared/styles/trust-badges.scss ***!
  \*********************************************/
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

/***/ "../../../../../../../Development/dev/node_modules/immer/dist/immer.mjs"
/*!******************************************************************************!*\
  !*** ../../../../../../../Development/dev/node_modules/immer/dist/immer.mjs ***!
  \******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Immer: () => (/* binding */ Immer2),
/* harmony export */   applyPatches: () => (/* binding */ applyPatches),
/* harmony export */   castDraft: () => (/* binding */ castDraft),
/* harmony export */   castImmutable: () => (/* binding */ castImmutable),
/* harmony export */   createDraft: () => (/* binding */ createDraft),
/* harmony export */   current: () => (/* binding */ current),
/* harmony export */   enableMapSet: () => (/* binding */ enableMapSet),
/* harmony export */   enablePatches: () => (/* binding */ enablePatches),
/* harmony export */   finishDraft: () => (/* binding */ finishDraft),
/* harmony export */   freeze: () => (/* binding */ freeze),
/* harmony export */   immerable: () => (/* binding */ DRAFTABLE),
/* harmony export */   isDraft: () => (/* binding */ isDraft),
/* harmony export */   isDraftable: () => (/* binding */ isDraftable),
/* harmony export */   nothing: () => (/* binding */ NOTHING),
/* harmony export */   original: () => (/* binding */ original),
/* harmony export */   produce: () => (/* binding */ produce),
/* harmony export */   produceWithPatches: () => (/* binding */ produceWithPatches),
/* harmony export */   setAutoFreeze: () => (/* binding */ setAutoFreeze),
/* harmony export */   setUseStrictIteration: () => (/* binding */ setUseStrictIteration),
/* harmony export */   setUseStrictShallowCopy: () => (/* binding */ setUseStrictShallowCopy)
/* harmony export */ });
// src/utils/env.ts
var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");

// src/utils/errors.ts
var errors =  true ? [
  // All error codes, starting by 0:
  function(plugin) {
    return `The plugin for '${plugin}' has not been loaded into Immer. To enable the plugin, import and call \`enable${plugin}()\` when initializing your application.`;
  },
  function(thing) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${thing}'`;
  },
  "This object has been frozen and should not be mutated",
  function(data) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + data;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(thing) {
    return `'current' expects a draft, got: ${thing}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(thing) {
    return `'original' expects a draft, got: ${thing}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : 0;
function die(error, ...args) {
  if (true) {
    const e = errors[error];
    const msg = typeof e === "function" ? e.apply(null, args) : e;
    throw new Error(`[Immer] ${msg}`);
  }
  // removed by dead control flow

}

// src/utils/common.ts
var getPrototypeOf = Object.getPrototypeOf;
function isDraft(value) {
  return !!value && !!value[DRAFT_STATE];
}
function isDraftable(value) {
  if (!value)
    return false;
  return isPlainObject(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!value.constructor?.[DRAFTABLE] || isMap(value) || isSet(value);
}
var objectCtorString = Object.prototype.constructor.toString();
var cachedCtorStrings = /* @__PURE__ */ new WeakMap();
function isPlainObject(value) {
  if (!value || typeof value !== "object")
    return false;
  const proto = Object.getPrototypeOf(value);
  if (proto === null || proto === Object.prototype)
    return true;
  const Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  if (Ctor === Object)
    return true;
  if (typeof Ctor !== "function")
    return false;
  let ctorString = cachedCtorStrings.get(Ctor);
  if (ctorString === void 0) {
    ctorString = Function.toString.call(Ctor);
    cachedCtorStrings.set(Ctor, ctorString);
  }
  return ctorString === objectCtorString;
}
function original(value) {
  if (!isDraft(value))
    die(15, value);
  return value[DRAFT_STATE].base_;
}
function each(obj, iter, strict = true) {
  if (getArchtype(obj) === 0 /* Object */) {
    const keys = strict ? Reflect.ownKeys(obj) : Object.keys(obj);
    keys.forEach((key) => {
      iter(key, obj[key], obj);
    });
  } else {
    obj.forEach((entry, index) => iter(index, entry, obj));
  }
}
function getArchtype(thing) {
  const state = thing[DRAFT_STATE];
  return state ? state.type_ : Array.isArray(thing) ? 1 /* Array */ : isMap(thing) ? 2 /* Map */ : isSet(thing) ? 3 /* Set */ : 0 /* Object */;
}
function has(thing, prop) {
  return getArchtype(thing) === 2 /* Map */ ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
}
function get(thing, prop) {
  return getArchtype(thing) === 2 /* Map */ ? thing.get(prop) : thing[prop];
}
function set(thing, propOrOldValue, value) {
  const t = getArchtype(thing);
  if (t === 2 /* Map */)
    thing.set(propOrOldValue, value);
  else if (t === 3 /* Set */) {
    thing.add(value);
  } else
    thing[propOrOldValue] = value;
}
function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function isMap(target) {
  return target instanceof Map;
}
function isSet(target) {
  return target instanceof Set;
}
function latest(state) {
  return state.copy_ || state.base_;
}
function shallowCopy(base, strict) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (Array.isArray(base))
    return Array.prototype.slice.call(base);
  const isPlain = isPlainObject(base);
  if (strict === true || strict === "class_only" && !isPlain) {
    const descriptors = Object.getOwnPropertyDescriptors(base);
    delete descriptors[DRAFT_STATE];
    let keys = Reflect.ownKeys(descriptors);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const desc = descriptors[key];
      if (desc.writable === false) {
        desc.writable = true;
        desc.configurable = true;
      }
      if (desc.get || desc.set)
        descriptors[key] = {
          configurable: true,
          writable: true,
          // could live with !!desc.set as well here...
          enumerable: desc.enumerable,
          value: base[key]
        };
    }
    return Object.create(getPrototypeOf(base), descriptors);
  } else {
    const proto = getPrototypeOf(base);
    if (proto !== null && isPlain) {
      return { ...base };
    }
    const obj = Object.create(proto);
    return Object.assign(obj, base);
  }
}
function freeze(obj, deep = false) {
  if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj))
    return obj;
  if (getArchtype(obj) > 1) {
    Object.defineProperties(obj, {
      set: dontMutateMethodOverride,
      add: dontMutateMethodOverride,
      clear: dontMutateMethodOverride,
      delete: dontMutateMethodOverride
    });
  }
  Object.freeze(obj);
  if (deep)
    Object.values(obj).forEach((value) => freeze(value, true));
  return obj;
}
function dontMutateFrozenCollections() {
  die(2);
}
var dontMutateMethodOverride = {
  value: dontMutateFrozenCollections
};
function isFrozen(obj) {
  if (obj === null || typeof obj !== "object")
    return true;
  return Object.isFrozen(obj);
}

// src/utils/plugins.ts
var plugins = {};
function getPlugin(pluginKey) {
  const plugin = plugins[pluginKey];
  if (!plugin) {
    die(0, pluginKey);
  }
  return plugin;
}
function loadPlugin(pluginKey, implementation) {
  if (!plugins[pluginKey])
    plugins[pluginKey] = implementation;
}

// src/core/scope.ts
var currentScope;
function getCurrentScope() {
  return currentScope;
}
function createScope(parent_, immer_) {
  return {
    drafts_: [],
    parent_,
    immer_,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: true,
    unfinalizedDrafts_: 0
  };
}
function usePatchesInScope(scope, patchListener) {
  if (patchListener) {
    getPlugin("Patches");
    scope.patches_ = [];
    scope.inversePatches_ = [];
    scope.patchListener_ = patchListener;
  }
}
function revokeScope(scope) {
  leaveScope(scope);
  scope.drafts_.forEach(revokeDraft);
  scope.drafts_ = null;
}
function leaveScope(scope) {
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
}
function enterScope(immer2) {
  return currentScope = createScope(currentScope, immer2);
}
function revokeDraft(draft) {
  const state = draft[DRAFT_STATE];
  if (state.type_ === 0 /* Object */ || state.type_ === 1 /* Array */)
    state.revoke_();
  else
    state.revoked_ = true;
}

// src/core/finalize.ts
function processResult(result, scope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  const baseDraft = scope.drafts_[0];
  const isReplaced = result !== void 0 && result !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result)) {
      result = finalize(scope, result);
      if (!scope.parent_)
        maybeFreeze(scope, result);
    }
    if (scope.patches_) {
      getPlugin("Patches").generateReplacementPatches_(
        baseDraft[DRAFT_STATE].base_,
        result,
        scope.patches_,
        scope.inversePatches_
      );
    }
  } else {
    result = finalize(scope, baseDraft, []);
  }
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_(scope.patches_, scope.inversePatches_);
  }
  return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value, path) {
  if (isFrozen(value))
    return value;
  const useStrictIteration = rootScope.immer_.shouldUseStrictIteration();
  const state = value[DRAFT_STATE];
  if (!state) {
    each(
      value,
      (key, childValue) => finalizeProperty(rootScope, state, value, key, childValue, path),
      useStrictIteration
    );
    return value;
  }
  if (state.scope_ !== rootScope)
    return value;
  if (!state.modified_) {
    maybeFreeze(rootScope, state.base_, true);
    return state.base_;
  }
  if (!state.finalized_) {
    state.finalized_ = true;
    state.scope_.unfinalizedDrafts_--;
    const result = state.copy_;
    let resultEach = result;
    let isSet2 = false;
    if (state.type_ === 3 /* Set */) {
      resultEach = new Set(result);
      result.clear();
      isSet2 = true;
    }
    each(
      resultEach,
      (key, childValue) => finalizeProperty(
        rootScope,
        state,
        result,
        key,
        childValue,
        path,
        isSet2
      ),
      useStrictIteration
    );
    maybeFreeze(rootScope, result, false);
    if (path && rootScope.patches_) {
      getPlugin("Patches").generatePatches_(
        state,
        path,
        rootScope.patches_,
        rootScope.inversePatches_
      );
    }
  }
  return state.copy_;
}
function finalizeProperty(rootScope, parentState, targetObject, prop, childValue, rootPath, targetIsSet) {
  if (childValue == null) {
    return;
  }
  if (typeof childValue !== "object" && !targetIsSet) {
    return;
  }
  const childIsFrozen = isFrozen(childValue);
  if (childIsFrozen && !targetIsSet) {
    return;
  }
  if ( true && childValue === targetObject)
    die(5);
  if (isDraft(childValue)) {
    const path = rootPath && parentState && parentState.type_ !== 3 /* Set */ && // Set objects are atomic since they have no keys.
    !has(parentState.assigned_, prop) ? rootPath.concat(prop) : void 0;
    const res = finalize(rootScope, childValue, path);
    set(targetObject, prop, res);
    if (isDraft(res)) {
      rootScope.canAutoFreeze_ = false;
    } else
      return;
  } else if (targetIsSet) {
    targetObject.add(childValue);
  }
  if (isDraftable(childValue) && !childIsFrozen) {
    if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
      return;
    }
    if (parentState && parentState.base_ && parentState.base_[prop] === childValue && childIsFrozen) {
      return;
    }
    finalize(rootScope, childValue);
    if ((!parentState || !parentState.scope_.parent_) && typeof prop !== "symbol" && (isMap(targetObject) ? targetObject.has(prop) : Object.prototype.propertyIsEnumerable.call(targetObject, prop)))
      maybeFreeze(rootScope, childValue);
  }
}
function maybeFreeze(scope, value, deep = false) {
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze(value, deep);
  }
}

// src/core/proxy.ts
function createProxyProxy(base, parent) {
  const isArray = Array.isArray(base);
  const state = {
    type_: isArray ? 1 /* Array */ : 0 /* Object */,
    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope(),
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: false
  };
  let target = state;
  let traps = objectTraps;
  if (isArray) {
    target = [state];
    traps = arrayTraps;
  }
  const { revoke, proxy } = Proxy.revocable(target, traps);
  state.draft_ = proxy;
  state.revoke_ = revoke;
  return proxy;
}
var objectTraps = {
  get(state, prop) {
    if (prop === DRAFT_STATE)
      return state;
    const source = latest(state);
    if (!has(source, prop)) {
      return readPropFromProto(state, source, prop);
    }
    const value = source[prop];
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    if (value === peek(state.base_, prop)) {
      prepareCopy(state);
      return state.copy_[prop] = createProxy(value, state);
    }
    return value;
  },
  has(state, prop) {
    return prop in latest(state);
  },
  ownKeys(state) {
    return Reflect.ownKeys(latest(state));
  },
  set(state, prop, value) {
    const desc = getDescriptorFromProto(latest(state), prop);
    if (desc?.set) {
      desc.set.call(state.draft_, value);
      return true;
    }
    if (!state.modified_) {
      const current2 = peek(latest(state), prop);
      const currentState = current2?.[DRAFT_STATE];
      if (currentState && currentState.base_ === value) {
        state.copy_[prop] = value;
        state.assigned_[prop] = false;
        return true;
      }
      if (is(value, current2) && (value !== void 0 || has(state.base_, prop)))
        return true;
      prepareCopy(state);
      markChanged(state);
    }
    if (state.copy_[prop] === value && // special case: handle new props with value 'undefined'
    (value !== void 0 || prop in state.copy_) || // special case: NaN
    Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
      return true;
    state.copy_[prop] = value;
    state.assigned_[prop] = true;
    return true;
  },
  deleteProperty(state, prop) {
    if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
      state.assigned_[prop] = false;
      prepareCopy(state);
      markChanged(state);
    } else {
      delete state.assigned_[prop];
    }
    if (state.copy_) {
      delete state.copy_[prop];
    }
    return true;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(state, prop) {
    const owner = latest(state);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc)
      return desc;
    return {
      writable: true,
      configurable: state.type_ !== 1 /* Array */ || prop !== "length",
      enumerable: desc.enumerable,
      value: owner[prop]
    };
  },
  defineProperty() {
    die(11);
  },
  getPrototypeOf(state) {
    return getPrototypeOf(state.base_);
  },
  setPrototypeOf() {
    die(12);
  }
};
var arrayTraps = {};
each(objectTraps, (key, fn) => {
  arrayTraps[key] = function() {
    arguments[0] = arguments[0][0];
    return fn.apply(this, arguments);
  };
});
arrayTraps.deleteProperty = function(state, prop) {
  if ( true && isNaN(parseInt(prop)))
    die(13);
  return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
  if ( true && prop !== "length" && isNaN(parseInt(prop)))
    die(14);
  return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
  const state = draft[DRAFT_STATE];
  const source = state ? latest(state) : draft;
  return source[prop];
}
function readPropFromProto(state, source, prop) {
  const desc = getDescriptorFromProto(source, prop);
  return desc ? `value` in desc ? desc.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    desc.get?.call(state.draft_)
  ) : void 0;
}
function getDescriptorFromProto(source, prop) {
  if (!(prop in source))
    return void 0;
  let proto = getPrototypeOf(source);
  while (proto) {
    const desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (desc)
      return desc;
    proto = getPrototypeOf(proto);
  }
  return void 0;
}
function markChanged(state) {
  if (!state.modified_) {
    state.modified_ = true;
    if (state.parent_) {
      markChanged(state.parent_);
    }
  }
}
function prepareCopy(state) {
  if (!state.copy_) {
    state.copy_ = shallowCopy(
      state.base_,
      state.scope_.immer_.useStrictShallowCopy_
    );
  }
}

// src/core/immerClass.ts
var Immer2 = class {
  constructor(config) {
    this.autoFreeze_ = true;
    this.useStrictShallowCopy_ = false;
    this.useStrictIteration_ = true;
    /**
     * The `produce` function takes a value and a "recipe function" (whose
     * return value often depends on the base state). The recipe function is
     * free to mutate its first argument however it wants. All mutations are
     * only ever applied to a __copy__ of the base state.
     *
     * Pass only a function to create a "curried producer" which relieves you
     * from passing the recipe function every time.
     *
     * Only plain objects and arrays are made mutable. All other objects are
     * considered uncopyable.
     *
     * Note: This function is __bound__ to its `Immer` instance.
     *
     * @param {any} base - the initial state
     * @param {Function} recipe - function that receives a proxy of the base state as first argument and which can be freely modified
     * @param {Function} patchListener - optional function that will be called with all the patches produced here
     * @returns {any} a new state, or the initial state if nothing was modified
     */
    this.produce = (base, recipe, patchListener) => {
      if (typeof base === "function" && typeof recipe !== "function") {
        const defaultBase = recipe;
        recipe = base;
        const self = this;
        return function curriedProduce(base2 = defaultBase, ...args) {
          return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
        };
      }
      if (typeof recipe !== "function")
        die(6);
      if (patchListener !== void 0 && typeof patchListener !== "function")
        die(7);
      let result;
      if (isDraftable(base)) {
        const scope = enterScope(this);
        const proxy = createProxy(base, void 0);
        let hasError = true;
        try {
          result = recipe(proxy);
          hasError = false;
        } finally {
          if (hasError)
            revokeScope(scope);
          else
            leaveScope(scope);
        }
        usePatchesInScope(scope, patchListener);
        return processResult(result, scope);
      } else if (!base || typeof base !== "object") {
        result = recipe(base);
        if (result === void 0)
          result = base;
        if (result === NOTHING)
          result = void 0;
        if (this.autoFreeze_)
          freeze(result, true);
        if (patchListener) {
          const p = [];
          const ip = [];
          getPlugin("Patches").generateReplacementPatches_(base, result, p, ip);
          patchListener(p, ip);
        }
        return result;
      } else
        die(1, base);
    };
    this.produceWithPatches = (base, recipe) => {
      if (typeof base === "function") {
        return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
      }
      let patches, inversePatches;
      const result = this.produce(base, recipe, (p, ip) => {
        patches = p;
        inversePatches = ip;
      });
      return [result, patches, inversePatches];
    };
    if (typeof config?.autoFreeze === "boolean")
      this.setAutoFreeze(config.autoFreeze);
    if (typeof config?.useStrictShallowCopy === "boolean")
      this.setUseStrictShallowCopy(config.useStrictShallowCopy);
    if (typeof config?.useStrictIteration === "boolean")
      this.setUseStrictIteration(config.useStrictIteration);
  }
  createDraft(base) {
    if (!isDraftable(base))
      die(8);
    if (isDraft(base))
      base = current(base);
    const scope = enterScope(this);
    const proxy = createProxy(base, void 0);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy;
  }
  finishDraft(draft, patchListener) {
    const state = draft && draft[DRAFT_STATE];
    if (!state || !state.isManual_)
      die(9);
    const { scope_: scope } = state;
    usePatchesInScope(scope, patchListener);
    return processResult(void 0, scope);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(value) {
    this.autoFreeze_ = value;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(value) {
    this.useStrictShallowCopy_ = value;
  }
  /**
   * Pass false to use faster iteration that skips non-enumerable properties
   * but still handles symbols for compatibility.
   *
   * By default, strict iteration is enabled (includes all own properties).
   */
  setUseStrictIteration(value) {
    this.useStrictIteration_ = value;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(base, patches) {
    let i;
    for (i = patches.length - 1; i >= 0; i--) {
      const patch = patches[i];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    if (i > -1) {
      patches = patches.slice(i + 1);
    }
    const applyPatchesImpl = getPlugin("Patches").applyPatches_;
    if (isDraft(base)) {
      return applyPatchesImpl(base, patches);
    }
    return this.produce(
      base,
      (draft) => applyPatchesImpl(draft, patches)
    );
  }
};
function createProxy(value, parent) {
  const draft = isMap(value) ? getPlugin("MapSet").proxyMap_(value, parent) : isSet(value) ? getPlugin("MapSet").proxySet_(value, parent) : createProxyProxy(value, parent);
  const scope = parent ? parent.scope_ : getCurrentScope();
  scope.drafts_.push(draft);
  return draft;
}

// src/core/current.ts
function current(value) {
  if (!isDraft(value))
    die(10, value);
  return currentImpl(value);
}
function currentImpl(value) {
  if (!isDraftable(value) || isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  let copy;
  let strict = true;
  if (state) {
    if (!state.modified_)
      return state.base_;
    state.finalized_ = true;
    copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
    strict = state.scope_.immer_.shouldUseStrictIteration();
  } else {
    copy = shallowCopy(value, true);
  }
  each(
    copy,
    (key, childValue) => {
      set(copy, key, currentImpl(childValue));
    },
    strict
  );
  if (state) {
    state.finalized_ = false;
  }
  return copy;
}

// src/plugins/patches.ts
function enablePatches() {
  const errorOffset = 16;
  if (true) {
    errors.push(
      'Sets cannot have "replace" patches.',
      function(op) {
        return "Unsupported patch operation: " + op;
      },
      function(path) {
        return "Cannot apply patch, path doesn't resolve: " + path;
      },
      "Patching reserved attributes like __proto__, prototype and constructor is not allowed"
    );
  }
  const REPLACE = "replace";
  const ADD = "add";
  const REMOVE = "remove";
  function generatePatches_(state, basePath, patches, inversePatches) {
    switch (state.type_) {
      case 0 /* Object */:
      case 2 /* Map */:
        return generatePatchesFromAssigned(
          state,
          basePath,
          patches,
          inversePatches
        );
      case 1 /* Array */:
        return generateArrayPatches(state, basePath, patches, inversePatches);
      case 3 /* Set */:
        return generateSetPatches(
          state,
          basePath,
          patches,
          inversePatches
        );
    }
  }
  function generateArrayPatches(state, basePath, patches, inversePatches) {
    let { base_, assigned_ } = state;
    let copy_ = state.copy_;
    if (copy_.length < base_.length) {
      ;
      [base_, copy_] = [copy_, base_];
      [patches, inversePatches] = [inversePatches, patches];
    }
    for (let i = 0; i < base_.length; i++) {
      if (assigned_[i] && copy_[i] !== base_[i]) {
        const path = basePath.concat([i]);
        patches.push({
          op: REPLACE,
          path,
          // Need to maybe clone it, as it can in fact be the original value
          // due to the base/copy inversion at the start of this function
          value: clonePatchValueIfNeeded(copy_[i])
        });
        inversePatches.push({
          op: REPLACE,
          path,
          value: clonePatchValueIfNeeded(base_[i])
        });
      }
    }
    for (let i = base_.length; i < copy_.length; i++) {
      const path = basePath.concat([i]);
      patches.push({
        op: ADD,
        path,
        // Need to maybe clone it, as it can in fact be the original value
        // due to the base/copy inversion at the start of this function
        value: clonePatchValueIfNeeded(copy_[i])
      });
    }
    for (let i = copy_.length - 1; base_.length <= i; --i) {
      const path = basePath.concat([i]);
      inversePatches.push({
        op: REMOVE,
        path
      });
    }
  }
  function generatePatchesFromAssigned(state, basePath, patches, inversePatches) {
    const { base_, copy_ } = state;
    each(state.assigned_, (key, assignedValue) => {
      const origValue = get(base_, key);
      const value = get(copy_, key);
      const op = !assignedValue ? REMOVE : has(base_, key) ? REPLACE : ADD;
      if (origValue === value && op === REPLACE)
        return;
      const path = basePath.concat(key);
      patches.push(op === REMOVE ? { op, path } : { op, path, value });
      inversePatches.push(
        op === ADD ? { op: REMOVE, path } : op === REMOVE ? { op: ADD, path, value: clonePatchValueIfNeeded(origValue) } : { op: REPLACE, path, value: clonePatchValueIfNeeded(origValue) }
      );
    });
  }
  function generateSetPatches(state, basePath, patches, inversePatches) {
    let { base_, copy_ } = state;
    let i = 0;
    base_.forEach((value) => {
      if (!copy_.has(value)) {
        const path = basePath.concat([i]);
        patches.push({
          op: REMOVE,
          path,
          value
        });
        inversePatches.unshift({
          op: ADD,
          path,
          value
        });
      }
      i++;
    });
    i = 0;
    copy_.forEach((value) => {
      if (!base_.has(value)) {
        const path = basePath.concat([i]);
        patches.push({
          op: ADD,
          path,
          value
        });
        inversePatches.unshift({
          op: REMOVE,
          path,
          value
        });
      }
      i++;
    });
  }
  function generateReplacementPatches_(baseValue, replacement, patches, inversePatches) {
    patches.push({
      op: REPLACE,
      path: [],
      value: replacement === NOTHING ? void 0 : replacement
    });
    inversePatches.push({
      op: REPLACE,
      path: [],
      value: baseValue
    });
  }
  function applyPatches_(draft, patches) {
    patches.forEach((patch) => {
      const { path, op } = patch;
      let base = draft;
      for (let i = 0; i < path.length - 1; i++) {
        const parentType = getArchtype(base);
        let p = path[i];
        if (typeof p !== "string" && typeof p !== "number") {
          p = "" + p;
        }
        if ((parentType === 0 /* Object */ || parentType === 1 /* Array */) && (p === "__proto__" || p === "constructor"))
          die(errorOffset + 3);
        if (typeof base === "function" && p === "prototype")
          die(errorOffset + 3);
        base = get(base, p);
        if (typeof base !== "object")
          die(errorOffset + 2, path.join("/"));
      }
      const type = getArchtype(base);
      const value = deepClonePatchValue(patch.value);
      const key = path[path.length - 1];
      switch (op) {
        case REPLACE:
          switch (type) {
            case 2 /* Map */:
              return base.set(key, value);
            case 3 /* Set */:
              die(errorOffset);
            default:
              return base[key] = value;
          }
        case ADD:
          switch (type) {
            case 1 /* Array */:
              return key === "-" ? base.push(value) : base.splice(key, 0, value);
            case 2 /* Map */:
              return base.set(key, value);
            case 3 /* Set */:
              return base.add(value);
            default:
              return base[key] = value;
          }
        case REMOVE:
          switch (type) {
            case 1 /* Array */:
              return base.splice(key, 1);
            case 2 /* Map */:
              return base.delete(key);
            case 3 /* Set */:
              return base.delete(patch.value);
            default:
              return delete base[key];
          }
        default:
          die(errorOffset + 1, op);
      }
    });
    return draft;
  }
  function deepClonePatchValue(obj) {
    if (!isDraftable(obj))
      return obj;
    if (Array.isArray(obj))
      return obj.map(deepClonePatchValue);
    if (isMap(obj))
      return new Map(
        Array.from(obj.entries()).map(([k, v]) => [k, deepClonePatchValue(v)])
      );
    if (isSet(obj))
      return new Set(Array.from(obj).map(deepClonePatchValue));
    const cloned = Object.create(getPrototypeOf(obj));
    for (const key in obj)
      cloned[key] = deepClonePatchValue(obj[key]);
    if (has(obj, DRAFTABLE))
      cloned[DRAFTABLE] = obj[DRAFTABLE];
    return cloned;
  }
  function clonePatchValueIfNeeded(obj) {
    if (isDraft(obj)) {
      return deepClonePatchValue(obj);
    } else
      return obj;
  }
  loadPlugin("Patches", {
    applyPatches_,
    generatePatches_,
    generateReplacementPatches_
  });
}

// src/plugins/mapset.ts
function enableMapSet() {
  class DraftMap extends Map {
    constructor(target, parent) {
      super();
      this[DRAFT_STATE] = {
        type_: 2 /* Map */,
        parent_: parent,
        scope_: parent ? parent.scope_ : getCurrentScope(),
        modified_: false,
        finalized_: false,
        copy_: void 0,
        assigned_: void 0,
        base_: target,
        draft_: this,
        isManual_: false,
        revoked_: false
      };
    }
    get size() {
      return latest(this[DRAFT_STATE]).size;
    }
    has(key) {
      return latest(this[DRAFT_STATE]).has(key);
    }
    set(key, value) {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (!latest(state).has(key) || latest(state).get(key) !== value) {
        prepareMapCopy(state);
        markChanged(state);
        state.assigned_.set(key, true);
        state.copy_.set(key, value);
        state.assigned_.set(key, true);
      }
      return this;
    }
    delete(key) {
      if (!this.has(key)) {
        return false;
      }
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      prepareMapCopy(state);
      markChanged(state);
      if (state.base_.has(key)) {
        state.assigned_.set(key, false);
      } else {
        state.assigned_.delete(key);
      }
      state.copy_.delete(key);
      return true;
    }
    clear() {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (latest(state).size) {
        prepareMapCopy(state);
        markChanged(state);
        state.assigned_ = /* @__PURE__ */ new Map();
        each(state.base_, (key) => {
          state.assigned_.set(key, false);
        });
        state.copy_.clear();
      }
    }
    forEach(cb, thisArg) {
      const state = this[DRAFT_STATE];
      latest(state).forEach((_value, key, _map) => {
        cb.call(thisArg, this.get(key), key, this);
      });
    }
    get(key) {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      const value = latest(state).get(key);
      if (state.finalized_ || !isDraftable(value)) {
        return value;
      }
      if (value !== state.base_.get(key)) {
        return value;
      }
      const draft = createProxy(value, state);
      prepareMapCopy(state);
      state.copy_.set(key, draft);
      return draft;
    }
    keys() {
      return latest(this[DRAFT_STATE]).keys();
    }
    values() {
      const iterator = this.keys();
      return {
        [Symbol.iterator]: () => this.values(),
        next: () => {
          const r = iterator.next();
          if (r.done)
            return r;
          const value = this.get(r.value);
          return {
            done: false,
            value
          };
        }
      };
    }
    entries() {
      const iterator = this.keys();
      return {
        [Symbol.iterator]: () => this.entries(),
        next: () => {
          const r = iterator.next();
          if (r.done)
            return r;
          const value = this.get(r.value);
          return {
            done: false,
            value: [r.value, value]
          };
        }
      };
    }
    [(DRAFT_STATE, Symbol.iterator)]() {
      return this.entries();
    }
  }
  function proxyMap_(target, parent) {
    return new DraftMap(target, parent);
  }
  function prepareMapCopy(state) {
    if (!state.copy_) {
      state.assigned_ = /* @__PURE__ */ new Map();
      state.copy_ = new Map(state.base_);
    }
  }
  class DraftSet extends Set {
    constructor(target, parent) {
      super();
      this[DRAFT_STATE] = {
        type_: 3 /* Set */,
        parent_: parent,
        scope_: parent ? parent.scope_ : getCurrentScope(),
        modified_: false,
        finalized_: false,
        copy_: void 0,
        base_: target,
        draft_: this,
        drafts_: /* @__PURE__ */ new Map(),
        revoked_: false,
        isManual_: false
      };
    }
    get size() {
      return latest(this[DRAFT_STATE]).size;
    }
    has(value) {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (!state.copy_) {
        return state.base_.has(value);
      }
      if (state.copy_.has(value))
        return true;
      if (state.drafts_.has(value) && state.copy_.has(state.drafts_.get(value)))
        return true;
      return false;
    }
    add(value) {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (!this.has(value)) {
        prepareSetCopy(state);
        markChanged(state);
        state.copy_.add(value);
      }
      return this;
    }
    delete(value) {
      if (!this.has(value)) {
        return false;
      }
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      prepareSetCopy(state);
      markChanged(state);
      return state.copy_.delete(value) || (state.drafts_.has(value) ? state.copy_.delete(state.drafts_.get(value)) : (
        /* istanbul ignore next */
        false
      ));
    }
    clear() {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (latest(state).size) {
        prepareSetCopy(state);
        markChanged(state);
        state.copy_.clear();
      }
    }
    values() {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      prepareSetCopy(state);
      return state.copy_.values();
    }
    entries() {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      prepareSetCopy(state);
      return state.copy_.entries();
    }
    keys() {
      return this.values();
    }
    [(DRAFT_STATE, Symbol.iterator)]() {
      return this.values();
    }
    forEach(cb, thisArg) {
      const iterator = this.values();
      let result = iterator.next();
      while (!result.done) {
        cb.call(thisArg, result.value, result.value, this);
        result = iterator.next();
      }
    }
  }
  function proxySet_(target, parent) {
    return new DraftSet(target, parent);
  }
  function prepareSetCopy(state) {
    if (!state.copy_) {
      state.copy_ = /* @__PURE__ */ new Set();
      state.base_.forEach((value) => {
        if (isDraftable(value)) {
          const draft = createProxy(value, state);
          state.drafts_.set(value, draft);
          state.copy_.add(draft);
        } else {
          state.copy_.add(value);
        }
      });
    }
  }
  function assertUnrevoked(state) {
    if (state.revoked_)
      die(3, JSON.stringify(latest(state)));
  }
  loadPlugin("MapSet", { proxyMap_, proxySet_ });
}

// src/immer.ts
var immer = new Immer2();
var produce = immer.produce;
var produceWithPatches = /* @__PURE__ */ immer.produceWithPatches.bind(
  immer
);
var setAutoFreeze = /* @__PURE__ */ immer.setAutoFreeze.bind(immer);
var setUseStrictShallowCopy = /* @__PURE__ */ immer.setUseStrictShallowCopy.bind(
  immer
);
var setUseStrictIteration = /* @__PURE__ */ immer.setUseStrictIteration.bind(
  immer
);
var applyPatches = /* @__PURE__ */ immer.applyPatches.bind(immer);
var createDraft = /* @__PURE__ */ immer.createDraft.bind(immer);
var finishDraft = /* @__PURE__ */ immer.finishDraft.bind(immer);
function castDraft(value) {
  return value;
}
function castImmutable(value) {
  return value;
}

//# sourceMappingURL=immer.mjs.map

/***/ },

/***/ "./src/blocks/trust-badges/block.json"
/*!********************************************!*\
  !*** ./src/blocks/trust-badges/block.json ***!
  \********************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"category":"bplugins","parent":["bptmb/b-testimonials"],"textdomain":"b-testimonials-block","supports":{"align":["wide","full"],"html":false},"editorScript":["file:./index.js"],"editorStyle":"file:./index.css","style":["file:./index.css","file:./view.css"],"viewScript":["file:./view.js"],"render":"file:./render.php","name":"bptmb/trust-badges","title":"Trust Badges","description":"A row of trust badges with a title and subtitle.","keywords":["trust","badges","guarantee","features"],"attributes":{"align":{"type":"string","default":"wide"},"cId":{"type":"string","default":""},"items":{"type":"array","default":[{"img":{"url":""},"title":"Verified reviews","subtitle":"100% authentic"},{"img":{"url":""},"title":"Money-back","subtitle":"30-day guarantee"},{"img":{"url":""},"title":"Secure","subtitle":"SSL protected"}]},"columns":{"type":"object","default":{"desktop":3,"tablet":3,"mobile":1}},"columnGap":{"type":"string","default":"30px"},"rowGap":{"type":"string","default":"30px"},"layout":{"type":"string","default":"trust-badges"}}}');

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
  !*** ./src/blocks/trust-badges/index.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.json */ "./src/blocks/trust-badges/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/trust-badges/edit.js");
/* harmony import */ var _shared_utils_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/utils/icons */ "./src/shared/utils/icons.js");




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_1__, {
  icon: _shared_utils_icons__WEBPACK_IMPORTED_MODULE_3__.blockIcon,
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map