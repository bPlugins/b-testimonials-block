/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/testimonial-form/edit.js"
/*!*********************************************!*\
  !*** ./src/blocks/testimonial-form/edit.js ***!
  \*********************************************/
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
/* harmony import */ var _shared_Components_Common_BlockSwitcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/Components/Common/BlockSwitcher */ "./src/shared/Components/Common/BlockSwitcher.js");
/* harmony import */ var _shared_styles_form_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/styles/form.scss */ "./src/shared/styles/form.scss");







const Edit = ({
  attributes,
  setAttributes,
  clientId
}) => {
  const {
    formTitle,
    buttonText,
    successMessage,
    fields,
    accentColor
  } = attributes;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    clientId && setAttributes({
      cId: clientId.substring(0, 10)
    });
  }, [clientId]);
  const setField = (key, val) => setAttributes({
    fields: {
      ...fields,
      [key]: val
    }
  });
  const fieldToggles = [['rating', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Rating', 'b-testimonials-block')], ['designation', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Designation', 'b-testimonials-block')], ['company', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Company', 'b-testimonials-block')], ['email', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Email', 'b-testimonials-block')], ['image', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Photo upload', 'b-testimonials-block')]];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_shared_Components_Common_BlockSwitcher__WEBPACK_IMPORTED_MODULE_4__["default"], {
    clientId: clientId
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Form', 'b-testimonials-block')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title', 'b-testimonials-block'),
    value: formTitle,
    onChange: val => setAttributes({
      formTitle: val
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Button text', 'b-testimonials-block'),
    value: buttonText,
    onChange: val => setAttributes({
      buttonText: val
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextareaControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Success message', 'b-testimonials-block'),
    value: successMessage,
    onChange: val => setAttributes({
      successMessage: val
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Fields', 'b-testimonials-block'),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Name and Review are always shown and required.', 'b-testimonials-block')), fieldToggles.map(([key, label]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    key: key,
    label: label,
    checked: !!fields?.[key],
    onChange: val => setField(key, val)
  })), fields?.image && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Note: photo upload allows anonymous image uploads. Submissions stay pending until you approve them.', 'b-testimonials-block'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.PanelColorSettings, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Color', 'b-testimonials-block'),
    initialOpen: false,
    colorSettings: [{
      value: accentColor,
      onChange: val => setAttributes({
        accentColor: val
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Accent (button)', 'b-testimonials-block')
    }]
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
      className: 'bTestimonialForm'
    })
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    className: "btb-tform",
    onSubmit: e => e.preventDefault()
  }, formTitle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "btb-tform-title"
  }, formTitle), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btb-tform-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Name', 'b-testimonials-block'), " *"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    disabled: true
  })), fields?.email && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btb-tform-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Email', 'b-testimonials-block')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "email",
    disabled: true
  })), fields?.designation && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btb-tform-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Designation', 'b-testimonials-block')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    disabled: true
  })), fields?.company && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btb-tform-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Company', 'b-testimonials-block')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    disabled: true
  })), fields?.rating && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btb-tform-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Rating', 'b-testimonials-block')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    disabled: true
  }, [5, 4, 3, 2, 1].map(n => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: n
  }, n)))), fields?.image && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btb-tform-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Photo', 'b-testimonials-block')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "file",
    accept: "image/*",
    disabled: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btb-tform-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Review', 'b-testimonials-block'), " *"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    disabled: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "submit",
    className: "btb-tform-submit",
    style: {
      backgroundColor: accentColor
    },
    disabled: true
  }, buttonText))));
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

/***/ "./src/shared/styles/form.scss"
/*!*************************************!*\
  !*** ./src/shared/styles/form.scss ***!
  \*************************************/
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

/***/ "./src/blocks/testimonial-form/block.json"
/*!************************************************!*\
  !*** ./src/blocks/testimonial-form/block.json ***!
  \************************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"bptmb/testimonial-form","title":"Testimonial Form","description":"Let visitors submit their own testimonials. Submissions are saved as pending for review.","category":"bplugins","parent":["bptmb/b-testimonials"],"keywords":["testimonial","form","submit","review"],"textdomain":"b-testimonials-block","attributes":{"align":{"type":"string","default":"wide"},"cId":{"type":"string","default":""},"formTitle":{"type":"string","default":"Share your experience"},"buttonText":{"type":"string","default":"Submit testimonial"},"successMessage":{"type":"string","default":"Thank you! Your testimonial has been submitted and is awaiting review."},"fields":{"type":"object","default":{"email":false,"designation":true,"company":false,"rating":true,"image":false}},"accentColor":{"type":"string","default":"#0575e6"},"layout":{"type":"string","default":"testimonial-form"}},"supports":{"align":["wide","full"],"html":false},"editorScript":["file:./index.js"],"editorStyle":"file:./index.css","style":["file:./index.css","file:./view.css"],"render":"file:./render.php","viewScript":["file:./view.js"]}');

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
/*!**********************************************!*\
  !*** ./src/blocks/testimonial-form/index.js ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.json */ "./src/blocks/testimonial-form/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/testimonial-form/edit.js");
/* harmony import */ var _shared_utils_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/utils/icons */ "./src/shared/utils/icons.js");




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_1__, {
  icon: _shared_utils_icons__WEBPACK_IMPORTED_MODULE_3__.blockIcon,
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map