import { TabPanel } from "@wordpress/components";

import { tabController } from "../../../../../../bpl-tools/utils/functions";
import { generalStyleTabs } from "../../../utils/options";

/**
 * The General / Style tab pair the sidebar is organised around.
 *
 * Only the shared Settings component had it. The seven blocks that ship their
 * own editor -- before/after, client logos, rating summary, testimonial form,
 * stats, trust badges and video testimonials -- rendered one flat list instead,
 * so their Colors, Width & Height, Spacing and typography panels sat mixed in
 * among the content panels with nothing separating them. Same sidebar, two
 * different shapes depending on which block was selected.
 *
 * Lifted out rather than repeated in each editor: the tab list, the active
 * class and the accordion behaviour in tabController all have to match the
 * shared Settings tab exactly, or the two drift into looking subtly different.
 *
 * @param {Object} props
 * @param {Node}   props.general Panels for the General tab: content, data, and
 *                               the layout and icon choices.
 * @param {Node}   props.style   Panels for the Style tab: colours, size, spacing
 *                               and typography.
 */
const SettingsTabs = ({ general, style }) => (
  <TabPanel
    className="bPlTabPanel"
    activeClass="activeTab"
    tabs={generalStyleTabs}
    onSelect={tabController}>
    {(tab) => (
      <>
        {"general" === tab.name && general}
        {"style" === tab.name && style}
      </>
    )}
  </TabPanel>
);

export default SettingsTabs;
