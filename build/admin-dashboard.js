/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../bpl-tools/Admin/Blocks/Block.js"
/*!******************************************!*\
  !*** ../bpl-tools/Admin/Blocks/Block.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/icons */ "../bpl-tools/utils/icons.js");

/**
	* Block Component
	*
	* @props block (required): single block data object (Object)
	* @props isPremium (required): whether the plugin is premium (Boolean)
	* @props disableBlockName (required): names of currently disabled blocks (Array)
	* @props handleCheckboxChange (required): toggle handler called with (name, checked) (Function)
	* @props isSaving (required): whether a save is in progress (Boolean)
	* @props isLinks (optional): true (Boolean)
	*/


const Block = ({
  block,
  isPremium,
  disableBlockName,
  handleCheckboxChange,
  isSaving,
  isLinks = true
}) => {
  const {
    name,
    title,
    icon,
    demo,
    docs,
    badge = '',
    required = false
  } = block;
  const isBlockPremium = !isPremium && block.isPremium;
  const disabledBlock = isBlockPremium ? false : !disableBlockName.includes(name);
  const isRequired = required === true;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `block ${!disabledBlock ? 'disabled' : ''}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "icon"
  }, icon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "name"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "blockTitle"
  }, title), isBlockPremium && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#pricing"
  }, "Get Pro")), isLinks && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, demo && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "actionBtn",
    href: demo,
    target: "_blank",
    rel: "noopener noreferrer"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_1__.demoIcon), docs && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "actionBtn",
    href: docs,
    target: "_blank",
    rel: "noopener noreferrer"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_1__.docsIcon)), badge && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "blockBadge"
  }, badge), isBlockPremium && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "blockBadge blockProBadge"
  }, "Pro"), isRequired && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "blockBadge blockRequiredBadge"
  }, "Required"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "toggleSwitch",
    ...(isBlockPremium || isRequired ? {
      htmlFor: 'b-blocks-admin-pro-modal-toggle'
    } : {})
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "checkbox",
    checked: disabledBlock,
    ...(isBlockPremium || isRequired ? {} : {
      onChange: e => handleCheckboxChange(name, e.target.checked)
    }),
    disabled: isSaving || isBlockPremium || isRequired
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "slider"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Block);

/***/ },

/***/ "../bpl-tools/Admin/Blocks/Toast.js"
/*!******************************************!*\
  !*** ../bpl-tools/Admin/Blocks/Toast.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

/**
	* Toast Component
	*
	* @props message (required): toast text (String)
	* @props type (required): 'loading' | 'success' | 'error' (String)
	*/


const Toast = ({
  message,
  type
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `bPlDashboardBlocksToast ${type}`
  }, type === 'loading' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null), type === 'success' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "checkmark"
  }, "\u2713"), type === 'error' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "error-icon"
  }, "\u2715"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "message"
  }, message));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Toast);

/***/ },

/***/ "../bpl-tools/Admin/Blocks/index.js"
/*!******************************************!*\
  !*** ../bpl-tools/Admin/Blocks/index.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Blocks/style.scss");
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/icons */ "../bpl-tools/utils/icons.js");
/* harmony import */ var _Block__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Block */ "../bpl-tools/Admin/Blocks/Block.js");
/* harmony import */ var _Toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Toast */ "../bpl-tools/Admin/Blocks/Toast.js");








/**
 * Blocks Component
 * Renders a management interface for enabling/disabling plugin features/blocks.
 * Includes search, categorization, and "Activate/Deactivate All" functionality.
 *
 * @param {object} props - Component props
 * @param {boolean} props.isPremium - Whether the current user is premium
 * @param {Array} props.disabledBlocks - List of currently disabled block names
 * @param {Function} props.onChange - Callback when block status changes
 * @param {Array} props.allBlocks - Array of block definitions
 * @param {string} props.status - Saving status ('loading', 'success', 'error')
 * @param {React.Component} [props.ProModal] - Modal component for Pro upsells
 * @returns {JSX.Element}
 */
const Blocks = props => {
  const {
    isPremium,
    disabledBlocks,
    onChange,
    allBlocks,
    status,
    ProModal = null,
    pageTitle = 'All Blocks'
  } = props;
  const publishedBlocks = allBlocks.filter(b => 'published' === b.status || !b.status);
  const [isSaving, setIsSaving] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [disableBlockName, setDisableBlockName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(disabledBlocks || []);
  const [searchTerm, setSearchTerm] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [toast, setToast] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);

  // Update disabled blocks when disabledBlocks prop changes
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (disabledBlocks) {
      setDisableBlockName(disabledBlocks);
    }
  }, [JSON.stringify(disabledBlocks)]);

  // Update toast based on status prop
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (status === 'loading') {
      setToast({
        message: 'Loading...',
        type: 'loading'
      });
      setIsSaving(true);
    } else if (status === 'success') {
      setToast({
        message: 'Saved successfully!',
        type: 'success'
      });
      setIsSaving(false);
      setTimeout(() => setToast(null), 3000);
    } else if (status === 'error') {
      setToast({
        message: 'Failed to save',
        type: 'error'
      });
      setIsSaving(false);
      setTimeout(() => setToast(null), 3000);
    }
  }, [status]);
  const handleCheckboxChange = (blockName, isChecked) => {
    const updatedBlocksName = isChecked ? disableBlockName.filter(name => name !== blockName) : [...disableBlockName, blockName];
    setDisableBlockName(updatedBlocksName);
    onChange?.(updatedBlocksName);
    setToast({
      message: 'Saving changes...',
      type: 'loading'
    });
    setIsSaving(true);
  };
  const handleActivateAll = () => {
    setDisableBlockName([]);
    onChange?.([]);
    setToast({
      message: 'Saving changes...',
      type: 'loading'
    });
    setIsSaving(true);
  };
  const handleDeactivateAll = () => {
    // Exclude required blocks from being deactivated
    const allBlockNames = publishedBlocks.flatMap(block => {
      if (block.children && Array.isArray(block.children)) {
        return block.children.filter(child => !child.required).map(child => child.name);
      } else {
        return block.required ? [] : block.name;
      }
    });
    setDisableBlockName(allBlockNames);
    onChange?.(allBlockNames);
    setToast({
      message: 'Saving changes...',
      type: 'loading'
    });
    setIsSaving(true);
  };

  // Separate grouped blocks from individual blocks
  const groupedBlocks = [];
  const individualBlocks = [];
  publishedBlocks.forEach(block => {
    if (block.children && Array.isArray(block.children)) {
      groupedBlocks.push(block);
    } else {
      individualBlocks.push(block);
    }
  });

  // Filter blocks based on search term
  const filterBlocksBySearch = blocksToFilter => {
    return blocksToFilter.filter(block => {
      if (block.children) {
        // For grouped blocks, check if title or any child matches
        const matchesTitle = block.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesChildren = block.children.some(child => child.title?.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesTitle || matchesChildren;
      } else {
        // For individual blocks
        return block.title?.toLowerCase().includes(searchTerm.toLowerCase());
      }
    });
  };
  const filteredGroupedBlocks = filterBlocksBySearch(groupedBlocks);
  const filteredIndividualBlocks = filterBlocksBySearch(individualBlocks);
  const hasResults = filteredGroupedBlocks.length > 0 || filteredIndividualBlocks.length > 0;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardBlocks"
  }, !isPremium && ProModal && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ProModal, null), toast && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Toast__WEBPACK_IMPORTED_MODULE_5__["default"], {
    message: toast.message,
    type: toast.type
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "blocksTop"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, pageTitle), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "blocksSearch"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_3__.searchIcon, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: "Search...",
    value: searchTerm,
    onChange: e => setSearchTerm(e.target.value),
    className: "search-input"
  }), searchTerm && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    onClick: () => setSearchTerm('')
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_3__.closeIcon)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "bBlocksDashboardBtn actionBtn activeAllBtn",
    onClick: handleActivateAll
  }, "Activate All"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "bBlocksDashboardBtn actionBtn deActiveAllBtn",
    onClick: handleDeactivateAll
  }, "Deactivate All")), !hasResults ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "noBlocksFound"
  }, "No blocks found matching your search...") : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "blocksContent"
  }, filteredGroupedBlocks.map(group => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: group.title,
    className: "blocksGroup"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "groupTitle"
  }, group.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dashboardBlocks"
  }, group.children.filter(child => child.status === 'published' || !child.status).map(childBlock => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Block__WEBPACK_IMPORTED_MODULE_4__["default"], {
    key: childBlock.name,
    block: childBlock,
    isPremium: isPremium,
    disableBlockName: disableBlockName,
    handleCheckboxChange: handleCheckboxChange,
    isSaving: isSaving
  }))))), filteredIndividualBlocks.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dashboardBlocks"
  }, filteredIndividualBlocks.map(block => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Block__WEBPACK_IMPORTED_MODULE_4__["default"], {
    key: block.name,
    block: block,
    isPremium: isPremium,
    disableBlockName: disableBlockName,
    handleCheckboxChange: handleCheckboxChange,
    isSaving: isSaving
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Blocks);

/***/ },

/***/ "../bpl-tools/Admin/Demos/index.js"
/*!*****************************************!*\
  !*** ../bpl-tools/Admin/Demos/index.js ***!
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
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/icons */ "../bpl-tools/Admin/utils/icons.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Demos/style.scss");

/**
	* Demos Component
	*
	* @props name (required): plugin name shown in the page heading (String)
	* @props isPremium (required): whether the plugin is premium (Boolean)
	* @props demoInfo (required): {demos, allInOneLabel?, allInOneLink?} demo data (Object)
	*/





const CATEGORY_COLORS = ['#3b82f6',
// blue
'#10b981',
// emerald
'#8b5cf6',
// violet
'#f59e0b',
// amber
'#ec4899',
// pink
'#06b6d4',
// cyan
'#f43f5e',
// rose
'#14b8a6' // teal
];
const Demos = ({
  name,
  isPremium,
  demoInfo
}) => {
  const {
    demos
  } = demoInfo;
  const [activeCategory, setActiveCategory] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('All');
  const [search, setSearch] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [openIndex, setOpenIndex] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [iframeLoading, setIframeLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const categories = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ['All', ...demos.filter(d => d.children?.length > 0 || d.url && d.url !== '#').map(d => d.title)], [demos]);
  const categoryAccents = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const map = {};
    const activeCats = categories.filter(cat => cat !== 'All');
    activeCats.forEach((cat, index) => {
      map[cat] = CATEGORY_COLORS[index % CATEGORY_COLORS.length];
    });
    return map;
  }, [categories]);
  const allCards = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const cards = [];
    demos.forEach(demo => {
      const accent = categoryAccents[demo.title];
      const processCard = cardData => ({
        ...cardData,
        category: demo.title,
        categoryIcon: demo.icon,
        accent,
        _searchTarget: `${cardData.title.toLowerCase()} ${demo.title.toLowerCase()}`
      });
      if (demo.children?.length) {
        demo.children.forEach(child => cards.push(processCard(child)));
      } else if (demo.url && demo.url !== '#') {
        cards.push(processCard(demo));
      }
    });
    return cards;
  }, [demos, categoryAccents]);
  const filtered = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const q = search.trim().toLowerCase();
    return allCards.filter(card => {
      if (activeCategory !== 'All' && card.category !== activeCategory) return false;
      if (q && !card._searchTarget.includes(q)) return false;
      return true;
    });
  }, [allCards, activeCategory, search]);
  const active = openIndex !== null ? filtered[openIndex] : null;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (active) setIframeLoading(true);
  }, [active?.url]);
  const isModalOpen = openIndex !== null;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isModalOpen) return;
    const handler = e => {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowRight') setOpenIndex(i => Math.min(i + 1, filtered.length - 1));
      if (e.key === 'ArrowLeft') setOpenIndex(i => Math.max(i - 1, 0));
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [isModalOpen, filtered.length]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardDemos"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "hero"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "eyebrow"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Live Demos')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('See the %s in action'), name)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Browse ready-made demos - click any card to open a live, interactive preview.'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "toolbar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "search"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_2__.searchIcon, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    value: search,
    placeholder: "Search demos\u2026",
    onChange: e => setSearch(e.target.value)
  }), search && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "searchClear",
    onClick: () => setSearch(''),
    "aria-label": "Clear search"
  }, "\xD7")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "chips",
    role: "tablist"
  }, categories.map(cat => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: cat,
    type: "button",
    role: "tab",
    "aria-selected": activeCategory === cat,
    className: `chip ${activeCategory === cat ? 'isActive' : ''}`,
    style: cat !== 'All' ? {
      '--accent': categoryAccents[cat]
    } : undefined,
    onClick: () => setActiveCategory(cat)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "chipDot"
  }), cat)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "count"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, filtered.length), " ", filtered.length === 1 ? 'demo' : 'demos', activeCategory !== 'All' && ` in ${activeCategory}`, search.trim() && ` matching "${search}"`), filtered.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "empty"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_2__.searchIcon, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "No demos found"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Try a different search or category.")) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid"
  }, filtered.map((card, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: `${card.title}-${i}`,
    type: "button",
    className: "card",
    style: card.accent ? {
      '--accent': card.accent
    } : undefined,
    onClick: () => setOpenIndex(i)
  }, card.categoryIcon && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cardIcon"
  }, 'string' === typeof card.categoryIcon ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    dangerouslySetInnerHTML: {
      __html: card.categoryIcon
    }
  }) : card.categoryIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "cardCat"
  }, card.category), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "cardTitle"
  }, card.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "cardAction"
  }, "Preview", _utils_icons__WEBPACK_IMPORTED_MODULE_2__.arrowRightIcon)))), active && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "modal",
    role: "dialog",
    "aria-modal": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "modalBackdrop",
    onClick: () => setOpenIndex(null)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "modalContent"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "modalHead"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "modalTitleWrap"
  }, active.accent && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "modalCat",
    style: {
      background: active.accent
    }
  }, active.category), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, active.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "modalProgress"
  }, openIndex + 1, " of ", filtered.length)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "modalActions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "modalOpen",
    href: active.url,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Open in new tab", _utils_icons__WEBPACK_IMPORTED_MODULE_2__.externalIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "modalClose",
    onClick: () => setOpenIndex(null),
    "aria-label": "Close demo"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_2__.closeIcon))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "modalStage"
  }, openIndex > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "modalNav modalNavPrev",
    onClick: () => setOpenIndex(openIndex - 1),
    "aria-label": "Previous demo"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_2__.chevronLeftIcon), iframeLoading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "iframeLoader"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "spinner"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "Loading demo\u2026")), active.type === 'iframe' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("iframe", {
    src: active.url,
    title: `${active.title} demo`,
    sandbox: "allow-scripts allow-same-origin allow-popups allow-forms",
    onLoad: () => setIframeLoading(false)
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "imgScroll"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: active.url,
    alt: active.title,
    onLoad: () => setIframeLoading(false)
  })), openIndex < filtered.length - 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "modalNav modalNavNext",
    onClick: () => setOpenIndex(openIndex + 1),
    "aria-label": "Next demo"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_2__.chevronRightIcon)))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Demos);

/***/ },

/***/ "../bpl-tools/Admin/Header/index.js"
/*!******************************************!*\
  !*** ../bpl-tools/Admin/Header/index.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/icons */ "../bpl-tools/Admin/utils/icons.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Header/style.scss");






/**
 * Dashboard page header — logo, plugin name, version badge, nav slot, and action buttons.
 *
 * @param {object}	props
 * @param {string}	props.name				- Plugin name displayed as <h1>
 * @param {string}	props.version				- Version string, rendered as v{version}
 * @param {boolean}	props.isPremium			- Hides "Upgrade Pro" button; switches Our Plugins to Button
 * @param {object}	[props.media]				- {logo?} — plugin logo image URL
 * @param {boolean}	[props.displayOurPlugins]	- Shows the "Our Plugins" button when true
 * @param {React.ReactNode} [props.children]		- Nav links rendered between the plugin info and action buttons
 */
const Header = props => {
  const {
    name,
    media,
    version,
    isPremium,
    displayOurPlugins,
    children
  } = props;
  const {
    logo
  } = media || {};
  const [isNavOpen, setIsNavOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // Inject 'open' class onto the nav child and close menu on link click
  const enhancedChildren = react__WEBPACK_IMPORTED_MODULE_0__.Children.map(children, child => {
    if (!(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child)) return child;
    const cls = child.props.className || '';
    if (!cls.includes('bPlDashboardNav')) return child;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(child, {
      className: `${cls}${isNavOpen ? ' open' : ''}`,
      onClick: e => {
        child.props.onClick?.(e);
        setIsNavOpen(false);
      }
    });
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardHeader"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pluginInfo",
    wrap: true
  }, logo && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: logo,
    alt: name || 'Plugin from bPlugins'
  }), name && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, name), version && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pluginVersion"
  }, "v", version)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: `bplHamburger${isNavOpen ? ' open' : ''}`,
    onClick: () => setIsNavOpen(v => !v),
    "aria-label": "Toggle navigation",
    "aria-expanded": isNavOpen
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null)), enhancedChildren, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "navButtons"
  }, displayOurPlugins && (isPremium ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "#our-plugins"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_2__.ourPluginsIcon, "Our Plugins") : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "linkButton",
    href: "#our-plugins"
  }, "Our Plugins")), !isPremium && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "upgrade",
    href: "#pricing"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_2__.upgradeProIcon, "Upgrade Pro")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ },

/***/ "../bpl-tools/Admin/OurPlugins/index.js"
/*!**********************************************!*\
  !*** ../bpl-tools/Admin/OurPlugins/index.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/OurPlugins/style.scss");

/**
	* OurPlugins Component
	*
	* @props slug (required): current plugin slug, excluded from the list (String)
	* @props slugs (optional): DEFAULT_SLUGS - override the default slug list (Array)
	* @props installedPlugins (required): injected by withSelect; locally installed plugins (Array)
	*/







const DEFAULT_SLUGS = ['3d-viewer', 'html5-video-player', 'html5-audio-player', 'pdf-poster', 'document-emberdder', 'advanced-post-block', 'advance-custom-html', 'b-carousel-block', 'b-blocks', 'embed-lottie-player', 'b-slider'];
const formatCount = num => {
  if (num === undefined || num === null) return '0';
  const abs = Math.abs(num);
  if (abs >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  if (abs >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (abs >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(num);
};
const getDisplayName = name => {
  if (!name) return '';
  const decoded = name.replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&ndash;/g, '–').replace(/&mdash;/g, '—').replace(/&#45;/g, '-');
  return decoded.split(/\s*[–\-—]\s*/)[0].trim();
};
const stripTags = s => (s || '').replace(/<[^>]+>/g, '');
const StarRow = ({
  rating = 0
}) => {
  const stars = Math.round(rating / 20);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "ourPlugStars",
    "aria-label": `${(rating / 20).toFixed(1)} out of 5`
  }, [1, 2, 3, 4, 5].map(i => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    key: i,
    viewBox: "0 0 24 24",
    width: 13,
    height: 13,
    fill: i <= stars ? '#fbbf24' : '#e5e7eb'
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12 2l2.39 6.95L22 9.27l-5.45 4.73L18.18 22 12 17.77 5.82 22l1.63-7.99L2 9.27l7.61-.32L12 2z"
  }))));
};

/**
 * Single plugin card with self-contained install/activate state.
 *
 * @param {object} props
 * @param {object} props.plugin		- Plugin data from WordPress.org API
 * @param {string} [props.path]		- Installed plugin path (e.g. 'slug/slug.php')
 * @param {string} props.initStatus	- 'notfound' | 'installed' | 'activated'
 */
const PluginCard = ({
  plugin,
  path,
  initStatus
}) => {
  const {
    name,
    slug,
    icons,
    short_description,
    version
  } = plugin;
  const [status, setStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initStatus);
  const handleInstall = async () => {
    setStatus(status === 'installed' ? 'activating' : 'installing');
    try {
      if (status === 'installed' && path) {
        await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
          path: `/wp/v2/plugins/${path}`,
          method: 'POST',
          data: {
            status: 'active'
          }
        });
        setStatus('success');
        setTimeout(() => setStatus('activated'), 1000);
        return;
      }
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: '/wp/v2/plugins',
        method: 'POST',
        data: {
          slug,
          status: 'active'
        }
      });
      setStatus('success');
      setTimeout(() => setStatus('activated'), 1000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(status === 'installed' ? 'installed' : 'notfound'), 1400);
    }
  };
  const label = (() => {
    switch (status) {
      case 'activated':
      case 'success':
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Activated');
      case 'installed':
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Activate');
      case 'activating':
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Activating…');
      case 'installing':
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Installing…');
      case 'error':
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Failed');
      default:
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Install & Activate');
    }
  })();
  const isDone = status === 'activated' || status === 'success';
  const isBusy = status === 'installing' || status === 'activating';
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", {
    className: "ourPlugCard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ourPlugCardTop"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "ourPlugIcon",
    src: icons?.['1x'] || icons?.['2x'] || '',
    alt: name
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ourPlugCardId"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    dangerouslySetInnerHTML: {
      __html: getDisplayName(name)
    }
  }), version && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "ourPlugVer"
  }, "v", version)), isDone && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "ourPlugActive"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 24 24",
    width: 12,
    height: 12,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 3,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
    points: "20 6 9 17 4 12"
  })), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Active'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "ourPlugDesc",
    dangerouslySetInnerHTML: {
      __html: stripTags(short_description)
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ourPlugStats"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "ourPlugStat"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 24 24",
    width: 14,
    height: 14,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
    points: "7 10 12 15 17 10"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
    x1: "12",
    y1: "15",
    x2: "12",
    y2: "3"
  })), formatCount(plugin.downloaded)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "ourPlugStat"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(StarRow, {
    rating: plugin.rating
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, ((plugin.rating || 0) / 20).toFixed(1)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: `ourPlugCta status-${status}`,
    disabled: isDone || isBusy,
    onClick: handleInstall
  }, isBusy && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "ourPlugCtaSpinner"
  }), label));
};

/**
 * Fetches and displays other bPlugins products with search, sort, and one-click install/activate.
 *
 * @param {string}		props.slug				- Current plugin slug — excluded from the list
 * @param {string[]}	[props.slugs]			- Override the default slug list
 * @param {Array}		props.installedPlugins	- Injected by withSelect; locally installed plugins
 */
const OurPlugins = ({
  slug,
  slugs: allSlugs = DEFAULT_SLUGS,
  installedPlugins
}) => {
  const [plugins, setPlugins] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [search, setSearch] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [sort, setSort] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('popular');
  const slugs = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => (allSlugs || []).filter(s => s !== slug), [allSlugs, slug]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!slugs.length) return;
    let cancelled = false;
    setIsLoading(true);
    fetch('https://api.wordpress.org/plugins/info/1.2/?action=query_plugins&request[author]=bplugins&request[per_page]=100&request[fields]=title,name,slug,icons,short_description,version,active_installs,rating,ratings,downloaded', {
      credentials: 'omit',
      mode: 'cors'
    }).then(r => r.json()).then(data => {
      if (cancelled) return;
      setPlugins((data?.plugins || []).filter(p => slugs.includes(p.slug)));
    }).catch(() => {
      if (!cancelled) setPlugins([]);
    }).finally(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [JSON.stringify(slugs)]);
  const filteredSorted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const q = search.trim().toLowerCase();
    let list = plugins.filter(p => !q || p.name.toLowerCase().includes(q) || (p.short_description || '').toLowerCase().includes(q));
    if (sort === 'popular') list.sort((a, b) => (b.active_installs || 0) - (a.active_installs || 0));
    if (sort === 'rating') list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sort === 'name') list.sort((a, b) => getDisplayName(a.name).localeCompare(getDisplayName(b.name)));
    return list;
  }, [plugins, search, sort]);
  if (isLoading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "bPlDashboardOurPlugins bPlDashboardOurPluginsLoading"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "ourPlugSpinner"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Fetching plugins from the WordPress directory…')));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardOurPlugins"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "ourPlugHero"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "ourPlugEyebrow"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Made by bPlugins')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Discover more plugins from our team')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hand-crafted WordPress plugins built with the same care and quality. Install any of them with a single click.'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ourPlugToolbar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ourPlugSearch"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 24 24",
    width: 18,
    height: 18,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Search plugins…'),
    value: search,
    onChange: e => setSearch(e.target.value)
  }), search && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => setSearch(''),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clear search')
  }, "\xD7")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ourPlugSortLabel"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sort by')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ourPlugSort",
    role: "tablist"
  }, [{
    key: 'popular',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Popular')
  }, {
    key: 'rating',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Top Rated')
  }, {
    key: 'name',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('A–Z')
  }].map(opt => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: opt.key,
    type: "button",
    role: "tab",
    "aria-selected": sort === opt.key,
    className: sort === opt.key ? 'isActive' : '',
    onClick: () => setSort(opt.key)
  }, opt.label)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "ourPlugCount"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, filteredSorted.length), ' ', filteredSorted.length === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('plugin') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('plugins'), search && ` ${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('matching')} "${search}"`), filteredSorted.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ourPlugEmpty"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 24 24",
    width: 36,
    height: 36,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No plugins match')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Try a different keyword.'))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ourPlugGrid"
  }, filteredSorted.map(plugin => {
    var _installedPlugins$fin;
    const installed = (_installedPlugins$fin = installedPlugins?.find(i => i?.plugin?.includes(plugin.slug))) !== null && _installedPlugins$fin !== void 0 ? _installedPlugins$fin : null;
    const activated = installed ? installed.status === 'active' : false;
    const initStatus = activated ? 'activated' : installed ? 'installed' : 'notfound';
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(PluginCard, {
      key: plugin.slug,
      plugin: plugin,
      path: installed?.plugin,
      initStatus: initStatus
    });
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.withSelect)(select => {
  const {
    getPlugins
  } = select('core');
  return {
    installedPlugins: getPlugins?.({
      per_page: -1
    })
  };
})(OurPlugins));

/***/ },

/***/ "../bpl-tools/Admin/Overview/VideoPlayer.js"
/*!**************************************************!*\
  !*** ../bpl-tools/Admin/Overview/VideoPlayer.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/icons */ "../bpl-tools/Admin/utils/icons.js");
/* harmony import */ var _utils_video__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/video */ "../bpl-tools/Admin/utils/video.js");

/**
	* VideoPlayer Component
	*
	* @props src (required): video URL (String)
	* @props width (optional): '100%' (String)
	* @props height (optional): 'auto' (String)
	* @props autoPlay (optional): false (Boolean)
	* @props muted (optional): false (Boolean)
	* @props loop (optional): false (Boolean)
	* @props poster (optional): null - poster image URL (String)
	* @props isYoutube (optional): false (Boolean)
	* @props title (optional): 'Video' - iframe title, used for YouTube sources (String)
	*/




const VideoPlayer = ({
  src,
  width = '100%',
  height = 'auto',
  autoPlay = false,
  muted = false,
  loop = false,
  poster = null,
  isYoutube = false,
  title = 'Video'
}) => {
  const videoRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const previewVideoRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const progressBarRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const volumeBarRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  // const previewCanvasRef = useRef(null)

  const [isPlaying, setIsPlaying] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [currentTime, setCurrentTime] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [duration, setDuration] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [volume, setVolume] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const [isMuted, setIsMuted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(muted);
  const [isDragging, setIsDragging] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showControls, setShowControls] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  // const [previewTime, setPreviewTime] = useState(0)
  // const [showPreview, setShowPreview] = useState(false)
  // const [previewPosition, setPreviewPosition] = useState(0)

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      // Setup preview video
      if (previewVideoRef.current) {
        previewVideoRef.current.src = src;
        previewVideoRef.current.muted = true;
      }
    };
    const handleTimeUpdate = () => {
      if (!isDragging) {
        setCurrentTime(video.currentTime);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
    };

    // keep the overlay in sync when playback is driven by autoPlay or native controls
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [isDragging, src]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleKeyDown = e => {
      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'm':
        case 'M':
          toggleMute();
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };
  const handleProgressClick = e => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const progress = (e.clientX - rect.left) / rect.width;
    const time = progress * duration;
    videoRef.current.currentTime = Math.max(0, Math.min(time, duration));
    setCurrentTime(time);
  };
  const handleProgressMouseDown = e => {
    setIsDragging(true);
    handleProgressClick(e);
  };

  // const handleProgressMouseMove = (e) => {
  //	if (!progressBarRef.current || !duration) return

  //	const rect = progressBarRef.current.getBoundingClientRect()
  //	const progress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
  //	const time = progress * duration
  //	const position = (e.clientX - rect.left)

  //	setPreviewTime(time)
  //	setPreviewPosition(position)
  //	setShowPreview(true)

  //	// Update preview video time
  //	if (previewVideoRef.current && previewVideoRef.current.readyState >= 2) {
  //	previewVideoRef.current.currentTime = time
  //	}
  // }

  // const handleProgressMouseEnter = () => {
  //	setShowPreview(true)
  // }

  // const handleProgressMouseLeave = () => {
  //	setShowPreview(false)
  // }

  const handleVolumeClick = e => {
    const rect = volumeBarRef.current.getBoundingClientRect();
    const newVolume = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    if (newVolume > 0) {
      setIsMuted(false);
      videoRef.current.muted = false;
    }
  };
  const handleVolumeMouseDown = e => {
    setIsDragging(true);
    handleVolumeClick(e);
  };
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  const progressPercentage = duration ? currentTime / duration * 100 : 0;
  const volumePercentage = volume * 100;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleMouseMove = e => {
      if (isDragging) {
        if (e.target.closest('.progress-bar')) {
          handleProgressClick(e);
        } else if (e.target.closest('.volume-bar')) {
          handleVolumeClick(e);
        }
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: containerRef,
    className: "bPlVideoPlayer",
    style: {
      width,
      height
    },
    onMouseEnter: () => setShowControls(true),
    onMouseLeave: () => setShowControls(!isPlaying)
  }, isYoutube ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlVideoPlayerYoutube"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("iframe", {
    src: (0,_utils_video__WEBPACK_IMPORTED_MODULE_2__.getYoutubeEmbedSrc)(src, {
      autoplay: autoPlay
    }),
    frameBorder: "0",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    allowFullScreen: true,
    style: {
      width,
      height
    },
    title: title
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
    ref: videoRef,
    className: "video-element",
    src: src,
    poster: poster,
    autoPlay: autoPlay,
    muted: muted,
    loop: loop,
    onClick: togglePlay,
    preload: "metadata"
  }, "Your browser does not support the video tag."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
    ref: previewVideoRef,
    className: "preview-video",
    muted: true,
    preload: "metadata",
    style: {
      display: 'none'
    }
  }), !isPlaying && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "center-play-btn",
    onClick: togglePlay
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "play-icon"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_1__.playFillIcon)), isPlaying && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "center-play-btn pause",
    onClick: togglePlay
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "play-icon"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_1__.pauseFillIcon)), isLoading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "loading-spinner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "spinner"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `video-controls ${showControls ? 'visible' : ''}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "control-btn play-pause-btn",
    onClick: togglePlay
  }, isPlaying ? _utils_icons__WEBPACK_IMPORTED_MODULE_1__.playPauseIcon : _utils_icons__WEBPACK_IMPORTED_MODULE_1__.playIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "time-display"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "current-time"
  }, formatTime(currentTime)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "separator"
  }, "/"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "duration"
  }, formatTime(duration))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "progress-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: progressBarRef,
    className: "progress-bar",
    onClick: handleProgressClick,
    onMouseDown: handleProgressMouseDown
    // onMouseMove={handleProgressMouseMove}
    // onMouseEnter={handleProgressMouseEnter}
    // onMouseLeave={handleProgressMouseLeave}
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "progress-filled",
    style: {
      width: `${progressPercentage}%`
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "progress-handle",
    style: {
      left: `${progressPercentage}%`
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "volume-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "control-btn volume-btn",
    onClick: toggleMute
  }, isMuted || volume === 0 ? _utils_icons__WEBPACK_IMPORTED_MODULE_1__.volumeMutedIcon : _utils_icons__WEBPACK_IMPORTED_MODULE_1__.volumeOnIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "volume-slider"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: volumeBarRef,
    className: "volume-bar",
    onClick: handleVolumeClick,
    onMouseDown: handleVolumeMouseDown
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "volume-filled",
    style: {
      width: `${volumePercentage}%`
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "volume-handle",
    style: {
      left: `${volumePercentage}%`
    }
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "control-btn fullscreen-btn",
    onClick: toggleFullscreen
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_1__.fullscreenIcon))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VideoPlayer);

/***/ },

/***/ "../bpl-tools/Admin/Settings/index.js"
/*!********************************************!*\
  !*** ../bpl-tools/Admin/Settings/index.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_useWPAjax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useWPAjax */ "../bpl-tools/hooks/useWPAjax.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Settings/style.scss");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/icons */ "../bpl-tools/Admin/utils/icons.js");







/**
 * Uninstall-data management page — toggle to permanently delete plugin data on uninstall.
 * Requires a PHP AJAX handler whose action name matches `ajaxAction`.
 *
 * @param {object}	props
 * @param {string} props.name					- Plugin name shown in description text
 * @param {boolean} props.deleteDataOnUninstall - Current setting value (from PHP option)
 * @param {string} props.uninstallNonce			- wp_create_nonce('bPlLicenseActivation')
 * @param {string} props.ajaxAction				- WP Ajax action to call on toggle (e.g. 'apbSaveUninstallOption')
 * @param {string} [props.version]				- Plugin version shown in the status strip
 * @param {string[]} [props.cleanupItems]		- Overrides default list of items deleted on uninstall
 */
const Settings = ({
  name,
  deleteDataOnUninstall,
  uninstallNonce,
  version,
  ajaxAction = '',
  cleanupItems
}) => {
  const [enabled, setEnabled] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(deleteDataOnUninstall);
  const [notice, setNotice] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [showConfirm, setShowConfirm] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [confirmInput, setConfirmInput] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const {
    data,
    saveData,
    isLoading,
    error
  } = (0,_hooks_useWPAjax__WEBPACK_IMPORTED_MODULE_2__["default"])(ajaxAction, {
    nonce: uninstallNonce
  }, false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (data) {
      setEnabled(data.enabled);
      setNotice(data.message || '');
      const t = setTimeout(() => setNotice(''), 4000);
      return () => clearTimeout(t);
    }
  }, [data]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (error) setNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to save setting.'));
  }, [error]);
  const defaultCleanupItems = [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('All plugin posts and custom post types'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Plugin settings and options'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Layout configuration and meta data'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Taxonomy terms and associations'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('All tracking and analytics data')];
  const items = cleanupItems || defaultCleanupItems;
  const requestToggle = () => {
    if (isLoading) return;
    if (!enabled) {
      setConfirmInput('');
      setShowConfirm(true);
      return;
    }
    setNotice('');
    saveData({
      enabled: String(false)
    });
  };
  const confirmEnable = () => {
    if (confirmInput.trim().toUpperCase() !== 'DELETE') return;
    setShowConfirm(false);
    setNotice('');
    saveData({
      enabled: String(true)
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardSettings"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "settingsHero"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "settingsEyebrow"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Settings')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Manage plugin preferences')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(`Control how ${name} behaves on your site. Destructive options live in their own clearly-marked zone.`))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "settingsStatus"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settingsStatusIcon"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_4__.shieldIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settingsStatusBody"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, enabled ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Data deletion is enabled') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Your data is protected')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, enabled ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('All plugin data will be permanently removed if the plugin is uninstalled.') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Even if you deactivate or uninstall the plugin, your settings and data stay intact.'))), version && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "settingsVer"
  }, "v", version)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: `settingsCard dangerZone ${enabled ? 'isArmed' : ''}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "settingsCardHead"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dangerBadge"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_4__.alertIcon, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Danger Zone')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Delete plugin data on uninstall')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(`When enabled, every piece of ${name} data is wiped from your database the moment the plugin is uninstalled.`)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settingsCardBody"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "cleanupLabel"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('What will be permanently deleted:')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "cleanupList"
  }, items.map((item, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: i
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "cleanupDot"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_4__.trashIcon), item))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settingsWarn"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_4__.alertIcon, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('This action cannot be undone. Deactivating the plugin alone is non-destructive — your data is only deleted when you also click "Delete" on the plugins screen.')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("footer", {
    className: "settingsCardFoot"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "toggleRow"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "settingsToggle"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "checkbox",
    checked: !!enabled,
    onChange: requestToggle,
    disabled: isLoading,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Toggle data deletion on uninstall')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "toggleSlider"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "toggleLabel"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, enabled ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Deletion is ON') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Deletion is OFF')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, enabled ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Data will be removed on uninstall') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Data will be preserved on uninstall')))), isLoading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "settingsSaving"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Saving…')))), notice && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `settingsToast ${enabled ? 'warning' : 'success'}`,
    role: "status"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_4__.checkCircleIcon, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, notice), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => setNotice(''),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Dismiss')
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_4__.closeIcon)), showConfirm && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settingsConfirmModal",
    role: "dialog",
    "aria-modal": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "confirmBackdrop",
    onClick: () => setShowConfirm(false)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "confirmContent"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "confirmIcon"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_4__.trashIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enable data deletion on uninstall?')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "confirmClose",
    onClick: () => setShowConfirm(false),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Close')
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_4__.closeIcon)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "confirmBody"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Switching this on means that the next time this plugin is uninstalled, all data, configurations, and settings will be permanently removed from your database.')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "confirmCallout"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_4__.alertIcon, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('There is no recovery once data is deleted. Make sure you have a recent backup.'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "confirmField"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Type'), " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", null, "DELETE"), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('to confirm')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    value: confirmInput,
    onChange: e => setConfirmInput(e.target.value),
    placeholder: "DELETE",
    autoFocus: true
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("footer", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "confirmCancel",
    onClick: () => setShowConfirm(false)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "confirmAction",
    onClick: confirmEnable,
    disabled: confirmInput.trim().toUpperCase() !== 'DELETE'
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_4__.trashIcon, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enable deletion'))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Settings);

/***/ },

/***/ "../bpl-tools/Admin/Welcome/Changelog/index.js"
/*!*****************************************************!*\
  !*** ../bpl-tools/Admin/Welcome/Changelog/index.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Welcome/Changelog/style.scss");

/**
	* Changelog Component
	*
	* @props slug (required): WordPress.org slug - builds the read-more link (String)
	* @props changelogs (required): [{type, version, list}] changelog entries (Array)
	* @props limit (optional): 5 - max entries shown (Number)
	* @props loadMoreLabel (optional): read-more button text; omit to hide (String)
	*/



const BADGE_MAP = {
  new: 'new',
  add: 'new',
  update: 'update',
  improve: 'improvement',
  improvement: 'improvement',
  fix: 'fix',
  fixing: 'fix',
  fixed: 'fix',
  remove: 'fix'
};
const processItem = html => html.replace(/^<strong>([^<]+)<\/strong>/i, (_, label) => {
  const clean = label.replace(':', '').trim();
  const cls = BADGE_MAP[clean.toLowerCase()] || 'default';
  return `<strong class="changelogBadge ${cls}">${clean}</strong>`;
});
const Changelog = props => {
  const {
    slug,
    changelogs,
    limit = 5,
    loadMoreLabel
  } = props;
  return changelogs?.length && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardChangelog bPlDashboardCard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Release Notes(Changelog)..."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "allChangelogs"
  }, changelogs?.slice(0, limit)?.map((changelog, index) => {
    const {
      type,
      version,
      list
    } = changelog;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      className: `changelog ${type}`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
      className: "list"
    }, list?.map((item, token) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: token,
      dangerouslySetInnerHTML: {
        __html: processItem(item)
      }
    }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "time"
    }, version));
  })), loadMoreLabel && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "mt20",
    target: "_blank",
    rel: "noopener noreferrer",
    href: `https://wordpress.org/plugins/${slug}/#developers`
  }, loadMoreLabel)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Changelog);

/***/ },

/***/ "../bpl-tools/Admin/Welcome/GettingStarted/index.js"
/*!**********************************************************!*\
  !*** ../bpl-tools/Admin/Welcome/GettingStarted/index.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Overview_VideoPlayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Overview/VideoPlayer */ "../bpl-tools/Admin/Overview/VideoPlayer.js");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/icons */ "../bpl-tools/Admin/utils/icons.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Welcome/GettingStarted/style.scss");







/**
 * Tabbed getting-started guide. Renders tab buttons and a sliding step list.
 *
 * @param {object}		props
 * @param {object[]}	props.tabs		- Tab definitions: [{key, label, icon?, video?, isYoutube?, docs?, steps: [{num, title, body, link?: {url, label}}]}]
 * `body` is rendered as HTML via dangerouslySetInnerHTML.
 * A tab with `video` gets a "Watch Video" button that slides in next to the docs link and opens the video in a modal.
 * A tab with `docs` overrides the bottom documentation link with its own tab-specific URL and heading.
 * @param {object}		[props.pages]	- {docs?} — URL for the "Open Documentation" link at the bottom
 */
const GettingStarted = ({
  tabs = [],
  pages
}) => {
  const [active, setActive] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [direction, setDirection] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1); // 1 = moved right, -1 = moved left
  const [showVideo, setShowVideo] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  if (!tabs?.length) return null;
  const activeTab = tabs[active] || {};
  const {
    video,
    docs: tabDocs,
    label
  } = activeTab;
  const docsUrl = tabDocs || pages?.docs || 'https://bplugins.com/docs/';
  const changeTab = index => {
    if (index === active) return;
    setShowVideo(false);
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardGettingStarted bPlDashboardCard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Getting Started')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pick how you\'d like to start with the plugin - the steps below adapt to your workflow.'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tabsNav",
    role: "tablist"
  }, tabs.map((tab, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: tab.key,
    type: "button",
    role: "tab",
    "aria-selected": active === index,
    className: `tab ${active === index ? 'isActive' : ''}`,
    onClick: () => changeTab(index)
  }, tab.icon && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tabIcon"
  }, tab.icon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, tab.label)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tabsViewport"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tabsTrack",
    style: {
      transform: `translateX(-${active * 100}%)`
    }
  }, tabs.map(tab => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: tab.key,
    className: "tabPanel",
    role: "tabpanel",
    "aria-hidden": tabs[active].key !== tab.key
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "steps"
  }, tab.steps.map(step => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: step.num,
    className: "step"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "stepNum"
  }, step.num), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "stepBody"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, step.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    dangerouslySetInnerHTML: {
      __html: step.body
    }
  }), step.link && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "stepLink",
    href: step.link.url
  }, step.link.label, " \u2192"))))))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "docs"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, tabDocs ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Read the %s Documentation'), label) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Read the Full Documentation')), !tabDocs && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Browse guides, settings reference, and examples for every feature.'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "docsActions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "docsBtn",
    href: docsUrl,
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Read Documentation →')), video && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: activeTab.key,
    type: "button",
    className: `videoBtn ${direction > 0 ? 'fromRight' : 'fromLeft'}`,
    onClick: () => setShowVideo(true),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Watch Tutorial')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 668 534"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    fill: "#ff0333",
    d: "m544.3 7.3c-63-4.6-134-7-210.3-7-76.3 0-147.3 2.4-210.3 7-16.6 1.3-32.8 5.7-47.8 13-15 7.2-28.5 17.2-39.8 29.4-11.3 12.3-20.2 26.5-26.3 42-6 15.5-9.1 32-9.1 48.6v253.4c-0.1 16.6 3 33.2 9 48.7 6.1 15.6 15 29.8 26.3 42.1 11.3 12.2 24.8 22.3 39.8 29.5 15 7.3 31.2 11.7 47.9 13 63 4.7 133.3 7 210.3 7 77 0 147.3-2.3 210.3-7 16.7-1.3 32.9-5.7 47.9-13 15-7.2 28.5-17.3 39.8-29.5 11.3-12.3 20.2-26.5 26.3-42.1 6-15.5 9.1-32.1 9-48.7v-253.4c0-16.6-3.1-33.1-9.1-48.6-6.1-15.5-15-29.7-26.3-42-11.3-12.2-24.8-22.2-39.8-29.4-15-7.3-31.2-11.7-47.8-13z"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    fill: "#fff",
    d: "m267.3 196.3v141.4c0 2.9 0.8 5.9 2.3 8.4 1.5 2.6 3.6 4.7 6.2 6.2 2.6 1.4 5.5 2.2 8.5 2.1 2.9 0 5.8-0.9 8.4-2.4l117.6-70.7c2.4-1.5 4.4-3.6 5.8-6.1 1.4-2.5 2.1-5.3 2.1-8.2 0-2.9-0.7-5.7-2.1-8.2-1.4-2.5-3.4-4.6-5.8-6.1l-117.6-70.7c-2.6-1.5-5.5-2.4-8.4-2.4-3-0.1-5.9 0.7-8.5 2.1-2.6 1.5-4.7 3.6-6.2 6.2-1.5 2.5-2.3 5.5-2.3 8.4z"
  })), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Watch Tutorial')))), showVideo && video && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlVideoModal"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlVideoModalContent"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "closeModal",
    onClick: () => setShowVideo(false)
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_3__.closeIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Overview_VideoPlayer__WEBPACK_IMPORTED_MODULE_2__["default"], {
    src: video,
    isYoutube: true,
    autoPlay: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlVideoModalOverlay",
    onClick: () => setShowVideo(false)
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GettingStarted);

/***/ },

/***/ "../bpl-tools/Admin/Welcome/Info/index.js"
/*!************************************************!*\
  !*** ../bpl-tools/Admin/Welcome/Info/index.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/icons */ "../bpl-tools/Admin/utils/icons.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Welcome/Info/style.scss");

/**
	* Info Component
	*
	* @props slug (required): plugin slug - builds the review link (String)
	* @props pages (required): pages config (Object)
	* @props helpItems (optional): override default help cards; each {image?, titleIcon?, title, description, link, linkText} (Array)
	*/




const defaultHelpItems = (slug, pages) => [{
  title: 'Need any Assistance?',
  description: 'Our Expert Support Team is always ready to help you out promptly.',
  link: 'https://bplugins.com/support/',
  linkText: 'Contact Support'
}, {
  titleIcon: _utils_icons__WEBPACK_IMPORTED_MODULE_2__.facebookIcon,
  title: 'Join Our Community',
  description: 'Get tutorials, plugin updates, feature announcements, and support from other WordPress users.',
  link: 'https://facebook.com/groups/1828495198556137',
  linkText: 'Join Now →'
}, {
  title: 'Request a Feature',
  description: 'Have an idea that would make this plugin even better? Let us know — we love hearing from you.',
  link: 'https://bplugins.com/support/',
  linkText: 'Submit Request →'
}, {
  title: 'Loving This Plugin? ⭐',
  description: "We're a small team pouring our heart into this plugin — your honest review keeps us going and helps others discover it. It only takes 30 seconds.",
  link: slug ? `https://wordpress.org/support/plugin/${slug}/reviews/#new-post` : '',
  linkText: 'Leave a Review'
}];
const Info = ({
  slug,
  pages,
  helpItems
}) => {
  const items = helpItems || defaultHelpItems(slug, pages);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardWelcomeInfo"
  }, items.filter(item => item.link).map((item, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "infoCard bPlDashboardCard"
  }, item.image && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("figure", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.image,
    alt: item.title
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, item.title, item.titleIcon && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "titleIcon"
  }, item.titleIcon)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.description), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: item.link,
    target: "_blank",
    rel: "noopener noreferrer"
  }, item.linkText))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Info);

/***/ },

/***/ "../bpl-tools/Admin/Welcome/Overview/index.js"
/*!****************************************************!*\
  !*** ../bpl-tools/Admin/Welcome/Overview/index.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _Overview_VideoPlayer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Overview/VideoPlayer */ "../bpl-tools/Admin/Overview/VideoPlayer.js");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/icons */ "../bpl-tools/Admin/utils/icons.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Welcome/Overview/style.scss");

/**
	* Overview Component
	*
	* @props name (required): plugin name (String)
	* @props version (required): plugin version (String)
	* @props description (required): tagline text (String)
	* @props isPremium (required): whether the plugin is premium (Boolean)
	* @props media (required): {thumbnail?, video?, isYoutube?} (Object)
	* @props pages (required): {landing?} - enables "View Demos" button (Object)
	* @props startButton (required): {label, url} - primary CTA button (Object)
	* @props keywords (required): chip labels shown below the tagline (Array)
	* @props keywordsLabel (required): label before keyword chips (String)
	* @props currentUser (required): injected by withSelect from the WP core store (Object)
	*/








const Overview = props => {
  const {
    name,
    version,
    description,
    isPremium,
    media,
    pages,
    startButton,
    currentUser,
    keywords,
    keywordsLabel
  } = props;
  const {
    thumbnail,
    video,
    isYoutube
  } = media || {};
  const [showVideo, setShowVideo] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const firstName = currentUser?.name ? currentUser.name.split(/\s+/)[0] : '';
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardWelcomeOverview bPlDashboardCard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "statusRow"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "activeStatus"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "statusDot",
    "aria-hidden": "true"
  }), "Plugin active"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `planBadge ${isPremium ? 'isPro' : 'isFree'}`
  }, isPremium && _utils_icons__WEBPACK_IMPORTED_MODULE_5__.crownIcon, isPremium ? 'Pro Plan' : 'Free Plan'), version && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "versionBadge"
  }, "v", version)), name && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Welcome to ", name), description && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "tagline"
  }, firstName ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "Hi ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, firstName), ", ", description) : description), thumbnail && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "banner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: thumbnail,
    alt: name
  }), video && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "playBtn",
    onClick: () => setShowVideo(true),
    "aria-label": "Play product walkthrough"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_5__.playIcon), video && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "bannerCaption"
  }, "Watch quick start \xB7 2 min")), keywords?.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "keywords"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "keywordsLabel"
  }, keywordsLabel), keywords.map(f => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    key: f,
    className: "formatChip"
  }, f))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "actionButtons"
  }, startButton?.url && startButton?.label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "primaryBtn",
    href: startButton.url,
    target: "_blank",
    rel: "noopener noreferrer"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_5__.plusIcon, startButton.label), pages?.docs && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "secondaryBtn",
    href: pages.docs,
    target: "_blank",
    rel: "noopener noreferrer"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_5__.questionIcon, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Read Documentation')), pages?.landing && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "secondaryBtn",
    href: pages.landing,
    target: "_blank",
    rel: "noopener noreferrer"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_5__.gridIcon, "View Demos"), !isPremium && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "ghostBtn",
    href: "#pricing"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_5__.crownIcon, "Upgrade to Pro", _utils_icons__WEBPACK_IMPORTED_MODULE_5__.arrowRightIcon)), showVideo && video && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlVideoModal"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlVideoModalContent"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "closeModal",
    onClick: () => setShowVideo(false),
    "aria-label": "Close video"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_5__.closeIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Overview_VideoPlayer__WEBPACK_IMPORTED_MODULE_4__["default"], {
    key: video,
    src: video,
    isYoutube: isYoutube,
    autoPlay: true,
    title: `${name} walkthrough`
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlVideoModalOverlay",
    onClick: () => setShowVideo(false)
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.withSelect)(select => ({
  currentUser: select('core').getCurrentUser?.()
}))(Overview));

/***/ },

/***/ "../bpl-tools/Admin/Welcome/ProAds/index.js"
/*!**************************************************!*\
  !*** ../bpl-tools/Admin/Welcome/ProAds/index.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/icons */ "../bpl-tools/Admin/utils/icons.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Welcome/ProAds/style.scss");





/**
 * ProAds — upgrade prompt shown to free users on the Welcome page.
 *
 * @param {object}		props
 * @param {string}		props.name
 * @param {object}		props.media			- {proThumbnail}
 * @param {string[]}	props.proFeatures
 */
const ProAds = props => {
  const {
    name,
    media,
    proFeatures
  } = props;
  const {
    proThumbnail
  } = media || {};
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardWelcomeProAds bPlDashboardCard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Go ", name, " Pro & Unlock More!"), proFeatures?.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, proFeatures.map((f, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: i
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, _utils_icons__WEBPACK_IMPORTED_MODULE_2__.checkIcon), f))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "#pricing"
  }, "View Pricing Plan")), proThumbnail && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("figure", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: proThumbnail,
    alt: `${name} Pro features`
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProAds);

/***/ },

/***/ "../bpl-tools/Admin/Welcome/index.js"
/*!*******************************************!*\
  !*** ../bpl-tools/Admin/Welcome/index.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Changelog: () => (/* reexport safe */ _Changelog__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   GettingStarted: () => (/* reexport safe */ _GettingStarted__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   Info: () => (/* reexport safe */ _Info__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   Overview: () => (/* reexport safe */ _Overview__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   ProAds: () => (/* reexport safe */ _ProAds__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Welcome/style.scss");
/* harmony import */ var _Overview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Overview */ "../bpl-tools/Admin/Welcome/Overview/index.js");
/* harmony import */ var _GettingStarted__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GettingStarted */ "../bpl-tools/Admin/Welcome/GettingStarted/index.js");
/* harmony import */ var _ProAds__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ProAds */ "../bpl-tools/Admin/Welcome/ProAds/index.js");
/* harmony import */ var _Changelog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Changelog */ "../bpl-tools/Admin/Welcome/Changelog/index.js");
/* harmony import */ var _Info__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Info */ "../bpl-tools/Admin/Welcome/Info/index.js");








/**
 * Full Welcome page — composes Overview, GettingStarted, Changelog, ProAds, and Info.
 *
 * Spread both `dashboardInfo` and `welcomeInfo(adminUrl)` as props:
 *	<Welcome {...props} {...welcomeInfo(adminUrl)} />
 *
 * @param {object}		props
 * @param {string}		props.name
 * @param {string}		props.version
 * @param {string}		props.description
 * @param {boolean}		props.isPremium
 * @param {string}		props.slug						- WordPress.org slug (for review link)
 * @param {object}		props.media						- {logo, thumbnail, proThumbnail?, video?, isYoutube?}
 * @param {object}		props.pages						- {org?, docs?, pricing?, landing?}
 * @param {object}		[props.startButton]				- {label, url}
 * @param {string[]}	[props.keywords]				- Chip labels in the hero card (e.g. ['Grid', 'Masonry'])
 * @param {string}		[props.keywordsLabel]			- Label before keyword chips (e.g. 'Layouts')
 * @param {object}		[props.gettingStarted]			- {tabs: [{key, label, icon?, video?, isYoutube?, videoLabel?, steps}]} — omit to hide
 * @param {object[]}	[props.changelogs]				- [{version, type, list}] — omit to hide Changelog panel
 * @param {number}		[props.changelogsLimit]			- Max entries shown initially (default 5)
 * @param {string}		[props.changelogsReadMoreLabel]	- "Read more" button text; omit to hide
 * @param {string[]}	[props.proFeatures]				- Pro feature bullets shown in ProAds (free users only)
 * @param {object[]}	[props.helpItems]				- Override Info panel cards
 */
const Welcome = props => {
  const {
    isPremium,
    gettingStarted,
    pages,
    changelogsLimit,
    changelogsReadMoreLabel
  } = props;
  const hasTabs = gettingStarted?.tabs?.length > 0;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardWelcome"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `heroRow ${hasTabs ? '' : 'singleCol'}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Overview__WEBPACK_IMPORTED_MODULE_2__["default"], {
    ...props
  }), hasTabs && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GettingStarted__WEBPACK_IMPORTED_MODULE_3__["default"], {
    ...gettingStarted,
    pages: pages
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "contentRow"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Changelog__WEBPACK_IMPORTED_MODULE_5__["default"], {
    ...props,
    limit: changelogsLimit,
    loadMoreLabel: changelogsReadMoreLabel
  }), !isPremium ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ProAds__WEBPACK_IMPORTED_MODULE_4__["default"], {
    ...props
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Info__WEBPACK_IMPORTED_MODULE_6__["default"], {
    ...props
  })), !isPremium && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Info__WEBPACK_IMPORTED_MODULE_6__["default"], {
    ...props
  }));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Welcome);

/***/ },

/***/ "../bpl-tools/Admin/utils/icons.js"
/*!*****************************************!*\
  !*** ../bpl-tools/Admin/utils/icons.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   alertIcon: () => (/* binding */ alertIcon),
/* harmony export */   angelDownIcon: () => (/* binding */ angelDownIcon),
/* harmony export */   arrowRightIcon: () => (/* binding */ arrowRightIcon),
/* harmony export */   chatIcon: () => (/* binding */ chatIcon),
/* harmony export */   checkCircleIcon: () => (/* binding */ checkCircleIcon),
/* harmony export */   checkIcon: () => (/* binding */ checkIcon),
/* harmony export */   chevronDownIcon: () => (/* binding */ chevronDownIcon),
/* harmony export */   chevronLeftIcon: () => (/* binding */ chevronLeftIcon),
/* harmony export */   chevronRightIcon: () => (/* binding */ chevronRightIcon),
/* harmony export */   circleCheckIcon: () => (/* binding */ circleCheckIcon),
/* harmony export */   closeIcon: () => (/* binding */ closeIcon),
/* harmony export */   copyIcon: () => (/* binding */ copyIcon),
/* harmony export */   crownIcon: () => (/* binding */ crownIcon),
/* harmony export */   defaultIcon: () => (/* binding */ defaultIcon),
/* harmony export */   externalIcon: () => (/* binding */ externalIcon),
/* harmony export */   facebookIcon: () => (/* binding */ facebookIcon),
/* harmony export */   fullscreenIcon: () => (/* binding */ fullscreenIcon),
/* harmony export */   gridIcon: () => (/* binding */ gridIcon),
/* harmony export */   hideLicenseIcon: () => (/* binding */ hideLicenseIcon),
/* harmony export */   infoIcon: () => (/* binding */ infoIcon),
/* harmony export */   keyIcon: () => (/* binding */ keyIcon),
/* harmony export */   linkIcon: () => (/* binding */ linkIcon),
/* harmony export */   lockIcon: () => (/* binding */ lockIcon),
/* harmony export */   moneyBackIcon: () => (/* binding */ moneyBackIcon),
/* harmony export */   ourPluginsIcon: () => (/* binding */ ourPluginsIcon),
/* harmony export */   pauseFillIcon: () => (/* binding */ pauseFillIcon),
/* harmony export */   playFillIcon: () => (/* binding */ playFillIcon),
/* harmony export */   playIcon: () => (/* binding */ playIcon),
/* harmony export */   playPauseIcon: () => (/* binding */ playPauseIcon),
/* harmony export */   pluginIcon: () => (/* binding */ pluginIcon),
/* harmony export */   plusIcon: () => (/* binding */ plusIcon),
/* harmony export */   questionIcon: () => (/* binding */ questionIcon),
/* harmony export */   ratingIcon: () => (/* binding */ ratingIcon),
/* harmony export */   refreshIcon: () => (/* binding */ refreshIcon),
/* harmony export */   searchAltIcon: () => (/* binding */ searchAltIcon),
/* harmony export */   searchIcon: () => (/* binding */ searchIcon),
/* harmony export */   shieldIcon: () => (/* binding */ shieldIcon),
/* harmony export */   showLicenseIcon: () => (/* binding */ showLicenseIcon),
/* harmony export */   trashIcon: () => (/* binding */ trashIcon),
/* harmony export */   upgradeProIcon: () => (/* binding */ upgradeProIcon),
/* harmony export */   volumeMutedIcon: () => (/* binding */ volumeMutedIcon),
/* harmony export */   volumeOnIcon: () => (/* binding */ volumeOnIcon),
/* harmony export */   warningIcon: () => (/* binding */ warningIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const trashIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "3 6 5 6 21 6"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "10",
  y1: "11",
  x2: "10",
  y2: "17"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "14",
  y1: "11",
  x2: "14",
  y2: "17"
}));
const alertIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "12",
  y1: "9",
  x2: "12",
  y2: "13"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "12",
  y1: "17",
  x2: "12.01",
  y2: "17"
}));
const shieldIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "9 12 11 14 15 10"
}));
const checkCircleIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "20 6 9 17 4 12"
}));
const closeIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
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
const searchIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "11",
  cy: "11",
  r: "7"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "21",
  y1: "21",
  x2: "16.65",
  y2: "16.65"
}));
const searchAltIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"
}));
const externalIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
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
const arrowRightIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "5",
  y1: "12",
  x2: "19",
  y2: "12"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "12 5 19 12 12 19"
}));
const chevronLeftIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "15 18 9 12 15 6"
}));
const chevronRightIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "9 18 15 12 9 6"
}));
const defaultIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
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
  x: "3",
  y: "14",
  width: "7",
  height: "7",
  rx: "1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "14",
  y: "14",
  width: "7",
  height: "7",
  rx: "1"
}));
const gridIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
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
  x: "3",
  y: "14",
  width: "7",
  height: "7",
  rx: "1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "14",
  y: "14",
  width: "7",
  height: "7",
  rx: "1"
}));
const crownIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3 17l3-9 4 5 2-7 2 7 4-5 3 9"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "3",
  y1: "21",
  x2: "21",
  y2: "21"
}));
const plusIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "12",
  y1: "5",
  x2: "12",
  y2: "19"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "5",
  y1: "12",
  x2: "19",
  y2: "12"
}));
const ourPluginsIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M224 32C241.7 32 256 46.3 256 64L256 160L384 160L384 64C384 46.3 398.3 32 416 32C433.7 32 448 46.3 448 64L448 160L512 160C529.7 160 544 174.3 544 192C544 209.7 529.7 224 512 224L512 288C512 383.1 442.8 462.1 352 477.3L352 544C352 561.7 337.7 576 320 576C302.3 576 288 561.7 288 544L288 477.3C197.2 462.1 128 383.1 128 288L128 224C110.3 224 96 209.7 96 192C96 174.3 110.3 160 128 160L192 160L192 64C192 46.3 206.3 32 224 32z"
}));
const upgradeProIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 11 13",
  stroke: "currentColor",
  strokeLinecap: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M2.5 5.16931V3.16931C2.49936 2.5198 2.73579 1.89239 3.16492 1.40483C3.59404 0.917267 4.18636 0.603088 4.8307 0.521257C5.47503 0.439426 6.12708 0.595571 6.66446 0.960383C7.20184 1.3252 7.5876 1.87359 7.74933 2.50264M5.16667 8.50264C5.34348 8.50264 5.51305 8.43241 5.63807 8.30738C5.76309 8.18236 5.83333 8.01279 5.83333 7.83598C5.83333 7.65917 5.76309 7.4896 5.63807 7.36457C5.51305 7.23955 5.34348 7.16931 5.16667 7.16931C4.98986 7.16931 4.82029 7.23955 4.69526 7.36457C4.57024 7.4896 4.5 7.65917 4.5 7.83598C4.5 8.01279 4.57024 8.18236 4.69526 8.30738C4.82029 8.43241 4.98986 8.50264 5.16667 8.50264ZM5.16667 8.50264V10.5026M1.56667 5.16931H8.76667C9.35333 5.16931 9.83333 5.64931 9.83333 6.23598V10.9026C9.83333 11.7826 9.11333 12.5026 8.23333 12.5026H2.1C1.22 12.5026 0.5 11.7826 0.5 10.9026V6.23598C0.5 5.64931 0.98 5.16931 1.56667 5.16931Z"
}));
const ratingIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z"
}));
const facebookIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 292 512",
  fill: "#1877F2"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "m66 299.3v212.7h116v-212.7h86.5l18-97.8h-104.5v-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 0.4 37 1.2v-88.7c-14.3-3.9-49.3-7.9-69.5-7.9-106.9 0-156.2 50.5-156.2 159.4v42.1h-66v97.8z"
}));
const angelDownIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  className: "angelDown",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z"
}));
const warningIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 384C302.3 384 288 398.3 288 416C288 433.7 302.3 448 320 448C337.7 448 352 433.7 352 416C352 398.3 337.7 384 320 384zM320 192C301.8 192 287.3 207.5 288.6 225.7L296 329.7C296.9 342.3 307.4 352 319.9 352C332.5 352 342.9 342.3 343.8 329.7L351.2 225.7C352.5 207.5 338.1 192 319.8 192z"
}));
const playFillIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M8 5v14l11-7z"
}));
const pauseFillIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  className: "video-player-pause-icon",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 320 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"
}));
const playPauseIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z"
}));
const volumeMutedIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
}));
const volumeOnIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
}));
const fullscreenIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
}));
const playIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"
}));
const showLicenseIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3 3L21 21",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M10.5 10.677a2 2 0 002.823 2.823",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M7.362 7.561C5.68 8.74 4.279 10.42 3 12c1.889 2.991 5.282 6 9 6 1.55 0 3.043-.523 4.395-1.35M12 6c4.008 0 6.701 3.158 9 6a15.66 15.66 0 01-1.078 1.5",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round"
}));
const hideLicenseIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M12 5C7.52 5 3.73 7.61 1 12c2.73 4.39 6.52 7 11 7s8.27-2.61 11-7c-2.73-4.39-6.52-7-11-7z",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "12",
  cy: "12",
  r: "3",
  stroke: "currentColor",
  strokeWidth: "2"
}));
const pluginIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M8 12a4 4 0 100-8 4 4 0 000 8zm8 8a4 4 0 100-8 4 4 0 000 8zm-8 0a4 4 0 100-8 4 4 0 000 8z"
}));
const linkIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
}));
const questionIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "12",
  y1: "17",
  x2: "12.01",
  y2: "17"
}));
const circleCheckIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M22 11.08V12a10 10 0 11-5.93-9.14"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "22 4 12 14.01 9 11.01"
}));
const checkIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  className: "check",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 -960 960 960"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"
}));
const chevronDownIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "6 9 12 15 18 9"
}));
const moneyBackIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M12 2L4 6v6c0 5 3.5 9.6 8 10 4.5-.4 8-5 8-10V6l-8-4z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "9 12 11 14 15 10"
}));
const refreshIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "23 4 23 10 17 10"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "1 20 1 14 7 14"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"
}));
const chatIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
}));
const lockIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "11",
  width: "18",
  height: "11",
  rx: "2"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M7 11V7a5 5 0 0110 0v4"
}));
const keyIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
}));
const copyIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "9",
  y: "9",
  width: "13",
  height: "13",
  rx: "2"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
}));
const infoIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "12",
  y1: "16",
  x2: "12",
  y2: "12"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "12",
  y1: "8",
  x2: "12.01",
  y2: "8"
}));

/***/ },

/***/ "../bpl-tools/Admin/utils/video.js"
/*!*****************************************!*\
  !*** ../bpl-tools/Admin/utils/video.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getYoutubeEmbedSrc: () => (/* binding */ getYoutubeEmbedSrc)
/* harmony export */ });
/**
 * Build a YouTube embed URL from any YouTube share/watch/short URL.
 * Returns the original url untouched when no 11-char video id can be found.
 *
 * @param {string}	url
 * @param {object}	[options]
 * @param {boolean}	[options.autoplay=true]
 * @return {string}
 */
const getYoutubeEmbedSrc = (url, {
  autoplay = true
} = {}) => {
  const match = url.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
  const short = url.match(/youtu\.be\/([^#&?]+)/);
  const id = match && match[2]?.length === 11 ? match[2] : short && short[1]?.length === 11 ? short[1] : '';
  return id ? `https://www.youtube.com/embed/${id}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1` : url;
};

/***/ },

/***/ "../bpl-tools/Components/Button/Button.js"
/*!************************************************!*\
  !*** ../bpl-tools/Components/Button/Button.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Components/Button/style.scss");

/**
	* Button Component
	* Renders a button or anchor element based on the presence of an onClick/href.
	*
	* @props type (optional): 'button' (String)
	* @props href (optional): Anchor href; renders an <a> when set (String)
	* @props target (optional): Anchor target (String)
	* @props onClick (optional): Button click handler (Function)
	* @props className (optional): Additional CSS classes (String)
	* @props variant (optional): 'primary' Button style variant (String)
	* @props size (optional): '' Button size (String)
	* @props children (optional): Button content (Node)
	* @props disabled (optional): false (Boolean)
	*/


const Button = ({
  type = 'button',
  href = '',
  target = '',
  onClick = null,
  className,
  variant = 'primary',
  size = '',
  children,
  disabled = false,
  ...props
}) => {
  const cls = `bPlButton ${variant ? `variant-${variant}` : ''} ${size ? `size-${size}` : ''} ${className ? className : ''} ${disabled ? 'bPlButton-disabled' : ''}`;
  return 'function' === typeof onClick || !href ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: type,
    className: cls,
    ...props,
    onClick: onClick
  }, children) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: href,
    target: target,
    className: cls,
    ...props
  }, children);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ },

/***/ "../bpl-tools/hooks/useWPAjax.js"
/*!***************************************!*\
  !*** ../bpl-tools/hooks/useWPAjax.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const useWPAjax = (action, params = {}, set = true) => {
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isError, setIsError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  if (!wp.ajax) {
    // eslint-disable-next-line no-console
    console.error('Please use wp-util as a dependency');
    return;
  }
  const sendRequest = (payload = {}) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    wp.ajax.post(action, {
      ...params,
      ...payload
    }).done(res => {
      setIsLoading(false);
      setData(res);
    }).fail(error => {
      setIsLoading(false);
      setIsError(true);
      setError(error);
    });
  };
  const request = (payload = {}) => {
    sendRequest(payload);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (set) {
      sendRequest(params);
    }
  }, []);
  return {
    data,
    saveData: request,
    refetch: request,
    isLoading,
    isError,
    error
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useWPAjax);

/***/ },

/***/ "../bpl-tools/utils/data.js"
/*!**********************************!*\
  !*** ../bpl-tools/utils/data.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contentColor: () => (/* binding */ contentColor),
/* harmony export */   deskBreakpoint: () => (/* binding */ deskBreakpoint),
/* harmony export */   gradient: () => (/* binding */ gradient),
/* harmony export */   mobileBreakpoint: () => (/* binding */ mobileBreakpoint),
/* harmony export */   primaryColor: () => (/* binding */ primaryColor),
/* harmony export */   primaryColor100: () => (/* binding */ primaryColor100),
/* harmony export */   primaryColor1000: () => (/* binding */ primaryColor1000),
/* harmony export */   primaryColor200: () => (/* binding */ primaryColor200),
/* harmony export */   primaryColor300: () => (/* binding */ primaryColor300),
/* harmony export */   primaryColor400: () => (/* binding */ primaryColor400),
/* harmony export */   primaryColor500: () => (/* binding */ primaryColor500),
/* harmony export */   primaryColor600: () => (/* binding */ primaryColor600),
/* harmony export */   primaryColor700: () => (/* binding */ primaryColor700),
/* harmony export */   primaryColor800: () => (/* binding */ primaryColor800),
/* harmony export */   primaryColor900: () => (/* binding */ primaryColor900),
/* harmony export */   secondaryColor: () => (/* binding */ secondaryColor),
/* harmony export */   tabBreakpoint: () => (/* binding */ tabBreakpoint),
/* harmony export */   titleColor: () => (/* binding */ titleColor)
/* harmony export */ });
const deskBreakpoint = '@media only screen and (min-width: 1025px)';
const tabBreakpoint = '@media only screen and (max-width: 1024px)';
const mobileBreakpoint = '@media only screen and (max-width: 640px)';
const primaryColor = '#146EF5';
const primaryColor100 = '#e7f0fe';
const primaryColor200 = '#b6d2fc';
const primaryColor300 = '#85b4fa';
const primaryColor400 = '#5495f8';
const primaryColor500 = '#2377f6';
const primaryColor600 = '#095edc';
const primaryColor700 = '#0749ab';
const primaryColor800 = '#05347a';
const primaryColor900 = '#031f49';
const primaryColor1000 = '#010a18';
const secondaryColor = '#FF7A00';
const titleColor = '#070127';
const contentColor = '#485781';
const gradient = 'linear-gradient(135deg, #0040E3, #18D4FD)';

/***/ },

/***/ "../bpl-tools/utils/icons.js"
/*!***********************************!*\
  !*** ../bpl-tools/utils/icons.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bookIcon: () => (/* binding */ bookIcon),
/* harmony export */   checkIcon: () => (/* binding */ checkIcon),
/* harmony export */   circleCheckIcon: () => (/* binding */ circleCheckIcon),
/* harmony export */   closeIcon: () => (/* binding */ closeIcon),
/* harmony export */   copyIcon: () => (/* binding */ copyIcon),
/* harmony export */   crownIcon: () => (/* binding */ crownIcon),
/* harmony export */   demoIcon: () => (/* binding */ demoIcon),
/* harmony export */   desktopIcon: () => (/* binding */ desktopIcon),
/* harmony export */   docsIcon: () => (/* binding */ docsIcon),
/* harmony export */   externalIcon: () => (/* binding */ externalIcon),
/* harmony export */   filterIcon: () => (/* binding */ filterIcon),
/* harmony export */   gearIcon: () => (/* binding */ gearIcon),
/* harmony export */   gripIcon: () => (/* binding */ gripIcon),
/* harmony export */   headsetIcon: () => (/* binding */ headsetIcon),
/* harmony export */   heartFillIcon: () => (/* binding */ heartFillIcon),
/* harmony export */   heartIcon: () => (/* binding */ heartIcon),
/* harmony export */   linkIcon: () => (/* binding */ linkIcon),
/* harmony export */   listIcon: () => (/* binding */ listIcon),
/* harmony export */   minusIcon: () => (/* binding */ minusIcon),
/* harmony export */   mobileIcon: () => (/* binding */ mobileIcon),
/* harmony export */   nextIcon: () => (/* binding */ nextIcon),
/* harmony export */   playIcon: () => (/* binding */ playIcon),
/* harmony export */   pluginIcon: () => (/* binding */ pluginIcon),
/* harmony export */   plusIcon: () => (/* binding */ plusIcon),
/* harmony export */   prevIcon: () => (/* binding */ prevIcon),
/* harmony export */   questionIcon: () => (/* binding */ questionIcon),
/* harmony export */   rightArrowIcon: () => (/* binding */ rightArrowIcon),
/* harmony export */   scrollIcon: () => (/* binding */ scrollIcon),
/* harmony export */   searchIcon: () => (/* binding */ searchIcon),
/* harmony export */   starIcon: () => (/* binding */ starIcon),
/* harmony export */   tabletIcon: () => (/* binding */ tabletIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "../bpl-tools/utils/data.js");


const desktopIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "https://www.w3.org/2000/svg",
  width: 15,
  height: 15,
  viewBox: "0 0 548.172 548.172"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: _data__WEBPACK_IMPORTED_MODULE_1__.primaryColor,
  d: "M534.75 49.965c-8.945-8.945-19.694-13.422-32.261-13.422H45.681c-12.562 0-23.313 4.477-32.264 13.422C4.471 58.913 0 69.663 0 82.226v310.633c0 12.566 4.471 23.315 13.417 32.265 8.951 8.945 19.702 13.414 32.264 13.414h155.318c0 7.231-1.524 14.661-4.57 22.269-3.044 7.614-6.09 14.273-9.136 19.981-3.042 5.715-4.565 9.897-4.565 12.56 0 4.948 1.807 9.24 5.424 12.847 3.615 3.621 7.898 5.435 12.847 5.435h146.179c4.949 0 9.233-1.813 12.848-5.435 3.62-3.606 5.427-7.898 5.427-12.847 0-2.468-1.526-6.611-4.571-12.415-3.046-5.801-6.092-12.566-9.134-20.267-3.046-7.71-4.569-15.085-4.569-22.128h155.318c12.56 0 23.309-4.469 32.254-13.414 8.949-8.949 13.422-19.698 13.422-32.265V82.226c.003-12.563-4.474-23.313-13.423-32.261zm-23.123 269.803c0 2.475-.903 4.613-2.711 6.424-1.81 1.804-3.952 2.707-6.427 2.707H45.681c-2.473 0-4.615-.903-6.423-2.707-1.807-1.817-2.712-3.949-2.712-6.424V82.226c0-2.475.902-4.615 2.712-6.423 1.809-1.805 3.951-2.712 6.423-2.712h456.815c2.471 0 4.617.904 6.42 2.712 1.808 1.809 2.711 3.949 2.711 6.423v237.542z"
}));
const tabletIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "https://www.w3.org/2000/svg",
  width: 15,
  height: 15,
  viewBox: "0 0 512 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: _data__WEBPACK_IMPORTED_MODULE_1__.primaryColor,
  d: "M394.667 0H117.333C87.936 0 64 23.936 64 53.333v405.333C64 488.064 87.936 512 117.333 512h277.333C424.064 512 448 488.064 448 458.667V53.333C448 23.936 424.064 0 394.667 0zM256 480c-11.755 0-21.333-9.579-21.333-21.333s9.579-21.333 21.333-21.333 21.333 9.579 21.333 21.333S267.755 480 256 480zm149.333-64c0 5.888-4.779 10.667-10.667 10.667H117.333c-5.888 0-10.667-4.779-10.667-10.667V53.333c0-5.888 4.779-10.667 10.667-10.667h277.333c5.888 0 10.667 4.779 10.667 10.667V416z"
}));
const mobileIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "https://www.w3.org/2000/svg",
  width: 15,
  height: 15,
  viewBox: "0 0 503.604 503.604"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: _data__WEBPACK_IMPORTED_MODULE_1__.primaryColor,
  d: "M337.324 0H167.192c-28.924 0-53.5 23.584-53.5 52.5v398.664c0 28.916 24.056 52.44 52.98 52.44l170.412-.184c28.92 0 52.58-23.528 52.58-52.448l.248-398.5C389.908 23.452 366.364 0 337.324 0zM227.68 31.476h49.36c4.336 0 7.868 3.52 7.868 7.868 0 4.348-3.532 7.868-7.868 7.868h-49.36a7.865 7.865 0 01-7.868-7.868 7.865 7.865 0 017.868-7.868zm-29.66 2.504c2.916-2.912 8.224-2.952 11.136 0a7.973 7.973 0 012.324 5.588c0 2.048-.864 4.088-2.324 5.548-1.452 1.46-3.504 2.32-5.548 2.32-2.084 0-4.088-.86-5.588-2.32-1.452-1.456-2.28-3.5-2.28-5.548-.004-2.088.828-4.132 2.28-5.588zm52.752 454.028c-12.984 0-23.544-10.568-23.544-23.548 0-12.984 10.56-23.548 23.544-23.548s23.544 10.564 23.544 23.548c0 12.98-10.564 23.548-23.544 23.548zm114.716-63.1H141.232V74.756h224.256v350.152z"
}));
const scrollIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "https://www.w3.org/2000/svg",
  width: 14,
  height: 14,
  viewBox: "0 0 330 330"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M100.606 229.393c-5.857-5.857-15.355-5.857-21.213 0-5.858 5.857-5.858 15.355 0 21.213l75 75A14.954 14.954 0 00165 330a14.95 14.95 0 0010.606-4.394l75-75c5.858-5.857 5.858-15.355 0-21.213-5.857-5.857-15.355-5.857-21.213 0L180 278.787V51.212l49.394 49.394A14.95 14.95 0 00240 105a14.95 14.95 0 0010.606-4.394c5.858-5.857 5.858-15.355 0-21.213l-75-75c-5.857-5.858-15.355-5.858-21.213 0l-75 75c-5.858 5.857-5.858 15.355 0 21.213 5.857 5.857 15.355 5.857 21.213 0L150 51.212v227.574l-49.394-49.393z"
}));
const gearIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  viewBox: "0 0 430.848 430.848"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M286.244,249.537l10.992-45.639c0.035-0.143,0.071-0.285,0.109-0.428c2.909-10.867,11.469-19.426,22.339-22.338 l33.347-8.936c-5.472-6.525-13.678-10.682-22.839-10.682h-9.837c-2.511-7.895-5.7-15.59-9.515-22.957l6.96-6.959 c11.622-11.623,11.622-30.535,0-42.156L296.76,68.4c-5.631-5.629-13.117-8.73-21.079-8.73c-7.961,0-15.447,3.102-21.078,8.732 l-6.96,6.959c-7.369-3.814-15.064-7.004-22.956-9.516V56.01c0-16.436-13.372-29.807-29.808-29.807h-29.758 c-16.436,0-29.808,13.371-29.808,29.807v9.836c-7.893,2.512-15.588,5.701-22.957,9.516l-6.96-6.961 c-5.631-5.629-13.117-8.73-21.078-8.73c-7.961,0-15.447,3.102-21.079,8.732L42.2,89.443c-11.622,11.621-11.622,30.533,0,42.156 l6.959,6.959c-3.815,7.367-7.004,15.063-9.515,22.957h-9.837C13.372,161.516,0,174.887,0,191.324v29.758 c0,16.436,13.372,29.807,29.808,29.807h9.837c2.511,7.895,5.7,15.588,9.515,22.957l-6.96,6.959 c-11.623,11.623-11.623,30.533,0,42.158l21.041,21.039c5.632,5.631,13.118,8.732,21.079,8.732s15.447-3.102,21.077-8.732 l6.96-6.959c7.366,3.815,15.061,7.002,22.957,9.514v9.838c0,16.436,13.372,29.809,29.808,29.809h25.809 c-2.388-5.691-3.644-11.852-3.645-18.209c-0.002-12.572,4.892-24.391,13.781-33.279L286.244,249.537z M180,286.201 c-44.112,0-80-35.887-80-79.998c0-44.113,35.888-80.002,80-80.002s80,35.889,80,80.002C260,250.314,224.112,286.201,180,286.201z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M425.267,218.734l-0.319-0.32c-0.939-0.941-2.189-1.428-3.541-1.469c-1.326,0-2.598,0.525-3.536,1.465l-21.596,21.596 c-3.304,3.305-7.699,5.125-12.375,5.125c-4.676,0-9.072-1.82-12.379-5.129c-3.307-3.305-5.128-7.701-5.128-12.377 c0.001-4.676,1.821-9.072,5.126-12.377l21.596-21.596c0.939-0.939,1.465-2.213,1.464-3.539c-0.001-1.328-0.53-2.6-1.47-3.537 l-0.314-0.313c-3.605-3.605-8.399-5.592-13.499-5.592c-1.665,0-3.325,0.219-4.936,0.65l-44.348,11.885 c-6.568,1.76-11.741,6.932-13.498,13.496c-0.011,0.041-0.021,0.08-0.031,0.121l-11.817,49.063l-87.667,87.666 c-6.528,6.527-10.122,15.207-10.121,24.44c0.002,9.232,3.598,17.91,10.126,24.439l2.088,2.088 c6.528,6.529,15.209,10.125,24.443,10.125h0c9.231,0,17.909-3.594,24.437-10.121l87.667-87.666l49.061-11.816 c0.041-0.01,0.082-0.022,0.122-0.031c6.563-1.758,11.735-6.928,13.497-13.496l11.883-44.352 C431.959,230.598,430.066,223.535,425.267,218.734z M257.26,368.406c-1.888,1.889-4.399,2.93-7.071,2.93 c-2.671,0-5.183-1.041-7.072-2.932c-1.887-1.885-2.928-4.397-2.928-7.068c-0.001-2.672,1.041-5.185,2.931-7.072 c1.886-1.887,4.398-2.928,7.069-2.928c2.672,0,5.184,1.041,7.072,2.93c1.887,1.885,2.928,4.396,2.928,7.068 C260.189,364.006,259.148,366.518,257.26,368.406z M316.194,305.935L274.82,347.31c-1.416,1.416-3.3,2.197-5.303,2.197 c-2.003,0-3.887-0.781-5.303-2.197c-1.417-1.416-2.197-3.299-2.197-5.303s0.78-3.887,2.197-5.303l41.374-41.375 c1.417-1.418,3.3-2.197,5.303-2.197s3.887,0.779,5.303,2.197c1.417,1.416,2.197,3.299,2.197,5.303S317.611,304.519,316.194,305.935 z"
}));
const bookIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 30,
  height: 30,
  viewBox: "0 0 448 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
}));
const headsetIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 30,
  height: 30,
  viewBox: "0 0 512 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M256 48C141.1 48 48 141.1 48 256v40c0 13.3-10.7 24-24 24s-24-10.7-24-24V256C0 114.6 114.6 0 256 0S512 114.6 512 256V400.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24H240c-26.5 0-48-21.5-48-48s21.5-48 48-48h32c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40V256c0-114.9-93.1-208-208-208zM144 208h16c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H144c-35.3 0-64-28.7-64-64V272c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64v48c0 35.3-28.7 64-64 64H352c-17.7 0-32-14.3-32-32V240c0-17.7 14.3-32 32-32h16z"
}));
const starIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 30,
  height: 30,
  viewBox: "0 0 576 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
}));
const rightArrowIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 30,
  height: 30,
  viewBox: "0 0 448 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
}));
const copyIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 18,
  height: 18,
  viewBox: "0 0 448 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"
}));
const closeIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 -960 960 960"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"
}));
const gripIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 320 512",
  width: 16,
  height: 16
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M40 352l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zm192 0l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 192l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 160c-22.1 0-40-17.9-40-40L0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40z"
}));
const listIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  stroke: "currentColor",
  fill: "currentColor",
  strokeWidth: "0",
  viewBox: "0 0 512 512",
  height: "1em",
  width: "1em",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"
}));
const minusIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z"
}));
const plusIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"
}));
const prevIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 320 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
}));
const nextIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 320 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
}));
const checkIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  className: "check",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 -960 960 960"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"
}));
const circleCheckIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM438 209.7C427.3 201.9 412.3 204.3 404.5 215L285.1 379.2L233 327.1C223.6 317.7 208.4 317.7 199.1 327.1C189.8 336.5 189.7 351.7 199.1 361L271.1 433C276.1 438 282.9 440.5 289.9 440C296.9 439.5 303.3 435.9 307.4 430.2L443.3 243.2C451.1 232.5 448.7 217.5 438 209.7z"
}));
const searchIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "18px",
  height: "18px"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M10 2a8 8 0 105.29 13.71l5 5a1 1 0 001.42-1.42l-5-5A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"
}));
const demoIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  width: 25,
  height: 25,
  viewBox: "0 0 14 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M4.66667 12.25H11.9C11.9928 12.25 12.0818 12.2131 12.1475 12.1475C12.2131 12.0818 12.25 11.9928 12.25 11.9V2.1C12.25 2.00717 12.2131 1.91815 12.1475 1.85251C12.0818 1.78687 11.9928 1.75 11.9 1.75H2.1C2.00717 1.75 1.91815 1.78687 1.85251 1.85251C1.78687 1.91815 1.75 2.00717 1.75 2.1V9.33333M5.83333 3.5H10.5M3.5 3.5H4.08333M2.04167 11.9583L7 7M7 7V9.33333M7 7H4.66667",
  stroke: "#6A72A5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const docsIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  width: 25,
  height: 25,
  viewBox: "0 0 14 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M11.6667 6.99999V3.35357C11.6667 3.30753 11.6577 3.26193 11.6401 3.21939C11.6225 3.17684 11.5966 3.1382 11.564 3.10566L9.72771 1.26932C9.66213 1.20367 9.57317 1.16674 9.48037 1.16666H2.68337C2.59055 1.16666 2.50152 1.20353 2.43589 1.26917C2.37025 1.33481 2.33337 1.42383 2.33337 1.51666V12.4833C2.33337 12.5761 2.37025 12.6652 2.43589 12.7308C2.50152 12.7964 2.59055 12.8333 2.68337 12.8333H6.41671M4.66671 5.83332H9.33337M4.66671 3.49999H7.00004M4.66671 8.16666H6.41671",
  stroke: "#6A72A5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M9.33337 3.14999V1.37315C9.33345 1.33237 9.3456 1.29251 9.36829 1.25862C9.39099 1.22473 9.42321 1.19832 9.4609 1.18272C9.49859 1.16712 9.54005 1.16303 9.58006 1.17097C9.62007 1.17891 9.65683 1.19852 9.68571 1.22732L11.606 3.14765C11.6351 3.17642 11.655 3.21321 11.6631 3.25331C11.6712 3.29341 11.6672 3.33502 11.6515 3.37283C11.6359 3.41063 11.6093 3.44291 11.5752 3.46556C11.5412 3.48821 11.5011 3.5002 11.4602 3.49999H9.68337C9.59055 3.49999 9.50152 3.46311 9.43589 3.39748C9.37025 3.33184 9.33337 3.24281 9.33337 3.14999V3.14999Z",
  fill: "#6A72A5",
  stroke: "#6A72A5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M10.4731 9.88165L11.0565 9.29832C11.1172 9.23754 11.1893 9.18932 11.2687 9.15643C11.3481 9.12353 11.4331 9.1066 11.5191 9.1066C11.605 9.1066 11.6901 9.12353 11.7694 9.15643C11.8488 9.18932 11.9209 9.23754 11.9816 9.29832C12.1042 9.42095 12.1731 9.58723 12.1731 9.76061C12.1731 9.93399 12.1042 10.1003 11.9816 10.2229L11.3983 10.8062M10.4731 9.88107L8.7284 11.6258C8.64116 11.7133 8.58397 11.8263 8.56506 11.9484L8.42273 12.8567L9.33098 12.7149C9.45309 12.696 9.56605 12.6388 9.65356 12.5516L11.3977 10.8062M10.4731 9.88107L11.3983 10.8062",
  stroke: "#6A72A5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const playIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"
}));
const questionIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM320 240C302.3 240 288 254.3 288 272C288 285.3 277.3 296 264 296C250.7 296 240 285.3 240 272C240 227.8 275.8 192 320 192C364.2 192 400 227.8 400 272C400 319.2 364 339.2 344 346.5L344 350.3C344 363.6 333.3 374.3 320 374.3C306.7 374.3 296 363.6 296 350.3L296 342.2C296 321.7 310.8 307 326.1 302C332.5 299.9 339.3 296.5 344.3 291.7C348.6 287.5 352 281.7 352 272.1C352 254.4 337.7 240.1 320 240.1zM288 432C288 414.3 302.3 400 320 400C337.7 400 352 414.3 352 432C352 449.7 337.7 464 320 464C302.3 464 288 449.7 288 432z"
}));
const pluginIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M224 32C241.7 32 256 46.3 256 64L256 160L384 160L384 64C384 46.3 398.3 32 416 32C433.7 32 448 46.3 448 64L448 160L512 160C529.7 160 544 174.3 544 192C544 209.7 529.7 224 512 224L512 288C512 383.1 442.8 462.1 352 477.3L352 544C352 561.7 337.7 576 320 576C302.3 576 288 561.7 288 544L288 477.3C197.2 462.1 128 383.1 128 288L128 224C110.3 224 96 209.7 96 192C96 174.3 110.3 160 128 160L192 160L192 64C192 46.3 206.3 32 224 32z"
}));
const linkIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M451.5 160C434.9 160 418.8 164.5 404.7 172.7C388.9 156.7 370.5 143.3 350.2 133.2C378.4 109.2 414.3 96 451.5 96C537.9 96 608 166 608 252.5C608 294 591.5 333.8 562.2 363.1L491.1 434.2C461.8 463.5 422 480 380.5 480C294.1 480 224 410 224 323.5C224 322 224 320.5 224.1 319C224.6 301.3 239.3 287.4 257 287.9C274.7 288.4 288.6 303.1 288.1 320.8C288.1 321.7 288.1 322.6 288.1 323.4C288.1 374.5 329.5 415.9 380.6 415.9C405.1 415.9 428.6 406.2 446 388.8L517.1 317.7C534.4 300.4 544.2 276.8 544.2 252.3C544.2 201.2 502.8 159.8 451.7 159.8zM307.2 237.3C305.3 236.5 303.4 235.4 301.7 234.2C289.1 227.7 274.7 224 259.6 224C235.1 224 211.6 233.7 194.2 251.1L123.1 322.2C105.8 339.5 96 363.1 96 387.6C96 438.7 137.4 480.1 188.5 480.1C205 480.1 221.1 475.7 235.2 467.5C251 483.5 269.4 496.9 289.8 507C261.6 530.9 225.8 544.2 188.5 544.2C102.1 544.2 32 474.2 32 387.7C32 346.2 48.5 306.4 77.8 277.1L148.9 206C178.2 176.7 218 160.2 259.5 160.2C346.1 160.2 416 230.8 416 317.1C416 318.4 416 319.7 416 321C415.6 338.7 400.9 352.6 383.2 352.2C365.5 351.8 351.6 337.1 352 319.4C352 318.6 352 317.9 352 317.1C352 283.4 334 253.8 307.2 237.5z"
}));
const crownIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 544 432"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "m297 71.2c9.2-7.3 15-18.6 15-31.2 0-22.1-17.9-40-40-40-22.1 0-40 17.9-40 40 0 12.6 5.9 23.9 15 31.2l-68.4 107.6c-10 15.7-31.3 19.6-46.2 8.4l-59.5-44.5c4.5-6.4 7.1-14.3 7.1-22.7 0-22.1-17.9-40-40-40-22.1 0-40 17.9-40 40 0 21.8 17.5 39.6 39.2 40l32.6 217.5c4.7 31.3 31.6 54.5 63.3 54.5h273.8c31.7 0 58.6-23.2 63.3-54.5l32.6-217.5c21.7-0.4 39.2-18.2 39.2-40 0-22.1-17.9-40-40-40-22.1 0-40 17.9-40 40 0 8.4 2.6 16.3 7.1 22.7l-59.4 44.6c-14.9 11.2-36.2 7.3-46.2-8.4z"
}));
const externalIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "m290.4 19.8c5-12 16.7-19.8 29.6-19.8h160c17.7 0 32 14.3 32 32v160c0 12.9-7.8 24.6-19.8 29.6-12 5-25.7 2.2-34.9-6.9l-57.3-57.4-153.4 153.3c-12.5 12.5-32.8 12.5-45.3 0-12.5-12.5-12.5-32.8 0-45.3l153.4-153.3-57.3-57.4c-9.2-9.2-11.9-22.9-6.9-34.9zm-290.4 156.2c0-44.2 35.8-80 80-80h80c17.7 0 32 14.3 32 32 0 17.7-14.3 32-32 32h-80c-8.8 0-16 7.2-16 16v256c0 8.8 7.2 16 16 16h256c8.8 0 16-7.2 16-16v-80c0-17.7 14.3-32 32-32 17.7 0 32 14.3 32 32v80c0 44.2-35.8 80-80 80h-256c-44.2 0-80-35.8-80-80z"
}));
const heartIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 448"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "m271 55.1c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 68.6-42.9 128.9-79.1 172.8-44.1 53.6-97.3 100.1-133.8 127.9-12.3 9.4-27.5 14.1-43.1 14.1-15.6 0-30.8-4.7-43.1-14.1-36.5-27.8-89.7-74.3-133.8-127.8-36.2-43.9-79.1-104.3-79.1-172.9 0-73.5 59.6-133.1 133.1-133.1 42.7 0 82.9 20.5 107.9 55.1l15 20.7zm107.9-7.1c-27.3 0-53 13.1-69 35.2l-34.4 47.6c-4.5 6.2-11.7 9.9-19.4 9.9-7.7 0-14.9-3.7-19.4-9.9l-34.4-47.6c-16-22.1-41.7-35.2-69-35.2-47 0-85.1 38.1-85.1 85.1 0 49.9 32 98.4 68.1 142.3 41.1 50 91.4 94 125.9 120.3 3.2 2.4 7.9 4.2 14 4.2 6.1 0 10.8-1.8 14-4.2 34.5-26.3 84.8-70.4 125.9-120.3 36.2-43.9 68.1-92.4 68.1-142.3 0-47-38.1-85.1-85.1-85.1z"
}));
const heartFillIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 448"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "m241 55.1l15 20.7 15-20.7c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1v2.6c0 112.2-139.9 242.5-212.9 298.2-12.4 9.4-27.6 14.1-43.1 14.1-15.5 0-30.8-4.6-43.1-14.1-73-55.7-212.9-186-212.9-298.2v-2.6c0-73.5 59.6-133.1 133.1-133.1 42.7 0 82.9 20.5 107.9 55.1z"
}));
const filterIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512",
  fill: "currentColor"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"
}));

/***/ },

/***/ "./src/admin/Components/AllBlocks.js"
/*!*******************************************!*\
  !*** ./src/admin/Components/AllBlocks.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bpl_tools_Admin_Blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/Blocks */ "../bpl-tools/Admin/Blocks/index.js");




/**
 * The All Blocks page: every block, with a switch.
 *
 * The page itself is bpl-tools' `Admin/Blocks`, which is the same component the
 * other bPlugins dashboards use for this screen. It was written for exactly this
 * and carries the design the rest of the dashboard is built from -- the card,
 * the group headings, the search field, the two All buttons, the toggle and the
 * saving toast -- so a hand-rolled version here would have been a second look
 * for one plugin and one more thing to keep in step with Welcome and Demos.
 *
 * This file is only the wiring: block list in, disabled list out, and one ajax
 * call to store it.
 *
 * The list is sent whole rather than one block at a time. Activate All and
 * Deactivate All would otherwise be forty round trips, and a half-written option
 * is worse than an unsaved one.
 *
 * @param {Object}  props
 * @param {Array}   props.allBlocks      Groups, each with its blocks.
 * @param {Array}   props.disabledBlocks Names switched off, from the option.
 * @param {string}  props.uninstallNonce Nonce for the dashboard's ajax actions.
 * @param {boolean} props.isPremium      Passed through to the shared component.
 */
const AllBlocks = ({
  allBlocks = [],
  disabledBlocks = [],
  uninstallNonce = "",
  isPremium = false
}) => {
  // '' | 'loading' | 'success' | 'error' -- the component turns this into its
  // own toast, so nothing here has to render one.
  const [status, setStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const save = disabled => {
    setStatus("loading");

    // `wp.ajax` is what the Settings page posts through, so both of this
    // dashboard's writes go the same way and share the one nonce action.
    window.wp?.ajax?.post("bpbtbSaveDisabledBlocks", {
      nonce: uninstallNonce,
      disabled
    })?.done(() => setStatus("success"))?.fail(() => setStatus("error"));
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_Blocks__WEBPACK_IMPORTED_MODULE_1__["default"], {
    isPremium: isPremium,
    allBlocks: allBlocks,
    disabledBlocks: disabledBlocks,
    status: status,
    onChange: save
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AllBlocks);

/***/ },

/***/ "./src/admin/Components/App.js"
/*!*************************************!*\
  !*** ./src/admin/Components/App.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/development/chunk-KS7C4IRE.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bpl_tools_Admin_Welcome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/Welcome */ "../bpl-tools/Admin/Welcome/index.js");
/* harmony import */ var _bpl_tools_Admin_Demos__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/Demos */ "../bpl-tools/Admin/Demos/index.js");
/* harmony import */ var _bpl_tools_Admin_OurPlugins__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/OurPlugins */ "../bpl-tools/Admin/OurPlugins/index.js");
/* harmony import */ var _bpl_tools_Admin_Settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/Settings */ "../bpl-tools/Admin/Settings/index.js");
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Layout */ "./src/admin/Components/Layout.js");
/* harmony import */ var _AllBlocks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./AllBlocks */ "./src/admin/Components/AllBlocks.js");
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/data */ "./src/admin/utils/data.js");










const App = props => {
  const {
    adminUrl,
    demoBase,
    demoUrls
  } = props;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.HashRouter, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Routes, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {
    path: "/",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Layout__WEBPACK_IMPORTED_MODULE_7__["default"], {
      ...props
    })
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {
    index: true,
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_Welcome__WEBPACK_IMPORTED_MODULE_3__["default"], {
      ...props,
      ...(0,_utils_data__WEBPACK_IMPORTED_MODULE_9__.welcomeInfo)(adminUrl)
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {
    path: "welcome",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_Welcome__WEBPACK_IMPORTED_MODULE_3__["default"], {
      ...props,
      ...(0,_utils_data__WEBPACK_IMPORTED_MODULE_9__.welcomeInfo)(adminUrl)
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {
    path: "demos",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_Demos__WEBPACK_IMPORTED_MODULE_4__["default"], {
      ...props,
      demoInfo: (0,_utils_data__WEBPACK_IMPORTED_MODULE_9__.demoInfo)(demoBase, demoUrls)
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {
    path: "all-blocks",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_AllBlocks__WEBPACK_IMPORTED_MODULE_8__["default"], {
      ...props,
      allBlocks: (0,_utils_data__WEBPACK_IMPORTED_MODULE_9__.allBlocksInfo)(demoBase, demoUrls)
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {
    path: "our-plugins",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_OurPlugins__WEBPACK_IMPORTED_MODULE_5__["default"], {
      ...props
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {
    path: "settings",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_Settings__WEBPACK_IMPORTED_MODULE_6__["default"], {
      ...props,
      ajaxAction: "bpbtbSaveUninstallOption",
      cleanupItems: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('All testimonials, including pending submissions', 'b-testimonials-block'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Submitted photos attached to those testimonials', 'b-testimonials-block'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Feedback & NPS Poll responses and category settings', 'b-testimonials-block')]
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {
    path: "*",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Navigate, {
      to: "/welcome",
      replace: true
    })
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ },

/***/ "./src/admin/Components/Layout.js"
/*!****************************************!*\
  !*** ./src/admin/Components/Layout.js ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/development/chunk-KS7C4IRE.mjs");
/* harmony import */ var _bpl_tools_Admin_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/Header */ "../bpl-tools/Admin/Header/index.js");



const navigation = [{
  name: 'Welcome',
  href: '/welcome'
}, {
  name: 'All Blocks',
  href: '/all-blocks'
}, {
  name: 'Demos',
  href: '/demos'
}, {
  name: 'Settings',
  href: '/settings'
}];
const Layout = props => {
  const {
    isPremium,
    hasPro
  } = props;
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useLocation)();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_Header__WEBPACK_IMPORTED_MODULE_2__["default"], {
    ...props,
    isPremium: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    className: "bPlDashboardNav"
  }, navigation?.filter(item => item.href !== '/activation' || hasPro)?.filter(item => !isPremium || !['/purchase', '/pricing', '/feature-comparison'].includes(item.href))?.map((item, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {
    key: index,
    to: item.href,
    className: `navLink ${location.pathname === item.href ? 'active' : ''}`
  }, item.name)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", {
    className: "bPlDashboardMain"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Outlet, null)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ },

/***/ "./src/admin/assets/welcomeBanner.js"
/*!*******************************************!*\
  !*** ./src/admin/assets/welcomeBanner.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Welcome hero artwork for the dashboard.
 *
 * Vector rather than the old `ps.w.org/.../b-testimonial.png`, which was a
 * fixed-resolution screenshot fetched from wordpress.org on every dashboard
 * load -- it blurred on HiDPI screens and failed entirely on a site with no
 * outbound network. This ships with the plugin and scales to any width.
 *
 * The bPlugins mark (blue + orange) and the "bPlugins" wordmark are the paths
 * from the brand file, copied verbatim so the logo cannot drift from the
 * official one:
 * https://bplugins.com/wp-content/themes/b-technologies/assets/images/logo/logo-2-dark.svg
 *
 * Kept as a string rather than an imported .svg because `media.thumbnail`
 * takes a URL: @wordpress/scripts turns an SVG import into a React component,
 * not a src. Encoding at runtime keeps this file the single source of truth --
 * edit the markup here and the banner changes.
 *
 * The wordmark reads "Testimonials", not the plugin's full "B Testimonials
 * Block". It was two stacked lines -- "B Testimonials" over "Block" -- beside a
 * one-line logo tile, which made the lock-up top-heavy; and next to the bPlugins
 * mark the "B" and "Block" are both saying something the page already says. One
 * word is the subject of the artwork.
 *
 * That line sits at y=73 rather than the 63 it used as the upper of two, which
 * centres its cap height on the 44px tile at y=42.
 */
const bannerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400" fill="none" role="img" aria-label="Testimonials by bPlugins"><defs><linearGradient id="btbBg" x1="0" y1="0" x2="600" y2="400" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0b1b33"/><stop offset="0.52" stop-color="#17408a"/><stop offset="1" stop-color="#146ef5"/></linearGradient><linearGradient id="btbGlass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="1" stop-color="#ffffff" stop-opacity="0.07"/></linearGradient><linearGradient id="btbCard" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#eaf1ff"/></linearGradient><linearGradient id="btbAvatar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#146ef5"/><stop offset="1" stop-color="#0b3fa8"/></linearGradient><filter id="btbShadow" x="-25%" y="-25%" width="150%" height="150%"><feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#04122b" flood-opacity="0.45"/></filter></defs><rect width="600" height="400" fill="url(#btbBg)"/><circle cx="70" cy="52" r="120" fill="#ffffff" opacity="0.06"/><circle cx="548" cy="352" r="150" fill="#0a3f9e" opacity="0.32"/><circle cx="522" cy="58" r="64" fill="#ffffff" opacity="0.05"/><g><rect x="48" y="42" width="44" height="44" rx="12" fill="#ffffff"/><g transform="translate(55 50) scale(0.8)"><path d="M37.4506 10.2852C37.4429 13.1251 36.1918 15.7041 34.2269 17.5539C32.3003 19.3883 29.683 20.5166 26.8891 20.5166H25.6687C22.5909 20.5166 20.0963 23.0111 20.0963 26.089V35.2689H12.9735C12.1139 35.2689 11.4231 34.5704 11.4231 33.7184V22.259C11.4231 21.5605 11.0393 20.8774 10.3869 20.6241C9.72678 20.3631 9.04367 20.555 8.61384 20.9695C8.59849 20.9925 8.58314 21.0002 8.56779 21.0155C7.66208 21.9903 6.38028 22.5967 4.95264 22.5967C2.02061 22.5967 -0.305059 20.0561 0.032662 17.0703C0.293628 14.7677 2.20482 12.9256 4.50746 12.7183C6.11931 12.5802 7.593 13.2096 8.59081 14.2918C8.97458 14.6679 9.55025 14.8675 10.1489 14.7293C10.9165 14.5528 11.4307 13.8236 11.4307 13.033V1.55821C11.4307 0.698559 12.1292 0.00776578 12.9812 0.00776578H18.024C18.9066 0.00776578 19.7126 0.652504 19.7816 1.53518C19.82 2.04944 19.6358 2.51764 19.3058 2.84769C18.3233 3.75339 17.7093 5.04287 17.7093 6.47819C17.7093 9.21833 19.9275 11.4289 22.66 11.4289C25.4001 11.4289 27.6106 9.21833 27.6106 6.47819C27.6106 5.04287 27.0043 3.76107 26.0295 2.86304C26.0141 2.84769 26.0065 2.83234 25.9834 2.81699C25.6073 2.42554 25.4231 1.8422 25.5843 1.24352C25.7762 0.483645 26.5284 -0.0075868 27.3113 8.86678e-05C30.0975 0.038466 32.615 1.17444 34.4418 3.0012C36.3069 4.87401 37.4583 7.43762 37.4506 10.2852Z" fill="#146EF5" /><path d="M37.4507 25.0145C37.4507 30.679 32.8607 35.2689 27.1962 35.2689H20.0964V26.0891C20.0964 23.0112 22.591 20.5167 25.6688 20.5167H26.8892C29.6831 20.5167 32.3004 19.3884 34.227 17.554C34.2961 17.623 34.3728 17.6921 34.4419 17.7689C36.2994 19.6187 37.4507 22.1823 37.4507 25.0145Z" fill="#FF7A00" /></g><text x="108" y="73" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#ffffff">Testimonials</text></g><g filter="url(#btbShadow)"><g transform="translate(52 172) rotate(-7)"><rect width="152" height="104" rx="16" fill="url(#btbGlass)"/><circle cx="28" cy="30" r="13" fill="#ffffff" opacity="0.85"/><rect x="50" y="22" width="64" height="7" rx="3.5" fill="#ffffff" opacity="0.65"/><rect x="50" y="36" width="44" height="6" rx="3" fill="#ffffff" opacity="0.35"/><rect x="20" y="58" width="112" height="6" rx="3" fill="#ffffff" opacity="0.28"/><rect x="20" y="70" width="86" height="6" rx="3" fill="#ffffff" opacity="0.2"/><path d="M24.0 84.0 L25.5 88.0 L29.7 88.1 L26.4 90.8 L27.5 94.9 L24.0 92.5 L20.5 94.9 L21.6 90.8 L18.3 88.1 L22.5 88.0 Z" fill="#fbbf24" opacity="0.85"/><path d="M39.0 84.0 L40.5 88.0 L44.7 88.1 L41.4 90.8 L42.5 94.9 L39.0 92.5 L35.5 94.9 L36.6 90.8 L33.3 88.1 L37.5 88.0 Z" fill="#fbbf24" opacity="0.85"/><path d="M54.0 84.0 L55.5 88.0 L59.7 88.1 L56.4 90.8 L57.5 94.9 L54.0 92.5 L50.5 94.9 L51.6 90.8 L48.3 88.1 L52.5 88.0 Z" fill="#fbbf24" opacity="0.85"/><path d="M69.0 84.0 L70.5 88.0 L74.7 88.1 L71.4 90.8 L72.5 94.9 L69.0 92.5 L65.5 94.9 L66.6 90.8 L63.3 88.1 L67.5 88.0 Z" fill="#fbbf24" opacity="0.85"/><path d="M84.0 84.0 L85.5 88.0 L89.7 88.1 L86.4 90.8 L87.5 94.9 L84.0 92.5 L80.5 94.9 L81.6 90.8 L78.3 88.1 L82.5 88.0 Z" fill="#fbbf24" opacity="0.85"/></g><g transform="translate(396 172) rotate(7)"><rect width="152" height="104" rx="16" fill="url(#btbGlass)"/><circle cx="28" cy="30" r="13" fill="#ffffff" opacity="0.85"/><rect x="50" y="22" width="58" height="7" rx="3.5" fill="#ffffff" opacity="0.65"/><rect x="50" y="36" width="38" height="6" rx="3" fill="#ffffff" opacity="0.35"/><rect x="20" y="58" width="112" height="6" rx="3" fill="#ffffff" opacity="0.28"/><rect x="20" y="70" width="94" height="6" rx="3" fill="#ffffff" opacity="0.2"/><path d="M24.0 84.0 L25.5 88.0 L29.7 88.1 L26.4 90.8 L27.5 94.9 L24.0 92.5 L20.5 94.9 L21.6 90.8 L18.3 88.1 L22.5 88.0 Z" fill="#fbbf24" opacity="0.85"/><path d="M39.0 84.0 L40.5 88.0 L44.7 88.1 L41.4 90.8 L42.5 94.9 L39.0 92.5 L35.5 94.9 L36.6 90.8 L33.3 88.1 L37.5 88.0 Z" fill="#fbbf24" opacity="0.85"/><path d="M54.0 84.0 L55.5 88.0 L59.7 88.1 L56.4 90.8 L57.5 94.9 L54.0 92.5 L50.5 94.9 L51.6 90.8 L48.3 88.1 L52.5 88.0 Z" fill="#fbbf24" opacity="0.85"/><path d="M69.0 84.0 L70.5 88.0 L74.7 88.1 L71.4 90.8 L72.5 94.9 L69.0 92.5 L65.5 94.9 L66.6 90.8 L63.3 88.1 L67.5 88.0 Z" fill="#fbbf24" opacity="0.85"/><path d="M84.0 84.0 L85.5 88.0 L89.7 88.1 L86.4 90.8 L87.5 94.9 L84.0 92.5 L80.5 94.9 L81.6 90.8 L78.3 88.1 L82.5 88.0 Z" fill="#fbbf24" opacity="0.85"/></g><g transform="translate(196 142)"><rect width="208" height="158" rx="20" fill="url(#btbCard)"/><text x="168" y="58" font-family="Georgia, 'Times New Roman', serif" font-size="72" font-weight="700" fill="#146ef5" opacity="0.16">&#8221;</text><path d="M28.0 24.0 L30.0 29.3 L35.6 29.5 L31.2 33.0 L32.7 38.5 L28.0 35.4 L23.3 38.5 L24.8 33.0 L20.4 29.5 L26.0 29.3 Z" fill="#fbbf24"/><path d="M48.0 24.0 L50.0 29.3 L55.6 29.5 L51.2 33.0 L52.7 38.5 L48.0 35.4 L43.3 38.5 L44.8 33.0 L40.4 29.5 L46.0 29.3 Z" fill="#fbbf24"/><path d="M68.0 24.0 L70.0 29.3 L75.6 29.5 L71.2 33.0 L72.7 38.5 L68.0 35.4 L63.3 38.5 L64.8 33.0 L60.4 29.5 L66.0 29.3 Z" fill="#fbbf24"/><path d="M88.0 24.0 L90.0 29.3 L95.6 29.5 L91.2 33.0 L92.7 38.5 L88.0 35.4 L83.3 38.5 L84.8 33.0 L80.4 29.5 L86.0 29.3 Z" fill="#fbbf24"/><path d="M108.0 24.0 L110.0 29.3 L115.6 29.5 L111.2 33.0 L112.7 38.5 L108.0 35.4 L103.3 38.5 L104.8 33.0 L100.4 29.5 L106.0 29.3 Z" fill="#fbbf24"/><rect x="20" y="56" width="168" height="8" rx="4" fill="#0b1b33" opacity="0.14"/><rect x="20" y="74" width="152" height="8" rx="4" fill="#0b1b33" opacity="0.12"/><rect x="20" y="92" width="118" height="8" rx="4" fill="#0b1b33" opacity="0.1"/><circle cx="40" cy="128" r="18" fill="url(#btbAvatar)"/><circle cx="40" cy="122" r="6.5" fill="#ffffff" opacity="0.95"/><path d="M28.5 140a11.5 11.5 0 0 1 23 0z" fill="#ffffff" opacity="0.95"/><rect x="68" y="118" width="84" height="8" rx="4" fill="#0b1b33" opacity="0.32"/><rect x="68" y="134" width="58" height="7" rx="3.5" fill="#0b1b33" opacity="0.16"/></g></g><g><rect x="210" y="328" width="180" height="48" rx="24" fill="#ffffff"/><g transform="translate(234 340) scale(0.66)"><path d="M37.4506 10.2852C37.4429 13.1251 36.1918 15.7041 34.2269 17.5539C32.3003 19.3883 29.683 20.5166 26.8891 20.5166H25.6687C22.5909 20.5166 20.0963 23.0111 20.0963 26.089V35.2689H12.9735C12.1139 35.2689 11.4231 34.5704 11.4231 33.7184V22.259C11.4231 21.5605 11.0393 20.8774 10.3869 20.6241C9.72678 20.3631 9.04367 20.555 8.61384 20.9695C8.59849 20.9925 8.58314 21.0002 8.56779 21.0155C7.66208 21.9903 6.38028 22.5967 4.95264 22.5967C2.02061 22.5967 -0.305059 20.0561 0.032662 17.0703C0.293628 14.7677 2.20482 12.9256 4.50746 12.7183C6.11931 12.5802 7.593 13.2096 8.59081 14.2918C8.97458 14.6679 9.55025 14.8675 10.1489 14.7293C10.9165 14.5528 11.4307 13.8236 11.4307 13.033V1.55821C11.4307 0.698559 12.1292 0.00776578 12.9812 0.00776578H18.024C18.9066 0.00776578 19.7126 0.652504 19.7816 1.53518C19.82 2.04944 19.6358 2.51764 19.3058 2.84769C18.3233 3.75339 17.7093 5.04287 17.7093 6.47819C17.7093 9.21833 19.9275 11.4289 22.66 11.4289C25.4001 11.4289 27.6106 9.21833 27.6106 6.47819C27.6106 5.04287 27.0043 3.76107 26.0295 2.86304C26.0141 2.84769 26.0065 2.83234 25.9834 2.81699C25.6073 2.42554 25.4231 1.8422 25.5843 1.24352C25.7762 0.483645 26.5284 -0.0075868 27.3113 8.86678e-05C30.0975 0.038466 32.615 1.17444 34.4418 3.0012C36.3069 4.87401 37.4583 7.43762 37.4506 10.2852Z" fill="#146EF5" /><path d="M37.4507 25.0145C37.4507 30.679 32.8607 35.2689 27.1962 35.2689H20.0964V26.0891C20.0964 23.0112 22.591 20.5167 25.6688 20.5167H26.8892C29.6831 20.5167 32.3004 19.3884 34.227 17.554C34.2961 17.623 34.3728 17.6921 34.4419 17.7689C36.2994 19.6187 37.4507 22.1823 37.4507 25.0145Z" fill="#FF7A00" /><path d="M62.3039 10.5922C58.5352 10.5922 57.1997 12.9563 57.1997 12.9563H56.7391V4.07574C56.7391 3.61521 56.4705 3.35425 56.0176 3.35425H52.2874C51.8268 3.35425 51.6042 3.62289 51.6042 4.07574V30.8171C51.6042 31.2776 51.8345 31.5386 52.2874 31.5386H56.0176C56.4782 31.5386 56.7391 31.2699 56.7391 30.8171V29.4816H57.1997C57.1997 29.4816 58.5352 31.8456 62.3039 31.8456C67.5999 31.8456 70.7238 27.2019 70.7238 21.2151C70.7238 15.2282 67.5923 10.5922 62.3039 10.5922ZM60.9299 27.5397C57.9595 27.5397 56.4705 24.9146 56.4705 21.2151C56.4705 17.5232 57.9595 14.8905 60.9299 14.8905C63.9387 14.8905 65.351 17.5155 65.351 21.2151C65.351 24.9146 63.9387 27.5397 60.9299 27.5397Z" fill="#101828" /><path d="M73.7786 4.45953C73.7786 4.0604 74.1009 3.73804 74.5001 3.73804H83.5494C86.3203 3.73804 88.5769 4.60536 90.3039 6.34002C92.0308 8.07468 92.8982 10.3389 92.8982 13.1405C92.8982 15.8883 92.0078 18.1219 90.2271 19.8488C88.4464 21.5682 86.1514 22.4278 83.3422 22.4278H78.7523V30.8171C78.7523 31.2162 78.4299 31.5386 78.0308 31.5386H74.5077C74.1086 31.5386 73.7862 31.2162 73.7862 30.8171V4.45953H73.7786ZM78.7523 7.89814V18.2984H82.2293C84.0176 18.2984 85.3992 17.8456 86.3817 16.9475C87.3641 16.0495 87.8554 14.7754 87.8554 13.1328C87.8554 11.4365 87.3718 10.1394 86.397 9.24135C85.4299 8.34332 84.0407 7.89046 82.2446 7.89046H78.7523V7.89814Z" fill="#101828" /><path d="M104.603 31.5386C105.056 31.5386 105.325 31.2699 105.325 30.8171V27.7699C105.325 27.3094 105.056 27.0868 104.603 27.0868H102.431C101.594 27.0868 101.096 26.5879 101.096 25.7513V4.07574C101.096 3.61521 100.827 3.35425 100.374 3.35425H96.6438C96.1833 3.35425 95.9607 3.62289 95.9607 4.07574V26.1274C95.9607 29.6351 97.8258 31.5386 101.334 31.5386H104.603Z" fill="#101828" /><path d="M120.415 10.9758C119.954 10.9758 119.693 11.2445 119.693 11.6973V24.0011C119.693 26.4803 118.058 27.6163 116.224 27.6163C114.397 27.6163 112.793 26.4726 112.793 24.0011V11.6973C112.793 11.2368 112.524 10.9758 112.071 10.9758H108.341C107.881 10.9758 107.658 11.2445 107.658 11.6973V24.6075C107.658 29.1744 110.283 31.9222 114.213 31.9222C118.097 31.9222 119.24 29.2204 119.24 29.2204H119.701V30.8169C119.701 31.2774 119.969 31.5384 120.422 31.5384H124.153C124.613 31.5384 124.874 31.2698 124.874 30.8169V11.6973C124.874 11.2368 124.605 10.9758 124.153 10.9758H120.415Z" fill="#101828" /><path d="M147.072 27.2868C147.064 26.8032 147.056 26.3197 147.056 25.8515C147.056 21.8679 147.056 17.892 147.056 13.9084C147.056 13.1486 147.056 12.3887 147.056 11.6288C147.056 11.176 146.834 10.8997 146.366 10.8997H142.635C142.183 10.8997 141.906 11.176 141.906 11.6288V12.9567H141.453C141.453 12.9567 140.126 10.585 136.349 10.585C131.053 10.585 127.929 15.2363 127.929 21.2155C127.929 27.1947 131.061 30.925 136.349 30.9096C140.003 30.8943 141.453 28.5379 141.453 28.5379H141.891C141.906 28.5993 141.906 28.653 141.906 28.7298V30.38C141.829 32.3372 141.668 34.5324 139.619 35.4151C139.281 35.5609 138.897 35.6837 138.529 35.7145C135.06 36.1059 133.594 34.1103 133.064 33.0664C132.895 32.7287 132.488 32.5982 132.143 32.744L129.226 34.0028C128.85 34.164 128.681 34.6092 128.858 34.9776C129.487 36.2901 131.276 39.0686 135.413 39.8132C138.306 40.3351 141.653 39.7671 143.833 38.0938C146.32 36.1827 146.934 33.3197 147.049 30.4491C147.103 29.3899 147.087 28.3383 147.072 27.2868ZM137.731 26.596C135.643 26.596 134.077 25.5598 133.555 23.4798C132.765 20.3175 133.54 14.8986 137.731 14.8986C140.701 14.8986 142.19 17.5313 142.19 21.2155C142.19 24.9151 140.694 26.596 137.731 26.596Z" fill="#101828" /><path d="M154.763 2.21094C152.859 2.21094 151.447 3.58484 151.447 5.44998C151.447 7.3535 152.859 8.72741 154.763 8.72741C156.666 8.72741 158.078 7.3535 158.078 5.44998C158.071 3.58484 156.666 2.21094 154.763 2.21094Z" fill="#101828" /><path d="M156.628 10.9766H152.897C152.437 10.9766 152.176 11.2452 152.176 11.6981V30.8177C152.176 31.2782 152.444 31.5392 152.897 31.5392H156.628C157.088 31.5392 157.349 31.2705 157.349 30.8177V11.6981C157.349 11.2375 157.08 10.9766 156.628 10.9766Z" fill="#101828" /><path d="M173.13 10.5928C169.246 10.5928 168.103 13.2945 168.103 13.2945H167.642V11.698C167.642 11.2375 167.373 10.9765 166.921 10.9765H163.19C162.73 10.9765 162.469 11.2452 162.469 11.698V30.8176C162.469 31.2782 162.737 31.5391 163.19 31.5391H166.921C167.381 31.5391 167.642 31.2705 167.642 30.8176V18.5139C167.642 16.0347 169.277 14.8987 171.111 14.8987C172.938 14.8987 174.542 16.0424 174.542 18.5139V30.8176C174.542 31.2782 174.811 31.5391 175.264 31.5391H178.994C179.455 31.5391 179.677 31.2705 179.677 30.8176V17.9075C179.677 13.3329 177.052 10.5928 173.13 10.5928Z" fill="#101828" /><path d="M199.418 24.0474C199.019 21.7141 197.4 20.4476 195.335 19.7799C194.237 19.4268 193.109 19.1812 191.981 18.9509C190.776 18.6976 188.665 18.6976 188.082 17.3621C187.568 16.1877 188.581 15.1132 189.648 14.8138C191.751 14.2305 193.409 14.8906 194.475 16.7941C194.759 17.293 195.089 17.4695 195.611 17.2853C196.571 16.9399 197.369 16.6022 198.329 16.2491C198.92 16.0342 199.096 15.6274 198.789 15.0825C198.421 14.4224 198.098 13.7086 197.599 13.1559C194.775 10.0013 188.466 9.73267 185.111 12.5112C182.563 14.6296 181.857 20.0408 186.27 22.0288C187.115 22.4049 187.936 22.5047 188.842 22.7196C190.208 23.0496 191.597 23.2492 192.963 23.5715C193.739 23.7558 194.591 24.224 194.66 25.2218C194.721 26.1044 194.276 26.8336 193.232 27.202C191.336 27.8852 188.182 27.7317 187.069 25.2064C186.792 24.5924 186.409 24.4619 185.81 24.6922C184.935 25.0222 184.052 25.3523 183.162 25.6209C182.448 25.8358 182.525 26.1966 182.732 26.8413C183.607 29.5124 186.255 31.1319 188.888 31.6692C188.918 31.6768 188.957 31.6845 188.987 31.6922C189.057 31.7075 189.126 31.7152 189.195 31.7306C190.584 31.9685 191.866 32.0146 193.247 31.7306C194.115 31.554 194.959 31.2777 195.75 30.8863C195.949 30.7865 196.133 30.6714 196.325 30.5716C198.712 29.3281 199.887 26.7645 199.418 24.0474Z" fill="#101828" /></g></g></svg>`;

// Not base64: a URL-encoded SVG stays greppable in the built bundle and skips
// the ~33% size penalty base64 adds.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`data:image/svg+xml,${encodeURIComponent(bannerSvg)}`);

/***/ },

/***/ "./src/admin/utils/data.js"
/*!*********************************!*\
  !*** ./src/admin/utils/data.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   allBlocksInfo: () => (/* binding */ allBlocksInfo),
/* harmony export */   dashboardInfo: () => (/* binding */ dashboardInfo),
/* harmony export */   demoInfo: () => (/* binding */ demoInfo),
/* harmony export */   welcomeInfo: () => (/* binding */ welcomeInfo)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_welcomeBanner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/welcomeBanner */ "./src/admin/assets/welcomeBanner.js");
/* harmony import */ var _shared_utils_childBlocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utils/childBlocks */ "./src/shared/utils/childBlocks.js");
/* harmony import */ var _shared_utils_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/utils/icons */ "./src/shared/utils/icons.js");

const gridIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "3",
  width: "7",
  height: "7"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "14",
  y: "3",
  width: "7",
  height: "7"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "14",
  width: "7",
  height: "7"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "14",
  y: "14",
  width: "7",
  height: "7"
}));
const sliderIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "2",
  y: "6",
  width: "20",
  height: "12",
  rx: "2"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "15 12 19 12"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "5 12 9 12"
}));
const masonryIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "3",
  width: "7",
  height: "9"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "14",
  y: "3",
  width: "7",
  height: "5"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "14",
  y: "12",
  width: "7",
  height: "9"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "3",
  y: "16",
  width: "7",
  height: "5"
}));
const tickerIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "3",
  y1: "12",
  x2: "21",
  y2: "12"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "16 7 21 12 16 17"
}));
const quoteIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M9 7H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v3H4"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M19 7h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v3h-3"
}));
const mediaIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
  cx: "12",
  cy: "12",
  r: "9"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
  points: "10 8 16 12 10 16"
}));
const chartIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "4",
  y1: "20",
  x2: "4",
  y2: "12"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "10",
  y1: "20",
  x2: "10",
  y2: "4"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "16",
  y1: "20",
  x2: "16",
  y2: "9"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "22",
  y1: "20",
  x2: "22",
  y2: "15"
}));
const shieldIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M12 3l7 3v5c0 4.4-3 8.4-7 10-4-1.6-7-5.6-7-10V6z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "9 12 11 14 15 10"
}));
const feedbackIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "8",
  y1: "9",
  x2: "16",
  y2: "9"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "8",
  y1: "13",
  x2: "13",
  y2: "13"
}));

// Getting Started Tab Icons (same as b-slider)
const gutenbergTabIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
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
  x: "3",
  y: "14",
  width: "7",
  height: "7",
  rx: "1"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  x: "14",
  y: "14",
  width: "7",
  height: "7",
  rx: "1"
}));
const shortcodeTabIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 16,
  height: 16,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "16 18 22 12 16 6"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "8 6 2 12 8 18"
}));
const elementorTabIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 16,
  height: 16,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
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
}));
const phpTabIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 16,
  height: 16,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
  points: "14 2 14 8 20 8"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
  x1: "9",
  y1: "15",
  x2: "15",
  y2: "15"
}));



const slug = "b-testimonials-block";

/**
 * The icon for one demo card, by preview slug.
 *
 * Each card used to draw its category's icon, so all seven Grids & Lists demos
 * carried the same four-square glyph and the tile told you nothing the category
 * chip underneath it did not already say. These come from CHILD_BLOCKS_LIST --
 * the same list the block inserter and the canvas picker draw from -- so a block
 * looks like itself everywhere it appears.
 *
 * `b-testimonials` is the parent container and has no entry in that list, so it
 * takes the icon the block API already gives it in the inserter. Left to the
 * component's fallback it drew its category's four-square glyph -- the same icon
 * as the Minimalist Reviews Grid card two along from it.
 *
 * @param {string} demoSlug Preview slug, i.e. the block name after `bptmb/`.
 * @return {JSX.Element} Icon element.
 */
const demoBlockIcon = demoSlug => {
  const child = _shared_utils_childBlocks__WEBPACK_IMPORTED_MODULE_2__.CHILD_BLOCKS_LIST.find(block => block.name === `bptmb/${demoSlug}`);

  // 20px to match the category icons this replaces, which the card's own CSS
  // then sizes to 22px alongside them.
  return child ? (0,_shared_utils_icons__WEBPACK_IMPORTED_MODULE_3__.getLayoutSvgIcon)(child.icon, 20) : _shared_utils_icons__WEBPACK_IMPORTED_MODULE_3__.blockIcon.src;
};
const dashboardInfo = info => {
  const {
    version,
    isPremium,
    hasPro,
    adminUrl,
    demoBase = "/",
    demoUrls = {},
    demoIndex = "",
    licenseActiveNonce,
    deleteDataOnUninstall = false,
    uninstallNonce = "",
    disabledBlocks = []
  } = info;
  const proSuffix = isPremium ? " Pro" : "";
  return {
    /*
     * "Testimonials", not the plugin's registered "B Testimonials Block".
     *
     * This is the name the dashboard prints in three places -- the header
     * wordmark, "Welcome to {name}" on the Welcome page, and "See the {name} in
     * action" on Demos -- and next to the bPlugins mark in every one of them the
     * "B" and the "Block" are saying what the surrounding chrome already says.
     * The plugin's real name is untouched everywhere it identifies the plugin
     * rather than decorates a heading: the Plugin Name header, the readme title,
     * the block titles and `slug` below.
     */
    name: `Testimonials${proSuffix}`,
    displayName: `B Testimonials Block${proSuffix} - Show Customer Reviews, Ratings, Badges & Video Testimonials`,
    description: "Testimonials is a WordPress plugin that lets you showcase customer reviews, star ratings, video testimonials, trust badges, and interactive feedback forms.",
    slug,
    version,
    isPremium,
    hasPro,
    // Drives the Header's own "Our Plugins" button in the top-right corner.
    // It links to `#our-plugins`, so the matching route in App.js has to stay
    // even though the page is deliberately absent from the nav.
    displayOurPlugins: true,
    media: {
      // No `?rev=` pin: the pinned revision kept serving the icon as it was at
      // that upload, so replacing the artwork on wp.org never reached the
      // dashboard. Unpinned, the listing's current icon is always what shows.
      logo: `https://ps.w.org/${slug}/assets/icon.svg`,
      banner: `https://ps.w.org/${slug}/assets/banner-1544x500.png`,
      // The Welcome hero's artwork. Vector and bundled -- see the module
      // for why it is a string rather than an imported .svg.
      thumbnail: _assets_welcomeBanner__WEBPACK_IMPORTED_MODULE_1__["default"],
      // video: 'https://www.youtube.com/watch?v=DOvUG5ArWHE&t=3s',
      isYoutube: true
    },
    pages: {
      org: `https://wordpress.org/plugins/${slug}/`,
      docs: `https://bplugins.com/docs/${slug}/`,
      pricing: `https://bplugins.com/products/${slug}/pricing`
    },
    adminUrl,
    demoBase,
    // Reach App, which hands them to demoInfo() and allBlocksInfo().
    // Resolved in PHP by bpbtb_demo_url() rather than assembled here: that is
    // the one place that decides where a demo lives, so pointing the plugin at
    // a hosted demo site later is a filter rather than an edit in every screen
    // that links to one -- and a filter may change the shape of the URL, not
    // only its host, which a base plus a pattern in JS could not follow.
    demoUrls,
    demoIndex,
    licenseActiveNonce,
    deleteDataOnUninstall,
    uninstallNonce,
    // The All Blocks page's starting state, straight from the option.
    disabledBlocks,
    startButton: {
      label: "Add Testimonial Block",
      url: `${adminUrl}post-new.php?post_type=page`
    }
  };
};

/**
 * Live demos, one per block.
 *
 * Every block the plugin registers is listed here -- the page previously showed
 * 9 hand-picked demos out of 40, so most blocks had no entry at all.
 *
 * The previews are rendered by this install, not fetched from a demo site:
 * `includes/demo-preview.php` answers `?bpbtb_demo=<slug>` with the real block.
 * The external host these used to point at (b-testimonials.bplugins.com) has no
 * DNS record, so every one of them opened an unreachable page -- and a working
 * external site would still drift out of step with the blocks over time. Local
 * previews are live, interactive, and cannot go stale.
 *
 * Each slug is the block name after the `bptmb/` prefix, which is what
 * demo-preview.php looks up in the block registry. That is usually the
 * directory name under src/blocks/, but not always: `src/blocks/testimonials`
 * registers `bptmb/b-testimonials`.
 */
const demoGroups = [{
  icon: gridIcon,
  title: "Grids & Lists",
  blocks: [
  // `bptmb/b-testimonials`, not `bptmb/testimonials` -- the one block
  // whose registered name differs from its directory.
  //
  // "Testimonials" rather than the registered "B Testimonials Block", for
  // the reason the dashboard's own `name` gives: beside the plugin's
  // wordmark and inside a page listing this plugin's blocks, the "B" and the
  // "Block" repeat what the surrounding chrome already says. The block's
  // registered title is untouched -- this is the label these two screens
  // print, not the name it identifies itself by.
  ["b-testimonials", "Testimonials"], ["testimonials-grid-2", "Centered Cards Grid"], ["testimonials-grid-3", "Gradient Border Grid"], ["testimonials-grid-minimal", "Minimalist Reviews Grid"], ["testimonials-list", "Testimonials List"], ["testimonials-compact", "Compact Reviews List"], ["testimonials-avatar-list", "Avatar Reviews List"]]
}, {
  icon: masonryIcon,
  title: "Masonry & Stacks",
  blocks: [["testimonials-masonry", "Testimonials Masonry"], ["testimonials-card-stack", "Stacked Review Cards"], ["testimonials-floating-bubble", "Floating Avatar Bubbles"]]
}, {
  icon: sliderIcon,
  title: "Sliders & Carousels",
  blocks: [["testimonials-slider", "Testimonials Slider"], ["testimonials-carousel-2", "Coverflow Carousel"], ["testimonials-slider-3d", "3D Flip Perspective Carousel"]]
}, {
  icon: tickerIcon,
  title: "Marquee & Toasts",
  blocks: [["testimonials-marquee", "Testimonials Marquee"], ["social-proof-toast", "Social Proof Toast"]]
}, {
  icon: quoteIcon,
  title: "Spotlight & Story",
  blocks: [["testimonials-hero", "Hero Testimonial Spotlight"], ["testimonials-quote-box", "Quote Box Showcase"], ["testimonials-speech-bubble", "Speech Bubble Cards"], ["testimonials-timeline", "Customer Journey Timeline"], ["case-study-card", "Customer Case Study"]]
}, {
  icon: mediaIcon,
  title: "Video & Audio",
  blocks: [["video-testimonials", "Video Testimonials"], ["audio-testimonials", "Audio Testimonials"], ["before-after", "Before / After"]]
}, {
  icon: chartIcon,
  title: "Ratings & Stats",
  blocks: [["rating-summary", "Rating Summary"], ["star-rating-bars", "Star Rating Progress Bars"], ["testimonial-stats", "Testimonial Stats"], ["comparison-testimonial-table", "Comparison Review Table"]]
}, {
  icon: shieldIcon,
  title: "Badges & Trust",
  blocks: [["google-review-badge", "Google Reviews Badge"], ["facebook-review-badge", "Facebook Recommendation Badge"], ["g2-review-badge", "G2 Review Badge"], ["capterra-review-badge", "Capterra Score Badge"], ["trustpilot-review-badge", "Trustpilot Score Badge"], ["review-badge-widget", "Floating Review Badge"], ["verified-buyer-badge", "Verified Buyer Trust Seal"], ["trust-badges", "Trust Badges"], ["client-logos", "Client Logos"]]
}, {
  icon: feedbackIcon,
  title: "Feedback & Forms",
  blocks: [["testimonial-form", "Testimonial Form"], ["user-feedback-poll", "Feedback & NPS Poll"], ["faq-testimonial-accordion", "FAQ Review Accordion"], ["testimonials-popup-modal", "Popup Modal Review Trigger"]]
}];

/**
 * Where one block's demo lives.
 *
 * The map comes from PHP's bpbtb_demo_url(), which is the single place that
 * decides that -- this install's preview page today, a hosted demo site once one
 * exists. The old `demoBase + "?bpbtb_demo=" + slug` is kept only as the answer
 * for a block the map does not carry, which is any block switched off on the All
 * Blocks screen. Those previews 404, and always did; the card is what should
 * stop being offered, not the URL that should be invented.
 *
 * @param {Object} demoUrls Preview slug => URL.
 * @param {string} demoBase Site home URL, the fallback's base.
 * @param {string} slug     Preview slug.
 * @return {string} Absolute URL.
 */
const blockDemoUrl = (demoUrls, demoBase, slug) => demoUrls?.[slug] || `${demoBase}?bpbtb_demo=${slug}`;

/**
 * @param {string} demoBase Site home URL, passed through from home_url( '/' ).
 * @param {Object} demoUrls Preview slug => URL, resolved in PHP.
 */
/**
 * A demo group whose `icon` answers with the icon of the child being read.
 *
 * The Demos screen draws one glyph per card, and it takes it from the group
 * rather than the card: `processCard` sets `categoryIcon: demo.icon` for every
 * child, and the card renders `categoryIcon`. The child's own `icon` -- the one
 * `demoInfo` sets below, the one the block shows in the inserter -- is spread
 * onto the card and then never read. So all seven Grids & Lists cards drew the
 * same four-square glyph, and the tile said nothing the category chip under it
 * did not already say.
 *
 * The fix belongs in that component (`categoryIcon: cardData.icon || demo.icon`,
 * one line, and every bPlugins dashboard gets it at once). Until that lands this
 * does it from our side, without touching bpl-tools.
 *
 * `children` is a Proxy: reading an index records which child it handed over,
 * and `icon` is a getter that answers with that child's icon. The screen reads
 * them in exactly that order --
 *
 *     demo.children.forEach( child => cards.push( processCard( child ) ) )
 *
 * -- so `children[i]` is always read immediately before the `demo.icon` that
 * describes it. The answer is keyed to the child that was handed over, not to a
 * running count, so a second read of `icon` for the same card repeats that
 * card's icon instead of shuffling the group out of step. Anything reading
 * `icon` before touching a child at all gets the group icon, which is what the
 * screen drew before this existed.
 *
 * The group is built here and returned whole rather than spread into a literal
 * at the call site: spreading an object reads its getters, which would freeze
 * `icon` at the fallback before the screen ever saw a card.
 *
 * @param {string}      title     The category name, printed on the card's chip.
 * @param {JSX.Element} groupIcon The group's own glyph, and the fallback.
 * @param {Array}       children  Demo cards, each carrying its own `icon`.
 * @return {Object} One entry for `demoInfo().demos`.
 */
const perCardIcons = (title, groupIcon, children) => {
  let current = null;
  const group = {
    title,
    children: new Proxy(children, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        // Array indices arrive as strings; `length`, `forEach` and the iterator
        // symbol must not count as handing over a card.
        if ("string" === typeof prop && String(Number(prop)) === prop) {
          current = value;
        }
        return value;
      }
    })
  };
  Object.defineProperty(group, "icon", {
    enumerable: true,
    get: () => current?.icon || groupIcon
  });
  return group;
};
const demoInfo = (demoBase = "/", demoUrls = {}) => ({
  allInOneLabel: "Browse All Blocks",
  // The plugin's own block list, rather than an off-site demo index.
  allInOneLink: `${demoBase}wp-admin/edit.php?post_type=testimonial&page=bpbtb-dashboard#/welcome`,
  demos: demoGroups.map(({
    icon,
    title,
    blocks
  }) => perCardIcons(title, icon, blocks.map(([slug, label]) => ({
    title: label,
    type: "iframe",
    url: blockDemoUrl(demoUrls, demoBase, slug),
    // The block's own icon rather than this group's -- see demoBlockIcon().
    icon: demoBlockIcon(slug)
  }))))
});

/**
 * Every block, grouped, in the shape bpl-tools' Admin/Blocks expects.
 *
 * Built from the same `demoGroups` the Demos route uses, so the two screens
 * cannot disagree about what exists or what it is called, and each block carries
 * the icon it shows in the inserter rather than its category's.
 *
 * `name` is the registered block name -- `bptmb/` plus the preview slug for all
 * but the parent, whose directory and registered name differ, which is why the
 * list stores the slug and the name is derived here in one place.
 *
 * `demo` is the live preview this install serves; the component renders it as
 * the card's demo button and opens it in a new tab.
 *
 * The parent block is marked `required`: every other block is its child, so
 * switching it off would take all forty with it and leave this page unable to
 * switch any of them back on. The component locks a required block's toggle on
 * and badges it, and Deactivate All skips it.
 *
 * @param {string} demoBase Site home URL, for the live preview links.
 * @param {Object} demoUrls Preview slug => URL, resolved in PHP.
 * @return {Array} Groups with `title` and `children`.
 */
const allBlocksInfo = (demoBase = "/", demoUrls = {}) => demoGroups.map(({
  title,
  blocks
}) => ({
  title,
  children: blocks.map(([slug, label]) => ({
    name: `bptmb/${slug}`,
    title: label,
    icon: demoBlockIcon(slug),
    demo: blockDemoUrl(demoUrls, demoBase, slug),
    required: "b-testimonials" === slug
  }))
}));
const welcomeInfo = adminUrl => ({
  keywords: ["Grid", "Slider", "Video", "Form", "Badges"],
  keywordsLabel: "Select Testimonial Layout",
  gettingStarted: {
    tabs: [{
      key: "gutenberg",
      label: "Gutenberg",
      icon: gutenbergTabIcon,
      steps: [{
        num: 1,
        title: "Add the Testimonials",
        body: "Open the block editor on any post or page. Click the <strong>+</strong> icon in the top-left corner or type <strong>/b testimonials</strong> to find and insert the B Testimonials block.",
        link: {
          url: `${adminUrl}post-new.php?post_type=page`,
          label: "Open Editor"
        }
      }, {
        num: 2,
        title: "Choose Layout & Child Block",
        body: "Select from <strong>40+ modern layouts</strong> (Grid, Slider, Video, Marquee, Rating Summary, Feedback Form) on the canvas or via the Popup Modal."
      }, {
        num: 3,
        title: "Configure Content Source",
        body: "Choose between <strong>Manual Items</strong> or <strong>Testimonials CPT</strong> (reusable testimonials managed under Testimonials menu)."
      }, {
        num: 4,
        title: "Publish",
        body: "Once everything is configured, click Publish. Make sure you have entered the <strong>Name</strong>, <strong>Designation</strong>, <strong>Review Text</strong>, and <strong>Rating</strong>."
      }]
    }, {
      key: "shortcode",
      label: "ShortCode",
      icon: shortcodeTabIcon,
      steps: [{
        num: 1,
        title: "Create & Publish a Testimonial",
        body: "Go to <strong>Testimonials &rsaquo; All Testimonials</strong>, click <strong>Add New</strong>, fill in the review details, and publish.",
        link: {
          url: `${adminUrl}edit.php?post_type=testimonial`,
          label: "All Testimonials"
        }
      }, {
        num: 2,
        title: "Copy the Classic Shortcode",
        body: "In the <strong>All Testimonials</strong> list, click the shortcode in the <strong>Classic Shortcode</strong> column to copy it (e.g. <code>[testimonial id=123]</code>) — it renders that single review."
      }, {
        num: 3,
        title: "Or Copy a Block Shortcode",
        body: "Go to <strong>Testimonials &rsaquo; Shortcode</strong>, pick a layout (grid, slider, video, and more), publish it, then copy the <strong>Block Shortcode</strong> shown above the block (e.g. <code>[testimonials_block id=456]</code>) — it renders that whole saved layout.",
        link: {
          url: `${adminUrl}edit.php?post_type=testimonials-block`,
          label: "Testimonials Shortcode"
        }
      }, {
        num: 4,
        title: "Paste It Anywhere",
        body: "Drop either shortcode into any post, page, widget, or page-builder row. Edit the source once and every copy updates."
      }]
    }, {
      key: "elementor",
      label: "Elementor",
      icon: elementorTabIcon,
      steps: [{
        num: 1,
        title: "Create Testimonials",
        body: "Go to <strong>Testimonials &rsaquo; All Testimonials</strong>, click <strong>Add New</strong>, fill in the details (name, rating, review, designation), and publish.",
        link: {
          url: `${adminUrl}edit.php?post_type=testimonial`,
          label: "All Testimonials"
        }
      }, {
        num: 2,
        title: "Add a Shortcode Widget",
        body: "Open the Elementor editor on any page. Search for the <strong>Shortcode</strong> widget and drag it to your desired location on the canvas."
      }, {
        num: 3,
        title: "Enter & Preview",
        body: "Paste the block shortcode or use the <strong>Gutenberg Block</strong> widget in Elementor to embed the B Testimonials block directly."
      }]
    }, {
      key: "php",
      label: "Theme / PHP",
      icon: phpTabIcon,
      steps: [{
        num: 1,
        title: "Create Testimonials",
        body: "Go to <strong>Testimonials &rsaquo; All Testimonials</strong>, click <strong>Add New</strong>, configure your testimonial details, then publish.",
        link: {
          url: `${adminUrl}edit.php?post_type=testimonial`,
          label: "All Testimonials"
        }
      }, {
        num: 2,
        title: "Open Your Template",
        body: "Open the theme template file where you want to display testimonials — for example <code>single.php</code>, <code>page.php</code>, or a custom template part."
      }, {
        num: 3,
        title: "Use WP_Query",
        body: "Query testimonials with <code>&lt;?php $testimonials = get_posts(['post_type' =&gt; 'testimonial', 'posts_per_page' =&gt; 6]); ?&gt;</code> and loop through them to render in your custom HTML template."
      }]
    }]
  },
  changelogs: [{
    version: "1.0.5 - 10 September 2026",
    type: "new",
    list: ["<strong>New</strong> Schema.org structured data. Every testimonial block now feeds Review and AggregateRating JSON-LD, which is what Google reads to show star ratings in search results. It is on by default and needs no setup.", "<strong>New</strong> One consolidated document per page rather than one per block, so a page carrying a grid and a slider no longer publishes two competing aggregate ratings — which search engines treat as a markup error rather than as two ratings.", "<strong>New</strong> A Rating Summary block carrying a real average and review count declares the page's aggregate rating outright, in preference to averaging whichever testimonials happen to be on screen.", "<strong>New</strong> Six filters for developers — see the Developers section.", "<strong>Performance</strong> The editor bundle is 81% smaller — 3.89 MB down to 723 KB. The icon picker's three icon sets (Font Awesome, Bootstrap and Lucid) come to 3.35 MB of JSON, and they were compiled into the bundle every one of the forty blocks shares. Opening the editor downloaded and parsed all of it before a single block was on the canvas, whether or not anyone went near an icon. They are now fetched on demand, when the Icon panel is actually opened.", "<strong>Performance</strong> No change to what the picker does or how icons are stored — the same three sets, still saved as inline SVG.", "<strong>Block patterns</strong> Seven ready-made sections, under \"Testimonials & Social Proof\" in the inserter: Wall of Love, SaaS Hero with Rating, E-commerce Social Proof, Agency Results & Testimonials, Review Platform Trust Bar, Scrolling Testimonial Marquee and Ask for a Review.", "<strong>Block patterns</strong> Each arrives as a finished section — heading, layout, spacing and sample testimonials — rather than as a single default block to build out by hand."]
  }, {
    version: "1.0.4 - 19 August 2026",
    type: "new",
    list: ["<strong>New</strong> Popup panel for the Popup Modal Review Trigger — the modal was inline styles no panel could reach.", "<strong>New</strong> Poll Style, Badge Score, FAQ row box and Trust Badges box/icon/text panels.", "<strong>New</strong> Field label, placeholder and input styling controls for the Testimonial Form and NPS Poll.", "<strong>New</strong> Badge Logo size control for the Google, Capterra, Facebook, Trustpilot and G2 marks.", "<strong>New</strong> Alignment control for the review badges and Social Proof Toast.", "<strong>New</strong> Corner wash, card hover, header strip, avatar ring and card corner tint controls.", "<strong>Improvement</strong> Gradient Border Grid now draws the gradient border and star badges it is named for.", "<strong>Improvement</strong> Trust Badges Icon panel follows the Badges repeater, one slot per badge.", "<strong>Improvement</strong> Speech Bubble tail colour pickers show the colour actually in use.", "<strong>Fix</strong> Trust Badges editor preview now draws the same icon and colour per badge as the page.", "<strong>Fix</strong> Corner wash and card hover now reach every card the Card panel paints.", "<strong>Fix</strong> Client Logos hover restores colour inside the editor.", "<strong>Fix</strong> Before / After slider releases from the pointer when the drag ends."]
  }, {
    version: "1.0.3",
    type: "new",
    list: ["<strong>New</strong> Expanded to 40+ child block layouts, plus social proof and rating badges.", "<strong>New</strong> Testimonials CPT, Customer Submissions dashboard and NPS Poll dashboard.", "<strong>New</strong> Block Switcher — change layout from the sidebar without losing content.", "<strong>Fix</strong> Security hardening: output escaping, input sanitization and nonce verification."]
  }, {
    version: "1.0.2 - 24 July 2026",
    type: "new",
    list: ["<strong>New</strong> Added modern React Admin Dashboard.", "<strong>New</strong> Added 28 new child blocks (40 total child blocks).", "<strong>New</strong> Added Customer Submissions Management System."]
  }],
  changelogsLimit: 5,
  changelogsReadMoreLabel: "View More Changelogs",
  proFeatures: ["40+ Modern Child Block Layouts & Widgets", "Full Testimonials CPT & Reusable Content Source", "Customer Submissions & Review Management Dashboard", "Video Lightbox Playback (YouTube, Vimeo, MP4)", "Continuous Marquee Scrolling Ticker", "Star Rating Progress Bar Breakdown", "Google, Trustpilot & G2 Review Badges"]
});

/***/ },

/***/ "./src/shared/utils/childBlocks.js"
/*!*****************************************!*\
  !*** ./src/shared/utils/childBlocks.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CHILD_BLOCKS_LIST: () => (/* binding */ CHILD_BLOCKS_LIST),
/* harmony export */   CHILD_BLOCK_CATEGORIES: () => (/* binding */ CHILD_BLOCK_CATEGORIES),
/* harmony export */   getChildBlockCategoryLabel: () => (/* binding */ getChildBlockCategoryLabel)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Every child block the switcher can insert, with the icon key each one uses.
 *
 * Data only -- kept out of BlockSwitcherModal so that utils/icons can derive
 * per-block inserter icons from it without importing a React component.
 */
const CHILD_BLOCKS_LIST = [
// Original 12 Blocks
{
  name: "bptmb/testimonials-slider",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Testimonials Slider", "b-testimonials-block"),
  category: "layouts",
  icon: "slides",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Interactive carousel slider with navigation dots.", "b-testimonials-block"),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Slider", "b-testimonials-block")
}, {
  name: "bptmb/testimonials-list",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Testimonials List", "b-testimonials-block"),
  category: "layouts",
  icon: "editor-ul",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Clean, vertical list representation of reviews.", "b-testimonials-block")
}, {
  name: "bptmb/testimonials-masonry",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Testimonials Masonry", "b-testimonials-block"),
  category: "layouts",
  icon: "dashboard",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Staggered grid layout for variable height cards.", "b-testimonials-block")
}, {
  name: "bptmb/testimonials-marquee",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Testimonials Marquee", "b-testimonials-block"),
  category: "layouts",
  icon: "marquee-scroll",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Smooth infinite ticker tape / scrolling reviews.", "b-testimonials-block"),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("New", "b-testimonials-block")
}, {
  name: "bptmb/rating-summary",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Rating Summary", "b-testimonials-block"),
  category: "social",
  icon: "star-filled",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Overall score & star rating distribution summary.", "b-testimonials-block")
}, {
  name: "bptmb/testimonial-stats",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Testimonial Stats", "b-testimonials-block"),
  category: "social",
  icon: "chart-bar",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Key statistics, satisfaction percentages & counters.", "b-testimonials-block")
}, {
  name: "bptmb/trust-badges",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Trust Badges", "b-testimonials-block"),
  category: "social",
  icon: "shield",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Security, guarantee, and award badges.", "b-testimonials-block")
}, {
  name: "bptmb/client-logos",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Client Logos", "b-testimonials-block"),
  category: "social",
  icon: "groups",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Showcase brand and client logos in grid or carousel.", "b-testimonials-block")
}, {
  name: "bptmb/video-testimonials",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Video Testimonials", "b-testimonials-block"),
  category: "media",
  icon: "video-alt3",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Video reviews with lightbox popup playback.", "b-testimonials-block"),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Video", "b-testimonials-block")
}, {
  name: "bptmb/before-after",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Before & After", "b-testimonials-block"),
  category: "media",
  icon: "image-flip-horizontal",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Comparison showcase for results & transformation.", "b-testimonials-block")
}, {
  name: "bptmb/testimonial-form",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Testimonial Form", "b-testimonials-block"),
  category: "interactive",
  icon: "feedback",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Frontend form for collecting customer reviews.", "b-testimonials-block")
},
// 20 New Blocks
{
  name: "bptmb/testimonials-grid-2",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Centered Cards Grid", "b-testimonials-block"),
  category: "layouts",
  icon: "grid-centered",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Sleek centered profile and testimonial card grid.", "b-testimonials-block"),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Popular", "b-testimonials-block")
}, {
  name: "bptmb/testimonials-grid-3",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Gradient Border Grid", "b-testimonials-block"),
  category: "layouts",
  icon: "grid-gradient",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Modern gradient border cards with star badges.", "b-testimonials-block")
}, {
  name: "bptmb/testimonials-carousel-2",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Coverflow Carousel", "b-testimonials-block"),
  category: "layouts",
  icon: "columns",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Center-focused 3D coverflow carousel slider.", "b-testimonials-block"),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("3D", "b-testimonials-block")
}, {
  name: "bptmb/testimonials-compact",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Compact Reviews List", "b-testimonials-block"),
  category: "layouts",
  icon: "excerpt-view",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Space-saving minimal customer testimonial list.", "b-testimonials-block")
}, {
  name: "bptmb/testimonials-avatar-list",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Avatar Reviews List", "b-testimonials-block"),
  category: "layouts",
  icon: "avatar-list",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Prominent avatar & customer spotlight review rows.", "b-testimonials-block")
}, {
  name: "bptmb/testimonials-quote-box",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Quote Box Showcase", "b-testimonials-block"),
  category: "layouts",
  icon: "format-quote",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Bold quote mark styling with accent backgrounds.", "b-testimonials-block")
}, {
  name: "bptmb/testimonials-speech-bubble",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Speech Bubble Cards", "b-testimonials-block"),
  category: "layouts",
  icon: "format-chat",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Chat bubble style testimonial cards.", "b-testimonials-block"),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Popular", "b-testimonials-block")
}, {
  name: "bptmb/testimonials-timeline",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Customer Journey Timeline", "b-testimonials-block"),
  category: "layouts",
  icon: "list-view",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Vertical timeline of customer success stories.", "b-testimonials-block")
}, {
  name: "bptmb/testimonials-card-stack",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Stacked Review Cards", "b-testimonials-block"),
  category: "layouts",
  icon: "index-card",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Overlapping stacked review card deck.", "b-testimonials-block")
}, {
  name: "bptmb/case-study-card",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Customer Case Study", "b-testimonials-block"),
  category: "layouts",
  icon: "welcome-learn-more",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Detailed case study card with metrics & quote.", "b-testimonials-block"),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Popular", "b-testimonials-block")
}, {
  name: "bptmb/google-review-badge",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Google Reviews Badge", "b-testimonials-block"),
  category: "social",
  icon: "google",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Official style Google Business score badge.", "b-testimonials-block"),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Badge", "b-testimonials-block")
}, {
  name: "bptmb/trustpilot-review-badge",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Trustpilot Score Badge", "b-testimonials-block"),
  category: "social",
  icon: "trustpilot",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Trustpilot style rating & review summary badge.", "b-testimonials-block"),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Badge", "b-testimonials-block")
}, {
  name: "bptmb/g2-review-badge",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("G2 Review Badge", "b-testimonials-block"),
  category: "social",
  icon: "awards",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("G2 / Capterra software review score badge.", "b-testimonials-block")
}, {
  name: "bptmb/review-badge-widget",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Floating Review Badge", "b-testimonials-block"),
  category: "social",
  icon: "sticky",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Corner / floating trust review badge widget.", "b-testimonials-block")
}, {
  name: "bptmb/star-rating-bars",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Star Rating Progress Bars", "b-testimonials-block"),
  category: "social",
  icon: "progress-bars",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("5-star rating breakdown bars & percentage stats.", "b-testimonials-block")
}, {
  name: "bptmb/social-proof-toast",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Social Proof Toast", "b-testimonials-block"),
  category: "social",
  icon: "testimonial",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Live social proof popup notification toast.", "b-testimonials-block"),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("New", "b-testimonials-block")
}, {
  name: "bptmb/audio-testimonials",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Audio Testimonials", "b-testimonials-block"),
  category: "media",
  icon: "controls-play",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Voice note & audio review player with wave style.", "b-testimonials-block"),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Audio", "b-testimonials-block")
}, {
  name: "bptmb/user-feedback-poll",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Feedback & NPS Poll", "b-testimonials-block"),
  category: "interactive",
  icon: "chart-pie",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Quick Net Promoter Score (NPS) feedback poll.", "b-testimonials-block")
}, {
  name: "bptmb/comparison-testimonial-table",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Comparison Review Table", "b-testimonials-block"),
  category: "interactive",
  icon: "table-col-after",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Side-by-side customer comparison table.", "b-testimonials-block")
}, {
  name: "bptmb/faq-testimonial-accordion",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("FAQ Review Accordion", "b-testimonials-block"),
  category: "interactive",
  icon: "arrow-down-alt2",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Collapsible FAQ & customer feedback accordion.", "b-testimonials-block")
},
// 8 New Blocks (40 Total)
{
  name: "bptmb/testimonials-hero",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Hero Testimonial Spotlight", "b-testimonials-block"),
  category: "layouts",
  icon: "superhero",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("High-impact hero banner with quote & CTA.", "b-testimonials-block"),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Hero", "b-testimonials-block")
}, {
  name: "bptmb/testimonials-grid-minimal",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Minimalist Reviews Grid", "b-testimonials-block"),
  category: "layouts",
  icon: "layout",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Clean monochrome review cards with subtle hover elevation.", "b-testimonials-block")
}, {
  name: "bptmb/testimonials-slider-3d",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("3D Flip Perspective Carousel", "b-testimonials-block"),
  category: "layouts",
  icon: "update",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Interactive 3D perspective flip card carousel slider.", "b-testimonials-block"),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("3D", "b-testimonials-block")
}, {
  name: "bptmb/testimonials-floating-bubble",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Floating Avatar Bubbles", "b-testimonials-block"),
  category: "social",
  icon: "bubbles",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Interactive floating customer avatar bubbles with popup tooltips.", "b-testimonials-block")
}, {
  name: "bptmb/facebook-review-badge",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Facebook Recommendation Badge", "b-testimonials-block"),
  category: "social",
  icon: "facebook",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Official style Facebook page recommendation & rating summary badge.", "b-testimonials-block"),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Badge", "b-testimonials-block")
}, {
  name: "bptmb/capterra-review-badge",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Capterra Score Badge", "b-testimonials-block"),
  category: "social",
  icon: "capterra",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Software review rating summary badge styled like Capterra.", "b-testimonials-block"),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Badge", "b-testimonials-block")
}, {
  name: "bptmb/verified-buyer-badge",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Verified Buyer Trust Seal", "b-testimonials-block"),
  category: "social",
  icon: "verified-seal",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("E-commerce verified purchase seal & satisfaction guarantee widget.", "b-testimonials-block")
}, {
  name: "bptmb/testimonials-popup-modal",
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Popup Modal Review Trigger", "b-testimonials-block"),
  category: "interactive",
  icon: "external",
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Clickable badge/button that opens a full review popup modal.", "b-testimonials-block"),
  badge: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("New", "b-testimonials-block")
}];

/**
 * The four categories every child block above belongs to, in display order.
 *
 * Shared rather than declared inside the switcher modal, which is where these
 * labels used to live: the canvas placeholder tags each of its cards with its
 * category too, and two copies of the list would drift the moment one screen was
 * renamed. `all` is a filter option, not a category a block can carry, so it is
 * kept separate.
 */
const CHILD_BLOCK_CATEGORIES = [{
  id: "layouts",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Grid & Layouts", "b-testimonials-block")
}, {
  id: "social",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Trust & Badges", "b-testimonials-block")
}, {
  id: "media",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Media & Audio", "b-testimonials-block")
}, {
  id: "interactive",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Forms & Polls", "b-testimonials-block")
}];

/**
 * Label for a category id, falling back to the id so an unlisted category still
 * renders something rather than an empty chip.
 *
 * @param {string} id Category id from CHILD_BLOCKS_LIST.
 * @return {string} Human-readable label.
 */
const getChildBlockCategoryLabel = id => CHILD_BLOCK_CATEGORIES.find(cat => cat.id === id)?.label || id;

/***/ },

/***/ "./src/shared/utils/icons.js"
/*!***********************************!*\
  !*** ./src/shared/utils/icons.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BRAND_COLOR: () => (/* binding */ BRAND_COLOR),
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

// bPlugins brand colour, used for the block icons and editor UI accents.
const BRAND_COLOR = '#146EF5';
const blockIconSvg = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
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

// Generic fallback icon, and the icon for the parent container block.
// `foreground` is the block API's own way to tint an icon.
const blockIcon = {
  src: blockIconSvg,
  foreground: BRAND_COLOR
};
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
    // Capterra's own mark is a set of quadrants -- distinct from the G2 medal.
    case 'capterra':
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
        d: "M3 3h8v8H3z"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M13 3h8v8h-8z"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M3 13h8v8H3z"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M13 13l8 8h-8z"
      }));
    // Horizontal ticker tape, so the marquee reads differently from a refresh.
    case 'marquee-scroll':
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
        width: "9",
        height: "10",
        rx: "2"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M14 9h7"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M14 12h5"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M14 15h7"
      }));
    // Ranked bars of differing length -- a rating distribution, not a bar chart.
    case 'progress-bars':
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
        d: "M3 6h18"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M3 12h12"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M3 18h7"
      }));
    // Rosette seal with a tick, distinct from the plain trust shield.
    case 'verified-seal':
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
        cy: "9",
        r: "6"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
        points: "9.5 9 11.5 11 14.5 7.5"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
        points: "8 14.5 6.5 21 12 18.5 17.5 21 16 14.5"
      }));
    // Overlapping avatars, distinct from the client-logos group icon.
    case 'avatar-list':
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
        cx: "8",
        cy: "12",
        r: "4"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M14 8.5a4 4 0 0 1 0 7"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M18 9.5a3 3 0 0 1 0 5"
      }));
    // A single centred card, for the centred-cards grid.
    case 'grid-centered':
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
        x: "7",
        y: "4",
        width: "10",
        height: "16",
        rx: "2"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M3 8v8"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M21 8v8"
      }));
    // Bordered card with an accent edge, for the gradient-border grid.
    case 'grid-gradient':
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
        height: "16",
        rx: "3"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M3 9h18"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M7 14h6"
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

/***/ "../bpl-tools/Admin/Blocks/style.scss"
/*!********************************************!*\
  !*** ../bpl-tools/Admin/Blocks/style.scss ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "../bpl-tools/Admin/Demos/style.scss"
/*!*******************************************!*\
  !*** ../bpl-tools/Admin/Demos/style.scss ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "../bpl-tools/Admin/Header/style.scss"
/*!********************************************!*\
  !*** ../bpl-tools/Admin/Header/style.scss ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "../bpl-tools/Admin/OurPlugins/style.scss"
/*!************************************************!*\
  !*** ../bpl-tools/Admin/OurPlugins/style.scss ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "../bpl-tools/Admin/Settings/style.scss"
/*!**********************************************!*\
  !*** ../bpl-tools/Admin/Settings/style.scss ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "../bpl-tools/Admin/Welcome/Changelog/style.scss"
/*!*******************************************************!*\
  !*** ../bpl-tools/Admin/Welcome/Changelog/style.scss ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "../bpl-tools/Admin/Welcome/GettingStarted/style.scss"
/*!************************************************************!*\
  !*** ../bpl-tools/Admin/Welcome/GettingStarted/style.scss ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "../bpl-tools/Admin/Welcome/Info/style.scss"
/*!**************************************************!*\
  !*** ../bpl-tools/Admin/Welcome/Info/style.scss ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "../bpl-tools/Admin/Welcome/Overview/style.scss"
/*!******************************************************!*\
  !*** ../bpl-tools/Admin/Welcome/Overview/style.scss ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "../bpl-tools/Admin/Welcome/ProAds/style.scss"
/*!****************************************************!*\
  !*** ../bpl-tools/Admin/Welcome/ProAds/style.scss ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "../bpl-tools/Admin/Welcome/style.scss"
/*!*********************************************!*\
  !*** ../bpl-tools/Admin/Welcome/style.scss ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "../bpl-tools/Components/Button/style.scss"
/*!*************************************************!*\
  !*** ../bpl-tools/Components/Button/style.scss ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/admin/dashboard.scss"
/*!**********************************!*\
  !*** ./src/admin/dashboard.scss ***!
  \**********************************/
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

/***/ "react-dom"
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
(module) {

module.exports = window["ReactDOM"];

/***/ },

/***/ "@wordpress/api-fetch"
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["apiFetch"];

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

/***/ "./node_modules/react-router/dist/development/chunk-KS7C4IRE.mjs"
/*!***********************************************************************!*\
  !*** ./node_modules/react-router/dist/development/chunk-KS7C4IRE.mjs ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

let react__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Action: () => (/* binding */ Action),
/* harmony export */   Await: () => (/* binding */ Await),
/* harmony export */   AwaitContextProvider: () => (/* binding */ AwaitContextProvider),
/* harmony export */   BrowserRouter: () => (/* binding */ BrowserRouter),
/* harmony export */   CRITICAL_CSS_DATA_ATTRIBUTE: () => (/* binding */ CRITICAL_CSS_DATA_ATTRIBUTE),
/* harmony export */   DataRouterContext: () => (/* binding */ DataRouterContext),
/* harmony export */   DataRouterStateContext: () => (/* binding */ DataRouterStateContext),
/* harmony export */   ENABLE_DEV_WARNINGS: () => (/* binding */ ENABLE_DEV_WARNINGS),
/* harmony export */   ErrorResponseImpl: () => (/* binding */ ErrorResponseImpl),
/* harmony export */   FetchersContext: () => (/* binding */ FetchersContext),
/* harmony export */   Form: () => (/* binding */ Form),
/* harmony export */   FrameworkContext: () => (/* binding */ FrameworkContext),
/* harmony export */   HashRouter: () => (/* binding */ HashRouter),
/* harmony export */   HistoryRouter: () => (/* binding */ HistoryRouter),
/* harmony export */   IDLE_BLOCKER: () => (/* binding */ IDLE_BLOCKER),
/* harmony export */   IDLE_FETCHER: () => (/* binding */ IDLE_FETCHER),
/* harmony export */   IDLE_NAVIGATION: () => (/* binding */ IDLE_NAVIGATION),
/* harmony export */   Link: () => (/* binding */ Link),
/* harmony export */   Links: () => (/* binding */ Links),
/* harmony export */   LocationContext: () => (/* binding */ LocationContext),
/* harmony export */   MemoryRouter: () => (/* binding */ MemoryRouter),
/* harmony export */   Meta: () => (/* binding */ Meta),
/* harmony export */   NO_BODY_STATUS_CODES: () => (/* binding */ NO_BODY_STATUS_CODES),
/* harmony export */   NavLink: () => (/* binding */ NavLink),
/* harmony export */   Navigate: () => (/* binding */ Navigate),
/* harmony export */   NavigationContext: () => (/* binding */ NavigationContext),
/* harmony export */   Outlet: () => (/* binding */ Outlet),
/* harmony export */   PROTOCOL_RELATIVE_URL_REGEX: () => (/* binding */ PROTOCOL_RELATIVE_URL_REGEX),
/* harmony export */   PrefetchPageLinks: () => (/* binding */ PrefetchPageLinks),
/* harmony export */   RSCRouterContext: () => (/* binding */ RSCRouterContext),
/* harmony export */   RemixErrorBoundary: () => (/* binding */ RemixErrorBoundary),
/* harmony export */   Route: () => (/* binding */ Route),
/* harmony export */   RouteContext: () => (/* binding */ RouteContext),
/* harmony export */   Router: () => (/* binding */ Router),
/* harmony export */   RouterContextProvider: () => (/* binding */ RouterContextProvider),
/* harmony export */   RouterProvider: () => (/* binding */ RouterProvider),
/* harmony export */   Routes: () => (/* binding */ Routes),
/* harmony export */   SINGLE_FETCH_REDIRECT_STATUS: () => (/* binding */ SINGLE_FETCH_REDIRECT_STATUS),
/* harmony export */   Scripts: () => (/* binding */ Scripts),
/* harmony export */   ScrollRestoration: () => (/* binding */ ScrollRestoration),
/* harmony export */   SingleFetchRedirectSymbol: () => (/* binding */ SingleFetchRedirectSymbol),
/* harmony export */   StaticRouter: () => (/* binding */ StaticRouter),
/* harmony export */   StaticRouterProvider: () => (/* binding */ StaticRouterProvider),
/* harmony export */   StreamTransfer: () => (/* binding */ StreamTransfer),
/* harmony export */   URL_LIMIT: () => (/* binding */ URL_LIMIT),
/* harmony export */   ViewTransitionContext: () => (/* binding */ ViewTransitionContext),
/* harmony export */   WithComponentProps: () => (/* binding */ WithComponentProps),
/* harmony export */   WithErrorBoundaryProps: () => (/* binding */ WithErrorBoundaryProps),
/* harmony export */   WithHydrateFallbackProps: () => (/* binding */ WithHydrateFallbackProps),
/* harmony export */   convertRoutesToDataRoutes: () => (/* binding */ convertRoutesToDataRoutes),
/* harmony export */   createBrowserHistory: () => (/* binding */ createBrowserHistory),
/* harmony export */   createBrowserRouter: () => (/* binding */ createBrowserRouter),
/* harmony export */   createClientRoutes: () => (/* binding */ createClientRoutes),
/* harmony export */   createClientRoutesWithHMRRevalidationOptOut: () => (/* binding */ createClientRoutesWithHMRRevalidationOptOut),
/* harmony export */   createContext: () => (/* binding */ createContext),
/* harmony export */   createHashHistory: () => (/* binding */ createHashHistory),
/* harmony export */   createHashRouter: () => (/* binding */ createHashRouter),
/* harmony export */   createMemoryHistory: () => (/* binding */ createMemoryHistory),
/* harmony export */   createMemoryRouter: () => (/* binding */ createMemoryRouter),
/* harmony export */   createPath: () => (/* binding */ createPath),
/* harmony export */   createRequestInit: () => (/* binding */ createRequestInit),
/* harmony export */   createRouter: () => (/* binding */ createRouter),
/* harmony export */   createRoutesFromChildren: () => (/* binding */ createRoutesFromChildren),
/* harmony export */   createRoutesFromElements: () => (/* binding */ createRoutesFromElements),
/* harmony export */   createSearchParams: () => (/* binding */ createSearchParams),
/* harmony export */   createServerRoutes: () => (/* binding */ createServerRoutes),
/* harmony export */   createStaticHandler: () => (/* binding */ createStaticHandler),
/* harmony export */   createStaticHandler2: () => (/* binding */ createStaticHandler2),
/* harmony export */   createStaticRouter: () => (/* binding */ createStaticRouter),
/* harmony export */   data: () => (/* binding */ data),
/* harmony export */   decodeRedirectErrorDigest: () => (/* binding */ decodeRedirectErrorDigest),
/* harmony export */   decodeRouteErrorResponseDigest: () => (/* binding */ decodeRouteErrorResponseDigest),
/* harmony export */   decodeViaTurboStream: () => (/* binding */ decodeViaTurboStream),
/* harmony export */   encode: () => (/* binding */ encode),
/* harmony export */   escapeHtml: () => (/* binding */ escapeHtml),
/* harmony export */   generatePath: () => (/* binding */ generatePath),
/* harmony export */   getManifestPath: () => (/* binding */ getManifestPath),
/* harmony export */   getPatchRoutesOnNavigationFunction: () => (/* binding */ getPatchRoutesOnNavigationFunction),
/* harmony export */   getPathsWithAncestors: () => (/* binding */ getPathsWithAncestors),
/* harmony export */   getSingleFetchDataStrategyImpl: () => (/* binding */ getSingleFetchDataStrategyImpl),
/* harmony export */   getStaticContextFromError: () => (/* binding */ getStaticContextFromError),
/* harmony export */   getTurboStreamSingleFetchDataStrategy: () => (/* binding */ getTurboStreamSingleFetchDataStrategy),
/* harmony export */   hasInvalidProtocol: () => (/* binding */ hasInvalidProtocol),
/* harmony export */   hydrationRouteProperties: () => (/* binding */ hydrationRouteProperties),
/* harmony export */   instrumentHandler: () => (/* binding */ instrumentHandler),
/* harmony export */   invariant: () => (/* binding */ invariant),
/* harmony export */   isDataWithResponseInit: () => (/* binding */ isDataWithResponseInit),
/* harmony export */   isMutationMethod: () => (/* binding */ isMutationMethod),
/* harmony export */   isRedirectResponse: () => (/* binding */ isRedirectResponse),
/* harmony export */   isRedirectStatusCode: () => (/* binding */ isRedirectStatusCode),
/* harmony export */   isResponse: () => (/* binding */ isResponse),
/* harmony export */   isRouteErrorResponse: () => (/* binding */ isRouteErrorResponse),
/* harmony export */   mapRouteProperties: () => (/* binding */ mapRouteProperties),
/* harmony export */   matchPath: () => (/* binding */ matchPath),
/* harmony export */   matchRoutes: () => (/* binding */ matchRoutes),
/* harmony export */   matchRoutesImpl: () => (/* binding */ matchRoutesImpl),
/* harmony export */   noActionDefinedError: () => (/* binding */ noActionDefinedError),
/* harmony export */   parsePath: () => (/* binding */ parsePath),
/* harmony export */   redirect: () => (/* binding */ redirect),
/* harmony export */   redirectDocument: () => (/* binding */ redirectDocument),
/* harmony export */   renderMatches: () => (/* binding */ renderMatches),
/* harmony export */   replace: () => (/* binding */ replace),
/* harmony export */   resolvePath: () => (/* binding */ resolvePath),
/* harmony export */   setIsHydrated: () => (/* binding */ setIsHydrated),
/* harmony export */   shouldHydrateRouteLoader: () => (/* binding */ shouldHydrateRouteLoader),
/* harmony export */   singleFetchUrl: () => (/* binding */ singleFetchUrl),
/* harmony export */   stripBasename: () => (/* binding */ stripBasename),
/* harmony export */   stripIndexParam: () => (/* binding */ stripIndexParam),
/* harmony export */   useActionData: () => (/* binding */ useActionData),
/* harmony export */   useAsyncError: () => (/* binding */ useAsyncError),
/* harmony export */   useAsyncValue: () => (/* binding */ useAsyncValue),
/* harmony export */   useBeforeUnload: () => (/* binding */ useBeforeUnload),
/* harmony export */   useBlocker: () => (/* binding */ useBlocker),
/* harmony export */   useFetcher: () => (/* binding */ useFetcher),
/* harmony export */   useFetchers: () => (/* binding */ useFetchers),
/* harmony export */   useFogOFWarDiscovery: () => (/* binding */ useFogOFWarDiscovery),
/* harmony export */   useFormAction: () => (/* binding */ useFormAction),
/* harmony export */   useHref: () => (/* binding */ useHref),
/* harmony export */   useInRouterContext: () => (/* binding */ useInRouterContext),
/* harmony export */   useLinkClickHandler: () => (/* binding */ useLinkClickHandler),
/* harmony export */   useLoaderData: () => (/* binding */ useLoaderData),
/* harmony export */   useLocation: () => (/* binding */ useLocation),
/* harmony export */   useMatch: () => (/* binding */ useMatch),
/* harmony export */   useMatches: () => (/* binding */ useMatches),
/* harmony export */   useNavigate: () => (/* binding */ useNavigate),
/* harmony export */   useNavigation: () => (/* binding */ useNavigation),
/* harmony export */   useNavigationType: () => (/* binding */ useNavigationType),
/* harmony export */   useOutlet: () => (/* binding */ useOutlet),
/* harmony export */   useOutletContext: () => (/* binding */ useOutletContext),
/* harmony export */   useParams: () => (/* binding */ useParams),
/* harmony export */   usePrompt: () => (/* binding */ usePrompt),
/* harmony export */   useResolvedPath: () => (/* binding */ useResolvedPath),
/* harmony export */   useRevalidator: () => (/* binding */ useRevalidator),
/* harmony export */   useRoute: () => (/* binding */ useRoute),
/* harmony export */   useRouteError: () => (/* binding */ useRouteError),
/* harmony export */   useRouteLoaderData: () => (/* binding */ useRouteLoaderData),
/* harmony export */   useRouterState: () => (/* binding */ useRouterState),
/* harmony export */   useRoutes: () => (/* binding */ useRoutes),
/* harmony export */   useScrollRestoration: () => (/* binding */ useScrollRestoration),
/* harmony export */   useSearchParams: () => (/* binding */ useSearchParams),
/* harmony export */   useSubmit: () => (/* binding */ useSubmit),
/* harmony export */   useViewTransitionState: () => (/* binding */ useViewTransitionState),
/* harmony export */   warnOnce: () => (/* binding */ warnOnce),
/* harmony export */   withComponentProps: () => (/* binding */ withComponentProps),
/* harmony export */   withErrorBoundaryProps: () => (/* binding */ withErrorBoundaryProps),
/* harmony export */   withHydrateFallbackProps: () => (/* binding */ withHydrateFallbackProps)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/**
 * react-router v7.18.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

// lib/router/url.ts
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i;
var PROTOCOL_RELATIVE_URL_REGEX = /^[\\/]{2}/;
function normalizeProtocolRelativeUrl(url, protocol) {
  return protocol + url.replace(/\\/g, "/");
}

// lib/router/history.ts
var Action = /* @__PURE__ */ ((Action2) => {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
  return Action2;
})(Action || {});
var PopStateEventType = "popstate";
function isLocation(obj) {
  return typeof obj === "object" && obj != null && "pathname" in obj && "search" in obj && "hash" in obj && "state" in obj && "key" in obj;
}
function createMemoryHistory(options = {}) {
  let { initialEntries = ["/"], initialIndex, v5Compat = false } = options;
  let entries;
  entries = initialEntries.map(
    (entry, index2) => createMemoryLocation(
      entry,
      typeof entry === "string" ? null : entry.state,
      index2 === 0 ? "default" : void 0,
      typeof entry === "string" ? void 0 : entry.mask
    )
  );
  let index = clampIndex(
    initialIndex == null ? entries.length - 1 : initialIndex
  );
  let action = "POP" /* Pop */;
  let listener = null;
  function clampIndex(n) {
    return Math.min(Math.max(n, 0), entries.length - 1);
  }
  function getCurrentLocation() {
    return entries[index];
  }
  function createMemoryLocation(to, state = null, key, mask) {
    let location = createLocation(
      entries ? getCurrentLocation().pathname : "/",
      to,
      state,
      key,
      mask
    );
    warning(
      location.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        to
      )}`
    );
    return location;
  }
  function createHref2(to) {
    return typeof to === "string" ? to : createPath(to);
  }
  let history = {
    get index() {
      return index;
    },
    get action() {
      return action;
    },
    get location() {
      return getCurrentLocation();
    },
    createHref: createHref2,
    createURL(to) {
      return new URL(createHref2(to), "http://localhost");
    },
    encodeLocation(to) {
      let path = typeof to === "string" ? parsePath(to) : to;
      return {
        pathname: path.pathname || "",
        search: path.search || "",
        hash: path.hash || ""
      };
    },
    push(to, state) {
      action = "PUSH" /* Push */;
      let nextLocation = isLocation(to) ? to : createMemoryLocation(to, state);
      index += 1;
      entries.splice(index, entries.length, nextLocation);
      if (v5Compat && listener) {
        listener({ action, location: nextLocation, delta: 1 });
      }
    },
    replace(to, state) {
      action = "REPLACE" /* Replace */;
      let nextLocation = isLocation(to) ? to : createMemoryLocation(to, state);
      entries[index] = nextLocation;
      if (v5Compat && listener) {
        listener({ action, location: nextLocation, delta: 0 });
      }
    },
    go(delta) {
      action = "POP" /* Pop */;
      let nextIndex = clampIndex(index + delta);
      let nextLocation = entries[nextIndex];
      index = nextIndex;
      if (listener) {
        listener({ action, location: nextLocation, delta });
      }
    },
    listen(fn) {
      listener = fn;
      return () => {
        listener = null;
      };
    }
  };
  return history;
}
function createBrowserHistory(options = {}) {
  function createBrowserLocation(window2, globalHistory) {
    let maskedLocation = globalHistory.state?.masked;
    let { pathname, search, hash } = maskedLocation || window2.location;
    return createLocation(
      "",
      { pathname, search, hash },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default",
      maskedLocation ? {
        pathname: window2.location.pathname,
        search: window2.location.search,
        hash: window2.location.hash
      } : void 0
    );
  }
  function createBrowserHref(window2, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(
    createBrowserLocation,
    createBrowserHref,
    null,
    options
  );
}
function createHashHistory(options = {}) {
  function createHashLocation(window2, globalHistory) {
    let {
      pathname = "/",
      search = "",
      hash = ""
    } = parsePath(window2.location.hash.substring(1));
    if (!pathname.startsWith("/") && !pathname.startsWith(".")) {
      pathname = "/" + pathname;
    }
    return createLocation(
      "",
      { pathname, search, hash },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createHashHref(window2, to) {
    let base = window2.document.querySelector("base");
    let href = "";
    if (base && base.getAttribute("href")) {
      let url = window2.location.href;
      let hashIndex = url.indexOf("#");
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }
    return href + "#" + (typeof to === "string" ? to : createPath(to));
  }
  function validateHashLocation(location, to) {
    warning(
      location.pathname.charAt(0) === "/",
      `relative pathnames are not supported in hash history.push(${JSON.stringify(
        to
      )})`
    );
  }
  return getUrlBasedHistory(
    createHashLocation,
    createHashHref,
    validateHashLocation,
    options
  );
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substring(2, 10);
}
function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index,
    masked: location.mask ? {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash
    } : void 0
  };
}
function createLocation(current, to, state = null, key, mask) {
  let location = {
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: "",
    ...typeof to === "string" ? parsePath(to) : to,
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey(),
    mask
  };
  return location;
}
function createPath({
  pathname = "/",
  search = "",
  hash = ""
}) {
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substring(hashIndex);
      path = path.substring(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substring(searchIndex);
      path = path.substring(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref2, validateLocation, options = {}) {
  let { window: window2 = document.defaultView, v5Compat = false } = options;
  let globalHistory = window2.history;
  let action = "POP" /* Pop */;
  let listener = null;
  let index = getIndex();
  if (index == null) {
    index = 0;
    globalHistory.replaceState({ ...globalHistory.state, idx: index }, "");
  }
  function getIndex() {
    let state = globalHistory.state || { idx: null };
    return state.idx;
  }
  function handlePop() {
    action = "POP" /* Pop */;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex;
    if (listener) {
      listener({ action, location: history.location, delta });
    }
  }
  function push(to, state) {
    action = "PUSH" /* Push */;
    let location = isLocation(to) ? to : createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex() + 1;
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location.mask || location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({ action, location: history.location, delta: 1 });
    }
  }
  function replace2(to, state) {
    action = "REPLACE" /* Replace */;
    let location = isLocation(to) ? to : createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex();
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location.mask || location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({ action, location: history.location, delta: 0 });
    }
  }
  function createURL(to) {
    return createBrowserURLImpl(window2, to);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref2(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace: replace2,
    go(n) {
      return globalHistory.go(n);
    }
  };
  return history;
}
function createBrowserURLImpl(windowImpl, to, isAbsolute = false) {
  let base = "http://localhost";
  if (windowImpl) {
    base = windowImpl.location.origin !== "null" ? windowImpl.location.origin : windowImpl.location.href;
  }
  invariant(base, "No window.location.(origin|href) available to create URL");
  let href = typeof to === "string" ? to : createPath(to);
  href = href.replace(/ $/, "%20");
  if (!isAbsolute && PROTOCOL_RELATIVE_URL_REGEX.test(href)) {
    href = base + href;
  }
  return new URL(href, base);
}

// lib/router/utils.ts
function createContext(defaultValue) {
  return { defaultValue };
}
var _map;
var RouterContextProvider = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(init) {
    __privateAdd(this, _map, /* @__PURE__ */ new Map());
    if (init) {
      for (let [context, value] of init) {
        this.set(context, value);
      }
    }
  }
  /**
   * Access a value from the context. If no value has been set for the context,
   * it will return the context's `defaultValue` if provided, or throw an error
   * if no `defaultValue` was set.
   * @param context The context to get the value for
   * @returns The value for the context, or the context's `defaultValue` if no
   * value was set
   */
  get(context) {
    if (__privateGet(this, _map).has(context)) {
      return __privateGet(this, _map).get(context);
    }
    if (context.defaultValue !== void 0) {
      return context.defaultValue;
    }
    throw new Error("No value found for context");
  }
  /**
   * Set a value for the context. If the context already has a value set, this
   * will overwrite it.
   *
   * @param context The context to set the value for
   * @param value The value to set for the context
   * @returns {void}
   */
  set(context, value) {
    __privateGet(this, _map).set(context, value);
  }
};
_map = new WeakMap();
var unsupportedLazyRouteObjectKeys = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function isUnsupportedLazyRouteObjectKey(key) {
  return unsupportedLazyRouteObjectKeys.has(
    key
  );
}
var unsupportedLazyRouteFunctionKeys = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function isUnsupportedLazyRouteFunctionKey(key) {
  return unsupportedLazyRouteFunctionKeys.has(
    key
  );
}
function isIndexRoute(route) {
  return route.index === true;
}
function convertRoutesToDataRoutes(routes, mapRouteProperties2, parentPath = [], manifest = {}, allowInPlaceMutations = false) {
  return routes.map((route, index) => {
    let treePath = [...parentPath, String(index)];
    let id = typeof route.id === "string" ? route.id : treePath.join("-");
    invariant(
      route.index !== true || !route.children,
      `Cannot specify children on an index route`
    );
    invariant(
      allowInPlaceMutations || !manifest[id],
      `Found a route id collision on id "${id}".  Route id's must be globally unique within Data Router usages`
    );
    if (isIndexRoute(route)) {
      let indexRoute = {
        ...route,
        id
      };
      manifest[id] = mergeRouteUpdates(
        indexRoute,
        mapRouteProperties2(indexRoute)
      );
      return indexRoute;
    } else {
      let pathOrLayoutRoute = {
        ...route,
        id,
        children: void 0
      };
      manifest[id] = mergeRouteUpdates(
        pathOrLayoutRoute,
        mapRouteProperties2(pathOrLayoutRoute)
      );
      if (route.children) {
        pathOrLayoutRoute.children = convertRoutesToDataRoutes(
          route.children,
          mapRouteProperties2,
          treePath,
          manifest,
          allowInPlaceMutations
        );
      }
      return pathOrLayoutRoute;
    }
  });
}
function mergeRouteUpdates(route, updates) {
  return Object.assign(route, {
    ...updates,
    ...typeof updates.lazy === "object" && updates.lazy != null ? {
      lazy: {
        ...route.lazy,
        ...updates.lazy
      }
    } : {}
  });
}
function matchRoutes(routes, locationArg, basename = "/") {
  return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial, precomputedBranches) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = precomputedBranches ?? flattenAndRankRoutes(routes);
  let matches = null;
  let decoded = decodePath(pathname);
  for (let i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(
      branches[i],
      decoded,
      allowPartial
    );
  }
  return matches;
}
function convertRouteMatchToUiMatch(match, loaderData) {
  let { route, pathname, params } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    loaderData: loaderData[route.id],
    handle: route.handle
  };
}
function flattenAndRankRoutes(routes) {
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  return branches;
}
function flattenRoutes(routes, branches = [], parentsMeta = [], parentPath = "", _hasParentOptionalSegments = false) {
  let flattenRoute = (route, index, hasParentOptionalSegments = _hasParentOptionalSegments, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      if (!meta.relativePath.startsWith(parentPath) && hasParentOptionalSegments) {
        return;
      }
      invariant(
        meta.relativePath.startsWith(parentPath),
        `Absolute route path "${meta.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      );
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        `Index routes must not have child routes. Please remove all child routes from route path "${path}".`
      );
      flattenRoutes(
        route.children,
        branches,
        routesMeta,
        path,
        hasParentOptionalSegments
      );
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta: routesMeta.map((meta2, i) => {
        let [matcher, params] = compilePath(
          meta2.relativePath,
          meta2.caseSensitive,
          i === routesMeta.length - 1
        );
        return {
          ...meta2,
          matcher,
          compiledParams: params
        };
      })
    });
  };
  routes.forEach((route, index) => {
    if (route.path === "" || !route.path?.includes("?")) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, true, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(
    ...restExploded.map(
      (subpath) => subpath === "" ? required : [required, subpath].join("/")
    )
  );
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map(
    (exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded
  );
}
function rankRouteBranches(branches) {
  branches.sort(
    (a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(
      a.routesMeta.map((meta) => meta.childrenIndex),
      b.routesMeta.map((meta) => meta.childrenIndex)
    )
  );
}
var paramRe = /^:[\w-]+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = (s) => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce(
    (score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue),
    initialScore
  );
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname, allowPartial = false) {
  let { routesMeta } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let pattern = {
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    };
    let match = (
      // Use precomputed matcher if it exists
      meta.matcher && meta.compiledParams ? matchPathImpl(
        pattern,
        remainingPathname,
        meta.matcher,
        meta.compiledParams
      ) : matchPath(pattern, remainingPathname)
    );
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath(
        {
          path: meta.relativePath,
          caseSensitive: meta.caseSensitive,
          end: false
        },
        remainingPathname
      );
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(
        joinPaths([matchedPathname, match.pathnameBase])
      ),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function generatePath(originalPath, params = {}) {
  let path = originalPath;
  if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
    warning(
      false,
      `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`
    );
    path = path.replace(/\*$/, "/*");
  }
  const prefix = path.startsWith("/") ? "/" : "";
  const stringify2 = (p) => p == null ? "" : typeof p === "string" ? p : String(p);
  const segments = path.split(/\/+/).map((segment, index, array) => {
    const isLastSegment = index === array.length - 1;
    if (isLastSegment && segment === "*") {
      return stringify2(params["*"]);
    }
    const keyMatch = segment.match(/^:([\w-]+)(\??)(.*)/);
    if (keyMatch) {
      const [, key, optional, suffix] = keyMatch;
      let param = params[key];
      invariant(optional === "?" || param != null, `Missing ":${key}" param`);
      return encodeURIComponent(stringify2(param)) + suffix;
    }
    return segment.replace(/\?$/g, "");
  }).filter((segment) => !!segment);
  return prefix + segments.join("/");
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = { path: pattern, caseSensitive: false, end: true };
  }
  let [matcher, compiledParams] = compilePath(
    pattern.path,
    pattern.caseSensitive,
    pattern.end
  );
  return matchPathImpl(pattern, pathname, matcher, compiledParams);
}
function matchPathImpl(pattern, pathname, matcher, compiledParams) {
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce(
    (memo2, { paramName, isOptional }, index) => {
      if (paramName === "*") {
        let splatValue = captureGroups[index] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      const value = captureGroups[index];
      if (isOptional && !value) {
        memo2[paramName] = void 0;
      } else {
        memo2[paramName] = (value || "").replace(/%2F/g, "/");
      }
      return memo2;
    },
    {}
  );
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive = false, end = true) {
  warning(
    path === "*" || !path.endsWith("*") || path.endsWith("/*"),
    `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`
  );
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (match, paramName, isOptional, index, str) => {
      params.push({ paramName, isOptional: isOptional != null });
      if (isOptional) {
        let nextChar = str.charAt(index + match.length);
        if (nextChar && nextChar !== "/") {
          return "/([^\\/]*)";
        }
        return "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  if (path.endsWith("*")) {
    params.push({ paramName: "*" });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else {
  }
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(
      false,
      `The URL path "${value}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${error}).`
    );
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
function prependBasename({
  basename,
  pathname
}) {
  return pathname === "/" ? basename : joinPaths([basename, pathname]);
}
var isAbsoluteUrl = (url) => ABSOLUTE_URL_REGEX.test(url);
function resolvePath(to, fromPathname = "/") {
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname;
  if (toPathname) {
    toPathname = removeDoubleSlashes(toPathname);
    if (toPathname.startsWith("/")) {
      pathname = resolvePathname(toPathname.substring(1), "/");
    } else {
      pathname = resolvePathname(toPathname, fromPathname);
    }
  } else {
    pathname = fromPathname;
  }
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = removeTrailingSlash(fromPathname).split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(
    path
  )}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function getPathContributingMatches(matches) {
  return matches.filter(
    (match, index) => index === 0 || match.route.path && match.route.path.length > 0
  );
}
function getResolveToMatches(matches) {
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches.map(
    (match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase
  );
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = { ...toArg };
    invariant(
      !to.pathname || !to.pathname.includes("?"),
      getInvalidPathError("?", "pathname", "search", to)
    );
    invariant(
      !to.pathname || !to.pathname.includes("#"),
      getInvalidPathError("#", "pathname", "hash", to)
    );
    invariant(
      !to.search || !to.search.includes("#"),
      getInvalidPathError("#", "search", "hash", to)
    );
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
var removeDoubleSlashes = (path) => path.replace(/[\\/]{2,}/g, "/");
var joinPaths = (paths) => removeDoubleSlashes(paths.join("/"));
var removeTrailingSlash = (path) => path.replace(/\/+$/, "");
var normalizePathname = (pathname) => removeTrailingSlash(pathname).replace(/^\/*/, "/");
var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
var DataWithResponseInit = class {
  constructor(data2, init) {
    this.type = "DataWithResponseInit";
    this.data = data2;
    this.init = init || null;
  }
};
function data(data2, init) {
  return new DataWithResponseInit(
    data2,
    typeof init === "number" ? { status: init } : init
  );
}
var redirect = (url, init = 302) => {
  let responseInit = init;
  if (typeof responseInit === "number") {
    responseInit = { status: responseInit };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }
  let headers = new Headers(responseInit.headers);
  headers.set("Location", url);
  return new Response(null, { ...responseInit, headers });
};
var redirectDocument = (url, init) => {
  let response = redirect(url, init);
  response.headers.set("X-Remix-Reload-Document", "true");
  return response;
};
var replace = (url, init) => {
  let response = redirect(url, init);
  response.headers.set("X-Remix-Replace", "true");
  return response;
};
var SUPPORTED_ERROR_TYPES = [
  "EvalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
];
var ErrorResponseImpl = class {
  constructor(status, statusText, data2, internal = false) {
    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;
    if (data2 instanceof Error) {
      this.data = data2.toString();
      this.error = data2;
    } else {
      this.data = data2;
    }
  }
};
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
function getRoutePattern(matches) {
  let parts = matches.map((m) => m.route.path).filter(Boolean);
  return joinPaths(parts) || "/";
}
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
function parseToInfo(_to, basename) {
  let to = _to;
  if (typeof to !== "string" || !ABSOLUTE_URL_REGEX.test(to)) {
    return {
      absoluteURL: void 0,
      isExternal: false,
      to
    };
  }
  let absoluteURL = to;
  let isExternal = false;
  if (isBrowser) {
    try {
      let currentUrl = new URL(window.location.href);
      let targetUrl = PROTOCOL_RELATIVE_URL_REGEX.test(to) ? new URL(normalizeProtocolRelativeUrl(to, currentUrl.protocol)) : new URL(to);
      let path = stripBasename(targetUrl.pathname, basename);
      if (targetUrl.origin === currentUrl.origin && path != null) {
        to = path + targetUrl.search + targetUrl.hash;
      } else {
        isExternal = true;
      }
    } catch (e) {
      warning(
        false,
        `<Link to="${to}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  }
  return {
    absoluteURL,
    isExternal,
    to
  };
}

// lib/router/instrumentation.ts
var UninstrumentedSymbol = Symbol("Uninstrumented");
function getRouteInstrumentationUpdates(fns, route) {
  let aggregated = {
    lazy: [],
    "lazy.loader": [],
    "lazy.action": [],
    "lazy.middleware": [],
    middleware: [],
    loader: [],
    action: []
  };
  fns.forEach(
    (fn) => fn({
      id: route.id,
      index: route.index,
      path: route.path,
      instrument(i) {
        let keys = Object.keys(aggregated);
        for (let key of keys) {
          if (i[key]) {
            aggregated[key].push(i[key]);
          }
        }
      }
    })
  );
  let updates = {};
  if (typeof route.lazy === "function" && aggregated.lazy.length > 0) {
    let instrumented = wrapImpl(aggregated.lazy, route.lazy, () => void 0);
    if (instrumented) {
      updates.lazy = instrumented;
    }
  }
  if (typeof route.lazy === "object") {
    let lazyObject = route.lazy;
    ["middleware", "loader", "action"].forEach((key) => {
      let lazyFn = lazyObject[key];
      let instrumentations = aggregated[`lazy.${key}`];
      if (typeof lazyFn === "function" && instrumentations.length > 0) {
        let instrumented = wrapImpl(instrumentations, lazyFn, () => void 0);
        if (instrumented) {
          updates.lazy = Object.assign(updates.lazy || {}, {
            [key]: instrumented
          });
        }
      }
    });
  }
  ["loader", "action"].forEach((key) => {
    let handler = route[key];
    if (typeof handler === "function" && aggregated[key].length > 0) {
      let original = handler[UninstrumentedSymbol] ?? handler;
      let instrumented = wrapImpl(
        aggregated[key],
        original,
        (...args) => getHandlerInfo(args[0])
      );
      if (instrumented) {
        if (key === "loader" && original.hydrate === true) {
          instrumented.hydrate = true;
        }
        instrumented[UninstrumentedSymbol] = original;
        updates[key] = instrumented;
      }
    }
  });
  if (route.middleware && route.middleware.length > 0 && aggregated.middleware.length > 0) {
    updates.middleware = route.middleware.map((middleware) => {
      let original = middleware[UninstrumentedSymbol] ?? middleware;
      let instrumented = wrapImpl(
        aggregated.middleware,
        original,
        (...args) => getHandlerInfo(args[0])
      );
      if (instrumented) {
        instrumented[UninstrumentedSymbol] = original;
        return instrumented;
      }
      return middleware;
    });
  }
  return updates;
}
function instrumentClientSideRouter(router, fns) {
  let aggregated = {
    navigate: [],
    fetch: []
  };
  fns.forEach(
    (fn) => fn({
      instrument(i) {
        let keys = Object.keys(i);
        for (let key of keys) {
          if (i[key]) {
            aggregated[key].push(i[key]);
          }
        }
      }
    })
  );
  if (aggregated.navigate.length > 0) {
    let navigate = router.navigate[UninstrumentedSymbol] ?? router.navigate;
    let instrumentedNavigate = wrapImpl(
      aggregated.navigate,
      navigate,
      (...args) => {
        let [to, opts] = args;
        return {
          to: typeof to === "number" || typeof to === "string" ? to : to ? createPath(to) : ".",
          ...getRouterInfo(router, opts ?? {})
        };
      }
    );
    if (instrumentedNavigate) {
      instrumentedNavigate[UninstrumentedSymbol] = navigate;
      router.navigate = instrumentedNavigate;
    }
  }
  if (aggregated.fetch.length > 0) {
    let fetch2 = router.fetch[UninstrumentedSymbol] ?? router.fetch;
    let instrumentedFetch = wrapImpl(aggregated.fetch, fetch2, (...args) => {
      let [key, , href, opts] = args;
      return {
        href: href ?? ".",
        fetcherKey: key,
        ...getRouterInfo(router, opts ?? {})
      };
    });
    if (instrumentedFetch) {
      instrumentedFetch[UninstrumentedSymbol] = fetch2;
      router.fetch = instrumentedFetch;
    }
  }
  return router;
}
function instrumentHandler(handler, fns) {
  let aggregated = {
    request: []
  };
  fns.forEach(
    (fn) => fn({
      instrument(i) {
        let keys = Object.keys(i);
        for (let key of keys) {
          if (i[key]) {
            aggregated[key].push(i[key]);
          }
        }
      }
    })
  );
  let instrumentedHandler = handler;
  if (aggregated.request.length > 0) {
    instrumentedHandler = wrapImpl(aggregated.request, handler, (...args) => {
      let [request, context] = args;
      return {
        request: getReadonlyRequest(request),
        context: context != null ? getReadonlyContext(context) : context
      };
    });
  }
  return instrumentedHandler;
}
function wrapImpl(impls, handler, getInfo) {
  if (impls.length === 0) {
    return null;
  }
  return async (...args) => {
    let result = await recurseRight(
      impls,
      getInfo(...args),
      () => handler(...args),
      impls.length - 1
    );
    if (result.type === "error") {
      throw result.value;
    }
    return result.value;
  };
}
async function recurseRight(impls, info, handler, index) {
  let impl = impls[index];
  let result;
  if (!impl) {
    try {
      let value = await handler();
      result = { type: "success", value };
    } catch (e) {
      result = { type: "error", value: e };
    }
  } else {
    let handlerPromise = void 0;
    let callHandler = async () => {
      if (handlerPromise) {
        console.error("You cannot call instrumented handlers more than once");
      } else {
        handlerPromise = recurseRight(impls, info, handler, index - 1);
      }
      result = await handlerPromise;
      invariant(result, "Expected a result");
      if (result.type === "error" && result.value instanceof Error) {
        return { status: "error", error: result.value };
      }
      return { status: "success", error: void 0 };
    };
    try {
      await impl(callHandler, info);
    } catch (e) {
      console.error("An instrumentation function threw an error:", e);
    }
    if (!handlerPromise) {
      await callHandler();
    }
    await handlerPromise;
  }
  if (result) {
    return result;
  }
  return {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function getHandlerInfo(args) {
  let { request, context, params, pattern } = args;
  return {
    request: getReadonlyRequest(request),
    params: { ...params },
    pattern,
    context: getReadonlyContext(context)
  };
}
function getRouterInfo(router, opts) {
  return {
    currentUrl: createPath(router.state.location),
    ..."formMethod" in opts ? { formMethod: opts.formMethod } : {},
    ..."formEncType" in opts ? { formEncType: opts.formEncType } : {},
    ..."formData" in opts ? { formData: opts.formData } : {},
    ..."body" in opts ? { body: opts.body } : {}
  };
}
function getReadonlyRequest(request) {
  return {
    method: request.method,
    url: request.url,
    headers: {
      get: (...args) => request.headers.get(...args)
    }
  };
}
function getReadonlyContext(context) {
  if (isPlainObject(context)) {
    let frozen = { ...context };
    Object.freeze(frozen);
    return frozen;
  } else {
    return {
      get: (ctx) => context.get(ctx)
    };
  }
}
var objectProtoNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function isPlainObject(thing) {
  if (thing === null || typeof thing !== "object") {
    return false;
  }
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === objectProtoNames;
}

// lib/router/router.ts
var validMutationMethodsArr = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
var validMutationMethods = new Set(
  validMutationMethodsArr
);
var validRequestMethodsArr = [
  "GET",
  ...validMutationMethodsArr
];
var validRequestMethods = new Set(validRequestMethodsArr);
var redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
var redirectPreserveMethodStatusCodes = /* @__PURE__ */ new Set([307, 308]);
var IDLE_NAVIGATION = {
  state: "idle",
  location: void 0,
  matches: void 0,
  historyAction: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
var IDLE_FETCHER = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
var IDLE_BLOCKER = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
};
var defaultMapRouteProperties = (route) => ({
  hasErrorBoundary: Boolean(route.hasErrorBoundary)
});
var TRANSITIONS_STORAGE_KEY = "remix-router-transitions";
var ResetLoaderDataSymbol = Symbol("ResetLoaderData");
var _routes, _branches, _hmrRoutes, _hmrBranches;
var DataRoutes = class {
  constructor(routes) {
    __privateAdd(this, _routes);
    __privateAdd(this, _branches);
    __privateAdd(this, _hmrRoutes);
    __privateAdd(this, _hmrBranches);
    __privateSet(this, _routes, routes);
    __privateSet(this, _branches, flattenAndRankRoutes(routes));
  }
  /** The stable route tree */
  get stableRoutes() {
    return __privateGet(this, _routes);
  }
  /** The in-flight route tree if one is active, otherwise the stable tree */
  get activeRoutes() {
    return __privateGet(this, _hmrRoutes) ?? __privateGet(this, _routes);
  }
  /** Pre-computed branches */
  get branches() {
    return __privateGet(this, _hmrBranches) ?? __privateGet(this, _branches);
  }
  get hasHMRRoutes() {
    return __privateGet(this, _hmrRoutes) != null;
  }
  /** Replace the stable route tree and recompute its branches */
  setRoutes(routes) {
    __privateSet(this, _routes, routes);
    __privateSet(this, _branches, flattenAndRankRoutes(routes));
  }
  /** Set a new in-flight route tree and recompute its branches */
  setHmrRoutes(routes) {
    __privateSet(this, _hmrRoutes, routes);
    __privateSet(this, _hmrBranches, flattenAndRankRoutes(routes));
  }
  /** Commit in-flight routes/branches to the stable slot and clear in-flight */
  commitHmrRoutes() {
    if (__privateGet(this, _hmrRoutes)) {
      __privateSet(this, _routes, __privateGet(this, _hmrRoutes));
      __privateSet(this, _branches, __privateGet(this, _hmrBranches));
      __privateSet(this, _hmrRoutes, void 0);
      __privateSet(this, _hmrBranches, void 0);
    }
  }
};
_routes = new WeakMap();
_branches = new WeakMap();
_hmrRoutes = new WeakMap();
_hmrBranches = new WeakMap();
function createRouter(init) {
  const routerWindow = init.window ? init.window : typeof window !== "undefined" ? window : void 0;
  const isBrowser3 = typeof routerWindow !== "undefined" && typeof routerWindow.document !== "undefined" && typeof routerWindow.document.createElement !== "undefined";
  invariant(
    init.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let hydrationRouteProperties2 = init.hydrationRouteProperties || [];
  let _mapRouteProperties = init.mapRouteProperties || defaultMapRouteProperties;
  let mapRouteProperties2 = _mapRouteProperties;
  if (init.instrumentations) {
    let instrumentations = init.instrumentations;
    mapRouteProperties2 = (route) => {
      return {
        ..._mapRouteProperties(route),
        ...getRouteInstrumentationUpdates(
          instrumentations.map((i) => i.route).filter(Boolean),
          route
        )
      };
    };
  }
  let manifest = {};
  let dataRoutes = new DataRoutes(
    convertRoutesToDataRoutes(
      init.routes,
      mapRouteProperties2,
      void 0,
      manifest
    )
  );
  let basename = init.basename || "/";
  if (!basename.startsWith("/")) {
    basename = `/${basename}`;
  }
  let dataStrategyImpl = init.dataStrategy || defaultDataStrategyWithMiddleware;
  let future = {
    ...init.future
  };
  let unlistenHistory = null;
  let subscribers = /* @__PURE__ */ new Set();
  let bufferedInitialStateUpdate = null;
  let savedScrollPositions2 = null;
  let getScrollRestorationKey2 = null;
  let getScrollPosition = null;
  let initialScrollRestored = init.hydrationData != null;
  let initialMatches = matchRoutesImpl(
    dataRoutes.activeRoutes,
    init.history.location,
    basename,
    false,
    dataRoutes.branches
  );
  let initialMatchesIsFOW = false;
  let initialErrors = null;
  let initialized;
  let renderFallback;
  if (initialMatches == null && !init.patchRoutesOnNavigation) {
    let error = getInternalRouterError(404, {
      pathname: init.history.location.pathname
    });
    let { matches, route } = getShortCircuitMatches(dataRoutes.activeRoutes);
    initialized = true;
    renderFallback = !initialized;
    initialMatches = matches;
    initialErrors = { [route.id]: error };
  } else {
    if (initialMatches && !init.hydrationData) {
      let fogOfWar = checkFogOfWar(
        initialMatches,
        dataRoutes.activeRoutes,
        init.history.location.pathname
      );
      if (fogOfWar.active) {
        initialMatches = null;
      }
    }
    if (!initialMatches) {
      initialized = false;
      renderFallback = !initialized;
      initialMatches = [];
      let fogOfWar = checkFogOfWar(
        null,
        dataRoutes.activeRoutes,
        init.history.location.pathname
      );
      if (fogOfWar.active && fogOfWar.matches) {
        initialMatchesIsFOW = true;
        initialMatches = fogOfWar.matches;
      }
    } else if (initialMatches.some((m) => m.route.lazy)) {
      initialized = false;
      renderFallback = !initialized;
    } else if (!initialMatches.some((m) => routeHasLoaderOrMiddleware(m.route))) {
      initialized = true;
      renderFallback = !initialized;
    } else {
      let loaderData = init.hydrationData ? init.hydrationData.loaderData : null;
      let errors = init.hydrationData ? init.hydrationData.errors : null;
      let relevantMatches = initialMatches;
      if (errors) {
        let idx = initialMatches.findIndex(
          (m) => errors[m.route.id] !== void 0
        );
        relevantMatches = relevantMatches.slice(0, idx + 1);
      }
      renderFallback = false;
      initialized = true;
      relevantMatches.forEach((m) => {
        let status = getRouteHydrationStatus(m.route, loaderData, errors);
        renderFallback = renderFallback || status.renderFallback;
        initialized = initialized && !status.shouldLoad;
      });
    }
  }
  let router;
  let state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized,
    renderFallback,
    navigation: IDLE_NAVIGATION,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: init.hydrationData != null ? false : null,
    preventScrollReset: false,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  };
  let pendingAction = "POP" /* Pop */;
  let pendingPopstateNavigationDfd = null;
  let pendingPreventScrollReset = false;
  let pendingNavigationController;
  let pendingViewTransitionEnabled = false;
  let appliedViewTransitions = /* @__PURE__ */ new Map();
  let removePageHideEventListener = null;
  let isUninterruptedRevalidation = false;
  let isRevalidationRequired = false;
  let cancelledFetcherLoads = /* @__PURE__ */ new Set();
  let fetchControllers = /* @__PURE__ */ new Map();
  let incrementingLoadId = 0;
  let pendingNavigationLoadId = -1;
  let fetchReloadIds = /* @__PURE__ */ new Map();
  let fetchRedirectIds = /* @__PURE__ */ new Set();
  let fetchLoadMatches = /* @__PURE__ */ new Map();
  let activeFetchers = /* @__PURE__ */ new Map();
  let fetchersQueuedForDeletion = /* @__PURE__ */ new Set();
  let blockerFunctions = /* @__PURE__ */ new Map();
  let unblockBlockerHistoryUpdate = void 0;
  let pendingRevalidationDfd = null;
  function initialize() {
    unlistenHistory = init.history.listen(
      ({ action: historyAction, location, delta }) => {
        if (unblockBlockerHistoryUpdate) {
          unblockBlockerHistoryUpdate();
          unblockBlockerHistoryUpdate = void 0;
          return;
        }
        warning(
          blockerFunctions.size === 0 || delta != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let blockerKey = shouldBlockNavigation({
          currentLocation: state.location,
          nextLocation: location,
          historyAction
        });
        if (blockerKey && delta != null) {
          let nextHistoryUpdatePromise = new Promise((resolve) => {
            unblockBlockerHistoryUpdate = resolve;
          });
          init.history.go(delta * -1);
          updateBlocker(blockerKey, {
            state: "blocked",
            location,
            proceed() {
              updateBlocker(blockerKey, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location
              });
              nextHistoryUpdatePromise.then(() => init.history.go(delta));
            },
            reset() {
              let blockers = new Map(state.blockers);
              blockers.set(blockerKey, IDLE_BLOCKER);
              updateState({ blockers });
            }
          });
          pendingPopstateNavigationDfd?.resolve();
          pendingPopstateNavigationDfd = null;
          return;
        }
        return startNavigation(historyAction, location);
      }
    );
    if (isBrowser3) {
      restoreAppliedTransitions(routerWindow, appliedViewTransitions);
      let _saveAppliedTransitions = () => persistAppliedTransitions(routerWindow, appliedViewTransitions);
      routerWindow.addEventListener("pagehide", _saveAppliedTransitions);
      removePageHideEventListener = () => routerWindow.removeEventListener("pagehide", _saveAppliedTransitions);
    }
    if (!state.initialized) {
      startNavigation("POP" /* Pop */, state.location, {
        initialHydration: true
      });
    }
    return router;
  }
  function dispose() {
    if (unlistenHistory) {
      unlistenHistory();
    }
    if (removePageHideEventListener) {
      removePageHideEventListener();
    }
    subscribers.clear();
    pendingNavigationController && pendingNavigationController.abort();
    state.fetchers.forEach((_, key) => deleteFetcher(state.fetchers, key));
    state.blockers.forEach((_, key) => deleteBlocker(key));
  }
  function subscribe(fn) {
    subscribers.add(fn);
    if (bufferedInitialStateUpdate) {
      let { newErrors } = bufferedInitialStateUpdate;
      bufferedInitialStateUpdate = null;
      fn(state, {
        deletedFetchers: [],
        newErrors,
        viewTransitionOpts: void 0,
        flushSync: false
      });
    }
    return () => subscribers.delete(fn);
  }
  function updateState(newState, opts = {}) {
    if (newState.matches) {
      newState.matches = newState.matches.map((m) => {
        let route = manifest[m.route.id];
        let matchRoute = m.route;
        if (matchRoute.element !== route.element || matchRoute.errorElement !== route.errorElement || matchRoute.hydrateFallbackElement !== route.hydrateFallbackElement) {
          return {
            ...m,
            route
          };
        }
        return m;
      });
    }
    state = {
      ...state,
      ...newState
    };
    let unmountedFetchers = [];
    let mountedFetchers = [];
    state.fetchers.forEach((fetcher, key) => {
      if (fetcher.state === "idle") {
        if (fetchersQueuedForDeletion.has(key)) {
          unmountedFetchers.push(key);
        } else {
          mountedFetchers.push(key);
        }
      }
    });
    fetchersQueuedForDeletion.forEach((key) => {
      if (!state.fetchers.has(key) && !fetchControllers.has(key)) {
        unmountedFetchers.push(key);
      }
    });
    if (subscribers.size === 0) {
      bufferedInitialStateUpdate = { newErrors: newState.errors ?? null };
    }
    [...subscribers].forEach(
      (subscriber) => subscriber(state, {
        deletedFetchers: unmountedFetchers,
        newErrors: newState.errors ?? null,
        viewTransitionOpts: opts.viewTransitionOpts,
        flushSync: opts.flushSync === true
      })
    );
    unmountedFetchers.forEach((key) => deleteFetcher(state.fetchers, key));
    mountedFetchers.forEach((key) => state.fetchers.delete(key));
  }
  function completeNavigation(location, newState, { flushSync } = {}) {
    let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && location.state?._isRedirect !== true;
    let actionData;
    if (newState.actionData) {
      if (Object.keys(newState.actionData).length > 0) {
        actionData = newState.actionData;
      } else {
        actionData = null;
      }
    } else if (isActionReload) {
      actionData = state.actionData;
    } else {
      actionData = null;
    }
    let loaderData = newState.loaderData ? mergeLoaderData(
      state.loaderData,
      newState.loaderData,
      newState.matches || [],
      newState.errors
    ) : state.loaderData;
    let blockers = state.blockers;
    if (blockers.size > 0) {
      blockers = new Map(blockers);
      blockers.forEach((_, k) => blockers.set(k, IDLE_BLOCKER));
    }
    let restoreScrollPosition = isUninterruptedRevalidation ? false : getSavedScrollPosition(location, newState.matches || state.matches);
    let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && location.state?._isRedirect !== true;
    dataRoutes.commitHmrRoutes();
    if (isUninterruptedRevalidation) {
    } else if (pendingAction === "POP" /* Pop */) {
    } else if (pendingAction === "PUSH" /* Push */) {
      init.history.push(location, location.state);
    } else if (pendingAction === "REPLACE" /* Replace */) {
      init.history.replace(location, location.state);
    }
    let viewTransitionOpts;
    if (pendingAction === "POP" /* Pop */) {
      let priorPaths = appliedViewTransitions.get(state.location.pathname);
      if (priorPaths && priorPaths.has(location.pathname)) {
        viewTransitionOpts = {
          currentLocation: state.location,
          nextLocation: location
        };
      } else if (appliedViewTransitions.has(location.pathname)) {
        viewTransitionOpts = {
          currentLocation: location,
          nextLocation: state.location
        };
      }
    } else if (pendingViewTransitionEnabled) {
      let toPaths = appliedViewTransitions.get(state.location.pathname);
      if (toPaths) {
        toPaths.add(location.pathname);
      } else {
        toPaths = /* @__PURE__ */ new Set([location.pathname]);
        appliedViewTransitions.set(state.location.pathname, toPaths);
      }
      viewTransitionOpts = {
        currentLocation: state.location,
        nextLocation: location
      };
    }
    updateState(
      {
        ...newState,
        // matches, errors, fetchers go through as-is
        actionData,
        loaderData,
        historyAction: pendingAction,
        location,
        initialized: true,
        renderFallback: false,
        navigation: IDLE_NAVIGATION,
        revalidation: "idle",
        restoreScrollPosition,
        preventScrollReset,
        blockers
      },
      {
        viewTransitionOpts,
        flushSync: flushSync === true
      }
    );
    pendingAction = "POP" /* Pop */;
    pendingPreventScrollReset = false;
    pendingViewTransitionEnabled = false;
    isUninterruptedRevalidation = false;
    isRevalidationRequired = false;
    pendingPopstateNavigationDfd?.resolve();
    pendingPopstateNavigationDfd = null;
    pendingRevalidationDfd?.resolve();
    pendingRevalidationDfd = null;
  }
  async function navigate(to, opts) {
    pendingPopstateNavigationDfd?.resolve();
    pendingPopstateNavigationDfd = null;
    if (typeof to === "number") {
      if (!pendingPopstateNavigationDfd) {
        pendingPopstateNavigationDfd = createDeferred();
      }
      let promise = pendingPopstateNavigationDfd.promise;
      init.history.go(to);
      return promise;
    }
    let normalizedPath = normalizeTo(
      state.location,
      state.matches,
      basename,
      to,
      opts?.fromRouteId,
      opts?.relative
    );
    let { path, submission, error } = normalizeNavigateOptions(
      false,
      normalizedPath,
      opts
    );
    let maskPath;
    if (opts?.mask) {
      let partialPath = typeof opts.mask === "string" ? parsePath(opts.mask) : {
        ...state.location.mask,
        ...opts.mask
      };
      maskPath = {
        pathname: "",
        search: "",
        hash: "",
        ...partialPath
      };
    }
    let currentLocation = state.location;
    let nextLocation = createLocation(
      currentLocation,
      path,
      opts && opts.state,
      void 0,
      maskPath
    );
    nextLocation = {
      ...nextLocation,
      ...init.history.encodeLocation(nextLocation)
    };
    let userReplace = opts && opts.replace != null ? opts.replace : void 0;
    let historyAction = "PUSH" /* Push */;
    if (userReplace === true) {
      historyAction = "REPLACE" /* Replace */;
    } else if (userReplace === false) {
    } else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) {
      historyAction = "REPLACE" /* Replace */;
    }
    let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : void 0;
    let flushSync = (opts && opts.flushSync) === true;
    let blockerKey = shouldBlockNavigation({
      currentLocation,
      nextLocation,
      historyAction
    });
    if (blockerKey) {
      updateBlocker(blockerKey, {
        state: "blocked",
        location: nextLocation,
        proceed() {
          updateBlocker(blockerKey, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: nextLocation
          });
          navigate(to, opts);
        },
        reset() {
          let blockers = new Map(state.blockers);
          blockers.set(blockerKey, IDLE_BLOCKER);
          updateState({ blockers });
        }
      });
      return;
    }
    await startNavigation(historyAction, nextLocation, {
      submission,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: error,
      preventScrollReset,
      replace: opts && opts.replace,
      enableViewTransition: opts && opts.viewTransition,
      flushSync,
      callSiteDefaultShouldRevalidate: opts && opts.defaultShouldRevalidate
    });
  }
  function revalidate() {
    if (!pendingRevalidationDfd) {
      pendingRevalidationDfd = createDeferred();
    }
    interruptActiveLoads();
    updateState({ revalidation: "loading" });
    let promise = pendingRevalidationDfd.promise;
    if (state.navigation.state === "submitting") {
      return promise;
    }
    if (state.navigation.state === "idle") {
      startNavigation(state.historyAction, state.location, {
        startUninterruptedRevalidation: true
      });
      return promise;
    }
    startNavigation(
      pendingAction || state.historyAction,
      state.navigation.location,
      {
        overrideNavigation: state.navigation,
        // Proxy through any rending view transition
        enableViewTransition: pendingViewTransitionEnabled === true
      }
    );
    return promise;
  }
  async function startNavigation(historyAction, location, opts) {
    pendingNavigationController && pendingNavigationController.abort();
    pendingNavigationController = null;
    pendingAction = historyAction;
    isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true;
    saveScrollPosition(state.location, state.matches);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    pendingViewTransitionEnabled = (opts && opts.enableViewTransition) === true;
    let routesToUse = dataRoutes.activeRoutes;
    let matches = opts?.initialHydration && state.matches && state.matches.length > 0 && !initialMatchesIsFOW ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      state.matches
    ) : matchRoutesImpl(
      routesToUse,
      location,
      basename,
      false,
      dataRoutes.branches
    );
    let flushSync = (opts && opts.flushSync) === true;
    if (matches && state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
      completeNavigation(location, { matches }, { flushSync });
      return;
    }
    let fogOfWar = checkFogOfWar(matches, routesToUse, location.pathname);
    if (fogOfWar.active && fogOfWar.matches) {
      matches = fogOfWar.matches;
    }
    if (!matches) {
      let { error, notFoundMatches, route } = handleNavigational404(
        location.pathname
      );
      completeNavigation(
        location,
        {
          matches: notFoundMatches,
          loaderData: {},
          errors: {
            [route.id]: error
          }
        },
        { flushSync }
      );
      return;
    }
    let loadingNavigation = opts && opts.overrideNavigation ? {
      ...opts.overrideNavigation,
      matches,
      historyAction
    } : void 0;
    pendingNavigationController = new AbortController();
    let request = createClientSideRequest(
      init.history,
      location,
      pendingNavigationController.signal,
      opts && opts.submission
    );
    let scopedContext = init.getContext ? await init.getContext() : new RouterContextProvider();
    let pendingActionResult;
    if (opts && opts.pendingError) {
      pendingActionResult = [
        findNearestBoundary(matches).route.id,
        { type: "error" /* error */, error: opts.pendingError }
      ];
    } else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
      let actionResult = await handleAction(
        request,
        location,
        opts.submission,
        matches,
        historyAction,
        scopedContext,
        fogOfWar.active,
        opts && opts.initialHydration === true,
        { replace: opts.replace, flushSync }
      );
      if (actionResult.shortCircuited) {
        return;
      }
      if (actionResult.pendingActionResult) {
        let [routeId, result] = actionResult.pendingActionResult;
        if (isErrorResult(result) && isRouteErrorResponse(result.error) && result.error.status === 404) {
          pendingNavigationController = null;
          completeNavigation(location, {
            matches: actionResult.matches,
            loaderData: {},
            errors: {
              [routeId]: result.error
            }
          });
          return;
        }
      }
      matches = actionResult.matches || matches;
      pendingActionResult = actionResult.pendingActionResult;
      loadingNavigation = getLoadingNavigation(
        location,
        matches,
        historyAction,
        opts.submission
      );
      flushSync = false;
      fogOfWar.active = false;
      request = createClientSideRequest(
        init.history,
        request.url,
        request.signal
      );
    }
    let {
      shortCircuited,
      matches: updatedMatches,
      loaderData,
      errors,
      workingFetchers
    } = await handleLoaders(
      request,
      location,
      matches,
      historyAction,
      scopedContext,
      fogOfWar.active,
      loadingNavigation,
      opts && opts.submission,
      opts && opts.fetcherSubmission,
      opts && opts.replace,
      opts && opts.initialHydration === true,
      flushSync,
      pendingActionResult,
      opts && opts.callSiteDefaultShouldRevalidate
    );
    if (shortCircuited) {
      return;
    }
    pendingNavigationController = null;
    completeNavigation(location, {
      matches: updatedMatches || matches,
      ...getActionDataForCommit(pendingActionResult),
      loaderData,
      errors,
      ...workingFetchers ? { fetchers: workingFetchers } : {}
    });
  }
  async function handleAction(request, location, submission, matches, historyAction, scopedContext, isFogOfWar, initialHydration, opts = {}) {
    interruptActiveLoads();
    let navigation = getSubmittingNavigation(
      location,
      matches,
      historyAction,
      submission
    );
    updateState({ navigation }, { flushSync: opts.flushSync === true });
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(
        matches,
        location.pathname,
        request.signal
      );
      if (discoverResult.type === "aborted") {
        return { shortCircuited: true };
      } else if (discoverResult.type === "error") {
        if (discoverResult.partialMatches.length === 0) {
          let { matches: matches2, route } = getShortCircuitMatches(
            dataRoutes.activeRoutes
          );
          return {
            matches: matches2,
            pendingActionResult: [
              route.id,
              {
                type: "error" /* error */,
                error: discoverResult.error
              }
            ]
          };
        }
        let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
        return {
          matches: discoverResult.partialMatches,
          pendingActionResult: [
            boundaryId,
            {
              type: "error" /* error */,
              error: discoverResult.error
            }
          ]
        };
      } else if (!discoverResult.matches) {
        let { notFoundMatches, error, route } = handleNavigational404(
          location.pathname
        );
        return {
          matches: notFoundMatches,
          pendingActionResult: [
            route.id,
            {
              type: "error" /* error */,
              error
            }
          ]
        };
      } else {
        matches = discoverResult.matches;
      }
    }
    let result;
    let actionMatch = getTargetMatch(matches, location);
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      result = {
        type: "error" /* error */,
        error: getInternalRouterError(405, {
          method: request.method,
          pathname: location.pathname,
          routeId: actionMatch.route.id
        })
      };
    } else {
      let dsMatches = getTargetedDataStrategyMatches(
        mapRouteProperties2,
        manifest,
        request,
        location,
        matches,
        actionMatch,
        initialHydration ? [] : hydrationRouteProperties2,
        scopedContext
      );
      let results = await callDataStrategy(
        request,
        location,
        dsMatches,
        scopedContext,
        null
      );
      result = results[actionMatch.route.id];
      if (!result) {
        for (let match of matches) {
          if (results[match.route.id]) {
            result = results[match.route.id];
            break;
          }
        }
      }
      if (request.signal.aborted) {
        return { shortCircuited: true };
      }
    }
    if (isRedirectResult(result)) {
      let replace2;
      if (opts && opts.replace != null) {
        replace2 = opts.replace;
      } else {
        let location2 = normalizeRedirectLocation(
          result.response.headers.get("Location"),
          new URL(request.url),
          basename,
          init.history
        );
        replace2 = location2 === state.location.pathname + state.location.search;
      }
      await startRedirectNavigation(request, result, true, {
        submission,
        replace: replace2
      });
      return { shortCircuited: true };
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      if ((opts && opts.replace) !== true) {
        pendingAction = "PUSH" /* Push */;
      }
      return {
        matches,
        pendingActionResult: [
          boundaryMatch.route.id,
          result,
          actionMatch.route.id
        ]
      };
    }
    return {
      matches,
      pendingActionResult: [actionMatch.route.id, result]
    };
  }
  async function handleLoaders(request, location, matches, historyAction, scopedContext, isFogOfWar, overrideNavigation, submission, fetcherSubmission, replace2, initialHydration, flushSync, pendingActionResult, callSiteDefaultShouldRevalidate) {
    let loadingNavigation = overrideNavigation || getLoadingNavigation(location, matches, historyAction, submission);
    let activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation);
    let shouldUpdateNavigationState = !isUninterruptedRevalidation && !initialHydration;
    if (isFogOfWar) {
      if (shouldUpdateNavigationState) {
        let actionData = getUpdatedActionData(pendingActionResult);
        updateState(
          {
            navigation: loadingNavigation,
            ...actionData !== void 0 ? { actionData } : {}
          },
          {
            flushSync
          }
        );
      }
      let discoverResult = await discoverRoutes(
        matches,
        location.pathname,
        request.signal
      );
      if (discoverResult.type === "aborted") {
        return { shortCircuited: true };
      } else if (discoverResult.type === "error") {
        if (discoverResult.partialMatches.length === 0) {
          let { matches: matches2, route } = getShortCircuitMatches(
            dataRoutes.activeRoutes
          );
          return {
            matches: matches2,
            loaderData: {},
            errors: {
              [route.id]: discoverResult.error
            }
          };
        }
        let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
        return {
          matches: discoverResult.partialMatches,
          loaderData: {},
          errors: {
            [boundaryId]: discoverResult.error
          }
        };
      } else if (!discoverResult.matches) {
        let { error, notFoundMatches, route } = handleNavigational404(
          location.pathname
        );
        return {
          matches: notFoundMatches,
          loaderData: {},
          errors: {
            [route.id]: error
          }
        };
      } else {
        matches = discoverResult.matches;
      }
    }
    let routesToUse = dataRoutes.activeRoutes;
    let { dsMatches, revalidatingFetchers } = getMatchesToLoad(
      request,
      scopedContext,
      mapRouteProperties2,
      manifest,
      init.history,
      state,
      matches,
      activeSubmission,
      location,
      initialHydration ? [] : hydrationRouteProperties2,
      initialHydration === true,
      isRevalidationRequired,
      cancelledFetcherLoads,
      fetchersQueuedForDeletion,
      fetchLoadMatches,
      fetchRedirectIds,
      routesToUse,
      basename,
      init.patchRoutesOnNavigation != null,
      dataRoutes.branches,
      pendingActionResult,
      callSiteDefaultShouldRevalidate
    );
    pendingNavigationLoadId = ++incrementingLoadId;
    if (!init.dataStrategy && !dsMatches.some((m) => m.shouldLoad) && !dsMatches.some(
      (m) => m.route.middleware && m.route.middleware.length > 0
    ) && revalidatingFetchers.length === 0) {
      let workingFetchers2 = new Map(state.fetchers);
      let didUpdateFetcherRedirects2 = markFetchRedirectsDone(workingFetchers2);
      completeNavigation(
        location,
        {
          matches,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? { [pendingActionResult[0]]: pendingActionResult[1].error } : null,
          ...getActionDataForCommit(pendingActionResult),
          ...didUpdateFetcherRedirects2 ? { fetchers: workingFetchers2 } : {}
        },
        { flushSync }
      );
      return { shortCircuited: true };
    }
    if (shouldUpdateNavigationState) {
      let updates = {};
      if (!isFogOfWar) {
        updates.navigation = loadingNavigation;
        let actionData = getUpdatedActionData(pendingActionResult);
        if (actionData !== void 0) {
          updates.actionData = actionData;
        }
      }
      if (revalidatingFetchers.length > 0) {
        updates.fetchers = getUpdatedRevalidatingFetchers(revalidatingFetchers);
      }
      updateState(updates, { flushSync });
    }
    revalidatingFetchers.forEach((rf) => {
      abortFetcher(rf.key);
      if (rf.controller) {
        fetchControllers.set(rf.key, rf.controller);
      }
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((f) => abortFetcher(f.key));
    if (pendingNavigationController) {
      pendingNavigationController.signal.addEventListener(
        "abort",
        abortPendingFetchRevalidations
      );
    }
    let { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(
      dsMatches,
      revalidatingFetchers,
      request,
      location,
      scopedContext
    );
    if (request.signal.aborted) {
      return { shortCircuited: true };
    }
    if (pendingNavigationController) {
      pendingNavigationController.signal.removeEventListener(
        "abort",
        abortPendingFetchRevalidations
      );
    }
    revalidatingFetchers.forEach((rf) => fetchControllers.delete(rf.key));
    let redirect2 = findRedirect(loaderResults);
    if (redirect2) {
      await startRedirectNavigation(request, redirect2.result, true, {
        replace: replace2
      });
      return { shortCircuited: true };
    }
    redirect2 = findRedirect(fetcherResults);
    if (redirect2) {
      fetchRedirectIds.add(redirect2.key);
      await startRedirectNavigation(request, redirect2.result, true, {
        replace: replace2
      });
      return { shortCircuited: true };
    }
    let workingFetchers = new Map(state.fetchers);
    let { loaderData, errors } = processLoaderData(
      state,
      matches,
      loaderResults,
      pendingActionResult,
      revalidatingFetchers,
      fetcherResults,
      workingFetchers
    );
    if (initialHydration && state.errors) {
      errors = { ...state.errors, ...errors };
    }
    let didUpdateFetcherRedirects = markFetchRedirectsDone(workingFetchers);
    let didAbortFetchLoads = abortStaleFetchLoads(
      pendingNavigationLoadId,
      workingFetchers
    );
    let shouldUpdateFetchers = didUpdateFetcherRedirects || didAbortFetchLoads || revalidatingFetchers.length > 0;
    return {
      matches,
      loaderData,
      errors,
      ...shouldUpdateFetchers ? { workingFetchers } : {}
    };
  }
  function getUpdatedActionData(pendingActionResult) {
    if (pendingActionResult && !isErrorResult(pendingActionResult[1])) {
      return {
        [pendingActionResult[0]]: pendingActionResult[1].data
      };
    } else if (state.actionData) {
      if (Object.keys(state.actionData).length === 0) {
        return null;
      } else {
        return state.actionData;
      }
    }
  }
  function getUpdatedRevalidatingFetchers(revalidatingFetchers) {
    let workingFetchers = new Map(state.fetchers);
    revalidatingFetchers.forEach((rf) => {
      let fetcher = workingFetchers.get(rf.key);
      let revalidatingFetcher = getLoadingFetcher(
        void 0,
        fetcher ? fetcher.data : void 0
      );
      workingFetchers.set(rf.key, revalidatingFetcher);
    });
    return workingFetchers;
  }
  async function fetch2(key, routeId, href, opts) {
    abortFetcher(key);
    let flushSync = (opts && opts.flushSync) === true;
    let routesToUse = dataRoutes.activeRoutes;
    let normalizedPath = normalizeTo(
      state.location,
      state.matches,
      basename,
      href,
      routeId,
      opts?.relative
    );
    let matches = matchRoutesImpl(
      routesToUse,
      normalizedPath,
      basename,
      false,
      dataRoutes.branches
    );
    let fogOfWar = checkFogOfWar(matches, routesToUse, normalizedPath);
    if (fogOfWar.active && fogOfWar.matches) {
      matches = fogOfWar.matches;
    }
    if (!matches) {
      setFetcherError(
        key,
        routeId,
        getInternalRouterError(404, { pathname: normalizedPath }),
        { flushSync }
      );
      return;
    }
    let { path, submission, error } = normalizeNavigateOptions(
      true,
      normalizedPath,
      opts
    );
    if (error) {
      setFetcherError(key, routeId, error, { flushSync });
      return;
    }
    let scopedContext = init.getContext ? await init.getContext() : new RouterContextProvider();
    let preventScrollReset = (opts && opts.preventScrollReset) === true;
    if (submission && isMutationMethod(submission.formMethod)) {
      await handleFetcherAction(
        key,
        routeId,
        path,
        matches,
        scopedContext,
        fogOfWar.active,
        flushSync,
        preventScrollReset,
        submission,
        opts && opts.defaultShouldRevalidate
      );
      return;
    }
    fetchLoadMatches.set(key, { routeId, path });
    await handleFetcherLoader(
      key,
      routeId,
      path,
      matches,
      scopedContext,
      fogOfWar.active,
      flushSync,
      preventScrollReset,
      submission
    );
  }
  async function handleFetcherAction(key, routeId, path, requestMatches, scopedContext, isFogOfWar, flushSync, preventScrollReset, submission, callSiteDefaultShouldRevalidate) {
    interruptActiveLoads();
    fetchLoadMatches.delete(key);
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(key, getSubmittingFetcher(submission, existingFetcher), {
      flushSync
    });
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(
      init.history,
      path,
      abortController.signal,
      submission
    );
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(
        requestMatches,
        new URL(fetchRequest.url).pathname,
        fetchRequest.signal,
        key
      );
      if (discoverResult.type === "aborted") {
        return;
      } else if (discoverResult.type === "error") {
        setFetcherError(key, routeId, discoverResult.error, { flushSync });
        return;
      } else if (!discoverResult.matches) {
        setFetcherError(
          key,
          routeId,
          getInternalRouterError(404, { pathname: path }),
          { flushSync }
        );
        return;
      } else {
        requestMatches = discoverResult.matches;
      }
    }
    let match = getTargetMatch(requestMatches, path);
    if (!match.route.action && !match.route.lazy) {
      let error = getInternalRouterError(405, {
        method: submission.formMethod,
        pathname: path,
        routeId
      });
      setFetcherError(key, routeId, error, { flushSync });
      return;
    }
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let fetchMatches = getTargetedDataStrategyMatches(
      mapRouteProperties2,
      manifest,
      fetchRequest,
      path,
      requestMatches,
      match,
      hydrationRouteProperties2,
      scopedContext
    );
    let actionResults = await callDataStrategy(
      fetchRequest,
      path,
      fetchMatches,
      scopedContext,
      key
    );
    let actionResult = actionResults[match.route.id];
    if (!actionResult) {
      for (let match2 of fetchMatches) {
        if (actionResults[match2.route.id]) {
          actionResult = actionResults[match2.route.id];
          break;
        }
      }
    }
    if (fetchRequest.signal.aborted) {
      if (fetchControllers.get(key) === abortController) {
        fetchControllers.delete(key);
      }
      return;
    }
    if (fetchersQueuedForDeletion.has(key)) {
      if (isRedirectResult(actionResult) || isErrorResult(actionResult)) {
        updateFetcherState(key, getDoneFetcher(void 0));
        return;
      }
    } else {
      if (isRedirectResult(actionResult)) {
        fetchControllers.delete(key);
        if (pendingNavigationLoadId > originatingLoadId) {
          updateFetcherState(key, getDoneFetcher(void 0));
          return;
        } else {
          fetchRedirectIds.add(key);
          updateFetcherState(key, getLoadingFetcher(submission));
          return startRedirectNavigation(fetchRequest, actionResult, false, {
            fetcherSubmission: submission,
            preventScrollReset
          });
        }
      }
      if (isErrorResult(actionResult)) {
        setFetcherError(key, routeId, actionResult.error);
        return;
      }
    }
    let nextLocation = state.navigation.location || state.location;
    let revalidationRequest = createClientSideRequest(
      init.history,
      nextLocation,
      abortController.signal
    );
    let routesToUse = dataRoutes.activeRoutes;
    let matches = state.navigation.state !== "idle" ? matchRoutesImpl(
      routesToUse,
      state.navigation.location,
      basename,
      false,
      dataRoutes.branches
    ) : state.matches;
    invariant(matches, "Didn't find any matches after fetcher action");
    let loadId = ++incrementingLoadId;
    fetchReloadIds.set(key, loadId);
    let { dsMatches, revalidatingFetchers } = getMatchesToLoad(
      revalidationRequest,
      scopedContext,
      mapRouteProperties2,
      manifest,
      init.history,
      state,
      matches,
      submission,
      nextLocation,
      hydrationRouteProperties2,
      false,
      isRevalidationRequired,
      cancelledFetcherLoads,
      fetchersQueuedForDeletion,
      fetchLoadMatches,
      fetchRedirectIds,
      routesToUse,
      basename,
      init.patchRoutesOnNavigation != null,
      dataRoutes.branches,
      [match.route.id, actionResult],
      callSiteDefaultShouldRevalidate
    );
    let loadFetcher = getLoadingFetcher(submission, actionResult.data);
    let workingFetchers = new Map(state.fetchers);
    workingFetchers.set(key, loadFetcher);
    revalidatingFetchers.filter((rf) => rf.key !== key).forEach((rf) => {
      let staleKey = rf.key;
      let existingFetcher2 = workingFetchers.get(staleKey);
      let revalidatingFetcher = getLoadingFetcher(
        void 0,
        existingFetcher2 ? existingFetcher2.data : void 0
      );
      workingFetchers.set(staleKey, revalidatingFetcher);
      abortFetcher(staleKey);
      if (rf.controller) {
        fetchControllers.set(staleKey, rf.controller);
      }
    });
    updateState({ fetchers: workingFetchers });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((rf) => abortFetcher(rf.key));
    abortController.signal.addEventListener(
      "abort",
      abortPendingFetchRevalidations
    );
    let { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(
      dsMatches,
      revalidatingFetchers,
      revalidationRequest,
      nextLocation,
      scopedContext
    );
    if (abortController.signal.aborted) {
      return;
    }
    abortController.signal.removeEventListener(
      "abort",
      abortPendingFetchRevalidations
    );
    fetchReloadIds.delete(key);
    fetchControllers.delete(key);
    revalidatingFetchers.forEach((r) => fetchControllers.delete(r.key));
    let fetcherIsMounted = state.fetchers.has(key);
    let getRedirectStateWithDoneFetcher = (s) => {
      if (!fetcherIsMounted) return s;
      let workingFetchers2 = new Map(s.fetchers);
      workingFetchers2.set(key, getDoneFetcher(actionResult.data));
      return { ...s, fetchers: workingFetchers2 };
    };
    let redirect2 = findRedirect(loaderResults);
    if (redirect2) {
      state = getRedirectStateWithDoneFetcher(state);
      return startRedirectNavigation(
        revalidationRequest,
        redirect2.result,
        false,
        { preventScrollReset }
      );
    }
    redirect2 = findRedirect(fetcherResults);
    if (redirect2) {
      fetchRedirectIds.add(redirect2.key);
      state = getRedirectStateWithDoneFetcher(state);
      return startRedirectNavigation(
        revalidationRequest,
        redirect2.result,
        false,
        { preventScrollReset }
      );
    }
    let finalFetchers = new Map(state.fetchers);
    if (fetcherIsMounted) {
      finalFetchers.set(key, getDoneFetcher(actionResult.data));
    }
    let { loaderData, errors } = processLoaderData(
      state,
      matches,
      loaderResults,
      void 0,
      revalidatingFetchers,
      fetcherResults,
      finalFetchers
    );
    abortStaleFetchLoads(loadId, finalFetchers);
    if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
      invariant(pendingAction, "Expected pending action");
      pendingNavigationController && pendingNavigationController.abort();
      completeNavigation(state.navigation.location, {
        matches,
        loaderData,
        errors,
        fetchers: finalFetchers
      });
    } else {
      updateState({
        errors,
        loaderData: mergeLoaderData(
          state.loaderData,
          loaderData,
          matches,
          errors
        ),
        fetchers: finalFetchers
      });
      isRevalidationRequired = false;
    }
  }
  async function handleFetcherLoader(key, routeId, path, matches, scopedContext, isFogOfWar, flushSync, preventScrollReset, submission) {
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(
      key,
      getLoadingFetcher(
        submission,
        existingFetcher ? existingFetcher.data : void 0
      ),
      { flushSync }
    );
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(
      init.history,
      path,
      abortController.signal
    );
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(
        matches,
        new URL(fetchRequest.url).pathname,
        fetchRequest.signal,
        key
      );
      if (discoverResult.type === "aborted") {
        return;
      } else if (discoverResult.type === "error") {
        setFetcherError(key, routeId, discoverResult.error, { flushSync });
        return;
      } else if (!discoverResult.matches) {
        setFetcherError(
          key,
          routeId,
          getInternalRouterError(404, { pathname: path }),
          { flushSync }
        );
        return;
      } else {
        matches = discoverResult.matches;
      }
    }
    let match = getTargetMatch(matches, path);
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let dsMatches = getTargetedDataStrategyMatches(
      mapRouteProperties2,
      manifest,
      fetchRequest,
      path,
      matches,
      match,
      hydrationRouteProperties2,
      scopedContext
    );
    let results = await callDataStrategy(
      fetchRequest,
      path,
      dsMatches,
      scopedContext,
      key
    );
    let result = results[match.route.id];
    if (!result) {
      for (let match2 of matches) {
        if (results[match2.route.id]) {
          result = results[match2.route.id];
          break;
        }
      }
    }
    if (fetchControllers.get(key) === abortController) {
      fetchControllers.delete(key);
    }
    if (fetchRequest.signal.aborted) {
      return;
    }
    if (fetchersQueuedForDeletion.has(key)) {
      updateFetcherState(key, getDoneFetcher(void 0));
      return;
    }
    if (isRedirectResult(result)) {
      if (pendingNavigationLoadId > originatingLoadId) {
        updateFetcherState(key, getDoneFetcher(void 0));
        return;
      } else {
        fetchRedirectIds.add(key);
        await startRedirectNavigation(fetchRequest, result, false, {
          preventScrollReset
        });
        return;
      }
    }
    if (isErrorResult(result)) {
      setFetcherError(key, routeId, result.error);
      return;
    }
    updateFetcherState(key, getDoneFetcher(result.data));
  }
  async function startRedirectNavigation(request, redirect2, isNavigation, {
    submission,
    fetcherSubmission,
    preventScrollReset,
    replace: replace2
  } = {}) {
    if (!isNavigation) {
      pendingPopstateNavigationDfd?.resolve();
      pendingPopstateNavigationDfd = null;
    }
    if (redirect2.response.headers.has("X-Remix-Revalidate")) {
      isRevalidationRequired = true;
    }
    let location = redirect2.response.headers.get("Location");
    invariant(location, "Expected a Location header on the redirect Response");
    location = normalizeRedirectLocation(
      location,
      new URL(request.url),
      basename,
      init.history
    );
    let redirectLocation = createLocation(state.location, location, {
      _isRedirect: true
    });
    if (isBrowser3) {
      let isDocumentReload = false;
      if (redirect2.response.headers.has("X-Remix-Reload-Document")) {
        isDocumentReload = true;
      } else if (isAbsoluteUrl(location)) {
        const url = createBrowserURLImpl(routerWindow, location, true);
        isDocumentReload = // Hard reload if it's an absolute URL to a new origin
        url.origin !== routerWindow.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        stripBasename(url.pathname, basename) == null;
      }
      if (isDocumentReload) {
        if (replace2) {
          routerWindow.location.replace(location);
        } else {
          routerWindow.location.assign(location);
        }
        return;
      }
    }
    pendingNavigationController = null;
    let redirectNavigationType = replace2 === true || redirect2.response.headers.has("X-Remix-Replace") ? "REPLACE" /* Replace */ : "PUSH" /* Push */;
    let { formMethod, formAction, formEncType } = state.navigation;
    if (!submission && !fetcherSubmission && formMethod && formAction && formEncType) {
      submission = getSubmissionFromNavigation(state.navigation);
    }
    let activeSubmission = submission || fetcherSubmission;
    if (redirectPreserveMethodStatusCodes.has(redirect2.response.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod)) {
      await startNavigation(redirectNavigationType, redirectLocation, {
        submission: {
          ...activeSubmission,
          formAction: location
        },
        // Preserve these flags across redirects
        preventScrollReset: preventScrollReset || pendingPreventScrollReset,
        enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
      });
    } else {
      let overrideNavigation = getLoadingNavigation(
        redirectLocation,
        [],
        redirectNavigationType,
        submission
      );
      await startNavigation(redirectNavigationType, redirectLocation, {
        overrideNavigation,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission,
        // Preserve these flags across redirects
        preventScrollReset: preventScrollReset || pendingPreventScrollReset,
        enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
      });
    }
  }
  async function callDataStrategy(request, path, matches, scopedContext, fetcherKey) {
    let results;
    let dataResults = {};
    try {
      results = await callDataStrategyImpl(
        dataStrategyImpl,
        request,
        path,
        matches,
        fetcherKey,
        scopedContext,
        false
      );
    } catch (e) {
      matches.filter((m) => m.shouldLoad).forEach((m) => {
        dataResults[m.route.id] = {
          type: "error" /* error */,
          error: e
        };
      });
      return dataResults;
    }
    if (request.signal.aborted) {
      return dataResults;
    }
    if (!isMutationMethod(request.method)) {
      for (let match of matches) {
        if (results[match.route.id]?.type === "error" /* error */) {
          break;
        }
        if (!results.hasOwnProperty(match.route.id) && !state.loaderData.hasOwnProperty(match.route.id) && (!state.errors || !state.errors.hasOwnProperty(match.route.id)) && match.shouldCallHandler()) {
          results[match.route.id] = {
            type: "error" /* error */,
            result: new Error(
              `No result returned from dataStrategy for route ${match.route.id}`
            )
          };
        }
      }
    }
    for (let [routeId, result] of Object.entries(results)) {
      if (isRedirectDataStrategyResult(result)) {
        let response = result.result;
        dataResults[routeId] = {
          type: "redirect" /* redirect */,
          response: normalizeRelativeRoutingRedirectResponse(
            response,
            request,
            routeId,
            matches,
            basename
          )
        };
      } else {
        dataResults[routeId] = await convertDataStrategyResultToDataResult(result);
      }
    }
    return dataResults;
  }
  async function callLoadersAndMaybeResolveData(matches, fetchersToLoad, request, location, scopedContext) {
    let loaderResultsPromise = callDataStrategy(
      request,
      location,
      matches,
      scopedContext,
      null
    );
    let fetcherResultsPromise = Promise.all(
      fetchersToLoad.map(async (f) => {
        if (f.matches && f.match && f.request && f.controller) {
          let results = await callDataStrategy(
            f.request,
            f.path,
            f.matches,
            scopedContext,
            f.key
          );
          let result = results[f.match.route.id];
          return { [f.key]: result };
        } else {
          return Promise.resolve({
            [f.key]: {
              type: "error" /* error */,
              error: getInternalRouterError(404, {
                pathname: f.path
              })
            }
          });
        }
      })
    );
    let loaderResults = await loaderResultsPromise;
    let fetcherResults = (await fetcherResultsPromise).reduce(
      (acc, r) => Object.assign(acc, r),
      {}
    );
    return {
      loaderResults,
      fetcherResults
    };
  }
  function interruptActiveLoads() {
    isRevalidationRequired = true;
    fetchLoadMatches.forEach((_, key) => {
      if (fetchControllers.has(key)) {
        cancelledFetcherLoads.add(key);
      }
      abortFetcher(key);
    });
  }
  function updateFetcherState(key, fetcher, opts = {}) {
    let workingFetchers = new Map(state.fetchers);
    workingFetchers.set(key, fetcher);
    updateState(
      { fetchers: workingFetchers },
      { flushSync: (opts && opts.flushSync) === true }
    );
  }
  function setFetcherError(key, routeId, error, opts = {}) {
    let boundaryMatch = findNearestBoundary(state.matches, routeId);
    let workingFetchers = new Map(state.fetchers);
    deleteFetcher(workingFetchers, key);
    updateState(
      {
        errors: {
          [boundaryMatch.route.id]: error
        },
        fetchers: workingFetchers
      },
      { flushSync: (opts && opts.flushSync) === true }
    );
  }
  function getFetcher(key) {
    activeFetchers.set(key, (activeFetchers.get(key) || 0) + 1);
    if (fetchersQueuedForDeletion.has(key)) {
      fetchersQueuedForDeletion.delete(key);
    }
    return state.fetchers.get(key) || IDLE_FETCHER;
  }
  function resetFetcher(key, opts) {
    abortFetcher(key, opts?.reason);
    updateFetcherState(key, getDoneFetcher(null));
  }
  function deleteFetcher(fetchers, key) {
    let fetcher = state.fetchers.get(key);
    if (fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key))) {
      abortFetcher(key);
    }
    fetchLoadMatches.delete(key);
    fetchReloadIds.delete(key);
    fetchRedirectIds.delete(key);
    fetchersQueuedForDeletion.delete(key);
    cancelledFetcherLoads.delete(key);
    fetchers.delete(key);
  }
  function queueFetcherForDeletion(key) {
    let count = (activeFetchers.get(key) || 0) - 1;
    if (count <= 0) {
      activeFetchers.delete(key);
      fetchersQueuedForDeletion.add(key);
    } else {
      activeFetchers.set(key, count);
    }
    updateState({ fetchers: new Map(state.fetchers) });
  }
  function abortFetcher(key, reason) {
    let controller = fetchControllers.get(key);
    if (controller) {
      controller.abort(reason);
      fetchControllers.delete(key);
    }
  }
  function markFetchersDone(keys, fetchers) {
    for (let key of keys) {
      let fetcher = fetchers.get(key);
      invariant(fetcher, `Expected fetcher: ${key}`);
      let doneFetcher = getDoneFetcher(fetcher.data);
      fetchers.set(key, doneFetcher);
    }
  }
  function markFetchRedirectsDone(fetchers) {
    let doneKeys = [];
    let didUpdateFetchers = false;
    for (let key of fetchRedirectIds) {
      let fetcher = fetchers.get(key);
      invariant(fetcher, `Expected fetcher: ${key}`);
      if (fetcher.state === "loading") {
        fetchRedirectIds.delete(key);
        doneKeys.push(key);
        didUpdateFetchers = true;
      }
    }
    markFetchersDone(doneKeys, fetchers);
    return didUpdateFetchers;
  }
  function abortStaleFetchLoads(landedId, fetchers) {
    let yeetedKeys = [];
    for (let [key, id] of fetchReloadIds) {
      if (id < landedId) {
        let fetcher = fetchers.get(key);
        invariant(fetcher, `Expected fetcher: ${key}`);
        if (fetcher.state === "loading") {
          abortFetcher(key);
          fetchReloadIds.delete(key);
          yeetedKeys.push(key);
        }
      }
    }
    markFetchersDone(yeetedKeys, fetchers);
    return yeetedKeys.length > 0;
  }
  function getBlocker(key, fn) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    if (blockerFunctions.get(key) !== fn) {
      blockerFunctions.set(key, fn);
    }
    return blocker;
  }
  function deleteBlocker(key) {
    state.blockers.delete(key);
    blockerFunctions.delete(key);
  }
  function updateBlocker(key, newBlocker) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    invariant(
      blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked",
      `Invalid blocker state transition: ${blocker.state} -> ${newBlocker.state}`
    );
    let blockers = new Map(state.blockers);
    blockers.set(key, newBlocker);
    updateState({ blockers });
  }
  function shouldBlockNavigation({
    currentLocation,
    nextLocation,
    historyAction
  }) {
    if (blockerFunctions.size === 0) {
      return;
    }
    if (blockerFunctions.size > 1) {
      warning(false, "A router only supports one blocker at a time");
    }
    let entries = Array.from(blockerFunctions.entries());
    let [blockerKey, blockerFunction] = entries[entries.length - 1];
    let blocker = state.blockers.get(blockerKey);
    if (blocker && blocker.state === "proceeding") {
      return;
    }
    if (blockerFunction({ currentLocation, nextLocation, historyAction })) {
      return blockerKey;
    }
  }
  function handleNavigational404(pathname) {
    let error = getInternalRouterError(404, { pathname });
    let routesToUse = dataRoutes.activeRoutes;
    let { matches, route } = getShortCircuitMatches(routesToUse);
    return { notFoundMatches: matches, route, error };
  }
  function enableScrollRestoration(positions, getPosition, getKey) {
    savedScrollPositions2 = positions;
    getScrollPosition = getPosition;
    getScrollRestorationKey2 = getKey || null;
    if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = true;
      let y = getSavedScrollPosition(state.location, state.matches);
      if (y != null) {
        updateState({ restoreScrollPosition: y });
      }
    }
    return () => {
      savedScrollPositions2 = null;
      getScrollPosition = null;
      getScrollRestorationKey2 = null;
    };
  }
  function getScrollKey(location, matches) {
    if (getScrollRestorationKey2) {
      let key = getScrollRestorationKey2(
        location,
        matches.map((m) => convertRouteMatchToUiMatch(m, state.loaderData))
      );
      return key || location.key;
    }
    return location.key;
  }
  function saveScrollPosition(location, matches) {
    if (savedScrollPositions2 && getScrollPosition) {
      let key = getScrollKey(location, matches);
      savedScrollPositions2[key] = getScrollPosition();
    }
  }
  function getSavedScrollPosition(location, matches) {
    if (savedScrollPositions2) {
      let key = getScrollKey(location, matches);
      let y = savedScrollPositions2[key];
      if (typeof y === "number") {
        return y;
      }
    }
    return null;
  }
  function checkFogOfWar(matches, routesToUse, pathname) {
    if (init.patchRoutesOnNavigation) {
      let activeBranches = dataRoutes.branches;
      if (!matches) {
        let fogMatches = matchRoutesImpl(
          routesToUse,
          pathname,
          basename,
          true,
          activeBranches
        );
        return { active: true, matches: fogMatches || [] };
      } else {
        if (Object.keys(matches[0].params).length > 0) {
          let partialMatches = matchRoutesImpl(
            routesToUse,
            pathname,
            basename,
            true,
            activeBranches
          );
          return { active: true, matches: partialMatches };
        }
      }
    }
    return { active: false, matches: null };
  }
  async function discoverRoutes(matches, pathname, signal, fetcherKey) {
    if (!init.patchRoutesOnNavigation) {
      return { type: "success", matches };
    }
    let partialMatches = matches;
    while (true) {
      let localManifest = manifest;
      try {
        await init.patchRoutesOnNavigation({
          signal,
          path: pathname,
          matches: partialMatches,
          fetcherKey,
          patch: (routeId, children) => {
            if (signal.aborted) return;
            patchRoutesImpl(
              routeId,
              children,
              dataRoutes,
              localManifest,
              mapRouteProperties2,
              false
            );
          }
        });
      } catch (e) {
        return { type: "error", error: e, partialMatches };
      }
      if (signal.aborted) {
        return { type: "aborted" };
      }
      let activeBranches = dataRoutes.branches;
      let newMatches = matchRoutesImpl(
        dataRoutes.activeRoutes,
        pathname,
        basename,
        false,
        activeBranches
      );
      let newPartialMatches = null;
      if (newMatches) {
        if (Object.keys(newMatches[0].params).length === 0) {
          return { type: "success", matches: newMatches };
        } else {
          newPartialMatches = matchRoutesImpl(
            dataRoutes.activeRoutes,
            pathname,
            basename,
            true,
            activeBranches
          );
          let matchedDeeper = newPartialMatches && partialMatches.length < newPartialMatches.length && compareMatches(
            partialMatches,
            newPartialMatches.slice(0, partialMatches.length)
          );
          if (!matchedDeeper) {
            return { type: "success", matches: newMatches };
          }
        }
      }
      if (!newPartialMatches) {
        newPartialMatches = matchRoutesImpl(
          dataRoutes.activeRoutes,
          pathname,
          basename,
          true,
          activeBranches
        );
      }
      if (!newPartialMatches || compareMatches(partialMatches, newPartialMatches)) {
        return { type: "success", matches: null };
      }
      partialMatches = newPartialMatches;
    }
  }
  function compareMatches(a, b) {
    return a.length === b.length && a.every((m, i) => m.route.id === b[i].route.id);
  }
  function _internalSetRoutes(newRoutes) {
    manifest = {};
    dataRoutes.setHmrRoutes(
      convertRoutesToDataRoutes(
        newRoutes,
        mapRouteProperties2,
        void 0,
        manifest
      )
    );
  }
  function patchRoutes(routeId, children, unstable_allowElementMutations = false) {
    patchRoutesImpl(
      routeId,
      children,
      dataRoutes,
      manifest,
      mapRouteProperties2,
      unstable_allowElementMutations
    );
    if (!dataRoutes.hasHMRRoutes) {
      updateState({});
    }
  }
  router = {
    get basename() {
      return basename;
    },
    get future() {
      return future;
    },
    get state() {
      return state;
    },
    get routes() {
      return dataRoutes.stableRoutes;
    },
    get branches() {
      return dataRoutes.branches;
    },
    get manifest() {
      return manifest;
    },
    get window() {
      return routerWindow;
    },
    initialize,
    subscribe,
    enableScrollRestoration,
    navigate,
    fetch: fetch2,
    revalidate,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (to) => init.history.createHref(to),
    encodeLocation: (to) => init.history.encodeLocation(to),
    getFetcher,
    resetFetcher,
    deleteFetcher: queueFetcherForDeletion,
    dispose,
    getBlocker,
    deleteBlocker,
    patchRoutes,
    _internalFetchControllers: fetchControllers,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(newState) {
      updateState(newState);
    }
  };
  if (init.instrumentations) {
    router = instrumentClientSideRouter(
      router,
      init.instrumentations.map((i) => i.router).filter(Boolean)
    );
  }
  return router;
}
function createStaticHandler(routes, opts) {
  invariant(
    routes.length > 0,
    "You must provide a non-empty routes array to createStaticHandler"
  );
  let manifest = {};
  let basename = (opts ? opts.basename : null) || "/";
  let _mapRouteProperties = opts?.mapRouteProperties || defaultMapRouteProperties;
  let mapRouteProperties2 = _mapRouteProperties;
  let future = {
    ...opts?.future
  };
  if (opts?.instrumentations) {
    let instrumentations = opts.instrumentations;
    mapRouteProperties2 = (route) => {
      return {
        ..._mapRouteProperties(route),
        ...getRouteInstrumentationUpdates(
          instrumentations.map((i) => i.route).filter(Boolean),
          route
        )
      };
    };
  }
  let dataRoutes = convertRoutesToDataRoutes(
    routes,
    mapRouteProperties2,
    void 0,
    manifest
  );
  let routeBranches = flattenAndRankRoutes(dataRoutes);
  async function query(request, {
    requestContext,
    filterMatchesToLoad,
    skipLoaderErrorBubbling,
    skipRevalidation,
    dataStrategy,
    generateMiddlewareResponse,
    normalizePath
  } = {}) {
    let normalizePathImpl = normalizePath || defaultNormalizePath;
    let method = request.method;
    let location = createLocation(
      "",
      normalizePathImpl(request),
      null,
      "default"
    );
    let matches = matchRoutesImpl(
      dataRoutes,
      location,
      basename,
      false,
      routeBranches
    );
    requestContext = requestContext != null ? requestContext : new RouterContextProvider();
    if (!isValidMethod(method) && method !== "HEAD") {
      let error = getInternalRouterError(405, { method });
      let { matches: methodNotAllowedMatches, route } = getShortCircuitMatches(dataRoutes);
      let staticContext = {
        basename,
        location,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {}
      };
      return generateMiddlewareResponse ? generateMiddlewareResponse(() => Promise.resolve(staticContext)) : staticContext;
    } else if (!matches) {
      let error = getInternalRouterError(404, { pathname: location.pathname });
      let { matches: notFoundMatches, route } = getShortCircuitMatches(dataRoutes);
      let staticContext = {
        basename,
        location,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {}
      };
      return generateMiddlewareResponse ? generateMiddlewareResponse(() => Promise.resolve(staticContext)) : staticContext;
    }
    if (generateMiddlewareResponse) {
      invariant(
        requestContext instanceof RouterContextProvider,
        "When using middleware in `staticHandler.query()`, any provided `requestContext` must be an instance of `RouterContextProvider`"
      );
      try {
        await loadLazyMiddlewareForMatches(
          matches,
          manifest,
          mapRouteProperties2
        );
        let renderedStaticContext;
        let response = await runServerMiddlewarePipeline(
          {
            request,
            url: createDataFunctionUrl(request, location),
            pattern: getRoutePattern(matches),
            matches,
            params: matches[0].params,
            // If we're calling middleware then it must be enabled so we can cast
            // this to the proper type knowing it's not an `AppLoadContext`
            context: requestContext
          },
          async () => {
            let res = await generateMiddlewareResponse(
              async (revalidationRequest, opts2 = {}) => {
                let result2 = await queryImpl(
                  revalidationRequest,
                  location,
                  matches,
                  requestContext,
                  dataStrategy || null,
                  skipLoaderErrorBubbling === true,
                  null,
                  "filterMatchesToLoad" in opts2 ? opts2.filterMatchesToLoad ?? null : filterMatchesToLoad ?? null,
                  skipRevalidation === true
                );
                if (isResponse(result2)) {
                  return result2;
                }
                renderedStaticContext = { location, basename, ...result2 };
                return renderedStaticContext;
              }
            );
            return res;
          },
          async (error, routeId) => {
            if (isRedirectResponse(error)) {
              return error;
            }
            if (isResponse(error)) {
              try {
                error = new ErrorResponseImpl(
                  error.status,
                  error.statusText,
                  await parseResponseBody(error)
                );
              } catch (e) {
                error = e;
              }
            }
            if (isDataWithResponseInit(error)) {
              error = dataWithResponseInitToErrorResponse(error);
            }
            if (renderedStaticContext) {
              if (routeId in renderedStaticContext.loaderData) {
                renderedStaticContext.loaderData[routeId] = void 0;
              }
              let staticContext = getStaticContextFromError(
                dataRoutes,
                renderedStaticContext,
                error,
                skipLoaderErrorBubbling ? routeId : findNearestBoundary(matches, routeId).route.id
              );
              return generateMiddlewareResponse(
                () => Promise.resolve(staticContext)
              );
            } else {
              let boundaryRouteId = skipLoaderErrorBubbling ? routeId : findNearestBoundary(
                matches,
                matches.find(
                  (m) => m.route.id === routeId || m.route.loader
                )?.route.id || routeId
              ).route.id;
              let staticContext = {
                matches,
                location,
                basename,
                loaderData: {},
                actionData: null,
                errors: {
                  [boundaryRouteId]: error
                },
                statusCode: isRouteErrorResponse(error) ? error.status : 500,
                actionHeaders: {},
                loaderHeaders: {}
              };
              return generateMiddlewareResponse(
                () => Promise.resolve(staticContext)
              );
            }
          }
        );
        invariant(isResponse(response), "Expected a response in query()");
        return response;
      } catch (e) {
        if (isResponse(e)) {
          return e;
        }
        throw e;
      }
    }
    let result = await queryImpl(
      request,
      location,
      matches,
      requestContext,
      dataStrategy || null,
      skipLoaderErrorBubbling === true,
      null,
      filterMatchesToLoad || null,
      skipRevalidation === true
    );
    if (isResponse(result)) {
      return result;
    }
    return { location, basename, ...result };
  }
  async function queryRoute(request, {
    routeId,
    requestContext,
    dataStrategy,
    generateMiddlewareResponse,
    normalizePath
  } = {}) {
    let normalizePathImpl = normalizePath || defaultNormalizePath;
    let method = request.method;
    let location = createLocation(
      "",
      normalizePathImpl(request),
      null,
      "default"
    );
    let matches = matchRoutesImpl(
      dataRoutes,
      location,
      basename,
      false,
      routeBranches
    );
    requestContext = requestContext != null ? requestContext : new RouterContextProvider();
    if (!isValidMethod(method) && method !== "HEAD" && method !== "OPTIONS") {
      throw getInternalRouterError(405, { method });
    } else if (!matches) {
      throw getInternalRouterError(404, { pathname: location.pathname });
    }
    let match = routeId ? matches.find((m) => m.route.id === routeId) : getTargetMatch(matches, location);
    if (routeId && !match) {
      throw getInternalRouterError(403, {
        pathname: location.pathname,
        routeId
      });
    } else if (!match) {
      throw getInternalRouterError(404, { pathname: location.pathname });
    }
    if (generateMiddlewareResponse) {
      invariant(
        requestContext instanceof RouterContextProvider,
        "When using middleware in `staticHandler.queryRoute()`, any provided `requestContext` must be an instance of `RouterContextProvider`"
      );
      await loadLazyMiddlewareForMatches(matches, manifest, mapRouteProperties2);
      let response = await runServerMiddlewarePipeline(
        {
          request,
          url: createDataFunctionUrl(request, location),
          pattern: getRoutePattern(matches),
          matches,
          params: matches[0].params,
          // If we're calling middleware then it must be enabled so we can cast
          // this to the proper type knowing it's not an `AppLoadContext`
          context: requestContext
        },
        async () => {
          let res = await generateMiddlewareResponse(
            async (innerRequest) => {
              let result2 = await queryImpl(
                innerRequest,
                location,
                matches,
                requestContext,
                dataStrategy || null,
                false,
                match,
                null,
                false
              );
              let processed = handleQueryResult(result2);
              return isResponse(processed) ? processed : typeof processed === "string" ? new Response(processed) : Response.json(processed);
            }
          );
          return res;
        },
        (error) => {
          if (isDataWithResponseInit(error)) {
            return Promise.resolve(dataWithResponseInitToResponse(error));
          }
          if (isResponse(error)) {
            return Promise.resolve(error);
          }
          throw error;
        }
      );
      return response;
    }
    let result = await queryImpl(
      request,
      location,
      matches,
      requestContext,
      dataStrategy || null,
      false,
      match,
      null,
      false
    );
    return handleQueryResult(result);
    function handleQueryResult(result2) {
      if (isResponse(result2)) {
        return result2;
      }
      let error = result2.errors ? Object.values(result2.errors)[0] : void 0;
      if (error !== void 0) {
        throw error;
      }
      if (result2.actionData) {
        return Object.values(result2.actionData)[0];
      }
      if (result2.loaderData) {
        return Object.values(result2.loaderData)[0];
      }
      return void 0;
    }
  }
  async function queryImpl(request, location, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch, filterMatchesToLoad, skipRevalidation) {
    invariant(
      request.signal,
      "query()/queryRoute() requests must contain an AbortController signal"
    );
    try {
      if (isMutationMethod(request.method)) {
        let result2 = await submit(
          request,
          location,
          matches,
          routeMatch || getTargetMatch(matches, location),
          requestContext,
          dataStrategy,
          skipLoaderErrorBubbling,
          routeMatch != null,
          filterMatchesToLoad,
          skipRevalidation
        );
        return result2;
      }
      let result = await loadRouteData(
        request,
        location,
        matches,
        requestContext,
        dataStrategy,
        skipLoaderErrorBubbling,
        routeMatch,
        filterMatchesToLoad
      );
      return isResponse(result) ? result : {
        ...result,
        actionData: null,
        actionHeaders: {}
      };
    } catch (e) {
      if (isDataStrategyResult(e) && isResponse(e.result)) {
        if (e.type === "error" /* error */) {
          throw e.result;
        }
        return e.result;
      }
      if (isRedirectResponse(e)) {
        return e;
      }
      throw e;
    }
  }
  async function submit(request, location, matches, actionMatch, requestContext, dataStrategy, skipLoaderErrorBubbling, isRouteRequest, filterMatchesToLoad, skipRevalidation) {
    let result;
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: actionMatch.route.id
      });
      if (isRouteRequest) {
        throw error;
      }
      result = {
        type: "error" /* error */,
        error
      };
    } else {
      let dsMatches = getTargetedDataStrategyMatches(
        mapRouteProperties2,
        manifest,
        request,
        location,
        matches,
        actionMatch,
        [],
        requestContext
      );
      let results = await callDataStrategy(
        request,
        location,
        dsMatches,
        isRouteRequest,
        requestContext,
        dataStrategy
      );
      result = results[actionMatch.route.id];
      if (request.signal.aborted) {
        throwStaticHandlerAbortedError(request, isRouteRequest);
      }
    }
    if (isRedirectResult(result)) {
      throw new Response(null, {
        status: result.response.status,
        headers: {
          Location: result.response.headers.get("Location")
        }
      });
    }
    if (isRouteRequest) {
      if (isErrorResult(result)) {
        throw result.error;
      }
      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: { [actionMatch.route.id]: result.data },
        errors: null,
        // Note: statusCode + headers are unused here since queryRoute will
        // return the raw Response or value
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {}
      };
    }
    if (skipRevalidation) {
      if (isErrorResult(result)) {
        let boundaryMatch = skipLoaderErrorBubbling ? actionMatch : findNearestBoundary(matches, actionMatch.route.id);
        return {
          statusCode: isRouteErrorResponse(result.error) ? result.error.status : result.statusCode != null ? result.statusCode : 500,
          actionData: null,
          actionHeaders: {
            ...result.headers ? { [actionMatch.route.id]: result.headers } : {}
          },
          matches,
          loaderData: {},
          errors: {
            [boundaryMatch.route.id]: result.error
          },
          loaderHeaders: {}
        };
      } else {
        return {
          actionData: {
            [actionMatch.route.id]: result.data
          },
          actionHeaders: result.headers ? { [actionMatch.route.id]: result.headers } : {},
          matches,
          loaderData: {},
          errors: null,
          statusCode: result.statusCode || 200,
          loaderHeaders: {}
        };
      }
    }
    let loaderRequest = new Request(request.url, {
      headers: request.headers,
      redirect: request.redirect,
      signal: request.signal
    });
    if (isErrorResult(result)) {
      let boundaryMatch = skipLoaderErrorBubbling ? actionMatch : findNearestBoundary(matches, actionMatch.route.id);
      let handlerContext2 = await loadRouteData(
        loaderRequest,
        location,
        matches,
        requestContext,
        dataStrategy,
        skipLoaderErrorBubbling,
        null,
        filterMatchesToLoad,
        [boundaryMatch.route.id, result]
      );
      return {
        ...handlerContext2,
        statusCode: isRouteErrorResponse(result.error) ? result.error.status : result.statusCode != null ? result.statusCode : 500,
        actionData: null,
        actionHeaders: {
          ...result.headers ? { [actionMatch.route.id]: result.headers } : {}
        }
      };
    }
    let handlerContext = await loadRouteData(
      loaderRequest,
      location,
      matches,
      requestContext,
      dataStrategy,
      skipLoaderErrorBubbling,
      null,
      filterMatchesToLoad
    );
    return {
      ...handlerContext,
      actionData: {
        [actionMatch.route.id]: result.data
      },
      // action status codes take precedence over loader status codes
      ...result.statusCode ? { statusCode: result.statusCode } : {},
      actionHeaders: result.headers ? { [actionMatch.route.id]: result.headers } : {}
    };
  }
  async function loadRouteData(request, location, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch, filterMatchesToLoad, pendingActionResult) {
    let isRouteRequest = routeMatch != null;
    if (isRouteRequest && !routeMatch?.route.loader && !routeMatch?.route.lazy) {
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: routeMatch?.route.id
      });
    }
    let dsMatches;
    if (routeMatch) {
      dsMatches = getTargetedDataStrategyMatches(
        mapRouteProperties2,
        manifest,
        request,
        location,
        matches,
        routeMatch,
        [],
        requestContext
      );
    } else {
      let maxIdx = pendingActionResult && isErrorResult(pendingActionResult[1]) ? (
        // Up to but not including the boundary
        matches.findIndex((m) => m.route.id === pendingActionResult[0]) - 1
      ) : void 0;
      let pattern = getRoutePattern(matches);
      dsMatches = matches.map((match, index) => {
        if (maxIdx != null && index > maxIdx) {
          return getDataStrategyMatch(
            mapRouteProperties2,
            manifest,
            request,
            location,
            pattern,
            match,
            [],
            requestContext,
            false
          );
        }
        return getDataStrategyMatch(
          mapRouteProperties2,
          manifest,
          request,
          location,
          pattern,
          match,
          [],
          requestContext,
          (match.route.loader || match.route.lazy) != null && (!filterMatchesToLoad || filterMatchesToLoad(match))
        );
      });
    }
    if (!dataStrategy && !dsMatches.some((m) => m.shouldLoad)) {
      return {
        matches,
        loaderData: {},
        errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
          [pendingActionResult[0]]: pendingActionResult[1].error
        } : null,
        statusCode: 200,
        loaderHeaders: {}
      };
    }
    let results = await callDataStrategy(
      request,
      location,
      dsMatches,
      isRouteRequest,
      requestContext,
      dataStrategy
    );
    if (request.signal.aborted) {
      throwStaticHandlerAbortedError(request, isRouteRequest);
    }
    let handlerContext = processRouteLoaderData(
      matches,
      results,
      pendingActionResult,
      true,
      skipLoaderErrorBubbling
    );
    return {
      ...handlerContext,
      matches
    };
  }
  async function callDataStrategy(request, location, matches, isRouteRequest, requestContext, dataStrategy) {
    let results = await callDataStrategyImpl(
      dataStrategy || defaultDataStrategy,
      request,
      location,
      matches,
      null,
      requestContext,
      true
    );
    let dataResults = {};
    await Promise.all(
      matches.map(async (match) => {
        if (!(match.route.id in results)) {
          return;
        }
        let result = results[match.route.id];
        if (isRedirectDataStrategyResult(result)) {
          let response = result.result;
          throw normalizeRelativeRoutingRedirectResponse(
            response,
            request,
            match.route.id,
            matches,
            basename
          );
        }
        if (isRouteRequest) {
          if (isResponse(result.result)) {
            throw result;
          } else if (isDataWithResponseInit(result.result)) {
            throw dataWithResponseInitToResponse(result.result);
          }
        }
        dataResults[match.route.id] = await convertDataStrategyResultToDataResult(result);
      })
    );
    return dataResults;
  }
  return {
    dataRoutes,
    _internalRouteBranches: routeBranches,
    query,
    queryRoute
  };
}
function getStaticContextFromError(routes, handlerContext, error, boundaryId) {
  let errorBoundaryId = boundaryId || handlerContext._deepestRenderedBoundaryId || routes[0].id;
  return {
    ...handlerContext,
    statusCode: isRouteErrorResponse(error) ? error.status : 500,
    errors: {
      [errorBoundaryId]: error
    }
  };
}
function throwStaticHandlerAbortedError(request, isRouteRequest) {
  if (request.signal.reason !== void 0) {
    throw request.signal.reason;
  }
  let method = isRouteRequest ? "queryRoute" : "query";
  throw new Error(
    `${method}() call aborted without an \`AbortSignal.reason\`: ${request.method} ${request.url}`
  );
}
function isSubmissionNavigation(opts) {
  return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== void 0);
}
function defaultNormalizePath(request) {
  let url = new URL(request.url);
  return {
    pathname: url.pathname,
    search: url.search,
    hash: url.hash
  };
}
function normalizeTo(location, matches, basename, to, fromRouteId, relative) {
  let contextualMatches;
  let activeRouteMatch;
  if (fromRouteId) {
    contextualMatches = [];
    for (let match of matches) {
      contextualMatches.push(match);
      if (match.route.id === fromRouteId) {
        activeRouteMatch = match;
        break;
      }
    }
  } else {
    contextualMatches = matches;
    activeRouteMatch = matches[matches.length - 1];
  }
  let path = resolveTo(
    to ? to : ".",
    getResolveToMatches(contextualMatches),
    stripBasename(location.pathname, basename) || location.pathname,
    relative === "path"
  );
  if (to == null) {
    path.search = location.search;
    path.hash = location.hash;
  }
  if ((to == null || to === "" || to === ".") && activeRouteMatch) {
    let nakedIndex = hasNakedIndexQuery(path.search);
    if (activeRouteMatch.route.index && !nakedIndex) {
      path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
    } else if (!activeRouteMatch.route.index && nakedIndex) {
      let params = new URLSearchParams(path.search);
      let indexValues = params.getAll("index");
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if (basename !== "/") {
    path.pathname = prependBasename({ basename, pathname: path.pathname });
  }
  return createPath(path);
}
function normalizeNavigateOptions(isFetcher, path, opts) {
  if (!opts || !isSubmissionNavigation(opts)) {
    return { path };
  }
  if (opts.formMethod && !isValidMethod(opts.formMethod)) {
    return {
      path,
      error: getInternalRouterError(405, { method: opts.formMethod })
    };
  }
  let getInvalidBodyError = () => ({
    path,
    error: getInternalRouterError(400, { type: "invalid-body" })
  });
  let rawFormMethod = opts.formMethod || "get";
  let formMethod = rawFormMethod.toUpperCase();
  let formAction = stripHashFromPath(path);
  if (opts.body !== void 0) {
    if (opts.formEncType === "text/plain") {
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      let text = typeof opts.body === "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(opts.body.entries()).reduce(
          (acc, [name, value]) => `${acc}${name}=${value}
`,
          ""
        )
      ) : String(opts.body);
      return {
        path,
        submission: {
          formMethod,
          formAction,
          formEncType: opts.formEncType,
          formData: void 0,
          json: void 0,
          text
        }
      };
    } else if (opts.formEncType === "application/json") {
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      try {
        let json = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
        return {
          path,
          submission: {
            formMethod,
            formAction,
            formEncType: opts.formEncType,
            formData: void 0,
            json,
            text: void 0
          }
        };
      } catch (e) {
        return getInvalidBodyError();
      }
    }
  }
  invariant(
    typeof FormData === "function",
    "FormData is not available in this environment"
  );
  let searchParams;
  let formData;
  if (opts.formData) {
    searchParams = convertFormDataToSearchParams(opts.formData);
    formData = opts.formData;
  } else if (opts.body instanceof FormData) {
    searchParams = convertFormDataToSearchParams(opts.body);
    formData = opts.body;
  } else if (opts.body instanceof URLSearchParams) {
    searchParams = opts.body;
    formData = convertSearchParamsToFormData(searchParams);
  } else if (opts.body == null) {
    searchParams = new URLSearchParams();
    formData = new FormData();
  } else {
    try {
      searchParams = new URLSearchParams(opts.body);
      formData = convertSearchParamsToFormData(searchParams);
    } catch (e) {
      return getInvalidBodyError();
    }
  }
  let submission = {
    formMethod,
    formAction,
    formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
    formData,
    json: void 0,
    text: void 0
  };
  if (isMutationMethod(submission.formMethod)) {
    return { path, submission };
  }
  let parsedPath = parsePath(path);
  if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
    searchParams.append("index", "");
  }
  parsedPath.search = `?${searchParams}`;
  return { path: createPath(parsedPath), submission };
}
function getMatchesToLoad(request, scopedContext, mapRouteProperties2, manifest, history, state, matches, submission, location, lazyRoutePropertiesToSkip, initialHydration, isRevalidationRequired, cancelledFetcherLoads, fetchersQueuedForDeletion, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, hasPatchRoutesOnNavigation, branches, pendingActionResult, callSiteDefaultShouldRevalidate) {
  let actionResult = pendingActionResult ? isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : pendingActionResult[1].data : void 0;
  let currentUrl = history.createURL(state.location);
  let nextUrl = history.createURL(location);
  let maxIdx;
  if (initialHydration && state.errors) {
    let boundaryId = Object.keys(state.errors)[0];
    maxIdx = matches.findIndex((m) => m.route.id === boundaryId);
  } else if (pendingActionResult && isErrorResult(pendingActionResult[1])) {
    let boundaryId = pendingActionResult[0];
    maxIdx = matches.findIndex((m) => m.route.id === boundaryId) - 1;
  }
  let actionStatus = pendingActionResult ? pendingActionResult[1].statusCode : void 0;
  let shouldSkipRevalidation = actionStatus && actionStatus >= 400;
  let baseShouldRevalidateArgs = {
    currentUrl,
    currentParams: state.matches[0]?.params || {},
    nextUrl,
    nextParams: matches[0].params,
    ...submission,
    actionResult,
    actionStatus
  };
  let pattern = getRoutePattern(matches);
  let dsMatches = matches.map((match, index) => {
    let { route } = match;
    let forceShouldLoad = null;
    if (maxIdx != null && index > maxIdx) {
      forceShouldLoad = false;
    } else if (route.lazy) {
      forceShouldLoad = true;
    } else if (!routeHasLoaderOrMiddleware(route)) {
      forceShouldLoad = false;
    } else if (initialHydration) {
      let { shouldLoad: shouldLoad2 } = getRouteHydrationStatus(
        route,
        state.loaderData,
        state.errors
      );
      forceShouldLoad = shouldLoad2;
    } else if (isNewLoader(state.loaderData, state.matches[index], match)) {
      forceShouldLoad = true;
    }
    if (forceShouldLoad !== null) {
      return getDataStrategyMatch(
        mapRouteProperties2,
        manifest,
        request,
        location,
        pattern,
        match,
        lazyRoutePropertiesToSkip,
        scopedContext,
        forceShouldLoad
      );
    }
    let defaultShouldRevalidate = false;
    if (typeof callSiteDefaultShouldRevalidate === "boolean") {
      defaultShouldRevalidate = callSiteDefaultShouldRevalidate;
    } else if (shouldSkipRevalidation) {
      defaultShouldRevalidate = false;
    } else if (isRevalidationRequired) {
      defaultShouldRevalidate = true;
    } else if (currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search) {
      defaultShouldRevalidate = true;
    } else if (currentUrl.search !== nextUrl.search) {
      defaultShouldRevalidate = true;
    } else if (isNewRouteInstance(state.matches[index], match)) {
      defaultShouldRevalidate = true;
    }
    let shouldRevalidateArgs = {
      ...baseShouldRevalidateArgs,
      defaultShouldRevalidate
    };
    let shouldLoad = shouldRevalidateLoader(match, shouldRevalidateArgs);
    return getDataStrategyMatch(
      mapRouteProperties2,
      manifest,
      request,
      location,
      pattern,
      match,
      lazyRoutePropertiesToSkip,
      scopedContext,
      shouldLoad,
      shouldRevalidateArgs,
      callSiteDefaultShouldRevalidate
    );
  });
  let revalidatingFetchers = [];
  fetchLoadMatches.forEach((f, key) => {
    if (initialHydration || !matches.some((m) => m.route.id === f.routeId) || fetchersQueuedForDeletion.has(key)) {
      return;
    }
    let fetcher = state.fetchers.get(key);
    let isMidInitialLoad = fetcher && fetcher.state !== "idle" && fetcher.data === void 0;
    let fetcherMatches = matchRoutesImpl(
      routesToUse,
      f.path,
      basename ?? "/",
      false,
      branches
    );
    if (!fetcherMatches) {
      if (hasPatchRoutesOnNavigation && isMidInitialLoad) {
        return;
      }
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (fetchRedirectIds.has(key)) {
      return;
    }
    let fetcherMatch = getTargetMatch(fetcherMatches, f.path);
    let fetchController = new AbortController();
    let fetchRequest = createClientSideRequest(
      history,
      f.path,
      fetchController.signal
    );
    let fetcherDsMatches = null;
    if (cancelledFetcherLoads.has(key)) {
      cancelledFetcherLoads.delete(key);
      fetcherDsMatches = getTargetedDataStrategyMatches(
        mapRouteProperties2,
        manifest,
        fetchRequest,
        f.path,
        fetcherMatches,
        fetcherMatch,
        lazyRoutePropertiesToSkip,
        scopedContext
      );
    } else if (isMidInitialLoad) {
      if (isRevalidationRequired) {
        fetcherDsMatches = getTargetedDataStrategyMatches(
          mapRouteProperties2,
          manifest,
          fetchRequest,
          f.path,
          fetcherMatches,
          fetcherMatch,
          lazyRoutePropertiesToSkip,
          scopedContext
        );
      }
    } else {
      let defaultShouldRevalidate;
      if (typeof callSiteDefaultShouldRevalidate === "boolean") {
        defaultShouldRevalidate = callSiteDefaultShouldRevalidate;
      } else if (shouldSkipRevalidation) {
        defaultShouldRevalidate = false;
      } else {
        defaultShouldRevalidate = isRevalidationRequired;
      }
      let shouldRevalidateArgs = {
        ...baseShouldRevalidateArgs,
        defaultShouldRevalidate
      };
      if (shouldRevalidateLoader(fetcherMatch, shouldRevalidateArgs)) {
        fetcherDsMatches = getTargetedDataStrategyMatches(
          mapRouteProperties2,
          manifest,
          fetchRequest,
          f.path,
          fetcherMatches,
          fetcherMatch,
          lazyRoutePropertiesToSkip,
          scopedContext,
          shouldRevalidateArgs
        );
      }
    }
    if (fetcherDsMatches) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: fetcherDsMatches,
        match: fetcherMatch,
        request: fetchRequest,
        controller: fetchController
      });
    }
  });
  return { dsMatches, revalidatingFetchers };
}
function routeHasLoaderOrMiddleware(route) {
  return route.loader != null || route.middleware != null && route.middleware.length > 0;
}
function getRouteHydrationStatus(route, loaderData, errors) {
  if (route.lazy) {
    return { shouldLoad: true, renderFallback: true };
  }
  if (!routeHasLoaderOrMiddleware(route)) {
    return { shouldLoad: false, renderFallback: false };
  }
  let hasData = loaderData != null && route.id in loaderData;
  let hasError = errors != null && errors[route.id] !== void 0;
  if (!hasData && hasError) {
    return { shouldLoad: false, renderFallback: false };
  }
  if (typeof route.loader === "function" && route.loader.hydrate === true) {
    return { shouldLoad: true, renderFallback: !hasData };
  }
  let shouldLoad = !hasData && !hasError;
  return { shouldLoad, renderFallback: shouldLoad };
}
function isNewLoader(currentLoaderData, currentMatch, match) {
  let isNew = (
    // [a] -> [a, b]
    !currentMatch || // [a, b] -> [a, c]
    match.route.id !== currentMatch.route.id
  );
  let isMissingData = !currentLoaderData.hasOwnProperty(match.route.id);
  return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match) {
  let currentPath = currentMatch.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    currentMatch.pathname !== match.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]
  );
}
function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    let routeChoice = loaderMatch.route.shouldRevalidate(arg);
    if (typeof routeChoice === "boolean") {
      return routeChoice;
    }
  }
  return arg.defaultShouldRevalidate;
}
function patchRoutesImpl(routeId, children, dataRoutes, manifest, mapRouteProperties2, allowElementMutations) {
  let childrenToPatch;
  if (routeId) {
    let route = manifest[routeId];
    invariant(
      route,
      `No route found to patch children into: routeId = ${routeId}`
    );
    if (!route.children) {
      route.children = [];
    }
    childrenToPatch = route.children;
  } else {
    childrenToPatch = dataRoutes.activeRoutes;
  }
  let uniqueChildren = [];
  let existingChildren = [];
  children.forEach((newRoute) => {
    let existingRoute = childrenToPatch.find(
      (existingRoute2) => isSameRoute(newRoute, existingRoute2)
    );
    if (existingRoute) {
      existingChildren.push({ existingRoute, newRoute });
    } else {
      uniqueChildren.push(newRoute);
    }
  });
  if (uniqueChildren.length > 0) {
    let newRoutes = convertRoutesToDataRoutes(
      uniqueChildren,
      mapRouteProperties2,
      [routeId || "_", "patch", String(childrenToPatch?.length || "0")],
      manifest
    );
    childrenToPatch.push(...newRoutes);
  }
  if (allowElementMutations && existingChildren.length > 0) {
    for (let i = 0; i < existingChildren.length; i++) {
      let { existingRoute, newRoute } = existingChildren[i];
      let existingRouteTyped = existingRoute;
      let [newRouteTyped] = convertRoutesToDataRoutes(
        [newRoute],
        mapRouteProperties2,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        true
      );
      Object.assign(existingRouteTyped, {
        element: newRouteTyped.element ? newRouteTyped.element : existingRouteTyped.element,
        errorElement: newRouteTyped.errorElement ? newRouteTyped.errorElement : existingRouteTyped.errorElement,
        hydrateFallbackElement: newRouteTyped.hydrateFallbackElement ? newRouteTyped.hydrateFallbackElement : existingRouteTyped.hydrateFallbackElement
      });
    }
  }
  if (!dataRoutes.hasHMRRoutes) {
    dataRoutes.setRoutes([...dataRoutes.activeRoutes]);
  }
}
function isSameRoute(newRoute, existingRoute) {
  if ("id" in newRoute && "id" in existingRoute && newRoute.id === existingRoute.id) {
    return true;
  }
  if (!(newRoute.index === existingRoute.index && newRoute.path === existingRoute.path && newRoute.caseSensitive === existingRoute.caseSensitive)) {
    return false;
  }
  if ((!newRoute.children || newRoute.children.length === 0) && (!existingRoute.children || existingRoute.children.length === 0)) {
    return true;
  }
  return newRoute.children?.every(
    (aChild, i) => existingRoute.children?.some((bChild) => isSameRoute(aChild, bChild))
  ) ?? false;
}
var lazyRoutePropertyCache = /* @__PURE__ */ new WeakMap();
var loadLazyRouteProperty = ({
  key,
  route,
  manifest,
  mapRouteProperties: mapRouteProperties2
}) => {
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  if (!routeToUpdate.lazy || typeof routeToUpdate.lazy !== "object") {
    return;
  }
  let lazyFn = routeToUpdate.lazy[key];
  if (!lazyFn) {
    return;
  }
  let cache = lazyRoutePropertyCache.get(routeToUpdate);
  if (!cache) {
    cache = {};
    lazyRoutePropertyCache.set(routeToUpdate, cache);
  }
  let cachedPromise = cache[key];
  if (cachedPromise) {
    return cachedPromise;
  }
  let propertyPromise = (async () => {
    let isUnsupported = isUnsupportedLazyRouteObjectKey(key);
    let staticRouteValue = routeToUpdate[key];
    let isStaticallyDefined = staticRouteValue !== void 0 && key !== "hasErrorBoundary";
    if (isUnsupported) {
      warning(
        !isUnsupported,
        "Route property " + key + " is not a supported lazy route property. This property will be ignored."
      );
      cache[key] = Promise.resolve();
    } else if (isStaticallyDefined) {
      warning(
        false,
        `Route "${routeToUpdate.id}" has a static property "${key}" defined. The lazy property will be ignored.`
      );
    } else {
      let value = await lazyFn();
      if (value != null) {
        Object.assign(routeToUpdate, { [key]: value });
        Object.assign(routeToUpdate, mapRouteProperties2(routeToUpdate));
      }
    }
    if (typeof routeToUpdate.lazy === "object") {
      routeToUpdate.lazy[key] = void 0;
      if (Object.values(routeToUpdate.lazy).every((value) => value === void 0)) {
        routeToUpdate.lazy = void 0;
      }
    }
  })();
  cache[key] = propertyPromise;
  return propertyPromise;
};
var lazyRouteFunctionCache = /* @__PURE__ */ new WeakMap();
function loadLazyRoute(route, type, manifest, mapRouteProperties2, lazyRoutePropertiesToSkip) {
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  if (!route.lazy) {
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  }
  if (typeof route.lazy === "function") {
    let cachedPromise = lazyRouteFunctionCache.get(routeToUpdate);
    if (cachedPromise) {
      return {
        lazyRoutePromise: cachedPromise,
        lazyHandlerPromise: cachedPromise
      };
    }
    let lazyRoutePromise2 = (async () => {
      invariant(
        typeof route.lazy === "function",
        "No lazy route function found"
      );
      let lazyRoute = await route.lazy();
      let routeUpdates = {};
      for (let lazyRouteProperty in lazyRoute) {
        let lazyValue = lazyRoute[lazyRouteProperty];
        if (lazyValue === void 0) {
          continue;
        }
        let isUnsupported = isUnsupportedLazyRouteFunctionKey(lazyRouteProperty);
        let staticRouteValue = routeToUpdate[lazyRouteProperty];
        let isStaticallyDefined = staticRouteValue !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        lazyRouteProperty !== "hasErrorBoundary";
        if (isUnsupported) {
          warning(
            !isUnsupported,
            "Route property " + lazyRouteProperty + " is not a supported property to be returned from a lazy route function. This property will be ignored."
          );
        } else if (isStaticallyDefined) {
          warning(
            !isStaticallyDefined,
            `Route "${routeToUpdate.id}" has a static property "${lazyRouteProperty}" defined but its lazy function is also returning a value for this property. The lazy route property "${lazyRouteProperty}" will be ignored.`
          );
        } else {
          routeUpdates[lazyRouteProperty] = lazyValue;
        }
      }
      Object.assign(routeToUpdate, routeUpdates);
      Object.assign(routeToUpdate, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...mapRouteProperties2(routeToUpdate),
        lazy: void 0
      });
    })();
    lazyRouteFunctionCache.set(routeToUpdate, lazyRoutePromise2);
    lazyRoutePromise2.catch(() => {
    });
    return {
      lazyRoutePromise: lazyRoutePromise2,
      lazyHandlerPromise: lazyRoutePromise2
    };
  }
  let lazyKeys = Object.keys(route.lazy);
  let lazyPropertyPromises = [];
  let lazyHandlerPromise = void 0;
  for (let key of lazyKeys) {
    if (lazyRoutePropertiesToSkip && lazyRoutePropertiesToSkip.includes(key)) {
      continue;
    }
    let promise = loadLazyRouteProperty({
      key,
      route,
      manifest,
      mapRouteProperties: mapRouteProperties2
    });
    if (promise) {
      lazyPropertyPromises.push(promise);
      if (key === type) {
        lazyHandlerPromise = promise;
      }
    }
  }
  let lazyRoutePromise = lazyPropertyPromises.length > 0 ? Promise.all(lazyPropertyPromises).then(() => {
  }) : void 0;
  lazyRoutePromise?.catch(() => {
  });
  lazyHandlerPromise?.catch(() => {
  });
  return {
    lazyRoutePromise,
    lazyHandlerPromise
  };
}
function isNonNullable(value) {
  return value !== void 0;
}
function loadLazyMiddlewareForMatches(matches, manifest, mapRouteProperties2) {
  let promises = matches.map(({ route }) => {
    if (typeof route.lazy !== "object" || !route.lazy.middleware) {
      return void 0;
    }
    return loadLazyRouteProperty({
      key: "middleware",
      route,
      manifest,
      mapRouteProperties: mapRouteProperties2
    });
  }).filter(isNonNullable);
  return promises.length > 0 ? Promise.all(promises) : void 0;
}
async function defaultDataStrategy(args) {
  let matchesToLoad = args.matches.filter((m) => m.shouldLoad);
  let keyedResults = {};
  let results = await Promise.all(matchesToLoad.map((m) => m.resolve()));
  results.forEach((result, i) => {
    keyedResults[matchesToLoad[i].route.id] = result;
  });
  return keyedResults;
}
async function defaultDataStrategyWithMiddleware(args) {
  if (!args.matches.some((m) => m.route.middleware)) {
    return defaultDataStrategy(args);
  }
  return runClientMiddlewarePipeline(args, () => defaultDataStrategy(args));
}
function runServerMiddlewarePipeline(args, handler, errorHandler) {
  return runMiddlewarePipeline(
    args,
    handler,
    processResult,
    isResponse,
    errorHandler
  );
  function processResult(result) {
    return isDataWithResponseInit(result) ? dataWithResponseInitToResponse(result) : result;
  }
}
function runClientMiddlewarePipeline(args, handler) {
  return runMiddlewarePipeline(
    args,
    handler,
    (r) => {
      if (isRedirectResponse(r)) {
        throw r;
      }
      return r;
    },
    isDataStrategyResults,
    errorHandler
  );
  function errorHandler(error, routeId, nextResult) {
    if (nextResult) {
      return Promise.resolve(
        Object.assign(nextResult.value, {
          [routeId]: { type: "error", result: error }
        })
      );
    } else {
      let { matches } = args;
      let maxBoundaryIdx = Math.min(
        // Throwing route
        Math.max(
          matches.findIndex((m) => m.route.id === routeId),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          matches.findIndex((m) => m.shouldCallHandler()),
          0
        )
      );
      let boundaryRouteId = findNearestBoundary(
        matches,
        matches[maxBoundaryIdx].route.id
      ).route.id;
      return Promise.resolve({
        [boundaryRouteId]: { type: "error", result: error }
      });
    }
  }
}
async function runMiddlewarePipeline(args, handler, processResult, isResult, errorHandler) {
  let { matches, ...dataFnArgs } = args;
  let tuples = matches.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((fn) => [m.route.id, fn]) : []
  );
  let result = await callRouteMiddleware(
    dataFnArgs,
    tuples,
    handler,
    processResult,
    isResult,
    errorHandler
  );
  return result;
}
async function callRouteMiddleware(args, middlewares, handler, processResult, isResult, errorHandler, idx = 0) {
  let { request } = args;
  if (request.signal.aborted) {
    throw request.signal.reason ?? new Error(`Request aborted: ${request.method} ${request.url}`);
  }
  let tuple = middlewares[idx];
  if (!tuple) {
    let result = await handler();
    return result;
  }
  let [routeId, middleware] = tuple;
  let nextResult;
  let next = async () => {
    if (nextResult) {
      throw new Error("You may only call `next()` once per middleware");
    }
    try {
      let result = await callRouteMiddleware(
        args,
        middlewares,
        handler,
        processResult,
        isResult,
        errorHandler,
        idx + 1
      );
      nextResult = { value: result };
      return nextResult.value;
    } catch (error) {
      nextResult = { value: await errorHandler(error, routeId, nextResult) };
      return nextResult.value;
    }
  };
  try {
    let value = await middleware(args, next);
    let result = value != null ? processResult(value) : void 0;
    if (isResult(result)) {
      return result;
    } else if (nextResult) {
      return result ?? nextResult.value;
    } else {
      nextResult = { value: await next() };
      return nextResult.value;
    }
  } catch (error) {
    let response = await errorHandler(error, routeId, nextResult);
    return response;
  }
}
function getDataStrategyMatchLazyPromises(mapRouteProperties2, manifest, request, match, lazyRoutePropertiesToSkip) {
  let lazyMiddlewarePromise = loadLazyRouteProperty({
    key: "middleware",
    route: match.route,
    manifest,
    mapRouteProperties: mapRouteProperties2
  });
  let lazyRoutePromises = loadLazyRoute(
    match.route,
    isMutationMethod(request.method) ? "action" : "loader",
    manifest,
    mapRouteProperties2,
    lazyRoutePropertiesToSkip
  );
  return {
    middleware: lazyMiddlewarePromise,
    route: lazyRoutePromises.lazyRoutePromise,
    handler: lazyRoutePromises.lazyHandlerPromise
  };
}
function getDataStrategyMatch(mapRouteProperties2, manifest, request, path, pattern, match, lazyRoutePropertiesToSkip, scopedContext, shouldLoad, shouldRevalidateArgs = null, callSiteDefaultShouldRevalidate) {
  let isUsingNewApi = false;
  let _lazyPromises = getDataStrategyMatchLazyPromises(
    mapRouteProperties2,
    manifest,
    request,
    match,
    lazyRoutePropertiesToSkip
  );
  return {
    ...match,
    _lazyPromises,
    shouldLoad,
    shouldRevalidateArgs,
    shouldCallHandler(defaultShouldRevalidate) {
      isUsingNewApi = true;
      if (!shouldRevalidateArgs) {
        return shouldLoad;
      }
      if (typeof callSiteDefaultShouldRevalidate === "boolean") {
        return shouldRevalidateLoader(match, {
          ...shouldRevalidateArgs,
          defaultShouldRevalidate: callSiteDefaultShouldRevalidate
        });
      }
      if (typeof defaultShouldRevalidate === "boolean") {
        return shouldRevalidateLoader(match, {
          ...shouldRevalidateArgs,
          defaultShouldRevalidate
        });
      }
      return shouldRevalidateLoader(match, shouldRevalidateArgs);
    },
    resolve(handlerOverride) {
      let { lazy, loader, middleware } = match.route;
      let callHandler = isUsingNewApi || shouldLoad || handlerOverride && !isMutationMethod(request.method) && (lazy || loader);
      let isMiddlewareOnlyRoute = middleware && middleware.length > 0 && !loader && !lazy;
      if (callHandler && (isMutationMethod(request.method) || !isMiddlewareOnlyRoute)) {
        return callLoaderOrAction({
          request,
          path,
          pattern,
          match,
          lazyHandlerPromise: _lazyPromises?.handler,
          lazyRoutePromise: _lazyPromises?.route,
          handlerOverride,
          scopedContext
        });
      }
      return Promise.resolve({ type: "data" /* data */, result: void 0 });
    }
  };
}
function getTargetedDataStrategyMatches(mapRouteProperties2, manifest, request, path, matches, targetMatch, lazyRoutePropertiesToSkip, scopedContext, shouldRevalidateArgs = null) {
  return matches.map((match) => {
    if (match.route.id !== targetMatch.route.id) {
      return {
        ...match,
        shouldLoad: false,
        shouldRevalidateArgs,
        shouldCallHandler: () => false,
        _lazyPromises: getDataStrategyMatchLazyPromises(
          mapRouteProperties2,
          manifest,
          request,
          match,
          lazyRoutePropertiesToSkip
        ),
        resolve: () => Promise.resolve({ type: "data", result: void 0 })
      };
    }
    return getDataStrategyMatch(
      mapRouteProperties2,
      manifest,
      request,
      path,
      getRoutePattern(matches),
      match,
      lazyRoutePropertiesToSkip,
      scopedContext,
      true,
      shouldRevalidateArgs
    );
  });
}
async function callDataStrategyImpl(dataStrategyImpl, request, path, matches, fetcherKey, scopedContext, isStaticHandler) {
  if (matches.some((m) => m._lazyPromises?.middleware)) {
    await Promise.all(matches.map((m) => m._lazyPromises?.middleware));
  }
  let dataStrategyArgs = {
    request,
    url: createDataFunctionUrl(request, path),
    pattern: getRoutePattern(matches),
    params: matches[0].params,
    context: scopedContext,
    matches
  };
  let runClientMiddleware = isStaticHandler ? () => {
    throw new Error(
      "You cannot call `runClientMiddleware()` from a static handler `dataStrategy`. Middleware is run outside of `dataStrategy` during SSR in order to bubble up the Response.  You can enable middleware via the `respond` API in `query`/`queryRoute`"
    );
  } : (cb) => {
    let typedDataStrategyArgs = dataStrategyArgs;
    return runClientMiddlewarePipeline(typedDataStrategyArgs, () => {
      return cb({
        ...typedDataStrategyArgs,
        fetcherKey,
        runClientMiddleware: () => {
          throw new Error(
            "Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler"
          );
        }
      });
    });
  };
  let results = await dataStrategyImpl({
    ...dataStrategyArgs,
    fetcherKey,
    runClientMiddleware
  });
  try {
    await Promise.all(
      matches.flatMap((m) => [
        m._lazyPromises?.handler,
        m._lazyPromises?.route
      ])
    );
  } catch (e) {
  }
  return results;
}
async function callLoaderOrAction({
  request,
  path,
  pattern,
  match,
  lazyHandlerPromise,
  lazyRoutePromise,
  handlerOverride,
  scopedContext
}) {
  let result;
  let onReject;
  let isAction = isMutationMethod(request.method);
  let type = isAction ? "action" : "loader";
  let runHandler = (handler) => {
    let reject;
    let abortPromise = new Promise((_, r) => reject = r);
    onReject = () => reject();
    request.signal.addEventListener("abort", onReject);
    let actualHandler = (ctx) => {
      if (typeof handler !== "function") {
        return Promise.reject(
          new Error(
            `You cannot call the handler for a route which defines a boolean "${type}" [routeId: ${match.route.id}]`
          )
        );
      }
      return handler(
        {
          request,
          url: createDataFunctionUrl(request, path),
          pattern,
          params: match.params,
          context: scopedContext
        },
        ...ctx !== void 0 ? [ctx] : []
      );
    };
    let handlerPromise = (async () => {
      try {
        let val = await (handlerOverride ? handlerOverride((ctx) => actualHandler(ctx)) : actualHandler());
        return { type: "data", result: val };
      } catch (e) {
        return { type: "error", result: e };
      }
    })();
    return Promise.race([handlerPromise, abortPromise]);
  };
  try {
    let handler = isAction ? match.route.action : match.route.loader;
    if (lazyHandlerPromise || lazyRoutePromise) {
      if (handler) {
        let handlerError;
        let [value] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          runHandler(handler).catch((e) => {
            handlerError = e;
          }),
          // Ensure all lazy route promises are resolved before continuing
          lazyHandlerPromise,
          lazyRoutePromise
        ]);
        if (handlerError !== void 0) {
          throw handlerError;
        }
        result = value;
      } else {
        await lazyHandlerPromise;
        let handler2 = isAction ? match.route.action : match.route.loader;
        if (handler2) {
          [result] = await Promise.all([runHandler(handler2), lazyRoutePromise]);
        } else if (type === "action") {
          let url = new URL(request.url);
          let pathname = url.pathname + url.search;
          throw getInternalRouterError(405, {
            method: request.method,
            pathname,
            routeId: match.route.id
          });
        } else {
          return { type: "data" /* data */, result: void 0 };
        }
      }
    } else if (!handler) {
      let url = new URL(request.url);
      let pathname = url.pathname + url.search;
      throw getInternalRouterError(404, {
        pathname
      });
    } else {
      result = await runHandler(handler);
    }
  } catch (e) {
    return { type: "error" /* error */, result: e };
  } finally {
    if (onReject) {
      request.signal.removeEventListener("abort", onReject);
    }
  }
  return result;
}
async function parseResponseBody(response) {
  let contentType = response.headers.get("Content-Type");
  if (contentType && /\bapplication\/json\b/.test(contentType)) {
    return response.body == null ? null : response.json();
  }
  return response.text();
}
async function convertDataStrategyResultToDataResult(dataStrategyResult) {
  let { result, type } = dataStrategyResult;
  if (isResponse(result)) {
    let data2;
    try {
      data2 = await parseResponseBody(result);
    } catch (e) {
      return { type: "error" /* error */, error: e };
    }
    if (type === "error" /* error */) {
      return {
        type: "error" /* error */,
        error: new ErrorResponseImpl(result.status, result.statusText, data2),
        statusCode: result.status,
        headers: result.headers
      };
    }
    return {
      type: "data" /* data */,
      data: data2,
      statusCode: result.status,
      headers: result.headers
    };
  }
  if (type === "error" /* error */) {
    if (isDataWithResponseInit(result)) {
      if (result.data instanceof Error) {
        return {
          type: "error" /* error */,
          error: result.data,
          statusCode: result.init?.status,
          headers: result.init?.headers ? new Headers(result.init.headers) : void 0
        };
      }
      return {
        type: "error" /* error */,
        error: dataWithResponseInitToErrorResponse(result),
        statusCode: isRouteErrorResponse(result) ? result.status : void 0,
        headers: result.init?.headers ? new Headers(result.init.headers) : void 0
      };
    }
    return {
      type: "error" /* error */,
      error: result,
      statusCode: isRouteErrorResponse(result) ? result.status : void 0
    };
  }
  if (isDataWithResponseInit(result)) {
    return {
      type: "data" /* data */,
      data: result.data,
      statusCode: result.init?.status,
      headers: result.init?.headers ? new Headers(result.init.headers) : void 0
    };
  }
  return { type: "data" /* data */, data: result };
}
function normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename) {
  let location = response.headers.get("Location");
  invariant(
    location,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  );
  if (!isAbsoluteUrl(location)) {
    let trimmedMatches = matches.slice(
      0,
      matches.findIndex((m) => m.route.id === routeId) + 1
    );
    location = normalizeTo(
      new URL(request.url),
      trimmedMatches,
      basename,
      location
    );
    response.headers.set("Location", location);
  }
  return response;
}
var invalidProtocols = [
  "about:",
  "blob:",
  "chrome:",
  "chrome-untrusted:",
  "content:",
  "data:",
  "devtools:",
  "file:",
  "filesystem:",
  // eslint-disable-next-line no-script-url
  "javascript:"
];
function hasInvalidProtocol(location) {
  try {
    return invalidProtocols.includes(new URL(location).protocol);
  } catch {
    return false;
  }
}
function normalizeRedirectLocation(location, currentUrl, basename, historyInstance) {
  if (isAbsoluteUrl(location)) {
    let normalizedLocation = location;
    let url = PROTOCOL_RELATIVE_URL_REGEX.test(normalizedLocation) ? new URL(
      normalizeProtocolRelativeUrl(normalizedLocation, currentUrl.protocol)
    ) : new URL(normalizedLocation);
    if (hasInvalidProtocol(url.toString())) {
      throw new Error("Invalid redirect location");
    }
    let isSameBasename = stripBasename(url.pathname, basename) != null;
    if (url.origin === currentUrl.origin && isSameBasename) {
      return removeDoubleSlashes(url.pathname) + url.search + url.hash;
    }
  }
  try {
    let url = historyInstance.createURL(location);
    if (hasInvalidProtocol(url.toString())) {
      throw new Error("Invalid redirect location");
    }
  } catch (e) {
  }
  return location;
}
function createClientSideRequest(history, location, signal, submission) {
  let url = history.createURL(stripHashFromPath(location)).toString();
  let init = { signal };
  if (submission && isMutationMethod(submission.formMethod)) {
    let { formMethod, formEncType } = submission;
    init.method = formMethod.toUpperCase();
    if (formEncType === "application/json") {
      init.headers = new Headers({ "Content-Type": formEncType });
      init.body = JSON.stringify(submission.json);
    } else if (formEncType === "text/plain") {
      init.body = submission.text;
    } else if (formEncType === "application/x-www-form-urlencoded" && submission.formData) {
      init.body = convertFormDataToSearchParams(submission.formData);
    } else {
      init.body = submission.formData;
    }
  }
  return new Request(url, init);
}
function createDataFunctionUrl(request, path) {
  let url = new URL(request.url);
  let parsed = typeof path === "string" ? parsePath(path) : path;
  url.pathname = parsed.pathname || "/";
  if (parsed.search) {
    let searchParams = new URLSearchParams(parsed.search);
    let indexValues = searchParams.getAll("index");
    searchParams.delete("index");
    for (let value of indexValues.filter(Boolean)) {
      searchParams.append("index", value);
    }
    url.search = searchParams.size ? `?${searchParams.toString()}` : "";
  } else {
    url.search = "";
  }
  url.hash = parsed.hash || "";
  return url;
}
function convertFormDataToSearchParams(formData) {
  let searchParams = new URLSearchParams();
  for (let [key, value] of formData.entries()) {
    searchParams.append(key, typeof value === "string" ? value : value.name);
  }
  return searchParams;
}
function convertSearchParamsToFormData(searchParams) {
  let formData = new FormData();
  for (let [key, value] of searchParams.entries()) {
    formData.append(key, value);
  }
  return formData;
}
function processRouteLoaderData(matches, results, pendingActionResult, isStaticHandler = false, skipLoaderErrorBubbling = false) {
  let loaderData = {};
  let errors = null;
  let statusCode;
  let foundError = false;
  let loaderHeaders = {};
  let pendingError = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : void 0;
  matches.forEach((match) => {
    if (!(match.route.id in results)) {
      return;
    }
    let id = match.route.id;
    let result = results[id];
    invariant(
      !isRedirectResult(result),
      "Cannot handle redirect results in processLoaderData"
    );
    if (isErrorResult(result)) {
      let error = result.error;
      if (pendingError !== void 0) {
        error = pendingError;
        pendingError = void 0;
      }
      errors = errors || {};
      if (skipLoaderErrorBubbling) {
        errors[id] = error;
      } else {
        let boundaryMatch = findNearestBoundary(matches, id);
        if (errors[boundaryMatch.route.id] == null) {
          errors[boundaryMatch.route.id] = error;
        }
      }
      if (!isStaticHandler) {
        loaderData[id] = ResetLoaderDataSymbol;
      }
      if (!foundError) {
        foundError = true;
        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    } else {
      loaderData[id] = result.data;
      if (result.statusCode && result.statusCode !== 200 && !foundError) {
        statusCode = result.statusCode;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    }
  });
  if (pendingError !== void 0 && pendingActionResult) {
    errors = { [pendingActionResult[0]]: pendingError };
    if (pendingActionResult[2]) {
      loaderData[pendingActionResult[2]] = void 0;
    }
  }
  return {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function processLoaderData(state, matches, results, pendingActionResult, revalidatingFetchers, fetcherResults, workingFetchers) {
  let { loaderData, errors } = processRouteLoaderData(
    matches,
    results,
    pendingActionResult
  );
  revalidatingFetchers.filter((f) => !f.matches || f.matches.some((m) => m.shouldLoad)).forEach((rf) => {
    let { key, match, controller } = rf;
    if (controller && controller.signal.aborted) {
      return;
    }
    let result = fetcherResults[key];
    invariant(result, "Did not find corresponding fetcher result");
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, match?.route.id);
      if (!(errors && errors[boundaryMatch.route.id])) {
        errors = {
          ...errors,
          [boundaryMatch.route.id]: result.error
        };
      }
      workingFetchers.delete(key);
    } else if (isRedirectResult(result)) {
      invariant(false, "Unhandled fetcher revalidation redirect");
    } else {
      let doneFetcher = getDoneFetcher(result.data);
      workingFetchers.set(key, doneFetcher);
    }
  });
  return { loaderData, errors };
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
  let mergedLoaderData = Object.entries(newLoaderData).filter(([, v]) => v !== ResetLoaderDataSymbol).reduce((merged, [k, v]) => {
    merged[k] = v;
    return merged;
  }, {});
  for (let match of matches) {
    let id = match.route.id;
    if (!newLoaderData.hasOwnProperty(id) && loaderData.hasOwnProperty(id) && match.route.loader) {
      mergedLoaderData[id] = loaderData[id];
    }
    if (errors && errors.hasOwnProperty(id)) {
      break;
    }
  }
  return mergedLoaderData;
}
function getActionDataForCommit(pendingActionResult) {
  if (!pendingActionResult) {
    return {};
  }
  return isErrorResult(pendingActionResult[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [pendingActionResult[0]]: pendingActionResult[1].data
    }
  };
}
function findNearestBoundary(matches, routeId) {
  let eligibleMatches = routeId ? matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1) : [...matches];
  return eligibleMatches.reverse().find((m) => m.route.hasErrorBoundary === true) || matches[0];
}
function getShortCircuitMatches(routes) {
  let route = routes.length === 1 ? routes[0] : routes.find((r) => r.index || !r.path || r.path === "/") || {
    id: `__shim-error-route__`
  };
  return {
    matches: [
      {
        params: {},
        pathname: "",
        pathnameBase: "",
        route
      }
    ],
    route
  };
}
function getInternalRouterError(status, {
  pathname,
  routeId,
  method,
  type,
  message
} = {}) {
  let statusText = "Unknown Server Error";
  let errorMessage = "Unknown @remix-run/router error";
  if (status === 400) {
    statusText = "Bad Request";
    if (method && pathname && routeId) {
      errorMessage = `You made a ${method} request to "${pathname}" but did not provide a \`loader\` for route "${routeId}", so there is no way to handle the request.`;
    } else if (type === "invalid-body") {
      errorMessage = "Unable to encode submission body";
    }
  } else if (status === 403) {
    statusText = "Forbidden";
    errorMessage = `Route "${routeId}" does not match URL "${pathname}"`;
  } else if (status === 404) {
    statusText = "Not Found";
    errorMessage = `No route matches URL "${pathname}"`;
  } else if (status === 405) {
    statusText = "Method Not Allowed";
    if (method && pathname && routeId) {
      errorMessage = `You made a ${method.toUpperCase()} request to "${pathname}" but did not provide an \`action\` for route "${routeId}", so there is no way to handle the request.`;
    } else if (method) {
      errorMessage = `Invalid request method "${method.toUpperCase()}"`;
    }
  }
  return new ErrorResponseImpl(
    status || 500,
    statusText,
    new Error(errorMessage),
    true
  );
}
function findRedirect(results) {
  let entries = Object.entries(results);
  for (let i = entries.length - 1; i >= 0; i--) {
    let [key, result] = entries[i];
    if (isRedirectResult(result)) {
      return { key, result };
    }
  }
}
function stripHashFromPath(path) {
  let parsedPath = typeof path === "string" ? parsePath(path) : path;
  return createPath({ ...parsedPath, hash: "" });
}
function isHashChangeOnly(a, b) {
  if (a.pathname !== b.pathname || a.search !== b.search) {
    return false;
  }
  if (a.hash === "") {
    return b.hash !== "";
  } else if (a.hash === b.hash) {
    return true;
  } else if (b.hash !== "") {
    return true;
  }
  return false;
}
function dataWithResponseInitToResponse(data2) {
  return Response.json(data2.data, data2.init ?? void 0);
}
function dataWithResponseInitToErrorResponse(data2) {
  return new ErrorResponseImpl(
    data2.init?.status ?? 500,
    data2.init?.statusText ?? "Internal Server Error",
    data2.data
  );
}
function isDataStrategyResults(result) {
  return result != null && typeof result === "object" && Object.entries(result).every(
    ([key, value]) => typeof key === "string" && isDataStrategyResult(value)
  );
}
function isDataStrategyResult(result) {
  return result != null && typeof result === "object" && "type" in result && "result" in result && (result.type === "data" /* data */ || result.type === "error" /* error */);
}
function isRedirectDataStrategyResult(result) {
  return isResponse(result.result) && redirectStatusCodes.has(result.result.status);
}
function isErrorResult(result) {
  return result.type === "error" /* error */;
}
function isRedirectResult(result) {
  return (result && result.type) === "redirect" /* redirect */;
}
function isDataWithResponseInit(value) {
  return typeof value === "object" && value != null && "type" in value && "data" in value && "init" in value && value.type === "DataWithResponseInit";
}
function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isRedirectStatusCode(statusCode) {
  return redirectStatusCodes.has(statusCode);
}
function isRedirectResponse(result) {
  return isResponse(result) && isRedirectStatusCode(result.status) && result.headers.has("Location");
}
function isValidMethod(method) {
  return validRequestMethods.has(method.toUpperCase());
}
function isMutationMethod(method) {
  return validMutationMethods.has(method.toUpperCase());
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some((v) => v === "");
}
function getTargetMatch(matches, location) {
  let search = typeof location === "string" ? parsePath(location).search : location.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
    return matches[matches.length - 1];
  }
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
}
function getSubmissionFromNavigation(navigation) {
  let { formMethod, formAction, formEncType, text, formData, json } = navigation;
  if (!formMethod || !formAction || !formEncType) {
    return;
  }
  if (text != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: void 0,
      json: void 0,
      text
    };
  } else if (formData != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData,
      json: void 0,
      text: void 0
    };
  } else if (json !== void 0) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: void 0,
      json,
      text: void 0
    };
  }
}
function getLoadingNavigation(location, matches, historyAction, submission) {
  if (submission) {
    let navigation = {
      state: "loading",
      location,
      matches,
      historyAction,
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text
    };
    return navigation;
  } else {
    let navigation = {
      state: "loading",
      location,
      matches,
      historyAction,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    };
    return navigation;
  }
}
function getSubmittingNavigation(location, matches, historyAction, submission) {
  let navigation = {
    state: "submitting",
    location,
    matches,
    historyAction,
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text
  };
  return navigation;
}
function getLoadingFetcher(submission, data2) {
  if (submission) {
    let fetcher = {
      state: "loading",
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text,
      data: data2
    };
    return fetcher;
  } else {
    let fetcher = {
      state: "loading",
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
      data: data2
    };
    return fetcher;
  }
}
function getSubmittingFetcher(submission, existingFetcher) {
  let fetcher = {
    state: "submitting",
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text,
    data: existingFetcher ? existingFetcher.data : void 0
  };
  return fetcher;
}
function getDoneFetcher(data2) {
  let fetcher = {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: data2
  };
  return fetcher;
}
function restoreAppliedTransitions(_window, transitions) {
  try {
    let sessionPositions = _window.sessionStorage.getItem(
      TRANSITIONS_STORAGE_KEY
    );
    if (sessionPositions) {
      let json = JSON.parse(sessionPositions);
      for (let [k, v] of Object.entries(json || {})) {
        if (v && Array.isArray(v)) {
          transitions.set(k, new Set(v || []));
        }
      }
    }
  } catch (e) {
  }
}
function persistAppliedTransitions(_window, transitions) {
  if (transitions.size > 0) {
    let json = {};
    for (let [k, v] of transitions) {
      json[k] = [...v];
    }
    try {
      _window.sessionStorage.setItem(
        TRANSITIONS_STORAGE_KEY,
        JSON.stringify(json)
      );
    } catch (error) {
      warning(
        false,
        `Failed to save applied view transitions in sessionStorage (${error}).`
      );
    }
  }
}
function createDeferred() {
  let resolve;
  let reject;
  let promise = new Promise((res, rej) => {
    resolve = async (val) => {
      res(val);
      try {
        await promise;
      } catch (e) {
      }
    };
    reject = async (error) => {
      rej(error);
      try {
        await promise;
      } catch (e) {
      }
    };
  });
  return {
    promise,
    //@ts-ignore
    resolve,
    //@ts-ignore
    reject
  };
}

// lib/context.ts

var DataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
DataRouterContext.displayName = "DataRouter";
var DataRouterStateContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
DataRouterStateContext.displayName = "DataRouterState";
var RSCRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(false);
function useIsRSCRouterContext() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(RSCRouterContext);
}
var ViewTransitionContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  isTransitioning: false
});
ViewTransitionContext.displayName = "ViewTransition";
var FetchersContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(
  /* @__PURE__ */ new Map()
);
FetchersContext.displayName = "Fetchers";
var AwaitContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
AwaitContext.displayName = "Await";
var AwaitContextProvider = (props) => react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitContext.Provider, props);
var NavigationContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(
  null
);
NavigationContext.displayName = "Navigation";
var LocationContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(
  null
);
LocationContext.displayName = "Location";
var RouteContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
RouteContext.displayName = "Route";
var RouteErrorContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
RouteErrorContext.displayName = "RouteError";
var ENABLE_DEV_WARNINGS = true;

// lib/hooks.tsx


// lib/errors.ts
var ERROR_DIGEST_BASE = "REACT_ROUTER_ERROR";
var ERROR_DIGEST_REDIRECT = "REDIRECT";
var ERROR_DIGEST_ROUTE_ERROR_RESPONSE = "ROUTE_ERROR_RESPONSE";
function decodeRedirectErrorDigest(digest) {
  if (digest.startsWith(`${ERROR_DIGEST_BASE}:${ERROR_DIGEST_REDIRECT}:{`)) {
    try {
      let parsed = JSON.parse(digest.slice(28));
      if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string" && typeof parsed.location === "string" && typeof parsed.reloadDocument === "boolean" && typeof parsed.replace === "boolean") {
        return parsed;
      }
    } catch {
    }
  }
}
function decodeRouteErrorResponseDigest(digest) {
  if (digest.startsWith(
    `${ERROR_DIGEST_BASE}:${ERROR_DIGEST_ROUTE_ERROR_RESPONSE}:{`
  )) {
    try {
      let parsed = JSON.parse(digest.slice(40));
      if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string") {
        return new ErrorResponseImpl(
          parsed.status,
          parsed.statusText,
          parsed.data
        );
      }
    } catch {
    }
  }
}

// lib/hooks.tsx
function useHref(to, { relative } = {}) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useHref() may be used only in the context of a <Router> component.`
  );
  let { basename, navigator } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let { hash, pathname, search } = useResolvedPath(to, { relative });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator.createHref({ pathname: joinedPathname, search, hash });
}
function useInRouterContext() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext) != null;
}
function useLocation() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useLocation() may be used only in the context of a <Router> component.`
  );
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext).location;
}
function useNavigationType() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext).navigationType;
}
function useMatch(pattern) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useMatch() may be used only in the context of a <Router> component.`
  );
  let { pathname } = useLocation();
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => matchPath(pattern, decodePath(pathname)),
    [pathname, pattern]
  );
}
var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function useIsomorphicLayoutEffect(cb) {
  let isStatic = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext).static;
  if (!isStatic) {
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(cb);
  }
}
function useNavigate() {
  let { isDataRoute } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useNavigate() may be used only in the context of a <Router> component.`
  );
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  let { basename, navigator } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let { matches } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  let activeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        navigator.go(to);
        return;
      }
      let path = resolveTo(
        to,
        JSON.parse(routePathnamesJson),
        locationPathname,
        options.relative === "path"
      );
      if (dataRouterContext == null && basename !== "/") {
        path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
      }
      (!!options.replace ? navigator.replace : navigator.push)(
        path,
        options.state,
        options
      );
    },
    [
      basename,
      navigator,
      routePathnamesJson,
      locationPathname,
      dataRouterContext
    ]
  );
  return navigate;
}
var OutletContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
function useOutletContext() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(OutletContext);
}
function useOutlet(context) {
  let outlet = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext).outlet;
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => outlet && /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(OutletContext.Provider, { value: context }, outlet),
    [outlet, context]
  );
}
function useParams() {
  let { matches } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return routeMatch?.params ?? {};
}
function useResolvedPath(to, { relative } = {}) {
  let { matches } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => resolveTo(
      to,
      JSON.parse(routePathnamesJson),
      locationPathname,
      relative === "path"
    ),
    [to, routePathnamesJson, locationPathname, relative]
  );
}
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
}
function useRoutesImpl(routes, locationArg, dataRouterOpts) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useRoutes() may be used only in the context of a <Router> component.`
  );
  let { navigator } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let { matches: parentMatches } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;
  if (ENABLE_DEV_WARNINGS) {
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(
      parentPathname,
      !parentRoute || parentPath.endsWith("*") || parentPath.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${parentPathname}" (under <Route path="${parentPath}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${parentPath}"> to <Route path="${parentPath === "/" ? "*" : `${parentPath}/*`}">.`
    );
  }
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    invariant(
      parentPathnameBase === "/" || parsedLocationArg.pathname?.startsWith(parentPathnameBase),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${parentPathnameBase}" but pathname "${parsedLocationArg.pathname}" was given in the \`location\` prop.`
    );
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = dataRouterOpts && dataRouterOpts.state.matches.length ? (
    // If we're in a data router, use the matches we've already identified but ensure
    // we have the latest route instances from the manifest in case elements have changed
    dataRouterOpts.state.matches.map(
      (m) => Object.assign(m, {
        route: dataRouterOpts.manifest[m.route.id] || m.route
      })
    )
  ) : matchRoutes(routes, { pathname: remainingPathname });
  if (ENABLE_DEV_WARNINGS) {
    warning(
      parentRoute || matches != null,
      `No routes matched location "${location.pathname}${location.search}${location.hash}" `
    );
    warning(
      matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${location.pathname}${location.search}${location.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  }
  let renderedMatches = _renderMatches(
    matches && matches.map(
      (match) => Object.assign({}, match, {
        params: Object.assign({}, parentParams, match.params),
        pathname: joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          navigator.encodeLocation ? navigator.encodeLocation(
            match.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : match.pathname
        ]),
        pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          navigator.encodeLocation ? navigator.encodeLocation(
            match.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : match.pathnameBase
        ])
      })
    ),
    parentMatches,
    dataRouterOpts
  );
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      LocationContext.Provider,
      {
        value: {
          location: {
            pathname: "/",
            search: "",
            hash: "",
            state: null,
            key: "default",
            mask: void 0,
            ...location
          },
          navigationType: "POP" /* Pop */
        }
      },
      renderedMatches
    );
  }
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = { padding: "0.5rem", backgroundColor: lightgrey };
  let codeStyles = { padding: "2px 4px", backgroundColor: lightgrey };
  let devInfo = null;
  if (ENABLE_DEV_WARNINGS) {
    console.error(
      "Error handled by React Router default ErrorBoundary:",
      error
    );
    devInfo = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "\u{1F4BF} Hey developer \u{1F44B}"), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", { style: codeStyles }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", { style: codeStyles }, "errorElement"), " prop on your route."));
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("pre", { style: preStyles }, stack) : null, devInfo);
}
var defaultErrorElement = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(DefaultErrorComponent, null);
var RenderErrorBoundary = class extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      console.error(
        "React Router caught the following error during render",
        error
      );
    }
  }
  render() {
    let error = this.state.error;
    if (this.context && typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
      const decoded = decodeRouteErrorResponseDigest(error.digest);
      if (decoded) error = decoded;
    }
    let result = error !== void 0 ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      RouteErrorContext.Provider,
      {
        value: error,
        children: this.props.component
      }
    )) : this.props.children;
    if (this.context) {
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(RSCErrorHandler, { error }, result);
    }
    return result;
  }
};
RenderErrorBoundary.contextType = RSCRouterContext;
var errorRedirectHandledMap = /* @__PURE__ */ new WeakMap();
function RSCErrorHandler({
  children,
  error
}) {
  let { basename } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  if (typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
    let redirect2 = decodeRedirectErrorDigest(error.digest);
    if (redirect2) {
      let existingRedirect = errorRedirectHandledMap.get(error);
      if (existingRedirect) throw existingRedirect;
      let parsed = parseToInfo(redirect2.location, basename);
      let target = parsed.absoluteURL || parsed.to;
      if (hasInvalidProtocol(target)) {
        throw new Error("Invalid redirect location");
      }
      if (isBrowser && !errorRedirectHandledMap.get(error)) {
        if (parsed.isExternal || redirect2.reloadDocument) {
          window.location.href = target;
        } else {
          const redirectPromise = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(parsed.to, {
              replace: redirect2.replace
            })
          );
          errorRedirectHandledMap.set(error, redirectPromise);
          throw redirectPromise;
        }
      }
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta", { httpEquiv: "refresh", content: `0;url=${target}` });
    }
  }
  return children;
}
function RenderedRoute({ routeContext, match, children }) {
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(RouteContext.Provider, { value: routeContext }, children);
}
function _renderMatches(matches, parentMatches = [], dataRouterOpts) {
  let dataRouterState = dataRouterOpts?.state;
  if (matches == null) {
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if (parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = dataRouterState?.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex(
      (m) => m.route.id && errors?.[m.route.id] !== void 0
    );
    invariant(
      errorIndex >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        errors
      ).join(",")}`
    );
    renderedMatches = renderedMatches.slice(
      0,
      Math.min(renderedMatches.length, errorIndex + 1)
    );
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterOpts && dataRouterState) {
    renderFallback = dataRouterState.renderFallback;
    for (let i = 0; i < renderedMatches.length; i++) {
      let match = renderedMatches[i];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i;
      }
      if (match.route.id) {
        let { loaderData, errors: errors2 } = dataRouterState;
        let needsToRunLoader = match.route.loader && !loaderData.hasOwnProperty(match.route.id) && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          if (dataRouterOpts.isStatic) {
            renderFallback = true;
          }
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  let onErrorHandler = dataRouterOpts?.onError;
  let onError = dataRouterState && onErrorHandler ? (error, errorInfo) => {
    onErrorHandler(error, {
      location: dataRouterState.location,
      params: dataRouterState.matches?.[0]?.params ?? {},
      pattern: getRoutePattern(dataRouterState.matches),
      errorInfo
    });
  } : void 0;
  return renderedMatches.reduceRight(
    (outlet, match, index) => {
      let error;
      let shouldRenderHydrateFallback = false;
      let errorElement = null;
      let hydrateFallbackElement = null;
      if (dataRouterState) {
        error = errors && match.route.id ? errors[match.route.id] : void 0;
        errorElement = match.route.errorElement || defaultErrorElement;
        if (renderFallback) {
          if (fallbackIndex < 0 && index === 0) {
            warningOnce(
              "route-fallback",
              false,
              "No `HydrateFallback` element provided to render during initial hydration"
            );
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = null;
          } else if (fallbackIndex === index) {
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = match.route.hydrateFallbackElement || null;
          }
        }
      }
      let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
      let getChildren = () => {
        let children;
        if (error) {
          children = errorElement;
        } else if (shouldRenderHydrateFallback) {
          children = hydrateFallbackElement;
        } else if (match.route.Component) {
          children = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(match.route.Component, null);
        } else if (match.route.element) {
          children = match.route.element;
        } else {
          children = outlet;
        }
        return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
          RenderedRoute,
          {
            match,
            routeContext: {
              outlet,
              matches: matches2,
              isDataRoute: dataRouterState != null
            },
            children
          }
        );
      };
      return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
        RenderErrorBoundary,
        {
          location: dataRouterState.location,
          revalidation: dataRouterState.revalidation,
          component: errorElement,
          error,
          children: getChildren(),
          routeContext: { outlet: null, matches: matches2, isDataRoute: true },
          onError
        }
      ) : getChildren();
    },
    null
  );
}
function getDataRouterConsoleError(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext(hookName) {
  let ctx = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError(hookName));
  return ctx;
}
function useDataRouterState(hookName) {
  let state = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterStateContext);
  invariant(state, getDataRouterConsoleError(hookName));
  return state;
}
function useRouteContext(hookName) {
  let route = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  invariant(route, getDataRouterConsoleError(hookName));
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  invariant(
    thisRoute.route.id,
    `${hookName} can only be used on routes that contain a unique "id"`
  );
  return thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId("useRouteId" /* UseRouteId */);
}
function useNavigation() {
  let state = useDataRouterState("useNavigation" /* UseNavigation */);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    let { matches, historyAction, ...rest } = state.navigation;
    return rest;
  }, [state.navigation]);
}
function useRevalidator() {
  let dataRouterContext = useDataRouterContext("useRevalidator" /* UseRevalidator */);
  let state = useDataRouterState("useRevalidator" /* UseRevalidator */);
  let revalidate = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(async () => {
    await dataRouterContext.router.revalidate();
  }, [dataRouterContext.router]);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => ({ revalidate, state: state.revalidation }),
    [revalidate, state.revalidation]
  );
}
function useMatches() {
  let { matches, loaderData } = useDataRouterState(
    "useMatches" /* UseMatches */
  );
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => matches.map((m) => convertRouteMatchToUiMatch(m, loaderData)),
    [matches, loaderData]
  );
}
function useLoaderData() {
  let state = useDataRouterState("useLoaderData" /* UseLoaderData */);
  let routeId = useCurrentRouteId("useLoaderData" /* UseLoaderData */);
  return state.loaderData[routeId];
}
function useRouteLoaderData(routeId) {
  let state = useDataRouterState("useRouteLoaderData" /* UseRouteLoaderData */);
  return state.loaderData[routeId];
}
function useActionData() {
  let state = useDataRouterState("useActionData" /* UseActionData */);
  let routeId = useCurrentRouteId("useLoaderData" /* UseLoaderData */);
  return state.actionData ? state.actionData[routeId] : void 0;
}
function useRouteError() {
  let error = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteErrorContext);
  let state = useDataRouterState("useRouteError" /* UseRouteError */);
  let routeId = useCurrentRouteId("useRouteError" /* UseRouteError */);
  if (error !== void 0) {
    return error;
  }
  return state.errors?.[routeId];
}
function useAsyncValue() {
  let value = react__WEBPACK_IMPORTED_MODULE_0__.useContext(AwaitContext);
  return value?._data;
}
function useAsyncError() {
  let value = react__WEBPACK_IMPORTED_MODULE_0__.useContext(AwaitContext);
  return value?._error;
}
var blockerId = 0;
function useBlocker(shouldBlock) {
  let { router, basename } = useDataRouterContext("useBlocker" /* UseBlocker */);
  let state = useDataRouterState("useBlocker" /* UseBlocker */);
  let [blockerKey, setBlockerKey] = react__WEBPACK_IMPORTED_MODULE_0__.useState("");
  let blockerFunction = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (arg) => {
      if (typeof shouldBlock !== "function") {
        return !!shouldBlock;
      }
      if (basename === "/") {
        return shouldBlock(arg);
      }
      let { currentLocation, nextLocation, historyAction } = arg;
      return shouldBlock({
        currentLocation: {
          ...currentLocation,
          pathname: stripBasename(currentLocation.pathname, basename) || currentLocation.pathname
        },
        nextLocation: {
          ...nextLocation,
          pathname: stripBasename(nextLocation.pathname, basename) || nextLocation.pathname
        },
        historyAction
      });
    },
    [basename, shouldBlock]
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let key = String(++blockerId);
    setBlockerKey(key);
    return () => router.deleteBlocker(key);
  }, [router]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (blockerKey !== "") {
      router.getBlocker(blockerKey, blockerFunction);
    }
  }, [router, blockerKey, blockerFunction]);
  return blockerKey && state.blockers.has(blockerKey) ? state.blockers.get(blockerKey) : IDLE_BLOCKER;
}
function useNavigateStable() {
  let { router } = useDataRouterContext("useNavigate" /* UseNavigateStable */);
  let id = useCurrentRouteId("useNavigate" /* UseNavigateStable */);
  let activeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    async (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        await router.navigate(to);
      } else {
        await router.navigate(to, { fromRouteId: id, ...options });
      }
    },
    [router, id]
  );
  return navigate;
}
var alreadyWarned = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
    warning(false, message);
  }
}
function useRoute(...args) {
  const currentRouteId = useCurrentRouteId(
    "useRoute" /* UseRoute */
  );
  const id = args[0] ?? currentRouteId;
  const state = useDataRouterState("useRoute" /* UseRoute */);
  const route = state.matches.find(({ route: route2 }) => route2.id === id);
  if (route === void 0) return void 0;
  return {
    handle: route.route.handle,
    loaderData: state.loaderData[id],
    actionData: state.actionData?.[id]
  };
}
function toRouterStateMatch(match) {
  return {
    id: match.route.id,
    pathname: match.pathname,
    params: match.params,
    handle: match.route.handle
  };
}
function useRouterState() {
  let {
    location,
    historyAction: type,
    matches,
    navigation
  } = useDataRouterState("unstable_useRouterState" /* UseRouterState */);
  let active = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => ({
      type,
      location,
      searchParams: new URLSearchParams(location.search),
      params: matches[matches.length - 1]?.params ?? {},
      matches: matches.map((m) => toRouterStateMatch(m))
    }),
    [location, matches, type]
  );
  let pending = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    if (navigation.state === "idle") return null;
    let shared = {
      type: navigation.historyAction,
      location: navigation.location,
      searchParams: new URLSearchParams(navigation.location.search),
      params: navigation.matches[navigation.matches.length - 1]?.params ?? {},
      matches: navigation.matches.map((m) => toRouterStateMatch(m))
    };
    return navigation.state === "loading" ? {
      ...shared,
      state: "loading",
      formMethod: navigation.formMethod,
      formAction: navigation.formAction,
      formEncType: navigation.formEncType,
      formData: navigation.formData,
      json: navigation.json,
      text: navigation.text
    } : {
      ...shared,
      state: "submitting",
      formMethod: navigation.formMethod,
      formAction: navigation.formAction,
      formEncType: navigation.formEncType,
      formData: navigation.formData,
      json: navigation.json,
      text: navigation.text
    };
  }, [navigation]);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => ({ active, pending }),
    [active, pending]
  );
}

// lib/components.tsx


// lib/server-runtime/warnings.ts
var alreadyWarned2 = {};
function warnOnce(condition, message) {
  if (!condition && !alreadyWarned2[message]) {
    alreadyWarned2[message] = true;
    console.warn(message);
  }
}

// lib/components.tsx
var USE_OPTIMISTIC = "useOptimistic";
var useOptimisticImpl = /*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2)))[USE_OPTIMISTIC];
var stableUseOptimisticSetter = () => void 0;
function useOptimisticSafe(val) {
  if (useOptimisticImpl) {
    return useOptimisticImpl(val);
  } else {
    return [val, stableUseOptimisticSetter];
  }
}
function mapRouteProperties(route) {
  let updates = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: route.hasErrorBoundary || route.ErrorBoundary != null || route.errorElement != null
  };
  if (route.Component) {
    if (ENABLE_DEV_WARNINGS) {
      if (route.element) {
        warning(
          false,
          "You should not include both `Component` and `element` on your route - `Component` will be used."
        );
      }
    }
    Object.assign(updates, {
      element: react__WEBPACK_IMPORTED_MODULE_0__.createElement(route.Component),
      Component: void 0
    });
  }
  if (route.HydrateFallback) {
    if (ENABLE_DEV_WARNINGS) {
      if (route.hydrateFallbackElement) {
        warning(
          false,
          "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
        );
      }
    }
    Object.assign(updates, {
      hydrateFallbackElement: react__WEBPACK_IMPORTED_MODULE_0__.createElement(route.HydrateFallback),
      HydrateFallback: void 0
    });
  }
  if (route.ErrorBoundary) {
    if (ENABLE_DEV_WARNINGS) {
      if (route.errorElement) {
        warning(
          false,
          "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
        );
      }
    }
    Object.assign(updates, {
      errorElement: react__WEBPACK_IMPORTED_MODULE_0__.createElement(route.ErrorBoundary),
      ErrorBoundary: void 0
    });
  }
  return updates;
}
var hydrationRouteProperties = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function createMemoryRouter(routes, opts) {
  return createRouter({
    basename: opts?.basename,
    getContext: opts?.getContext,
    future: opts?.future,
    history: createMemoryHistory({
      initialEntries: opts?.initialEntries,
      initialIndex: opts?.initialIndex
    }),
    hydrationData: opts?.hydrationData,
    routes,
    hydrationRouteProperties,
    mapRouteProperties,
    dataStrategy: opts?.dataStrategy,
    patchRoutesOnNavigation: opts?.patchRoutesOnNavigation,
    instrumentations: opts?.instrumentations
  }).initialize();
}
var Deferred = class {
  constructor() {
    this.status = "pending";
    this.promise = new Promise((resolve, reject) => {
      this.resolve = (value) => {
        if (this.status === "pending") {
          this.status = "resolved";
          resolve(value);
        }
      };
      this.reject = (reason) => {
        if (this.status === "pending") {
          this.status = "rejected";
          reject(reason);
        }
      };
    });
  }
};
function RouterProvider({
  router,
  flushSync: reactDomFlushSyncImpl,
  onError,
  useTransitions
}) {
  let unstable_rsc = useIsRSCRouterContext();
  useTransitions = unstable_rsc || useTransitions;
  let [_state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState(router.state);
  let [state, setOptimisticState] = useOptimisticSafe(_state);
  let [pendingState, setPendingState] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  let [vtContext, setVtContext] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    isTransitioning: false
  });
  let [renderDfd, setRenderDfd] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  let [transition, setTransition] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  let [interruption, setInterruption] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  let fetcherData = react__WEBPACK_IMPORTED_MODULE_0__.useRef(/* @__PURE__ */ new Map());
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (newState, { deletedFetchers, newErrors, flushSync, viewTransitionOpts }) => {
      if (newErrors && onError) {
        Object.values(newErrors).forEach(
          (error) => onError(error, {
            location: newState.location,
            params: newState.matches[0]?.params ?? {},
            pattern: getRoutePattern(newState.matches)
          })
        );
      }
      newState.fetchers.forEach((fetcher, key) => {
        if (fetcher.data !== void 0) {
          fetcherData.current.set(key, fetcher.data);
        }
      });
      deletedFetchers.forEach((key) => fetcherData.current.delete(key));
      warnOnce(
        flushSync === false || reactDomFlushSyncImpl != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let isViewTransitionAvailable = router.window != null && router.window.document != null && typeof router.window.document.startViewTransition === "function";
      warnOnce(
        viewTransitionOpts == null || isViewTransitionAvailable,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      );
      if (!viewTransitionOpts || !isViewTransitionAvailable) {
        if (reactDomFlushSyncImpl && flushSync) {
          reactDomFlushSyncImpl(() => setStateImpl(newState));
        } else if (useTransitions === false) {
          setStateImpl(newState);
        } else {
          react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => {
            if (useTransitions === true) {
              setOptimisticState((s) => getOptimisticRouterState(s, newState));
            }
            setStateImpl(newState);
          });
        }
        return;
      }
      if (reactDomFlushSyncImpl && flushSync) {
        reactDomFlushSyncImpl(() => {
          if (transition) {
            renderDfd?.resolve();
            transition.skipTransition();
          }
          setVtContext({
            isTransitioning: true,
            flushSync: true,
            currentLocation: viewTransitionOpts.currentLocation,
            nextLocation: viewTransitionOpts.nextLocation
          });
        });
        let t = router.window.document.startViewTransition(() => {
          reactDomFlushSyncImpl(() => setStateImpl(newState));
        });
        t.finished.finally(() => {
          reactDomFlushSyncImpl(() => {
            setRenderDfd(void 0);
            setTransition(void 0);
            setPendingState(void 0);
            setVtContext({ isTransitioning: false });
          });
        });
        reactDomFlushSyncImpl(() => setTransition(t));
        return;
      }
      if (transition) {
        renderDfd?.resolve();
        transition.skipTransition();
        setInterruption({
          state: newState,
          currentLocation: viewTransitionOpts.currentLocation,
          nextLocation: viewTransitionOpts.nextLocation
        });
      } else {
        setPendingState(newState);
        setVtContext({
          isTransitioning: true,
          flushSync: false,
          currentLocation: viewTransitionOpts.currentLocation,
          nextLocation: viewTransitionOpts.nextLocation
        });
      }
    },
    [
      router.window,
      reactDomFlushSyncImpl,
      transition,
      renderDfd,
      useTransitions,
      setOptimisticState,
      onError
    ]
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => router.subscribe(setState), [router, setState]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (vtContext.isTransitioning && !vtContext.flushSync) {
      setRenderDfd(new Deferred());
    }
  }, [vtContext]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (renderDfd && pendingState && router.window) {
      let newState = pendingState;
      let renderPromise = renderDfd.promise;
      let transition2 = router.window.document.startViewTransition(async () => {
        if (useTransitions === false) {
          setStateImpl(newState);
        } else {
          react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => {
            if (useTransitions === true) {
              setOptimisticState((s) => getOptimisticRouterState(s, newState));
            }
            setStateImpl(newState);
          });
        }
        await renderPromise;
      });
      transition2.finished.finally(() => {
        setRenderDfd(void 0);
        setTransition(void 0);
        setPendingState(void 0);
        setVtContext({ isTransitioning: false });
      });
      setTransition(transition2);
    }
  }, [
    pendingState,
    renderDfd,
    router.window,
    useTransitions,
    setOptimisticState
  ]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (renderDfd && pendingState && state.location.key === pendingState.location.key) {
      renderDfd.resolve();
    }
  }, [renderDfd, transition, state.location, pendingState]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!vtContext.isTransitioning && interruption) {
      setPendingState(interruption.state);
      setVtContext({
        isTransitioning: true,
        flushSync: false,
        currentLocation: interruption.currentLocation,
        nextLocation: interruption.nextLocation
      });
      setInterruption(void 0);
    }
  }, [vtContext.isTransitioning, interruption]);
  let navigator = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return {
      createHref: router.createHref,
      encodeLocation: router.encodeLocation,
      go: (n) => router.navigate(n),
      push: (to, state2, opts) => router.navigate(to, {
        state: state2,
        preventScrollReset: opts?.preventScrollReset
      }),
      replace: (to, state2, opts) => router.navigate(to, {
        replace: true,
        state: state2,
        preventScrollReset: opts?.preventScrollReset
      })
    };
  }, [router]);
  let basename = router.basename || "/";
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => ({
      router,
      navigator,
      static: false,
      basename,
      onError
    }),
    [router, navigator, basename, onError]
  );
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRouterContext.Provider, { value: dataRouterContext }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRouterStateContext.Provider, { value: state }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(FetchersContext.Provider, { value: fetcherData.current }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ViewTransitionContext.Provider, { value: vtContext }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename,
      location: state.location,
      navigationType: state.historyAction,
      navigator,
      useTransitions
    },
    /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      MemoizedDataRoutes,
      {
        routes: router.routes,
        manifest: router.manifest,
        future: router.future,
        state,
        isStatic: false,
        onError
      }
    )
  ))))), null);
}
function getOptimisticRouterState(currentState, newState) {
  return {
    // Don't surface "current location specific" stuff mid-navigation
    // (historyAction, location, matches, loaderData, errors, initialized,
    // restoreScroll, preventScrollReset, blockers, etc.)
    ...currentState,
    // Only surface "pending/in-flight stuff"
    // (navigation, revalidation, actionData, fetchers, )
    navigation: newState.navigation.state !== "idle" ? newState.navigation : currentState.navigation,
    revalidation: newState.revalidation !== "idle" ? newState.revalidation : currentState.revalidation,
    actionData: newState.navigation.state !== "submitting" ? newState.actionData : currentState.actionData,
    fetchers: newState.fetchers
  };
}
var MemoizedDataRoutes = react__WEBPACK_IMPORTED_MODULE_0__.memo(DataRoutes2);
function DataRoutes2({
  routes,
  manifest,
  future,
  state,
  isStatic,
  onError
}) {
  return useRoutesImpl(routes, void 0, {
    manifest,
    state,
    isStatic,
    onError,
    future
  });
}
function MemoryRouter({
  basename,
  children,
  initialEntries,
  initialIndex,
  useTransitions
}) {
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  if (historyRef.current == null) {
    historyRef.current = createMemoryHistory({
      initialEntries,
      initialIndex,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (newState) => {
      if (useTransitions === false) {
        setStateImpl(newState);
      } else {
        react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => setStateImpl(newState));
      }
    },
    [useTransitions]
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history,
      useTransitions
    }
  );
}
function Navigate({
  to,
  replace: replace2,
  state,
  relative
}) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    `<Navigate> may be used only in the context of a <Router> component.`
  );
  let { static: isStatic } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  warning(
    !isStatic,
    `<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`
  );
  let { matches } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let navigate = useNavigate();
  let path = resolveTo(
    to,
    getResolveToMatches(matches),
    locationPathname,
    relative === "path"
  );
  let jsonPath = JSON.stringify(path);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    navigate(JSON.parse(jsonPath), { replace: replace2, state, relative });
  }, [navigate, jsonPath, relative, replace2, state]);
  return null;
}
function Outlet(props) {
  return useOutlet(props.context);
}
function Route(props) {
  invariant(
    false,
    `A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`
  );
}
function Router({
  basename: basenameProp = "/",
  children = null,
  location: locationProp,
  navigationType = "POP" /* Pop */,
  navigator,
  static: staticProp = false,
  useTransitions
}) {
  invariant(
    !useInRouterContext(),
    `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`
  );
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => ({
      basename,
      navigator,
      static: staticProp,
      useTransitions,
      future: {}
    }),
    [basename, navigator, staticProp, useTransitions]
  );
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default",
    mask
  } = locationProp;
  let locationContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key,
        mask
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType, mask]);
  warning(
    locationContext != null,
    `<Router basename="${basename}"> is not able to match the URL "${pathname}${search}${hash}" because it does not start with the basename, so the <Router> won't render anything.`
  );
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(NavigationContext.Provider, { value: navigationContext }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(LocationContext.Provider, { children, value: locationContext }));
}
function Routes({
  children,
  location
}) {
  return useRoutes(createRoutesFromChildren(children), location);
}
function Await({
  children,
  errorElement,
  resolve
}) {
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  let dataRouterStateContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterStateContext);
  let onError = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (error, errorInfo) => {
      if (dataRouterContext && dataRouterContext.onError && dataRouterStateContext) {
        dataRouterContext.onError(error, {
          location: dataRouterStateContext.location,
          params: dataRouterStateContext.matches[0]?.params || {},
          pattern: getRoutePattern(dataRouterStateContext.matches),
          errorInfo
        });
      }
    },
    [dataRouterContext, dataRouterStateContext]
  );
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    AwaitErrorBoundary,
    {
      resolve,
      errorElement,
      onError
    },
    /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ResolveAwait, null, children)
  );
}
var AwaitErrorBoundary = class extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      console.error(
        "<Await> caught the following error during render",
        error,
        errorInfo
      );
    }
  }
  render() {
    let { children, errorElement, resolve } = this.props;
    let promise = null;
    let status = 0 /* pending */;
    if (!(resolve instanceof Promise)) {
      status = 1 /* success */;
      promise = Promise.resolve();
      Object.defineProperty(promise, "_tracked", { get: () => true });
      Object.defineProperty(promise, "_data", { get: () => resolve });
    } else if (this.state.error) {
      status = 2 /* error */;
      let renderError = this.state.error;
      promise = Promise.reject().catch(() => {
      });
      Object.defineProperty(promise, "_tracked", { get: () => true });
      Object.defineProperty(promise, "_error", { get: () => renderError });
    } else if (resolve._tracked) {
      promise = resolve;
      status = "_error" in promise ? 2 /* error */ : "_data" in promise ? 1 /* success */ : 0 /* pending */;
    } else {
      status = 0 /* pending */;
      Object.defineProperty(resolve, "_tracked", { get: () => true });
      promise = resolve.then(
        (data2) => Object.defineProperty(resolve, "_data", { get: () => data2 }),
        (error) => {
          this.props.onError?.(error);
          Object.defineProperty(resolve, "_error", { get: () => error });
        }
      );
    }
    if (status === 2 /* error */ && !errorElement) {
      throw promise._error;
    }
    if (status === 2 /* error */) {
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitContext.Provider, { value: promise, children: errorElement });
    }
    if (status === 1 /* success */) {
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitContext.Provider, { value: promise, children });
    }
    throw promise;
  }
};
function ResolveAwait({
  children
}) {
  let data2 = useAsyncValue();
  let toRender = typeof children === "function" ? children(data2) : children;
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, toRender);
}
function createRoutesFromChildren(children, parentPath = []) {
  let routes = [];
  react__WEBPACK_IMPORTED_MODULE_0__.Children.forEach(children, (element, index) => {
    if (!react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(element)) {
      return;
    }
    let treePath = [...parentPath, index];
    if (element.type === react__WEBPACK_IMPORTED_MODULE_0__.Fragment) {
      routes.push.apply(
        routes,
        createRoutesFromChildren(element.props.children, treePath)
      );
      return;
    }
    invariant(
      element.type === Route,
      `[${typeof element.type === "string" ? element.type : element.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
    );
    invariant(
      !element.props.index || !element.props.children,
      "An index route cannot have child routes."
    );
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      middleware: element.props.middleware,
      loader: element.props.loader,
      action: element.props.action,
      hydrateFallbackElement: element.props.hydrateFallbackElement,
      HydrateFallback: element.props.HydrateFallback,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.hasErrorBoundary === true || element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(
        element.props.children,
        treePath
      );
    }
    routes.push(route);
  });
  return routes;
}
var createRoutesFromElements = createRoutesFromChildren;
function renderMatches(matches) {
  return _renderMatches(matches);
}
function useRouteComponentProps() {
  return {
    params: useParams(),
    loaderData: useLoaderData(),
    actionData: useActionData(),
    matches: useMatches()
  };
}
function WithComponentProps({
  children
}) {
  const props = useRouteComponentProps();
  return react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(children, props);
}
function withComponentProps(Component4) {
  return function WithComponentProps2() {
    const props = useRouteComponentProps();
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component4, props);
  };
}
function useHydrateFallbackProps() {
  return {
    params: useParams(),
    loaderData: useLoaderData(),
    actionData: useActionData()
  };
}
function WithHydrateFallbackProps({
  children
}) {
  const props = useHydrateFallbackProps();
  return react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(children, props);
}
function withHydrateFallbackProps(HydrateFallback) {
  return function WithHydrateFallbackProps2() {
    const props = useHydrateFallbackProps();
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(HydrateFallback, props);
  };
}
function useErrorBoundaryProps() {
  return {
    params: useParams(),
    loaderData: useLoaderData(),
    actionData: useActionData(),
    error: useRouteError()
  };
}
function WithErrorBoundaryProps({
  children
}) {
  const props = useErrorBoundaryProps();
  return react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(children, props);
}
function withErrorBoundaryProps(ErrorBoundary) {
  return function WithErrorBoundaryProps2() {
    const props = useErrorBoundaryProps();
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ErrorBoundary, props);
  };
}

// lib/dom/dom.ts
var defaultMethod = "get";
var defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return typeof HTMLElement !== "undefined" && object instanceof HTMLElement;
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
function createSearchParams(init = "") {
  return new URLSearchParams(
    typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo2, key) => {
      let value = init[key];
      return memo2.concat(
        Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]
      );
    }, [])
  );
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
  let searchParams = createSearchParams(locationSearch);
  if (defaultSearchParams) {
    defaultSearchParams.forEach((_, key) => {
      if (!searchParams.has(key)) {
        defaultSearchParams.getAll(key).forEach((value) => {
          searchParams.append(key, value);
        });
      }
    });
  }
  return searchParams;
}
var _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      );
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
var supportedFormEncTypes = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    warning(
      false,
      `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`
    );
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error(
        `Cannot submit a <button> or <input type="submit"> without a <form>`
      );
    }
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(form, target);
    if (!isFormDataSubmitterSupported()) {
      let { name, type, value } = target;
      if (type === "image") {
        let prefix = name ? `${name}.` : "";
        formData.append(`${prefix}x`, "0");
        formData.append(`${prefix}y`, "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error(
      `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`
    );
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  if (formData && encType === "text/plain") {
    body = formData;
    formData = void 0;
  }
  return { action, method: method.toLowerCase(), encType, formData, body };
}

// lib/dom/ssr/single-fetch.tsx


// vendor/turbo-stream-v2/utils.ts
var HOLE = -1;
var NAN = -2;
var NEGATIVE_INFINITY = -3;
var NEGATIVE_ZERO = -4;
var NULL = -5;
var POSITIVE_INFINITY = -6;
var UNDEFINED = -7;
var TYPE_BIGINT = "B";
var TYPE_DATE = "D";
var TYPE_ERROR = "E";
var TYPE_MAP = "M";
var TYPE_NULL_OBJECT = "N";
var TYPE_PROMISE = "P";
var TYPE_REGEXP = "R";
var TYPE_SET = "S";
var TYPE_SYMBOL = "Y";
var TYPE_URL = "U";
var TYPE_PREVIOUS_RESOLVED = "Z";
var Deferred2 = class {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
};
function createLineSplittingTransform() {
  const decoder = new TextDecoder();
  let leftover = "";
  return new TransformStream({
    transform(chunk, controller) {
      const str = decoder.decode(chunk, { stream: true });
      const parts = (leftover + str).split("\n");
      leftover = parts.pop() || "";
      for (const part of parts) {
        controller.enqueue(part);
      }
    },
    flush(controller) {
      if (leftover) {
        controller.enqueue(leftover);
      }
    }
  });
}

// vendor/turbo-stream-v2/flatten.ts
var TIME_LIMIT_MS = 1;
var getNow = () => Date.now();
var yieldToMain = () => new Promise((resolve) => setTimeout(resolve, 0));
async function flatten(input) {
  const { indices } = this;
  const existing = indices.get(input);
  if (existing) return [existing];
  if (input === void 0) return UNDEFINED;
  if (input === null) return NULL;
  if (Number.isNaN(input)) return NAN;
  if (input === Number.POSITIVE_INFINITY) return POSITIVE_INFINITY;
  if (input === Number.NEGATIVE_INFINITY) return NEGATIVE_INFINITY;
  if (input === 0 && 1 / input < 0) return NEGATIVE_ZERO;
  const index = this.index++;
  indices.set(input, index);
  const stack = [[input, index]];
  await stringify.call(this, stack);
  return index;
}
async function stringify(stack) {
  const { deferred, indices, plugins, postPlugins } = this;
  const str = this.stringified;
  let lastYieldTime = getNow();
  const flattenValue = (value) => {
    const existing = indices.get(value);
    if (existing) return [existing];
    if (value === void 0) return UNDEFINED;
    if (value === null) return NULL;
    if (Number.isNaN(value)) return NAN;
    if (value === Number.POSITIVE_INFINITY) return POSITIVE_INFINITY;
    if (value === Number.NEGATIVE_INFINITY) return NEGATIVE_INFINITY;
    if (value === 0 && 1 / value < 0) return NEGATIVE_ZERO;
    const index = this.index++;
    indices.set(value, index);
    stack.push([value, index]);
    return index;
  };
  let i = 0;
  while (stack.length > 0) {
    const now = getNow();
    if (++i % 6e3 === 0 && now - lastYieldTime >= TIME_LIMIT_MS) {
      await yieldToMain();
      lastYieldTime = getNow();
    }
    const [input, index] = stack.pop();
    const partsForObj = (obj) => Object.keys(obj).map((k) => `"_${flattenValue(k)}":${flattenValue(obj[k])}`).join(",");
    let error = null;
    switch (typeof input) {
      case "boolean":
      case "number":
      case "string":
        str[index] = JSON.stringify(input);
        break;
      case "bigint":
        str[index] = `["${TYPE_BIGINT}","${input}"]`;
        break;
      case "symbol": {
        const keyFor = Symbol.keyFor(input);
        if (!keyFor) {
          error = new Error(
            "Cannot encode symbol unless created with Symbol.for()"
          );
        } else {
          str[index] = `["${TYPE_SYMBOL}",${JSON.stringify(keyFor)}]`;
        }
        break;
      }
      case "object": {
        if (!input) {
          str[index] = `${NULL}`;
          break;
        }
        const isArray = Array.isArray(input);
        let pluginHandled = false;
        if (!isArray && plugins) {
          for (const plugin of plugins) {
            const pluginResult = plugin(input);
            if (Array.isArray(pluginResult)) {
              pluginHandled = true;
              const [pluginIdentifier, ...rest] = pluginResult;
              str[index] = `[${JSON.stringify(pluginIdentifier)}`;
              if (rest.length > 0) {
                str[index] += `,${rest.map((v) => flattenValue(v)).join(",")}`;
              }
              str[index] += "]";
              break;
            }
          }
        }
        if (!pluginHandled) {
          let result = isArray ? "[" : "{";
          if (isArray) {
            for (let i2 = 0; i2 < input.length; i2++)
              result += (i2 ? "," : "") + (i2 in input ? flattenValue(input[i2]) : HOLE);
            str[index] = `${result}]`;
          } else if (input instanceof Date) {
            const dateTime = input.getTime();
            str[index] = `["${TYPE_DATE}",${Number.isNaN(dateTime) ? JSON.stringify("invalid") : dateTime}]`;
          } else if (input instanceof URL) {
            str[index] = `["${TYPE_URL}",${JSON.stringify(input.href)}]`;
          } else if (input instanceof RegExp) {
            str[index] = `["${TYPE_REGEXP}",${JSON.stringify(
              input.source
            )},${JSON.stringify(input.flags)}]`;
          } else if (input instanceof Set) {
            if (input.size > 0) {
              str[index] = `["${TYPE_SET}",${[...input].map((val) => flattenValue(val)).join(",")}]`;
            } else {
              str[index] = `["${TYPE_SET}"]`;
            }
          } else if (input instanceof Map) {
            if (input.size > 0) {
              str[index] = `["${TYPE_MAP}",${[...input].flatMap(([k, v]) => [flattenValue(k), flattenValue(v)]).join(",")}]`;
            } else {
              str[index] = `["${TYPE_MAP}"]`;
            }
          } else if (input instanceof Promise) {
            str[index] = `["${TYPE_PROMISE}",${index}]`;
            deferred[index] = input;
          } else if (input instanceof Error) {
            str[index] = `["${TYPE_ERROR}",${JSON.stringify(input.message)}`;
            if (input.name !== "Error") {
              str[index] += `,${JSON.stringify(input.name)}`;
            }
            str[index] += "]";
          } else if (Object.getPrototypeOf(input) === null) {
            str[index] = `["${TYPE_NULL_OBJECT}",{${partsForObj(input)}}]`;
          } else if (isPlainObject2(input)) {
            str[index] = `{${partsForObj(input)}}`;
          } else {
            error = new Error("Cannot encode object with prototype");
          }
        }
        break;
      }
      default: {
        const isArray = Array.isArray(input);
        let pluginHandled = false;
        if (!isArray && plugins) {
          for (const plugin of plugins) {
            const pluginResult = plugin(input);
            if (Array.isArray(pluginResult)) {
              pluginHandled = true;
              const [pluginIdentifier, ...rest] = pluginResult;
              str[index] = `[${JSON.stringify(pluginIdentifier)}`;
              if (rest.length > 0) {
                str[index] += `,${rest.map((v) => flattenValue(v)).join(",")}`;
              }
              str[index] += "]";
              break;
            }
          }
        }
        if (!pluginHandled) {
          error = new Error("Cannot encode function or unexpected type");
        }
      }
    }
    if (error) {
      let pluginHandled = false;
      if (postPlugins) {
        for (const plugin of postPlugins) {
          const pluginResult = plugin(input);
          if (Array.isArray(pluginResult)) {
            pluginHandled = true;
            const [pluginIdentifier, ...rest] = pluginResult;
            str[index] = `[${JSON.stringify(pluginIdentifier)}`;
            if (rest.length > 0) {
              str[index] += `,${rest.map((v) => flattenValue(v)).join(",")}`;
            }
            str[index] += "]";
            break;
          }
        }
      }
      if (!pluginHandled) {
        throw error;
      }
    }
  }
}
var objectProtoNames2 = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function isPlainObject2(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === objectProtoNames2;
}

// vendor/turbo-stream-v2/unflatten.ts
var globalObj = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : void 0;
function unflatten(parsed) {
  const { hydrated, values } = this;
  if (typeof parsed === "number") return hydrate.call(this, parsed);
  if (!Array.isArray(parsed) || !parsed.length) throw new SyntaxError();
  const startIndex = values.length;
  for (const value of parsed) {
    values.push(value);
  }
  hydrated.length = values.length;
  return hydrate.call(this, startIndex);
}
function hydrate(index) {
  const { hydrated, values, deferred, plugins } = this;
  let result;
  const stack = [
    [
      index,
      (v) => {
        result = v;
      }
    ]
  ];
  let postRun = [];
  while (stack.length > 0) {
    const [index2, set] = stack.pop();
    switch (index2) {
      case UNDEFINED:
        set(void 0);
        continue;
      case NULL:
        set(null);
        continue;
      case NAN:
        set(NaN);
        continue;
      case POSITIVE_INFINITY:
        set(Infinity);
        continue;
      case NEGATIVE_INFINITY:
        set(-Infinity);
        continue;
      case NEGATIVE_ZERO:
        set(-0);
        continue;
    }
    if (hydrated[index2]) {
      set(hydrated[index2]);
      continue;
    }
    const value = values[index2];
    if (!value || typeof value !== "object") {
      hydrated[index2] = value;
      set(value);
      continue;
    }
    if (Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const [type, b, c] = value;
        switch (type) {
          case TYPE_DATE:
            set(hydrated[index2] = new Date(b));
            continue;
          case TYPE_URL:
            set(hydrated[index2] = new URL(b));
            continue;
          case TYPE_BIGINT:
            set(hydrated[index2] = BigInt(b));
            continue;
          case TYPE_REGEXP:
            set(hydrated[index2] = new RegExp(b, c));
            continue;
          case TYPE_SYMBOL:
            set(hydrated[index2] = Symbol.for(b));
            continue;
          case TYPE_SET:
            const newSet = /* @__PURE__ */ new Set();
            hydrated[index2] = newSet;
            for (let i = value.length - 1; i > 0; i--)
              stack.push([
                value[i],
                (v) => {
                  newSet.add(v);
                }
              ]);
            set(newSet);
            continue;
          case TYPE_MAP:
            const map = /* @__PURE__ */ new Map();
            hydrated[index2] = map;
            for (let i = value.length - 2; i > 0; i -= 2) {
              const r = [];
              stack.push([
                value[i + 1],
                (v) => {
                  r[1] = v;
                }
              ]);
              stack.push([
                value[i],
                (k) => {
                  r[0] = k;
                }
              ]);
              postRun.push(() => {
                map.set(r[0], r[1]);
              });
            }
            set(map);
            continue;
          case TYPE_NULL_OBJECT:
            const obj = /* @__PURE__ */ Object.create(null);
            hydrated[index2] = obj;
            for (const key of Object.keys(b).reverse()) {
              const r = [];
              stack.push([
                b[key],
                (v) => {
                  r[1] = v;
                }
              ]);
              stack.push([
                Number(key.slice(1)),
                (k) => {
                  r[0] = k;
                }
              ]);
              postRun.push(() => {
                obj[r[0]] = r[1];
              });
            }
            set(obj);
            continue;
          case TYPE_PROMISE:
            if (hydrated[b]) {
              set(hydrated[index2] = hydrated[b]);
            } else {
              const d = new Deferred2();
              deferred[b] = d;
              set(hydrated[index2] = d.promise);
            }
            continue;
          case TYPE_ERROR:
            const [, message, errorType] = value;
            let error = errorType && globalObj && SUPPORTED_ERROR_TYPES.includes(errorType) && errorType in globalObj && typeof globalObj[errorType] === "function" ? new globalObj[errorType](message) : new Error(message);
            hydrated[index2] = error;
            set(error);
            continue;
          case TYPE_PREVIOUS_RESOLVED:
            set(hydrated[index2] = hydrated[b]);
            continue;
          default:
            if (Array.isArray(plugins)) {
              const r = [];
              const vals = value.slice(1);
              for (let i = 0; i < vals.length; i++) {
                const v = vals[i];
                stack.push([
                  v,
                  (v2) => {
                    r[i] = v2;
                  }
                ]);
              }
              postRun.push(() => {
                for (const plugin of plugins) {
                  const result2 = plugin(value[0], ...r);
                  if (result2) {
                    set(hydrated[index2] = result2.value);
                    return;
                  }
                }
                throw new SyntaxError();
              });
              continue;
            }
            throw new SyntaxError();
        }
      } else {
        const array = [];
        hydrated[index2] = array;
        for (let i = 0; i < value.length; i++) {
          const n = value[i];
          if (n !== HOLE) {
            stack.push([
              n,
              (v) => {
                array[i] = v;
              }
            ]);
          }
        }
        set(array);
        continue;
      }
    } else {
      const object = {};
      hydrated[index2] = object;
      for (const key of Object.keys(value).reverse()) {
        const r = [];
        stack.push([
          value[key],
          (v) => {
            r[1] = v;
          }
        ]);
        stack.push([
          Number(key.slice(1)),
          (k) => {
            r[0] = k;
          }
        ]);
        postRun.push(() => {
          object[r[0]] = r[1];
        });
      }
      set(object);
      continue;
    }
  }
  while (postRun.length > 0) {
    postRun.pop()();
  }
  return result;
}

// vendor/turbo-stream-v2/turbo-stream.ts
async function decode(readable, options) {
  const { plugins } = options ?? {};
  const done = new Deferred2();
  const reader = readable.pipeThrough(createLineSplittingTransform()).getReader();
  const decoder = {
    values: [],
    hydrated: [],
    deferred: {},
    plugins
  };
  const decoded = await decodeInitial.call(decoder, reader);
  let donePromise = done.promise;
  if (decoded.done) {
    done.resolve();
  } else {
    donePromise = decodeDeferred.call(decoder, reader).then(done.resolve).catch((reason) => {
      for (const deferred of Object.values(decoder.deferred)) {
        deferred.reject(reason);
      }
      done.reject(reason);
    });
  }
  return {
    done: donePromise.then(() => reader.closed),
    value: decoded.value
  };
}
async function decodeInitial(reader) {
  const read = await reader.read();
  if (!read.value) {
    throw new SyntaxError();
  }
  let line;
  try {
    line = JSON.parse(read.value);
  } catch (reason) {
    throw new SyntaxError();
  }
  return {
    done: read.done,
    value: unflatten.call(this, line)
  };
}
async function decodeDeferred(reader) {
  let read = await reader.read();
  while (!read.done) {
    if (!read.value) continue;
    const line = read.value;
    switch (line[0]) {
      case TYPE_PROMISE: {
        const colonIndex = line.indexOf(":");
        const deferredId = Number(line.slice(1, colonIndex));
        const deferred = this.deferred[deferredId];
        if (!deferred) {
          throw new Error(`Deferred ID ${deferredId} not found in stream`);
        }
        const lineData = line.slice(colonIndex + 1);
        let jsonLine;
        try {
          jsonLine = JSON.parse(lineData);
        } catch (reason) {
          throw new SyntaxError();
        }
        const value = unflatten.call(this, jsonLine);
        deferred.resolve(value);
        break;
      }
      case TYPE_ERROR: {
        const colonIndex = line.indexOf(":");
        const deferredId = Number(line.slice(1, colonIndex));
        const deferred = this.deferred[deferredId];
        if (!deferred) {
          throw new Error(`Deferred ID ${deferredId} not found in stream`);
        }
        const lineData = line.slice(colonIndex + 1);
        let jsonLine;
        try {
          jsonLine = JSON.parse(lineData);
        } catch (reason) {
          throw new SyntaxError();
        }
        const value = unflatten.call(this, jsonLine);
        deferred.reject(value);
        break;
      }
      default:
        throw new SyntaxError();
    }
    read = await reader.read();
  }
}
function encode(input, options) {
  const { onComplete, plugins, postPlugins, signal } = options ?? {};
  const encoder = {
    deferred: {},
    index: 0,
    indices: /* @__PURE__ */ new Map(),
    stringified: [],
    plugins,
    postPlugins,
    signal
  };
  const textEncoder = new TextEncoder();
  let lastSentIndex = 0;
  const readable = new ReadableStream({
    async start(controller) {
      const id = await flatten.call(encoder, input);
      if (Array.isArray(id)) {
        throw new Error("This should never happen");
      }
      if (id < 0) {
        controller.enqueue(textEncoder.encode(`${id}
`));
      } else {
        controller.enqueue(
          textEncoder.encode(`[${encoder.stringified.join(",")}]
`)
        );
        lastSentIndex = encoder.stringified.length - 1;
      }
      const seenPromises = /* @__PURE__ */ new WeakSet();
      let processingChain = Promise.resolve();
      if (Object.keys(encoder.deferred).length) {
        let raceDone;
        const racePromise = new Promise((resolve, reject) => {
          raceDone = resolve;
          if (signal) {
            const rejectPromise = () => reject(signal.reason || new Error("Signal was aborted."));
            if (signal.aborted) {
              rejectPromise();
            } else {
              signal.addEventListener("abort", (event) => {
                rejectPromise();
              });
            }
          }
        });
        while (Object.keys(encoder.deferred).length > 0) {
          for (const [deferredId, deferred] of Object.entries(
            encoder.deferred
          )) {
            if (seenPromises.has(deferred)) continue;
            seenPromises.add(
              // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
              encoder.deferred[Number(deferredId)] = Promise.race([
                racePromise,
                deferred
              ]).then(
                (resolved) => {
                  processingChain = processingChain.then(async () => {
                    const id2 = await flatten.call(encoder, resolved);
                    if (Array.isArray(id2)) {
                      controller.enqueue(
                        textEncoder.encode(
                          `${TYPE_PROMISE}${deferredId}:[["${TYPE_PREVIOUS_RESOLVED}",${id2[0]}]]
`
                        )
                      );
                      encoder.index++;
                      lastSentIndex++;
                    } else if (id2 < 0) {
                      controller.enqueue(
                        textEncoder.encode(
                          `${TYPE_PROMISE}${deferredId}:${id2}
`
                        )
                      );
                    } else {
                      const values = encoder.stringified.slice(lastSentIndex + 1).join(",");
                      controller.enqueue(
                        textEncoder.encode(
                          `${TYPE_PROMISE}${deferredId}:[${values}]
`
                        )
                      );
                      lastSentIndex = encoder.stringified.length - 1;
                    }
                  });
                  return processingChain;
                },
                (reason) => {
                  processingChain = processingChain.then(async () => {
                    if (!reason || typeof reason !== "object" || !(reason instanceof Error)) {
                      reason = new Error("An unknown error occurred");
                    }
                    const id2 = await flatten.call(encoder, reason);
                    if (Array.isArray(id2)) {
                      controller.enqueue(
                        textEncoder.encode(
                          `${TYPE_ERROR}${deferredId}:[["${TYPE_PREVIOUS_RESOLVED}",${id2[0]}]]
`
                        )
                      );
                      encoder.index++;
                      lastSentIndex++;
                    } else if (id2 < 0) {
                      controller.enqueue(
                        textEncoder.encode(
                          `${TYPE_ERROR}${deferredId}:${id2}
`
                        )
                      );
                    } else {
                      const values = encoder.stringified.slice(lastSentIndex + 1).join(",");
                      controller.enqueue(
                        textEncoder.encode(
                          `${TYPE_ERROR}${deferredId}:[${values}]
`
                        )
                      );
                      lastSentIndex = encoder.stringified.length - 1;
                    }
                  });
                  return processingChain;
                }
              ).finally(() => {
                delete encoder.deferred[Number(deferredId)];
              })
            );
          }
          await Promise.race(Object.values(encoder.deferred));
        }
        raceDone();
      }
      await Promise.all(Object.values(encoder.deferred));
      await processingChain;
      controller.close();
      onComplete?.();
    }
  });
  return readable;
}

// lib/dom/ssr/data.ts
async function createRequestInit(request) {
  let init = { signal: request.signal };
  if (request.method !== "GET") {
    init.method = request.method;
    let contentType = request.headers.get("Content-Type");
    if (contentType && /\bapplication\/json\b/.test(contentType)) {
      init.headers = { "Content-Type": contentType };
      init.body = JSON.stringify(await request.json());
    } else if (contentType && /\btext\/plain\b/.test(contentType)) {
      init.headers = { "Content-Type": contentType };
      init.body = await request.text();
    } else if (contentType && /\bapplication\/x-www-form-urlencoded\b/.test(contentType)) {
      init.body = new URLSearchParams(await request.text());
    } else {
      init.body = await request.formData();
    }
  }
  return init;
}

// lib/dom/ssr/markup.ts
var ESCAPE_LOOKUP = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var ESCAPE_REGEX = /[&><\u2028\u2029]/g;
function escapeHtml(html) {
  return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}

// lib/dom/ssr/invariant.ts
function invariant2(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}

// lib/dom/ssr/single-fetch.tsx
var SingleFetchRedirectSymbol = Symbol("SingleFetchRedirect");
var SingleFetchNoResultError = class extends Error {
};
var SINGLE_FETCH_REDIRECT_STATUS = 202;
var NO_BODY_STATUS_CODES = /* @__PURE__ */ new Set([100, 101, 204, 205]);
function StreamTransfer({
  context,
  identifier,
  reader,
  textDecoder,
  nonce
}) {
  if (!context.renderMeta || !context.renderMeta.didRenderScripts) {
    return null;
  }
  if (!context.renderMeta.streamCache) {
    context.renderMeta.streamCache = {};
  }
  let { streamCache } = context.renderMeta;
  let promise = streamCache[identifier];
  if (!promise) {
    promise = streamCache[identifier] = reader.read().then((result) => {
      streamCache[identifier].result = {
        done: result.done,
        value: textDecoder.decode(result.value, { stream: true })
      };
    }).catch((e) => {
      streamCache[identifier].error = e;
    });
  }
  if (promise.error) {
    throw promise.error;
  }
  if (promise.result === void 0) {
    throw promise;
  }
  let { done, value } = promise.result;
  let scriptTag = value ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "script",
    {
      nonce,
      dangerouslySetInnerHTML: {
        __html: `window.__reactRouterContext.streamController.enqueue(${escapeHtml(
          JSON.stringify(value)
        )});`
      }
    }
  ) : null;
  if (done) {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, scriptTag, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      "script",
      {
        nonce,
        dangerouslySetInnerHTML: {
          __html: `window.__reactRouterContext.streamController.close();`
        }
      }
    ));
  } else {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, scriptTag, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      StreamTransfer,
      {
        context,
        identifier: identifier + 1,
        reader,
        textDecoder,
        nonce
      }
    )));
  }
}
function getTurboStreamSingleFetchDataStrategy(getRouter, manifest, routeModules, ssr, basename, trailingSlashAware) {
  let dataStrategy = getSingleFetchDataStrategyImpl(
    getRouter,
    (match) => {
      let manifestRoute = manifest.routes[match.route.id];
      invariant2(manifestRoute, "Route not found in manifest");
      return {
        hasLoader: manifestRoute.hasLoader,
        hasClientLoader: manifestRoute.hasClientLoader
      };
    },
    fetchAndDecodeViaTurboStream,
    ssr,
    basename,
    trailingSlashAware
  );
  return async (args) => args.runClientMiddleware(dataStrategy);
}
function getSingleFetchDataStrategyImpl(getRouter, getRouteInfo, fetchAndDecode, ssr, basename, trailingSlashAware, shouldAllowOptOut = () => true) {
  return async (args) => {
    let { request, matches, fetcherKey } = args;
    let router = getRouter();
    if (request.method !== "GET") {
      return singleFetchActionStrategy(
        args,
        fetchAndDecode,
        basename,
        trailingSlashAware
      );
    }
    let foundRevalidatingServerLoader = matches.some((m) => {
      let { hasLoader, hasClientLoader } = getRouteInfo(m);
      return m.shouldCallHandler() && hasLoader && !hasClientLoader;
    });
    if (!ssr && !foundRevalidatingServerLoader) {
      return nonSsrStrategy(
        args,
        getRouteInfo,
        fetchAndDecode,
        basename,
        trailingSlashAware
      );
    }
    if (fetcherKey) {
      return singleFetchLoaderFetcherStrategy(
        args,
        fetchAndDecode,
        basename,
        trailingSlashAware
      );
    }
    return singleFetchLoaderNavigationStrategy(
      args,
      router,
      getRouteInfo,
      fetchAndDecode,
      ssr,
      basename,
      trailingSlashAware,
      shouldAllowOptOut
    );
  };
}
async function singleFetchActionStrategy(args, fetchAndDecode, basename, trailingSlashAware) {
  let actionMatch = args.matches.find((m) => m.shouldCallHandler());
  invariant2(actionMatch, "No action match found");
  let actionStatus = void 0;
  let result = await actionMatch.resolve(async (handler) => {
    let result2 = await handler(async () => {
      let { data: data2, status } = await fetchAndDecode(
        args,
        basename,
        trailingSlashAware,
        [actionMatch.route.id]
      );
      actionStatus = status;
      return unwrapSingleFetchResult(data2, actionMatch.route.id);
    });
    return result2;
  });
  if (isResponse(result.result) || isRouteErrorResponse(result.result) || isDataWithResponseInit(result.result)) {
    return { [actionMatch.route.id]: result };
  }
  return {
    [actionMatch.route.id]: {
      type: result.type,
      result: data(result.result, actionStatus)
    }
  };
}
async function nonSsrStrategy(args, getRouteInfo, fetchAndDecode, basename, trailingSlashAware) {
  let matchesToLoad = args.matches.filter((m) => m.shouldCallHandler());
  let results = {};
  await Promise.all(
    matchesToLoad.map(
      (m) => m.resolve(async (handler) => {
        try {
          let { hasClientLoader } = getRouteInfo(m);
          let routeId = m.route.id;
          let result = hasClientLoader ? await handler(async () => {
            let { data: data2 } = await fetchAndDecode(
              args,
              basename,
              trailingSlashAware,
              [routeId]
            );
            return unwrapSingleFetchResult(data2, routeId);
          }) : await handler();
          results[m.route.id] = { type: "data", result };
        } catch (e) {
          results[m.route.id] = { type: "error", result: e };
        }
      })
    )
  );
  return results;
}
async function singleFetchLoaderNavigationStrategy(args, router, getRouteInfo, fetchAndDecode, ssr, basename, trailingSlashAware, shouldAllowOptOut = () => true) {
  let routesParams = /* @__PURE__ */ new Set();
  let foundOptOutRoute = false;
  let routeDfds = args.matches.map(() => createDeferred2());
  let singleFetchDfd = createDeferred2();
  let results = {};
  let resolvePromise = Promise.all(
    args.matches.map(
      async (m, i) => m.resolve(async (handler) => {
        routeDfds[i].resolve();
        let routeId = m.route.id;
        let { hasLoader, hasClientLoader } = getRouteInfo(m);
        let defaultShouldRevalidate = !m.shouldRevalidateArgs || m.shouldRevalidateArgs.actionStatus == null || m.shouldRevalidateArgs.actionStatus < 400;
        let shouldCall = m.shouldCallHandler(defaultShouldRevalidate);
        if (!shouldCall) {
          foundOptOutRoute || (foundOptOutRoute = m.shouldRevalidateArgs != null && // This is a revalidation,
          hasLoader);
          return;
        }
        if (shouldAllowOptOut(m) && hasClientLoader) {
          if (hasLoader) {
            foundOptOutRoute = true;
          }
          try {
            let result = await handler(async () => {
              let { data: data2 } = await fetchAndDecode(
                args,
                basename,
                trailingSlashAware,
                [routeId]
              );
              return unwrapSingleFetchResult(data2, routeId);
            });
            results[routeId] = { type: "data", result };
          } catch (e) {
            results[routeId] = { type: "error", result: e };
          }
          return;
        }
        if (hasLoader) {
          routesParams.add(routeId);
        }
        try {
          let result = await handler(async () => {
            let data2 = await singleFetchDfd.promise;
            return unwrapSingleFetchResult(data2, routeId);
          });
          results[routeId] = { type: "data", result };
        } catch (e) {
          results[routeId] = { type: "error", result: e };
        }
      })
    )
  );
  await Promise.all(routeDfds.map((d) => d.promise));
  let isInitialLoad = !router.state.initialized && router.state.navigation.state === "idle";
  if ((isInitialLoad || routesParams.size === 0) && !window.__reactRouterHdrActive) {
    singleFetchDfd.resolve({ routes: {} });
  } else {
    let targetRoutes = ssr && foundOptOutRoute && routesParams.size > 0 ? [...routesParams.keys()] : void 0;
    try {
      let data2 = await fetchAndDecode(
        args,
        basename,
        trailingSlashAware,
        targetRoutes
      );
      singleFetchDfd.resolve(data2.data);
    } catch (e) {
      singleFetchDfd.reject(e);
    }
  }
  await resolvePromise;
  await bubbleMiddlewareErrors(
    singleFetchDfd.promise,
    args.matches,
    routesParams,
    results
  );
  return results;
}
async function bubbleMiddlewareErrors(singleFetchPromise, matches, routesParams, results) {
  try {
    let middlewareError;
    let fetchedData = await singleFetchPromise;
    if ("routes" in fetchedData) {
      for (let match of matches) {
        if (match.route.id in fetchedData.routes) {
          let routeResult = fetchedData.routes[match.route.id];
          if ("error" in routeResult) {
            middlewareError = routeResult.error;
            if (results[match.route.id]?.result == null) {
              results[match.route.id] = {
                type: "error",
                result: middlewareError
              };
            }
            break;
          }
        }
      }
    }
    if (middlewareError !== void 0) {
      Array.from(routesParams.values()).forEach((routeId) => {
        if (results[routeId].result instanceof SingleFetchNoResultError) {
          results[routeId].result = middlewareError;
        }
      });
    }
  } catch (e) {
  }
}
async function singleFetchLoaderFetcherStrategy(args, fetchAndDecode, basename, trailingSlashAware) {
  let fetcherMatch = args.matches.find((m) => m.shouldCallHandler());
  invariant2(fetcherMatch, "No fetcher match found");
  let routeId = fetcherMatch.route.id;
  let result = await fetcherMatch.resolve(
    async (handler) => handler(async () => {
      let { data: data2 } = await fetchAndDecode(args, basename, trailingSlashAware, [
        routeId
      ]);
      return unwrapSingleFetchResult(data2, routeId);
    })
  );
  return { [fetcherMatch.route.id]: result };
}
function stripIndexParam(url) {
  let indexValues = url.searchParams.getAll("index");
  url.searchParams.delete("index");
  let indexValuesToKeep = [];
  for (let indexValue of indexValues) {
    if (indexValue) {
      indexValuesToKeep.push(indexValue);
    }
  }
  for (let toKeep of indexValuesToKeep) {
    url.searchParams.append("index", toKeep);
  }
  return url;
}
function singleFetchUrl(reqUrl, basename, trailingSlashAware, extension) {
  let url = typeof reqUrl === "string" ? new URL(
    reqUrl,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window === "undefined" ? "server://singlefetch/" : window.location.origin
  ) : reqUrl;
  if (trailingSlashAware) {
    if (url.pathname.endsWith("/")) {
      url.pathname = `${url.pathname}_.${extension}`;
    } else {
      url.pathname = `${url.pathname}.${extension}`;
    }
  } else {
    if (url.pathname === "/") {
      url.pathname = `_root.${extension}`;
    } else if (basename && stripBasename(url.pathname, basename) === "/") {
      url.pathname = `${removeTrailingSlash(basename)}/_root.${extension}`;
    } else {
      url.pathname = `${removeTrailingSlash(url.pathname)}.${extension}`;
    }
  }
  return url;
}
async function fetchAndDecodeViaTurboStream(args, basename, trailingSlashAware, targetRoutes) {
  let { request } = args;
  let url = singleFetchUrl(request.url, basename, trailingSlashAware, "data");
  if (request.method === "GET") {
    url = stripIndexParam(url);
    if (targetRoutes) {
      url.searchParams.set("_routes", targetRoutes.join(","));
    }
  }
  let res = await fetch(url, await createRequestInit(request));
  if (res.status >= 400 && !res.headers.has("X-Remix-Response")) {
    throw new ErrorResponseImpl(res.status, res.statusText, await res.text());
  }
  if (res.status === 204 && res.headers.has("X-Remix-Redirect")) {
    return {
      status: SINGLE_FETCH_REDIRECT_STATUS,
      data: {
        redirect: {
          redirect: res.headers.get("X-Remix-Redirect"),
          status: Number(res.headers.get("X-Remix-Status") || "302"),
          revalidate: res.headers.get("X-Remix-Revalidate") === "true",
          reload: res.headers.get("X-Remix-Reload-Document") === "true",
          replace: res.headers.get("X-Remix-Replace") === "true"
        }
      }
    };
  }
  if (NO_BODY_STATUS_CODES.has(res.status)) {
    let routes = {};
    if (targetRoutes && request.method !== "GET") {
      routes[targetRoutes[0]] = { data: void 0 };
    }
    return {
      status: res.status,
      data: { routes }
    };
  }
  invariant2(res.body, "No response body to decode");
  try {
    let decoded = await decodeViaTurboStream(res.body, window);
    let data2;
    if (request.method === "GET") {
      let typed = decoded.value;
      if (SingleFetchRedirectSymbol in typed) {
        data2 = { redirect: typed[SingleFetchRedirectSymbol] };
      } else {
        data2 = { routes: typed };
      }
    } else {
      let typed = decoded.value;
      let routeId = targetRoutes?.[0];
      invariant2(routeId, "No routeId found for single fetch call decoding");
      if ("redirect" in typed) {
        data2 = { redirect: typed };
      } else {
        data2 = { routes: { [routeId]: typed } };
      }
    }
    return { status: res.status, data: data2 };
  } catch (e) {
    throw new Error("Unable to decode turbo-stream response");
  }
}
function decodeViaTurboStream(body, global) {
  return decode(body, {
    plugins: [
      (type, ...rest) => {
        if (type === "SanitizedError") {
          let [name, message, stack] = rest;
          let Constructor = Error;
          if (name && SUPPORTED_ERROR_TYPES.includes(name) && name in global && // @ts-expect-error
          typeof global[name] === "function") {
            Constructor = global[name];
          }
          let error = new Constructor(message);
          error.stack = stack;
          return { value: error };
        }
        if (type === "ErrorResponse") {
          let [data2, status, statusText] = rest;
          return {
            value: new ErrorResponseImpl(status, statusText, data2)
          };
        }
        if (type === "SingleFetchRedirect") {
          return { value: { [SingleFetchRedirectSymbol]: rest[0] } };
        }
        if (type === "SingleFetchClassInstance") {
          return { value: rest[0] };
        }
        if (type === "SingleFetchFallback") {
          return { value: void 0 };
        }
      }
    ]
  });
}
function unwrapSingleFetchResult(result, routeId) {
  if ("redirect" in result) {
    let {
      redirect: location,
      revalidate,
      reload,
      replace: replace2,
      status
    } = result.redirect;
    throw redirect(location, {
      status,
      headers: {
        // Three R's of redirecting (lol Veep)
        ...revalidate ? { "X-Remix-Revalidate": "yes" } : null,
        ...reload ? { "X-Remix-Reload-Document": "yes" } : null,
        ...replace2 ? { "X-Remix-Replace": "yes" } : null
      }
    });
  }
  let routeResult = result.routes[routeId];
  if (routeResult == null) {
    throw new SingleFetchNoResultError(
      `No result found for routeId "${routeId}"`
    );
  } else if ("error" in routeResult) {
    throw routeResult.error;
  } else if ("data" in routeResult) {
    return routeResult.data;
  } else {
    throw new Error(`Invalid response found for routeId "${routeId}"`);
  }
}
function createDeferred2() {
  let resolve;
  let reject;
  let promise = new Promise((res, rej) => {
    resolve = async (val) => {
      res(val);
      try {
        await promise;
      } catch (e) {
      }
    };
    reject = async (error) => {
      rej(error);
      try {
        await promise;
      } catch (e) {
      }
    };
  });
  return {
    promise,
    //@ts-ignore
    resolve,
    //@ts-ignore
    reject
  };
}

// lib/dom/ssr/errorBoundaries.tsx


// lib/dom/ssr/components.tsx


// lib/dom/ssr/routeModules.ts
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache) {
    return routeModulesCache[route.id];
  }
  try {
    let routeModule = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      route.module
    );
    routeModulesCache[route.id] = routeModule;
    return routeModule;
  } catch (error) {
    console.error(
      `Error loading route module \`${route.module}\`, reloading page...`
    );
    console.error(error);
    if (window.__reactRouterContext && window.__reactRouterContext.isSpaMode && // @ts-expect-error
    /* unsupported import.meta.hot */ undefined) // removed by dead control flow
{}
    window.location.reload();
    return new Promise(() => {
    });
  }
}

// lib/dom/ssr/links.ts
function getKeyedLinksForMatches(matches, routeModules, manifest) {
  let descriptors = matches.map((match) => {
    let module = routeModules[match.route.id];
    let route = manifest.routes[match.route.id];
    return [
      route && route.css ? route.css.map((href) => ({ rel: "stylesheet", href })) : [],
      module?.links?.() || []
    ];
  }).flat(2);
  let preloads = getModuleLinkHrefs(matches, manifest);
  return dedupeLinkDescriptors(descriptors, preloads);
}
function getRouteCssDescriptors(route) {
  if (!route.css) return [];
  return route.css.map((href) => ({ rel: "stylesheet", href }));
}
async function prefetchRouteCss(route) {
  if (!route.css) return;
  let descriptors = getRouteCssDescriptors(route);
  await Promise.all(descriptors.map(prefetchStyleLink));
}
async function prefetchStyleLinks(route, routeModule) {
  if (!route.css && !routeModule.links || !isPreloadSupported()) return;
  let descriptors = [];
  if (route.css) {
    descriptors.push(...getRouteCssDescriptors(route));
  }
  if (routeModule.links) {
    descriptors.push(...routeModule.links());
  }
  if (descriptors.length === 0) return;
  let styleLinks = [];
  for (let descriptor of descriptors) {
    if (!isPageLinkDescriptor(descriptor) && descriptor.rel === "stylesheet") {
      styleLinks.push({
        ...descriptor,
        rel: "preload",
        as: "style"
      });
    }
  }
  await Promise.all(styleLinks.map(prefetchStyleLink));
}
async function prefetchStyleLink(descriptor) {
  return new Promise((resolve) => {
    if (descriptor.media && !window.matchMedia(descriptor.media).matches || document.querySelector(
      `link[rel="stylesheet"][href="${descriptor.href}"]`
    )) {
      return resolve();
    }
    let link = document.createElement("link");
    Object.assign(link, descriptor);
    function removeLink() {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    }
    link.onload = () => {
      removeLink();
      resolve();
    };
    link.onerror = () => {
      removeLink();
      resolve();
    };
    document.head.appendChild(link);
  });
}
function isPageLinkDescriptor(object) {
  return object != null && typeof object.page === "string";
}
function isHtmlLinkDescriptor(object) {
  if (object == null) {
    return false;
  }
  if (object.href == null) {
    return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
  }
  return typeof object.rel === "string" && typeof object.href === "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
  let links = await Promise.all(
    matches.map(async (match) => {
      let route = manifest.routes[match.route.id];
      if (route) {
        let mod = await loadRouteModule(route, routeModules);
        return mod.links ? mod.links() : [];
      }
      return [];
    })
  );
  return dedupeLinkDescriptors(
    links.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map(
      (link) => link.rel === "stylesheet" ? { ...link, rel: "prefetch", as: "style" } : { ...link, rel: "prefetch" }
    )
  );
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
  let isNew = (match, index) => {
    if (!currentMatches[index]) return true;
    return match.route.id !== currentMatches[index].route.id;
  };
  let matchPathChanged = (match, index) => {
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index].pathname !== match.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      currentMatches[index].route.path?.endsWith("*") && currentMatches[index].params["*"] !== match.params["*"]
    );
  };
  if (mode === "assets") {
    return nextMatches.filter(
      (match, index) => isNew(match, index) || matchPathChanged(match, index)
    );
  }
  if (mode === "data") {
    return nextMatches.filter((match, index) => {
      let manifestRoute = manifest.routes[match.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return false;
      }
      if (isNew(match, index) || matchPathChanged(match, index)) {
        return true;
      }
      if (match.route.shouldRevalidate) {
        let routeChoice = match.route.shouldRevalidate({
          currentUrl: new URL(
            location.pathname + location.search + location.hash,
            window.origin
          ),
          currentParams: currentMatches[0]?.params || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match.params,
          defaultShouldRevalidate: true
        });
        if (typeof routeChoice === "boolean") {
          return routeChoice;
        }
      }
      return true;
    });
  }
  return [];
}
function getModuleLinkHrefs(matches, manifest, { includeHydrateFallback } = {}) {
  return dedupeHrefs(
    matches.map((match) => {
      let route = manifest.routes[match.route.id];
      if (!route) return [];
      let hrefs = [route.module];
      if (route.clientActionModule) {
        hrefs = hrefs.concat(route.clientActionModule);
      }
      if (route.clientLoaderModule) {
        hrefs = hrefs.concat(route.clientLoaderModule);
      }
      if (includeHydrateFallback && route.hydrateFallbackModule) {
        hrefs = hrefs.concat(route.hydrateFallbackModule);
      }
      if (route.imports) {
        hrefs = hrefs.concat(route.imports);
      }
      return hrefs;
    }).flat(1)
  );
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function sortKeys(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set();
  let preloadsSet = new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    let alreadyModulePreload = preloads && !isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href);
    if (alreadyModulePreload) {
      return deduped;
    }
    let key = JSON.stringify(sortKeys(descriptor));
    if (!set.has(key)) {
      set.add(key);
      deduped.push({ key, link: descriptor });
    }
    return deduped;
  }, []);
}
var _isPreloadSupported;
function isPreloadSupported() {
  if (_isPreloadSupported !== void 0) {
    return _isPreloadSupported;
  }
  let el = document.createElement("link");
  _isPreloadSupported = el.relList.supports("preload");
  el = null;
  return _isPreloadSupported;
}

// lib/dom/ssr/fog-of-war.ts


// lib/dom/ssr/routes.tsx


// lib/dom/ssr/fallback.tsx

function RemixRootDefaultHydrateFallback() {
  let { nonce } = useFrameworkContext();
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(BoundaryShell, { title: "Loading...", renderScripts: true }, ENABLE_DEV_WARNINGS ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "script",
    {
      nonce,
      dangerouslySetInnerHTML: {
        __html: `
              console.log(
                "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this " +
                "when your app is loading JS modules and/or running \`clientLoader\` " +
                "functions. Check out https://reactrouter.com/start/framework/route-module#hydratefallback " +
                "for more information."
              );
            `
      }
    }
  ) : null);
}

// lib/dom/ssr/routes.tsx
function groupRoutesByParentId(manifest) {
  let routes = {};
  Object.values(manifest).forEach((route) => {
    if (route) {
      let parentId = route.parentId || "";
      if (!routes[parentId]) {
        routes[parentId] = [];
      }
      routes[parentId].push(route);
    }
  });
  return routes;
}
function getRouteComponents(route, routeModule, isSpaMode) {
  let Component4 = getRouteModuleComponent(routeModule);
  let HydrateFallback = routeModule.HydrateFallback && (!isSpaMode || route.id === "root") ? routeModule.HydrateFallback : route.id === "root" ? RemixRootDefaultHydrateFallback : void 0;
  let ErrorBoundary = routeModule.ErrorBoundary ? routeModule.ErrorBoundary : route.id === "root" ? () => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(RemixRootDefaultErrorBoundary, { error: useRouteError() }) : void 0;
  if (route.id === "root" && routeModule.Layout) {
    return {
      ...Component4 ? {
        element: /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(routeModule.Layout, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component4, null))
      } : { Component: Component4 },
      ...ErrorBoundary ? {
        errorElement: /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(routeModule.Layout, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ErrorBoundary, null))
      } : { ErrorBoundary },
      ...HydrateFallback ? {
        hydrateFallbackElement: /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(routeModule.Layout, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(HydrateFallback, null))
      } : { HydrateFallback }
    };
  }
  return { Component: Component4, ErrorBoundary, HydrateFallback };
}
function createServerRoutes(manifest, routeModules, future, isSpaMode, parentId = "", routesByParentId = groupRoutesByParentId(manifest), spaModeLazyPromise = Promise.resolve({ Component: () => null })) {
  return (routesByParentId[parentId] || []).map((route) => {
    let routeModule = routeModules[route.id];
    invariant2(
      routeModule,
      "No `routeModule` available to create server routes"
    );
    let dataRoute = {
      ...getRouteComponents(route, routeModule, isSpaMode),
      caseSensitive: route.caseSensitive,
      id: route.id,
      index: route.index,
      path: route.path,
      handle: routeModule.handle,
      // For SPA Mode, all routes are lazy except root.  However we tell the
      // router root is also lazy here too since we don't need a full
      // implementation - we just need a `lazy` prop to tell the RR rendering
      // where to stop which is always at the root route in SPA mode
      lazy: isSpaMode ? () => spaModeLazyPromise : void 0,
      // For partial hydration rendering, we need to indicate when the route
      // has a loader/clientLoader, but it won't ever be called during the static
      // render, so just give it a no-op function so we can render down to the
      // proper fallback
      loader: route.hasLoader || route.hasClientLoader ? () => null : void 0
      // We don't need middleware/action/shouldRevalidate on these routes since
      // they're for a static render
    };
    let children = createServerRoutes(
      manifest,
      routeModules,
      future,
      isSpaMode,
      route.id,
      routesByParentId,
      spaModeLazyPromise
    );
    if (children.length > 0) dataRoute.children = children;
    return dataRoute;
  });
}
function createClientRoutesWithHMRRevalidationOptOut(needsRevalidation, manifest, routeModulesCache, initialState, ssr, isSpaMode) {
  return createClientRoutes(
    manifest,
    routeModulesCache,
    initialState,
    ssr,
    isSpaMode,
    "",
    groupRoutesByParentId(manifest),
    needsRevalidation
  );
}
function preventInvalidServerHandlerCall(type, route) {
  if (type === "loader" && !route.hasLoader || type === "action" && !route.hasAction) {
    let fn = type === "action" ? "serverAction()" : "serverLoader()";
    let msg = `You are trying to call ${fn} on a route that does not have a server ${type} (routeId: "${route.id}")`;
    console.error(msg);
    throw new ErrorResponseImpl(400, "Bad Request", new Error(msg), true);
  }
}
function noActionDefinedError(type, routeId) {
  let article = type === "clientAction" ? "a" : "an";
  let msg = `Route "${routeId}" does not have ${article} ${type}, but you are trying to submit to it. To fix this, please add ${article} \`${type}\` function to the route`;
  console.error(msg);
  throw new ErrorResponseImpl(405, "Method Not Allowed", new Error(msg), true);
}
function createClientRoutes(manifest, routeModulesCache, initialState, ssr, isSpaMode, parentId = "", routesByParentId = groupRoutesByParentId(manifest), needsRevalidation) {
  return (routesByParentId[parentId] || []).map((route) => {
    let routeModule = routeModulesCache[route.id];
    function fetchServerHandler(singleFetch) {
      invariant2(
        typeof singleFetch === "function",
        "No single fetch function available for route handler"
      );
      return singleFetch();
    }
    function fetchServerLoader(singleFetch) {
      if (!route.hasLoader) return Promise.resolve(null);
      return fetchServerHandler(singleFetch);
    }
    function fetchServerAction(singleFetch) {
      if (!route.hasAction) {
        throw noActionDefinedError("action", route.id);
      }
      return fetchServerHandler(singleFetch);
    }
    function prefetchModule(modulePath) {
      import(
        /* @vite-ignore */
        /* webpackIgnore: true */
        modulePath
      );
    }
    function prefetchRouteModuleChunks(route2) {
      if (route2.clientActionModule) {
        prefetchModule(route2.clientActionModule);
      }
      if (route2.clientLoaderModule) {
        prefetchModule(route2.clientLoaderModule);
      }
    }
    async function prefetchStylesAndCallHandler(handler) {
      let cachedModule = routeModulesCache[route.id];
      let linkPrefetchPromise = cachedModule ? prefetchStyleLinks(route, cachedModule) : Promise.resolve();
      try {
        return handler();
      } finally {
        await linkPrefetchPromise;
      }
    }
    let dataRoute = {
      id: route.id,
      index: route.index,
      path: route.path
    };
    if (routeModule) {
      Object.assign(dataRoute, {
        ...dataRoute,
        ...getRouteComponents(route, routeModule, isSpaMode),
        middleware: routeModule.clientMiddleware,
        handle: routeModule.handle,
        shouldRevalidate: getShouldRevalidateFunction(
          dataRoute.path,
          routeModule,
          route,
          ssr,
          needsRevalidation
        )
      });
      let hasInitialData = initialState && initialState.loaderData && route.id in initialState.loaderData;
      let initialData = hasInitialData ? initialState?.loaderData?.[route.id] : void 0;
      let hasInitialError = initialState && initialState.errors && route.id in initialState.errors;
      let initialError = hasInitialError ? initialState?.errors?.[route.id] : void 0;
      let isHydrationRequest = needsRevalidation == null && (routeModule.clientLoader?.hydrate === true || !route.hasLoader);
      dataRoute.loader = async ({ request, params, context, pattern, url }, singleFetch) => {
        let _isHydrationRequest = isHydrationRequest;
        isHydrationRequest = false;
        let result = await prefetchStylesAndCallHandler(async () => {
          invariant2(
            routeModule,
            "No `routeModule` available for critical-route loader"
          );
          if (!routeModule.clientLoader) {
            return fetchServerLoader(singleFetch);
          }
          return routeModule.clientLoader({
            request,
            params,
            context,
            pattern,
            url,
            async serverLoader() {
              preventInvalidServerHandlerCall("loader", route);
              if (_isHydrationRequest) {
                if (hasInitialData) {
                  return initialData;
                }
                if (hasInitialError) {
                  throw initialError;
                }
              }
              return fetchServerLoader(singleFetch);
            }
          });
        });
        return result;
      };
      dataRoute.loader.hydrate = shouldHydrateRouteLoader(
        route.id,
        routeModule.clientLoader,
        route.hasLoader,
        isSpaMode
      );
      dataRoute.action = ({ request, params, context, pattern, url }, singleFetch) => {
        return prefetchStylesAndCallHandler(async () => {
          invariant2(
            routeModule,
            "No `routeModule` available for critical-route action"
          );
          if (!routeModule.clientAction) {
            if (isSpaMode) {
              throw noActionDefinedError("clientAction", route.id);
            }
            return fetchServerAction(singleFetch);
          }
          return routeModule.clientAction({
            request,
            params,
            context,
            pattern,
            url,
            async serverAction() {
              preventInvalidServerHandlerCall("action", route);
              return fetchServerAction(singleFetch);
            }
          });
        });
      };
    } else {
      if (!route.hasClientLoader) {
        dataRoute.loader = (_, singleFetch) => prefetchStylesAndCallHandler(() => {
          return fetchServerLoader(singleFetch);
        });
      }
      if (!route.hasClientAction) {
        dataRoute.action = (_, singleFetch) => prefetchStylesAndCallHandler(() => {
          if (isSpaMode) {
            throw noActionDefinedError("clientAction", route.id);
          }
          return fetchServerAction(singleFetch);
        });
      }
      let lazyRoutePromise;
      async function getLazyRoute() {
        if (lazyRoutePromise) {
          return await lazyRoutePromise;
        }
        lazyRoutePromise = (async () => {
          if (route.clientLoaderModule || route.clientActionModule) {
            await new Promise((resolve) => setTimeout(resolve, 0));
          }
          let routeModulePromise = loadRouteModuleWithBlockingLinks(
            route,
            routeModulesCache
          );
          prefetchRouteModuleChunks(route);
          return await routeModulePromise;
        })();
        return await lazyRoutePromise;
      }
      dataRoute.lazy = {
        loader: route.hasClientLoader ? async () => {
          let { clientLoader } = route.clientLoaderModule ? await import(
            /* @vite-ignore */
            /* webpackIgnore: true */
            route.clientLoaderModule
          ) : await getLazyRoute();
          invariant2(clientLoader, "No `clientLoader` export found");
          return (args, singleFetch) => clientLoader({
            ...args,
            async serverLoader() {
              preventInvalidServerHandlerCall("loader", route);
              return fetchServerLoader(singleFetch);
            }
          });
        } : void 0,
        action: route.hasClientAction ? async () => {
          let clientActionPromise = route.clientActionModule ? import(
            /* @vite-ignore */
            /* webpackIgnore: true */
            route.clientActionModule
          ) : getLazyRoute();
          prefetchRouteModuleChunks(route);
          let { clientAction } = await clientActionPromise;
          invariant2(clientAction, "No `clientAction` export found");
          return (args, singleFetch) => clientAction({
            ...args,
            async serverAction() {
              preventInvalidServerHandlerCall("action", route);
              return fetchServerAction(singleFetch);
            }
          });
        } : void 0,
        middleware: route.hasClientMiddleware ? async () => {
          let { clientMiddleware } = route.clientMiddlewareModule ? await import(
            /* @vite-ignore */
            /* webpackIgnore: true */
            route.clientMiddlewareModule
          ) : await getLazyRoute();
          invariant2(clientMiddleware, "No `clientMiddleware` export found");
          return clientMiddleware;
        } : void 0,
        shouldRevalidate: async () => {
          let lazyRoute = await getLazyRoute();
          return getShouldRevalidateFunction(
            dataRoute.path,
            lazyRoute,
            route,
            ssr,
            needsRevalidation
          );
        },
        handle: async () => (await getLazyRoute()).handle,
        // No need to wrap these in layout since the root route is never
        // loaded via route.lazy()
        Component: async () => (await getLazyRoute()).Component,
        ErrorBoundary: route.hasErrorBoundary ? async () => (await getLazyRoute()).ErrorBoundary : void 0
      };
    }
    let children = createClientRoutes(
      manifest,
      routeModulesCache,
      initialState,
      ssr,
      isSpaMode,
      route.id,
      routesByParentId,
      needsRevalidation
    );
    if (children.length > 0) dataRoute.children = children;
    return dataRoute;
  });
}
function getShouldRevalidateFunction(path, route, manifestRoute, ssr, needsRevalidation) {
  if (needsRevalidation) {
    return wrapShouldRevalidateForHdr(
      manifestRoute.id,
      route.shouldRevalidate,
      needsRevalidation
    );
  }
  if (!ssr && manifestRoute.hasLoader && !manifestRoute.hasClientLoader) {
    let myParams = path ? compilePath(path)[1].map((p) => p.paramName) : [];
    const didParamsChange = (opts) => myParams.some((p) => opts.currentParams[p] !== opts.nextParams[p]);
    if (route.shouldRevalidate) {
      let fn = route.shouldRevalidate;
      return (opts) => fn({
        ...opts,
        defaultShouldRevalidate: didParamsChange(opts)
      });
    } else {
      return (opts) => didParamsChange(opts);
    }
  }
  return route.shouldRevalidate;
}
function wrapShouldRevalidateForHdr(routeId, routeShouldRevalidate, needsRevalidation) {
  let handledRevalidation = false;
  return (arg) => {
    if (!handledRevalidation) {
      handledRevalidation = true;
      return needsRevalidation.has(routeId);
    }
    return routeShouldRevalidate ? routeShouldRevalidate(arg) : arg.defaultShouldRevalidate;
  };
}
async function loadRouteModuleWithBlockingLinks(route, routeModules) {
  let routeModulePromise = loadRouteModule(route, routeModules);
  let prefetchRouteCssPromise = prefetchRouteCss(route);
  let routeModule = await routeModulePromise;
  await Promise.all([
    prefetchRouteCssPromise,
    prefetchStyleLinks(route, routeModule)
  ]);
  return {
    Component: getRouteModuleComponent(routeModule),
    ErrorBoundary: routeModule.ErrorBoundary,
    clientMiddleware: routeModule.clientMiddleware,
    clientAction: routeModule.clientAction,
    clientLoader: routeModule.clientLoader,
    handle: routeModule.handle,
    links: routeModule.links,
    meta: routeModule.meta,
    shouldRevalidate: routeModule.shouldRevalidate
  };
}
function getRouteModuleComponent(routeModule) {
  if (routeModule.default == null) return void 0;
  let isEmptyObject = typeof routeModule.default === "object" && Object.keys(routeModule.default).length === 0;
  if (!isEmptyObject) {
    return routeModule.default;
  }
}
function shouldHydrateRouteLoader(routeId, clientLoader, hasLoader, isSpaMode) {
  return isSpaMode && routeId !== "root" || clientLoader != null && (clientLoader.hydrate === true || hasLoader !== true);
}

// lib/dom/ssr/fog-of-war.ts
var nextPaths = /* @__PURE__ */ new Set();
var discoveredPathsMaxSize = 1e3;
var discoveredPaths = /* @__PURE__ */ new Set();
var URL_LIMIT = 7680;
function getPathsWithAncestors(paths) {
  let result = /* @__PURE__ */ new Set();
  paths.forEach((path) => {
    if (!path.startsWith("/")) {
      path = `/${path}`;
    }
    for (let i = 1; i < path.length; i++) {
      if (path[i] === "/") {
        result.add(path.slice(0, i));
      }
    }
    result.add(path);
  });
  return Array.from(result);
}
function isFogOfWarEnabled(routeDiscovery, ssr) {
  return routeDiscovery.mode === "lazy" && ssr === true;
}
function getPartialManifest({ sri, ...manifest }, router) {
  let routeIds = new Set(router.state.matches.map((m) => m.route.id));
  let segments = router.state.location.pathname.split("/").filter(Boolean);
  let paths = ["/"];
  segments.pop();
  while (segments.length > 0) {
    paths.push(`/${segments.join("/")}`);
    segments.pop();
  }
  paths.forEach((path) => {
    let matches = matchRoutesImpl(
      router.routes,
      path,
      router.basename || "/",
      false,
      router.branches
    );
    if (matches) {
      matches.forEach((m) => routeIds.add(m.route.id));
    }
  });
  let initialRoutes = [...routeIds].reduce(
    (acc, id) => Object.assign(acc, { [id]: manifest.routes[id] }),
    {}
  );
  return {
    ...manifest,
    routes: initialRoutes,
    sri: sri ? true : void 0
  };
}
function getPatchRoutesOnNavigationFunction(getRouter, manifest, routeModules, ssr, routeDiscovery, isSpaMode, basename) {
  if (!isFogOfWarEnabled(routeDiscovery, ssr)) {
    return void 0;
  }
  return async ({ path, patch, signal, fetcherKey }) => {
    if (discoveredPaths.has(path)) {
      return;
    }
    let { state } = getRouter();
    await fetchAndApplyManifestPatches(
      [path],
      // If we're patching for a fetcher call, reload the current location
      // Otherwise prefer any ongoing navigation location
      fetcherKey ? window.location.href : createPath(state.navigation.location || state.location),
      manifest,
      routeModules,
      ssr,
      isSpaMode,
      basename,
      routeDiscovery.manifestPath,
      patch,
      signal
    );
  };
}
function useFogOFWarDiscovery(router, manifest, routeModules, ssr, routeDiscovery, isSpaMode) {
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!isFogOfWarEnabled(routeDiscovery, ssr) || // @ts-expect-error - TS doesn't know about this yet
    window.navigator?.connection?.saveData === true) {
      return;
    }
    function registerElement(el) {
      let path = el.tagName === "FORM" ? el.getAttribute("action") : el.getAttribute("href");
      if (!path) {
        return;
      }
      let pathname = el.tagName === "A" ? el.pathname : new URL(path, window.location.origin).pathname;
      if (!discoveredPaths.has(pathname)) {
        nextPaths.add(pathname);
      }
    }
    async function fetchPatches() {
      document.querySelectorAll("a[data-discover], form[data-discover]").forEach(registerElement);
      let lazyPaths = Array.from(nextPaths.keys()).filter((path) => {
        if (discoveredPaths.has(path)) {
          nextPaths.delete(path);
          return false;
        }
        return true;
      });
      if (lazyPaths.length === 0) {
        return;
      }
      try {
        await fetchAndApplyManifestPatches(
          lazyPaths,
          null,
          manifest,
          routeModules,
          ssr,
          isSpaMode,
          router.basename,
          routeDiscovery.manifestPath,
          router.patchRoutes
        );
      } catch (e) {
        console.error("Failed to fetch manifest patches", e);
      }
    }
    let debouncedFetchPatches = debounce(fetchPatches, 100);
    fetchPatches();
    let observer = new MutationObserver(() => debouncedFetchPatches());
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-discover", "href", "action"]
    });
    return () => observer.disconnect();
  }, [ssr, isSpaMode, manifest, routeModules, router, routeDiscovery]);
}
function getManifestPath(_manifestPath, basename) {
  let manifestPath = _manifestPath || "/__manifest";
  return basename == null ? manifestPath : joinPaths([basename, manifestPath]);
}
var MANIFEST_VERSION_STORAGE_KEY = "react-router-manifest-version";
async function fetchAndApplyManifestPatches(paths, errorReloadPath, manifest, routeModules, ssr, isSpaMode, basename, manifestPath, patchRoutes, signal) {
  paths = getPathsWithAncestors(paths);
  const searchParams = new URLSearchParams();
  searchParams.set("paths", paths.sort().join(","));
  searchParams.set("version", manifest.version);
  let url = new URL(
    getManifestPath(manifestPath, basename),
    window.location.origin
  );
  url.search = searchParams.toString();
  if (url.toString().length > URL_LIMIT) {
    nextPaths.clear();
    return;
  }
  let serverPatches;
  try {
    let res = await fetch(url, { signal });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    } else if (res.status === 204 && res.headers.has("X-Remix-Reload-Document")) {
      if (!errorReloadPath) {
        console.warn(
          "Detected a manifest version mismatch during eager route discovery. The next navigation/fetch to an undiscovered route will result in a new document navigation to sync up with the latest manifest."
        );
        return;
      }
      try {
        if (sessionStorage.getItem(MANIFEST_VERSION_STORAGE_KEY) === manifest.version) {
          console.error(
            "Unable to discover routes due to manifest version mismatch."
          );
          return;
        }
        sessionStorage.setItem(MANIFEST_VERSION_STORAGE_KEY, manifest.version);
      } catch {
      }
      window.location.href = errorReloadPath;
      console.warn("Detected manifest version mismatch, reloading...");
      await new Promise(() => {
      });
    } else if (res.status >= 400) {
      throw new Error(await res.text());
    }
    try {
      sessionStorage.removeItem(MANIFEST_VERSION_STORAGE_KEY);
    } catch {
    }
    serverPatches = await res.json();
  } catch (e) {
    if (signal?.aborted) return;
    throw e;
  }
  let knownRoutes = new Set(Object.keys(manifest.routes));
  let patches = Object.values(serverPatches).reduce((acc, route) => {
    if (route && !knownRoutes.has(route.id)) {
      acc[route.id] = route;
    }
    return acc;
  }, {});
  Object.assign(manifest.routes, patches);
  paths.forEach((p) => addToFifoQueue(p, discoveredPaths));
  let parentIds = /* @__PURE__ */ new Set();
  Object.values(patches).forEach((patch) => {
    if (patch && (!patch.parentId || !patches[patch.parentId])) {
      parentIds.add(patch.parentId);
    }
  });
  parentIds.forEach(
    (parentId) => patchRoutes(
      parentId || null,
      createClientRoutes(patches, routeModules, null, ssr, isSpaMode, parentId)
    )
  );
}
function addToFifoQueue(path, queue) {
  if (queue.size >= discoveredPathsMaxSize) {
    let first = queue.values().next().value;
    queue.delete(first);
  }
  queue.add(path);
}
function debounce(callback, wait) {
  let timeoutId;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), wait);
  };
}

// lib/dom/ssr/components.tsx
function useDataRouterContext2() {
  let context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterContext.Provider> element"
  );
  return context;
}
function useDataRouterStateContext() {
  let context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterStateContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  );
  return context;
}
var FrameworkContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(void 0);
FrameworkContext.displayName = "FrameworkContext";
function useFrameworkContext() {
  let context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FrameworkContext);
  invariant2(
    context,
    "You must render this element inside a <HydratedRouter> element"
  );
  return context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let frameworkContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FrameworkContext);
  let [maybePrefetch, setMaybePrefetch] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  let [shouldPrefetch, setShouldPrefetch] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  let { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps;
  let ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (prefetch === "render") {
      setShouldPrefetch(true);
    }
    if (prefetch === "viewport") {
      let callback = (entries) => {
        entries.forEach((entry) => {
          setShouldPrefetch(entry.isIntersecting);
        });
      };
      let observer = new IntersectionObserver(callback, { threshold: 0.5 });
      if (ref.current) observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(true);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]);
  let setIntent = () => {
    setMaybePrefetch(true);
  };
  let cancelIntent = () => {
    setMaybePrefetch(false);
    setShouldPrefetch(false);
  };
  if (!frameworkContext) {
    return [false, ref, {}];
  }
  if (prefetch !== "intent") {
    return [shouldPrefetch, ref, {}];
  }
  return [
    shouldPrefetch,
    ref,
    {
      onFocus: composeEventHandlers(onFocus, setIntent),
      onBlur: composeEventHandlers(onBlur, cancelIntent),
      onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
      onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
      onTouchStart: composeEventHandlers(onTouchStart, setIntent)
    }
  ];
}
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };
}
function getActiveMatches(matches, errors, isSpaMode) {
  if (isSpaMode && !isHydrated) {
    return [matches[0]];
  }
  if (errors) {
    let errorIdx = matches.findIndex((m) => errors[m.route.id] !== void 0);
    return matches.slice(0, errorIdx + 1);
  }
  return matches;
}
var CRITICAL_CSS_DATA_ATTRIBUTE = "data-react-router-critical-css";
function Links({ nonce, crossOrigin }) {
  let {
    isSpaMode,
    manifest,
    routeModules,
    criticalCss,
    nonce: contextNonce
  } = useFrameworkContext();
  let { errors, matches: routerMatches } = useDataRouterStateContext();
  let matches = getActiveMatches(routerMatches, errors, isSpaMode);
  let keyedLinks = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => getKeyedLinksForMatches(matches, routeModules, manifest),
    [matches, routeModules, manifest]
  );
  if (nonce == null && contextNonce) {
    nonce = contextNonce;
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, typeof criticalCss === "string" ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "style",
    {
      ...{ [CRITICAL_CSS_DATA_ATTRIBUTE]: "" },
      nonce,
      dangerouslySetInnerHTML: { __html: criticalCss }
    }
  ) : null, typeof criticalCss === "object" ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "link",
    {
      ...{ [CRITICAL_CSS_DATA_ATTRIBUTE]: "" },
      rel: "stylesheet",
      href: criticalCss.href,
      nonce,
      crossOrigin
    }
  ) : null, keyedLinks.map(
    ({ key, link }) => isPageLinkDescriptor(link) ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      PrefetchPageLinks,
      {
        key,
        nonce,
        ...link,
        crossOrigin: link.crossOrigin ?? crossOrigin
      }
    ) : /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      "link",
      {
        key,
        nonce,
        ...link,
        crossOrigin: link.crossOrigin ?? crossOrigin
      }
    )
  ));
}
function PrefetchPageLinks({ page, ...linkProps }) {
  let rsc = useIsRSCRouterContext();
  let { nonce: contextNonce } = useFrameworkContext();
  let { router } = useDataRouterContext2();
  let matches = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => matchRoutes(router.routes, page, router.basename),
    [router.routes, page, router.basename]
  );
  if (!matches) {
    return null;
  }
  if (linkProps.nonce == null && contextNonce) {
    linkProps = { ...linkProps, nonce: contextNonce };
  }
  if (rsc) {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(RSCPrefetchPageLinksImpl, { page, matches, ...linkProps });
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(PrefetchPageLinksImpl, { page, matches, ...linkProps });
}
function useKeyedPrefetchLinks(matches) {
  let { manifest, routeModules } = useFrameworkContext();
  let [keyedPrefetchLinks, setKeyedPrefetchLinks] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let interrupted = false;
    void getKeyedPrefetchLinks(matches, manifest, routeModules).then(
      (links) => {
        if (!interrupted) {
          setKeyedPrefetchLinks(links);
        }
      }
    );
    return () => {
      interrupted = true;
    };
  }, [matches, manifest, routeModules]);
  return keyedPrefetchLinks;
}
function RSCPrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation();
  let { future } = useFrameworkContext();
  let { basename } = useDataRouterContext2();
  let dataHrefs = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    if (page === location.pathname + location.search + location.hash) {
      return [];
    }
    let url = singleFetchUrl(
      page,
      basename,
      future.v8_trailingSlashAwareDataRequests,
      "rsc"
    );
    let hasSomeRoutesWithShouldRevalidate = false;
    let targetRoutes = [];
    for (let match of nextMatches) {
      if (typeof match.route.shouldRevalidate === "function") {
        hasSomeRoutesWithShouldRevalidate = true;
      } else {
        targetRoutes.push(match.route.id);
      }
    }
    if (hasSomeRoutesWithShouldRevalidate && targetRoutes.length > 0) {
      url.searchParams.set("_routes", targetRoutes.join(","));
    }
    return [url.pathname + url.search];
  }, [
    basename,
    future.v8_trailingSlashAwareDataRequests,
    page,
    location,
    nextMatches
  ]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("link", { key: href, rel: "prefetch", as: "fetch", href, ...linkProps })));
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation();
  let { future, manifest, routeModules } = useFrameworkContext();
  let { basename } = useDataRouterContext2();
  let { loaderData, matches } = useDataRouterStateContext();
  let newMatchesForData = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "data"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let newMatchesForAssets = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "assets"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let dataHrefs = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    if (page === location.pathname + location.search + location.hash) {
      return [];
    }
    let routesParams = /* @__PURE__ */ new Set();
    let foundOptOutRoute = false;
    nextMatches.forEach((m) => {
      let manifestRoute = manifest.routes[m.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return;
      }
      if (!newMatchesForData.some((m2) => m2.route.id === m.route.id) && m.route.id in loaderData && routeModules[m.route.id]?.shouldRevalidate) {
        foundOptOutRoute = true;
      } else if (manifestRoute.hasClientLoader) {
        foundOptOutRoute = true;
      } else {
        routesParams.add(m.route.id);
      }
    });
    if (routesParams.size === 0) {
      return [];
    }
    let url = singleFetchUrl(
      page,
      basename,
      future.v8_trailingSlashAwareDataRequests,
      "data"
    );
    if (foundOptOutRoute && routesParams.size > 0) {
      url.searchParams.set(
        "_routes",
        nextMatches.filter((m) => routesParams.has(m.route.id)).map((m) => m.route.id).join(",")
      );
    }
    return [url.pathname + url.search];
  }, [
    basename,
    future.v8_trailingSlashAwareDataRequests,
    loaderData,
    location,
    manifest,
    newMatchesForData,
    nextMatches,
    page,
    routeModules
  ]);
  let moduleHrefs = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => getModuleLinkHrefs(newMatchesForAssets, manifest),
    [newMatchesForAssets, manifest]
  );
  let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("link", { key: href, rel: "prefetch", as: "fetch", href, ...linkProps })), moduleHrefs.map((href) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("link", { key: href, rel: "modulepreload", href, ...linkProps })), keyedPrefetchLinks.map(({ key, link }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      "link",
      {
        key,
        nonce: linkProps.nonce,
        ...link,
        crossOrigin: link.crossOrigin ?? linkProps.crossOrigin
      }
    )
  )));
}
function Meta() {
  let { isSpaMode, routeModules } = useFrameworkContext();
  let {
    errors,
    matches: routerMatches,
    loaderData
  } = useDataRouterStateContext();
  let location = useLocation();
  let _matches = getActiveMatches(routerMatches, errors, isSpaMode);
  let error = null;
  if (errors) {
    error = errors[_matches[_matches.length - 1].route.id];
  }
  let meta = [];
  let leafMeta = null;
  let matches = [];
  for (let i = 0; i < _matches.length; i++) {
    let _match = _matches[i];
    let routeId = _match.route.id;
    let data2 = loaderData[routeId];
    let params = _match.params;
    let routeModule = routeModules[routeId];
    let routeMeta = [];
    let match = {
      id: routeId,
      data: data2,
      loaderData: data2,
      meta: [],
      params: _match.params,
      pathname: _match.pathname,
      handle: _match.route.handle,
      error
    };
    matches[i] = match;
    if (routeModule?.meta) {
      routeMeta = typeof routeModule.meta === "function" ? routeModule.meta({
        data: data2,
        loaderData: data2,
        params,
        location,
        matches,
        error
      }) : Array.isArray(routeModule.meta) ? [...routeModule.meta] : routeModule.meta;
    } else if (leafMeta) {
      routeMeta = [...leafMeta];
    }
    routeMeta = routeMeta || [];
    if (!Array.isArray(routeMeta)) {
      throw new Error(
        "The route at " + _match.route.path + " returns an invalid value. All route meta functions must return an array of meta objects.\n\nTo reference the meta function API, see https://reactrouter.com/start/framework/route-module#meta"
      );
    }
    match.meta = routeMeta;
    matches[i] = match;
    meta = [...routeMeta];
    leafMeta = meta;
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, meta.flat().map((metaProps) => {
    if (!metaProps) {
      return null;
    }
    if ("tagName" in metaProps) {
      let { tagName, ...rest } = metaProps;
      if (!isValidMetaTag(tagName)) {
        console.warn(
          `A meta object uses an invalid tagName: ${tagName}. Expected either 'link' or 'meta'`
        );
        return null;
      }
      let Comp = tagName;
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Comp, { key: JSON.stringify(rest), ...rest });
    }
    if ("title" in metaProps) {
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("title", { key: "title" }, String(metaProps.title));
    }
    if ("charset" in metaProps) {
      metaProps.charSet ?? (metaProps.charSet = metaProps.charset);
      delete metaProps.charset;
    }
    if ("charSet" in metaProps && metaProps.charSet != null) {
      return typeof metaProps.charSet === "string" ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta", { key: "charSet", charSet: metaProps.charSet }) : null;
    }
    if ("script:ld+json" in metaProps) {
      try {
        let json = JSON.stringify(metaProps["script:ld+json"]);
        return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
          "script",
          {
            key: `script:ld+json:${json}`,
            type: "application/ld+json",
            dangerouslySetInnerHTML: { __html: escapeHtml(json) }
          }
        );
      } catch (e) {
        return null;
      }
    }
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta", { key: JSON.stringify(metaProps), ...metaProps });
  }));
}
function isValidMetaTag(tagName) {
  return typeof tagName === "string" && /^(meta|link)$/.test(tagName);
}
var isHydrated = false;
function setIsHydrated() {
  isHydrated = true;
}
function Scripts(scriptProps) {
  let {
    manifest,
    serverHandoffString,
    isSpaMode,
    renderMeta,
    routeDiscovery,
    ssr,
    nonce: contextNonce
  } = useFrameworkContext();
  let { router, static: isStatic, staticContext } = useDataRouterContext2();
  let { matches: routerMatches } = useDataRouterStateContext();
  let isRSCRouterContext = useIsRSCRouterContext();
  let enableFogOfWar = isFogOfWarEnabled(routeDiscovery, ssr);
  if (scriptProps.nonce == null && contextNonce) {
    scriptProps = { ...scriptProps, nonce: contextNonce };
  }
  if (renderMeta) {
    renderMeta.didRenderScripts = true;
  }
  let matches = getActiveMatches(routerMatches, null, isSpaMode);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    setIsHydrated();
  }, []);
  let initialScripts = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    if (isRSCRouterContext) {
      return null;
    }
    let streamScript = "window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());";
    let contextScript = staticContext ? `window.__reactRouterContext = ${serverHandoffString};${streamScript}` : " ";
    let routeModulesScript = !isStatic ? " " : `${manifest.hmr?.runtime ? `import ${JSON.stringify(manifest.hmr.runtime)};` : ""}${!enableFogOfWar ? `import ${JSON.stringify(manifest.url)}` : ""};
${matches.map((match, routeIndex) => {
      let routeVarName = `route${routeIndex}`;
      let manifestEntry = manifest.routes[match.route.id];
      invariant2(manifestEntry, `Route ${match.route.id} not found in manifest`);
      let {
        clientActionModule,
        clientLoaderModule,
        clientMiddlewareModule,
        hydrateFallbackModule,
        module
      } = manifestEntry;
      let chunks = [
        ...clientActionModule ? [
          {
            module: clientActionModule,
            varName: `${routeVarName}_clientAction`
          }
        ] : [],
        ...clientLoaderModule ? [
          {
            module: clientLoaderModule,
            varName: `${routeVarName}_clientLoader`
          }
        ] : [],
        ...clientMiddlewareModule ? [
          {
            module: clientMiddlewareModule,
            varName: `${routeVarName}_clientMiddleware`
          }
        ] : [],
        ...hydrateFallbackModule ? [
          {
            module: hydrateFallbackModule,
            varName: `${routeVarName}_HydrateFallback`
          }
        ] : [],
        { module, varName: `${routeVarName}_main` }
      ];
      if (chunks.length === 1) {
        return `import * as ${routeVarName} from ${JSON.stringify(module)};`;
      }
      let chunkImportsSnippet = chunks.map((chunk) => `import * as ${chunk.varName} from "${chunk.module}";`).join("\n");
      let mergedChunksSnippet = `const ${routeVarName} = {${chunks.map((chunk) => `...${chunk.varName}`).join(",")}};`;
      return [chunkImportsSnippet, mergedChunksSnippet].join("\n");
    }).join("\n")}
  ${enableFogOfWar ? (
      // Inline a minimal manifest with the SSR matches
      `window.__reactRouterManifest = ${JSON.stringify(
        getPartialManifest(manifest, router),
        null,
        2
      )};`
    ) : ""}
  window.__reactRouterRouteModules = {${matches.map((match, index) => `${JSON.stringify(match.route.id)}:route${index}`).join(",")}};

import(${JSON.stringify(manifest.entry.module)});`;
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      "script",
      {
        ...scriptProps,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: { __html: contextScript },
        type: void 0
      }
    ), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      "script",
      {
        ...scriptProps,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: { __html: routeModulesScript },
        type: "module",
        async: true
      }
    ));
  }, []);
  let preloads = isHydrated || isRSCRouterContext ? [] : [
    // Dedupe through a Set
    ...new Set(
      manifest.entry.imports.concat(
        getModuleLinkHrefs(matches, manifest, {
          includeHydrateFallback: true
        })
      )
    )
  ];
  let sri = typeof manifest.sri === "object" ? manifest.sri : {};
  warnOnce(
    !isRSCRouterContext,
    "The <Scripts /> element is a no-op when using RSC and can be safely removed."
  );
  return isHydrated || isRSCRouterContext ? null : /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, typeof manifest.sri === "object" ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "script",
    {
      ...scriptProps,
      "rr-importmap": "",
      type: "importmap",
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: {
        __html: JSON.stringify({
          integrity: sri
        })
      }
    }
  ) : null, !enableFogOfWar ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "link",
    {
      rel: "modulepreload",
      href: manifest.url,
      crossOrigin: scriptProps.crossOrigin,
      integrity: sri[manifest.url],
      nonce: scriptProps.nonce,
      suppressHydrationWarning: true
    }
  ) : null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "link",
    {
      rel: "modulepreload",
      href: manifest.entry.module,
      crossOrigin: scriptProps.crossOrigin,
      integrity: sri[manifest.entry.module],
      nonce: scriptProps.nonce,
      suppressHydrationWarning: true
    }
  ), preloads.map((path) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "link",
    {
      key: path,
      rel: "modulepreload",
      href: path,
      crossOrigin: scriptProps.crossOrigin,
      integrity: sri[path],
      nonce: scriptProps.nonce,
      suppressHydrationWarning: true
    }
  )), initialScripts);
}
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}

// lib/dom/ssr/errorBoundaries.tsx
var RemixErrorBoundary = class extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = { error: props.error || null, location: props.location };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location) {
      return { error: props.error || null, location: props.location };
    }
    return { error: props.error || state.error, location: state.location };
  }
  render() {
    if (this.state.error) {
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
        RemixRootDefaultErrorBoundary,
        {
          error: this.state.error,
          isOutsideRemixApp: true
        }
      );
    } else {
      return this.props.children;
    }
  }
};
function RemixRootDefaultErrorBoundary({
  error,
  isOutsideRemixApp
}) {
  let { nonce } = useFrameworkContext();
  console.error(error);
  let heyDeveloper = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "script",
    {
      nonce,
      dangerouslySetInnerHTML: {
        __html: `
        console.log(
          "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."
        );
      `
      }
    }
  );
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(BoundaryShell, { title: "Unhandled Thrown Response!" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", { style: { fontSize: "24px" } }, error.status, " ", error.statusText), ENABLE_DEV_WARNINGS ? heyDeveloper : null);
  }
  let errorInstance;
  if (error instanceof Error) {
    errorInstance = error;
  } else {
    let errorString = error == null ? "Unknown Error" : typeof error === "object" && "toString" in error ? error.toString() : JSON.stringify(error);
    errorInstance = new Error(errorString);
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    BoundaryShell,
    {
      title: "Application Error!",
      isOutsideRemixApp
    },
    /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", { style: { fontSize: "24px" } }, "Application Error"),
    /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      "pre",
      {
        style: {
          padding: "2rem",
          background: "hsla(10, 50%, 50%, 0.1)",
          color: "red",
          overflow: "auto"
        }
      },
      errorInstance.stack
    ),
    heyDeveloper
  );
}
function BoundaryShell({
  title,
  renderScripts,
  isOutsideRemixApp,
  children
}) {
  let { routeModules } = useFrameworkContext();
  if (routeModules.root?.Layout && !isOutsideRemixApp) {
    return children;
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("html", { lang: "en" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("head", null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("meta", { charSet: "utf-8" }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "meta",
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1,viewport-fit=cover"
    }
  ), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("title", null, title)), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("body", null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("main", { style: { fontFamily: "system-ui, sans-serif", padding: "2rem" } }, children, renderScripts ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Scripts, null) : null)));
}

// lib/dom/lib.tsx

var isBrowser2 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
try {
  if (isBrowser2) {
    window.__reactRouterVersion = // @ts-expect-error
    "7.18.1";
  }
} catch (e) {
}
function createBrowserRouter(routes, opts) {
  return createRouter({
    basename: opts?.basename,
    getContext: opts?.getContext,
    future: opts?.future,
    history: createBrowserHistory({ window: opts?.window }),
    hydrationData: opts?.hydrationData || parseHydrationData(),
    routes,
    mapRouteProperties,
    hydrationRouteProperties,
    dataStrategy: opts?.dataStrategy,
    patchRoutesOnNavigation: opts?.patchRoutesOnNavigation,
    window: opts?.window,
    instrumentations: opts?.instrumentations
  }).initialize();
}
function createHashRouter(routes, opts) {
  return createRouter({
    basename: opts?.basename,
    getContext: opts?.getContext,
    future: opts?.future,
    history: createHashHistory({ window: opts?.window }),
    hydrationData: opts?.hydrationData || parseHydrationData(),
    routes,
    mapRouteProperties,
    hydrationRouteProperties,
    dataStrategy: opts?.dataStrategy,
    patchRoutesOnNavigation: opts?.patchRoutesOnNavigation,
    window: opts?.window,
    instrumentations: opts?.instrumentations
  }).initialize();
}
function parseHydrationData() {
  let state = window?.__staticRouterHydrationData;
  if (state && state.errors) {
    state = {
      ...state,
      errors: deserializeErrors(state.errors)
    };
  }
  return state;
}
function deserializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (val && val.__type === "RouteErrorResponse") {
      serialized[key] = new ErrorResponseImpl(
        val.status,
        val.statusText,
        val.data,
        val.internal === true
      );
    } else if (val && val.__type === "Error") {
      if (typeof val.__subType === "string" && SUPPORTED_ERROR_TYPES.includes(val.__subType)) {
        let ErrorConstructor = window[val.__subType];
        if (typeof ErrorConstructor === "function") {
          try {
            let error = new ErrorConstructor(val.message);
            error.stack = "";
            serialized[key] = error;
          } catch (e) {
          }
        }
      }
      if (serialized[key] == null) {
        let error = new Error(val.message);
        error.stack = "";
        serialized[key] = error;
      }
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
function BrowserRouter({
  basename,
  children,
  useTransitions,
  window: window2
}) {
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({ window: window2, v5Compat: true });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (newState) => {
      if (useTransitions === false) {
        setStateImpl(newState);
      } else {
        react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => setStateImpl(newState));
      }
    },
    [useTransitions]
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history,
      useTransitions
    }
  );
}
function HashRouter({
  basename,
  children,
  useTransitions,
  window: window2
}) {
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  if (historyRef.current == null) {
    historyRef.current = createHashHistory({ window: window2, v5Compat: true });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (newState) => {
      if (useTransitions === false) {
        setStateImpl(newState);
      } else {
        react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => setStateImpl(newState));
      }
    },
    [useTransitions]
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history,
      useTransitions
    }
  );
}
function HistoryRouter({
  basename,
  children,
  history,
  useTransitions
}) {
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (newState) => {
      if (useTransitions === false) {
        setStateImpl(newState);
      } else {
        react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => setStateImpl(newState));
      }
    },
    [useTransitions]
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history,
      useTransitions
    }
  );
}
HistoryRouter.displayName = "unstable_HistoryRouter";
var Link = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  function LinkWithRef({
    onClick,
    discover = "render",
    prefetch = "none",
    relative,
    reloadDocument,
    replace: replace2,
    mask,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition,
    defaultShouldRevalidate,
    ...rest
  }, forwardedRef) {
    let { basename, navigator, useTransitions } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
    let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX.test(to);
    let parsed = parseToInfo(to, basename);
    to = parsed.to;
    let href = useHref(to, { relative });
    let location = useLocation();
    let maskedHref = null;
    if (mask) {
      let resolved = resolveTo(
        mask,
        [],
        location.mask ? location.mask.pathname : "/",
        true
      );
      if (basename !== "/") {
        resolved.pathname = resolved.pathname === "/" ? basename : joinPaths([basename, resolved.pathname]);
      }
      maskedHref = navigator.createHref(resolved);
    }
    let [shouldPrefetch, prefetchRef, prefetchHandlers] = usePrefetchBehavior(
      prefetch,
      rest
    );
    let internalOnClick = useLinkClickHandler(to, {
      replace: replace2,
      mask,
      state,
      target,
      preventScrollReset,
      relative,
      viewTransition,
      defaultShouldRevalidate,
      useTransitions
    });
    function handleClick(event) {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) {
        internalOnClick(event);
      }
    }
    let isSpaLink = !(parsed.isExternal || reloadDocument);
    let link = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
        "a",
        {
          ...rest,
          ...prefetchHandlers,
          href: (isSpaLink ? maskedHref : void 0) || parsed.absoluteURL || href,
          onClick: isSpaLink ? handleClick : onClick,
          ref: mergeRefs(forwardedRef, prefetchRef),
          target,
          "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
        }
      )
    );
    return shouldPrefetch && !isAbsolute ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, link, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(PrefetchPageLinks, { page: href })) : link;
  }
);
Link.displayName = "Link";
var NavLink = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  function NavLinkWithRef({
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    viewTransition,
    children,
    ...rest
  }, ref) {
    let path = useResolvedPath(to, { relative: rest.relative });
    let location = useLocation();
    let routerState = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterStateContext);
    let { navigator, basename } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
    let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useViewTransitionState(path) && viewTransition === true;
    let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
    let locationPathname = location.pathname;
    let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
    if (!caseSensitive) {
      locationPathname = locationPathname.toLowerCase();
      nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
      toPathname = toPathname.toLowerCase();
    }
    if (nextLocationPathname && basename) {
      nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
    }
    const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
    let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
    let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
    let renderProps = {
      isActive,
      isPending,
      isTransitioning
    };
    let ariaCurrent = isActive ? ariaCurrentProp : void 0;
    let className;
    if (typeof classNameProp === "function") {
      className = classNameProp(renderProps);
    } else {
      className = [
        classNameProp,
        isActive ? "active" : null,
        isPending ? "pending" : null,
        isTransitioning ? "transitioning" : null
      ].filter(Boolean).join(" ");
    }
    let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      Link,
      {
        ...rest,
        "aria-current": ariaCurrent,
        className,
        ref,
        style,
        to,
        viewTransition
      },
      typeof children === "function" ? children(renderProps) : children
    );
  }
);
NavLink.displayName = "NavLink";
var Form = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  ({
    discover = "render",
    fetcherKey,
    navigate,
    reloadDocument,
    replace: replace2,
    state,
    method = defaultMethod,
    action,
    onSubmit,
    relative,
    preventScrollReset,
    viewTransition,
    defaultShouldRevalidate,
    ...props
  }, forwardedRef) => {
    let { useTransitions } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
    let submit = useSubmit();
    let formAction = useFormAction(action, { relative });
    let formMethod = method.toLowerCase() === "get" ? "get" : "post";
    let isAbsolute = typeof action === "string" && ABSOLUTE_URL_REGEX.test(action);
    let submitHandler = (event) => {
      onSubmit && onSubmit(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      let submitter = event.nativeEvent.submitter;
      let submitMethod = submitter?.getAttribute("formmethod") || method;
      let doSubmit = () => submit(submitter || event.currentTarget, {
        fetcherKey,
        method: submitMethod,
        navigate,
        replace: replace2,
        state,
        relative,
        preventScrollReset,
        viewTransition,
        defaultShouldRevalidate
      });
      if (useTransitions && navigate !== false) {
        react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => doSubmit());
      } else {
        doSubmit();
      }
    };
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      "form",
      {
        ref: forwardedRef,
        method: formMethod,
        action: formAction,
        onSubmit: reloadDocument ? onSubmit : submitHandler,
        ...props,
        "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
      }
    );
  }
);
Form.displayName = "Form";
function ScrollRestoration({
  getKey,
  storageKey,
  ...props
}) {
  let remixContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FrameworkContext);
  let { basename } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let location = useLocation();
  let matches = useMatches();
  useScrollRestoration({ getKey, storageKey });
  let ssrKey = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => {
      if (!remixContext || !getKey) return null;
      let userKey = getScrollRestorationKey(
        location,
        matches,
        basename,
        getKey
      );
      return userKey !== location.key ? userKey : null;
    },
    // Nah, we only need this the first time for the SSR render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (!remixContext || remixContext.isSpaMode) {
    return null;
  }
  let restoreScroll = ((storageKey2, restoreKey) => {
    if (!window.history.state || !window.history.state.key) {
      let key = Math.random().toString(32).slice(2);
      window.history.replaceState({ key }, "");
    }
    try {
      let positions = JSON.parse(sessionStorage.getItem(storageKey2) || "{}");
      let storedY = positions[restoreKey || window.history.state.key];
      if (typeof storedY === "number") {
        window.scrollTo(0, storedY);
      }
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem(storageKey2);
    }
  }).toString();
  if (props.nonce == null && remixContext?.nonce) {
    props.nonce = remixContext.nonce;
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "script",
    {
      ...props,
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: {
        __html: `(${restoreScroll})(${escapeHtml(
          JSON.stringify(storageKey || SCROLL_RESTORATION_STORAGE_KEY)
        )}, ${escapeHtml(JSON.stringify(ssrKey))})`
      }
    }
  );
}
ScrollRestoration.displayName = "ScrollRestoration";
function getDataRouterConsoleError2(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext3(hookName) {
  let ctx = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError2(hookName));
  return ctx;
}
function useDataRouterState2(hookName) {
  let state = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterStateContext);
  invariant(state, getDataRouterConsoleError2(hookName));
  return state;
}
function useLinkClickHandler(to, {
  target,
  replace: replaceProp,
  mask,
  state,
  preventScrollReset,
  relative,
  viewTransition,
  defaultShouldRevalidate,
  useTransitions
} = {}) {
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, { relative });
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (event) => {
      if (shouldProcessLinkClick(event, target)) {
        event.preventDefault();
        let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
        let doNavigate = () => navigate(to, {
          replace: replace2,
          mask,
          state,
          preventScrollReset,
          relative,
          viewTransition,
          defaultShouldRevalidate
        });
        if (useTransitions) {
          react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => doNavigate());
        } else {
          doNavigate();
        }
      }
    },
    [
      location,
      navigate,
      path,
      replaceProp,
      mask,
      state,
      target,
      to,
      preventScrollReset,
      relative,
      viewTransition,
      defaultShouldRevalidate,
      useTransitions
    ]
  );
}
function useSearchParams(defaultInit) {
  warning(
    typeof URLSearchParams !== "undefined",
    `You cannot use the \`useSearchParams\` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.`
  );
  let defaultSearchParamsRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(createSearchParams(defaultInit));
  let hasSetSearchParamsRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  let location = useLocation();
  let searchParams = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => (
      // Only merge in the defaults if we haven't yet called setSearchParams.
      // Once we call that we want those to take precedence, otherwise you can't
      // remove a param with setSearchParams({}) if it has an initial value
      getSearchParamsForLocation(
        location.search,
        hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current
      )
    ),
    [location.search]
  );
  let navigate = useNavigate();
  let setSearchParams = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (nextInit, navigateOptions) => {
      const newSearchParams = createSearchParams(
        typeof nextInit === "function" ? nextInit(new URLSearchParams(searchParams)) : nextInit
      );
      hasSetSearchParamsRef.current = true;
      navigate("?" + newSearchParams, navigateOptions);
    },
    [navigate, searchParams]
  );
  return [searchParams, setSearchParams];
}
var fetcherId = 0;
var getUniqueFetcherId = () => `__${String(++fetcherId)}__`;
function useSubmit() {
  let { router } = useDataRouterContext3("useSubmit" /* UseSubmit */);
  let { basename } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let currentRouteId = useRouteId();
  let routerFetch = router.fetch;
  let routerNavigate = router.navigate;
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    async (target, options = {}) => {
      let { action, method, encType, formData, body } = getFormSubmissionInfo(
        target,
        basename
      );
      if (options.navigate === false) {
        let key = options.fetcherKey || getUniqueFetcherId();
        await routerFetch(key, currentRouteId, options.action || action, {
          defaultShouldRevalidate: options.defaultShouldRevalidate,
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          flushSync: options.flushSync
        });
      } else {
        await routerNavigate(options.action || action, {
          defaultShouldRevalidate: options.defaultShouldRevalidate,
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          replace: options.replace,
          state: options.state,
          fromRouteId: currentRouteId,
          flushSync: options.flushSync,
          viewTransition: options.viewTransition
        });
      }
    },
    [routerFetch, routerNavigate, basename, currentRouteId]
  );
}
function useFormAction(action, { relative } = {}) {
  let { basename } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let routeContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  invariant(routeContext, "useFormAction must be used inside a RouteContext");
  let [match] = routeContext.matches.slice(-1);
  let path = { ...useResolvedPath(action ? action : ".", { relative }) };
  let location = useLocation();
  if (action == null) {
    path.search = location.search;
    let params = new URLSearchParams(path.search);
    let indexValues = params.getAll("index");
    let hasNakedIndexParam = indexValues.some((v) => v === "");
    if (hasNakedIndexParam) {
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function useFetcher({
  key
} = {}) {
  let { router } = useDataRouterContext3("useFetcher" /* UseFetcher */);
  let state = useDataRouterState2("useFetcher" /* UseFetcher */);
  let fetcherData = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FetchersContext);
  let route = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let routeId = route.matches[route.matches.length - 1]?.route.id;
  invariant(fetcherData, `useFetcher must be used inside a FetchersContext`);
  invariant(route, `useFetcher must be used inside a RouteContext`);
  invariant(
    routeId != null,
    `useFetcher can only be used on routes that contain a unique "id"`
  );
  let defaultKey = react__WEBPACK_IMPORTED_MODULE_0__.useId();
  let [fetcherKey, setFetcherKey] = react__WEBPACK_IMPORTED_MODULE_0__.useState(key || defaultKey);
  if (key && key !== fetcherKey) {
    setFetcherKey(key);
  }
  let { deleteFetcher, getFetcher, resetFetcher, fetch: routerFetch } = router;
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    getFetcher(fetcherKey);
    return () => deleteFetcher(fetcherKey);
  }, [deleteFetcher, getFetcher, fetcherKey]);
  let load = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    async (href, opts) => {
      invariant(routeId, "No routeId available for fetcher.load()");
      await routerFetch(fetcherKey, routeId, href, opts);
    },
    [fetcherKey, routeId, routerFetch]
  );
  let submitImpl = useSubmit();
  let submit = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    async (target, opts) => {
      await submitImpl(target, {
        ...opts,
        navigate: false,
        fetcherKey
      });
    },
    [fetcherKey, submitImpl]
  );
  let reset = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (opts) => resetFetcher(fetcherKey, opts),
    [resetFetcher, fetcherKey]
  );
  let FetcherForm = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    let FetcherForm2 = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
      (props, ref) => {
        return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Form, { ...props, navigate: false, fetcherKey, ref });
      }
    );
    FetcherForm2.displayName = "fetcher.Form";
    return FetcherForm2;
  }, [fetcherKey]);
  let fetcher = state.fetchers.get(fetcherKey) || IDLE_FETCHER;
  let data2 = fetcherData.get(fetcherKey);
  let fetcherWithComponents = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => ({
      Form: FetcherForm,
      submit,
      load,
      reset,
      ...fetcher,
      data: data2
    }),
    [FetcherForm, submit, load, reset, fetcher, data2]
  );
  return fetcherWithComponents;
}
function useFetchers() {
  let state = useDataRouterState2("useFetchers" /* UseFetchers */);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => Array.from(state.fetchers.entries()).map(([key, fetcher]) => ({
      ...fetcher,
      key
    })),
    [state.fetchers]
  );
}
var SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
var savedScrollPositions = {};
function getScrollRestorationKey(location, matches, basename, getKey) {
  let key = null;
  if (getKey) {
    if (basename !== "/") {
      key = getKey(
        {
          ...location,
          pathname: stripBasename(location.pathname, basename) || location.pathname
        },
        matches
      );
    } else {
      key = getKey(location, matches);
    }
  }
  if (key == null) {
    key = location.key;
  }
  return key;
}
function useScrollRestoration({
  getKey,
  storageKey
} = {}) {
  let { router } = useDataRouterContext3("useScrollRestoration" /* UseScrollRestoration */);
  let { restoreScrollPosition, preventScrollReset } = useDataRouterState2(
    "useScrollRestoration" /* UseScrollRestoration */
  );
  let { basename } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let location = useLocation();
  let matches = useMatches();
  let navigation = useNavigation();
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);
  usePageHide(
    react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
      if (navigation.state === "idle") {
        let key = getScrollRestorationKey(location, matches, basename, getKey);
        savedScrollPositions[key] = window.scrollY;
      }
      try {
        sessionStorage.setItem(
          storageKey || SCROLL_RESTORATION_STORAGE_KEY,
          JSON.stringify(savedScrollPositions)
        );
      } catch (error) {
        warning(
          false,
          `Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${error}).`
        );
      }
      window.history.scrollRestoration = "auto";
    }, [navigation.state, getKey, basename, location, matches, storageKey])
  );
  if (typeof document !== "undefined") {
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      try {
        let sessionPositions = sessionStorage.getItem(
          storageKey || SCROLL_RESTORATION_STORAGE_KEY
        );
        if (sessionPositions) {
          savedScrollPositions = JSON.parse(sessionPositions);
        }
      } catch (e) {
      }
    }, [storageKey]);
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      let disableScrollRestoration = router?.enableScrollRestoration(
        savedScrollPositions,
        () => window.scrollY,
        getKey ? (location2, matches2) => getScrollRestorationKey(location2, matches2, basename, getKey) : void 0
      );
      return () => disableScrollRestoration && disableScrollRestoration();
    }, [router, basename, getKey]);
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      if (restoreScrollPosition === false) {
        return;
      }
      if (typeof restoreScrollPosition === "number") {
        window.scrollTo(0, restoreScrollPosition);
        return;
      }
      try {
        if (location.hash) {
          let el = document.getElementById(
            decodeURIComponent(location.hash.slice(1))
          );
          if (el) {
            el.scrollIntoView();
            return;
          }
        }
      } catch {
        warning(
          false,
          `"${location.hash.slice(
            1
          )}" is not a decodable element ID. The view will not scroll to it.`
        );
      }
      if (preventScrollReset === true) {
        return;
      }
      window.scrollTo(0, 0);
    }, [location, restoreScrollPosition, preventScrollReset]);
  }
}
function useBeforeUnload(callback, options) {
  let { capture } = options || {};
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let opts = capture != null ? { capture } : void 0;
    window.addEventListener("beforeunload", callback, opts);
    return () => {
      window.removeEventListener("beforeunload", callback, opts);
    };
  }, [callback, capture]);
}
function usePageHide(callback, options) {
  let { capture } = options || {};
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let opts = capture != null ? { capture } : void 0;
    window.addEventListener("pagehide", callback, opts);
    return () => {
      window.removeEventListener("pagehide", callback, opts);
    };
  }, [callback, capture]);
}
function usePrompt({
  when,
  message
}) {
  let blocker = useBlocker(when);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (blocker.state === "blocked") {
      let proceed = window.confirm(message);
      if (proceed) {
        setTimeout(blocker.proceed, 0);
      } else {
        blocker.reset();
      }
    }
  }, [blocker, message]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (blocker.state === "blocked" && !when) {
      blocker.reset();
    }
  }, [blocker, when]);
}
function useViewTransitionState(to, { relative } = {}) {
  let vtContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(ViewTransitionContext);
  invariant(
    vtContext != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename } = useDataRouterContext3(
    "useViewTransitionState" /* useViewTransitionState */
  );
  let path = useResolvedPath(to, { relative });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}

// lib/dom/server.tsx

function StaticRouter({
  basename,
  children,
  location: locationProp = "/"
}) {
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let action = "POP" /* Pop */;
  let location = {
    pathname: locationProp.pathname || "/",
    search: locationProp.search || "",
    hash: locationProp.hash || "",
    state: locationProp.state != null ? locationProp.state : null,
    key: locationProp.key || "default",
    mask: void 0
  };
  let staticNavigator = getStatelessNavigator();
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename,
      children,
      location,
      navigationType: action,
      navigator: staticNavigator,
      static: true,
      useTransitions: false
    }
  );
}
function StaticRouterProvider({
  context,
  router,
  hydrate: hydrate2 = true,
  nonce
}) {
  invariant(
    router && context,
    "You must provide `router` and `context` to <StaticRouterProvider>"
  );
  let dataRouterContext = {
    router,
    navigator: getStatelessNavigator(),
    static: true,
    staticContext: context,
    basename: context.basename || "/"
  };
  let fetchersContext = /* @__PURE__ */ new Map();
  let hydrateScript = "";
  if (hydrate2 !== false) {
    let data2 = {
      loaderData: context.loaderData,
      actionData: context.actionData,
      errors: serializeErrors(context.errors)
    };
    let json = escapeHtml(JSON.stringify(JSON.stringify(data2)));
    hydrateScript = `window.__staticRouterHydrationData = JSON.parse(${json});`;
  }
  let { state } = dataRouterContext.router;
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRouterContext.Provider, { value: dataRouterContext }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRouterStateContext.Provider, { value: state }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(FetchersContext.Provider, { value: fetchersContext }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ViewTransitionContext.Provider, { value: { isTransitioning: false } }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    Router,
    {
      basename: dataRouterContext.basename,
      location: state.location,
      navigationType: state.historyAction,
      navigator: dataRouterContext.navigator,
      static: dataRouterContext.static,
      useTransitions: false
    },
    /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      DataRoutes2,
      {
        manifest: router.manifest,
        routes: router.routes,
        future: router.future,
        state,
        isStatic: true
      }
    )
  ))))), hydrateScript ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    "script",
    {
      suppressHydrationWarning: true,
      nonce,
      dangerouslySetInnerHTML: { __html: hydrateScript }
    }
  ) : null);
}
function serializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (isRouteErrorResponse(val)) {
      serialized[key] = { ...val, __type: "RouteErrorResponse" };
    } else if (val instanceof Error) {
      serialized[key] = {
        message: val.message,
        __type: "Error",
        // If this is a subclass (i.e., ReferenceError), send up the type so we
        // can re-create the same type during hydration.
        ...val.name !== "Error" ? {
          __subType: val.name
        } : {}
      };
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
function getStatelessNavigator() {
  return {
    createHref,
    encodeLocation,
    push(to) {
      throw new Error(
        `You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`
      );
    },
    replace(to) {
      throw new Error(
        `You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`
      );
    },
    go(delta) {
      throw new Error(
        `You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`
      );
    },
    back() {
      throw new Error(
        `You cannot use navigator.back() on the server because it is a stateless environment.`
      );
    },
    forward() {
      throw new Error(
        `You cannot use navigator.forward() on the server because it is a stateless environment.`
      );
    }
  };
}
function createStaticHandler2(routes, opts) {
  return createStaticHandler(routes, {
    ...opts,
    mapRouteProperties
  });
}
function createStaticRouter(routes, context, opts = {}) {
  let manifest = {};
  let dataRoutes = convertRoutesToDataRoutes(
    routes,
    mapRouteProperties,
    void 0,
    manifest
  );
  let matches = context.matches.map((match) => {
    let route = manifest[match.route.id] || match.route;
    return {
      ...match,
      route
    };
  });
  let msg = (method) => `You cannot use router.${method}() on the server because it is a stateless environment`;
  return {
    get basename() {
      return context.basename;
    },
    get future() {
      return {
        v8_middleware: false,
        v8_passThroughRequests: false,
        v8_trailingSlashAwareDataRequests: false,
        ...opts?.future
      };
    },
    get state() {
      return {
        historyAction: "POP" /* Pop */,
        location: context.location,
        matches,
        loaderData: context.loaderData,
        actionData: context.actionData,
        errors: context.errors,
        initialized: true,
        renderFallback: false,
        navigation: IDLE_NAVIGATION,
        restoreScrollPosition: null,
        preventScrollReset: false,
        revalidation: "idle",
        fetchers: /* @__PURE__ */ new Map(),
        blockers: /* @__PURE__ */ new Map()
      };
    },
    get routes() {
      return dataRoutes;
    },
    get branches() {
      return opts.branches;
    },
    get manifest() {
      return manifest;
    },
    get window() {
      return void 0;
    },
    initialize() {
      throw msg("initialize");
    },
    subscribe() {
      throw msg("subscribe");
    },
    enableScrollRestoration() {
      throw msg("enableScrollRestoration");
    },
    navigate() {
      throw msg("navigate");
    },
    fetch() {
      throw msg("fetch");
    },
    revalidate() {
      throw msg("revalidate");
    },
    createHref,
    encodeLocation,
    getFetcher() {
      return IDLE_FETCHER;
    },
    deleteFetcher() {
      throw msg("deleteFetcher");
    },
    resetFetcher() {
      throw msg("resetFetcher");
    },
    dispose() {
      throw msg("dispose");
    },
    getBlocker() {
      return IDLE_BLOCKER;
    },
    deleteBlocker() {
      throw msg("deleteBlocker");
    },
    patchRoutes() {
      throw msg("patchRoutes");
    },
    _internalFetchControllers: /* @__PURE__ */ new Map(),
    _internalSetRoutes() {
      throw msg("_internalSetRoutes");
    },
    _internalSetStateDoNotUseOrYouWillBreakYourApp() {
      throw msg("_internalSetStateDoNotUseOrYouWillBreakYourApp");
    }
  };
}
function createHref(to) {
  return typeof to === "string" ? to : createPath(to);
}
function encodeLocation(to) {
  let href = typeof to === "string" ? to : createPath(to);
  href = href.replace(/ $/, "%20");
  let encoded = ABSOLUTE_URL_REGEX.test(href) ? new URL(href) : new URL(href, "http://localhost");
  return {
    pathname: encoded.pathname,
    search: encoded.search,
    hash: encoded.hash
  };
}




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
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		const getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		let leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			const ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			const def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
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
/*!********************************!*\
  !*** ./src/admin/dashboard.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dashboard_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard.scss */ "./src/admin/dashboard.scss");
/* harmony import */ var _Components_App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Components/App */ "./src/admin/Components/App.js");
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/data */ "./src/admin/utils/data.js");





document.addEventListener('DOMContentLoaded', () => {
  const dashboardEl = document.getElementById('bpbtbDashboard');
  if (dashboardEl) {
    const info = JSON.parse(dashboardEl.dataset.info);
    (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createRoot)(dashboardEl).render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_App__WEBPACK_IMPORTED_MODULE_3__["default"], {
      ...(0,_utils_data__WEBPACK_IMPORTED_MODULE_4__.dashboardInfo)(info)
    }));
    dashboardEl.removeAttribute('data-info');
  }
});
})();

/******/ })()
;
//# sourceMappingURL=admin-dashboard.js.map