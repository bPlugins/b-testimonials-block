import { useState } from "react";

import Blocks from "../../../../bpl-tools/Admin/Blocks";

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
  isPremium = false,
}) => {
  // '' | 'loading' | 'success' | 'error' -- the component turns this into its
  // own toast, so nothing here has to render one.
  const [status, setStatus] = useState("");

  const save = (disabled) => {
    setStatus("loading");

    // `wp.ajax` is what the Settings page posts through, so both of this
    // dashboard's writes go the same way and share the one nonce action.
    window.wp?.ajax
      ?.post("bpbtbSaveDisabledBlocks", {
        nonce: uninstallNonce,
        disabled,
      })
      ?.done(() => setStatus("success"))
      ?.fail(() => setStatus("error"));
  };

  return (
    <Blocks
      isPremium={isPremium}
      allBlocks={allBlocks}
      disabledBlocks={disabledBlocks}
      status={status}
      onChange={save}
    />
  );
};

export default AllBlocks;
