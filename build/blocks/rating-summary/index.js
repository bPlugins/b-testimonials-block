/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/rating-summary/edit.js"
/*!*******************************************!*\
  !*** ./src/blocks/rating-summary/edit.js ***!
  \*******************************************/
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
/* harmony import */ var _shared_styles_rating_summary_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/styles/rating-summary.scss */ "./src/shared/styles/rating-summary.scss");







const Edit = ({
  attributes,
  setAttributes,
  clientId
}) => {
  const {
    rating,
    outOf,
    count,
    showCount,
    countText,
    starColor,
    stacked
  } = attributes;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    clientId && setAttributes({
      cId: clientId.substring(0, 10)
    });
  }, [clientId]);
  const pct = outOf > 0 ? Math.min(100, rating / outOf * 100) : 0;
  const countLabel = (countText || '').replace('{count}', Number(count).toLocaleString());
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_shared_Components_Common_BlockSwitcher__WEBPACK_IMPORTED_MODULE_4__["default"], {
    clientId: clientId
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Rating', 'b-testimonials-block')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Rating', 'b-testimonials-block'),
    value: rating,
    onChange: val => setAttributes({
      rating: val
    }),
    min: 0,
    max: outOf,
    step: 0.1
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Out of', 'b-testimonials-block'),
    value: outOf,
    onChange: val => setAttributes({
      outOf: val
    }),
    min: 1,
    max: 10
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show review count', 'b-testimonials-block'),
    checked: showCount,
    onChange: val => setAttributes({
      showCount: val
    })
  }), showCount && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Review count', 'b-testimonials-block'),
    value: count,
    onChange: val => setAttributes({
      count: val
    }),
    min: 0,
    max: 100000,
    step: 1
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Count text', 'b-testimonials-block'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Use {count} for the number.', 'b-testimonials-block'),
    value: countText,
    onChange: val => setAttributes({
      countText: val
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Stacked layout', 'b-testimonials-block'),
    checked: stacked,
    onChange: val => setAttributes({
      stacked: val
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.PanelColorSettings, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Color', 'b-testimonials-block'),
    initialOpen: false,
    colorSettings: [{
      value: starColor,
      onChange: val => setAttributes({
        starColor: val
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Star color', 'b-testimonials-block')
    }]
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
      className: `bRatingSummary ${stacked ? 'is-stacked' : ''}`
    })
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rs-score"
  }, rating), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rs-stars"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rs-stars-base"
  }, "\u2605\u2605\u2605\u2605\u2605"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rs-stars-fill",
    style: {
      width: `${pct}%`,
      color: starColor
    }
  }, "\u2605\u2605\u2605\u2605\u2605")), showCount && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rs-count"
  }, countLabel)));
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
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/icons */ "./src/shared/utils/icons.js");
/* harmony import */ var _BlockSwitcherModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BlockSwitcherModal */ "./src/shared/Components/Common/BlockSwitcherModal.js");








const BlockSwitcher = ({
  clientId,
  currentBlockName,
  attributes = {},
  setAttributes
}) => {
  const [isModalOpen, setIsModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    currentBlock,
    parentBlock,
    innerBlocks
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    if (!clientId) return {
      currentBlock: null,
      parentBlock: null,
      innerBlocks: []
    };
    const block = select('core/block-editor').getBlock(clientId);
    const parents = select('core/block-editor').getBlockParents(clientId);
    const parent = parents && parents.length > 0 ? select('core/block-editor').getBlock(parents[parents.length - 1]) : null;
    return {
      currentBlock: block,
      parentBlock: parent,
      innerBlocks: block ? block.innerBlocks : []
    };
  }, [clientId]);
  const mainParentClientId = currentBlock?.name === 'bptmb/b-testimonials' ? clientId : parentBlock?.name === 'bptmb/b-testimonials' ? parentBlock.clientId : null;
  const targetAttributes = mainParentClientId ? currentBlock?.name === 'bptmb/b-testimonials' ? attributes : parentBlock?.attributes || {} : attributes;
  const isClassic = targetAttributes?.isLegacyBlock || targetAttributes?.useClassicEditor;
  const handleSwitchToClassic = () => {
    try {
      if (mainParentClientId) {
        // Update parent block attributes to Classic mode
        (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)('core/block-editor').updateBlockAttributes(mainParentClientId, {
          useClassicEditor: true,
          isLegacyBlock: true
        });

        // Remove any child blocks inside main parent
        const pBlock = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)('core/block-editor').getBlock ? null : null; // safe check
        const targetChildren = currentBlock?.name === 'bptmb/b-testimonials' ? innerBlocks : parentBlock?.innerBlocks || [];
        if (targetChildren && targetChildren.length > 0) {
          targetChildren.forEach(child => {
            try {
              (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)('core/block-editor').removeBlock(child.clientId);
            } catch (e) {
              console.warn('Could not remove child block:', e);
            }
          });
        }
      } else {
        // Standalone child block on canvas page: replace with bptmb/b-testimonials in classic mode
        const newParent = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__.createBlock)('bptmb/b-testimonials', {
          ...(currentBlock?.attributes || {}),
          useClassicEditor: true,
          isLegacyBlock: true
        });
        (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)('core/block-editor').replaceBlock(clientId, newParent);
      }
    } catch (err) {
      console.error('Failed to switch to classic mode:', err);
    }
  };
  const handleSwitchToPlaceholder = () => {
    try {
      if (mainParentClientId) {
        // Update parent block attributes to non-classic mode
        (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)('core/block-editor').updateBlockAttributes(mainParentClientId, {
          useClassicEditor: false,
          isLegacyBlock: false
        });

        // Remove any child blocks inside main parent so placeholder displays
        const targetChildren = currentBlock?.name === 'bptmb/b-testimonials' ? innerBlocks : parentBlock?.innerBlocks || [];
        if (targetChildren && targetChildren.length > 0) {
          targetChildren.forEach(child => {
            try {
              (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)('core/block-editor').removeBlock(child.clientId);
            } catch (e) {
              console.warn('Could not remove child block:', e);
            }
          });
        }
      } else {
        // Standalone child block on canvas page: replace with bptmb/b-testimonials in placeholder mode
        const newParent = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__.createBlock)('bptmb/b-testimonials', {
          ...(currentBlock?.attributes || {}),
          useClassicEditor: false,
          isLegacyBlock: false
        });
        (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)('core/block-editor').replaceBlock(clientId, newParent);
      }
    } catch (err) {
      console.error('Failed to switch to placeholder mode:', err);
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    className: "bPlPanelBody btbSidebarSwitcherPanel",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select / Switch Block', 'b-testimonials-block'),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btbSidebarSwitcherCard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btbSidebarIconWrap"
  }, (0,_utils_icons__WEBPACK_IMPORTED_MODULE_5__.getLayoutSvgIcon)('layout', 24)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
    style: {
      marginRight: '6px',
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, (0,_utils_icons__WEBPACK_IMPORTED_MODULE_5__.getLayoutSvgIcon)('update', 16)), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Change Block / Layout', 'b-testimonials-block')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginTop: '10px',
      paddingTop: '8px',
      borderTop: '1px solid #e2e8f0'
    }
  }, isClassic ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "tertiary",
    style: {
      fontSize: '11px',
      height: 'auto',
      padding: '4px 0',
      textDecoration: 'underline'
    },
    onClick: handleSwitchToPlaceholder
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Switch to 40+ Layout Placeholder', 'b-testimonials-block')) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "tertiary",
    style: {
      fontSize: '11px',
      height: 'auto',
      padding: '4px 0',
      textDecoration: 'underline'
    },
    onClick: handleSwitchToClassic
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Switch to Classic Single Block Mode', 'b-testimonials-block'))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_BlockSwitcherModal__WEBPACK_IMPORTED_MODULE_6__["default"], {
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
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/icons */ "./src/shared/utils/icons.js");






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
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Popular', 'b-testimonials-block')
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
    parentBlock,
    innerBlocks
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    if (!clientId) return {
      currentBlock: null,
      parentBlock: null,
      innerBlocks: []
    };
    const block = select('core/block-editor').getBlock(clientId);
    const parents = select('core/block-editor').getBlockParents(clientId);
    const parent = parents && parents.length > 0 ? select('core/block-editor').getBlock(parents[parents.length - 1]) : null;
    return {
      currentBlock: block,
      parentBlock: parent,
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
        (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)('core/block-editor').updateBlockAttributes(clientId, {
          useClassicEditor: false,
          isLegacyBlock: false
        });
        if (innerBlocks && innerBlocks.length > 0) {
          (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)('core/block-editor').replaceBlock(innerBlocks[0].clientId, newChildBlock);
        } else {
          (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)('core/block-editor').insertBlock(newChildBlock, 0, clientId);
        }
      } else if (parentBlock && parentBlock.name === 'bptmb/b-testimonials') {
        (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)('core/block-editor').updateBlockAttributes(parentBlock.clientId, {
          useClassicEditor: false,
          isLegacyBlock: false
        });
        (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)('core/block-editor').replaceBlock(clientId, newChildBlock);
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
  }, (0,_utils_icons__WEBPACK_IMPORTED_MODULE_4__.getLayoutSvgIcon)('grid-view', 24, '#ffffff')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "btb-modal-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Testimonial Block Switcher', 'b-testimonials-block')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "btb-modal-desc"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select from 40+ modern layouts & social proof widgets', 'b-testimonials-block')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "btb-modal-close-btn",
    onClick: onRequestClose,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Close modal', 'b-testimonials-block')
  }, (0,_utils_icons__WEBPACK_IMPORTED_MODULE_4__.getLayoutSvgIcon)('close', 18))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
    className: "search-icon"
  }, (0,_utils_icons__WEBPACK_IMPORTED_MODULE_4__.getLayoutSvgIcon)('search', 16)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Search layouts…', 'b-testimonials-block'),
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value)
  }), searchQuery && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "clear-search-btn",
    onClick: () => setSearchQuery('')
  }, (0,_utils_icons__WEBPACK_IMPORTED_MODULE_4__.getLayoutSvgIcon)('close', 14)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
    }, (0,_utils_icons__WEBPACK_IMPORTED_MODULE_4__.getLayoutSvgIcon)(item.icon, 24)), item.badge && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
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
/* harmony export */   getLayoutSvgIcon: () => (/* binding */ getLayoutSvgIcon),
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
const getLayoutSvgIcon = (iconName, size = 22, color = 'currentColor') => {
  switch (iconName) {
    case 'slides':
    case 'carousel':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "2",
        y: "5",
        width: "20",
        height: "14",
        rx: "2"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M8 12l4-4 4 4"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M12 8v8"
      }));
    case 'editor-ul':
    case 'list':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "8",
        y1: "6",
        x2: "21",
        y2: "6"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "8",
        y1: "12",
        x2: "21",
        y2: "12"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "8",
        y1: "18",
        x2: "21",
        y2: "18"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "3",
        y1: "6",
        x2: "3.01",
        y2: "6"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "3",
        y1: "12",
        x2: "3.01",
        y2: "12"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "3",
        y1: "18",
        x2: "3.01",
        y2: "18"
      }));
    case 'dashboard':
    case 'masonry':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "3",
        y: "3",
        width: "7",
        height: "9",
        rx: "1"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "14",
        y: "3",
        width: "7",
        height: "5",
        rx: "1"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "14",
        y: "12",
        width: "7",
        height: "9",
        rx: "1"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "3",
        y: "16",
        width: "7",
        height: "5",
        rx: "1"
      }));
    case 'update-alt':
    case 'update':
    case 'marquee':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M21.5 2v6h-6"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"
      }));
    case 'star-filled':
    case 'star-half':
    case 'rating':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: color === 'currentColor' ? '#ff9800' : color,
        stroke: color === 'currentColor' ? '#ff9800' : color,
        strokeWidth: "1.5"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      }));
    case 'chart-bar':
    case 'stats':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "12",
        y1: "20",
        x2: "12",
        y2: "10"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "18",
        y1: "20",
        x2: "18",
        y2: "4"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "6",
        y1: "20",
        x2: "6",
        y2: "16"
      }));
    case 'shield':
    case 'yes-alt':
    case 'verified':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M9 12l2 2 4-4"
      }));
    case 'groups':
    case 'admin-users':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
        cx: "9",
        cy: "7",
        r: "4"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M23 21v-2a4 4 0 0 0-3-3.87"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M16 3.13a4 4 0 0 1 0 7.75"
      }));
    case 'video-alt3':
    case 'video':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
        points: "23 7 16 12 23 17 23 7"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "1",
        y: "5",
        width: "15",
        height: "14",
        rx: "2",
        ry: "2"
      }));
    case 'image-flip-horizontal':
    case 'before-after':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "3",
        y: "3",
        width: "18",
        height: "18",
        rx: "2"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "12",
        y1: "3",
        x2: "12",
        y2: "21"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M8 10l-3 3 3 3"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M16 10l3 3-3 3"
      }));
    case 'feedback':
    case 'form':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      }));
    case 'align-center':
    case 'grid-view':
    case 'grid':
    case 'layout':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "3",
        y: "3",
        width: "7",
        height: "7",
        rx: "1"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "14",
        y: "3",
        width: "7",
        height: "7",
        rx: "1"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "14",
        y: "14",
        width: "7",
        height: "7",
        rx: "1"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "3",
        y: "14",
        width: "7",
        height: "7",
        rx: "1"
      }));
    case 'columns':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "3",
        y: "3",
        width: "18",
        height: "18",
        rx: "2"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "9",
        y1: "3",
        x2: "9",
        y2: "21"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "15",
        y1: "3",
        x2: "15",
        y2: "21"
      }));
    case 'excerpt-view':
    case 'compact':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "3",
        y: "4",
        width: "18",
        height: "4",
        rx: "1"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "3",
        y: "10",
        width: "18",
        height: "4",
        rx: "1"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "3",
        y: "16",
        width: "18",
        height: "4",
        rx: "1"
      }));
    case 'format-quote':
    case 'quote':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: color === 'currentColor' ? 'currentColor' : color
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"
      }));
    case 'format-chat':
    case 'speech':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
      }));
    case 'list-view':
    case 'timeline':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "12",
        y1: "2",
        x2: "12",
        y2: "22"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
        cx: "12",
        cy: "6",
        r: "2"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
        cx: "12",
        cy: "12",
        r: "2"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
        cx: "12",
        cy: "18",
        r: "2"
      }));
    case 'index-card':
    case 'card-stack':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "2",
        y: "7",
        width: "16",
        height: "14",
        rx: "2"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M6 3h14a2 2 0 0 1 2 2v12"
      }));
    case 'welcome-learn-more':
    case 'case-study':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
        points: "14 2 14 8 20 8"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "16",
        y1: "13",
        x2: "8",
        y2: "13"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "16",
        y1: "17",
        x2: "8",
        y2: "17"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
        points: "10 9 9 9 8 9"
      }));
    case 'google':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: "#4285F4",
        d: "M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: "#34A853",
        d: "M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.35 7.33 24 12 24z"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: "#FBBC05",
        d: "M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.18 0 9.98 0 12s.46 3.82 1.26 5.42l4.02-3.15z"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: "#EA4335",
        d: "M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.65 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      }));
    case 'trustpilot':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "#00b67a"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      }));
    case 'facebook':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "#1877F2"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      }));
    case 'awards':
    case 'capterra':
    case 'g2':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
        cx: "12",
        cy: "8",
        r: "7"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
        points: "8.21 13.89 7 23 12 20 17 23 15.79 13.88"
      }));
    case 'sticky':
    case 'widget':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
        points: "15 3 15 9 21 9"
      }));
    case 'testimonial':
    case 'toast':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "2",
        y: "4",
        width: "20",
        height: "16",
        rx: "3"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
        cx: "8",
        cy: "12",
        r: "2"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M14 10h4"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M14 14h3"
      }));
    case 'controls-play':
    case 'audio':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
        points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M15.54 8.46a5 5 0 0 1 0 7.07"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M19.07 4.93a10 10 0 0 1 0 14.14"
      }));
    case 'chart-pie':
    case 'poll':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M21.21 15.89A10 10 0 1 1 8 2.83"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M22 12A10 10 0 0 0 12 2v10z"
      }));
    case 'table-col-after':
    case 'table':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "3",
        y: "3",
        width: "18",
        height: "18",
        rx: "2"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "12",
        y1: "3",
        x2: "12",
        y2: "21"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "3",
        y1: "9",
        x2: "21",
        y2: "9"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "3",
        y1: "15",
        x2: "21",
        y2: "15"
      }));
    case 'arrow-down-alt2':
    case 'accordion':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
        points: "6 9 12 15 18 9"
      }));
    case 'superhero':
    case 'hero':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
        points: "12 2 2 7 12 12 22 7 12 2"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
        points: "2 17 12 22 22 17"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
        points: "2 12 12 17 22 12"
      }));
    case 'bubbles':
    case 'floating-bubble':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
        cx: "7.5",
        cy: "7.5",
        r: "4.5"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
        cx: "16.5",
        cy: "16.5",
        r: "4.5"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
        cx: "17.5",
        cy: "6.5",
        r: "2.5"
      }));
    case 'external':
    case 'popup-modal':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
        points: "15 3 21 3 21 9"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "10",
        y1: "14",
        x2: "21",
        y2: "3"
      }));
    case 'search':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
        cx: "11",
        cy: "11",
        r: "8"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "21",
        y1: "21",
        x2: "16.65",
        y2: "16.65"
      }));
    case 'close':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "18",
        y1: "6",
        x2: "6",
        y2: "18"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
        x1: "6",
        y1: "6",
        x2: "18",
        y2: "18"
      }));
    case 'settings':
    case 'admin-settings':
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
        cx: "12",
        cy: "12",
        r: "3"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      }));
    default:
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "3",
        y: "3",
        width: "7",
        height: "7",
        rx: "1"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "14",
        y: "3",
        width: "7",
        height: "7",
        rx: "1"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "14",
        y: "14",
        width: "7",
        height: "7",
        rx: "1"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
        x: "3",
        y: "14",
        width: "7",
        height: "7",
        rx: "1"
      }));
  }
};

/***/ },

/***/ "./src/shared/styles/rating-summary.scss"
/*!***********************************************!*\
  !*** ./src/shared/styles/rating-summary.scss ***!
  \***********************************************/
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

/***/ "./src/blocks/rating-summary/block.json"
/*!**********************************************!*\
  !*** ./src/blocks/rating-summary/block.json ***!
  \**********************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"category":"bplugins","parent":["bptmb/b-testimonials"],"textdomain":"b-testimonials-block","supports":{"align":["wide","full"],"html":false},"editorScript":["file:./index.js"],"editorStyle":"file:./index.css","style":["file:./index.css","file:./view.css"],"viewScript":["file:./view.js"],"render":"file:./render.php","name":"bptmb/rating-summary","title":"Rating Summary","description":"Show an aggregate star rating with a review count.","keywords":["rating","stars","summary","aggregate"],"attributes":{"align":{"type":"string","default":"wide"},"cId":{"type":"string","default":""},"items":{"type":"array","default":[{"img":{"url":"https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png"},"name":"John Doe","deg":"Developer","reviewText":"It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout","rating":5},{"img":{"url":"https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png"},"name":"Jane Smith","deg":"Designer","reviewText":"Great experience working with this plugin!","rating":5},{"img":{"url":"https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png"},"name":"Alex Johnson","deg":"Manager","reviewText":"Solid functionality and easy setup.","rating":4}]},"layout":{"type":"string","default":"rating-summary"},"dataSource":{"type":"string","default":"manual"},"query":{"type":"object","default":{}},"badgeTitle":{"type":"string","default":"Rating Summary"},"badgeScore":{"type":"string","default":""},"badgeCount":{"type":"string","default":""},"rating":{"type":"number","default":4.8},"outOf":{"type":"number","default":5},"count":{"type":"number","default":1234},"showCount":{"type":"boolean","default":true},"countText":{"type":"string","default":"Based on {count} reviews"},"starColor":{"type":"string","default":"#FF8C02"},"stacked":{"type":"boolean","default":false}}}');

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
/*!********************************************!*\
  !*** ./src/blocks/rating-summary/index.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.json */ "./src/blocks/rating-summary/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/rating-summary/edit.js");
/* harmony import */ var _shared_utils_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/utils/icons */ "./src/shared/utils/icons.js");




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_1__, {
  icon: _shared_utils_icons__WEBPACK_IMPORTED_MODULE_3__.blockIcon,
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map