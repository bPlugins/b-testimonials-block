/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/shared/styles/form.scss"
/*!*************************************!*\
  !*** ./src/shared/styles/form.scss ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/*!*********************************************!*\
  !*** ./src/blocks/testimonial-form/view.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shared_styles_form_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/styles/form.scss */ "./src/shared/styles/form.scss");

const setMessage = (form, text, type) => {
  const msg = form.querySelector('.btb-tform-msg');
  if (!msg) {
    return;
  }
  msg.textContent = text;
  msg.className = `btb-tform-msg is-${type}`;
};
const initForms = () => {
  document.querySelectorAll('.btb-tform').forEach(form => {
    if (form.dataset.bound) {
      return;
    }
    form.dataset.bound = '1';
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const submitBtn = form.querySelector('.btb-tform-submit');
      const endpoint = form.dataset.endpoint;
      const data = new FormData(form);
      data.append('nonce', form.dataset.nonce || '');
      if (submitBtn) {
        submitBtn.disabled = true;
      }
      setMessage(form, '', '');
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: data
        });
        const json = await res.json();
        if (res.ok && json.success) {
          setMessage(form, form.dataset.success || json.message, 'success');
          form.reset();
        } else {
          setMessage(form, json.message || 'Submission failed.', 'error');
        }
      } catch (err) {
        setMessage(form, 'Submission failed. Please try again.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
        }
      }
    });
  });
};
document.addEventListener('DOMContentLoaded', initForms);
})();

/******/ })()
;
//# sourceMappingURL=view.js.map